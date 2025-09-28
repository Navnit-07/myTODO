import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userData, isLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/todo");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="flex flex-col items-center mt-20 px-4 texxt-center text-gray-800">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Welcome {userData ? userData.name : "to myTODO"}{" "}
        <img src={assets.hand_wave} alt="" className="w-8 aspect-square" />
      </h1>
      <button
        onClick={handleClick}
        className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all cursor-pointer"
      >
        {isLoggedIn ? "Go to Todos" : "Get Started"}
      </button>
    </div>
  );
};

export default Header;
