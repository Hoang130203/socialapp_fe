import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import Story from "./Story";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../firebase/firebase";


const Stories = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [user, setUser] = useState(
    {
      photoURL: faker.image.avatar(),
      displayName: faker.internet.userName(),
    }
  );

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div
      className="
    flex space-x-2 p-6 bg-white mb-10 border-gray-200 border rounded-sm 
    overflow-x-scroll hover:scrollbar-thin
    hover:scrollbar-thumb-black scrollbar-hide hover:scrollbar-default dark:bg-[#28282B] dark:border-none"
    >
      {user && <Story img={user?.photoURL} username={user?.displayName} />}
      {suggestions.map((data, index) => (
        <Story key={index} img={data.avatar} username={data.username} />
      ))}
    </div>
  );
};
export default Stories;
