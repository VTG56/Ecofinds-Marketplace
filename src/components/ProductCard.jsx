import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/productCard.css';

const ProductCard = ({ id, title, price, category, image, onAddToCart }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click when clicking button
    onAddToCart(id);
  };

  const placeholderImage = "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image">
        <img 
          src={image || placeholderImage} 
          alt={title}
          onError={(e) => {
            e.target.src = placeholderImage;
          }}
        />
      </div>
      
      <div className="product-content">
        <div className="product-category">{category}</div>
        <h3 className="product-title">{title}</h3>
        <div className="product-price">${price}</div>
        
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;