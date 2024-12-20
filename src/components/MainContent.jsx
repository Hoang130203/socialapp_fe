/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { faker } from "@faker-js/faker";



const MainContent = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  )

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(4)].map((_, i) => ({
      userId: faker.string.uuid(),
      username: faker.name.firstName(),
      avatar: faker.image.avatar(),
      images: faker.image.url(),
      id: i,
    }));
    setSuggestions(suggestions);
    //console.log(suggestions);
  }, []);

  return (
    <div className="relative flex space-x-2 pt-4 ">
      <div className="w-1/4 sm:w-1/6 h-44 rounded-xl shadow overflow-hidden flex flex-col group cursor-pointer">
        <div className="h-3/4 overflow-hidden">
          <img
            src={user?.profilePictureUrl}
            alt="picture"
            className="group-hover:transform group-hover:scale-110 transition-all duration-700 h-full object-cover"
          />
        </div>
        <div className="flex-1 relative flex items-end justify-center pb-2 text-center leading-none">
          <span className="font-semibold dark:text-white">
            Tạo tin <br />
          </span>
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white grid place-items-center text-2xl border-4 border-white dark:border-dark-second absolute -top-5 left-1/2 transform -translate-x-1/2">
            <AddIcon />
          </div>
        </div>
      </div>

      <div className="w-1/4 sm:w-1/6 h-44 rounded-xl overflow-hidden">
        <div className="relative h-full group cursor-pointer">
          <img
            src={faker.image.url()}
            alt="Story images"
            className="group-hover:transform group-hover:scale-110 transition-all duration-700 h-full w-full object-cover"
          />
          <div className="w-full h-full bg-black  absolute top-0 left-0 bg-opacity-10"></div>
          <span className="absolute bottom-0 left-2 pb-2 font-semibold text-white">
            Tin của bạn
          </span>
          <div className="w-10 h-10 rounded-full overflow-hidden absolute top-2 left-2 border-4 border-blue-500">
            <img src={user?.photoURL} alt="Profile picture" className="h-full object-cover" />
          </div>
        </div>
      </div>
      {suggestions.map((data, index) => (
        <div
          className="w-1/4 sm:w-1/6 h-44 rounded-xl overflow-hidden"
          key={index}
        >
          <div className="relative h-full group cursor-pointer">
            <img
              src={data.images}
              alt="Story images"
              className="group-hover:transform group-hover:scale-110 transition-all duration-700 h-full w-full object-cover"
            />
            <div className="w-full h-full bg-black absolute top-0 left-0 bg-opacity-10"></div>
            <span className="absolute bottom-0 left-2 pb-2 font-semibold text-white">
              {data.username}
            </span>
            <div className="w-10 h-10 rounded-full overflow-hidden absolute top-2 left-2 border-4 border-blue-500">
              <img src={data.avatar} alt="Profile picture" className="h-full object-cover" />
            </div>
          </div>
        </div>
      ))}

      <div className="w-12 h-12 rounded-full hidden lg:grid place-items-center text-2xl bg-white absolute -right-6 top-1/2 transform -translate-y-1/2 border border-gray-200 cursor-pointer hover:bg-gray-100 shadow text-gray-500 dark:border-0 dark:text-white dark:hover:bg-gray-800 dark:bg-gray-700">
        <ArrowForwardIosIcon />
      </div>
    </div>
  );
};
export default MainContent;
