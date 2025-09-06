import React from 'react';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  // You can fetch these categories from Firestore or define them here
  const categories = ['All', 'Electronics', 'Fashion', 'Home Goods', 'Books', 'DIY'];

  return (
    <div className="category-filter">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value.toLowerCase())}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        {categories.map((category) => (
          <option key={category} value={category.toLowerCase()}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;