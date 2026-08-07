import React from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { ProductCard } from '@/components';
import type { Product } from '@/components/product/ProductCard';
import { ProductGridSkeleton } from '@/components/Skeletons';

type ProductCollectionPageProps = {
  title: string;
  description?: string;
  products: Product[];
  totalCount?: number;
  isLoading: boolean;
  emptyMessage: string;
};

const ProductCollectionPage: React.FC<ProductCollectionPageProps> = ({
  title,
  description,
  products,
  totalCount,
  isLoading,
  emptyMessage
}) => {
  const navigate = useNavigate();
  const count = totalCount ?? products.length;

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', url: '/admin' },
          { label: title }
        ]}
      />

      <div>
        <h1 className="font-serif text-3xl text-black">{title}</h1>
        {description ? <p className="text-sm text-gray-500 mt-2">{description}</p> : null}
        <p className="text-sm text-gray-500 mt-1">{count} products</p>
      </div>

      {isLoading ? (
        <ProductGridSkeleton count={10} />
      ) : products.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">{emptyMessage}</p>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCollectionPage;
