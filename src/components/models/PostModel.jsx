import { useState } from "react";
import useSelectFile from "../../hooks/useSelectFile.jsx";
import PhotoModel from "./PhotoModel";
import { motion } from "framer-motion";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LoopIcon from "@mui/icons-material/Loop";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PublicIcon from "@mui/icons-material/Public";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { faker } from "@faker-js/faker";
import { Close, PhotoAlbum } from "@mui/icons-material";
import { BASE_URL, fileUploadApi, postApi } from "../../api/index.js";



const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function PostModel({ setOpen, open, onCreatePost }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  )
  const handleClose = () => setOpen(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const { selectedFile, setSelectedFile, onSelectedFile } = useSelectFile();
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    mediaItems: [],
    visibilitySettings: {
      type: 0, // Public by default
      allowComments: true,
      allowReactions: true,
      allowSharing: true
    }
  });
  const handleCreatePost = async () => {
    if (!postData.title || !postData.content) {
      alert("Vui lòng nhập tiêu đề và nội dung bài viết");
      return;
    }

    try {
      setLoading(true);

      // Create post through API
      const response = await postApi.createPost(postData);

      if (response) {
        // Reset form
        setPostData({
          title: "",
          content: "",
          mediaItems: [],
          visibilitySettings: {
            type: 0,
            allowComments: true,
            allowReactions: true,
            allowSharing: true
          }
        });

        // Close modal
        setOpen(false);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Không thể tạo bài viết. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };
  const handleFileUpload = async (file) => {
    // Here you would typically upload the file to your storage service
    // For now, we'll create a media item with the file info
    const mediaItem = {
      contentType: file?.type || "image/jpeg",
      url: await fileUploadApi.uploadFile(file) || "", // This would be replaced with actual upload URL
      size: file.size,
      type: 0 // Image type
    };

    setPostData(prev => ({
      ...prev,
      mediaItems: [...prev.mediaItems, mediaItem]
    }));
  };


  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-md dark:bg-[#18191a]">
          <div className="flex justify-between">
            <button
              className="text-sm font-medium text-blue-500 dark:text-blue-300"
              onClick={() => setOpen(false)}
            >
              Đóng
            </button>

            <h1 className="text-xl font-semibold text-gray-500 dark:text-gray-300">
              Tạo bài viết
            </h1>
            <IconButton>
              <MoreHorizIcon className="dark:text-gray-300" />
            </IconButton>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 mb-3"></div>

          {/* User Info */}
          <div className="m-5">
            <div className="flex justify-start text-center">
              <Avatar alt={user?.fullName} src={user?.profilePictureUrl} />
              <h1 className="ml-2 text-center text-black font-bold dark:text-gray-200">
                {user?.fullName}
              </h1>
            </div>
          </div>

          {/* Post Title */}
          <div className="px-4 py-2">
            <input
              type="text"
              value={postData.title}
              onChange={(e) => setPostData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Tiêu đề bài viết..."
              className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white outline-none"
            />
          </div>

          {/* Post Content */}
          <div className="px-4 py-2">
            <textarea
              value={postData.content}
              onChange={(e) => setPostData(prev => ({ ...prev, content: e.target.value }))}
              rows={6}
              placeholder="Nội dung bài viết..."
              className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white outline-none"
            />
          </div>

          {/* Media Upload Section */}
          <div className="px-4 py-2">
            <div className="flex space-x-2">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => handleFileUpload(e.target.files[0])}
                hidden
                id="media-upload"
              />
              <label
                htmlFor="media-upload"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <PhotoAlbum className="text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Thêm ảnh/video</span>
              </label>
            </div>

            {/* Preview uploaded media */}
            <div className="mt-2 flex flex-wrap gap-2">
              {postData.mediaItems.map((media, index) => (
                <div key={index} className="relative">
                  {
                    media.contentType?.includes("video") || media.url.includes(".mp4") ? (
                      <video src={BASE_URL + media.url} controls className="w-20 h-20 object-cover rounded-lg"></video>
                    ) : <img src={BASE_URL + media.url} alt="" className="w-20 h-20 object-cover rounded-lg" />
                  }

                  <button
                    onClick={() => {
                      setPostData(prev => ({
                        ...prev,
                        mediaItems: prev.mediaItems.filter((_, i) => i !== index)
                      }));
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <Close fontSize="small" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Visibility Settings */}
          <div className="px-4 py-2">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={postData.visibilitySettings.allowComments}
                  onChange={(e) => setPostData(prev => ({
                    ...prev,
                    visibilitySettings: {
                      ...prev.visibilitySettings,
                      allowComments: e.target.checked
                    }
                  }))}
                  className="form-checkbox"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">Cho phép bình luận</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={postData.visibilitySettings.allowReactions}
                  onChange={(e) => setPostData(prev => ({
                    ...prev,
                    visibilitySettings: {
                      ...prev.visibilitySettings,
                      allowReactions: e.target.checked
                    }
                  }))}
                  className="form-checkbox"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">Cho phép reaction</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={postData.visibilitySettings.allowSharing}
                  onChange={(e) => setPostData(prev => ({
                    ...prev,
                    visibilitySettings: {
                      ...prev.visibilitySettings,
                      allowSharing: e.target.checked
                    }
                  }))}
                  className="form-checkbox"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">Cho phép chia sẻ</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-5 px-4">
            {loading ? (
              <button className="bg-blue-500 font-semibold animate-pulse cursor-not-allowed text-white rounded-xl px-8 py-2">
                <LoopIcon className="animate-spin" />
              </button>
            ) : (
              <button
                className={`${postData.title && postData.content
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-gray-400'
                  } text-white font-semibold rounded-xl px-8 py-2`}
                onClick={handleCreatePost}
                disabled={!postData.title || !postData.content}
              >
                Đăng
              </button>
            )}
          </div>
        </Box>
      </Modal>
      <PhotoModel
        secondOpen={secondOpen}
        setSecondOpen={setSecondOpen}
        onSelectedFile={onSelectedFile}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />
    </div>
  );
}
