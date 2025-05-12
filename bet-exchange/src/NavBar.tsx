import React, { useState } from "react";
import { Layout, MenuProps, Avatar, Dropdown, Typography, Badge, Popover, List } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "./AuthProvider";
import { useNotificationContext } from "./NotificationContext";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

const Navbar: React.FC = () => {
  const { logout, username , balance, userRole } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotificationContext();
  const [popoverVisible, setPopoverVisible] = useState(false);

  const handlePopoverOpen = () => setPopoverVisible(!popoverVisible);

  const sortedNotifications = [...notifications]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  const menuItems: MenuProps["items"] = [
    { key: "balance", label: `Balance: ${balance !== null ? balance : 0} €` },
    { key: "addBalance", label: `Add Balance` },
    { key: "logout", label: "Logout", onClick: logout },
  ];

  const navigate = useNavigate();

  const handleTitleClick = () => {
    if (userRole === "buyer") {
      navigate("/buyer");
    } else if (userRole === "seller") {
      navigate("/seller");
    }
  };
  return (
    <Header  style={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "0 10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
      }}>
      
      {/* Title */}
      <Title level={3} style={{ margin: 0, cursor: "pointer"}} onClick={handleTitleClick}>
        {"Bet Exchange"}
      </Title>

      {/* Right Side (Notifications, Username, User Icon) */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        
        {/* Notifications Popover */}
        <Popover
          content={
            <List
              dataSource={sortedNotifications}
              renderItem={(item) => (
                <List.Item
                  style={{
                    backgroundColor: item.read ? "#fff" : "#f0f0f0",
                    cursor: "pointer",
                    padding: "8px 12px",
                  }}
                  onClick={() => markAsRead(item.id)}
                >
                  <span>{item.message}</span>
                </List.Item>
              )}
              footer={notifications.length > 5 ? <a style={{ textAlign: "center", display: "block" }}>Show More</a> : null}
            />
          }
          title="Notifications"
          trigger="click"
          open={popoverVisible}
          onOpenChange={handlePopoverOpen}
        >
          <Badge count={unreadCount}>
            <BellOutlined style={{ fontSize: "30px", cursor: "pointer" }} />
          </Badge>
        </Popover>

        {/* Username */}
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>{username}</span>

        {/* User Icon with Dropdown */}
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <Avatar size="large" icon={<UserOutlined />} style={{ marginRight: "20px"}} />
        </Dropdown>

      </div>
    </Header>
  );
};

export default Navbar;
