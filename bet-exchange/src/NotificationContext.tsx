import React, { createContext, useContext } from "react";
import { useAuth } from "./AuthProvider";
import { useQuery,useMutation,useQueryClient} from "@tanstack/react-query";
import { Notification } from "./Types";

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  isError: boolean;
  markAsRead: (id: number) => Promise<void>;
  createNotification: (userId: number, message: string) => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const fetchNotifications = async (userId: number) => {
  const res = await fetch(
    `http://localhost:8080/api/users/${userId}/notifications`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch notifications");
  }
  const { content } = await res.json();
  return content as Notification[];
};

export const NotificationProvider: React.FC<{children: React.ReactNode;}> = ({ children }) => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

    // 1. QUERY: fetch notifications
    const {
        data: notifications = [],
        isLoading,
        isError,
    } = useQuery<Notification[], Error>({
        queryKey: ["notifications", userId],
        queryFn: () => fetchNotifications(userId!),
        enabled: !!userId,
    });


    // 2. MUTATION: mark as read
    const markAsReadMutation = useMutation< void, Error, number >({
      mutationFn: async (notificationId) => {
        const res = await fetch(
            `http://localhost:8080/api/notifications/${notificationId}/read`,
          { 
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({notificationId}),
          }
        );
        if (!res.ok) {
          throw new Error("Could not mark as read");
        }
      },
  
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["notifications", userId],
        });
      },
    });

    // 3. MUTATION: create
    const createNotificationMutation = useMutation< void, Error, { userId: number; message: string } >({
      mutationFn: async ({ userId, message }) => {
        const res = await fetch(
          `http://localhost:8080/api/notifications`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, message }),
          }
        );
        if (!res.ok) {
          throw new Error("Could not create notification");
        }
      },
      
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
      },
    });


  const markAsRead = (id: number) =>
    markAsReadMutation.mutateAsync(id);

  const createNotification = (userId: number, message: string) =>
    createNotificationMutation.mutateAsync({ userId: userId!, message });

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
        isLoading,
        isError,
        markAsRead,
        createNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      "useNotificationContext must be inside NotificationProvider"
    );
  return ctx;
};
