export type NotificationItem = {
  id: string;
  title?: string;
  message?: string;
  body?: string;
  type?: string;
  is_read?: boolean;
  isRead?: boolean;
  read?: boolean;
  created_at?: string;
  createdAt?: string;
  order_id?: string;
  orderId?: string;
  order_number?: string;
  orderNumber?: string;
  data?: {
    orderId?: string;
    order_id?: string;
    orderNumber?: string;
    order_number?: string;
    [key: string]: unknown;
  };
};

export type NotificationListData = {
  items: NotificationItem[];
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
};

export type UnreadCountData = {
  count: number;
};
