import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

interface TranslationSuggestion {
  originalText: string;
  suggestedTranslation: string;
  languagePair: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  score?: number;
  createdAt: admin.firestore.Timestamp;
  updatedAt?: admin.firestore.Timestamp;
}

interface AuditLog {
  userId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  timestamp: admin.firestore.Timestamp;
  details?: Record<string, any>;
}

/**
 * Creates an audit log entry
 */
async function createAuditLog(
  userId: string,
  action: string,
  resourceType: string,
  resourceId: string,
  details?: Record<string, any>
): Promise<void> {
  const auditLog: AuditLog = {
    userId,
    action,
    resourceType,
    resourceId,
    timestamp: Timestamp.now(),
    details,
  };

  await db.collection('audit_logs').add(auditLog);
}

/**
 * HTTP function to create a translation suggestion
 */
export const createSuggestion = functions.https.onCall(async (data, context) => {
  // Ensure user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You must be logged in to create suggestions'
    );
  }

  const userId = context.auth.uid;

  // Validate input data
  if (!data.originalText || !data.suggestedTranslation || !data.languagePair) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Missing required fields'
    );
  }

  // Create suggestion object
  const suggestion: TranslationSuggestion = {
    originalText: data.originalText,
    suggestedTranslation: data.suggestedTranslation,
    languagePair: data.languagePair,
    userId,
    status: 'pending',
    createdAt: Timestamp.now(),
  };

  // Add to Firestore
  const docRef = await db.collection('translations_suggestions').add(suggestion);

  // Create audit log
  await createAuditLog(
    userId,
    'create',
    'translation_suggestion',
    docRef.id,
    { originalText: data.originalText }
  );

  return {
    id: docRef.id,
    status: 'success',
    message: 'Suggestion created successfully',
  };
});

/**
 * HTTP function to update a suggestion status
 * Only admins can approve or reject suggestions
 */
export const updateSuggestionStatus = functions.https.onCall(async (data, context) => {
  // Ensure user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You must be logged in to update suggestions'
    );
  }

  const userId = context.auth.uid;

  // Check if user is admin
  const userRecord = await admin.auth().getUser(userId);
  const isAdmin = userRecord.customClaims?.admin === true;

  if (!isAdmin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only admins can update suggestion status'
    );
  }

  // Validate input data
  if (!data.suggestionId || !data.status) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Missing required fields'
    );
  }

  // Validate status
  if (!['pending', 'approved', 'rejected'].includes(data.status)) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Invalid status value'
    );
  }

  // Get suggestion reference
  const suggestionRef = db.collection('translations_suggestions').doc(data.suggestionId);
  
  // Update using transaction for atomicity
  try {
    await db.runTransaction(async (transaction) => {
      const suggestionDoc = await transaction.get(suggestionRef);
      
      if (!suggestionDoc.exists) {
        throw new functions.https.HttpsError(
          'not-found',
          'Suggestion not found'
        );
      }
      
      transaction.update(suggestionRef, {
        status: data.status,
        updatedAt: Timestamp.now(),
        reviewerId: userId,
        reviewComment: data.comment || null,
      });
    });
    
    // Create audit log
    await createAuditLog(
      userId,
      'update_status',
      'translation_suggestion',
      data.suggestionId,
      { status: data.status, comment: data.comment }
    );
    
    return {
      id: data.suggestionId,
      status: 'success',
      message: `Suggestion status updated to ${data.status}`,
    };
  } catch (error) {
    console.error('Error updating suggestion status:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to update suggestion status'
    );
  }
});

/**
 * Firestore trigger to update user stats when a suggestion is approved
 */
export const onSuggestionStatusChange = functions.firestore
  .document('translations_suggestions/{suggestionId}')
  .onUpdate(async (change, context) => {
    const beforeData = change.before.data() as TranslationSuggestion;
    const afterData = change.after.data() as TranslationSuggestion;
    
    // Only proceed if status changed to approved
    if (beforeData.status !== 'approved' && afterData.status === 'approved') {
      const userId = afterData.userId;
      
      // Update user stats
      const userRef = db.collection('users').doc(userId);
      
      try {
        await userRef.set({
          contributionStats: {
            approvedSuggestions: FieldValue.increment(1),
            lastApprovedAt: Timestamp.now(),
          }
        }, { merge: true });
        
        console.log(`Updated stats for user ${userId}`);
      } catch (error) {
        console.error('Error updating user stats:', error);
      }
    }
  });

/**
 * HTTP function to get user profile with contribution stats
 */
export const getUserProfile = functions.https.onCall(async (data, context) => {
  // Ensure user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You must be logged in to view profiles'
    );
  }

  const userId = data.userId || context.auth.uid;
  
  // If requesting another user's profile, check if requester is admin
  if (userId !== context.auth.uid) {
    const userRecord = await admin.auth().getUser(context.auth.uid);
    const isAdmin = userRecord.customClaims?.admin === true;
    
    if (!isAdmin) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'You can only view your own profile'
      );
    }
  }
  
  try {
    // Get user document
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return {
        id: userId,
        exists: false,
        message: 'User profile not found',
      };
    }
    
    const userData = userDoc.data();
    
    // Get user auth data
    const userRecord = await admin.auth().getUser(userId);
    
    // Combine data
    return {
      id: userId,
      exists: true,
      email: userRecord.email,
      displayName: userRecord.displayName || userData?.displayName,
      photoURL: userRecord.photoURL,
      createdAt: userData?.createdAt || null,
      lastLogin: userData?.lastLogin || null,
      contributionStats: userData?.contributionStats || {
        approvedSuggestions: 0,
      },
    };
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw new functions.https.HttpsError(
      'internal',
      'Failed to get user profile'
    );
  }
});