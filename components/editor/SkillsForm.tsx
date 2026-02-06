'use client';

import React from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { createEmptySkill } from '@/lib/data';
import { GripVertical, Trash2 } from 'lucide-react';

const skillLevels = [
  { value: 'beginner', label: '入门' },
  { value: 'intermediate', label: '熟练' },
  { value: 'advanced', label: '精通' },
  { value: 'expert', label: '专家' },
];

export function SkillsForm() {
  const { data, addSkill, updateSkill, removeSkill } = useResumeStore();

  const handleAdd = () => {
    const newItem = createEmptySkill();
    addSkill(newItem);
  };

  return (
    <div className="space-y-4">
      {data.skills.map((item, index) => (
        <Card key={item.id} className="p-3">
          <div className="flex items-center gap-3">
            <GripVertical className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div className="flex-1 grid grid-cols-2 gap-3">
              <Input
                value={item.name}
                onChange={(e) => updateSkill(item.id, { name: e.target.value })}
                placeholder={`技能 ${index + 1}`}
              />
              <select
                value={item.level}
                onChange={(e) =>
                  updateSkill(item.id, {
                    level: e.target.value as typeof item.level,
                  })
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {skillLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeSkill(item.id)}
              className="flex-shrink-0"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </Card>
      ))}

      <Button onClick={handleAdd} variant="outline" className="w-full">
        + 添加技能
      </Button>
    </div>
  );
}
