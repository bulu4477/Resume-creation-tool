import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '简历编辑器 - 在线制作专业简历',
  description: '免费在线简历编辑器，无需登录，支持多种模板，实时预览，一键导出PDF',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">{children}</body>
    </html>
  )
}
