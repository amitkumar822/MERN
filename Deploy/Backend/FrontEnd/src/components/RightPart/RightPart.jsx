import React, { useEffect } from "react";
import ChatUser from "./Chat/ChatUser";
import Messages from "./Message/Messages";
import TypeSend from "./TypeSend/TypeSend";
import useConversation from "../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";
import bgImg from "../../Photos/bgImg.png";

function RightPart() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div
      className="w-full bg-slate-900 text-gray-300"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <ChatUser />
          <div
            className="flex-1 overflow-y-auto no-scrollbar"
            style={{ maxHeight: "calc(92vh - 8vh)" }}
          >
            <Messages />
          </div>
          <TypeSend />
        </>
      )}
    </div>
  );
}

export default RightPart;

const NoChatSelected = () => {
  const [authUser] = useAuth();

  return (
    <>
      <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white" />
        </label>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-center">
            Welcome{" "}
            <span className=" font-semibold text-xl text-yellow-400">
              {" "}
              {authUser.user.fullName}
            </span>
            <br />
            No chat selected, please start converstation by selecting anyone to
            your contacts
          </h1>
        </div>
      </div>
    </>
  );
};
