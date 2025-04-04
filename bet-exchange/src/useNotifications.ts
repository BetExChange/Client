import { useState, useEffect } from "react";
import { Notification } from "./Types";

const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const authUser = localStorage.getItem("AuthUser");
    const users = JSON.parse(localStorage.getItem("Users") || "[]");

    if (authUser) {
      const user = users.find((u: { role: string }) => u.role === authUser);

      if (user) {
        const allNotifications = JSON.parse(localStorage.getItem("Notifications") || "[]");
        const userNotifications = allNotifications.filter((n: { userId: number }) => n.userId === user.id);

        setNotifications(userNotifications);
      }
    }
  }, []);

  // Function to mark a notification as read
  const markAsRead = (notificationId: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );

    const allNotifications: Notification[] = JSON.parse(localStorage.getItem("Notifications") || "[]");
    const updatedNotifications = allNotifications.map((n) =>
      n.id === notificationId ? { ...n, read: true } : n
    );

    localStorage.setItem("Notifications", JSON.stringify(updatedNotifications));
  };

  // Function to create a new notification
  const createNotification = (userId: number, message: string) => {
    const allNotifications: Notification[] = JSON.parse(localStorage.getItem("Notifications") || "[]");

    const newNotification: Notification = {
      id: allNotifications.length > 0 ? allNotifications[allNotifications.length - 1].id + 1 : 1,
      userId,
      message,
      timestamp: new Date(),
      read: false,
    };

    const updatedNotifications = [...allNotifications, newNotification];

    localStorage.setItem("Notifications", JSON.stringify(updatedNotifications));

    // If the notification belongs to the current user, update state
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
  };

  return {
    notifications,
    unreadCount: notifications.filter((n) => !n.read).length,
    markAsRead,
    createNotification,
  };
};

export default useNotifications;
