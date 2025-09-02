import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';

// Custom metrics
const successRate = new Rate('success_rate');
const errorRate = new Rate('error_rate');
const requestDuration = new Trend('request_duration');

// Test configuration
export const options = {
  stages: [
    { duration: '1m', target: 50 },   // Ramp up to 50 users over 1 minute
    { duration: '3m', target: 50 },   // Stay at 50 users for 3 minutes
    { duration: '1m', target: 100 },  // Ramp up to 100 users over 1 minute
    { duration: '3m', target: 100 },  // Stay at 100 users for 3 minutes
    { duration: '1m', target: 0 },    // Ramp down to 0 users over 1 minute
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should complete within 500ms
    'success_rate': ['rate>0.95'],    // 95% of requests should be successful
    'error_rate': ['rate<0.05'],      // Less than 5% of requests should fail
  },
};

// Simulated JWT token for authenticated requests
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// Common headers
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${JWT_TOKEN}`,
};

// Helper function to make a request and record metrics
function makeRequest(method, url, body = null) {
  const startTime = new Date();
  
  const params = {
    headers: headers,
    timeout: '10s',
  };
  
  let response;
  if (method === 'GET') {
    response = http.get(url, params);
  } else if (method === 'POST') {
    response = http.post(url, JSON.stringify(body), params);
  } else if (method === 'PUT') {
    response = http.put(url, JSON.stringify(body), params);
  }
  
  const duration = new Date() - startTime;
  requestDuration.add(duration);
  
  const success = response.status >= 200 && response.status < 300;
  successRate.add(success);
  errorRate.add(!success);
  
  return response;
}

// Main test function
export default function() {
  // Test the health endpoint
  const healthResponse = makeRequest('GET', 'http://api.slavkokernel.com/health');
  check(healthResponse, {
    'health check status is 200': (r) => r.status === 200,
    'health check response has status field': (r) => r.json('status') === 'healthy',
  });
  
  // Test the suggestions endpoint
  const suggestionsResponse = makeRequest('GET', 'http://api.slavkokernel.com/suggestions');
  check(suggestionsResponse, {
    'suggestions status is 200': (r) => r.status === 200,
    'suggestions response is an array': (r) => Array.isArray(r.json()),
  });
  
  // Test creating a suggestion
  const createBody = {
    original_text: `Hello world ${Date.now()}`,
    suggested_translation: `Pozdrav svijete ${Date.now()}`,
    language_pair: 'en-hr',
  };
  
  const createResponse = makeRequest('POST', 'http://api.slavkokernel.com/suggestions', createBody);
  check(createResponse, {
    'create suggestion status is 200': (r) => r.status === 200,
    'create suggestion response has id': (r) => r.json('id') !== undefined,
    'create suggestion response has status': (r) => r.json('status') === 'success',
  });
  
  // Get a specific suggestion
  if (createResponse.status === 200) {
    const suggestionId = createResponse.json('id');
    const getResponse = makeRequest('GET', `http://api.slavkokernel.com/suggestions/${suggestionId}`);
    
    check(getResponse, {
      'get suggestion status is 200': (r) => r.status === 200,
      'get suggestion response has correct id': (r) => r.json('id') === suggestionId,
    });
  }
  
  // Sleep between iterations
  sleep(1);
}