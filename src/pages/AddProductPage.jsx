import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../services/productService'; 
import Navbar from '../components/Navbar';
// Assuming you have a Button component, otherwise use a standard button
// import Button from '../components/Button'; 
import "../styles/components/addComponent.css"
const AddProductPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    image: '', // Placeholder for image URL
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.price) {
      setError('Title, category, and price are required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price), // Ensure price is a number
      };
      await addProduct(productData);
      alert('Product added successfully!');
      navigate('/home'); // Redirect to home page after success
    } catch (err) {
      setError(err.message || 'Failed to add product.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Example basic TailwindCSS styling
  const inputStyle = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">List a New Product</h1>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className={labelStyle}>Title</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className={inputStyle} required />
          </div>
          
          <div>
            <label htmlFor="description" className={labelStyle}>Description</label>
            <textarea name="description" id="description" value={formData.description} onChange={handleChange} className={inputStyle} rows="4"></textarea>
          </div>

          <div>
            <label htmlFor="category" className={labelStyle}>Category</label>
            <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} className={inputStyle} required />
          </div>

          <div>
            <label htmlFor="price" className={labelStyle}>Price ($)</label>
            <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className={inputStyle} required min="0" step="0.01" />
          </div>
          
          <div>
            <label htmlFor="image" className={labelStyle}>Image URL (Optional)</label>
            <input type="text" name="image" id="image" value={formData.image} onChange={handleChange} className={inputStyle} placeholder="https://example.com/image.jpg" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
          >
            {loading ? 'Listing...' : 'List Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;