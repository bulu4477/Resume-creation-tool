'use client';

import React, { useEffect, useRef, useState } from 'react';

interface PaginatedContentProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

const A4_HEIGHT_PX = 1123;
const PAGE_PADDING_PX = 64;
const CONTENT_HEIGHT_PX = A4_HEIGHT_PX - PAGE_PADDING_PX * 2;

export function PaginatedContent({ children, header }: PaginatedContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const contentSections = React.Children.toArray(children);
    const newPages: React.ReactNode[] = [];
    let currentPageContent: React.ReactNode[] = [header];
    let currentHeight = 0;

    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.width = '794px';
    tempDiv.style.padding = '32px';
    document.body.appendChild(tempDiv);

    const headerElement = containerRef.current.querySelector('[data-header]');
    if (headerElement) {
      tempDiv.innerHTML = headerElement.outerHTML;
      currentHeight = tempDiv.offsetHeight;
    }

    contentSections.forEach((section, index) => {
      if (!section) return;

      const sectionElement = document.createElement('div');
      const sectionHtml = (section as any).props?.dangerouslySetInnerHTML?.html || '';
      sectionElement.innerHTML = sectionHtml || '';
      tempDiv.appendChild(sectionElement);
      const sectionHeight = sectionElement.offsetHeight;

      if (currentHeight + sectionHeight > CONTENT_HEIGHT_PX && currentPageContent.length > 1) {
        newPages.push(
          <div key={newPages.length} className="a4-page" style={{ pageBreakAfter: 'always' }}>
            <div className="p-8">
              {currentPageContent}
            </div>
          </div>
        );
        currentPageContent = [section];
        currentHeight = sectionHeight;
      } else {
        currentPageContent.push(section);
        currentHeight += sectionHeight;
      }

      tempDiv.removeChild(sectionElement);
    });

    if (currentPageContent.length > 0) {
      newPages.push(
        <div key={newPages.length} className="a4-page">
          <div className="p-8">
            {currentPageContent}
          </div>
        </div>
      );
    }

    document.body.removeChild(tempDiv);
    setPages(newPages);
  }, [children, header]);

  return (
    <div ref={containerRef} className="resume-page-container">
      <div style={{ display: 'none' }}>
        <div data-header>{header}</div>
        {children}
      </div>
      {pages}
    </div>
  );
}
