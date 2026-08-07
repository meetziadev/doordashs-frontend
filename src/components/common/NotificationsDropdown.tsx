import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Trash2 } from '@assets/icons';
import {
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
  useGetUnreadNotificationCountQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation
} from '@services/notificationService';
import { NotificationListSkeleton } from '@/components/Skeletons';
import {
  formatNotificationTime,
  getNotificationCreatedAt,
  getNotificationMessage,
  getNotificationOrderId,
  getNotificationOrderNumber,
  getNotificationTitle,
  isNotificationRead
} from '@utils/notificationUtils';
import { getApiErrorMessage } from '@utils/authUtils';
import { useToastContext } from '@components/Toast';
import type { NotificationItem } from '@/types/notification';

const NotificationsDropdown: React.FC = () => {
  const navigate = useNavigate();
  const { error: showError } = useToastContext();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: notificationsData, isLoading, isError } = useGetNotificationsQuery(
    { page: 1, limit: 20 },
    { skip: !isOpen }
  );
  const { data: unreadCount = 0 } = useGetUnreadNotificationCountQuery(undefined, {
    pollingInterval: 60000
  });

  const [markNotificationRead] = useMarkNotificationReadMutation();
  const [markAllNotificationsRead, { isLoading: isMarkingAll }] =
    useMarkAllNotificationsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const notifications = notificationsData?.items ?? [];

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead().unwrap();
    } catch (error) {
      showError(getApiErrorMessage(error, 'Failed to mark all as read'));
    }
  };

  const handleNotificationClick = async (notification: NotificationItem) => {
    try {
      if (!isNotificationRead(notification)) {
        await markNotificationRead(notification.id).unwrap();
      }
    } catch (error) {
      showError(getApiErrorMessage(error, 'Failed to mark notification as read'));
    }

    setIsOpen(false);

    const orderId = getNotificationOrderId(notification);
    if (orderId) {
      navigate('/admin/orders');
    }
  };

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    notificationId: string
  ) => {
    event.stopPropagation();
    try {
      await deleteNotification(notificationId).unwrap();
    } catch (error) {
      showError(getApiErrorMessage(error, 'Failed to delete notification'));
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="relative text-muted-foreground hover:text-foreground cursor-pointer"
        aria-label="Notifications"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <Bell size={20} />
        {unreadCount > 0 ? (
          <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold leading-[18px] text-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-[calc(100%+10px)] w-[340px] sm:w-[380px] max-h-[440px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg z-50">
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-semibold text-gray-950">Notifications</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {unreadCount > 0 ? `${unreadCount} unread` : 'You are all caught up'}
              </p>
            </div>
            {unreadCount > 0 ? (
              <button
                type="button"
                onClick={handleMarkAllRead}
                disabled={isMarkingAll}
                className="text-xs font-medium text-gray-700 hover:text-black cursor-pointer disabled:opacity-60"
              >
                {isMarkingAll ? 'Marking...' : 'Mark all read'}
              </button>
            ) : null}
          </div>

          <div className="max-h-[380px] overflow-y-auto">
            {isLoading ? (
              <NotificationListSkeleton />
            ) : isError ? (
              <p className="px-4 py-6 text-sm text-gray-500">
                Unable to load notifications. Please try again.
              </p>
            ) : notifications.length === 0 ? (
              <p className="px-4 py-6 text-sm text-gray-500">No notifications yet.</p>
            ) : (
              <ul>
                {notifications.map((notification) => {
                  const read = isNotificationRead(notification);
                  const orderNumber = getNotificationOrderNumber(notification);

                  return (
                    <li key={notification.id} className="border-b border-gray-100 last:border-b-0">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleNotificationClick(notification)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            handleNotificationClick(notification);
                          }
                        }}
                        className={`flex gap-3 px-4 py-3 text-left cursor-pointer hover:bg-gray-50 ${
                          read ? 'bg-white' : 'bg-gray-50/80'
                        }`}
                      >
                        <span
                          className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                            read ? 'bg-transparent' : 'bg-red-500'
                          }`}
                          aria-hidden
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className={`text-sm truncate ${
                                read ? 'font-medium text-gray-800' : 'font-semibold text-gray-950'
                              }`}
                            >
                              {getNotificationTitle(notification)}
                            </p>
                            <span className="shrink-0 text-[11px] text-gray-400">
                              {formatNotificationTime(getNotificationCreatedAt(notification))}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">
                            {getNotificationMessage(notification)}
                          </p>
                          {orderNumber ? (
                            <p className="mt-1 text-[11px] font-medium text-gray-600">
                              Order {orderNumber}
                            </p>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          onClick={(event) => handleDelete(event, notification.id)}
                          className="shrink-0 self-start mt-0.5 text-gray-400 hover:text-red-500 cursor-pointer"
                          aria-label="Delete notification"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NotificationsDropdown;
