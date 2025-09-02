import * as admin from 'firebase-admin';

// Provjera je li Firebase Admin već inicijaliziran
if (!admin.apps.length) {
  // Koristi environment varijable za konfiguraciju
  // U produkciji, ove vrijednosti trebaju biti postavljene u Vercel dashboardu
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        // Zamijeni \n s pravim novim redovima u private key
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      databaseURL: `https://${process.env.FIREBASE_ADMIN_PROJECT_ID}.firebaseio.com`,
    });
    console.log('Firebase Admin inicijaliziran');
  } catch (error) {
    console.error('Firebase admin inicijalizacija nije uspjela:', error);
  }
}

// Izvoz Firestore instance
export const db = admin.firestore();

// Izvoz Auth instance
export const auth = admin.auth();

// Izvoz Storage instance
export const storage = admin.storage();

// Izvoz cijelog admin objekta
export default admin;