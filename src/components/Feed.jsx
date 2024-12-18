import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Post from "./Post";
import PostSkeleton from "./Skeleton";
import { faker } from "@faker-js/faker";
import { postApi } from "../api";



export default function Feed({ listPosts }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const response = await postApi.getFeed();
      setPosts(response[0].posts); // Access the posts array from response
    } catch (error) {
      console.error("Error fetching feed:", error);
    } finally {
      setLoading(false);
    }
  };


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
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {posts?.map((post, index) => (
            <div key={post?.id || index}>
              <Post
                id={post.id}
                author={post.author.name}
                caption={post.content}
                images={post.mediaItems}
                profileImage={post.author.avatar?.length > 10 ? post.author.avatar : faker.image.avatar()}
                timestamp={new Date(post.createdAt).toLocaleString()}
                title={post.title}
                metrics={post.metrics}
                visibility={post.visibility}
                isClicked={true}
              />
            </div>
          ))}
        </motion.div>
      )}
    </>
  );
}
