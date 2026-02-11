import React from 'react';
import { ResumeData, TemplateConfig, SectionType, PageSettings } from '@/types/resume';
import { formatDateRange } from '@/lib/utils';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { PaginatedTemplate } from './PaginatedTemplate';

interface TemplateProps {
  data: ResumeData;
  template: TemplateConfig;
  sectionOrder: SectionType[];
  pageSettings: PageSettings;
}

const sectionTitles: Record<string, string> = {
  workExperience: '工作经历',
  education: '教育背景',
  skills: '技能',
  projects: '项目经历',
};

export function ModernTemplate({ data, template, sectionOrder, pageSettings }: TemplateProps) {
  const { personalInfo, workExperience, education, skills, projects, customSections } = data;

  const renderHeader = () => (
    <header className="border-b-2 pb-6 mb-6" style={{ borderColor: template.primaryColor }}>
      <h1 className="text-3xl font-bold mb-2" style={{ color: template.primaryColor }}>
        {personalInfo.fullName || '姓名'}
      </h1>
      <div 
        className="text-lg text-gray-600 mb-4 prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: personalInfo.summary || '<p>个人简介</p>' }}
      />

      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        {personalInfo.email && (
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" style={{ color: template.primaryColor }} />
            <span>{personalInfo.email}</span>
          </div>
        )}
        {personalInfo.phone && (
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" style={{ color: template.primaryColor }} />
            <span>{personalInfo.phone}</span>
          </div>
        )}
        {personalInfo.location && (
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" style={{ color: template.primaryColor }} />
            <span>{personalInfo.location}</span>
          </div>
        )}
        {personalInfo.website && (
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4" style={{ color: template.primaryColor }} />
            <span>{personalInfo.website}</span>
          </div>
        )}
        {personalInfo.linkedin && (
          <div className="flex items-center gap-1">
            <Linkedin className="w-4 h-4" style={{ color: template.primaryColor }} />
            <span>{personalInfo.linkedin}</span>
          </div>
        )}
        {personalInfo.github && (
          <div className="flex items-center gap-1">
            <Github className="w-4 h-4" style={{ color: template.primaryColor }} />
            <span>{personalInfo.github}</span>
          </div>
        )}
      </div>
    </header>
  );

  const renderWorkExperience = () => (
    <section className="mb-6" style={{ marginBottom: `${pageSettings.sectionSpacing}px` }}>
      <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: template.primaryColor, borderColor: template.secondaryColor, fontSize: `${pageSettings.sectionTitleSize}px` }}>
        {sectionTitles.workExperience}
      </h2>
      {workExperience.length > 0 ? (
        workExperience.map((exp) => (
          <div key={exp.id} className="mb-4" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-lg">{exp.position || '职位'}</h3>
              <span className="text-sm text-gray-500">
                {formatDateRange(exp.startDate, exp.endDate, exp.current)}
              </span>
            </div>
            <p className="text-gray-700 font-medium mb-2">{exp.company || '公司'}</p>
            <div 
              className="text-gray-600 prose prose-sm max-w-none"
              style={{ fontSize: `${pageSettings.contentSize}px`, lineHeight: pageSettings.lineHeight }}
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
    <section className="mb-6" style={{ marginBottom: `${pageSettings.sectionSpacing}px` }}>
      <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: template.primaryColor, borderColor: template.secondaryColor, fontSize: `${pageSettings.sectionTitleSize}px` }}>
        {sectionTitles.education}
      </h2>
      {education.length > 0 ? (
        education.map((edu) => (
          <div key={edu.id} className="mb-3" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{edu.school || '学校'}</h3>
                <p className="text-gray-700" style={{ fontSize: `${pageSettings.contentSize}px`, lineHeight: pageSettings.lineHeight }}>{edu.degree} {edu.field && `- ${edu.field}`}</p>
                {edu.description && <div className="text-gray-600 mt-1 prose prose-sm max-w-none" style={{ fontSize: `${pageSettings.contentSize}px`, lineHeight: pageSettings.lineHeight }} dangerouslySetInnerHTML={{ __html: edu.description }} />}
              </div>
              <span className="text-sm text-gray-500">
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
    <section className="mb-6" style={{ marginBottom: `${pageSettings.sectionSpacing}px` }}>
      <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: template.primaryColor, borderColor: template.secondaryColor, fontSize: `${pageSettings.sectionTitleSize}px` }}>
        {sectionTitles.skills}
      </h2>
      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: template.primaryColor + '20', color: template.primaryColor, fontSize: `${pageSettings.contentSize}px` }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm italic">暂无技能</p>
      )}
    </section>
  );

  const renderProjects = () => (
    <section style={{ marginBottom: `${pageSettings.sectionSpacing}px` }}>
      <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: template.primaryColor, borderColor: template.secondaryColor, fontSize: `${pageSettings.sectionTitleSize}px` }}>
        {sectionTitles.projects}
      </h2>
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.id} className="mb-4" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold">{project.name || '项目名称'}</h3>
              {project.link && (
                <a href={project.link} className="text-sm" style={{ color: template.primaryColor }}>
                  查看项目
                </a>
              )}
            </div>
            <div className="text-gray-600 mb-2 prose prose-sm max-w-none" style={{ fontSize: `${pageSettings.contentSize}px`, lineHeight: pageSettings.lineHeight }} dangerouslySetInnerHTML={{ __html: project.description }} />
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="text-xs text-gray-500">
                  {tech}{idx < project.technologies.length - 1 && ' · '}
                </span>
              ))}
            </div>
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
      <section className="mb-6" style={{ marginBottom: `${pageSettings.sectionSpacing}px` }}>
        <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: template.primaryColor, borderColor: template.secondaryColor, fontSize: `${pageSettings.sectionTitleSize}px` }}>
          {customSection.title}
        </h2>
        {customSection.content ? (
          <div className="text-gray-600 prose prose-sm max-w-none" style={{ fontSize: `${pageSettings.contentSize}px`, lineHeight: pageSettings.lineHeight }} dangerouslySetInnerHTML={{ __html: customSection.content }} />
        ) : (
          <p className="text-gray-400 italic" style={{ fontSize: `${pageSettings.contentSize}px` }}>暂无内容</p>
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
    <PaginatedTemplate header={renderHeader()} pagePadding={pageSettings.pagePadding}>
      {sections.map((section, index) => (
        <div key={index}>{section}</div>
      ))}
    </PaginatedTemplate>
  );
}
