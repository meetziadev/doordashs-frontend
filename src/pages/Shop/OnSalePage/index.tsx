import React from 'react';
import ProductCollectionPage from '@pages/Shop/ProductCollectionPage';
import { useGetOnSaleProductsQuery } from '@services/productService';
import { mapApiProductsToCards } from '@utils/productUtils';

const OnSalePage: React.FC = () => {
  const { data, isLoading } = useGetOnSaleProductsQuery({ page: 1, limit: 12 });
  const products = mapApiProductsToCards(data?.items ?? []);

  return (
    <ProductCollectionPage
      title="On Sale"
      description="Shop discounted styles while they last."
      products={products}
      totalCount={data?.total}
      isLoading={isLoading}
      emptyMessage="No sale products available right now."
    />
  );
};

export default OnSalePage;
