import React, { useState } from 'react'
import { addProduct, deleteProduct } from './api'
import '../public/ProductForm.css'

// TODO
// Implement the ProductFormProps interface.
// Note that mode can be either "add" or "delete".
// onProductAdded and onProductDeleted may or may not be necessarily passed to the component.
interface ProductFormProps {
    mode: string,
    onProductAdded: () => void,
    onProductDeleted: () => void
}

const ProductForm: React.FC<ProductFormProps> = ({
    mode,
    onProductAdded,
    onProductDeleted,
}) => {
    const [name, setName] = useState('')
    const [image_url, setImageUrl] = useState(''); // Using image_url as defined in Product type
    const [productId, setProductId] = useState<number | ''>(''); // Product ID sta

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (mode === 'add') {
              // Call the addProduct API function
              await addProduct({
                  name, image_url: image_url || undefined,
                  deleted: false
              });
              setName('');
              setImageUrl('');
              if (onProductAdded) onProductAdded();
            } else if (mode === 'delete' && typeof productId === 'number') {
              // Call the deleteProduct API function
              await deleteProduct(productId);
              setProductId('');
              if (onProductDeleted) onProductDeleted();
            }
        } catch (error) {
            console.error(
                `Error ${mode === 'add' ? 'adding' : 'deleting'} product:`,
                error
            )
        }
    }

    return (
        <div className="product-form-container">
            <h2 className="product-form-title">
                {mode === 'add' ? 'Add New Product' : 'Delete Product'}
            </h2>
            <form onSubmit={handleSubmit} className="product-form">
                {mode === 'add' ? (
                    <>
                        <div className="form-group">
                            <label htmlFor="name"></label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                placeholder="Enter product name..."
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageUrl"></label>
                            <input
                                type="url"
                                id="imageUrl"
                                value={image_url}
                                placeholder="Enter image URL..."
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                        </div>
                    </>
                ) : (
                    <div className="form-group">
                        <label htmlFor="productId"></label>
                        <input
                            type="text"
                            id="productId"
                            value={productId}
                            placeholder="Enter product ID..."
                            onChange={(e) => setProductId(e.target.value ? Number(e.target.value) : '')}
                            required
                        />
                    </div>
                )}
                <button
                    type="submit"
                    className={
                        mode === 'add' ? 'submit-button' : 'delete-button'
                    }
                >
                    {mode === 'add' ? 'Add Product' : 'Delete Product'}
                </button>
            </form>
        </div>
    )
}

export default ProductForm
