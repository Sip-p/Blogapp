import { connectToDatabase } from '../../../../lib/db';

import Post from '../../../../models/Post';

export async function GET(req, { params }) {
  await connectToDatabase();
  const post = await Post.findOne({ slug: params.slug });
  if (!post) {
    return new Response('Post not found', { status: 404 });
  }
  return Response.json(post);
}
export async function PUT(req, { params }) {
  await connectToDatabase();
  const { title, content } = await req.json(); // ✅ Fix here

  const post = await Post.findOneAndUpdate(
    { slug: params.slug },
    { title, content },
    { new: true }
  );

  if (!post) {
    return new Response('Post not found', { status: 404 });
  }

  return Response.json(post);
}
export async function DELETE(req,{params}){
await connectToDatabase();
const post=await Post.findOneAndDelete({slug:params.slug});
if(!post){
    return new Response('Post not found', { status: 404 });
}
return new Response('Post deleted successfully', { status: 200 });
}