import CallIcon from "@mui/icons-material/Call";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SendIcon from "@mui/icons-material/Send";
import VideocamIcon from "@mui/icons-material/Videocam";
import Button from "@mui/material/Button";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, firestore } from "../../firebase/firebase";
import Stories from "./Stories";
import moment from "moment";
import LoopIcon from "@mui/icons-material/Loop";



const Messenger = () => {
  const [user, setUser] = useState(
    {
      displayName: "John Doe",
      photoURL: "https://i.postimg.cc/qq7ZhQ3t/XF4-FQcre-i.png",
      uid: "123456",
    });
  const [input, setInput] = useState("");
  const [speed, setSpeed] = useState("");
  const [loading, setLoading] = useState(false);
  const [meassage, setMeassage] = useState([]);

  const handleSendMeassage = async () => {
    setLoading(true);
    // try {
    //   const docRef = await addDoc(collection(firestore, "meassage"), {
    //     userid: user?.uid,
    //     username: user?.displayName,
    //     meassage: input,
    //     profileImage: user?.photoURL,
    //     timestamp: serverTimestamp(),
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    // setLoading(false);
    // setInput("");
  };

  // useEffect(
  //   () =>
  //     onSnapshot(
  //       query(collection(firestore, "meassage"), orderBy("timestamp", "desc")),
  //       (snapshot) => setMeassage(snapshot.docs)
  //     ),
  //   [firestore]
  // );

  // useEffect(() => {
  //   setSpeed(Math.floor(Math.random() * 5000));
  // }, []);

  return (
    <>
      <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden dark:bg-[#28282B]">
        <Stories />
        <div className="flex px-8 py-2.5 justify-between">
          <div className="flex justify-start">
            <img
              src={`https://avatars.dicebear.com/api/jdenticon/${speed}.svg`}
              alt=""
              className="rounded-full w-10 h-10 mr-5"
            />

            <p className="font-semibold text-center m-auto text-lg dark:text-white">
              Tin nhắn
            </p>
          </div>
          <div className="flex justify-center gap-2 dark:text-gray-200 cursor-pointer">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <CallIcon />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <VideocamIcon />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <MoreHorizIcon />
            </motion.div>
          </div>
        </div>
        <div
          className="flex flex-col flex-grow h-0 p-4 overflow-y-auto hover:scrollbar-thin  overflow-x-hidden
    hover:scrollbar-thumb-black scrollbar-hide hover:scrollbar-default dark:bg-[#28282B] dark:border-none"
        >
          {meassage.map((data) => (
            <div key={data.id}>
              {data.data().userid === user?.uid ? (
                <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                  <div>
                    <p className="text-sm flex justify-end lowercase">
                      {data.data().username}
                    </p>
                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                      <p className="text-md font-medium">
                        {data.data().meassage}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">
                      {moment(
                        new Date(data.data().timestamp?.seconds * 1000)
                      ).fromNow()}
                    </span>
                  </div>
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                    <img
                      className="rounded-full"
                      src={data.data().profileImage}
                      alt={data.data().username}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex w-full mt-2 space-x-3 max-w-xs">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                    <img
                      className="rounded-full"
                      src={data.data().profileImage}
                      alt={data.data().username}
                    />
                  </div>
                  <div>
                    <p className="text-sm flex justify-start lowercase">
                      {data.data().username}
                    </p>
                    <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                      <p className="text-sm font-medium">
                        {data.data().meassage}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">
                      {moment(
                        new Date(data.data().timestamp?.seconds * 1000)
                      ).fromNow()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gray-300 dark:bg-gray-700 dark:text-white font-medium p-4 z-50 flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex items-center h-10 w-full rounded px-3 text-sm outline-none dark:text-slate-700"
            type="text"
            placeholder="Nhập tin nhắn..."
          />
          {input && (
            <Button
              disabled={!input}
              onClick={handleSendMeassage}
              className={
                loading ? `bg-blue-400 cursor-not-allowed` : `bg-blue-400`
              }
              variant="contained"
              endIcon={
                loading ? <LoopIcon className="animate-spin" /> : <SendIcon />
              }
              style={{ marginLeft: "10px" }}
            >
              {!loading && `Gửi`}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default Messenger;
