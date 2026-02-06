'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Trash2 } from 'lucide-react';

interface CustomSectionFormProps {
  sectionId: string;
}

export function CustomSectionForm({ sectionId }: CustomSectionFormProps) {
  const { data, updateCustomSection, removeCustomSection } = useResumeStore();
  const customSection = data.customSections.find((s) => s.id === sectionId);

  const [title, setTitle] = useState(customSection?.title || '');
  const [content, setContent] = useState(customSection?.content || '');

  if (!customSection) {
    return <div className="text-gray-500">模块不存在</div>;
  }

  const handleUpdate = () => {
    updateCustomSection(sectionId, title.trim(), content.trim());
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>模块标题</Label>
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            handleUpdate();
          }}
          placeholder="输入模块标题"
        />
      </div>
      <div>
        <Label>模块内容</Label>
        <Textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            handleUpdate();
          }}
          placeholder="输入模块内容，支持多行文本..."
          rows={6}
        />
      </div>
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => removeCustomSection(sectionId)}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          删除此模块
        </Button>
      </div>
    </div>
  );
}
