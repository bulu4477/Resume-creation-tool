import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, TemplateId, SectionConfig, SectionType, CustomSection, PageSettings } from '@/types/resume';
import { defaultResumeData, sampleResumeData } from '@/lib/data';
import { v4 as uuidv4 } from 'uuid';

const defaultSections: SectionConfig[] = [
  { id: 'workExperience', title: '工作经历', visible: true, order: 1 },
  { id: 'education', title: '教育背景', visible: true, order: 2 },
  { id: 'skills', title: '技能', visible: true, order: 3 },
  { id: 'projects', title: '项目经历', visible: true, order: 4 },
];

const defaultPageSettings: PageSettings = {
  sectionTitleSize: 20,
  contentSize: 14,
  sectionSpacing: 24,
  lineHeight: 1.6,
  pagePadding: 16,
  fontFamily: 'Inter, system-ui, sans-serif',
};

interface ResumeStore {
  data: ResumeData;
  currentTemplate: TemplateId;
  sections: SectionConfig[];
  pageSettings: PageSettings;
  
  setData: (data: ResumeData) => void;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  
  addWorkExperience: (item: ResumeData['workExperience'][0]) => void;
  updateWorkExperience: (id: string, item: Partial<ResumeData['workExperience'][0]>) => void;
  removeWorkExperience: (id: string) => void;
  reorderWorkExperience: (startIndex: number, endIndex: number) => void;
  
  addEducation: (item: ResumeData['education'][0]) => void;
  updateEducation: (id: string, item: Partial<ResumeData['education'][0]>) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (startIndex: number, endIndex: number) => void;
  
  addSkill: (item: ResumeData['skills'][0]) => void;
  updateSkill: (id: string, item: Partial<ResumeData['skills'][0]>) => void;
  removeSkill: (id: string) => void;
  reorderSkills: (startIndex: number, endIndex: number) => void;
  
  addProject: (item: ResumeData['projects'][0]) => void;
  updateProject: (id: string, item: Partial<ResumeData['projects'][0]>) => void;
  removeProject: (id: string) => void;
  reorderProjects: (startIndex: number, endIndex: number) => void;
  
  addCustomSection: (title: string, content: string) => string;
  updateCustomSection: (id: string, title: string, content: string) => void;
  removeCustomSection: (id: string) => void;
  
  setTemplate: (template: TemplateId) => void;
  resetData: () => void;
  loadSampleData: () => void;
  clearAllData: () => void;
  
  reorderSections: (startIndex: number, endIndex: number) => void;
  toggleSectionVisibility: (sectionId: SectionType) => void;
  updateSectionOrder: (sections: SectionConfig[]) => void;
  
  updatePageSettings: (settings: Partial<PageSettings>) => void;
  resetPageSettings: () => void;
}

