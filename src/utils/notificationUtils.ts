import type { NotificationItem } from '@/types/notification';

export const isNotificationRead = (notification: NotificationItem): boolean =>
  Boolean(notification.is_read ?? notification.isRead ?? notification.read);

export const getNotificationTitle = (notification: NotificationItem): string =>
  notification.title?.trim() ||
  (notification.type ? notification.type.replace(/_/g, ' ') : '') ||
  'Notification';

export const getNotificationMessage = (notification: NotificationItem): string =>
  notification.message?.trim() ||
  notification.body?.trim() ||
  'You have a new update.';

export const getNotificationCreatedAt = (notification: NotificationItem): string | undefined =>
  notification.created_at || notification.createdAt;

export const getNotificationOrderId = (notification: NotificationItem): string | undefined =>
  notification.order_id ||
  notification.orderId ||
  notification.data?.order_id ||
  notification.data?.orderId;

export const getNotificationOrderNumber = (notification: NotificationItem): string | undefined =>
  notification.order_number ||
  notification.orderNumber ||
  notification.data?.order_number ||
  notification.data?.orderNumber;

export const formatNotificationTime = (value?: string): string => {
  if (!value) return '';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};
