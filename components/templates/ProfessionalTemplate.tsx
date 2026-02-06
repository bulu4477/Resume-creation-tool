import React from 'react';
import { ResumeData, TemplateConfig, SectionType } from '@/types/resume';
import { formatDateRange } from '@/lib/utils';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { PaginatedTemplate } from './PaginatedTemplate';

interface TemplateProps {
  data: ResumeData;
  template: TemplateConfig;
  sectionOrder: SectionType[];
}

const sectionTitles: Record<SectionType, string> = {
  workExperience: '工作经历',
  education: '教育背景',
  skills: '专业技能',
  projects: '项目经历',
};

export function ProfessionalTemplate({ data, template, sectionOrder }: TemplateProps) {
  const { personalInfo, workExperience, education, skills, projects, customSections } = data;

  const renderHeader = () => (
    <header
      className="p-8 text-white -mx-[16mm] -mt-[16mm] mb-6"
      style={{ backgroundColor: template.primaryColor }}
    >
      <h1 className="text-4xl font-bold mb-3">{personalInfo.fullName || '姓名'}</h1>
      <p className="text-lg opacity-90 mb-4">{personalInfo.summary || '个人简介'}</p>

      <div className="flex flex-wrap gap-4 text-sm opacity-80">
        {personalInfo.email && (
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            <span>{personalInfo.email}</span>
          </div>
        )}
        {personalInfo.phone && (
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span>{personalInfo.phone}</span>
          </div>
        )}
        {personalInfo.location && (
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{personalInfo.location}</span>
          </div>
        )}
        {personalInfo.linkedin && (
          <div className="flex items-center gap-1">
            <Linkedin className="w-4 h-4" />
            <span>{personalInfo.linkedin}</span>
          </div>
        )}
      </div>
    </header>
  );

  const renderWorkExperience = () => (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-5 pb-2 border-b-2" style={{ color: template.primaryColor, borderColor: template.primaryColor }}>
        {sectionTitles.workExperience}
      </h2>
      {workExperience.length > 0 ? (
        workExperience.map((exp) => (
          <div key={exp.id} className="mb-6" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-lg" style={{ color: template.primaryColor }}>
                  {exp.position || '职位'}
                </h3>
                <p className="font-medium text-gray-700">{exp.company || '公司'}</p>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                {formatDateRange(exp.startDate, exp.endDate, exp.current)}
              </span>
            </div>
            <p className="text-gray-600 text-sm whitespace-pre-line">{exp.description}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-sm italic">暂无工作经历</p>
      )}
    </section>
  );

  const renderEducation = () => (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-5 pb-2 border-b-2" style={{ color: template.primaryColor, borderColor: template.primaryColor }}>
        {sectionTitles.education}
      </h2>
      {education.length > 0 ? (
        education.map((edu) => (
          <div key={edu.id} className="mb-4" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold" style={{ color: template.primaryColor }}>{edu.school || '学校'}</h3>
                <p className="text-gray-700">{edu.degree}{edu.field && ` - ${edu.field}`}</p>
                {edu.description && <p className="text-gray-600 text-sm mt-1">{edu.description}</p>}
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                {formatDateRange(edu.startDate, edu.endDate, edu.current)}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-sm italic">暂无教育背景</p>
      )}
    </section>
  );

  const renderSkills = () => (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: template.primaryColor, borderColor: template.primaryColor }}>
        {sectionTitles.skills}
      </h2>
      {skills.length > 0 ? (
        <div className="space-y-2">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-2">
              <span className="font-medium">{skill.name}</span>
              <span className="text-xs text-gray-500">({skill.level})</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm italic">暂无技能</p>
      )}
    </section>
  );

  const renderProjects = () => (
    <section>
      <h2 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: template.primaryColor, borderColor: template.primaryColor }}>
        {sectionTitles.projects}
      </h2>
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.id} className="mb-4" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <h3 className="font-semibold" style={{ color: template.primaryColor }}>{project.name || '项目名称'}</h3>
            <p className="text-sm text-gray-600 mb-1">{project.description}</p>
            <p className="text-xs text-gray-500">{project.technologies.join(' • ')}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-sm italic">暂无项目经历</p>
      )}
    </section>
  );

  const renderCustomSection = (sectionId: string) => {
    const customSection = customSections.find((s) => s.id === sectionId);
    if (!customSection) return null;

    return (
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-5 pb-2 border-b-2" style={{ color: template.primaryColor, borderColor: template.primaryColor }}>
          {customSection.title}
        </h2>
        {customSection.content ? (
          <p className="text-gray-600 text-sm whitespace-pre-line">{customSection.content}</p>
        ) : (
          <p className="text-gray-400 text-sm italic">暂无内容</p>
        )}
      </section>
    );
  };

  const renderSection = (sectionId: SectionType): React.ReactElement | null => {
    if (sectionId.startsWith('custom_')) {
      return renderCustomSection(sectionId);
    }

    switch (sectionId) {
      case 'workExperience':
        return renderWorkExperience();
      case 'education':
        return renderEducation();
      case 'skills':
        return renderSkills();
      case 'projects':
        return renderProjects();
      default:
        return null;
    }
  };

  const sections = sectionOrder.map((sectionId) => renderSection(sectionId)).filter(Boolean) as React.ReactElement[];

  return (
    <PaginatedTemplate header={renderHeader()}>
      {sections}
    </PaginatedTemplate>
  );
}
