import pytest
from fastapi.testclient import TestClient
import sys
import os
import json
from unittest.mock import patch, MagicMock

# Add the api directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../api')))

from app.main import app
from app.services.score_calculator import ScoreCalculator

# Create a test client
client = TestClient(app)

class TestAPIIntegration:
    def setup_method(self):
        # Mock dependencies
        self.redis_mock = MagicMock()
        
    def test_health_endpoint(self):
        # Test the health endpoint
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"
        
    def test_status_endpoint(self):
        # Test the status endpoint
        response = client.get("/status")
        assert response.status_code == 200
        assert response.json()["api"] == "operational"
    
    @patch('app.routers.suggestions.ScoreCalculator')
    def test_create_suggestion_unauthorized(self, mock_calculator):
        # Test creating a suggestion without authorization
        response = client.post(
            "/suggestions/",
            json={
                "original_text": "Hello world",
                "suggested_translation": "Pozdrav svijete",
                "language_pair": "en-hr"
            }
        )
        assert response.status_code == 401
        assert "Authorization header required" in response.json()["detail"]
    
    @patch('app.routers.suggestions.ScoreCalculator')
    def test_create_suggestion_authorized(self, mock_calculator):
        # Mock the calculator to return a score
        mock_instance = mock_calculator.return_value
        mock_instance.calculate_score.return_value = 0.85
        
        # Test creating a suggestion with authorization
        response = client.post(
            "/suggestions/",
            json={
                "original_text": "Hello world",
                "suggested_translation": "Pozdrav svijete",
                "language_pair": "en-hr"
            },
            headers={"Authorization": "Bearer fake-token"}
        )
        assert response.status_code == 200
        assert response.json()["status"] == "success"
        assert response.json()["score"] == 0.85
    
    def test_list_suggestions_unauthorized(self):
        # Test listing suggestions without authorization
        response = client.get("/suggestions/")
        assert response.status_code == 401
        assert "Authorization header required" in response.json()["detail"]
    
    def test_list_suggestions_authorized(self):
        # Test listing suggestions with authorization
        response = client.get(
            "/suggestions/",
            headers={"Authorization": "Bearer fake-token"}
        )
        assert response.status_code == 200
        assert isinstance(response.json(), list)
        
    def test_get_suggestion_unauthorized(self):
        # Test getting a specific suggestion without authorization
        response = client.get("/suggestions/suggestion-1")
        assert response.status_code == 401
        assert "Authorization header required" in response.json()["detail"]
    
    def test_get_suggestion_authorized(self):
        # Test getting a specific suggestion with authorization
        response = client.get(
            "/suggestions/suggestion-1",
            headers={"Authorization": "Bearer fake-token"}
        )
        assert response.status_code == 200
        assert response.json()["id"] == "suggestion-1"
    
    def test_get_nonexistent_suggestion(self):
        # Test getting a suggestion that doesn't exist
        response = client.get(
            "/suggestions/nonexistent",
            headers={"Authorization": "Bearer fake-token"}
        )
        assert response.status_code == 404
        assert "not found" in response.json()["detail"]
    
    def test_update_suggestion_status_unauthorized(self):
        # Test updating a suggestion status without authorization
        response = client.put(
            "/suggestions/suggestion-1/status",
            json={"status": "approved"}
        )
        assert response.status_code == 401
        assert "Authorization header required" in response.json()["detail"]
    
    def test_update_suggestion_status_authorized(self):
        # Test updating a suggestion status with authorization
        response = client.put(
            "/suggestions/suggestion-1/status",
            json={"status": "approved"},
            headers={"Authorization": "Bearer fake-token"}
        )
        assert response.status_code == 200
        assert response.json()["status"] == "success"
    
    def test_update_suggestion_invalid_status(self):
        # Test updating a suggestion with an invalid status
        response = client.put(
            "/suggestions/suggestion-1/status",
            json={"status": "invalid"},
            headers={"Authorization": "Bearer fake-token"}
        )
        assert response.status_code == 400
        assert "Invalid status" in response.json()["detail"]