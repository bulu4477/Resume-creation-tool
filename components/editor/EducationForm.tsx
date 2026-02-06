'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { createEmptyEducation } from '@/lib/data';
import { GripVertical, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { formatDateRange } from '@/lib/utils';

export function EducationForm() {
  const { data, addEducation, updateEducation, removeEducation } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    const newItem = createEmptyEducation();
    addEducation(newItem);
    setExpandedId(newItem.id);
  };

  return (
    <div className="space-y-4">
      {data.education.map((item, index) => (
        <Card key={item.id} className="p-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
          >
            <div className="flex items-center gap-2">
              <GripVertical className="w-5 h-5 text-gray-400" />
              <div>
                <h4 className="font-medium">
                  {item.school || `教育经历 ${index + 1}`}
                </h4>
                <p className="text-sm text-gray-500">
                  {item.degree} {item.field && `- ${item.field}`}
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
                <ChevronDown className="w-5 h-5" />
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeEducation(item.id);
                }}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>

          {expandedId === item.id && (
            <div className="mt-4 space-y-4 pt-4 border-t">
              <div className="space-y-2">
                <Label>学校名称</Label>
                <Input
                  value={item.school}
                  onChange={(e) =>
                    updateEducation(item.id, { school: e.target.value })
                  }
                  placeholder="学校名称"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>学位</Label>
                  <Input
                    value={item.degree}
                    onChange={(e) =>
                      updateEducation(item.id, { degree: e.target.value })
                    }
                    placeholder="本科/硕士/博士"
                  />
                </div>
                <div className="space-y-2">
                  <Label>专业</Label>
                  <Input
                    value={item.field}
                    onChange={(e) =>
                      updateEducation(item.id, { field: e.target.value })
                    }
                    placeholder="专业名称"
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
                      updateEducation(item.id, { startDate: e.target.value })
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
                        updateEducation(item.id, { endDate: e.target.value })
                      }
                      disabled={item.current}
                    />
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <Checkbox
                        checked={item.current}
                        onCheckedChange={(checked) =>
                          updateEducation(item.id, { current: checked })
                        }
                      />
                      <Label className="text-sm">在读</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>描述（可选）</Label>
                <Textarea
                  value={item.description}
                  onChange={(e) =>
                    updateEducation(item.id, { description: e.target.value })
                  }
                  placeholder="描述你的学习经历、成绩、获奖情况等..."
                  rows={3}
                />
              </div>
            </div>
          )}
        </Card>
      ))}

      <Button onClick={handleAdd} variant="outline" className="w-full">
        + 添加教育经历
      </Button>
    </div>
  );
}
