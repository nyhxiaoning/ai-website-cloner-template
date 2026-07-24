# Prompt Studio — Development Plan

## 项目概述

**Prompt Studio** 是一个浏览器内运行、数据全本地的 AIGC 提示词工作台。核心目标：消灭 prompt 片段的物理重复，通过"引用"而非复制粘贴来管理提示词。

## 技术栈

- **框架**: Next.js 16 (App Router, React 19, TypeScript strict)
- **UI**: shadcn/ui + Radix primitives, Tailwind CSS v4
- **存储**: Dexie.js (IndexedDB)
- **图标**: Lucide React
- **设计**: Dark theme, warm accent (#F4A261)

## ✅ 已完成

### 数据层
- [x] Dexie.js IndexedDB — 5 张表 (projects / prompts / snippets / rules / boards)
- [x] React Context Store — 全局状态 + 所有 CRUD
- [x] computed slices: projectSnippets / projectRules / projectPrompts / projectBoards

### 核心视图
- [x] SetupScreen → 项目选择 / 创建
- [x] StudioShell → 侧边栏（项目 / 片段库 / 规则库 / 导入入口）
- [x] BoardsView → 看板卡片 + 创建/重命名/删除看板 + 搜索栏
- [x] PromptEditor → Prompt 编辑 + 片段/规则库下拉 + 生成结果侧栏
  - [x] 展开预览（引用已展开，可折叠）
  - [x] 一键复制完整 prompt（含展开的引用）
  - [x] 复制状态反馈（勾选图标 + "已复制"文字）
  - [x] 生成结果导入（文件选择 + 拖放）
  - [x] 结果图全屏 lightbox 查看
  - [x] 键盘快捷键（⌘S 保存，Esc 关闭面板）
- [x] Toast 通知系统 — 上下文感知的操作反馈
  - [x] ToastProvider — React Context + 自动消失
  - [x] useToast hook — 全局可用的通知方法
  - [x] 保存成功/失败提示
  - [x] 删除确认提示
  - [x] 创建项目/看板/Prompt 成功提示
  - [x] 表单验证提示（空标题、未选择项目等）
  - [x] 导入结果成功提示
- [x] SnippetsView → 片段列表 + inline edit/delete
- [x] RulesView → 规则列表 + inline edit/delete

### 页面路由
- [x] / → Home (workspace entry)
- [x] /projects → 项目列表（rename/delete）
- [x] /projects/[id] → 项目详情（boards + editor）
- [x] /snippets → 全局片段库
- [x] /rules → 全局规则库

### Prompt 组装引擎
- [x] 展开 `{{snippet:id}}` / `{{rule:id}}` → 实际内容
- [x] 一键复制完整 prompt（text + negative + generation params）
- [x] 展开预览（引用已展开）- 可折叠的 details 组件

### 搜索与检测
- [x] searchAll() — 搜索 prompt / snippet / rule
- [x] findDuplicateFragments() — 检测重复片段
- [x] BoardsView 搜索框

### 看板管理
- [x] 创建/重命名/删除看板
- [x] 从看板移除 prompt
- [x] +Prompt 按钮一键创建新 prompt

### 素材管理
- [x] 生成结果缩略图 + lightbox 查看
- [x] 删除结果
- [x] 文件选择导入 + 拖放导入

### 项目 CRUD
- [x] 创建 / 重命名 / 删除项目
- [x] 项目级片段 / 规则创建

## ❌ 待完成

- [ ] Dark/Light 主题切换
- [ ] 键盘快捷键自定义
- [ ] File System Access API → 读写本地文件夹 / 导出导入项目包
- [ ] Prompt 重复内容高亮
- [ ] Prompt 模板系统
- [ ] 看板内 prompt 拖拽排序
- [ ] Cloudflare Pages 部署准备

## 文件结构

```
src/
  app/
    layout.tsx               # Root layout → StudioProvider
    page.tsx                 # Home / workspace
    globals.css              # Design tokens
    projects/
      page.tsx               # Project list
      [id]/page.tsx           # Project detail
    snippets/page.tsx         # Global snippets
    rules/page.tsx            # Global rules
  components/
    StudioProvider.tsx         # Context store
    ToastProvider.tsx          # Toast notification system
    StudioShell.tsx            # Sidebar
    SetupScreen.tsx            # Project selection
    BoardsView.tsx             # Kanban + search
    PromptEditor.tsx           # Editor + assembly + copy + shortcuts
    SnippetsView.tsx           # Snippet list + CRUD
    RulesView.tsx              # Rule list + CRUD
    GenerationResults.tsx      # Result thumbnails + lightbox
    ImportResultsDialog.tsx    # File picker + drag-drop import
    CreateProjectDialog.tsx
    CreateSnippetDialog.tsx
    CreateRuleDialog.tsx
    ConfirmDialog.tsx
    ui/button.tsx
  hooks/
    useStudio.ts              # Context hook
    useKeyboardShortcuts.ts   # ⌘S / ⌘K / Esc
  lib/
    db.ts                     # Dexie.js
    search.ts                 # searchAll / findDuplicateFragments
    utils.ts                  # cn()
  types/index.ts
```

## 关键接口

```typescript
// Prompt 引用语法
{{snippet:id}}  → 展开为片段 content
{{rule:id}}     → 展开为规则 content

// 上下文接口
interface StudioContextValue {
  projects, activeProject, activeProjectId,
  currentView, activeBoardId, activePrompt,
  searchQuery,
  // CRUD
  createProject, deleteProject, renameProject,
  createBoard, renameBoard, deleteBoard,
  createPrompt, updatePrompt, deletePrompt,
  createSnippet, updateSnippet, deleteSnippet,
  createRule, updateRule, deleteRule,
  addResult, removeResult,
  // Assembly
  expandPrompt: (prompt, snippets, rules) => string,
  // Computed
  projectSnippets, projectRules, projectPrompts, projectBoards,
}
```
