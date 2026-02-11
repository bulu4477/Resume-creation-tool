export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  customSections: CustomSection[];
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  layout: 'classic' | 'modern' | 'minimal' | 'creative';
}

export type TemplateId = 'modern' | 'classic' | 'minimal' | 'professional';

export type SectionType = 'workExperience' | 'education' | 'skills' | 'projects' | `custom_${string}`;

export interface SectionConfig {
  id: SectionType;
  title: string;
  visible: boolean;
  order: number;
  isCustom?: boolean;
}

export interface ResumeSections {
  sections: SectionConfig[];
}

export interface PageSettings {
  sectionTitleSize: number;
  contentSize: number;
  sectionSpacing: number;
  lineHeight: number;
  pagePadding: number;
  fontFamily: string;
}

export const AVAILABLE_FONTS = [
  { value: 'Inter, system-ui, sans-serif', label: 'Inter (现代无衬线)' },
  { value: 'Georgia, Times New Roman, serif', label: 'Georgia (经典衬线)' },
  { value: 'Helvetica, Arial, sans-serif', label: 'Helvetica (简洁无衬线)' },
  { value: 'Segoe UI, Roboto, sans-serif', label: 'Segoe UI (系统默认)' },
  { value: '"Microsoft YaHei", "PingFang SC", sans-serif', label: '微软雅黑 (中文优化)' },
  { value: '"Noto Sans SC", "Source Han Sans SC", sans-serif', label: '思源黑体 (中文黑体)' },
  { value: '"Noto Serif SC", "Source Han Serif SC", serif', label: '思源宋体 (中文宋体)' },
  { value: '"Fira Code", "Monaco", monospace', label: 'Fira Code (等宽字体)' },
  { value: '"Playfair Display", Georgia, serif', label: 'Playfair (优雅衬线)' },
  { value: '"Open Sans", "Helvetica Neue", sans-serif', label: 'Open Sans (友好无衬线)' },
] as const;
