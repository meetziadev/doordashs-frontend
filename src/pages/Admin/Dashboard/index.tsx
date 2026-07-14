import React from 'react';
import { useGetDashboardStatsQuery } from '@services/adminService';
import { CategorySlideItem, ProductCategorySlideItem, Slider } from '@/components/Slider';
import { CollectionSection, ProductCard, ProductOfTheDay, PromoCard, KidsDressBanner } from '@/components';
import {
  brownWomensSweater,
  verticalStripedShirt,
  courageGraphicTshirt,
  looseFitBermudaShorts,
  fadedSkinnyJeans,
  newArrivalsPromo,
  bestSellersPromo,
  holidayOutfitPromo,
  toddlerOutfit,
  juniorDress,
  babyBooties,
  categoryShirt,
  categoryDenim,
  categoryTees,
  categoryPants
} from '@assets/images';

const CATEGORY_LABELS = [
  'Casual',
  'Litter Star Dress',
  'Pants',
  'T- Shirts',
  'Sweaters',
  'Plain Shirts',
  'Toddler Tracksuit',
  'Sweaters',
  'Denim',
  'Formal Wear',
  'Activewear',
  'Outerwear',
  'Footwear',
  'Accessories',
  'Kidswear',
  'Nightwear',
  'Ethnic Wear',
  'Swimwear',
  'Bags',
  'Winter Collection'
];

const CATEGORIES = CATEGORY_LABELS.map((label, index) => {
  const id = `${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`;
  return { id, label, image: `https://picsum.photos/seed/${id}/200/200` };
});

const PRODUCT_CATEGORY_LABELS = [
  'Shirts',
  'Denim',
  'Tees',
  'Pants',
  'Sweaters',
  'Jackets',
  'Shoes',
  'Accessories',
  'Activewear',
  'Outerwear'
];

const PRODUCT_CATEGORIES = PRODUCT_CATEGORY_LABELS.map((label, index) => {
  const id = `product-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`;
  let image = `https://picsum.photos/seed/${id}/400/400`;

  if (label.toLowerCase() === 'shirts') {
    image = categoryShirt;
  } else if (label.toLowerCase() === 'denim') {
    image = categoryDenim;
  } else if (label.toLowerCase() === 'tees') {
    image = categoryTees;
  } else if (label.toLowerCase() === 'pants') {
    image = categoryPants;
  } else if (label.toLowerCase() === 'sweaters') {
    image = 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=400&h=400&fit=crop';
  }

  return { id, label, image };
});

const TRENDING_PRODUCTS = [
  {
    id: 'trending-1',
    name: "Brown Women's Sweater",
    price: 3500,
    originalPrice: 4000,
    image: brownWomensSweater,
    rating: 5.0,
    category: 'Sweaters'
  },
  {
    id: 'trending-2',
    name: 'Minimalist Wristwatch',
    price: 12000,
    originalPrice: 15000,
    image: 'https://picsum.photos/seed/watch/400/400',
    rating: 4.8,
    category: 'Accessories'
  },
  {
    id: 'trending-3',
    name: 'Classic Leather Jacket',
    price: 18000,
    originalPrice: 22000,
    image: 'https://picsum.photos/seed/leather-jacket/400/400',
    rating: 4.9,
    category: 'Outerwear'
  },
  {
    id: 'trending-4',
    name: 'Premium Denim Jeans',
    price: 5500,
    originalPrice: 6500,
    image: 'https://picsum.photos/seed/denim-jeans/400/400',
    rating: 4.7,
    category: 'Denim'
  },
  {
    id: 'trending-5',
    name: 'Sporty Running Shoes',
    price: 9500,
    originalPrice: 11000,
    image: 'https://picsum.photos/seed/shoes/400/400',
    rating: 4.6,
    category: 'Activewear'
  },
  {
    id: 'trending-6',
    name: 'Leather Crossbody Bag',
    price: 8500,
    originalPrice: 9500,
    image: 'https://picsum.photos/seed/bag/400/400',
    rating: 4.5,
    category: 'Accessories'
  },
  {
    id: 'trending-7',
    name: 'Casual Cotton Chino Pants',
    price: 4200,
    originalPrice: 5000,
    image: 'https://picsum.photos/seed/chinos/400/400',
    rating: 4.3,
    category: 'Pants'
  },
  {
    id: 'trending-8',
    name: 'Vintage Knit Beanie',
    price: 1800,
    image: 'https://picsum.photos/seed/beanie/400/400',
    rating: 4.4,
    category: 'Accessories'
  }
];

const TOP_SELLING_PRODUCTS = [
  {
    id: 'top-1',
    name: 'Vertical Striped Shirt',
    price: 3500,
    originalPrice: 4000,
    discount: '-20%',
    image: verticalStripedShirt,
    rating: 5.0,
    category: 'Shirts'
  },
  {
    id: 'top-2',
    name: 'Courage Graphic T-shirt',
    price: 3500,
    image: courageGraphicTshirt,
    rating: 4.0,
    category: 'Tees'
  },
  {
    id: 'top-3',
    name: 'Loose Fit Bermuda Shorts',
    price: 2500,
    image: looseFitBermudaShorts,
    rating: 3.0,
    category: 'Pants'
  },
  {
    id: 'top-4',
    name: 'Faded Skinny Jeans',
    price: 2500,
    image: fadedSkinnyJeans,
    rating: 4.5,
    category: 'Denim'
  },
  {
    id: 'top-5',
    name: 'Classic White Sneakers',
    price: 5000,
    originalPrice: 6000,
    discount: '-16%',
    image: 'https://picsum.photos/seed/sneakers/400/400',
    rating: 4.2,
    category: 'Footwear'
  },
  {
    id: 'top-6',
    name: 'Warm Cashmere Scarf',
    price: 3200,
    image: 'https://picsum.photos/seed/scarf/400/400',
    rating: 4.6,
    category: 'Accessories'
  },
  {
    id: 'top-7',
    name: 'Retro Aviator Sunglasses',
    price: 4500,
    originalPrice: 6000,
    discount: '-25%',
    image: 'https://picsum.photos/seed/sunglasses/400/400',
    rating: 4.7,
    category: 'Accessories'
  },
  {
    id: 'top-8',
    name: 'Tailored Formal Blazer',
    price: 15000,
    originalPrice: 18000,
    discount: '-16%',
    image: 'https://picsum.photos/seed/blazer/400/400',
    rating: 4.8,
    category: 'Outerwear'
  }
];

