import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star } from '@assets/icons';
import Tabs from '@/components/common/Tabs';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import ProductGallery from '@/components/product/ProductGallery';
import QuantitySelector from '@/components/product/QuantitySelector';
import { useGetProductBySlugQuery } from '@services/productService';
import { useGetBrandsQuery } from '@services/brandService';
import { useAddCartItemMutation } from '@services/cartService';
import {
  getProductBrandName,
  getProductPrimaryImage,
  getSelectedVariant,
  getVariantSizes,
  mapApiProductToCard
} from '@utils/productUtils';
import { ProductDetailSkeleton } from '@/components/Skeletons';
import { getApiErrorMessage } from '@utils/authUtils';
import { useToastContext } from '@components/Toast';

export const ProductDetailPage: React.FC = () => {
  const { id: slug = '' } = useParams();
  const navigate = useNavigate();
  const { error: showError, success: showSuccess } = useToastContext();

  const { data: product, isLoading, isError } = useGetProductBySlugQuery(slug, {
    skip: !slug
  });
  const { data: brands = [] } = useGetBrandsQuery();
  const [addCartItem, { isLoading: isAddingToCart }] = useAddCartItemMutation();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  const sizes = useMemo(() => (product ? getVariantSizes(product) : []), [product]);
  const images = useMemo(
    () => product?.images?.map((image) => image.url).filter(Boolean) ?? [],
    [product]
  );
  const brandName = useMemo(
    () => (product ? getProductBrandName(product, brands) : undefined),
    [product, brands]
  );

  useEffect(() => {
    if (sizes.length && !selectedSize) {
      setSelectedSize(sizes[0]);
    }
  }, [sizes, selectedSize]);

  const selectedVariant = product && selectedSize ? getSelectedVariant(product, selectedSize) : undefined;
  const cardProduct = product ? mapApiProductToCard(product) : null;
  const currency = cardProduct?.currency || 'RS';

  const formatPrice = (value: number) =>
    `${currency} ${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

  const displayPrice = selectedVariant?.sale_price ?? selectedVariant?.price ?? cardProduct?.price ?? 0;
  const originalPrice =
    selectedVariant?.sale_price != null ? selectedVariant.price : cardProduct?.originalPrice;

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, i) => {
      const starValue = i + 1;
      if (rating >= starValue) {
        return <Star key={i} className="h-4.5 w-4.5 fill-[#FBBF24] stroke-[#FBBF24]" />;
      }
      if (rating > i && rating < starValue) {
        return (
          <div key={i} className="relative h-4.5 w-4.5">
            <Star className="absolute top-0 left-0 h-4.5 w-4.5 fill-[#E5E7EB] stroke-[#E5E7EB]" />
            <div className="absolute top-0 left-0 h-4.5 overflow-hidden" style={{ width: '50%' }}>
              <Star className="h-4.5 w-4.5 fill-[#FBBF24] stroke-[#FBBF24]" />
            </div>
          </div>
        );
      }
      return <Star key={i} className="h-4.5 w-4.5 fill-[#E5E7EB] stroke-[#E5E7EB]" />;
    });

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) {
      showError('Please select a size');
      return;
    }

    try {
      await addCartItem({
        productId: product._id,
        variantId: selectedVariant.sku,
        quantity
      }).unwrap();
      showSuccess('Added to cart');
      navigate('/admin/cart');
    } catch (error) {
      showError(getApiErrorMessage(error, 'Failed to add to cart'));
    }
  };

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (isError || !product) {
    return (
      <div className="max-w-[1400px] mx-auto p-6 space-y-4">
        <p className="text-gray-500">Product not found.</p>
        <button
          type="button"
          onClick={() => navigate('/admin')}
          className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', url: '/admin' },
    ...(product.categories?.[0]
      ? [{ label: product.categories[0].name, url: `/admin/category/${product.categories[0].slug}` }]
      : []),
    { label: product.name }
  ];

  const productDetailsContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4 text-[#2D2A26]">
      <div className="space-y-4">
        <h3 className="text-[14px] font-extrabold font-sans tracking-wide">Description</h3>
        <p className="text-[12px] text-gray-500 leading-relaxed font-normal">
          {product.description || 'No description available.'}
        </p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-[14px] font-extrabold font-sans tracking-wide">Specifications</h3>
          <div className="mt-3 space-y-2 text-[12px] text-gray-500">
            {brandName ? (
              <p>
                Brand:{' '}
                <span className="text-gray-800 font-medium">{brandName}</span>
              </p>
            ) : null}
            {product.categories?.[0] ? (
              <p>
                Category:{' '}
                <span className="text-gray-800 font-medium">{product.categories[0].name}</span>
              </p>
            ) : null}
            {selectedVariant?.options?.color || selectedVariant?.name ? (
              <p>
                Color:{' '}
                <span className="text-gray-800 font-medium capitalize">
                  {selectedVariant.options?.color || selectedVariant.name}
                </span>
              </p>
            ) : null}
            {selectedVariant?.options?.size ? (
              <p>
                Size:{' '}
                <span className="text-gray-800 font-medium">{selectedVariant.options.size}</span>
              </p>
            ) : null}
            {product.stock?.in_stock != null ? (
              <p>
                Availability:{' '}
                <span className="text-gray-800 font-medium">
                  {product.stock.in_stock ? 'In stock' : 'Out of stock'}
                </span>
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[14px] font-extrabold font-sans tracking-wide">Shipping Information</h3>
          <div className="mt-3 space-y-2 text-[12px] text-gray-500">
            <p>Local Shipping: up to one week</p>
            <p>Cash on delivery available at checkout</p>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [{ id: 'details', label: 'Product Details', content: productDetailsContent }];

  return (
    <div className="max-w-[1400px] 2xl:max-w-[1600px] mx-auto p-2 md:p-4 lg:p-6 space-y-12 bg-white font-arial">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-stretch">
        <ProductGallery
          images={images.length ? images : [getProductPrimaryImage(product)!].filter(Boolean)}
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
        />

        <div className="flex-1 flex flex-col items-start text-left justify-between py-2 lg:max-w-[50%] xl:max-w-[45%] w-full">
          <div className="w-full">
            {brandName ? (
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                {brandName}
              </p>
            ) : null}

            <h1 className="font-serif text-[18px] sm:text-[24px] md:text-[30px] xl:text-[36px] font-bold text-gray-950 leading-tight">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                {renderStars(product.rating?.average ?? 0)}
              </div>
              <span className="ml-2 text-sm font-normal text-gray-900">
                {(product.rating?.average ?? 0).toFixed(1)}/5
              </span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-[18px] sm:text-[24px] md:text-[30px] xl:text-[36px] font-semibold text-gray-950">
                {formatPrice(displayPrice)}
              </span>
              {originalPrice && originalPrice > displayPrice && (
                <span className="text-sm sm:text-base md:text-lg xl:text-xl text-gray-400 font-normal line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
              {cardProduct?.discount && (
                <span className="bg-[#FFF0F2] text-[#FF5A70] px-3.5 py-1 rounded-full text-xs font-bold font-sans">
                  {cardProduct.discount}
                </span>
              )}
            </div>

            <p className="mt-5 text-xs md:text-[16px] text-gray-500 leading-relaxed font-normal pb-6 border-b border-gray-200 w-full">
              {product.description}
            </p>

            {sizes.length > 0 && (
              <div className="mt-6 pb-6 border-b border-gray-200 w-full">
                <h3 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
                  Choose Size
                </h3>
                <div className="flex flex-wrap gap-3 mt-3">
                  {sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-full text-xs sm:text-sm font-normal transition-all cursor-pointer active:scale-95 ${
                          isSelected
                            ? 'bg-black text-white'
                            : 'bg-[#F0EEED] text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mt-8 w-full">
            <QuantitySelector
              quantity={quantity}
              onIncrement={() => setQuantity((q) => q + 1)}
              onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-36 px-5 py-2.5 text-base"
            />

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAddingToCart || !product.stock?.in_stock}
              className="bg-black hover:bg-zinc-800 text-white rounded-full py-3 px-12 text-sm sm:text-base font-normal transition-all active:scale-98 flex-1 cursor-pointer shadow-sm disabled:opacity-60"
            >
              {isAddingToCart ? 'Adding...' : product.stock?.in_stock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>

      <Tabs
        tabs={tabs}
        activeTabId={activeTab}
        onChange={(id) => setActiveTab(id)}
        className="mt-16 xl:mt-24 2xl:mt-32"
      />
    </div>
  );
};

export default ProductDetailPage;
