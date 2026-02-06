import React from 'react';
import { ResumeData, TemplateConfig, SectionType } from '@/types/resume';
import { formatDateRange } from '@/lib/utils';
import { PaginatedTemplate } from './PaginatedTemplate';

interface TemplateProps {
  data: ResumeData;
  template: TemplateConfig;
  sectionOrder: SectionType[];
}

const sectionTitles: Record<SectionType, string> = {
  workExperience: '工作经历',
  education: '教育',
  skills: '技能',
  projects: '项目',
};

export function MinimalTemplate({ data, template, sectionOrder }: TemplateProps) {
  const { personalInfo, workExperience, education, skills, projects, customSections } = data;

  const renderHeader = () => (
    <header className="mb-10">
      <h1 className="text-5xl font-light mb-4 tracking-tight" style={{ color: template.primaryColor }}>
        {personalInfo.fullName || '姓名'}
      </h1>
      <div className="flex flex-wrap gap-6 text-sm text-gray-500">
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span>{personalInfo.phone}</span>}
        {personalInfo.location && <span>{personalInfo.location}</span>}
        {personalInfo.website && <span>{personalInfo.website}</span>}
        {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        {personalInfo.github && <span>{personalInfo.github}</span>}
      </div>
    </header>
  );

  const renderSummary = () =>
    personalInfo.summary && (
      <section className="mb-8">
        <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
      </section>
    );

  const renderSkills = () => (
    <section className="mb-8">
      <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: template.primaryColor }}>
        {sectionTitles.skills}
      </h2>
      {skills.length > 0 ? (
        <div className="space-y-2">
          {skills.map((skill) => (
            <div key={skill.id} className="text-sm">
              <span className="font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm italic">暂无技能</p>
      )}
    </section>
  );

  const renderEducation = () => (
    <section className="mb-8">
      <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: template.primaryColor }}>
        {sectionTitles.education}
      </h2>
      {education.length > 0 ? (
        education.map((edu) => (
          <div key={edu.id} className="mb-3 text-sm" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <p className="font-medium">{edu.school || '学校'}</p>
            <p className="text-gray-600">{edu.degree}</p>
            <p className="text-gray-400 text-xs mt-1">
              {formatDateRange(edu.startDate, edu.endDate, edu.current)}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-sm italic">暂无教育背景</p>
      )}
    </section>
  );

  const renderWorkExperience = () => (
    <section className="mb-8">
      <h2 className="text-sm font-semibold uppercase tracking-widest mb-6 pb-2 border-b" style={{ color: template.primaryColor, borderColor: template.secondaryColor }}>
        {sectionTitles.workExperience}
      </h2>
      {workExperience.length > 0 ? (
        workExperience.map((exp) => (
          <div key={exp.id} className="mb-6" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-semibold">{exp.position || '职位'}</h3>
              <span className="text-xs text-gray-400">
                {formatDateRange(exp.startDate, exp.endDate, exp.current)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{exp.company || '公司'}</p>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-sm italic">暂无工作经历</p>
      )}
    </section>
  );

  const renderProjects = () => (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-widest mb-6 pb-2 border-b" style={{ color: template.primaryColor, borderColor: template.secondaryColor }}>
        {sectionTitles.projects}
      </h2>
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.id} className="mb-4" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <h3 className="font-semibold mb-1">{project.name || '项目名称'}</h3>
            <p className="text-sm text-gray-600 mb-1">{project.description}</p>
            <p className="text-xs text-gray-400">
              {project.technologies.join(' · ')}
            </p>
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
        <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: template.primaryColor }}>
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

  const sections = [
    renderSummary(),
    ...sectionOrder.map((sectionId) => renderSection(sectionId)).filter(Boolean)
  ].filter(Boolean) as React.ReactElement[];

  return (
    <PaginatedTemplate header={renderHeader()} className="py-4">
      {sections}
    </PaginatedTemplate>
  );
}
