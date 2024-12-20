/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import PostModel from "./models/PostModel";
import { motion } from "framer-motion";
import { faker } from "@faker-js/faker";
import { postApi } from "../api";

// type PostFormProps = {
//   isShow: boolean;
//   userData?: any;
// };

const PostForm = ({ userData, isShow }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleCreatePost = async (caption, image) => {
    try {
      // Prepare post data
      const postData = {
        content: caption,
        mediaUrls: image ? [image] : [], // Add image if available
        visibility: 0, // Public by default
        type: 0 // Normal post
      };

      // Call the API to create post
      const response = await postApi.createPost(postData);

      // Handle successful post creation
      if (response) {
        // Close the post modal
        setOpen(false);
        // You might want to refresh the feed or add the new post to existing posts
        // Could emit an event or call a callback function passed as prop
      }
    } catch (error) {
      console.error("Error creating post:", error);
      // Show error message to user
      alert("Failed to create post. Please try again.");
    }
  };
  const click = () => {
  }
  return (
    <div className="px-4 mt-4 shadow rounded-lg bg-white dark:bg-[#28282B]">
      <div className="p-2 border-b border-gray-300 dark:border-dark-third flex space-x-4">
        {isShow ? (
          <img
            onClick={click}
            src={user?.profilePictureUrl}
            alt="Profile picture"
            className="w-10 h-10 rounded-full cursor-pointer object-cover"
          />
        ) : (
          <img
            src={user?.profilePictureUrl}
            alt="Profile picture"
            className="w-10 h-10 rounded-full object-cover"
          />
        )}

        <div
          onClick={handleOpen}
          className="flex-1 bg-gray-100 rounded-full flex items-center justify-start pl-4 cursor-pointer dark:bg-gray-600 dark:text-gray-300 text-gray-500 text-lg"
        >
          <span>{user?.fullName || 'Bạn'} ơi, bạn đang nghĩ gì thế?</span>
        </div>
      </div>
      <div className="p-2 flex">
        <motion.div
          onClick={handleOpen}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800 text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-red-500"
        >
          <VideoCallIcon />
          <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-white">
            Video trực tiếp
          </span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleOpen}
          className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800  text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-green-500"
        >
          <PhotoLibraryIcon />
          <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-white">
            Ảnh/video
          </span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleOpen}
          className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800 text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-yellow-500"
        >
          <InsertEmoticonIcon />
          <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-white">
            Cảm nghĩ
          </span>
        </motion.div>
      </div>
      <PostModel setOpen={setOpen} open={open} onCreatePost={handleCreatePost} />
    </div>
  );
};
export default PostForm;
