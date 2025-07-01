// 'use client';
// import React from 'react';
// import Link from 'next/link';

// const PostCard = ({ title , content, slug  }) => {
//   // Remove HTML tags if content is rich text, fallback safely if it's not a string
   
//   return (
//     <div className="max-w-sm rounded overflow-hidden shadow-lg">
//       <div className="px-6 py-4">
//         <div className="font-bold text-xl mb-2">{title}</div>
//         <p className="text-gray-700 text-base">
//           {typeof content === 'string' ? content.replace(/<[^>]+>/g, '') : 'No content available'}
//         </p>
//       </div>
//       <div className="px-6 pt-4 pb-2">
//         <Link href={`admin/blog/${slug}`} className="text-blue-500 hover:text-blue-800">
//           Read More
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PostCard;


// 'use client';
// import React from 'react';
// import Link from 'next/link';

// const PostCard = ({ title, content, slug }) => {
//   // Sanitize and truncate content
//   const getPreview = (html) => {
//     if (typeof html !== 'string') return 'No content available';

//     // Remove HTML tags
//     const plainText = html.replace(/<[^>]+>/g, '');

//     // Split into words and slice to first 60
//     const words = plainText.split(/\s+/).slice(0, 20);
//     return words.join(' ') + '...';
//   };

//   return (
//     <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
//       <div className="px-6 py-4">
//         <h2 className="font-bold text-xl mb-2 text-gray-800">{title}</h2>
//         <p className="text-gray-700 text-base">
//           {getPreview(content)}
//         </p>
//       </div>
//       <div className="px-6 pt-2 pb-4">
//         <Link href={`/admin/blog/${slug}`} className="text-blue-500 hover:text-blue-800 underline">
//           Read More
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PostCard;


'use client';
import React from 'react';
import Link from 'next/link';

const PostCard = ({ title, content, slug }) => {
  const getPreview = (html, maxWords = 30) => {
    if (typeof html !== 'string') return 'No content available';
    const plainText = html.replace(/<[^>]+>/g, '');
    const words = plainText.trim().split(/\s+/).slice(0, maxWords);
    return words.join(' ') + '...';
  };

  return (
    <div className="max-w-sm bg-white rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4 space-y-2">
        <h2 className="font-bold text-xl text-gray-800">{title}</h2>
        <p className="text-gray-700 text-base">{getPreview(content)}</p>
      </div>
      <div className="px-6 pb-4">
        <Link
          href={`/admin/blog/${slug}`}
          className="text-blue-500 hover:text-blue-800 underline text-sm"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;