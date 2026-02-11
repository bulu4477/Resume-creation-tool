'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Plus, Trash2, Edit2, Check, X, ChevronUp, ChevronDown } from 'lucide-react';

export function CustomSectionsForm() {
  const { data, addCustomSection, updateCustomSection, removeCustomSection, reorderCustomSections } = useResumeStore();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const handleCreate = () => {
    if (newTitle.trim()) {
      addCustomSection(newTitle.trim(), newContent.trim());
      setNewTitle('');
      setNewContent('');
      setIsCreating(false);
    }
  };

  const handleUpdate = (id: string) => {
    if (editTitle.trim()) {
      updateCustomSection(id, editTitle.trim(), editContent.trim());
      setEditingId(null);
    }
  };

  const startEditing = (id: string, title: string, content: string) => {
    setEditingId(id);
    setEditTitle(title);
    setEditContent(content);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
  };

  const cancelCreating = () => {
    setIsCreating(false);
    setNewTitle('');
    setNewContent('');
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      reorderCustomSections(index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < data.customSections.length - 1) {
      reorderCustomSections(index, index + 1);
    }
  };

  return (
    <div className="space-y-4">
      {data.customSections.map((section, index) => (
        <div key={section.id} className="border rounded-lg p-4 bg-gray-50">
          {editingId === section.id ? (
            <div className="space-y-3">
              <div>
                <Label>模块标题</Label>
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="输入模块标题"
                />
              </div>
              <div>
                <Label>模块内容</Label>
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="输入模块内容"
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleUpdate(section.id)} size="sm">
                  <Check className="w-4 h-4 mr-1" />
                  保存
                </Button>
                <Button onClick={cancelEditing} variant="outline" size="sm">
                  <X className="w-4 h-4 mr-1" />
                  取消
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === data.customSections.length - 1}
                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{section.title}</h4>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEditing(section.id, section.title, section.content)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCustomSection(section.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 text-sm whitespace-pre-line mt-2">{section.content || '暂无内容'}</p>
            </div>
          )}
        </div>
      ))}

      {isCreating ? (
        <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
          <div className="space-y-3">
            <div>
              <Label>模块标题 *</Label>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="例如：获奖经历、兴趣爱好，语言能力..."
              />
            </div>
            <div>
              <Label>模块内容</Label>
              <Textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="输入模块内容，支持多行文本..."
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreate} size="sm">
                <Check className="w-4 h-4 mr-1" />
                创建
              </Button>
              <Button onClick={cancelCreating} variant="outline" size="sm">
                <X className="w-4 h-4 mr-1" />
                取消
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsCreating(true)}
          variant="outline"
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加自定义模块
        </Button>
      )}
    </div>
  );
}
