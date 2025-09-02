// SlavkoKernel™ Stripe Integration
// This file handles all Stripe-related functionality for the SlavkoKernel™ platform

const STRIPE_PUBLIC_KEY = 'pk_test_slavkokernel'; // Replace with actual public key in production
const STRIPE_SECRET_KEY = 'sk_test_slavkokernel'; // Replace with actual secret key in production

// Import required libraries
// const stripe = require('stripe')(STRIPE_SECRET_KEY);

/**
 * Initialize Stripe with the public key
 * @returns {Object} Stripe instance
 */
function initializeStripe() {
  return Stripe(STRIPE_PUBLIC_KEY);
}

/**
 * Create a checkout session for subscription
 * @param {string} planId - The ID of the selected plan
 * @param {string} customerId - Optional customer ID for existing customers
 * @returns {Promise<Object>} Checkout session
 */
async function createCheckoutSession(planId, customerId = null) {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        planId,
        customerId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

/**
 * Redirect to Stripe Checkout
 * @param {string} sessionId - The ID of the checkout session
 */
function redirectToCheckout(sessionId) {
  const stripe = initializeStripe();
  stripe.redirectToCheckout({ sessionId });
}

/**
 * Create a subscription for a customer
 * @param {string} customerId - The ID of the customer
 * @param {string} priceId - The ID of the price
 * @returns {Promise<Object>} Subscription
 */
async function createSubscription(customerId, priceId) {
  try {
    const response = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        priceId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create subscription');
    }

    const subscription = await response.json();
    return subscription;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}

/**
 * Update a subscription
 * @param {string} subscriptionId - The ID of the subscription
 * @param {Object} updateParams - The parameters to update
 * @returns {Promise<Object>} Updated subscription
 */
async function updateSubscription(subscriptionId, updateParams) {
  try {
    const response = await fetch(`/api/update-subscription/${subscriptionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateParams),
    });

    if (!response.ok) {
      throw new Error('Failed to update subscription');
    }

    const subscription = await response.json();
    return subscription;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}

/**
 * Cancel a subscription
 * @param {string} subscriptionId - The ID of the subscription
 * @returns {Promise<Object>} Canceled subscription
 */
async function cancelSubscription(subscriptionId) {
  try {
    const response = await fetch(`/api/cancel-subscription/${subscriptionId}`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to cancel subscription');
    }

    const subscription = await response.json();
    return subscription;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
}

/**
 * Create a customer portal session
 * @param {string} customerId - The ID of the customer
 * @returns {Promise<Object>} Customer portal session
 */
async function createCustomerPortalSession(customerId) {
  try {
    const response = await fetch('/api/create-customer-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create customer portal session');
    }

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    throw error;
  }
}

/**
 * Get customer subscription details
 * @param {string} customerId - The ID of the customer
 * @returns {Promise<Object>} Customer subscription details
 */
async function getCustomerSubscription(customerId) {
  try {
    const response = await fetch(`/api/customer-subscription/${customerId}`);

    if (!response.ok) {
      throw new Error('Failed to get customer subscription');
    }

    const subscription = await response.json();
    return subscription;
  } catch (error) {
    console.error('Error getting customer subscription:', error);
    throw error;
  }
}

/**
 * Apply a coupon to a subscription
 * @param {string} subscriptionId - The ID of the subscription
 * @param {string} couponId - The ID of the coupon
 * @returns {Promise<Object>} Updated subscription
 */
async function applyCoupon(subscriptionId, couponId) {
  try {
    const response = await fetch(`/api/apply-coupon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscriptionId,
        couponId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to apply coupon');
    }

    const subscription = await response.json();
    return subscription;
  } catch (error) {
    console.error('Error applying coupon:', error);
    throw error;
  }
}

/**
 * Handle webhook events from Stripe
 * @param {Object} event - The webhook event
 * @returns {Promise<void>}
 */
async function handleWebhookEvent(event) {
  try {
    switch (event.type) {
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionCanceled(event.data.object);
        break;
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object);
        break;
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error('Error handling webhook event:', error);
    throw error;
  }
}

// Export all functions
module.exports = {
  initializeStripe,
  createCheckoutSession,
  redirectToCheckout,
  createSubscription,
  updateSubscription,
  cancelSubscription,
  createCustomerPortalSession,
  getCustomerSubscription,
  applyCoupon,
  handleWebhookEvent,
};
