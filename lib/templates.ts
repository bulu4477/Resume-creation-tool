import { TemplateConfig, TemplateId } from '@/types/resume';

export const templates: Record<TemplateId, TemplateConfig> = {
  modern: {
    id: 'modern',
    name: '现代风格',
    description: '简洁现代的设计，适合科技行业',
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
    fontFamily: 'Inter, system-ui, sans-serif',
    layout: 'modern',
  },
  classic: {
    id: 'classic',
    name: '经典风格',
    description: '传统正式的布局，适合传统行业',
    primaryColor: '#1f2937',
    secondaryColor: '#4b5563',
    fontFamily: 'Georgia, Times New Roman, serif',
    layout: 'classic',
  },
  minimal: {
    id: 'minimal',
    name: '极简风格',
    description: '极简主义设计，突出内容本身',
    primaryColor: '#000000',
    secondaryColor: '#666666',
    fontFamily: 'Helvetica, Arial, sans-serif',
    layout: 'minimal',
  },
  professional: {
    id: 'professional',
    name: '专业风格',
    description: '专业商务风格，适合管理岗位',
    primaryColor: '#0f172a',
    secondaryColor: '#475569',
    fontFamily: 'Segoe UI, Roboto, sans-serif',
    layout: 'classic',
  },
};

export const getTemplateById = (id: TemplateId): TemplateConfig => {
  return templates[id] || templates.modern;
};

export const getAllTemplates = (): TemplateConfig[] => {
  return Object.values(templates);
};
