import { useState, useEffect } from "react";
import { Notification } from "./Types";

const useNotifications = () => {
  const [notifications, setNotifications] = useState<{ id: number; userId: number; message: string; timestamp: string; read: boolean }[]>([]);
  
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

  return {
    notifications,
    unreadCount: notifications.filter((n) => !n.read).length,
    markAsRead,
  };
};

export default useNotifications;
