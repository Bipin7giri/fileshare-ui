import React from "react";
import { Dropdown, Menu, Badge, Avatar } from "antd";
import { BellOutlined, DownloadOutlined } from "@ant-design/icons";

interface NotificationIF {
  id: number;
  username: string;
  filePath: string;
  fileName: string;
}

const NotificationMenu = ({
  notifications,
}: {
  notifications: NotificationIF[];
}) => {
  const handleDownload = (filePath: string, fileName: string) => {
    fetch(filePath)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch((error) => {
        console.error("Download error:", error);
      });
  };

  const menu = (
    <Menu>
      {notifications.map((notification) => (
        <Menu.Item key={notification.id} className="p-4 w-auto">
          <div
            className="flex items-center"
            onClick={() =>
              handleDownload(notification.filePath, notification.fileName)
            }
          >
            <Avatar className="mr-2">
              {notification.username.split("")[0]}
            </Avatar>
            <div className="flex justify-between gap-3 items-center">
              <span className="text-sm">{notification.username}</span>
              <span className="text-xs text-gray-500">
                {notification.fileName}
              </span>
              <DownloadOutlined className="text-blue-500 ml-2" />
            </div>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <div className="flex justify-end items-center">
        <Badge count={notifications.length} className="mr-2">
          <DownloadOutlined style={{ fontSize: "24px", color: "#08c" }} />
        </Badge>
      </div>
    </Dropdown>
  );
};

export default NotificationMenu;
