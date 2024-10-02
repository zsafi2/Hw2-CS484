import React from 'react';
import type { Product } from '../types';
import '../public/ProductList.css';

interface ProductListProps {
  products: Product[]; // Products should be an array of the Product type
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void; // setCurrentPage is a function that takes a page number
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const renderPaginationLinks = () => {
    const links = [];

    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <a
          key={i}
          href="#"
          className={i === currentPage ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(i); // Call setCurrentPage with the correct page number
          }}
        >
          {i}
        </a>
      );
    }

    return links;
  };

  return (
    <div className="product-list">
      <h2>Products</h2>
        {products.length === 0 ? (
            <p>No products found.</p>
        ) : 
        (
            <div className="product-grid">
            {products.slice(0, 25).map((product) => (
                <div className="product-card" key={product.id}>
                    <img
                        src={product.image_url || '/public/default-product.jpg'}
                        alt={product.name}
                        className="product-image"
                    />
                    <h4>
                        {product.name} 
                    </h4>
                    <h6> 
                        ID: {product.id}
                    </h6>
                </div>
            ))}
            </div>
        )}
      <div className="pagination">{renderPaginationLinks()}</div>
    </div>
  );
};

export default ProductList;
