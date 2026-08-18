import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { ProductCard } from '@/components';
import { Slider } from '@/components/Slider';
import { CategoryPageSkeleton } from '@/components/Skeletons';
import { useGetProductsByCategoryQuery } from '@services/productService';
import { mapApiProductsToCards } from '@utils/productUtils';

const CategoryPage: React.FC = () => {
  const { slug = '' } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetProductsByCategoryQuery({
    slug,
    page: 1,
    limit: 20
  });

  const products = mapApiProductsToCards(data?.items ?? []);
  const categoryName = data?.items?.[0]?.categories?.find((c) => c.slug === slug)?.name ?? slug;

  if (isLoading) {
    return <CategoryPageSkeleton />;
  }

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', url: '/' },
          { label: categoryName || 'Category' }
        ]}
      />

      <div>
        <h1 className="font-serif text-3xl text-black capitalize">{categoryName || 'Category'}</h1>
        <p className="text-sm text-gray-500 mt-2">{products.length} products</p>
      </div>

      {products.length ? (
        <Slider
          items={products}
          getKey={(product) => product.slug}
          renderItem={(product) => <ProductCard product={product} />}
          gap="1.5rem"
          height="auto"
          scrollAmount={2}
          arrowVisibility="always"
          arrow="arrow"
          ariaLabel={`${categoryName} products`}
        />
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">No products found in this category.</p>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
