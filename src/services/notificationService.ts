import { splitApi } from '@/redux/api/splitApi';
import { extractApiData } from '@/utils/authUtils';
import type {
  NotificationItem,
  NotificationListData,
  UnreadCountData
} from '@/types/notification';

type NotificationListParams = {
  page?: number;
  limit?: number;
};

const extractNotificationList = (response: unknown): NotificationListData => {
  const data = extractApiData<
    | NotificationListData
    | NotificationItem[]
    | {
        items?: NotificationItem[];
        meta?: { page?: number; limit?: number; total?: number; totalPages?: number };
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
      }
  >(response);

  if (Array.isArray(data)) {
    return { items: data };
  }

  if (data?.items) {
    return {
      items: data.items,
      page: data.page ?? data.meta?.page,
      limit: data.limit ?? data.meta?.limit,
      total: data.total ?? data.meta?.total,
      totalPages: data.totalPages ?? data.meta?.totalPages
    };
  }

  return { items: [] };
};

const extractUnreadCount = (response: unknown): number => {
  const data = extractApiData<UnreadCountData | number | { unreadCount?: number; unread_count?: number }>(
    response
  );

  if (typeof data === 'number') return data;
  if (!data || typeof data !== 'object') return 0;

  if ('count' in data && typeof data.count === 'number') return data.count;
  if ('unreadCount' in data && typeof data.unreadCount === 'number') return data.unreadCount;
  if ('unread_count' in data && typeof data.unread_count === 'number') return data.unread_count;

  return 0;
};

export const notificationService = splitApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationListData, NotificationListParams | void>({
      query: (params) => ({
        url: 'notifications',
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 20
        }
      }),
      transformResponse: extractNotificationList,
      providesTags: ['Notifications']
    }),
    getUnreadNotificationCount: builder.query<number, void>({
      query: () => ({ url: 'notifications/unread-count' }),
      transformResponse: extractUnreadCount,
      providesTags: ['Notifications']
    }),
    markNotificationRead: builder.mutation<unknown, string>({
      query: (notificationId) => ({
        url: `notifications/${notificationId}/read`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Notifications']
    }),
    markAllNotificationsRead: builder.mutation<unknown, void>({
      query: () => ({
        url: 'notifications/read-all',
        method: 'PATCH'
      }),
      invalidatesTags: ['Notifications']
    }),
    deleteNotification: builder.mutation<unknown, string>({
      query: (notificationId) => ({
        url: `notifications/${notificationId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Notifications']
    })
  }),
  overrideExisting: false
});

export const {
  useGetNotificationsQuery,
  useGetUnreadNotificationCountQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
  useDeleteNotificationMutation
} = notificationService;
