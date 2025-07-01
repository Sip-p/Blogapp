// 'use client';
// import React, { useEffect, useState } from 'react';
// import PostCard from './PostCard';

// const PostsBox = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch('/api/posts/allpost')
//       .then(res => res.json())
//       .then(data => {
//         // If your API returns an array directly:
//         console.log(data)
//         setPosts(data);
//         // If your API returns { posts: [...] } instead:
//         // setPosts(data.posts);
//       })
//       .catch(err => {
//         console.error('Error fetching posts:', err);
//       });
//   }, []);

//   return (
//     <div className="px-6 py-8">
//       <h1 className="text-2xl font-bold mb-4 text-white">Recent Posts</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {posts.map((post) => (
//           <PostCard
//             key={post._id}
//             title={post.title}
//             content={post.content}
//             slug={post.slug}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PostsBox;


'use client';
import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';

const PostsBox = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts/allpost')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch posts');
        return res.json();
      })
      .then((data) => {
        console.log('Fetched posts:', data);
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-4 text-white">Recent Posts</h1>

      {loading ? (
        <p className="text-white">Loading posts...</p>
      ) : posts.length > 0 ? (
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
      ) : (
        <p className="text-white">No posts available yet. Stay tuned!</p>
      )}
    </div>
  );
};

export default PostsBox;