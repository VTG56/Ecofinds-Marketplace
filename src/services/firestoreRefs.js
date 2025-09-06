// src/services/firestoreRefs.js
import { collection, doc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Centralized Firestore collection + document refs
 * to avoid hardcoding paths everywhere
 */

// Root collections
export const usersCol = collection(db, "users");
export const productsCol = collection(db, "products");

// User subcollections
export const userDoc = (uid) => doc(db, "users", uid);
export const userCartCol = (uid) => collection(db, "users", uid, "cart");
export const userPurchasesCol = (uid) => collection(db, "users", uid, "purchases");

// Products
export const productDoc = (id) => doc(db, "products", id);
