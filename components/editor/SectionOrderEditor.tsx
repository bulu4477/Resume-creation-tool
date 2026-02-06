'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { SectionConfig, SectionType } from '@/types/resume';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function SectionOrderEditor() {
  const { sections, reorderSections, toggleSectionVisibility } = useResumeStore();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    reorderSections(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      reorderSections(index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < sections.length - 1) {
      reorderSections(index, index + 1);
    }
  };

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-2">
      {sortedSections.map((section, index) => (
        <Card
          key={section.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className={`p-3 cursor-move transition-all ${
            draggedIndex === index ? 'opacity-50' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GripVertical className="w-5 h-5 text-gray-400" />
              <span className="font-medium">{section.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSectionVisibility(section.id as SectionType)}
              >
                {section.visible ? (
                  <Eye className="w-4 h-4 text-green-600" />
                ) : (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                )}
              </Button>
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === sortedSections.length - 1}
                >
                  ↓
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
      
      <p className="text-xs text-gray-500 mt-4">
        拖拽卡片或使用箭头调整模块顺序。点击眼睛图标可隐藏/显示模块。
      </p>
    </div>
  );
}
