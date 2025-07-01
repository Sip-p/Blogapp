'use client';
import React, { useState } from 'react';
import ClientTiptapEditor from './ClientTiptapEditor';

const PostForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');

 const handleSubmit = async (e) => {
  e.preventDefault();
  const success=await onSubmit({ title, content });
  if (success) {
    setTitle('');
    setContent('');
  }  
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title"
        className="w-full p-3 text-lg border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

<ClientTiptapEditor value={content} onChange={setContent} />
<div className='flex justify-between items-center'> 
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
      >
        Publish Post
      </button>
      <button
  type="button"
  onClick={() => {
    setContent('');
    setTitle('');
     
  }}
  className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
>
  Refresh
</button>
      </div>
    </form>
  );
};

export default PostForm;