const STORAGE_VERSION = 1;

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: defaultResumeData,
      currentTemplate: 'modern' as TemplateId,
      sections: defaultSections,
      pageSettings: defaultPageSettings,
      
      setData: (data) => set({ data }),
      
      updatePersonalInfo: (info) =>
        set((state) => ({
          data: {
            ...state.data,
            personalInfo: { ...state.data.personalInfo, ...info },
          },
        })),
      
      addWorkExperience: (item) =>
        set((state) => ({
          data: {
            ...state.data,
            workExperience: [...state.data.workExperience, item],
          },
        })),
      
      updateWorkExperience: (id, item) =>
        set((state) => ({
          data: {
            ...state.data,
            workExperience: state.data.workExperience.map((exp) =>
              exp.id === id ? { ...exp, ...item } : exp
            ),
          },
        })),
      
      removeWorkExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            workExperience: state.data.workExperience.filter((exp) => exp.id !== id),
          },
        })),
      
      reorderWorkExperience: (startIndex, endIndex) =>
        set((state) => {
          const items = [...state.data.workExperience];
          const [removed] = items.splice(startIndex, 1);
          items.splice(endIndex, 0, removed);
          return {
            data: { ...state.data, workExperience: items },
          };
        }),
      
      addEducation: (item) =>
        set((state) => ({
          data: {
            ...state.data,
            education: [...state.data.education, item],
          },
        })),
      
      updateEducation: (id, item) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((edu) =>
              edu.id === id ? { ...edu, ...item } : edu
            ),
          },
        })),
      
      removeEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((edu) => edu.id !== id),
          },
        })),
      
      reorderEducation: (startIndex, endIndex) =>
        set((state) => {
          const items = [...state.data.education];
          const [removed] = items.splice(startIndex, 1);
          items.splice(endIndex, 0, removed);
          return {
            data: { ...state.data, education: items },
          };
        }),
      
      addSkill: (item) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: [...state.data.skills, item],
          },
        })),
      
      updateSkill: (id, item) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.map((skill) =>
              skill.id === id ? { ...skill, ...item } : skill
            ),
          },
        })),
      
      removeSkill: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.filter((skill) => skill.id !== id),
          },
        })),
      
      reorderSkills: (startIndex, endIndex) =>
        set((state) => {
          const items = [...state.data.skills];
          const [removed] = items.splice(startIndex, 1);
          items.splice(endIndex, 0, removed);
          return {
            data: { ...state.data, skills: items },
          };
        }),
      
      addProject: (item) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: [...state.data.projects, item],
          },
        })),
      
      updateProject: (id, item) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((project) =>
              project.id === id ? { ...project, ...item } : project
            ),
          },
        })),
      
      removeProject: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.filter((project) => project.id !== id),
          },
        })),
      
      reorderProjects: (startIndex, endIndex) =>
        set((state) => {
          const items = [...state.data.projects];
          const [removed] = items.splice(startIndex, 1);
          items.splice(endIndex, 0, removed);
          return {
            data: { ...state.data, projects: items },
          };
        }),
      
      addCustomSection: (title, content) => {
        const id = `custom_${uuidv4()}`;
        const sectionId = id as SectionType;
        
        set((state) => {
          const newSection: SectionConfig = {
            id: sectionId,
            title,
            visible: true,
            order: state.sections.length + 1,
            isCustom: true,
          };
          
          const newCustomSection: CustomSection = {
            id,
            title,
            content,
          };
          
          return {
            data: {
              ...state.data,
              customSections: [...state.data.customSections, newCustomSection],
            },
            sections: [...state.sections, newSection],
          };
        });
        
        return id;
      },
      
      updateCustomSection: (id, title, content) =>
        set((state) => {
          const sectionId = id as SectionType;
          return {
            data: {
              ...state.data,
              customSections: state.data.customSections.map((section) =>
                section.id === id ? { ...section, title, content } : section
              ),
            },
            sections: state.sections.map((section) =>
              section.id === sectionId ? { ...section, title } : section
            ),
          };
        }),
      
      removeCustomSection: (id) =>
        set((state) => {
          const sectionId = id as SectionType;
          return {
            data: {
              ...state.data,
              customSections: state.data.customSections.filter((section) => section.id !== id),
            },
            sections: state.sections.filter((section) => section.id !== sectionId),
          };
        }),
      
      setTemplate: (template) => set({ currentTemplate: template }),
      resetData: () => set({ data: defaultResumeData, sections: defaultSections }),
      loadSampleData: () => set({ data: sampleResumeData, sections: defaultSections }),
      clearAllData: () => {
        set({ data: defaultResumeData, sections: defaultSections });
        localStorage.removeItem('resume-storage');
      },
      
      reorderSections: (startIndex, endIndex) =>
        set((state) => {
          const items = [...state.sections];
          const [removed] = items.splice(startIndex, 1);
          items.splice(endIndex, 0, removed);
          const updatedSections = items.map((section, index) => ({
            ...section,
            order: index + 1,
          }));
          return { sections: updatedSections };
        }),
      
      toggleSectionVisibility: (sectionId) =>
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === sectionId
              ? { ...section, visible: !section.visible }
              : section
          ),
        })),
      
      updateSectionOrder: (sections) => set({ sections }),
      
      updatePageSettings: (settings) =>
        set((state) => ({
          pageSettings: { ...state.pageSettings, ...settings },
        })),
      
      resetPageSettings: () => set({ pageSettings: defaultPageSettings }),
    }),
    {
      name: 'resume-storage',
      version: STORAGE_VERSION,
      partialize: (state) => ({
        data: state.data,
        currentTemplate: state.currentTemplate,
        sections: state.sections,
        pageSettings: state.pageSettings,
      }),
      migrate: (persistedState: any, version) => {
        if (version !== STORAGE_VERSION) {
          return {
            data: persistedState.data || defaultResumeData,
            currentTemplate: persistedState.currentTemplate || 'modern',
            sections: persistedState.sections || defaultSections,
            pageSettings: persistedState.pageSettings || defaultPageSettings,
          } as any;
        }
        return persistedState;
      },
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error('Failed to load resume data from storage:', error);
          } else if (state) {
            console.log('Resume data loaded successfully');
          }
        };
      },
    }
  )
);
