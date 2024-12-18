import React, { useState } from 'react';
import VideoPost from './VideoPost';
import { useEffect } from 'react';
import { motion } from "framer-motion";
import PostSkeleton from '../../components/Skeleton';
import { sr_RS_latin } from '@faker-js/faker';
import { BASE_URL, postApi } from '../../api';

const data = [
    {
        id: 1,
        name: "Vĩnh Dạ Tinh Hà",
        src: "https://vip.opstream12.com/share/87be96790ea277c50f980ce4df0b4412",
        content: "Là câu chuyện cứu rỗi, chữa lành lẫn nhau giữa hai nhân vật chính. Đêm vĩnh hằng là lúc chạng vạng, khúc biệt ly từ cây sáo sênh. Bản thân hắn - Mộ Thanh (Đinh Vũ Hề) là \"quái vật\", không được người đời dung thứ, cũng không dám để lộ mặt thật của mình. Nhưng hiện tại đúng là có một người, ngoại trừ tỷ tỷ hắn, ở gần hắn hơn bất cứ ai, cô gái mang tên Lăng Diệu Diệu",
        views: "1.6M",
        likes: "41K",
        comments: "710",
        date: "15 Tháng 5",
        userName: "Trâm Anh 5 Phút",
        avatarUrl: "https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/458399237_1055645656561671_5700869848241243811_n.jpg?stp=cp0_dst-jpg_s40x40&_nc_cat=1&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeE_pM0BgP3mFAFJCH20QCBiAkhKal4VmHMCSEpqXhWYc49V_YX-XDaal7kJOb0GN7MHCQN15uhsfW4cO1ZjAypC&_nc_ohc=sHlV8YsZB1IQ7kNvgGDbcLR&_nc_zt=24&_nc_ht=scontent.fhan14-1.fna&_nc_gid=AhONQHL4OonvYBmJ9yRmsT0&oh=00_AYBdmX6aV8pq7yBg2n84FqACtcHupBIq6UFudOXPZhniJA&oe=673A9A96"
    },
    {
        id: 2,
        name: "Đại Mộng Quy Ly tập 1",
        src: "https://vip.opstream11.com/share/f272f8e92b515dc1a9773206f0460a54",
        content: "\"Đại Mộng Quy Li\" là một bộ phim cổ trang do Hầu Minh Hạo (\"Thợ Săn Tâm Trạch\", \"Hộ Tâm\"), Trần Đô Linh (\"Liên Hoa Lâu\"), Điền Gia Thụy (\"Vân Chi Vũ\"), Trình Tiêu (\"Khanh Khanh Ngã Tâm\") đóng vai chính. Bộ phim này được lấy cảm hứng từ \"Sơn Hải Kinh\", kể về một câu chuyện truyền kỳ quỷ lệ về \"yêu muốn bắt yêu\". Trong thời kỳ Trinh Nguyên, do nữ thần Bạch Tắc, người kiểm soát hai giới người và yêu bất ngờ mất mạng, Bạch Tắc mất tích không dấu vết, yêu thú hoành hành trên đất người, gây ra nhiều vụ án đẫm máu. Trong thời điểm này, \"Chu Yếm\", thủ lĩnh đạo của bách yêu đã biến hình thành người có tên là Triệu Viễn Châu (Hầu Minh Hạo đóng), tự nguyện \"sát cánh\" với triều đình, đề xuất hỗ trợ triều đình thành lập Tập Yêu Ti, bắt yêu dẹp loạn.",
        views: "1.2M",
        likes: "23K",
        comments: "220",
        date: "16 Tháng 5",
        userName: "Phimm mới",
        avatarUrl: "https://img.ophim.live/uploads/movies/dai-mong-quy-ly-thumb.jpg"
    },
    {
        id: 3,
        name: "Microservices in 100 seconds",
        src: "https://drive.google.com/file/d/1Aw3kny5JW422ODSyyjRtkZES2K1hq1iL/view",
        content: "Microservices are a software development technique —a variant of the service-oriented architecture (SOA) architectural style that structures an application as a collection of loosely coupled services. In a microservices architecture, services are fine-grained and the protocols are lightweight. The benefit of decomposing an application into different smaller services is that it improves modularity and makes the application easier to understand, develop, test, and more resilient to architecture erosion.",
        views: "1.6M",
        likes: "41K",
        comments: "710",
        date: "15 Tháng 5",
        userName: "TechWorld with Nana",
        avatarUrl: "https://yt3.ggpht.com/ytc/AKedOLQlXy2Kc5Yv4X1QJiJ7v1Vj4jI6J5qG6zPd4B7U=s88-c-k-c0x00ffffff-no-rj"
    },
    {
        id: 4,
        name: "Prototype",
        src: 'https://localhost:7229/files/8adb05ea-5b54-41b2-8b73-58197dbe00da.mp4',
        content: 'Nike alpha prototype',
        views: "1.2M",
        likes: "23K",
        comments: "220",
        date: "16 Tháng 5",
        userName: "Phimm mới",
        avatarUrl: "https://img.ophim.live/uploads/movies/dai-mong-quy-ly-thumb.jpg"
    }
]
const WatchPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchVideos();
    }, []);
    const fetchVideos = async () => {
        try {
            setLoading(true);
            const response = await postApi.getWatchlist();
            var data = response.map((item, index) => {
                return {
                    id: item.id,
                    name: item.title,
                    src: item.mediaItems[0].url?.startsWith("/files") ? `${BASE_URL}${item.mediaItems[0].url}` : item.mediaItems[0].url,
                    content: item.content,
                    views: "1.6M",
                    likes: "41K",
                    comments: "710",
                    date: "15 Tháng 5",
                    userName: item.author.name,
                    avatarUrl: item.author.avatar
                }
            });
            setPosts(data);
        } catch (error) {
            console.error("Error fetching videos:", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="p-2 bg-[#f7f7f7] dark:bg-[#18191a] min-h-[100vh]">
            <div>
                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className='min-w-[500px]'
                    >
                        <PostSkeleton loading={loading} />
                        <PostSkeleton loading={loading} />
                        <PostSkeleton loading={loading} />
                    </motion.div>
                ) : (
                    posts.map((item, index) => (
                        <VideoPost key={index} {...item} />
                    ))
                )}
            </div>
        </div>
    );
};

export default WatchPage;