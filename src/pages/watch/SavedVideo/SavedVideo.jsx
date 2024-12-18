import { Button } from "@mui/material";
import { FaThumbsUp, FaHeart, FaLaugh, FaSadTear } from 'react-icons/fa';

function SavedVideoItem(
    { id, name, src, content, date, userName, avatarUrl }
) {
    return (
        <div className=" mx-auto bg-white dark:bg-[#28282B] dark:text-white dark:border-none shadow-lg rounded-lg p-2 border border-gray-200 flex mt-32 xl:mt-10 items-center">
            <div>
                <img
                    src={src}
                    alt="Video Thumbnail"
                    className="rounded-lg w-72 h-32 object-cover "
                />
                <div className="relative mb-2">
                    <div className="absolute bottom-2 right-10 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                        1:40:58
                    </div>
                </div>
            </div>
            <div className=" pl-5">
                {/* Header */}
                <div className="flex items-center mb-2">
                    <img
                        src={avatarUrl}
                        alt="User profile"
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                            {userName}
                        </h3>
                        <p className="text-xs text-gray-500">
                            {date}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <p className="mb-4">
                    {name}
                </p>


                {/* Reaction bar */}
                <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
                    <div className="flex items-center">
                        <FaThumbsUp className="text-blue-500 mr-1" />
                        <FaHeart className="text-red-500 mr-1" />
                        <FaLaugh className="text-yellow-500 mr-1" />
                        <FaSadTear className="text-gray-500 mr-1" />
                        <span>Bạn, Tăng Minh Vũ, Bùi Đức Việt và 21 người khác</span>
                    </div>
                    <span>11 bình luận · 1,6K lượt phát</span>
                </div>
            </div>
        </div>
    );
}

const data = [
    {
        id: 1,
        name: "Vĩnh Dạ Tinh Hà",
        src: "https://img.ophim.live/uploads/movies/vinh-da-tinh-ha-thumb.jpg",
        content: "",
        date: "19 tuần trước",
        userName: "Phim moi",
        avatarUrl: "https://img.ophim.live/uploads/movies/vinh-da-tinh-ha-poster.jpg"
    },
    {
        id: 2,
        name: "Đại Mộng Quy Ly tập 1",
        src: "https://img.ophim.live/uploads/movies/dai-mong-quy-ly-thumb.jpg",
        content: "",
        date: "19 tuần trước",
        userName: "Ngô Ngọc Sâm",
        avatarUrl: "https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-1/461587343_1995110630932318_455563402388585762_n.jpg?stp=cp0_dst-jpg_s48x48&_nc_cat=102&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeH0_IQSaTuo6fclaKn5Um_Hh0UuWuVAKhCHRS5a5UAqEM-hz9Z4JsWrYxvt9K18GeBlz7-CuKGYbg2WR5kDzbcE&_nc_ohc=Tg3m37v6DaoQ7kNvgGHNLbK&_nc_zt=24&_nc_ht=scontent.fhan14-4.fna&_nc_gid=Av-xTTeZt2lfUOl-EyDLLGD&oh=00_AYAjV-dWs7FMwHVexb3u446A0x6N3VvhALzBSt7S9ODJTw&oe=673AA032"
    }

]

function SavedVideos() {
    return (
        <div className="min-h-svh px-10 ">
            {
                data.map((item, index) => (
                    <SavedVideoItem key={index} {...item} />
                ))
            }
        </div>
    );
}

export default SavedVideos;

