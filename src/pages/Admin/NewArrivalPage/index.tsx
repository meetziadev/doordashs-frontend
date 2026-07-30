import React from 'react';
import ProductCollectionPage from '@pages/Admin/ProductCollectionPage';
import { useGetNewArrivalsProductsQuery } from '@services/productService';
import { mapApiProductsToCards } from '@utils/productUtils';

const NewArrivalPage: React.FC = () => {
  const { data, isLoading } = useGetNewArrivalsProductsQuery({ page: 1, limit: 12 });
  const products = mapApiProductsToCards(data?.items ?? []);

  return (
    <ProductCollectionPage
      title="New Arrival"
      description="Fresh drops and the latest additions to the shop."
      products={products}
      totalCount={data?.total}
      isLoading={isLoading}
      emptyMessage="No new arrivals available right now."
    />
  );
};

export default NewArrivalPage;
