'use client';

import React from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { Settings2, RotateCcw, Type } from 'lucide-react';
import { AVAILABLE_FONTS } from '@/types/resume';

export function PageSettingsPanel() {
  const { pageSettings, updatePageSettings, resetPageSettings } = useResumeStore();

  const handleNumberChange = (key: 'sectionTitleSize' | 'contentSize' | 'sectionSpacing' | 'lineHeight' | 'pagePadding', value: number) => {
    updatePageSettings({ [key]: value });
  };

  const handleFontChange = (fontFamily: string) => {
    updatePageSettings({ fontFamily });
  };

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold">页面设置</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetPageSettings}
          className="text-gray-500 hover:text-gray-700"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          重置
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-gray-500" />
            <Label className="text-sm font-medium">字体</Label>
          </div>
          <select
            value={pageSettings.fontFamily}
            onChange={(e) => handleFontChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{ fontFamily: pageSettings.fontFamily }}
          >
            {AVAILABLE_FONTS.map((font) => (
              <option 
                key={font.value} 
                value={font.value}
                style={{ fontFamily: font.value }}
              >
                {font.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400">
            当前使用: {AVAILABLE_FONTS.find(f => f.value === pageSettings.fontFamily)?.label || '自定义字体'}
          </p>
        </div>

        <div className="h-px bg-gray-200" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-sm">模块标题大小</Label>
            <span className="text-sm text-gray-500">{pageSettings.sectionTitleSize}px</span>
          </div>
          <input
            type="range"
            min="12"
            max="32"
            value={pageSettings.sectionTitleSize}
            onChange={(e) => handleNumberChange('sectionTitleSize', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-sm">内容文字大小</Label>
            <span className="text-sm text-gray-500">{pageSettings.contentSize}px</span>
          </div>
          <input
            type="range"
            min="10"
            max="20"
            value={pageSettings.contentSize}
            onChange={(e) => handleNumberChange('contentSize', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-sm">模块间距</Label>
            <span className="text-sm text-gray-500">{pageSettings.sectionSpacing}px</span>
          </div>
          <input
            type="range"
            min="12"
            max="48"
            value={pageSettings.sectionSpacing}
            onChange={(e) => handleNumberChange('sectionSpacing', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-sm">行高</Label>
            <span className="text-sm text-gray-500">{pageSettings.lineHeight}</span>
          </div>
          <input
            type="range"
            min="1"
            max="2.5"
            step="0.1"
            value={pageSettings.lineHeight}
            onChange={(e) => handleNumberChange('lineHeight', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-sm">页边距</Label>
            <span className="text-sm text-gray-500">{pageSettings.pagePadding}mm</span>
          </div>
          <input
            type="range"
            min="8"
            max="32"
            value={pageSettings.pagePadding}
            onChange={(e) => handleNumberChange('pagePadding', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
