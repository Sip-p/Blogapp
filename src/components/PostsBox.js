'use client';
import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';

const PostsBox = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts/allpost')
      .then(res => res.json())
      .then(data => {
        // If your API returns an array directly:
        setPosts(data);
        // If your API returns { posts: [...] } instead:
        // setPosts(data.posts);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
      });
  }, []);

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-4 text-white">Recent Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            title={post.title}
            content={post.content}
            slug={post.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsBox;