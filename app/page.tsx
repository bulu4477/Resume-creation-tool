'use client';

import React from 'react';
import { SidebarEditor } from '@/components/editor/SidebarEditor';
import { ResumePreview } from '@/components/preview/ResumePreview';
import { PDFExportButton } from '@/components/preview/PDFExportButton';

export default function ResumeBuilder() {
  return (
    <div className="fixed inset-0 flex flex-row bg-gray-100">
      {/* 左侧编辑区域 - 固定宽度 */}
      <div className="w-[50%] min-w-[500px] max-w-[700px] h-full bg-white shadow-2xl flex flex-col z-10">
        <SidebarEditor />
      </div>

      {/* 右侧预览区域 - 占据剩余空间 */}
      <div className="flex-1 h-full overflow-y-auto bg-gray-100">
        <ResumePreview />
      </div>

      {/* PDF导出按钮 */}
      <PDFExportButton />
    </div>
  );
}
