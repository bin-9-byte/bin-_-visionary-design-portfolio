export type ImageItem = {
  src: string;
  name?: string;
  poster?: string;
};

export type ProjectGroup = 'spatial' | 'product' | 'identity';

export type Project = {
  id: string;
  title: string;
  category: string;
  group: ProjectGroup;
  thumbnailUrl: string;
  images: (string | ImageItem)[];
  description: string;
  year: string;
  client?: string;
  role?: string;
};

// Copied from ref_project/BIN-design-portfolio_after/constants.ts (PROJECTS)
export const projects: Project[] = [
  {
    id: 'p1',
    title: 'CHAGEE和萌友们',
    category: 'style & workflow optimization',
    group: 'spatial',
    thumbnailUrl: '/images/projects/p1-thumbnail.png',
    images: [
      { src: '/images/projects/p1-0.png', name: '萌友-66' },
      { src: '/images/projects/p1-1.png', name: '萌友-kuku' },
      { src: '/images/projects/p1-2.png', name: '萌友-33 一娃 小5 腊八' },
      { src: '/images/projects/p1-3.png', name: '萌友-nini' },
      { src: '/images/projects/p1-4.png', name: '萌友-lucky' },
      { src: '/images/projects/p1-5.png', name: '萌友-肉桂' },
      { src: '/images/projects/p1-6.png', name: '萌友-urus' },
      { src: '/images/projects/p1-7.png', name: '萌友-coconut' },
    ],
    description:
      '在小程序上线宠物季DIY专属宠物杯的活动，需要AIGC实现宠物风格化，提供了目标风格图片。主要负责整个流程搭建，风格调试，批量验证。',
    year: '2025',
    role: 'AI Designer',
    client: 'CHAGEE',
  },
  {
    id: 'p2',
    title: 'Find & Spot',
    category: 'UI Design & AIGC',
    group: 'product',
    thumbnailUrl: '/images/projects/p2-thumbnail.png',
    images: [
      { src: '/images/projects/p2-1.png', name: 'play with nimo - 小丑鱼' },
      { src: '/images/projects/p2-2.png', name: 'sakura running - 樱花' },
      { src: '/images/projects/p2-3.png', name: 'Christmas - 圣诞' },
      { src: '/images/projects/p2-4.png', name: 'bathtub Soak - 浴缸泡澡' },
    ],
    description:
      'A collection of ceramic tableware celebrating the imperfections of hand-molding. Each piece is unique, reflecting the wabi-sabi philosophy.',
    year: '2024',
    role: 'UI Designer',
    client: 'Amber Moblie',
  },
  {
    id: 'p3',
    title: 'Photographs',
    category: 'Personal Work',
    group: 'identity',
    thumbnailUrl: '/images/projects/p3-thumbnail.jpg',
    images: ['/images/projects/p3-0.jpg', '/images/projects/p3-1.jpg'],
    description:
      'Rebranding for a heritage tea shop in Kyoto. We utilized textured paper stocks and embossing to create a tactile brand experience.',
    year: 'Every year',
    role: 'Life Observer',
    client: 'Myself',
  },
  {
    id: 'p4',
    title: '筑梦岛-乙女风格模型',
    category: 'lora train',
    group: 'spatial',
    thumbnailUrl: '/images/projects/p4-thumbnail.png',
    images: [
      { src: '/images/projects/p4-0.png', name: '线上应用效果' },
      { src: '/images/projects/p4-1.png', name: '更多风格' },
      { src: '/images/projects/p4-2.png', name: '更多风格' },
    ],
    description:
      '筑梦岛APP希望在AI虚拟角色设定的玩法内上线乙女（女性向）人像风格，现有动漫1.3.1模型文生图的乙女风格效果较单一，无法满足客户对乙女风格的需求，因此选择定制训练乙女风格Lora模型，以增强动漫1.3.1模型的乙女风格化效果。',
    year: '2024',
    role: 'AI Designer',
    client: '筑梦岛',
  },
  {
    id: 'p5',
    title: 'SAMSUNG 绘图助手',
    category: 'Comfyui workflow',
    group: 'spatial',
    thumbnailUrl: '/images/projects/p5-thumbnail.png',
    images: [
      { src: '/images/projects/p5-0.mp4', name: '发布会展示视频', poster: '/images/projects/p5-0-poster.png' },
    ],
    description:
      '三星打造AI绘图助手功能，选择文生图、图生图、涂鸦生图以及儿童portrait功能在新机型上线，在这个项目周期内负责调试风格效果，为不同场景选择合适的模型，并调试优化prompt。',
    year: '2024',
    role: 'AI Designer',
    client: 'SAMSUNG',
  },
  {
    id: 'p6',
    title: '残碑',
    category: 'Game Design & Art Design',
    group: 'product',
    thumbnailUrl: '/images/projects/p6-thumbnail.png',
    images: [
      { src: '/images/projects/p6-1.png', name: '游戏道具' },
      { src: '/images/projects/p6-0.png', name: '人物立绘' },
      { src: '/images/projects/p6-2.png', name: '游戏场景' },
      { src: '/images/projects/p6-3.png', name: '游戏界面' },
    ],
    description:
      '《残碑》是一款深度融合唐代历史底蕴的策略战棋游戏，以唐代乱世纷争为叙事基底。创新性引入 AI 设计工具赋能美术创作，从恢弘的长安宫阙、苍凉的边关战场等场景搭建，到契合唐代规制的服饰道具、神态鲜明的人物群像等视觉元素，均通过 AI 实现精细化呈现与风格统一。为玩家构建出兼具审美价值与叙事张力的唐代乱世图景。',
    year: '2023',
    role: 'Game Designer',
    client: 'CAFA & ZLong GAME',
  },
  {
    id: 'p7',
    title: '电商创作工具',
    category: 'Product Design',
    group: 'product',
    thumbnailUrl: '/images/projects/p7-thumbnail.png',
    images: [
      { src: '/images/projects/p7-0.png', name: '主要生成页面展示' },
      { src: '/images/projects/p7-1.png', name: '更多智能创作云项目' },
    ],
    description:
      '在智能创作云中选择商品图生成，只需上传实拍图或白底图，即可快速生成光影融合自然的专业级商品图。解决传统拍摄中棚拍成本高、修图周期长、素材同质化等痛点。',
    year: '2024',
    role: 'Designer',
    client: 'Intelligent creative cloud',
  },
  {
    id: 'p8',
    title: '阿尔山乡村艺术季',
    category: 'Arch Renovation and Exhibition Curation',
    group: 'identity',
    thumbnailUrl: '/images/projects/p8-thumbnail.png',
    images: ['/images/projects/p8-0.png', '/images/projects/p8-1.png'],
    description:
      'Visual identity for a calligraphy school. The logo is dynamic, generated by ink simulation software to be different every time.',
    year: '2023',
    role: 'Architect',
    client: 'CAFA & Hinggan League',
  },
  {
    id: 'p9',
    title: 'Mono',
    category: 'Brand Identity',
    group: 'identity',
    thumbnailUrl: '/images/projects/p9-thumbnail.jpg',
    images: ['/images/projects/p9-0.jpg', '/images/projects/p9-1.jpg'],
    description:
      'A brutalist identity for an experimental music label. Strict adherence to black and white with heavy typographic focus.',
    year: '2023',
    role: 'Graphic Designer',
    client: 'Mono Records',
  },
];
