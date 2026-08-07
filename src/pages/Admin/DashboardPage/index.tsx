import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CategorySlideItem, ProductCategorySlideItem, Slider } from '@/components/Slider';
import {
  CollectionSection,
  ProductCard,
  ProductOfTheDay,
  PromoCard,
  KidsDressBanner
} from '@/components';
import {
  useGetFeaturedProductsQuery,
  useGetProductsQuery,
  useGetTrendingProductsQuery
} from '@services/productService';
import {
  CategoryRowSkeleton,
  CategoryTileRowSkeleton,
  ProductOfTheDaySkeleton,
  ProductSliderSkeleton
} from '@/components/Skeletons';
import {
  extractCategoriesFromProducts,
  mapApiProductsToCards
} from '@utils/productUtils';
import {
  newArrivalsPromo,
  bestSellersPromo,
  holidayOutfitPromo
} from '@assets/images';

const ProductSlider: React.FC<{
  products: ReturnType<typeof mapApiProductsToCards>;
  ariaLabel: string;
  isLoading?: boolean;
}> = ({ products, ariaLabel, isLoading }) => {
  if (isLoading) {
    return <ProductSliderSkeleton />;
  }

  if (!products.length) {
    return <p className="text-sm text-gray-500">No products available.</p>;
  }

  return (
    <Slider
      items={products}
      getKey={(product) => product.slug}
      renderItem={(product) => <ProductCard product={product} />}
      gap="1.5rem"
      height="auto"
      scrollAmount={2}
      arrowVisibility="always"
      arrow="arrow"
      ariaLabel={ariaLabel}
    />
  );
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const { data: catalogData, isLoading: isCatalogLoading } = useGetProductsQuery({
    page: 1,
    limit: 40,
    sort: 'newest'
  });
  const { data: trendingData, isLoading: isTrendingLoading } = useGetTrendingProductsQuery({
    page: 1,
    limit: 8
  });
  const { data: featuredData, isLoading: isFeaturedLoading } = useGetFeaturedProductsQuery({
    page: 1,
    limit: 8
  });
  const { data: newestData, isLoading: isNewestLoading } = useGetProductsQuery({
    page: 1,
    limit: 8,
    sort: 'newest'
  });

  const categories = extractCategoriesFromProducts(catalogData?.items ?? []);
  const trendingProducts = mapApiProductsToCards(trendingData?.items ?? []);
  const featuredProducts = mapApiProductsToCards(featuredData?.items ?? []);
  const newestProducts = mapApiProductsToCards(newestData?.items ?? []);
  const productOfTheDay = featuredProducts[0] ?? trendingProducts[0];

  return (
    <div className="space-y-12">
      <section aria-label="Shop by category">
        {isCatalogLoading ? (
          <CategoryRowSkeleton />
        ) : categories.length ? (
          <Slider
            items={categories}
            getKey={(category) => category.slug}
            renderItem={(category) => (
              <CategorySlideItem
                label={category.name}
                image={category.image}
                onClick={() => navigate(`/admin/category/${category.slug}`)}
              />
            )}
            gap="1.5rem"
            height="auto"
            scrollAmount={2}
            ariaLabel="Shop by category"
          />
        ) : (
          <p className="text-sm text-gray-500">No categories available.</p>
        )}
      </section>

      <CollectionSection title="Shop by Category">
        {isCatalogLoading ? (
          <CategoryTileRowSkeleton />
        ) : categories.length ? (
          <Slider
            items={categories}
            getKey={(category) => category.slug}
            renderItem={(category) => (
              <ProductCategorySlideItem
                label={category.name}
                image={category.image}
                onClick={() => navigate(`/admin/category/${category.slug}`)}
              />
            )}
            gap="1rem"
            height="auto"
            scrollAmount={2}
            arrowVisibility="always"
            arrow="arrow"
            ariaLabel="Shop by category"
          />
        ) : (
          <p className="text-sm text-gray-500">No categories available.</p>
        )}
      </CollectionSection>

      <CollectionSection title="Trendsetting Collection Highlights">
        <ProductSlider
          products={trendingProducts}
          isLoading={isTrendingLoading}
          ariaLabel="Trendsetting Collection Highlights"
        />
      </CollectionSection>

      {isFeaturedLoading && isTrendingLoading ? (
        <ProductOfTheDaySkeleton />
      ) : (
        <ProductOfTheDay product={productOfTheDay} isLoading={false} />
      )}

      <CollectionSection title="Top Selling">
        <ProductSlider
          products={featuredProducts}
          isLoading={isFeaturedLoading}
          ariaLabel="Top Selling Products"
        />
      </CollectionSection>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PromoCard title="New Arrivals" buttonText="SHOP THE LATEST" image={newArrivalsPromo} />
        <PromoCard title="Best-Sellers" buttonText="SHOP YOUR FAVORITES" image={bestSellersPromo} />
        <PromoCard
          title="The Holiday Outfit"
          buttonText="SHOP OCCASION"
          image={holidayOutfitPromo}
        />
      </section>

      <CollectionSection title="You might also like">
        <ProductSlider
          products={newestProducts}
          isLoading={isNewestLoading}
          ariaLabel="You might also like products"
        />
      </CollectionSection>

      <KidsDressBanner />
    </div>
  );
};

export default AdminDashboard;
