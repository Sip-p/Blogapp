// import { connectToDatabase } from '../../../../lib/db';
// import Post from '../../../../models/Post';

// export async function GET(req) {
//   await connectToDatabase();

//   const userId = req.headers.get('x-user-id'); // We'll pass this from the client

//   if (!userId) {
//     return new Response('User ID is missing', { status: 400 });
//   }

//   const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
//   return Response.json(posts);
// }


import { connectToDatabase } from '../../../../lib/db';
import Post from '../../../../models/Post';

export async function GET(req) {
  await connectToDatabase();

  const userId = req.headers.get('x-user-id'); // passed from client

  if (!userId) {
    console.log('❌ No user ID provided');
    return new Response('User ID is missing', { status: 400 });
  }

  try {
    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });

    console.log(`✅ Found ${posts.length} posts for user:`, userId);
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('🛑 Error fetching posts:', error);
    return new Response('Server error', { status: 500 });
  }
}