import React, { useRef, useEffect } from 'react';

const VideoPost = ({
    id, name, src, views, likes, comments, date, userName, avatarUrl, content
}) => {
    const iframeRef = useRef(null);

    useEffect(() => {
        const iframeElement = iframeRef.current;

        // Function to pause the video by clearing the iframe src
        const pauseVideo = () => {
            iframeElement.src = '';
        };

        // Function to resume the video by setting the iframe src back
        const resumeVideo = () => {
            iframeElement.src = src.includes('drive.google.com') ? getEmbedUrl(src) : src;
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        resumeVideo();
                    } else {
                        pauseVideo();
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (iframeElement) {
            observer.observe(iframeElement);
        }

        return () => {
            if (iframeElement) {
                observer.unobserve(iframeElement);
            }
        };
    }, [src]);

    const getEmbedUrl = (url) => {
        // Xử lý URL dạng https://drive.google.com/file/d/FILE_ID/view
        const match = url.match(/\/file\/d\/([^\/]+)/);
        if (!match) return null;

        const fileId = match[1];
        return `https://drive.google.com/file/d/${fileId}/preview`;
    };


    return (
        <div className="max-w-xl xl:min-w-[600px] mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden my-5">
            {/* Header */}
            <div className="flex items-center px-4 py-3">
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={avatarUrl}
                    alt="User Avatar"
                />
                <div className="ml-3">
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {userName}
                    </h2>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                        {date} · Theo dõi
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 py-2">
                <p className="text-gray-900 dark:text-white font-semibold mb-1">
                    {name}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {content}
                </p>
            </div>

            {/* Video */}
            <div className="relative">
                <iframe
                    ref={iframeRef}
                    width="100%"
                    height="360"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="Embedded Video"
                />
            </div>

            {/* Reactions */}
            <div className="px-4 py-3 flex items-center text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                    <span className="text-lg">😆</span>
                    <span className="text-sm">
                        {likes}
                    </span>
                </div>
                <span className="mx-3">·</span>
                <div className="text-sm">{comments} bình luận</div>
                <span className="mx-3">·</span>
                <div className="text-sm">
                    {views} triệu lượt phát</div>
            </div>
        </div>
    );
};

export default VideoPost;
