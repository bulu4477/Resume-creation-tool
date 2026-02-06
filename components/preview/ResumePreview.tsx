'use client';

import React from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { getTemplateById } from '@/lib/templates';
import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { ClassicTemplate } from '@/components/templates/ClassicTemplate';
import { MinimalTemplate } from '@/components/templates/MinimalTemplate';
import { ProfessionalTemplate } from '@/components/templates/ProfessionalTemplate';
import { SectionType } from '@/types/resume';

interface ResumePreviewProps {
  targetRef?: React.RefObject<HTMLDivElement>;
}

export function ResumePreview({ targetRef }: ResumePreviewProps) {
  const { data, currentTemplate, sections } = useResumeStore();
  const template = getTemplateById(currentTemplate);

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);
  const visibleSections = sortedSections.filter((s) => s.visible);
  const sectionOrder = visibleSections.map((s) => s.id as SectionType);

  const renderTemplate = () => {
    const templateProps = {
      data,
      template,
      sectionOrder,
    };

    switch (currentTemplate) {
      case 'modern':
        return <ModernTemplate {...templateProps} />;
      case 'classic':
        return <ClassicTemplate {...templateProps} />;
      case 'minimal':
        return <MinimalTemplate {...templateProps} />;
      case 'professional':
        return <ProfessionalTemplate {...templateProps} />;
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };

  return (
    <div className="bg-gray-100 p-8 min-h-screen flex justify-center overflow-y-auto">
      <div
        ref={targetRef}
        style={{
          fontFamily: template.fontFamily,
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
}
