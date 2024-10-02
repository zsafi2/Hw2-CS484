import React from 'react'
import type { Product } from '../types'
import '../public/ProductList.css'
import ProductCard from './ProductCard'

interface ProductListProps {
    products: Product[] // Products should be an array of the Product type
    currentPage: number
    totalPages: number
    setCurrentPage: (page: number) => void // setCurrentPage is a function that takes a page number
}

const ProductList: React.FC<ProductListProps> = ({
    products,
    currentPage,
    totalPages,
    setCurrentPage,
}) => {
    const renderPaginationLinks = () => {
        const links = []

        for (let i = 1; i <= totalPages; i++) {
            links.push(
                <a
                    key={i}
                    href="#"
                    className={i === currentPage ? 'active' : ''}
                    onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(i) // Call setCurrentPage with the correct page number
                    }}
                >
                    {i}
                </a>
            )
        }

        return links
    }

    return (
        <div className="product-list">
            <h2>Products</h2>
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard product={product} />
                    ))}
                </div>
            )}
            <div className="pagination">{renderPaginationLinks()}</div>
        </div>
    )
}

export default ProductList
