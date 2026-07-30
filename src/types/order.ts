export type OrderStatus =
  | 'pending'
  | 'brand_confirmed'
  | 'rider_assigned'
  | 'picked_up'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type OrderListItem = {
  id: string;
  orderNumber: string;
  totalAmount: number;
  status: OrderStatus;
  deliveredAt: string | null;
  createdAt: string;
};

export type OrderListData = {
  items: OrderListItem[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type OrderItem = {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productSnapshot: {
    title: string;
    thumbnail?: string;
  };
};

export type OrderTimelineEvent = {
  status: OrderStatus;
  note?: string;
  createdAt: string;
};

export type OrderDetails = {
  order: {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    paymentStatus?: string;
    paymentMethod?: string;
    subtotal: number;
    deliveryFee: number;
    discountAmount?: number;
    totalAmount: number;
    estimatedDeliveryTime?: string | null;
    placedAt?: string;
    createdAt: string;
    deliveryAddress?: {
      label?: string;
      full_address?: string;
      city?: string;
      area?: string;
    };
  };
  items: OrderItem[];
  payment?: {
    paymentMethod?: string;
    paymentStatus?: string;
    amount?: number;
  };
  timeline?: OrderTimelineEvent[];
};
