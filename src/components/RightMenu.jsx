/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { businessApi } from "../api";



const RightMenu = ({ isMessenger }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [Ads, setAds] = useState([]);
  const fetchAds = async () => {
    try {
      const response = await businessApi.getRandom();
      setAds(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAds();
    const suggestions = [...Array(6)].map((_, i) => ({
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
      company: faker.company.name(),
      id: i,
    }));
    setSuggestions(suggestions);
    //console.log(suggestions);
  }, []);

  return (
    <div className="w-1/5 bg-[rgb(247,247,247)] dark:bg-[#18191a] pt-16 h-full hidden xl:block px-4 fixed top-0 right-0 overflow-scroll scrollbar-hide">
      <div className="h-full dark:text-white">
        {!isMessenger && (
          <>
            <div className="flex justify-between items-center px-0 pt-4">
              <span className="font-semibold text-gray-500 text-lg dark:text-gray-300">
                Được tài trợ
              </span>
            </div>
            <div className="mt-2">
              <div className="flex items-center space-x-4  dark:hover:bg-dark-third rounded-lg transition-all cursor-pointer">
                <img
                  src="https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.jpg"
                  alt="Profile picture"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="dark:text-dark-txt">
                  <span className="font-semibold">{Ads?.title}</span>
                </div>
              </div>
            </div>
            <div className="cursor-pointer">
              <div className="flex-1 space-x-2 mt-2">
                <p>
                  {Ads?.content?.slice(0, 300)} {Ads?.content?.length > 300 && "..."}
                </p>
              </div>
              <div className="mb-8">
                <img
                  className="rounded-xl"
                  src={Ads?.mediaUrl || "https://fs.npstatic.com/userfiles/7687254/image/NextPit-Apple-iPhone-14-Plus-vs-iPhone-14-Pro-Max-w810h462.jpg"}
                />
              </div>
            </div>

            <div className="border-b border-gray-200 dark:border-dark-third mb-3"></div>

            <div>
              <div className="flex justify-start font-semibold text-lg text-gray-600 dark:text-gray-300">
                <h1>Sinh nhật</h1>
              </div>
              <div className="flex justify-between mt-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800 px-2 py-2 rounded-md">
                <img
                  className="w-8 h-8 mr-2"
                  src="https://i.postimg.cc/jdr7fwV8/gift.png"
                  alt=""
                />
                <p className="text-md">
                  <span className="font-semibold">
                    {faker.name.firstName()}, {faker.name.firstName()}
                  </span>{" "}
                  và <span className="font-semibold">2 người khác</span> sinh nhật hôm nay
                </p>
              </div>
            </div>
          </>
        )}

        <div className="border-b border-gray-200 dark:border-dark-third mt-3"></div>

        <div className="flex justify-between items-center px-4 pt-4 text-gray-500 dark:text-gray-300">
          <span className="font-semibold text-lg">Người liên hệ</span>
          <div className="flex space-x-1">
            <div className="w-8 h-8 grid place-items-center text-xl hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full cursor-pointer">
              <SearchIcon />
            </div>
            <div className="w-8 h-8 grid place-items-center text-xl hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full cursor-pointer">
              <MoreHorizIcon />
            </div>
          </div>
        </div>
        <ul className="p-2">
          {suggestions.map((data, index) => (
            <li key={index}>
              <div className="flex items-center space-x-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
                <div className="relative">
                  <img
                    src={data.avatar}
                    alt="Friends profile picture"
                    className="rounded-full w-10 h-10 border-2 px-1 py-1 border-blue-500"
                  />
                  <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
                </div>
                <div>
                  <span className="font-semibold">{data.username}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default RightMenu;
