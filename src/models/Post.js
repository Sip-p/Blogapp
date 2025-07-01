import mongoose from 'mongoose';
import { unique } from 'next/dist/build/utils';
const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true ,unique: true}, // Post title
    content: { type: String, required: true }, // HTML content
    slug: { type: String, required: true, unique: true }, // SEO-friendly slug
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema);