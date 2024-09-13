import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../../context/userGetAllUsers";
import useConversation from "../../zustand/useConversation.js";
import { toast } from "react-toastify";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;

    const conversation = allUsers.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.warning("User not found");
    }
  };

  return (
    <div className="px-6 py-4">
      <form onSubmit={handleSearch}>
        <div className="flex items-center space-x-3">
          <label className="w-[80%] p-3 border-[1px] border-gray-700 rounded-lg flex items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="grow outline-none bg-transparent"
              placeholder="Search"
            />
          </label>
          <button>
            <FaSearch className="text-5xl p-2 hover:bg-gray-700 rounded-full duration-300" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
