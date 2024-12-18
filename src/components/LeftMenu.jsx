import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import moment from "moment";
import { faker } from "@faker-js/faker";
import { KeyboardArrowUp } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const sideData = [
    {
        image: "https://i.postimg.cc/qq7ZhQ3t/XF4-FQcre-i.png",
        name: "Bạn bè",
        path: "/friends",
    },
    {
        image: "https://i.postimg.cc/5twrZXJt/mk4d-H3-FK0j-T.png",
        name: "Nhóm",
        path: "/groups",
    },
    {
        image: "https://i.postimg.cc/HxzhkFVD/9-BDq-Qfl-Vf-XI.png",
        name: "MarketPlace",
    },
    {
        image: "https://i.postimg.cc/WzfYMrG5/A1-Hl-I2-LVo58.png",
        name: "Video",
        path: "/watch",
    },
    {
        image: "https://i.postimg.cc/63tPwB6f/AYj2837-Mmg-X.png",
        name: "Kỷ niệm",
    },
    {
        image: "https://i.postimg.cc/vHNC9RXG/2u-Pl-V4o-ORj-U.png",
        name: "Đã lưu",
    },
    {
        image: "https://i.postimg.cc/J7KfrHkD/i7hep-Q2-Oe-Zg.png",
        name: "Trang",
    },
    {
        image: "https://i.postimg.cc/Zqkg7r1g/XXwl2m1vjq-M.png",
        name: "Sự kiện",
    },
    {
        image: "https://i.postimg.cc/DyZt8frC/3d-N1-Qw-OLden.png",
        name: "Most recent",
    },
    {
        image: "https://i.postimg.cc/jSnm48kP/q-R88-GIDM38e.png",
        name: "Trình quản lý quảng cáo",
    },
];
const suggestions = [
    {
        image: faker.image.urlPicsumPhotos(),
        name: faker.company.name(),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        name: faker.company.name(),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        name: faker.company.name(),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        name: faker.company.name(),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        name: faker.company.name(),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        name: faker.company.name(),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        name: faker.company.name(),
    },
    {
        image: faker.image.urlPicsumPhotos(),
        name: faker.company.name(),
    },
];
function LeftMenu() {
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        }
        return null;
    });

    const [showAllSideData, setShowAllSideData] = useState(false);
    const [showAllSuggestions, setShowAllSuggestions] = useState(false);

    const handleShowMoreSideData = () => {
        setShowAllSideData((prev) => !prev);
    };

    const handleShowMoreSuggestions = () => {
        setShowAllSuggestions((prev) => !prev);
    };
    const navigate = useNavigate();
    const handleChangePage = () => {
        // router.push("/create");
        navigate('/profile/' + user.userId);
    };
    return (
        <div className="overflow-scroll overflow-x-hidden xl:block fixed h-screen overflow-y-auto bg-[#f7f7f7] dark:bg-[#18191a]  scrollbar-hide w-1/5 pt-10  hidden  flex-col  hover:scrollbar-thin  hover:scrollbar-thumb-slate-400 hover:scrollbar-default">
            <ul className="p-4">
                <li>
                    {user ? (
                        <div
                            onClick={handleChangePage}
                            className="flex items-center space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third dark:hover:text-white cursor-pointer"
                        >
                            <img
                                src={user?.profilePictureUrl || "https://i.ytimg.com/vi/KJ78T9BrnFM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA00OWvTfeI-aVK8i4JKDiUQdbZ3Q"}
                                alt="Profile picture"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="font-semibold dark:text-white">{user?.fullName}</span>
                        </div>
                    ) : (
                        <div
                            className="animate-pulse flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt"
                            onClick={() => router.push("/auth/login")}
                        >
                            <img
                                src="https://th.bing.com/th/id/OIP.Cl56H6WgxJ8npVqyhefTdQHaHa?pid=ImgDet&rs=1"
                                alt="Profile picture"
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="font-semibold">Sign Up</span>
                        </div>
                    )}
                </li>
                {user && (
                    <>
                        {sideData.slice(0, showAllSideData ? sideData.length : 6)
                            .map((data, index) => (
                                <li key={index}>
                                    <Link to={data?.path || "#"}>
                                        <div className="flex items-center cursor-pointer space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                                            <img
                                                src={data.image}
                                                alt="Profile picture"
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <span className="font-semibold dark:text-white text-[14px]">{data.name}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}

                        <li>
                            <div onClick={handleShowMoreSideData}
                                className="flex items-center cursor-pointer space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                                <span className="w-8 h-8 rounded-full grid place-items-center bg-gray-300 dark:bg-dark-second">
                                    {
                                        showAllSideData ? <KeyboardArrowUp /> : <KeyboardArrowDownIcon />
                                    }
                                </span>
                                <span className="font-semibold dark:text-white">{showAllSideData ? "Thu gọn" : "Xem thêm"}</span>
                            </div>
                        </li>
                        <li className="border-b border-gray-200 dark:border-dark-third mt-6"></li>
                    </>
                )}
            </ul>

            {user && (
                <>
                    <div className="flex justify-between items-center px-4 h-4 group">
                        <span className="font-semibold text-gray-500 text-lg dark:text-white">
                            Lối tắt của bạn
                        </span>
                        <span className="text-blue-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-dark-third p-2 rounded-md group-hover:inline-block">
                            Chỉnh sửa
                        </span>
                    </div>

                    <ul className="p-4">
                        <div className={`transition-max-height duration-300 ease-in-out overflow-hidden ${showAllSuggestions ? "max-h-[2000px]" : "max-h-[245px]"}`}>
                            {suggestions.slice(0, showAllSuggestions ? suggestions.length : 7)
                                .map((data, index) => (
                                    <li key={index}>
                                        <div className="cursor-pointer flex items-center space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                                            <img
                                                src={data.image}
                                                alt={data.name}
                                                className="w-8 h-8 rounded-lg"
                                            />
                                            <span className="font-semibold text-[14px] dark:text-white">{data.name}</span>
                                        </div>
                                    </li>
                                ))}

                        </div>
                        <li>
                            <div
                                onClick={handleShowMoreSuggestions}
                                className="cursor-pointer flex items-center space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
                            >
                                <span className="w-8 h-8 rounded-full grid place-items-center bg-gray-300 dark:bg-dark-second">
                                    {
                                        showAllSuggestions ? <KeyboardArrowUp /> : <KeyboardArrowDownIcon />
                                    }
                                </span>
                                <span className="font-semibold dark:text-white">{showAllSuggestions ? "Thu gọn" : "Xem thêm"}</span>
                            </div>
                        </li>
                    </ul>
                </>
            )}
            <div className="mt-auto p-6 text-sm text-gray-500 dark:text-gray-400 font-semibold text-[12px]">
                <span>Quyền riêng tư</span>
                <span> . </span>
                <span>Điều khoản</span>
                <span> . </span>
                <span>Quảng cáo</span>
                <span> . </span>
                <span>Cookies</span>
                <span> . </span>
                <span>Lựa chọn quảng cáo</span>
                <span> . </span>
                <span>Xem thêm</span>
                <span> . </span>
                <span>Meta © {moment().format("YYYY")}</span>
            </div>
        </div>
    );
}

export default LeftMenu;