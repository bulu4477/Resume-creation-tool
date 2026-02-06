'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import RichTextEditor from './RichTextEditorWrapper';
import { createEmptyProject } from '@/lib/data';
import { GripVertical, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export function ProjectsForm() {
  const { data, addProject, updateProject, removeProject } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleAdd = () => {
    const newItem = createEmptyProject();
    addProject(newItem);
    setExpandedId(newItem.id);
  };

  return (
    <div className="space-y-4">
      {data.projects.map((item, index) => (
        <Card key={item.id} className="p-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
          >
            <div className="flex items-center gap-2">
              <GripVertical className="w-5 h-5 text-gray-400" />
              <div>
                <h4 className="font-medium">
                  {item.name || `项目 ${index + 1}`}
                </h4>
                {item.technologies.length > 0 && (
                  <p className="text-sm text-gray-500">
                    {item.technologies.join(', ')}
                  </p>
                )}
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
                  removeProject(item.id);
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
              <div className="space-y-2">
                <Label>项目名称</Label>
                <Input
                  value={item.name}
                  onChange={(e) =>
                    updateProject(item.id, { name: e.target.value })
                  }
                  placeholder="项目名称"
                />
              </div>

              <div className="space-y-2">
                <Label>项目链接</Label>
                <Input
                  value={item.link}
                  onChange={(e) =>
                    updateProject(item.id, { link: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label>技术栈（用逗号分隔）</Label>
                <Input
                  value={item.technologies.join(', ')}
                  onChange={(e) =>
                    updateProject(item.id, {
                      technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="React, TypeScript, Node.js"
                />
              </div>

              <div className="space-y-2">
                <Label>项目描述</Label>
                <RichTextEditor
                  content={item.description}
                  onChange={(html) =>
                    updateProject(item.id, { description: html })
                  }
                  placeholder="描述项目背景、你的职责和取得的成果..."
                />
              </div>
            </div>
          )}
        </Card>
      ))}

      <Button onClick={handleAdd} variant="outline" className="w-full">
        + 添加项目经历
      </Button>
    </div>
  );
}
