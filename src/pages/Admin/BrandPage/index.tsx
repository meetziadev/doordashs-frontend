import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { ProductCard } from '@/components';
import { Slider } from '@/components/Slider';
import { BrandPageSkeleton } from '@/components/Skeletons';
import { useGetBrandProductsQuery } from '@services/brandService';
import { mapApiProductsToCards } from '@utils/productUtils';

const BrandPage: React.FC = () => {
  const { slug = '' } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetBrandProductsQuery({ slug, page: 1, limit: 20 });

  const products = mapApiProductsToCards(data?.items ?? []);
  const brandName = data?.brand?.name ?? slug;

  if (isLoading) {
    return <BrandPageSkeleton />;
  }

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', url: '/admin' },
          { label: brandName || 'Brand' }
        ]}
      />

      <div className="flex items-center gap-4">
        {data?.brand?.logo_url ? (
          <img
            src={data.brand.logo_url}
            alt={brandName}
            className="h-16 w-16 rounded-full object-cover border border-gray-200"
          />
        ) : null}
        <div>
          <h1 className="font-serif text-3xl text-black">{brandName}</h1>
          {data?.brand?.description ? (
            <p className="text-sm text-gray-500 mt-2 max-w-2xl">{data.brand.description}</p>
          ) : null}
          <p className="text-sm text-gray-500 mt-1">{products.length} products</p>
        </div>
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
          ariaLabel={`${brandName} products`}
        />
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">No products found for this brand.</p>
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

export default BrandPage;
