'use client';

import dynamic from 'next/dynamic';
import React from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const RichTextEditorInner = dynamic(
  () => import('./RichTextEditor').then((mod) => mod.RichTextEditor),
  {
    ssr: false,
    loading: () => (
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
    ),
  }
);

export default function RichTextEditorWrapper(props: RichTextEditorProps) {
  return <RichTextEditorInner {...props} />;
}
