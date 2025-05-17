import React from "react";
import PostCard from "../components/PostCard";

const dummyPosts = [
  { id: 1, title: "First Post", content: "Hello world!", author: "Aamish" },
  {
    id: 2,
    title: "Another Post",
    content: "DevLink is live!",
    author: "Aamish",
  },
];

const Feed = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white text-center">Feed</h2>
      {dummyPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
