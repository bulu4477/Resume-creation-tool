'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  Link as LinkIcon,
  Undo,
  Redo
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
      Underline,
    ],
    content: content || '<p></p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[120px] px-3 py-2 [&_p]:m-0 [&_p]:leading-[1.6] [&_p+&p]:mt-0.5',
      },
    },
  });

  if (!editor) {
    return (
      <div className="border rounded-lg overflow-hidden bg-white">
        <div className="flex items-center gap-1 px-2 py-2 border-b bg-gray-50">
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="p-4 min-h-[120px] bg-gray-50">
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>
      </div>
    );
  }

  const toggleBold = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    editor.chain().focus().toggleBold().run();
  };
  const toggleItalic = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    editor.chain().focus().toggleItalic().run();
  };
  const toggleUnderline = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    editor.chain().focus().toggleUnderline().run();
  };
  const toggleBulletList = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    editor.chain().focus().toggleBulletList().run();
  };
  const toggleOrderedList = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    editor.chain().focus().toggleOrderedList().run();
  };
  const undoAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    editor.chain().focus().undo().run();
  };
  const redoAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    editor.chain().focus().redo().run();
  };

  const setLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('输入链接地址', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const ToolbarButton = ({ 
    onClick, 
    isActive, 
    icon: Icon, 
    title 
  }: { 
    onClick: (e: React.MouseEvent) => void; 
    isActive?: boolean; 
    icon: React.ElementType; 
    title: string;
  }) => (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      }}
      title={title}
      className={cn(
        'p-2 rounded-md transition-colors',
        isActive 
          ? 'bg-blue-100 text-blue-700' 
          : 'hover:bg-gray-100 text-gray-600'
      )}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="flex items-center gap-1 px-2 py-2 border-b bg-gray-50">
        <ToolbarButton
          onClick={toggleBold}
          isActive={editor.isActive('bold')}
          icon={Bold}
          title="加粗"
        />
        <ToolbarButton
          onClick={toggleItalic}
          isActive={editor.isActive('italic')}
          icon={Italic}
          title="斜体"
        />
        <ToolbarButton
          onClick={toggleUnderline}
          isActive={editor.isActive('underline')}
          icon={UnderlineIcon}
          title="下划线"
        />
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <ToolbarButton
          onClick={toggleBulletList}
          isActive={editor.isActive('bulletList')}
          icon={List}
          title="无序列表"
        />
        <ToolbarButton
          onClick={toggleOrderedList}
          isActive={editor.isActive('orderedList')}
          icon={ListOrdered}
          title="有序列表"
        />
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <ToolbarButton
          onClick={setLink}
          isActive={editor.isActive('link')}
          icon={LinkIcon}
          title="插入链接"
        />
        
        <div className="flex-1" />
        
        <ToolbarButton
          onClick={undoAction}
          icon={Undo}
          title="撤销"
        />
        <ToolbarButton
          onClick={redoAction}
          icon={Redo}
          title="重做"
        />
      </div>

      <div className="relative">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
