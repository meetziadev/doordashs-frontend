import type { Product } from '@/components/product/ProductCard';
import type { ApiProduct, Brand, ProductCategory, ProductVariant } from '@/types/product';

export const mapApiProductToCard = (product: ApiProduct): Product => {
  const primaryImage =
    product.images?.find((image) => image.is_primary)?.url || product.images?.[0]?.url;

  const variantWithSale = product.variants?.find(
    (variant) => variant.sale_price != null && variant.sale_price < variant.price
  );
  const firstVariant = product.variants?.[0];

  const price =
    variantWithSale?.sale_price ??
    product.pricing?.min_price ??
    firstVariant?.sale_price ??
    firstVariant?.price ??
    0;

  const originalPrice =
    variantWithSale?.price ??
    (product.pricing?.max_price && product.pricing.max_price > price
      ? product.pricing.max_price
      : firstVariant?.sale_price != null
        ? firstVariant.price
        : undefined);

  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : undefined;

  return {
    id: product._id,
    slug: product.slug,
    name: product.name,
    price,
    originalPrice: originalPrice && originalPrice > price ? originalPrice : undefined,
    discount: discountPercent ? `-${discountPercent}%` : undefined,
    image: primaryImage,
    rating: product.rating?.average,
    currency: product.pricing?.currency === 'PKR' ? 'RS' : product.pricing?.currency,
    category: product.categories?.[0]?.name
  };
};

export const mapApiProductsToCards = (products: ApiProduct[]): Product[] =>
  products.map(mapApiProductToCard);

export const extractCategoriesFromProducts = (
  products: ApiProduct[]
): Array<ProductCategory & { image?: string }> => {
  const categoryMap = new Map<string, ProductCategory & { image?: string }>();

  products.forEach((product) => {
    product.categories?.forEach((category) => {
      if (!categoryMap.has(category.slug)) {
        const image =
          product.images?.find((img) => img.is_primary)?.url || product.images?.[0]?.url;
        categoryMap.set(category.slug, { ...category, image });
      }
    });
  });

  return Array.from(categoryMap.values());
};

export const getProductPrimaryImage = (product: ApiProduct): string | undefined =>
  product.images?.find((image) => image.is_primary)?.url || product.images?.[0]?.url;

export const getVariantSizes = (product: ApiProduct): string[] => {
  const sizes = product.variants
    ?.map((variant) => variant.options?.size || variant.name)
    .filter(Boolean) as string[];

  return sizes?.length ? [...new Set(sizes)] : [];
};

export const getSelectedVariant = (
  product: ApiProduct,
  size: string
): ProductVariant | undefined =>
  product.variants?.find(
    (variant) => variant.options?.size === size || variant.name === size
  ) ?? product.variants?.[0];

export const resolveProductBrand = (
  product: ApiProduct,
  brands: Brand[] = []
): Brand | undefined => {
  if (product.brand?.name) {
    const embedded = product.brand;
    const matched = brands.find(
      (brand) =>
        brand.slug === embedded.slug ||
        brand.name.toLowerCase() === embedded.name.toLowerCase() ||
        brand.id === embedded.id
    );

    return (
      matched ?? {
        id: embedded.id ?? '',
        name: embedded.name,
        slug: embedded.slug ?? ''
      }
    );
  }

  const sortedBrands = [...brands].sort((a, b) => b.slug.length - a.slug.length);
  const tags = product.tags?.map((tag) => tag.toLowerCase()) ?? [];

  const byTag = sortedBrands.find(
    (brand) =>
      tags.includes(brand.slug.toLowerCase()) ||
      tags.includes(brand.name.toLowerCase())
  );
  if (byTag) return byTag;

  const bySlug = sortedBrands.find(
    (brand) =>
      product.slug === brand.slug || product.slug.startsWith(`${brand.slug}-`)
  );
  if (bySlug) return bySlug;

  const byCategory = sortedBrands.find((brand) =>
    product.categories?.some(
      (category) =>
        category.slug === brand.slug || category.slug.startsWith(`${brand.slug}-`)
    )
  );
  if (byCategory) return byCategory;

  return undefined;
};

export const getProductBrandName = (
  product: ApiProduct,
  brands: Brand[] = []
): string | undefined => resolveProductBrand(product, brands)?.name;
