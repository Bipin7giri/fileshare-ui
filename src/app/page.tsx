"use client";
import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import GradientCircles from "../components/circularUI";
import Image from "next/image";
const socket: Socket = io("https://fileshare-backend-bezv.onrender.com");

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLists, setUserLists] = useState<string[]>([]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [isRoomJoined, setRoomJoined] = useState(false);

  function joinRoom(values: any) {
    setRoomJoined(true);
    setUsername(values.username);
    setRoomId(values.roomId);
    socket.emit("join_room", {
      roomId: values.roomId,
      username: values.username,
    });
    handleCancel();
  }

  useEffect(() => {
    socket.on("active_users_count", (data) => {
      if (data.roomId === roomId) {
        console.log(data,"data of socket");
        setUserLists(data.usersLists);
        setActiveUsersCount(data.count);
      }
    });
    return () => {
      socket.off("active_users_count");
    };
  }, [roomId]);
  return (
    <div className={` ${isRoomJoined ? "bg-white" : " bg-[#061019]"} relative `}>
       <div className="text-white hot-jar absolute bottom-[30px] right-[60px]">
         hello
       </div>
      <Modal
        open={isModalOpen}
        footer={false}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          className: "bg-red-800",
        }}
      >
        <Form onFinish={joinRoom} layout="vertical">
          <Form.Item
            name={"username"}
            label="Username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item
            name={"roomId"}
            label="Room ID"
            rules={[{ required: true, message: "Please enter the room ID" }]}
          >
            <Input placeholder="Enter the room ID" />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className="bg-green-400 mt-8 w-full"
            >
              Join Room
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {isRoomJoined ? (
        <GradientCircles
          currentUser={username}
          roomId={roomId}
          userLists={userLists}
          activeUsers={activeUsersCount}
          socket={socket}
        />
      ) : (
        <>
          <div className="flex  flex-col gap-5 justify-center items-center h-[100vh]">
            <div className="bg-white px-20  pb-20 pt-10 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
              <div className="flex justify-center">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/1037/1037325.png"
                  height={100}
                  width={100}
                  alt={""}
                />
              </div>
              <h1 className=" font-bold text-2xl text-center">
                File Sharing App
              </h1>
              <p className=" text-center py-2 font-bold text-xs">
                &quot;Create Your Room and Share Your Files with Ease!&quot;
              </p>
              <button
                onClick={showModal}
                type="button"
                className="button mx-20 my-5"
              >
                <span className="button__text">Room</span>
                <span className="button__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    stroke="currentColor"
                    height="24"
                    fill="none"
                    className="svg"
                  >
                    <line y2="19" y1="5" x2="12" x1="12"></line>
                    <line y2="12" y1="12" x2="19" x1="5"></line>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
