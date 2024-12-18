/* eslint-disable @next/next/no-img-element */
import { faker } from "@faker-js/faker";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoopIcon from "@mui/icons-material/Loop";
import { shuffle } from "lodash";

import { motion } from "framer-motion";
import moment from "moment";
import React, { useEffect, useState } from "react";

import { RiShareForwardLine } from "react-icons/ri";
import { BASE_URL } from "../api";


const reactionImages = [
  "https://i.postimg.cc/wT6gNPFw/pngwing-com-1.png",
  "https://i.postimg.cc/4xW7jWYM/haha.png",
  "https://i.postimg.cc/d1K918vT/Nice-Png-waluigi-face-png-7760819.png",
  "https://i.postimg.cc/9FSg2w4y/pngwing-com-2.png",
];

const seconReactionImage = [
  "https://i.postimg.cc/L89gyc8L/heart.png",
  "https://i.postimg.cc/ZRMKHLRW/vmvngm34iua51.webp",
];

// type PostProps = {
//   author: any;
//   caption: any;
//   image: any;
//   profileImage: any;
//   timestamp: any;
//   id: any;
//   isClicked?: boolean;
// };

const Post = ({
  id,
  author,
  caption,
  images,
  profileImage,
  timestamp,
  title,
  metrics,
  visibility,
  isClicked,
}) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="shadow bg-white dark:text-white mt-4 rounded-lg dark:shadow-2xl dark:bg-[#28282B]">
      {/* Post Header */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex space-x-2 items-center">
          <div className="relative">
            <img
              src={profileImage || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div>
            <div className="font-semibold">{author}</div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {timestamp}
            </span>
          </div>
        </div>
      </div>

      {/* Post Title & Content */}
      {title && (
        <div className="px-4 py-2 text-lg font-semibold">{title}</div>
      )}
      {caption && <div className="px-4 py-2">{caption}</div>}

      {/* Post Images */}
      {images && images.length > 0 && (
        <div className="flex justify-center py-2">
          <div className="grid gap-2 w-full px-4">
            {images?.map((image, index) => (

              image?.contentType.startsWith("video") ? (
                <video
                  key={index}
                  src={image?.url?.startsWith("/files") ? BASE_URL + image.url : image.url}
                  controls
                  className="w-full rounded-lg"
                />
              ) : <img
                key={index}
                src={image?.url?.startsWith("/files") ? BASE_URL + image.url : image.url}

                alt={`Post image ${index + 1}`}
                className="w-full rounded-lg"
              />


            ))}
          </div>
        </div>
      )}

      {/* Metrics */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>{metrics.viewCount} views</span>
            <span>•</span>
            <span>{metrics.commentCount} comments</span>
            <span>•</span>
            <span>{metrics.shareCount} shares</span>
          </div>
          <div className="flex items-center space-x-2">
            {Object.entries(metrics.reactionCounts)?.map(([reaction, count]) => (
              <span key={reaction} className="flex items-center">
                {reaction}: {count}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 px-4 py-2">
        <div className="flex justify-between">
          {visibility.allowReactions && (
            <button className="flex items-center space-x-2 hover:bg-gray-100 px-4 py-2 rounded-lg">
              <span>Like</span>
            </button>
          )}
          {visibility.allowComments && (
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center space-x-2 hover:bg-gray-100 px-4 py-2 rounded-lg"
            >
              <span>Comment</span>
            </button>
          )}
          {visibility.allowSharing && (
            <button className="flex items-center space-x-2 hover:bg-gray-100 px-4 py-2 rounded-lg">
              <span>Share</span>
            </button>
          )}
        </div>
      </div>

      {/* Comments Section */}
      {open && visibility.allowComments && (
        <div className="px-4 py-2 border-t border-gray-200">
          {/* Comment input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2"
            />
            <button
              onClick={() => {/* Handle comment submission */ }}
              disabled={!comment || loading}
              className="text-blue-500 font-semibold"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Post;
