'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ClientTiptapEditor from '@/components/ClientTiptapEditor';

export default function EditPostPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
      })
      .catch(err => console.error('Failed to load post:', err));
  }, [slug]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      alert('✅ Post updated!');
      router.push('/myposts');
    } else {
      alert('❌ Failed to update post');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/posts/${slug}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('🗑️ Post deleted');
    //   router.push('/myposts');
    } else {
      alert('❌ Failed to delete post');
    }
  };

  if (!post) return <p className="p-6 text-gray-500">Loading post...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">🛠 Edit Post: <span className="text-blue-600">{slug}</span></h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <ClientTiptapEditor value={content} onChange={setContent} />
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete Post
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={() => {
              setTitle(post.title);
              setContent(post.content);
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}