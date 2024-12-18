import React, { useState } from 'react';
import { X } from 'lucide-react';
import { BASE_URL, fileUploadApi, profileApi } from '../../api';

const ImageUploadModal = ({ isOpen, onClose, onUpload, type }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        try {
            setLoading(true);

            var uploadResponse = await fileUploadApi.uploadFile(selectedFile);

            const fileUrl = uploadResponse; // Get returned file URL

            // Update profile with new image URL
            const updateResponse = await (type === 'avatar' ?
                profileApi.updateAvatar(BASE_URL + fileUrl) :
                profileApi.updateBackground(BASE_URL + fileUrl)
            );
            alert('Cập nhật ảnh thành công!')

            if (updateResponse) {
                onUpload(fileUrl);
                onClose();
                window.location.reload();
            }

        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-[#28282B]">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold dark:text-white">
                        {type === 'avatar' ? 'Cập nhật ảnh đại diện' : 'Cập nhật ảnh bìa'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                <div className="mb-4">
                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="fileInput"
                        />
                        <label
                            htmlFor="fileInput"
                            className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className={`mb-4 ${type === 'avatar' ? 'h-48 w-48 rounded-full object-cover' : 'h-32 w-full rounded-lg object-cover'}`}
                                />
                            ) : (
                                <>
                                    <svg
                                        className="mb-3 h-12 w-12 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        Click để chọn ảnh hoặc kéo thả vào đây
                                    </p>
                                </>
                            )}
                        </label>
                    </div>
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={!selectedFile || loading}
                        className={`rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white ${!selectedFile || loading
                            ? 'cursor-not-allowed opacity-50'
                            : 'hover:bg-blue-600'
                            }`}
                    >
                        {loading ? 'Đang tải lên...' : 'Cập nhật'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageUploadModal;