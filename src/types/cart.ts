import type { ApiProduct, ProductVariant } from '@/types/product';

export type Cart = {
  id: string;
  userId?: string;
  status?: string;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
};

export type CartItemApi = {
  id: string;
  product: ApiProduct;
  variant: ProductVariant;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type CartData = {
  cart: Cart;
  items: CartItemApi[];
};

export type CartItemView = {
  id: string;
  name: string;
  brand?: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
};

export type CheckoutDto = {
  addressId: string;
  paymentMethod: 'cash_on_delivery';
};

export type CheckoutResult = {
  orderId?: string;
  orderNumber?: string;
  status?: string;
  totalAmount?: number;
};
