import React from "react";
import Avatar from "./Avatar";
import { useLocation, useNavigate } from "react-router-dom";

const Appbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = () => {
    navigate('/publish');
  };

  const currentPath = location.pathname;

  return (
    <div className="px-5 lg:px-20 py-4 flex border-b justify-between px-10 items-center">
      <div onClick={() => navigate("/blogs")}>Medium</div>
      <div className="flex">
        {
          currentPath !== "/publish" ? 
            <button
              onClick={handleButtonClick}
              type="button"
              className="mr-8 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              New Post
            </button> : ""
        }
        <Avatar name={null} />
      </div>
    </div>
  );
};

export default Appbar;
