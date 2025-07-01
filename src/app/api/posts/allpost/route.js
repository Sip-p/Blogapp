import { connectToDatabase } from '../../../../lib/db';

import Post from '../../../../models/Post';
export async function GET() {
  try {
    await connectToDatabase();
    const posts = await Post.find().sort({ createdAt: -1 });
    return Response.json(posts);
  } catch (error) {
    return new Response('Failed to fetch posts', { status: 500 });
  }
}
