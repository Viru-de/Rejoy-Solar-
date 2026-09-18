import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';

/**
 * Firebase Web SDK Configuration
 * Populated from Vite environment variables (VITE_FIREBASE_*)
 * with fallback to runtime window.__FIREBASE_CONFIG__ for zero-recompile Hostinger deployment.
 * Safe for client-side inclusion (Firebase API keys are public identifiers, not secret keys).
 */
const runtimeCfg = (typeof window !== 'undefined' && (window as any).__FIREBASE_CONFIG__) || {};

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || runtimeCfg.apiKey || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || runtimeCfg.authDomain || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || runtimeCfg.projectId || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || runtimeCfg.storageBucket || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || runtimeCfg.messagingSenderId || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || runtimeCfg.appId || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || runtimeCfg.measurementId || ''
};

export interface FirebaseConfigStatus {
  isConfigured: boolean;
  missingVariables: string[];
  configuredVariables: string[];
}

export const getFirebaseConfigStatus = (): FirebaseConfigStatus => {
  const envMap: Record<string, string | undefined> = {
    VITE_FIREBASE_API_KEY: firebaseConfig.apiKey,
    VITE_FIREBASE_AUTH_DOMAIN: firebaseConfig.authDomain,
    VITE_FIREBASE_PROJECT_ID: firebaseConfig.projectId,
    VITE_FIREBASE_STORAGE_BUCKET: firebaseConfig.storageBucket,
    VITE_FIREBASE_MESSAGING_SENDER_ID: firebaseConfig.messagingSenderId,
    VITE_FIREBASE_APP_ID: firebaseConfig.appId,
    VITE_FIREBASE_MEASUREMENT_ID: firebaseConfig.measurementId
  };

  const missingVariables: string[] = [];
  const configuredVariables: string[] = [];

  for (const [key, val] of Object.entries(envMap)) {
    if (!val || val.trim() === '' || val.includes('your-') || val === 'undefined') {
      missingVariables.push(key);
    } else {
      configuredVariables.push(key);
    }
  }

  // Required keys for functional Web SDK auth
  const requiredKeys = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID'
  ];
  const hasRequired = requiredKeys.every(k => configuredVariables.includes(k));

  return {
    isConfigured: hasRequired && missingVariables.length === 0,
    missingVariables,
    configuredVariables
  };
};

export const isFirebaseConfigured = (): boolean => {
  return getFirebaseConfigStatus().isConfigured;
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    // Ensure persistent login across browser sessions & refreshes
    setPersistence(auth, browserLocalPersistence).catch((err) => {
      console.warn('Could not set browserLocalPersistence:', err);
    });
  } catch (error) {
    console.error('Error initializing Firebase App/Auth:', error);
  }
}

export { app, auth };

/**
 * User-friendly error message resolver for Firebase Auth error codes
 */
export function getFirebaseErrorMessage(error: any): string {
  if (!error) return 'An unknown error occurred.';
  const code = error.code || '';
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email or password. Please verify your credentials.';
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists. Please sign in instead.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.';
    case 'auth/user-disabled':
      return 'This user account has been disabled by an administrator.';
    case 'auth/too-many-requests':
      return 'Access to this account has been temporarily disabled due to many failed attempts. Try again later or reset password.';
    case 'auth/network-request-failed':
      return 'Network connection failed. Please check your internet connection.';
    case 'auth/popup-closed-by-user':
      return 'Authentication popup was closed before completing.';
    default:
      return error.message || 'Authentication failed. Please try again.';
  }
}

export async function loginWithEmail(email: string, pass: string): Promise<User> {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized. Please verify your Firebase configuration in .env.');
  }
  const credential = await signInWithEmailAndPassword(auth, email.trim(), pass);
  return credential.user;
}

export async function registerWithEmail(
  email: string,
  pass: string,
  displayName: string
): Promise<User> {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized. Please verify your Firebase configuration in .env.');
  }
  const credential = await createUserWithEmailAndPassword(auth, email.trim(), pass);
  if (displayName) {
    await updateProfile(credential.user, { displayName: displayName.trim() });
  }
  return credential.user;
}

export async function logoutUser(): Promise<void> {
  if (!auth) return;
  await signOut(auth);
}

export async function sendPasswordReset(email: string): Promise<void> {
  if (!auth) {
    throw new Error('Firebase Auth is not initialized.');
  }
  await sendPasswordResetEmail(auth, email.trim());
}

export function subscribeToAuthState(callback: (user: User | null) => void): () => void {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}
