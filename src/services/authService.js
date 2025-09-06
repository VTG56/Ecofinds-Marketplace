import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

import { 
  doc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from './firebase';

/**
 * Sign up a new user with email, password, and username
 * Creates user account and stores profile in Firestore
 */
export const signup = async (email, password, username) => {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile with display name
    await updateProfile(user, {
      displayName: username
    });

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: email,
      username: username,
      createdAt: serverTimestamp()
    });

    return user;
  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle specific Firebase auth errors
    switch (error.code) {
      case 'auth/email-already-in-use':
        throw new Error('An account with this email already exists.');
      case 'auth/invalid-email':
        throw new Error('Please enter a valid email address.');
      case 'auth/weak-password':
        throw new Error('Password should be at least 6 characters long.');
      case 'auth/operation-not-allowed':
        throw new Error('Email/password accounts are not enabled. Please contact support.');
      default:
        throw new Error('Failed to create account. Please try again.');
    }
  }
};

/**
 * Log in existing user with email and password
 */
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Login error:', error);
    
    // Handle specific Firebase auth errors
    switch (error.code) {
      case 'auth/user-not-found':
        throw new Error('No account found with this email address.');
      case 'auth/wrong-password':
        throw new Error('Incorrect password. Please try again.');
      case 'auth/invalid-email':
        throw new Error('Please enter a valid email address.');
      case 'auth/user-disabled':
        throw new Error('This account has been disabled. Please contact support.');
      case 'auth/too-many-requests':
        throw new Error('Too many failed login attempts. Please try again later.');
      default:
        throw new Error('Failed to log in. Please check your credentials and try again.');
    }
  }
};

/**
 * Log out the current user
 */
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Failed to log out. Please try again.');
  }
};

/**
 * Send password reset email to user
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Password reset error:', error);
    
    // Handle specific Firebase auth errors
    switch (error.code) {
      case 'auth/user-not-found':
        throw new Error('No account found with this email address.');
      case 'auth/invalid-email':
        throw new Error('Please enter a valid email address.');
      case 'auth/too-many-requests':
        throw new Error('Too many password reset requests. Please try again later.');
      default:
        throw new Error('Failed to send password reset email. Please try again.');
    }
  }
};
/**
 * Sign in with Google popup
 */
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Create user doc in Firestore if new
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      username: user.displayName || "",
      createdAt: serverTimestamp()
    }, { merge: true });

    return user;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw new Error("Google login failed. Please try again.");
  }
};

/**
 * Get the currently authenticated user
 * Returns user object if logged in, null if not
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Listen to authentication state changes
 * Calls callback function whenever user signs in or out
 */
export const onAuthChanged = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Check if user is currently authenticated
 * Returns boolean
 */
export const isAuthenticated = () => {
  return auth.currentUser !== null;
};

/**
 * Get user's email if authenticated
 * Returns email string or null
 */
export const getUserEmail = () => {
  return auth.currentUser?.email || null;
};

/**
 * Get user's display name if authenticated
 * Returns username string or null
 */
export const getUserDisplayName = () => {
  return auth.currentUser?.displayName || null;
};

/**
 * Get user's UID if authenticated
 * Returns UID string or null
 */
export const getUserId = () => {
  return auth.currentUser?.uid || null;
};