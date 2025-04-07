import React, { createContext, useContext, useEffect, useState } from "react";
import { Notification } from "./Types";

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  createNotification: (userId: number, message: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const loadNotifications = () => {
    const authUser = localStorage.getItem("AuthUser");
    const users = JSON.parse(localStorage.getItem("Users") || "[]");

    if (authUser) {
      const user = users.find((u: { role: string }) => u.role === authUser);
      if (user) {
        const allNotifications = JSON.parse(localStorage.getItem("Notifications") || "[]");
        const userNotifications = allNotifications.filter((n: Notification) => n.userId === user.id);
        setNotifications(userNotifications);
      }
    }
  };

  useEffect(() => {
    loadNotifications();
    window.addEventListener("local-storage-update", loadNotifications);
    return () => {
      window.removeEventListener("local-storage-update", loadNotifications);
    };
  }, []);

  const markAsRead = (notificationId: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );

    const allNotifications: Notification[] = JSON.parse(localStorage.getItem("Notifications") || "[]");
    const updated = allNotifications.map((n) =>
      n.id === notificationId ? { ...n, read: true } : n
    );

    localStorage.setItem("Notifications", JSON.stringify(updated));
    window.dispatchEvent(new Event("local-storage-update"));
  };

  const createNotification = (userId: number, message: string) => {
    const allNotifications: Notification[] = JSON.parse(localStorage.getItem("Notifications") || "[]");

    const newNotification: Notification = {
      id: allNotifications.length > 0 ? allNotifications[allNotifications.length - 1].id + 1 : 1,
      userId,
      message,
      timestamp: new Date(),
      read: false,
    };

    const updated = [...allNotifications, newNotification];
    localStorage.setItem("Notifications", JSON.stringify(updated));
    window.dispatchEvent(new Event("local-storage-update"));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
        markAsRead,
        createNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotificationContext must be used within a NotificationProvider");
  return context;
};
