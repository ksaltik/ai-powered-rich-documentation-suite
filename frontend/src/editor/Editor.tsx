import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Image from '@tiptap/extension-image';
import { setupCollaboration } from './Collaboration';
import { MathExtension } from './extensions/MathExtension';

interface EditorProps {
  documentId: string;
  userName: string;
}

export const RichEditor: React.FC<EditorProps> = ({ documentId, userName }) => {
  const [provider, setProvider] = useState<any>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      } as any),
      TaskList,
      TaskItem,
      Image,
      MathExtension,
      // Temporarily removed collaboration extensions because Hocuspocus/Yjs setup requires
      // the provider to be ready, but the hook must execute synchronously.
      // We will handle them conditionally or via effect if needed,
      // but typical pattern is injecting it if document exists.
    ],
    content: '<p>Loading...</p>',
    editable: false,
  });

  useEffect(() => {
    const { ydoc, provider: newProvider } = setupCollaboration(documentId);
    setProvider(newProvider);

    newProvider.on('status', ({ status }: { status: string }) => {
        if (status === 'connected') {
             editor?.setEditable(true);
        }
    });

    // Reconfigure editor with collaboration extensions once we have the provider
    if (editor && !editor.isDestroyed) {
      // This is a simplified approach. Ideally, you instantiate the editor *after* Y.Doc is ready.
      // But for React, setting the extensions with the doc is essential.
      editor.extensionManager.extensions.push(
         Collaboration.configure({ document: ydoc }) as any,
         CollaborationCursor.configure({
            provider: newProvider,
            user: { name: userName, color: '#' + Math.floor(Math.random()*16777215).toString(16) },
         }) as any
      );
      // force reload of extensions
      editor.view.updateState(editor.state);
    }

    return () => {
      newProvider.destroy();
    };
  }, [documentId, userName, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-300 rounded p-4 shadow-sm min-h-[500px]">
        <div className="mb-4 flex gap-2 border-b pb-2">
            <button
                className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
            >
                Bold
            </button>
             <button
                className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
            >
                Italic
            </button>
             <button
                className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
                H1
            </button>
             <button
                className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                H2
            </button>
             <button
                className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                Bullet List
            </button>
            <div className="flex-1" />
            <div className="text-sm text-gray-500 self-center">
                 {provider?.status === 'connected' ? '🟢 Online' : '🔴 Offline'}
            </div>
        </div>
      <EditorContent editor={editor} className="prose max-w-none focus:outline-none" />
    </div>
  );
};
