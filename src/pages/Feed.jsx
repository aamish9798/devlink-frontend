import React from "react";
import PostCard from "../components/PostCard";

const dummyPosts = [
  { id: 1, title: "First Post", content: "Hello world!", author: "John" },
  { id: 2, title: "Another Post", content: "DevLink is live!", author: "Jane" },
];

const Feed = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Feed</h2>
      {dummyPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
