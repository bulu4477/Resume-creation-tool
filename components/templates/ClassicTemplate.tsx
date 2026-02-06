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
  education: '教育背景',
  skills: '技能',
  projects: '项目经历',
};

export function ClassicTemplate({ data, template, sectionOrder }: TemplateProps) {
  const { personalInfo, workExperience, education, skills, projects, customSections } = data;

  const renderHeader = () => (
    <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: template.primaryColor }}>
      <h1 className="text-4xl font-bold mb-3" style={{ color: template.primaryColor }}>
        {personalInfo.fullName || '姓名'}
      </h1>
      <div className="flex justify-center gap-4 text-sm text-gray-600 flex-wrap">
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span>{personalInfo.phone}</span>}
        {personalInfo.location && <span>{personalInfo.location}</span>}
      </div>
      {(personalInfo.website || personalInfo.linkedin || personalInfo.github) && (
        <div className="flex justify-center gap-4 text-sm mt-2">
          {personalInfo.website && <span>{personalInfo.website}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      )}
    </header>
  );

  const renderSummary = () =>
    personalInfo.summary && (
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-3 uppercase tracking-wider" style={{ color: template.primaryColor }}>
          个人简介
        </h2>
        <div className="text-gray-700 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: personalInfo.summary }} />
      </section>
    );

  const renderWorkExperience = () => (
    <section className="mb-6">
      <h2 className="text-lg font-bold mb-4 uppercase tracking-wider" style={{ color: template.primaryColor }}>
        {sectionTitles.workExperience}
      </h2>
      {workExperience.length > 0 ? (
        workExperience.map((exp) => (
          <div key={exp.id} className="mb-5" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-lg">{exp.position || '职位'}</h3>
              <span className="text-sm text-gray-600">
                {formatDateRange(exp.startDate, exp.endDate, exp.current)}
              </span>
            </div>
            <p className="italic text-gray-700 mb-2">{exp.company || '公司'}</p>
            <div 
              className="text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: exp.description }}
            />
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-sm italic">暂无工作经历</p>
      )}
    </section>
  );

  const renderEducation = () => (
    <section className="mb-6">
      <h2 className="text-lg font-bold mb-4 uppercase tracking-wider" style={{ color: template.primaryColor }}>
        {sectionTitles.education}
      </h2>
      {education.length > 0 ? (
        education.map((edu) => (
          <div key={edu.id} className="mb-3" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <div className="flex justify-between items-baseline">
              <div>
                <h3 className="font-bold">{edu.school || '学校'}</h3>
                <p className="italic text-gray-700">{edu.degree}{edu.field && `, ${edu.field}`}</p>
              </div>
              <span className="text-sm text-gray-600">
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
    <section className="mb-6">
      <h2 className="text-lg font-bold mb-3 uppercase tracking-wider" style={{ color: template.primaryColor }}>
        {sectionTitles.skills}
      </h2>
      {skills.length > 0 ? (
        <p className="text-gray-700">
          {skills.map((skill) => skill.name).join(' • ')}
        </p>
      ) : (
        <p className="text-gray-400 text-sm italic">暂无技能</p>
      )}
    </section>
  );

  const renderProjects = () => (
    <section>
      <h2 className="text-lg font-bold mb-4 uppercase tracking-wider" style={{ color: template.primaryColor }}>
        {sectionTitles.projects}
      </h2>
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.id} className="mb-4" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <h3 className="font-bold">{project.name || '项目名称'}</h3>
            <div className="text-gray-600 text-sm mb-1 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: project.description }} />
            <p className="text-sm text-gray-500">
              技术栈: {project.technologies.join(', ')}
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
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-4 uppercase tracking-wider" style={{ color: template.primaryColor }}>
          {customSection.title}
        </h2>
        {customSection.content ? (
          <div className="text-gray-600 text-sm prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: customSection.content }} />
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
    <PaginatedTemplate header={renderHeader()}>
      {sections}
    </PaginatedTemplate>
  );
}
