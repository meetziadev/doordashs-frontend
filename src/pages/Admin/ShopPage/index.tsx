import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCollectionPage from '@pages/Admin/ProductCollectionPage';
import { useGetProductsQuery } from '@services/productService';
import { mapApiProductsToCards } from '@utils/productUtils';

const ShopPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const brandFilter = searchParams.get('brand') ?? '';

  const { data, isLoading } = useGetProductsQuery({
    page: 1,
    limit: 20,
    sort: 'newest',
    ...(brandFilter ? { brand: brandFilter } : {})
  });

  const products = useMemo(() => mapApiProductsToCards(data?.items ?? []), [data?.items]);
  const selectedBrandsCount = brandFilter ? brandFilter.split(',').filter(Boolean).length : 0;

  return (
    <ProductCollectionPage
      title="Shop"
      description={
        selectedBrandsCount
          ? `Showing products for ${selectedBrandsCount} selected brand${selectedBrandsCount > 1 ? 's' : ''}.`
          : 'Browse all products from our latest catalog.'
      }
      products={products}
      totalCount={data?.total}
      isLoading={isLoading}
      emptyMessage="No products found for the selected filters."
    />
  );
};

export default ShopPage;
