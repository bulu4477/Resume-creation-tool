'use client';

import React from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { getAllTemplates } from '@/lib/templates';
import { TemplateId } from '@/types/resume';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export function TemplateSelector() {
  const { currentTemplate, setTemplate } = useResumeStore();
  const templates = getAllTemplates();

  return (
    <div className="grid grid-cols-2 gap-4">
      {templates.map((template) => (
        <Card
          key={template.id}
          className={cn(
            'p-4 cursor-pointer transition-all hover:shadow-md',
            currentTemplate === template.id
              ? 'ring-2 ring-primary border-primary'
              : 'hover:border-gray-300'
          )}
          onClick={() => setTemplate(template.id as TemplateId)}
        >
          <div className="space-y-2">
            <div
              className="h-20 rounded-md flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: template.primaryColor }}
            >
              {template.name[0]}
            </div>
            <div>
              <h4 className="font-medium">{template.name}</h4>
              <p className="text-xs text-gray-500">{template.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
