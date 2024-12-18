import React from 'react';
import { Avatar } from '@mui/material';

const Post = () => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center mb-2">
                <Avatar />
                <div className="ml-2">
                    <div className="font-bold">SĂN TAOBAO GIÁ GỐC 🌼</div>
                    <div className="text-gray-500 text-sm">Minh Minh · Người đóng góp nhiều nhất · 6 phút</div>
                </div>
            </div>
            <p>Em gom chuyến cuối ❄️ Lạnh rồi mn tranh thủ mua hàng về...</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
                <img src="image-url-1.jpg" alt="Product 1" className="rounded-lg w-full" />
                <img src="image-url-2.jpg" alt="Product 2" className="rounded-lg w-full" />
            </div>
        </div>
    );
};

export default Post;
