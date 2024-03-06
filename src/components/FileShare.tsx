"use client";
import { UploadProps, message, notification } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { InboxOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import NotificationMenu from "./CustomNotification";

const FileShare = ({
  activeUsers,
  socket,
  userLists,
  currentUser,
  roomId,
}: {
  activeUsers: number;
  socket: Socket;
  userLists: string[];
  currentUser: string;
  roomId: string;
}) => {
  const [files, setFiles] = useState<any[]>([]);
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://fileshare-backend-bezv.onrender.com/api/v1/app/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const responseData = await response.json();
      socket.emit("send_file", {
        filePath: responseData.filePath,
        roomId: roomId,
        username: currentUser,
        fileName: responseData.fileName,
      });
      console.log("File uploaded successfully:", responseData);
      // Handle success
    } catch (error: any) {
      console.error("Error uploading file:", error.message);
      // Handle error
    }
  };
  useEffect(() => {
    socket.on("receive_file", (data: any) => {
      if (data) {
        notification.success({
          message: "Downloading file",
        });
        setFiles((prevOutput: any) => [...prevOutput, data]); // Updating state correctly using spread operator
      }
    });
    // return () => {
    //   socket.off("receive_message");
    // };
  }, [socket]);
  //   [
  //     {
  //       username: "bipin",
  //       filePath:
  //         "http://localhost:8000/uploads/1709702243377-Screenshot 2024-03-06 at 9.39.52â¯AM.png",
  //       senderId: "zeTYgoumDG009EhoAAAp",
  //     },
  //     {
  //       username: "bipin",
  //       filePath:
  //         "http://localhost:8000/uploads/1709702243377-Screenshot 2024-03-06 at 9.39.52â¯AM.png",
  //       senderId: "zeTYgoumDG009EhoAAAp",
  //     },
  //   ];

  return (
    <div>
      <div className="flex justify-end p-8">
        <NotificationMenu notifications={files} />
      </div>
      <div className="flex justify-center items-center h-screen">
        <Dragger
          customRequest={({ file, onSuccess, onError }: any) => {
            uploadFile(file as File).then(() => {
              onSuccess();
              notification.info({
                message: "File Uploaded Successfully",
              });
            });
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </div>
    </div>
  );
};

export default FileShare;
