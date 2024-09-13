import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import Users from "./User/Users";
import Logout from "./LogOut/Logout";

function LeftPart() {
  return (
    <div className="w-full bg-black text-white">
      <SearchBar />
      <div
        className="flex-1 overflow-y-auto"
        style={{ minHeight: "calc(84vh - 10vh)" }}
      >
        <Users />
      </div>
      <Logout />
    </div>
  );
}

export default LeftPart;
