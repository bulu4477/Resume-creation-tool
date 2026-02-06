'use client';

import React, { useState, useRef } from 'react';
import { FileText, RotateCcw, Trash2, AlertCircle, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useResumeStore } from '@/store/resumeStore';

export function ActionButtons() {
  const { loadSampleData, resetData, clearAllData, setData, updateSectionOrder, data, sections } = useResumeStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showImportConfirm, setShowImportConfirm] = useState(false);
  const [importData, setImportData] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    resetData();
    setShowResetConfirm(false);
  };

  const handleClear = () => {
    clearAllData();
    setShowClearConfirm(false);
  };

  const handleExportJSON = () => {
    const exportData = {
      data,
      sections,
      exportDate: new Date().toISOString(),
      version: '1.0',
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume_backup_${data.personalInfo.fullName || 'unnamed'}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        
        if (parsed.data && parsed.sections) {
          setImportData(content);
          setShowImportConfirm(true);
        } else {
          alert('无效的文件格式');
        }
      } catch (error) {
        alert('文件解析失败，请确保上传的是有效的JSON文件');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleConfirmImport = () => {
    if (!importData) return;
    
    try {
      const parsed = JSON.parse(importData);
      setData(parsed.data);
      updateSectionOrder(parsed.sections);
      setShowImportConfirm(false);
      setImportData(null);
    } catch (error) {
      alert('导入失败');
    }
  };

  return (
    <>
      <div className="flex gap-2 p-4 border-t bg-gray-50">
        <Button
          variant="outline"
          size="sm"
          onClick={loadSampleData}
          className="flex-1"
        >
          <FileText className="mr-2 h-4 w-4" />
          加载示例
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowResetConfirm(true)}
          className="flex-1"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          重置
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowClearConfirm(true)}
          className="flex-1 text-red-600 hover:text-red-700"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          清空
        </Button>
      </div>

      <div className="flex gap-2 px-4 pb-4 bg-gray-50">
        <Button
          variant="outline"
          size="sm"
          onClick={handleImportClick}
          className="flex-1"
        >
          <Upload className="mr-2 h-4 w-4" />
          导入JSON
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportJSON}
          className="flex-1"
        >
          <Download className="mr-2 h-4 w-4" />
          导出JSON
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100 rounded-full">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold">确认重置？</h3>
            </div>
            <p className="text-gray-600 mb-6">
              这将清空所有已填写的数据，但保留在浏览器存储中。确定要继续吗？
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowResetConfirm(false)}
              >
                取消
              </Button>
              <Button
                className="flex-1"
                onClick={handleReset}
              >
                确认重置
              </Button>
            </div>
          </div>
        </div>
      )}

      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-red-600">确认清空？</h3>
            </div>
            <p className="text-gray-600 mb-6">
              这将永久删除所有数据，包括浏览器存储。此操作不可恢复！
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowClearConfirm(false)}
              >
                取消
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleClear}
              >
                确认清空
              </Button>
            </div>
          </div>
        </div>
      )}

      {showImportConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <Upload className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">确认导入？</h3>
            </div>
            <p className="text-gray-600 mb-6">
              导入将覆盖当前所有数据。确定要继续吗？
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowImportConfirm(false);
                  setImportData(null);
                }}
              >
                取消
              </Button>
              <Button
                className="flex-1"
                onClick={handleConfirmImport}
              >
                确认导入
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
