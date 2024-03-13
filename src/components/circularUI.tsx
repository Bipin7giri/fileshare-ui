"use client";
import { InboxOutlined } from "@ant-design/icons";
import { Avatar, notification } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import NotificationMenu from "./CustomNotification";
import { random } from "lodash";
import { FaUsers} from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
const GradientCircles = ({
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
  const minX = -100;
  const maxX = 350;
  const minY = -150;
  const maxY = 310;

  const uploadFile = async (file: File) => {
    debugger;
    const fileSizeInMB = file.size / (1024 * 1024);

    // Check if the file size is smaller than 50 MB
    if (fileSizeInMB > 50) {
      return notification.error({
        message: "File too large",
      });
    }
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
    } catch (error: any) {
      console.error("Error uploading file:", error.message);
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

  return (
    <div>
      <div className="flex items-center mb-8 justify-between p-8">
        <div className="flex items-center gap-4">
          <SiGoogleclassroom className="text-red-400" />
          <h1 className="font-bold text-red-400">Room  : {roomId}</h1>
        </div>
        <div className="flex items-center gap-4">
          <FaUsers className="text-green-400" />
          <h1 className="font-bold text-green-400">
            Active Users : {activeUsers}
          </h1>
        </div>
        <NotificationMenu
          notifications={files}
        />
      </div>
      <div className="flex relative justify-center items-center h-screen">
        <div className="w-[640px] h-[640px] rounded-full bg-[#CCEAEC] flex justify-center items-center">
          <div className="w-[580px] h-[580px] rounded-full bg-[#4dbed1] flex justify-center items-center">
            <div className="w-[380px] h-[380px] z-[1] rounded-full bg-[#04a9bd] flex justify-center items-center">
              <div className="w-[190px] h-[190px] z-[2] rounded-full bg-[#038fa9] flex justify-center items-center">
                <div
                  className="absolute z-10"
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {userLists.map((user, index) => {
                    const offset = Math.floor(
                      Math.random() * (maxY - minY + 1)
                    );
                    const x =
                      Math.floor(Math.random() * (maxX - minX + 1)) + minX;
                    const y = minY + offset;

                    // Generate a random color
                    const randomColor = `rgb(${random(0, 255)}, ${random(
                      0,
                      255
                    )}, ${random(0, 255)})`;

                    return (
                      <div
                        key={index}
                        className="absolute animate-float"
                        style={{
                          top: y,
                          left: x,
                          transform: "translate(-50%, -50%)",
                          zIndex: index + 1,
                        }}
                      >
                        <Avatar
                          style={{
                            backgroundColor: randomColor,
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        >
                          {user.split(" ")[0]}
                        </Avatar>
                      </div>
                    );
                  })}
                  <div className="flex justify-center">
                    <Dragger
                      customRequest={({ file, onSuccess, onError }: any) => {
                        uploadFile(file as File).then(() => {
                          onSuccess();
                          // notification.info({
                          //   message: "File Uploaded Successfully",
                          // });
                        });
                      }}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined className="text-white" />
                      </p>
                      <p className=" text-white">
                        Click or drag file to this area to upload
                      </p>
                    </Dragger>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientCircles;
