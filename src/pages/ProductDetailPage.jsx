import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, addToCart, getProductsByCategory } from '../services/productService';
import { auth } from '../services/firebase';
import { FaChevronRight, FaShoppingCart, FaHeart } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";



const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Product not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (product) {
      const unsubscribe = getProductsByCategory(product.category, (products) => {
        // Filter out the current product from the related products list
        const filteredProducts = products.filter(p => p.id !== product.id);
        setRelatedProducts(filteredProducts);
      });

      return () => unsubscribe();
    }
  }, [product]);
  const handleQuantityChange = (value) => {
  let newQuantity = Number(value);

  // If button clicked, it's a relative change (±1)
  if (typeof value === "string") {
    newQuantity = Number(value);
  } else {
    newQuantity = quantity + value;
  }

  // Validation
  if (isNaN(newQuantity) || newQuantity < 1) {
    newQuantity = 1;
  }

  setQuantity(newQuantity);
};

  const handleAddToCart = async () => {
    if (!currentUser) {
      alert("You must be logged in to add products to your cart.");
      return;
    }
    try {
      await addToCart(currentUser.uid, { ...product, quantity });
      alert(`${quantity} x "${product.title}" added to cart!`);
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart.");
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };


  if (loading) {
    return (
      <div className="product-detail">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail">
        <div className="error-container">
          <div className="error-card">
            <h2 className="error-message">Error: {error}</h2>
            <Link to="/products" className="back-btn">
              <FaChevronRight /> Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <Link to="/home" className="breadcrumb-link">Home</Link>
            </li>
            <li className="breadcrumb-item breadcrumb-separator">/</li>
            <li className="breadcrumb-item">
              <Link to="/products" className="breadcrumb-link">Products</Link>
            </li>
            <li className="breadcrumb-item breadcrumb-separator">/</li>
            <li className="breadcrumb-item breadcrumb-current">{product.title}</li>
          </ol>
        </nav>

        {/* Product Content */}
        <div className="product-content">
          {/* Product Image Section */}
          <div className="product-image-section">
            <div className="product-image-container">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-main-image"
                />
              ) : (
                <div className="image-placeholder">
                  <IoImageOutline className="placeholder-icon" />
                  <p className="placeholder-text">Image Not Available</p>
                </div>
              )}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="product-info-section">
            <h4 className="product-category">{product.category}</h4>
            <h1 className="product-title">{product.title}</h1>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-description">{product.description}</p>

            {/* Product Actions */}
            <div className="product-actions">
              <div className="quantity-selector">
                
                
              </div>
              <div className="action-buttons">
                <button
                  onClick={handleAddToCart}
                  disabled={!currentUser}
                  className="add-to-cart-btn"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                >
                  <FaHeart />
                </button>
              </div>
            </div>

            {/* Product Meta (Placeholder for additional details) */}
            <div className="product-meta">
              <h5 className="meta-title">Product Details</h5>
              <ul className="meta-list">
                <li className="meta-item">
                  <span className="meta-label">Category:</span>
                  <span className="meta-value">{product.category}</span>
                </li>
                <li className="meta-item">
                  <span className="meta-label">ID:</span>
                  <span className="meta-value">{product.id}</span>
                </li>
                <li className="meta-item">
                  <span className="meta-label">Owner ID:</span>
                  <span className="meta-value">{product.ownerId}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2 className="related-title">Related Products</h2>
            <div className="related-grid">
              {/* This section will be populated by a separate Card component, like <ProductCard key={p.id} product={p} /> */}
              {/* You would map over the relatedProducts state here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;