// SlavkoKernel™ Chat Agents Configuration
// This file defines the chat agents available in the demo

/**
 * Chat agent configuration
 * Each agent has specific personality traits and uses different combinations of the SlavkoKernel™ models
 */
const chatAgents = {
  // Slavko - The comprehensive agent that uses all four models
  slavko: {
    id: "slavko",
    name: "Slavko",
    avatar: "/assets/avatars/slavko.png",
    description: "The complete SlavkoKernel™ experience. Slavko combines all four AI models to provide comprehensive insights and recommendations.",
    models: ["audit", "introspekt", "score", "tactic"],
    personality: {
      tone: "professional",
      style: "comprehensive",
      strengths: ["balanced analysis", "complete perspective", "strategic insights"]
    },
    introduction: "Hello, I'm Slavko, your multi-model AI assistant. I combine technical precision, contextual understanding, probability assessment, and strategic recommendations to help you make better decisions. How can I assist you today?",
    sampleQuestions: [
      "How should our healthcare organization improve patient outcomes?",
      "What are the compliance risks in our new financial product?",
      "Can you analyze this legal contract for potential issues?",
      "What's the best strategy for our manufacturing process optimization?"
    ]
  },
  
  // Zlata - The specialized agent focused on audit and score models
  zlata: {
    id: "zlata",
    name: "Zlata",
    avatar: "/assets/avatars/zlata.png",
    description: "Zlata specializes in technical precision and probability assessment, combining the Audit™ and Score™ models for data-driven insights.",
    models: ["audit", "score"],
    personality: {
      tone: "analytical",
      style: "precise",
      strengths: ["technical accuracy", "risk assessment", "quantitative analysis"]
    },
    introduction: "Greetings, I'm Zlata. I specialize in technical verification and probability assessment. I can help you validate processes, identify issues, quantify risks, and provide confidence metrics for your decisions. What would you like to analyze today?",
    sampleQuestions: [
      "What's the compliance score of our current protocol?",
      "What's the probability of success for this investment strategy?",
      "Can you verify if this code meets our security standards?",
      "What are the key risk factors in our supply chain?"
    ]
  },
  
  // Mirror - The reflective agent focused on introspekt and tactic models
  mirror: {
    id: "mirror",
    name: "Mirror",
    avatar: "/assets/avatars/mirror.png",
    description: "Mirror combines contextual understanding with strategic foresight, using the Introspekt™ and Tactic™ models to provide holistic insights and recommendations.",
    models: ["introspekt", "tactic"],
    personality: {
      tone: "thoughtful",
      style: "strategic",
      strengths: ["contextual awareness", "strategic planning", "holistic thinking"]
    },
    introduction: "Hi there, I'm Mirror. I focus on understanding context and developing strategies. I can help you explore different perspectives, consider nuances, and develop action plans for your goals. What would you like to discuss today?",
    sampleQuestions: [
      "What factors should we consider for our market expansion?",
      "How can we improve our team's collaboration?",
      "What strategic approach should we take for our new product launch?",
      "Can you help me understand different perspectives on this complex issue?"
    ]
  }
};

/**
 * Get a chat agent by ID
 * @param {string} agentId - The ID of the agent
 * @returns {Object} The chat agent
 */
function getChatAgent(agentId) {
  return chatAgents[agentId] || chatAgents.slavko;
}

/**
 * Get all available chat agents
 * @returns {Array} Array of chat agents
 */
function getAllChatAgents() {
  return Object.values(chatAgents);
}

/**
 * Generate a response from a chat agent
 * @param {string} agentId - The ID of the agent
 * @param {string} message - The user message
 * @param {Object} context - Additional context
 * @returns {Promise<Object>} The agent's response
 */
async function generateAgentResponse(agentId, message, context = {}) {
  const agent = getChatAgent(agentId);
  
  try {
    // In a real implementation, this would call the SlavkoKernel™ API
    // Here we're simulating the response generation
    const response = await simulateAgentResponse(agent, message, context);
    return {
      agentId: agent.id,
      message: response.message,
      modelInsights: response.modelInsights,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error generating response for agent ${agentId}:`, error);
    throw error;
  }
}

/**
 * Simulate a response from a chat agent (for demo purposes)
 * @param {Object} agent - The chat agent
 * @param {string} message - The user message
 * @param {Object} context - Additional context
 * @returns {Promise<Object>} The simulated response
 */
async function simulateAgentResponse(agent, message, context) {
  // This is a placeholder for the actual API call
  // In a real implementation, this would call the SlavkoKernel™ API with the appropriate models
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate model insights based on which models the agent uses
  const modelInsights = {};
  
  if (agent.models.includes('audit')) {
    modelInsights.audit = {
      complianceScore: Math.floor(Math.random() * 40) + 60, // 60-100
      issues: Math.random() > 0.7 ? ['Potential compliance gap identified', 'Documentation inconsistency'] : [],
      verificationStatus: Math.random() > 0.3 ? 'verified' : 'needs review'
    };
  }
  
  if (agent.models.includes('introspekt')) {
    modelInsights.introspekt = {
      perspectives: ['operational', 'customer', 'market'],
      contextFactors: ['industry trends', 'organizational culture', 'stakeholder expectations'],
      insightDepth: Math.floor(Math.random() * 3) + 3 // 3-5
    };
  }
  
  if (agent.models.includes('score')) {
    modelInsights.score = {
      probabilityScore: Math.floor(Math.random() * 40) + 60, // 60-100
      confidenceInterval: {
        lower: Math.floor(Math.random() * 10) + 50, // 50-60
        upper: Math.floor(Math.random() * 10) + 90 // 90-100
      },
      riskLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
    };
  }
  
  if (agent.models.includes('tactic')) {
    modelInsights.tactic = {
      recommendedActions: ['Analyze current state', 'Develop implementation plan', 'Monitor outcomes'],
      timelineEstimate: ['short-term', 'medium-term', 'long-term'][Math.floor(Math.random() * 3)],
      priorityLevel: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)]
    };
  }
  
  // Generate a simulated response based on the agent's personality and models
  let responseMessage = '';
  
  // This is just a simple simulation - in reality, this would be generated by the SlavkoKernel™ API
  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    responseMessage = agent.introduction;
  } else if (message.toLowerCase().includes('help')) {
    responseMessage = `I'd be happy to help! As ${agent.name}, I can assist with questions related to ${agent.models.join(', ')}. Feel free to ask me about any of these topics.`;
  } else {
    // Generate a generic response based on the agent's models
    const responses = {
      audit: "Based on my analysis, I've verified the information and identified potential compliance issues that need attention.",
      introspekt: "Looking at the broader context, there are several perspectives to consider, including stakeholder interests and industry trends.",
      score: "I've assessed the probabilities, and there's a significant likelihood of success, though some risks should be mitigated.",
      tactic: "I recommend a strategic approach that involves these key actions, prioritized by impact and feasibility."
    };
    
    responseMessage = agent.models.map(model => responses[model]).join(' ');
  }
  
  return {
    message: responseMessage,
    modelInsights
  };
}

// Export functions
module.exports = {
  getChatAgent,
  getAllChatAgents,
  generateAgentResponse
};
