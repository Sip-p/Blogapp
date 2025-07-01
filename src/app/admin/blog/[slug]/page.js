// import { connectToDatabase } from '@/lib/db';
// import Post from '@/models/Post';

// export default async function AdminPostView({ params }) {
//   await connectToDatabase();
//   const post = await Post.findOne({ slug: params.slug }).lean();

//   if (!post) {
//     return <div className="p-10 text-red-500">Post not found.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-10">
//       <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
//       <div
//         className="prose prose-lg"
//         dangerouslySetInnerHTML={{ __html: post.content }}
//       />
//     </div>
//   );
// }

// import { connectToDatabase } from '@/lib/db';
// import Post from '@/models/Post';
// import { notFound } from 'next/navigation';

// export default async function AdminPostView({ params }) {
//   await connectToDatabase();
//   const post = await Post.findOne({ slug: params.slug }).lean();

//   if (!post) {
//     notFound(); // ✅ Next.js 13+ way to show 404 page
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-4">
//       <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
//       <p className="text-sm text-gray-500">
//         Published on {new Date(post.createdAt).toLocaleDateString()}
//       </p>
//       <div className="prose prose-lg text-gray-800">
//         {/* 💡 Rich content rendering */}
//         <div dangerouslySetInnerHTML={{ __html: post.content }} />
//       </div>
//     </div>
//   );
// }

import { connectToDatabase } from '@/lib/db';
import Post from '@/models/Post';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/${params.slug}`);
  const post = await res.json();

  if (!post?.title) {
    return {
      title: 'Post Not Found',
      description: 'This blog post could not be found.',
    };
  }

  const plainText = post.content.replace(/<[^>]+>/g, '');
  const preview = plainText.split(/\s+/).slice(0, 30).join(' ');

  return {
    title: post.title,
    description: preview,
    openGraph: {
      title: post.title,
      description: preview,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/blog/${post.slug}`,
    },
    twitter: {
      title: post.title,
      description: preview,
    },
  };
}

export default async function AdminPostView({ params }) {
  await connectToDatabase();
  const post = await Post.findOne({ slug: params.slug }).lean();

  if (!post) {
    notFound(); // Next.js native fallback to 404
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
      <p className="text-sm text-gray-500">
        Published on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="prose prose-lg text-gray-800">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}