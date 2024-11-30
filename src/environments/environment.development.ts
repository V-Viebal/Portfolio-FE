import * as dotenv from 'dotenv';

dotenv.config();

export const ENVIRONMENT = {
    PRODUCTION: process.env.NODE_ENV === 'production',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    FIREBASE_CONFIG: {
        apiKey: process.env.FIREBASE_API_KEY || '',
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'web.firebaseapp.com',
        projectId: process.env.FIREBASE_PROJECT_ID || 'web',
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'web.appspot.com',
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
        appId: process.env.FIREBASE_APP_ID || ''
    }
};
