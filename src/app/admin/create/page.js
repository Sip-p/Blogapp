// 'use client';
// import PostForm from '@/components/PostForm';
// import { useRouter } from 'next/navigation';

// export default function CreatePage() {
//   const router = useRouter();

//   const handleCreatePost = async ({ title, content }) => {
//     const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');

//     const res = await fetch('/api/posts/create', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title, content, slug }),
//     });
 
//     if (res.ok) {
//       const post = await res.json();
//       console.log('Post created:', post);
//        alert('  published post');
       
//     // router.push(`/blog/${post.slug}`);
//     } else {
//       alert('Failed to publish post');
//     }
//   };

//   return <PostForm onSubmit={handleCreatePost} />;
// }

'use client';
import PostForm from '../../../components/PostForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleCreatePost = async ({ title, content }) => {
    if (status === 'loading') return; // Wait until session loads

    if (!session?.user?.id) {
      alert('You must be logged in to publish a post.');
      return;
    }

    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
    const userId = session.user.id;

    const res = await fetch('/api/posts/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, slug, userId }),
    });

    if (res.ok) {
      const post = await res.json();
      console.log('Post created:', post);
      alert('✅ Post published!');
      // router.push(`/blog/${post.slug}`);
    } else {
      alert('❌ Failed to publish post');
    }
  };

  return <PostForm onSubmit={handleCreatePost} />;
}