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
