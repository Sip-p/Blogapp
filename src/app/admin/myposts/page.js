// // 'use client';
// // import { useEffect, useState } from 'react';
// // import { useSession } from 'next-auth/react';
// // import { useRouter } from 'next/navigation';

// // export default function MyPostsPage() {
// //   const [posts, setPosts] = useState([]);
// //   const { data: session, status } = useSession();
// //   const router = useRouter();

// //   useEffect(() => {
// //     if (status === 'loading') return; // Wait for session to load

// //     if (!session?.user) {
// //       router.push('/login?message=Please%20log%20in%20to%20view%20your%20posts');
// //       return;
// //     }

// //     const userId = session.user.id;

// //     fetch('/api/posts/mine', {
// //       headers: {
// //         'x-user-id': userId,
// //       },
// //     })
// //       .then(res => res.json())
// //       .then(data => setPosts(data))
// //       .catch(err => console.error(err));
// //   }, [session, status]);

// //   const handleEdit = (slug) => {
// //     router.push(`/admin/edit/${slug}`);
// //   };

// //   const handleDelete = async (postId) => {
// //     const confirmDelete = confirm('Are you sure you want to delete this post?');
// //     if (!confirmDelete) return;

// //     const res = await fetch(`/api/posts/${postId}`, {
// //       method: 'DELETE',
// //     });

// //     if (res.ok) {
// //       setPosts(prev => prev.filter(post => post._id !== postId));
// //     } else {
// //       alert('Failed to delete post');
// //     }
// //   };

// //   return (
// //     <div className="p-6 space-y-6">
// //       <h1 className="text-2xl font-bold">📝 My Posts</h1>
// //       {posts.length === 0 ? (
// //         <p className="text-gray-500">You haven’t published any posts yet.</p>
// //       ) : (
// //         posts.map(post => (
// //           <div key={post._id} className="p-4 border rounded shadow space-y-2">
// //             <h2 className="text-xl font-semibold">{post.title}</h2>
// //             <p
// //               className="text-gray-600 line-clamp-2"
// //               dangerouslySetInnerHTML={{ __html: post.content }}
// //             />
// //             <p className="text-sm text-gray-500">
// //               Published on {new Date(post.createdAt).toLocaleDateString()}
// //             </p>
// //             <div className="flex space-x-2">
// //               <button
// //                 onClick={() => handleEdit(post.slug)}
// //                 className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
// //               >
// //                 Edit
// //               </button>
// //               <button
// //                 onClick={() => handleDelete(post._id)}
// //                 className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );
// // }


// 'use client';
// import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// export default function MyPostsPage() {
//   const [posts, setPosts] = useState([]);
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === 'loading') return;

//     if (!session?.user) {
//       router.push('/login?message=Please%20log%20in%20to%20view%20your%20posts');
//       return;
//     }

//     const userId = session.user.id;

//     fetch('/api/posts/mine', {
//       headers: {
//         'x-user-id': userId,
//       },
//     })
//       .then(res => res.json())
//       .then(data => setPosts(data))
//       .catch(err => console.error(err));
//   }, [session, status]);

//   const handleEdit = (slug) => {
//     router.push(`/admin/edit/${slug}`);
//   };

//   const handleDelete = async (slug) => {
//     const confirmDelete = confirm('Are you sure you want to delete this post?');
//     if (!confirmDelete) return;

//     const res = await fetch(`/api/posts/${slug}`, {
//       method: 'DELETE',
//     });

//     if (res.ok) {
//       setPosts(prev => prev.filter(post => post.slug !== slug));
//     } else {
//       alert('Failed to delete post');
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">📝 My Posts</h1>
//       {posts.length === 0 ? (
//         <p className="text-gray-500">You haven’t published any posts yet.</p>
//       ) : (
//         posts.map(post => (
//           <div key={post._id} className="p-4 border rounded shadow space-y-2">
//             <h2 className="text-xl font-semibold">{post.title}</h2>
//             <p
//               className="text-gray-600 line-clamp-2"
//               dangerouslySetInnerHTML={{ __html: post.content }}
//             />
//             <p className="text-sm text-gray-500">
//               Published on {new Date(post.createdAt).toLocaleDateString()}
//             </p>
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => handleEdit(post.slug)}
//                 className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(post.slug)}
//                 className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }


'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function MyPostsPage() {
  const [posts, setPosts] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session?.user) {
      router.push('/login?message=Please%20log%20in%20to%20view%20your%20posts');
      return;
    }

    const userId = session.user.id;

    fetch('/api/posts/mine', {
      headers: {
        'x-user-id': userId,
      },
    })
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error fetching posts:', err));
  }, [session, status]);

  const handleEdit = (slug) => {
    router.push(`/admin/edit/${slug}`);
  };

  const handleDelete = async (slug) => {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/posts/${slug}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setPosts(prev => prev.filter(post => post.slug !== slug));
    } else {
      alert('❌ Failed to delete post');
    }
  };

  const handleReadMore = (slug) => {
    router.push(`/admin/blog/${slug}`);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📝 My Posts</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">You haven’t published any posts yet.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="p-4 border rounded shadow space-y-2">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p
              className="text-gray-600 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <p className="text-sm text-gray-500">
              Published on {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleEdit(post.slug)}
                className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.slug)}
                className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => handleReadMore(post.slug)}
                className="px-4 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Read More
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}