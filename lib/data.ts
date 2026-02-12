import { v4 as uuidv4 } from 'uuid';
import { ResumeData, TemplateId } from '@/types/resume';

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
  },
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  customSections: [],
};

export const createEmptyWorkExperience = () => ({
  id: uuidv4(),
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
});

export const createEmptyEducation = () => ({
  id: uuidv4(),
  school: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
});

export const createEmptySkill = () => ({
  id: uuidv4(),
  name: '',
  level: undefined,
  description: '',
});

export const createEmptyProject = () => ({
  id: uuidv4(),
  name: '',
  description: '',
  technologies: [],
  link: '',
  startDate: '',
  endDate: '',
  current: false,
});

export const sampleResumeData: ResumeData = {
  personalInfo: {
    fullName: '张三',
    email: 'zhangsan@example.com',
    phone: '138-0000-0000',
    location: '北京市',
    website: 'https://zhangsan.dev',
    linkedin: 'https://linkedin.com/in/zhangsan',
    github: 'https://github.com/zhangsan',
    summary: '5年前端开发经验，专注于React和TypeScript。热衷于构建高性能、用户友好的Web应用。具有良好的团队协作能力和项目管理经验。在大型互联网公司担任技术负责人，主导过多个百万级用户产品的架构设计。精通前端性能优化、工程化建设和团队管理。',
  },
  workExperience: [
    {
      id: uuidv4(),
      company: '科技有限公司',
      position: '高级前端工程师',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: '负责公司核心产品的前端架构设计和开发。带领5人团队完成多个重要项目，优化页面性能提升40%。建立了前端工程化体系，包括CI/CD流程、代码规范、组件库建设等。主导技术选型，引入Next.js和TypeScript，大幅提升开发效率和代码质量。',
    },
    {
      id: uuidv4(),
      company: '互联网公司',
      position: '前端开发工程师',
      startDate: '2019-06',
      endDate: '2021-02',
      current: false,
      description: '参与电商平台的前端开发，使用React和Next.js构建高性能页面。实现了响应式设计和移动端适配。负责商品详情页、购物车、订单管理等核心模块的开发。优化首屏加载时间从3秒降至1.5秒。',
    },
    {
      id: uuidv4(),
      company: '创业公司',
      position: '全栈开发工程师',
      startDate: '2018-03',
      endDate: '2019-05',
      current: false,
      description: '作为早期员工参与产品从零到一的开发。负责前端架构设计和后端API开发。使用Vue.js构建管理后台，Node.js开发RESTful API。实现了用户认证、权限管理、数据可视化等功能模块。',
    },
  ],
  education: [
    {
      id: uuidv4(),
      school: '北京大学',
      degree: '本科',
      field: '计算机科学与技术',
      startDate: '2015-09',
      endDate: '2019-06',
      current: false,
      description: '主修计算机科学，GPA 3.8/4.0。获得优秀毕业生称号。在校期间参与多个开源项目，担任计算机协会技术部部长。获得ACM程序设计竞赛省级二等奖。',
    },
    {
      id: uuidv4(),
      school: '北京四中',
      degree: '高中',
      field: '理科',
      startDate: '2012-09',
      endDate: '2015-06',
      current: false,
      description: '理科实验班，数学和物理成绩优异。担任班级学习委员，组织多次学习交流活动。',
    },
  ],
  skills: [
    { id: uuidv4(), name: 'React', level: 'expert' },
    { id: uuidv4(), name: 'TypeScript', level: 'expert' },
    { id: uuidv4(), name: 'Next.js', level: 'advanced' },
    { id: uuidv4(), name: 'Node.js', level: 'advanced' },
    { id: uuidv4(), name: 'Vue.js', level: 'advanced' },
    { id: uuidv4(), name: 'Tailwind CSS', level: 'expert' },
    { id: uuidv4(), name: 'GraphQL', level: 'intermediate' },
    { id: uuidv4(), name: 'PostgreSQL', level: 'intermediate' },
    { id: uuidv4(), name: 'Docker', level: 'intermediate' },
    { id: uuidv4(), name: 'AWS', level: 'intermediate' },
    { id: uuidv4(), name: 'Git', level: 'expert' },
    { id: uuidv4(), name: 'Webpack', level: 'advanced' },
    { id: uuidv4(), name: 'Jest', level: 'advanced' },
    { id: uuidv4(), name: 'Cypress', level: 'intermediate' },
    { id: uuidv4(), name: 'Figma', level: 'intermediate' },
  ],
  projects: [
    {
      id: uuidv4(),
      name: '电商平台重构',
      description: '使用Next.js重构 legacy 系统，提升页面加载速度60%，改善SEO表现。实现了服务端渲染(SSR)和静态生成(SSG)的混合架构。集成支付系统、物流追踪、库存管理等功能。日活跃用户超过100万。',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis'],
      link: 'https://example.com',
    },
    {
      id: uuidv4(),
      name: '企业级组件库',
      description: '从零构建企业级React组件库，包含50+高质量组件。支持主题定制、无障碍访问、国际化。被10+项目采用，显著提升开发效率和UI一致性。',
      technologies: ['React', 'TypeScript', 'Storybook', 'Rollup'],
      link: 'https://github.com/example/ui-lib',
    },
    {
      id: uuidv4(),
      name: '实时协作编辑器',
      description: '基于WebSocket的实时协作编辑器，支持多人同时编辑文档。实现了Operational Transformation算法解决冲突。应用于内部文档系统，支持200+并发用户。',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      link: 'https://github.com/example/collab-editor',
    },
    {
      id: uuidv4(),
      name: '数据可视化平台',
      description: '构建企业级数据可视化平台，支持拖拽式图表配置、实时数据更新、多数据源接入。集成ECharts、D3.js等图表库，提供丰富的图表类型和自定义选项。',
      technologies: ['Vue.js', 'ECharts', 'D3.js', 'Node.js'],
      link: 'https://example.com/dashboard',
    },
  ],
  customSections: [
    {
      id: uuidv4(),
      title: '开源贡献',
      content: '• React社区活跃贡献者，提交过10+PR\n• 维护个人技术博客，累计阅读量50万+\n• 开源多个npm包，周下载量超过10万次\n• 在技术大会上做过3次演讲分享',
    },
    {
      id: uuidv4(),
      title: '语言能力',
      content: '• 英语：CET-6，能够流利进行技术交流和文档阅读\n• 日语：N3水平，能够进行基础对话\n• 普通话：母语，标准流利',
    },
    {
      id: uuidv4(),
      title: '获奖经历',
      content: '• 2023年度优秀员工\n• 公司技术创新奖一等奖\n• 开源社区贡献奖\n• ACM程序设计竞赛省级二等奖',
    },
  ],
};
