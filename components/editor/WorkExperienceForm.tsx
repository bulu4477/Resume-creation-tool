'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import RichTextEditor from './RichTextEditorWrapper';
import { createEmptyWorkExperience } from '@/lib/data';
import { ChevronUp, ChevronDown, Trash2, ChevronDown as ChevronDownIcon } from 'lucide-react';
import { formatDateRange } from '@/lib/utils';

export function WorkExperienceForm() {
  const { data, addWorkExperience, updateWorkExperience, removeWorkExperience, reorderWorkExperience } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    const newItem = createEmptyWorkExperience();
    addWorkExperience(newItem);
    setExpandedId(newItem.id);
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      reorderWorkExperience(index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < data.workExperience.length - 1) {
      reorderWorkExperience(index, index + 1);
    }
  };

  return (
    <div className="space-y-4">
      {data.workExperience.map((item, index) => (
        <Card 
          key={item.id} 
          className="p-4"
          draggable={false}
        >
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
          >
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoveUp(index);
                  }}
                  disabled={index === 0}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoveDown(index);
                  }}
                  disabled={index === data.workExperience.length - 1}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div>
                <h4 className="font-medium">
                  {item.position || `工作经历 ${index + 1}`}
                </h4>
                <p className="text-sm text-gray-500">
                  {item.company}
                  {item.startDate && (
                    <span className="ml-2">
                      ({formatDateRange(item.startDate, item.endDate, item.current)})
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {expandedId === item.id ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDownIcon className="w-5 h-5" />
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeWorkExperience(item.id);
                }}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>

          {expandedId === item.id && (
            <div 
              className="mt-4 space-y-4 pt-4 border-t"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>公司名称</Label>
                  <Input
                    value={item.company}
                    onChange={(e) =>
                      updateWorkExperience(item.id, { company: e.target.value })
                    }
                    placeholder="公司名称"
                  />
                </div>
                <div className="space-y-2">
                  <Label>职位</Label>
                  <Input
                    value={item.position}
                    onChange={(e) =>
                      updateWorkExperience(item.id, { position: e.target.value })
                    }
                    placeholder="职位名称"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>开始时间</Label>
                  <Input
                    type="month"
                    value={item.startDate}
                    onChange={(e) =>
                      updateWorkExperience(item.id, { startDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>结束时间</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="month"
                      value={item.endDate}
                      onChange={(e) =>
                        updateWorkExperience(item.id, { endDate: e.target.value })
                      }
                      disabled={item.current}
                    />
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <Checkbox
                        checked={item.current}
                        onCheckedChange={(checked) =>
                          updateWorkExperience(item.id, { current: checked as boolean })
                        }
                      />
                      <Label className="text-sm">至今</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>工作描述</Label>
                <RichTextEditor
                  content={item.description}
                  onChange={(html) =>
                    updateWorkExperience(item.id, { description: html })
                  }
                  placeholder="描述你的工作职责和成就..."
                />
              </div>
            </div>
          )}
        </Card>
      ))}

      <Button onClick={handleAdd} variant="outline" className="w-full">
        + 添加工作经历
      </Button>
    </div>
  );
}
