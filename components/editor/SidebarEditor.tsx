'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { SectionConfig, SectionType } from '@/types/resume';
import { PersonalInfoForm } from './PersonalInfoForm';
import { WorkExperienceForm } from './WorkExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { ProjectsForm } from './ProjectsForm';
import { CustomSectionForm } from './CustomSectionForm';
import { AddCustomSectionButton } from './AddCustomSectionButton';
import { ActionButtons } from './ActionButtons';
import { TemplateSelector } from './TemplateSelector';
import { GripVertical, Eye, EyeOff, ChevronDown, User, Briefcase, GraduationCap, Wrench, FolderOpen, Palette, FileText, CheckCircle2, Cloud } from 'lucide-react';
import { cn } from '@/lib/utils';

const sectionIcons: Record<string, React.ReactNode> = {
  personal: <User className="w-5 h-5" />,
  template: <Palette className="w-5 h-5" />,
  workExperience: <Briefcase className="w-5 h-5" />,
  education: <GraduationCap className="w-5 h-5" />,
  skills: <Wrench className="w-5 h-5" />,
  projects: <FolderOpen className="w-5 h-5" />,
  customSection: <FileText className="w-5 h-5" />,
};

const sectionTitles: Record<string, string> = {
  personal: '个人信息',
  template: '选择模板',
  workExperience: '工作经历',
  education: '教育背景',
  skills: '技能',
  projects: '项目经历',
};

type SectionId = SectionType | 'personal' | 'template';

interface SectionItemProps {
  id: SectionId;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  onDragStart?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragEnd?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onMouseLeave?: () => void;
  isDragging?: boolean;
  isDragged?: boolean;
  isDraggable?: boolean;
  isVisible?: boolean;
  onToggleVisibility?: (e: React.MouseEvent) => void;
  isCustom?: boolean;
}

