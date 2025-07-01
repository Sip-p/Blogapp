import { connectToDatabase } from '../../../../lib/db';
import Post from '../../../../models/Post';
import mongoose from 'mongoose';

export async function POST(req) {
  await connectToDatabase();
  const { title, content, slug, userId } = await req.json();

  const post = await Post.create({
    title,
    content,
    slug,
    user: new mongoose.Types.ObjectId(userId), // ✅ ensures correct format
  });

  return Response.json(post);
}


// import { connectToDatabase } from '../../../../lib/db';
// import Post from '../../../../models/Post';
// import mongoose from 'mongoose';

// export async function POST(req) {
//   await connectToDatabase();

//   const body = await req.json();
//   const { title, content, slug, userId } = body;

//   if (!title || !content || !slug || !userId) {
//     return new Response('Missing required fields', { status: 400 });
//   }

//   try {
//     const post = await Post.create({
//       title,
//       content,
//       slug,
//       user: new mongoose.Types.ObjectId(userId), // ✅ Cast to ObjectId for consistency
//     });

//     return new Response(JSON.stringify(post), {
//       status: 201,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error creating post:', error);
//     return new Response('Failed to create post', { status: 500 });
//   }
// }