import type { Project, Board, Prompt, Snippet, Rule, GenerationResult } from '@/types';

export const mockSnippets: Snippet[] = [
  { id: 's1', title: '高质量角色描述开头', content: 'masterpiece, best quality, ultra-detailed, 8k,', createdAt: '2025-01-15T10:00:00Z' },
  { id: 's2', title: '光影描写模板', content: 'dramatic lighting, cinematic lighting, soft shadows', createdAt: '2025-01-16T11:00:00Z' },
  { id: 's3', title: '构图指令', content: 'centered composition, rule of thirds, dynamic angle', createdAt: '2025-01-17T12:00:00Z' },
];

export const mockRules: Rule[] = [
  { id: 'r1', title: '通用负面词', content: 'low quality, worst quality, blurry, deformed, bad anatomy', createdAt: '2025-01-15T10:00:00Z' },
  { id: 'r2', title: '风格一致性', content: 'consistent art style, unified color palette', createdAt: '2025-01-16T11:00:00Z' },
];

export const mockPrompts: Prompt[] = [
  {
    id: 'p1',
    title: '唐三藏正面立绘',
    taskLabels: '任务一, 正面立绘',
    generationParams: 'aspect ratio 2:3, seed fixed, high detail',
    content: '唐三藏正面立绘，手持禅杖，身披袈裟，表情庄重慈祥。\n\n{{snippet:s1}}\n{{snippet:s2}}',
    positive: '唐三藏, 正面, 立绘, 禅杖, 袈裟, 庄重慈祥',
    negative: '{{rule:r1}}',
    results: [
      { id: 'r1', promptId: 'p1', imageUrl: 'https://placehold.co/512x384/16181a/ededed?text=唐三藏', createdAt: '2025-01-15T14:00:00Z' },
    ],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T14:00:00Z',
  },
  {
    id: 'p2',
    title: '孙悟空战斗姿态',
    taskLabels: '任务二, 动作场景',
    generationParams: 'aspect ratio 2:3, dynamic pose',
    content: '孙悟空手持金箍棒，战斗姿态，火焰背景。\n{{snippet:s1}}\n{{snippet:s3}}',
    positive: '孙悟空, 战斗, 金箍棒, 火焰, 动态姿态',
    negative: '{{rule:r1}}',
    results: [],
    createdAt: '2025-01-16T10:00:00Z',
    updatedAt: '2025-01-16T10:00:00Z',
  },
  {
    id: 'p3',
    title: '猪八戒憨态可掬',
    taskLabels: '任务三, 角色刻画',
    generationParams: 'aspect ratio 2:3, cartoon style',
    content: '猪八戒憨态可掬，手持九齿钉耙，笑容满面。',
    positive: '猪八戒, 憨态, 九齿钉耙, 笑容',
    negative: '{{rule:r1}}',
    results: [
      { id: 'r2', promptId: 'p3', imageUrl: 'https://placehold.co/512x384/1d1d20/c89cb8?text=猪八戒', createdAt: '2025-01-17T14:00:00Z' },
    ],
    createdAt: '2025-01-17T10:00:00Z',
    updatedAt: '2025-01-17T14:00:00Z',
  },
];

export const mockBoards: Board[] = [
  { id: 'b1', name: '角色立绘', promptIds: ['p1', 'p2', 'p3'] },
  { id: 'b2', name: '场景概念', promptIds: [] },
  { id: 'b3', name: '封面设计', promptIds: [] },
];

export const mockProjects: Project[] = [
  {
    id: 'proj1',
    name: '西游记角色设计',
    boards: mockBoards,
    prompts: mockPrompts,
    snippets: mockSnippets,
    rules: mockRules,
    createdAt: '2025-01-15T10:00:00Z',
  },
];
