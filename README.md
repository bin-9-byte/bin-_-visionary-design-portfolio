# Visionary Design Portfolio

一个现代化的交互式设计作品集网站，具有 3D 动画、流体背景和 AI 驱动的聊天助手。

## 功能特性

- **交互式 3D 体验**：使用 Three.js 和 React Three Fiber 构建沉浸式视觉效果
- **流体背景**：响应式动态动画背景
- **自定义光标**：带有流畅动画的增强光标体验
- **AI 聊天助手**：由 Google Gemini API 驱动的智能对话功能
- **项目展示**：展示多个类别的设计作品（空间设计、产品设计、品牌设计）
- **流畅动画**：使用 Framer Motion 实现无缝过渡和交互效果
- **响应式设计**：针对各种屏幕尺寸进行优化

## 技术栈

- **框架**：React 19 + TypeScript
- **构建工具**：Vite
- **3D 图形**：Three.js、@react-three/fiber、@react-three/drei
- **动画**：Framer Motion
- **AI 集成**：@google/genai（Google Gemini API）
- **图标**：Lucide React

## 项目结构

```
├── components/          # React 组件
│   ├── AllProjects.tsx
│   ├── ChatAssistant.tsx
│   ├── Contact.tsx
│   ├── CustomCursor.tsx
│   ├── FluidBackground.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Portfolio.tsx
│   ├── Profile.tsx
│   └── Services.tsx
├── data/               # 项目数据
│   └── projects.ts
├── services/           # API 服务
│   └── geminiService.ts
├── public/             # 静态资源
│   └── images/
└── App.tsx             # 主应用
```

## 快速开始

**前置要求**：Node.js

1. 安装依赖：
   ```bash
   npm install
   ```

2. 配置环境变量：
   在根目录创建 `.env.local` 文件，并添加你的 Gemini API 密钥：
   ```
   GEMINI_API_KEY=你的_gemini_api_key
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```

4. 构建生产版本：
   ```bash
   npm run build
   ```

5. 预览生产构建：
   ```bash
   npm run preview
   ```

## 项目类别

作品集展示了三个主要类别的设计作品：

- **空间设计（Spatial）**：3D 和空间设计项目
- **产品设计（Product）**：产品设计和 UI/UX 工作
- **品牌设计（Identity）**：品牌识别和视觉设计

## 许可证

私有项目
