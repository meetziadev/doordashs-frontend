import type { CartItemApi, CartItemView } from '@/types/cart';
import type { Brand } from '@/types/product';
import { getProductBrandName, getProductPrimaryImage } from '@/utils/productUtils';

export const mapCartItemToView = (
  item: CartItemApi,
  brands: Brand[] = []
): CartItemView => ({
  id: item.id,
  name: item.product.name,
  brand: getProductBrandName(item.product, brands),
  size: item.variant.options?.size || item.variant.name || '—',
  color: item.variant.options?.color || '—',
  price: item.unitPrice,
  image: getProductPrimaryImage(item.product) || '',
  quantity: item.quantity
});

export const mapCartItemsToView = (
  items: CartItemApi[],
  brands: Brand[] = []
): CartItemView[] => items.map((item) => mapCartItemToView(item, brands));

