// import { connectToDatabase } from '../../../../lib/db';

// import Post from '../../../../models/Post';
// export async function GET() {
//   try {
//     await connectToDatabase();
//     const posts = await Post.find().sort({ createdAt: -1 });
//     return Response.json(posts);
//   } catch (error) {
//     return new Response('Failed to fetch posts', { status: 500 });
//   }
// }
import { connectToDatabase } from '../../../../lib/db';

import Post from '../../../../models/Post';

export async function GET() {
  try {
    await connectToDatabase();
    const posts = await Post.find().sort({ createdAt: -1 }).lean();

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}