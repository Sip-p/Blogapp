'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';

export default function ClientTiptapEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write your blog content here...',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external value (e.g. clearing content from parent)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', false); // avoid reset flicker
    }
  }, [value, editor]);

  // Cleanup to avoid memory leaks (good hygiene)
  useEffect(() => {
    return () => editor?.destroy();
  }, [editor]);

  return (
    <div className="bg-white border rounded min-h-[200px] p-2">
      {editor && <EditorContent editor={editor} />}
    </div>
  );
}