const YOU_MIGHT_LIKE_PRODUCTS = [
  {
    id: 'like-1',
    name: 'Toddler Turtleneck Sweater',
    price: 3500,
    originalPrice: 4000,
    image: toddlerOutfit,
    rating: 5.0,
    category: 'Sweaters'
  },
  {
    id: 'like-2',
    name: 'Junior Jersey Dress',
    price: 3500,
    originalPrice: 4000,
    image: juniorDress,
    rating: 5.0,
    category: 'Kidswear'
  },
  {
    id: 'like-3',
    name: 'Baby Booties Set',
    price: 3500,
    originalPrice: 4000,
    image: babyBooties,
    rating: 5.0,
    category: 'Accessories'
  },
  {
    id: 'like-4',
    name: 'Baby Cotton Romper',
    price: 3200,
    originalPrice: 3800,
    image: babyBooties,
    rating: 4.8,
    category: 'Kidswear'
  },
  {
    id: 'like-5',
    name: 'Kids Rainbow Stripe Tee',
    price: 2500,
    originalPrice: 3000,
    image: toddlerOutfit,
    rating: 4.9,
    category: 'Tees'
  },
  {
    id: 'like-6',
    name: 'Toddler Denim Jacket',
    price: 4500,
    originalPrice: 5000,
    image: juniorDress,
    rating: 4.7,
    category: 'Outerwear'
  },
  {
    id: 'like-7',
    name: 'Newborn Gift Set',
    price: 6000,
    originalPrice: 7000,
    image: babyBooties,
    rating: 5.0,
    category: 'Accessories'
  },
  {
    id: 'like-8',
    name: 'Junior Cotton Overalls',
    price: 4800,
    originalPrice: 5500,
    image: juniorDress,
    rating: 4.6,
    category: 'Pants'
  }
];

const AdminDashboard: React.FC = () => {
  const { data, isLoading } = useGetDashboardStatsQuery();
  return (
    <div className="space-y-12">
      <section aria-label="Shop by category">
        <Slider
          items={CATEGORIES}
          getKey={(category) => category.id}
          renderItem={(category) => <CategorySlideItem label={category.label} image={category.image} />}
          gap="1.5rem"
          height="auto"
          scrollAmount={2}
          ariaLabel="Shop by category"
        />
      </section>



      <CollectionSection title="Shop by Category">
        <Slider
          items={PRODUCT_CATEGORIES}
          getKey={(category) => category.id}
          renderItem={(category) => <ProductCategorySlideItem label={category.label} image={category.image} />}
          gap="1rem"
          height="auto"
          scrollAmount={2}
          arrowVisibility="always"
          arrow="arrow"
          ariaLabel="Shop by category"
        />
      </CollectionSection>
      <CollectionSection
        title="Trendsetting Collection Highlights"
        viewAllUrl="/collections/trending"
      >
        <Slider
          items={TRENDING_PRODUCTS}
          getKey={(product) => product.id}
          renderItem={(product) => <ProductCard product={product} />}
          gap="1.5rem"
          height="auto"
          scrollAmount={2}
          arrowVisibility="always"
          arrow="arrow"
          ariaLabel="Trendsetting Collection Highlights"
        />
      </CollectionSection>

      <ProductOfTheDay />

      <CollectionSection
        title="Top Selling"
        viewAllUrl="/collections/top-selling"
      >
        <Slider
          items={TOP_SELLING_PRODUCTS}
          getKey={(product) => product.id}
          renderItem={(product) => <ProductCard product={product} />}
          gap="1.5rem"
          height="auto"
          scrollAmount={2}
          arrowVisibility="always"
          arrow="arrow"
          ariaLabel="Top Selling Products"
        />
      </CollectionSection>

      {/* Promotional Banner Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PromoCard
          title="New Arrivals"
          buttonText="SHOP THE LATEST"
          image={newArrivalsPromo}
        />
        <PromoCard
          title="Best-Sellers"
          buttonText="SHOP YOUR FAVORITES"
          image={bestSellersPromo}
        />
        <PromoCard
          title="The Holiday Outfit"
          buttonText="SHOP OCCASION"
          image={holidayOutfitPromo}
        />
      </section>

      <CollectionSection
        title="You might also like"
        viewAllUrl="/collections/recommended"
      >
        <Slider
          items={YOU_MIGHT_LIKE_PRODUCTS}
          getKey={(product) => product.id}
          renderItem={(product) => <ProductCard product={product} />}
          gap="1.5rem"
          height="auto"
          scrollAmount={2}
          arrowVisibility="always"
          arrow="arrow"
          ariaLabel="You might also like products"
        />
      </CollectionSection>

      <KidsDressBanner />


    </div>
  );
};

export default AdminDashboard;
