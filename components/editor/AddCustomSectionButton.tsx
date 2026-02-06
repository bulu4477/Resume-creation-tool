'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Plus, X } from 'lucide-react';

export function AddCustomSectionButton() {
  const { addCustomSection } = useResumeStore();
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = () => {
    if (title.trim()) {
      addCustomSection(title.trim(), content.trim());
      setTitle('');
      setContent('');
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setTitle('');
    setContent('');
  };

  if (isCreating) {
    return (
      <div className="border rounded-lg p-4 bg-blue-50 border-blue-200 mb-3">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-blue-800">添加自定义模块</h4>
          <button
            onClick={handleCancel}
            className="p-1 hover:bg-blue-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-blue-600" />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <Label className="text-sm text-blue-700">模块标题 *</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例如：获奖经历、兴趣爱好、语言能力..."
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm text-blue-700">模块内容</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="输入模块内容，支持多行文本..."
              rows={3}
              className="mt-1"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleCreate} size="sm" className="flex-1">
              创建
            </Button>
            <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1">
              取消
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Button
      onClick={() => setIsCreating(true)}
      variant="outline"
      className="w-full mb-3 border-dashed border-2 hover:border-blue-400 hover:bg-blue-50"
    >
      <Plus className="w-4 h-4 mr-2" />
      添加自定义模块
    </Button>
  );
}
