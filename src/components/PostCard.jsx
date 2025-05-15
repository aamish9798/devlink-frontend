import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="border p-4 rounded shadow mb-4">
      <h3 className="text-xl font-bold">{post.title}</h3>
      <p>{post.content}</p>
      <p className="text-sm text-gray-500">By {post.author}</p>
    </div>
  );
};

export default PostCard;