function SectionItem({
  id,
  title,
  isOpen,
  onToggle,
  onDragStart,
  onDragOver,
  onDragEnd,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  isDragging,
  isDragged,
  isDraggable,
  isVisible = true,
  onToggleVisibility,
  isCustom = false,
}: SectionItemProps) {
  const getIcon = () => {
    if (isCustom) return sectionIcons.customSection;
    return sectionIcons[id as string] || sectionIcons.customSection;
  };

  const renderForm = () => {
    if (id === 'template') return <TemplateSelector />;
    if (id === 'personal') return <PersonalInfoForm />;
    if (id === 'workExperience') return <WorkExperienceForm />;
    if (id === 'education') return <EducationForm />;
    if (id === 'skills') return <SkillsForm />;
    if (id === 'projects') return <ProjectsForm />;
    if (isCustom && typeof id === 'string' && id.startsWith('custom_')) {
      return <CustomSectionForm sectionId={id} />;
    }
    return null;
  };

  return (
    <div
      draggable={isDragging && isDraggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      className={cn(
        'border rounded-lg overflow-hidden transition-all duration-200',
        isOpen ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-300',
        isDragged && 'opacity-50',
        !isVisible && 'opacity-50'
      )}
    >
      <div
        onClick={onToggle}
        className={cn(
          'flex items-center gap-3 p-4 cursor-pointer select-none transition-colors',
          isOpen ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
        )}
      >
        {isDraggable && (
          <div className="flex-shrink-0 text-gray-400" title="长按拖拽排序">
            <GripVertical className="w-4 h-4" />
          </div>
        )}
        
        <div className={cn(
          'flex-shrink-0',
          isOpen ? 'text-blue-600' : 'text-gray-500'
        )}>
          {getIcon()}
        </div>
        
        <span className={cn(
          'flex-1 font-medium text-base',
          isOpen ? 'text-blue-700' : 'text-gray-700'
        )}>
          {title}
        </span>

        {isDraggable && onToggleVisibility && (
          <button
            onClick={onToggleVisibility}
            className="p-1.5 rounded-full hover:bg-gray-200 transition-colors flex-shrink-0"
          >
            {isVisible ? (
              <Eye className="w-4 h-4 text-green-600" />
            ) : (
              <EyeOff className="w-4 h-4 text-gray-400" />
            )}
          </button>
        )}

        <ChevronDown 
          className={cn(
            'w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0',
            isOpen && 'rotate-180'
          )} 
        />
      </div>

      {isOpen && (
        <div className="p-4 bg-white border-t border-gray-100">
          {renderForm()}
        </div>
      )}
    </div>
  );
}

function AutoSaveIndicator() {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const { data, sections } = useResumeStore();

  useEffect(() => {
    const now = new Date();
    setLastSaved(now);
    setShowSaved(true);
    
    const timer = setTimeout(() => {
      setShowSaved(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [data, sections]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="flex items-center justify-center gap-2 py-2 px-4 bg-gray-50 border-t text-xs text-gray-500">
      {showSaved ? (
        <>
          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
          <span className="text-green-600">已自动保存</span>
        </>
      ) : (
        <>
          <Cloud className="w-3.5 h-3.5" />
          <span>数据自动保存在本地</span>
          {lastSaved && (
            <span className="text-gray-400">· 上次保存 {formatTime(lastSaved)}</span>
          )}
        </>
      )}
    </div>
  );
}

export function SidebarEditor() {
  const { sections, reorderSections, toggleSectionVisibility } = useResumeStore();
  const [openSection, setOpenSection] = useState<SectionId>('personal');
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  const handleToggle = (id: SectionId) => {
    if (isDragging) return;
    setOpenSection(openSection === id ? ('' as SectionId) : id);
  };

  const handleMouseDown = useCallback((sectionId: string) => {
    const timer = setTimeout(() => {
      setIsDragging(true);
      setDraggedItem(sectionId);
    }, 500);
    setLongPressTimer(timer);
  }, []);

  const handleMouseUp = useCallback(() => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    setTimeout(() => setIsDragging(false), 100);
  }, [longPressTimer]);

  const handleMouseLeave = useCallback(() => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  }, [longPressTimer]);

  const handleDragStart = (sectionId: string) => {
    setDraggedItem(sectionId);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = sortedSections.findIndex((s) => s.id === draggedItem);
    const targetIndex = sortedSections.findIndex((s) => s.id === targetId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;
    
    reorderSections(draggedIndex, targetIndex);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setIsDragging(false);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-5 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white flex-shrink-0">
        <h1 className="text-xl font-bold">简历编辑器</h1>
        <p className="text-xs text-blue-100 mt-1">点击展开编辑，长按模块可拖拽排序</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <SectionItem
          id="template"
          title="选择模板"
          isOpen={openSection === 'template'}
          onToggle={() => handleToggle('template')}
        />

        <SectionItem
          id="personal"
          title="个人信息"
          isOpen={openSection === 'personal'}
          onToggle={() => handleToggle('personal')}
        />

        {sortedSections.map((section) => (
          <SectionItem
            key={section.id}
            id={section.id as SectionId}
            title={section.title}
            isOpen={openSection === section.id}
            onToggle={() => handleToggle(section.id as SectionId)}
            onDragStart={() => handleDragStart(section.id)}
            onDragOver={(e) => handleDragOver(e, section.id)}
            onDragEnd={handleDragEnd}
            onMouseDown={() => handleMouseDown(section.id)}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            isDragging={isDragging}
            isDragged={draggedItem === section.id}
            isDraggable={true}
            isVisible={section.visible}
            onToggleVisibility={(e) => {
              e.stopPropagation();
              toggleSectionVisibility(section.id as SectionType);
            }}
            isCustom={section.isCustom}
          />
        ))}

        <AddCustomSectionButton />
        
        <div className="mt-6">
          <ActionButtons />
        </div>
      </div>

      <AutoSaveIndicator />
    </div>
  );
}
