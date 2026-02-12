'use client';

import React from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { SectionType } from '@/types/resume';
import { Eye, EyeOff, ChevronUp, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function SectionOrderEditor() {
  const { sections, reorderSections, toggleSectionVisibility } = useResumeStore();

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

  return (
    <div className="space-y-2">
      {sections.map((section, index) => (
        <Card
          key={section.id}
          className="p-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleMoveDown(index)}
                  disabled={index === sections.length - 1}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>
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
            </div>
          </div>
        </Card>
      ))}
      
      <p className="text-xs text-gray-500 mt-4">
        使用上下箭头调整模块顺序。点击眼睛图标可隐藏/显示模块。
      </p>
    </div>
  );
}
