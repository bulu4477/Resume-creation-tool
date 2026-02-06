'use client';

import React, { useEffect, useRef, useState, ReactElement } from 'react';

interface PaginatedTemplateProps {
  children: ReactElement[];
  header: ReactElement;
  className?: string;
}

const A4_HEIGHT_MM = 297;
const PAGE_PADDING_MM = 16;
const CONTENT_HEIGHT_MM = A4_HEIGHT_MM - PAGE_PADDING_MM * 2;
const MM_TO_PX = 3.7795275591;
const CONTENT_HEIGHT_PX = CONTENT_HEIGHT_MM * MM_TO_PX;

export function PaginatedTemplate({ children, header, className = '' }: PaginatedTemplateProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<ReactElement[][]>([]);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    if (!measureRef.current) return;

    const container = measureRef.current;
    const headerEl = container.querySelector('[data-measure-header]') as HTMLElement;
    const sectionEls = container.querySelectorAll('[data-measure-section]');
    
    const headerHeight = headerEl?.getBoundingClientRect().height || 0;
    const availableHeightFirstPage = CONTENT_HEIGHT_PX - headerHeight;
    
    const distributedPages: ReactElement[][] = [];
    let currentPageSections: ReactElement[] = [];
    let currentPageHeight = 0;
    let isFirstPage = true;
    let hasContentOverflow = false;

    sectionEls.forEach((sectionEl, index) => {
      const sectionHeight = sectionEl.getBoundingClientRect().height;
      const availableHeight = isFirstPage ? availableHeightFirstPage : CONTENT_HEIGHT_PX;
      
      if (sectionHeight > CONTENT_HEIGHT_PX) {
        hasContentOverflow = true;
      }
      
      if (currentPageHeight + sectionHeight > availableHeight && currentPageSections.length > 0) {
        distributedPages.push([...currentPageSections]);
        currentPageSections = [];
        currentPageHeight = 0;
        isFirstPage = false;
      }
      
      currentPageSections.push(children[index]);
      currentPageHeight += sectionHeight;
    });

    if (currentPageSections.length > 0) {
      distributedPages.push([...currentPageSections]);
    }

    setPages(distributedPages);
    setHasOverflow(hasContentOverflow);
  }, [children, header, className]);

  const renderPages = () => {
    if (pages.length === 0) {
      return (
        <div 
          className="a4-page" 
          style={{ 
            width: '210mm',
            height: '297mm',
            minHeight: '297mm',
            maxHeight: '297mm',
            overflow: 'hidden',
            background: 'white',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
            marginBottom: '20px',
            boxSizing: 'border-box',
            padding: '16mm'
          }}
        >
          {header}
          {children}
        </div>
      );
    }

    return pages.map((pageSections, pageIndex) => (
      <div 
        key={pageIndex}
        className="a4-page" 
        style={{ 
          width: '210mm',
          height: '297mm',
          minHeight: '297mm',
          maxHeight: '297mm',
          overflow: 'hidden',
          background: 'white',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px',
          boxSizing: 'border-box',
          padding: '16mm'
        }}
      >
        {pageIndex === 0 ? header : null}
        {pageSections}
      </div>
    ));
  };

  return (
    <>
      <div 
        ref={measureRef}
        style={{ 
          position: 'absolute', 
          visibility: 'hidden', 
          width: '210mm',
          pointerEvents: 'none',
          zIndex: -1,
          padding: '16mm',
          boxSizing: 'border-box'
        }}
      >
        <div data-measure-header className={className}>
          {header}
        </div>
        {children.map((child, idx) => (
          <div key={idx} data-measure-section className={className}>
            {child}
          </div>
        ))}
      </div>
      
      {hasOverflow && (
        <div style={{ 
          position: 'fixed', 
          top: '10px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          background: '#fef3c7',
          color: '#92400e',
          padding: '8px 16px',
          borderRadius: '4px',
          fontSize: '14px',
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          提示：某些章节内容过长，可能需要拆分到多个页面
        </div>
      )}
      
      <div className="resume-page-container">
        {renderPages()}
      </div>
    </>
  );
}
