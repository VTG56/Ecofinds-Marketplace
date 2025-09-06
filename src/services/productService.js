import { db, auth } from "./firebase";
import { 
  collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, 
  onSnapshot, serverTimestamp, increment 
} from "firebase/firestore";

// Add a new product to the products collection
export const addProduct = async (productData) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("You must be logged in to add a product");
    }

    const productDoc = {
      ...productData,
      createdAt: serverTimestamp(),
      ownerId: currentUser.uid
    };

    const docRef = await addDoc(collection(db, "products"), productDoc);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product");
  }
};

// Get all products with real-time updates
export const getProducts = (callback) => {
  try {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const products = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        callback(products);
      },
      (error) => {
        console.error("Error getting products:", error);
        throw new Error("Failed to load products");
      }
    );
    
    return unsubscribe;
  } catch (error) {
    console.error("Error setting up products listener:", error);
    throw new Error("Failed to setup products listener");
  }
};

// Get a single product by ID
export const getProductById = async (productId) => {
  try {
    const productDoc = await getDoc(doc(db, "products", productId));
    
    if (!productDoc.exists()) {
      throw new Error("Product not found");
    }
    
    return {
      id: productDoc.id,
      ...productDoc.data()
    };
  } catch (error) {
    console.error("Error getting product:", error);
    throw new Error("Failed to load product");
  }
};

// Update an existing product
export const updateProduct = async (productId, updatedData) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("You must be logged in to update a product");
    }

    const product = await getProductById(productId);
    if (product.ownerId !== currentUser.uid) {
      throw new Error("You can only update your own products");
    }

    await updateDoc(doc(db, "products", productId), updatedData);
    return productId;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("You must be logged in to delete a product");
    }

    const product = await getProductById(productId);
    if (product.ownerId !== currentUser.uid) {
      throw new Error("You can only delete your own products");
    }

    await deleteDoc(doc(db, "products", productId));
    return productId;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
};

// Add product to user's cart
export const addToCart = async (userId, product) => {
  try {
    // The document ID in the cart is the product ID for easy access
    const cartItemRef = doc(db, "carts", userId, "items", product.id);
    const cartItemDoc = await getDoc(cartItemRef);

    if (cartItemDoc.exists()) {
      // Product already in cart, increment quantity
      await updateDoc(cartItemRef, {
        quantity: increment(1)
      });
    } else {
      // Add new item to cart
      await setDoc(cartItemRef, {
        productId: product.id,
        title: product.title,
        price: product.price,
        category: product.category,
        image: product.image || null,
        quantity: 1,
        addedAt: serverTimestamp()
      });
    }
    
    return true;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error("Failed to add product to cart");
  }
};

// Get user's cart with real-time updates
export const getCart = (userId, callback) => {
  try {
    const unsubscribe = onSnapshot(
      collection(db, "carts", userId, "items"),
      (snapshot) => {
        const cartItems = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        callback(cartItems);
      },
      (error) => {
        console.error("Error getting cart:", error);
        throw new Error("Failed to load cart");
      }
    );
    
    return unsubscribe;
  } catch (error) {
    console.error("Error setting up cart listener:", error);
    throw new Error("Failed to setup cart listener");
  }
};

// Remove product from user's cart
export const removeFromCart = async (userId, productId) => {
  try {
    await deleteDoc(doc(db, "carts", userId, "items", productId));
    return true;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw new Error("Failed to remove product from cart");
  }
};

// Clear user's entire cart
export const clearCart = async (userId) => {
  try {
    const cartItemsSnapshot = await getDocs(collection(db, "carts", userId, "items"));
    const deletePromises = cartItemsSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    return true;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw new Error("Failed to clear cart");
  }
};


// Create a new order (purchase)
export const createOrder = async (userId, cartItems, totalAmount) => {
  try {
    const orderData = {
      userId: userId,
      items: cartItems,
      totalAmount: totalAmount,
      status: "completed",
      createdAt: serverTimestamp()
    };

    const orderRef = await addDoc(collection(db, "history", userId, "orders"), orderData);
    
    // Clear cart after successful order
    await clearCart(userId);
    
    return orderRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
};

// Get products by category
export const getProductsByCategory = (category, callback) => {
  try {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        let products = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        if (category && category !== 'all') {
          products = products.filter(product => 
            product.category.toLowerCase() === category.toLowerCase()
          );
        }
        
        callback(products);
      },
      (error) => {
        console.error("Error getting products by category:", error);
        throw new Error("Failed to load products");
      }
    );
    
    return unsubscribe;
  } catch (error) {
    console.error("Error setting up category products listener:", error);
    throw new Error("Failed to setup products listener");
  }
};

// Search products by title or description
export const searchProducts = (searchTerm, callback) => {
  try {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        let products = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        if (searchTerm && searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          products = products.filter(product => 
            product.title.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term)
          );
        }
        
        callback(products);
      },
      (error) => {
        console.error("Error searching products:", error);
        throw new Error("Failed to search products");
      }
    );
    
    return unsubscribe;
  } catch (error) {
    console.error("Error setting up product search listener:", error);
    throw new Error("Failed to setup search listener");
  }
};