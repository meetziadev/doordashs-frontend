import React from 'react';
import ActiveOrderCard from '@/components/orders/ActiveOrderCard';
import { ActiveOrderCardSkeleton } from '@/components/Skeletons';
import { useCancelOrderMutation, useGetOrderDetailsQuery } from '@services/orderService';
import {
  canCancelOrder,
  formatOrderDate,
  formatOrderPrice,
  formatOrderStatus,
  getEstimatedDeliveryLabel,
  mapOrderItemsToCardItems
} from '@utils/orderUtils';
import { getApiErrorMessage } from '@utils/authUtils';
import { useToastContext } from '@components/Toast';

type Props = {
  orderId: string;
  isHighlighted?: boolean;
};

const ActiveOrderCardLoader: React.FC<Props> = ({ orderId, isHighlighted = false }) => {
  const { error: showError, success: showSuccess } = useToastContext();
  const { data, isLoading } = useGetOrderDetailsQuery(orderId);
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();

  if (isLoading || !data) {
    return <ActiveOrderCardSkeleton />;
  }

  const handleCancel = async () => {
    try {
      await cancelOrder(orderId).unwrap();
      showSuccess('Order cancelled successfully');
    } catch (error) {
      showError(getApiErrorMessage(error, 'Failed to cancel order'));
    }
  };

  return (
    <ActiveOrderCard
      id={data.order.orderNumber}
      date={formatOrderDate(data.order.placedAt || data.order.createdAt)}
      deliveryDate={getEstimatedDeliveryLabel(data)}
      status={formatOrderStatus(data.order.status)}
      items={mapOrderItemsToCardItems(data)}
      totalPrice={formatOrderPrice(data.order.totalAmount)}
      isHighlighted={isHighlighted}
      canCancel={canCancelOrder(data.order.status)}
      isCancelling={isCancelling}
      onCancel={handleCancel}
    />
  );
};

export default ActiveOrderCardLoader;
