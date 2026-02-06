'use client';

import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { exportResumeToPDF } from '@/lib/utils';
import { useResumeStore } from '@/store/resumeStore';

export function PDFExportButton() {
  const [isExporting, setIsExporting] = useState(false);
  const { data } = useResumeStore();

  const handleExport = async () => {
    const resumeElement = document.querySelector('.resume-page-container') as HTMLElement;
    if (!resumeElement) return;

    setIsExporting(true);
    const fileName = `${data.personalInfo.fullName || 'resume'}_${new Date().toISOString().split('T')[0]}.pdf`;
    
    try {
      await exportResumeToPDF(resumeElement, fileName);
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      className="fixed bottom-8 right-8 shadow-lg z-50"
      size="lg"
    >
      {isExporting ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <Download className="mr-2 h-5 w-5" />
      )}
      {isExporting ? '导出中...' : '导出PDF'}
    </Button>
  );
}
