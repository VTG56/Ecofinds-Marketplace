// src/services/firestorePaths.js
/**
 * String-based paths for Firestore.
 * Useful for debugging or when using security rules.
 */

// Collections
export const USERS = "users";
export const PRODUCTS = "products";

// User subcollections
export const userPath = (uid) => `users/${uid}`;
export const userCartPath = (uid) => `users/${uid}/cart`;
export const userPurchasesPath = (uid) => `users/${uid}/purchases`;

// Product doc path
export const productPath = (id) => `products/${id}`;
