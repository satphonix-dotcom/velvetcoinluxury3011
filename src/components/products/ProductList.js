import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productSlice';
import LuxuryLayout from '../layout/LuxuryLayout';
import ProductCard from './ProductCard';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <LuxuryLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif text-luxury-cream mb-8">Our Collection</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-luxury-gold"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-luxury-cream">{error}</p>
            <button
              onClick={() => dispatch(fetchProducts())}
              className="mt-4 text-luxury-gold hover:text-luxury-gold-light transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-luxury-cream">No products available</p>
          </div>
        )}
      </div>
    </LuxuryLayout>
  );
};

export default ProductList;