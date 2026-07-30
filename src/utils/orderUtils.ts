import type { ActiveOrderItem } from '@/components/UI/ActiveOrderCard';
import type { HistoryOrderRow } from '@/components/UI/HistoryOrderCard';
import type { OrderDetails, OrderListItem, OrderStatus } from '@/types/order';

export const formatOrderPrice = (amount: number): string =>
  `Rs ${amount.toLocaleString('en-US')}`;

export const formatOrderDate = (value?: string | null): string => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export const formatOrderStatus = (status: OrderStatus): string =>
  status
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const mapOrderItemsToCardItems = (details: OrderDetails): ActiveOrderItem[] =>
  details.items.map((item) => ({
    name: item.productSnapshot.title,
    size: item.variantId,
    color: '—',
    qty: item.quantity,
    image: item.productSnapshot.thumbnail || ''
  }));

export const mapHistoryOrderToRow = (order: OrderListItem): HistoryOrderRow => ({
  id: order.orderNumber,
  date: formatOrderDate(order.createdAt),
  deliveredDate: order.deliveredAt
    ? formatOrderDate(order.deliveredAt)
    : formatOrderStatus(order.status),
  price: formatOrderPrice(order.totalAmount),
  status: order.status
});

export const getEstimatedDeliveryLabel = (details: OrderDetails): string => {
  if (details.order.estimatedDeliveryTime) {
    return formatOrderDate(details.order.estimatedDeliveryTime);
  }
  return '3-5 business days';
};

export const canCancelOrder = (status: OrderStatus): boolean => status === 'pending';
