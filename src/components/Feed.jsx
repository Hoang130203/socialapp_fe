import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Post from "./Post";
import PostSkeleton from "./Skeleton";
import { faker } from "@faker-js/faker";



export default function Feed({ }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(
  //   () =>
  //     onSnapshot(
  //       query(collection(firestore, "posts"), orderBy("timestamp", "desc")),
  //       (snapshot) => {
  //         setPosts(snapshot.docs);
  //       }
  //     ),
  //   [firestore]
  // );

  useEffect(() => {
    setTimeout(() => {
      if (posts) {
        setLoading(false);
        setPosts([
          {
            id: 1,
            username: "Mai Minh Hoàng",
            caption: "Hello",
            image: "https://img.freepik.com/free-vector/alien-planet-landscape-space-game-background_107791-1847.jpg",
            profileImage: "https://i.ytimg.com/vi/KJ78T9BrnFM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA00OWvTfeI-aVK8i4JKDiUQdbZ3Q",
            timestamp: '1 giờ trước',
          },
          {
            id: 2,
            username: "Top Comments",
            caption: `Kinh thành Huế về đêm 💜 Đỉnh cao quy hoạch!`,
            image: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/463476997_970066328499279_8666867718294347818_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEimiGXQK1o6CoJNWK5nMphsteNUAiHVCiy141QCIdUKLjOe08s_AZ0FT3BFmaC7Gh-7r-YuWHnyYXf0MC0-5EK&_nc_ohc=4LbhzOxg_dwQ7kNvgGkfTYr&_nc_zt=23&_nc_ht=scontent.fhan14-1.fna&_nc_gid=ANeMm9hHlb0RXwCuXMqho6w&oh=00_AYA8yOEHjtTSc6civh-vpxFwcRBij_m0mFRcefQxpgbbnw&oe=6715B240',
            profileImage: "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/453072859_908668704639042_7014970388308944883_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFjE4bT9i_kSxIBoLhbdwRyMDEPn7GasIkwMQ-fsZqwiTcF6CwN5GJqGifNjM0hCY0FJyMzlFuR4jqgJZFqI-wY&_nc_ohc=4D15_sXI-lMQ7kNvgFi-uaB&_nc_ht=scontent.fhan14-2.fna&_nc_gid=AXWbe2T4AqRJ4TQuXc6EiES&oh=00_AYCjh4Lttb1nkvaAJVT7-5tCZUBRoEuZXZPGO_etzi6dog&oe=67118C8F",
            timestamp: '10 giờ trước',
          }
        ]);
      } else return;
    }, 3000);
  }, [posts]);

  return (
    <>
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <PostSkeleton loading={loading} />
          <PostSkeleton loading={loading} />
          <PostSkeleton loading={loading} />
          <PostSkeleton loading={loading} />
          <PostSkeleton loading={loading} />
          <PostSkeleton loading={loading} />
          <PostSkeleton loading={loading} />
          <PostSkeleton loading={loading} />
          <PostSkeleton loading={loading} />
          <PostSkeleton loading={loading} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {posts.map((post, index) => (
            <div key={post?.id || index}>
              <Post
                id={post?.id}
                author={post?.username}
                caption={post?.caption}
                image={post?.image}
                profileImage={post?.profileImage}
                timestamp={post?.timestamp}
                isClicked={true}
              />
            </div>
          ))}
        </motion.div>
      )}
    </>
  );
}
