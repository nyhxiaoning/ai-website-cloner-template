import Dexie, { type EntityTable } from 'dexie';

export interface PromptRecord {
  id: string;
  title: string;
  taskLabels: string;
  generationParams: string;
  content: string;
  positive: string;
  negative: string;
  results: { id: string; promptId: string; imageUrl: string; createdAt: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface SnippetRecord {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  _projectId: string;
}

export interface RuleRecord {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  _projectId: string;
}

export interface BoardRecord {
  id: string;
  name: string;
  promptIds: string[];
  _projectId: string;
}

export interface ProjectRecord {
  id: string;
  name: string;
  createdAt: string;
}

class PromptStudioDB extends Dexie {
  projects!: EntityTable<ProjectRecord, 'id'>;
  prompts!: EntityTable<PromptRecord, 'id'>;
  snippets!: EntityTable<SnippetRecord, 'id'>;
  rules!: EntityTable<RuleRecord, 'id'>;
  boards!: EntityTable<BoardRecord, 'id'>;

  constructor() {
    super('prompt-studio');
    this.version(1).stores({
      projects: 'id',
      prompts: 'id, _projectId',
      snippets: 'id, _projectId',
      rules: 'id, _projectId',
      boards: 'id, _projectId',
    });
  }
}

export const db = new PromptStudioDB();

// ---- Project helpers ----

export async function projectWithData(projectId: string) {
  const project = await db.projects.get(projectId);
  if (!project) return null;
  const prompts = await db.prompts.where('_projectId').equals(projectId).toArray();
  const boards = await db.boards.where('_projectId').equals(projectId).toArray();
  const snippets = await db.snippets.where('_projectId').equals(projectId).toArray();
  const rules = await db.rules.where('_projectId').equals(projectId).toArray();
  return {
    ...project,
    boards: boards.map((b) => ({ id: b.id, name: b.name, promptIds: b.promptIds })),
    prompts,
    snippets: snippets.map((s) => ({ id: s.id, title: s.title, content: s.content, createdAt: s.createdAt })),
    rules: rules.map((r) => ({ id: r.id, title: r.title, content: r.content, createdAt: r.createdAt })),
  };
}

export async function getAllProjectsWithBoards() {
  const projects = await db.projects.toArray();
  return Promise.all(
    projects.map(async (p) => {
      const boards = await db.boards.where('_projectId').equals(p.id).toArray();
      const prompts = await db.prompts.where('_projectId').equals(p.id).toArray();
      return {
        id: p.id,
        name: p.name,
        createdAt: p.createdAt,
        boards: boards.map((b) => ({ id: b.id, name: b.name, promptIds: b.promptIds })),
        prompts: prompts.map((pr) => ({ id: pr.id, title: pr.title, createdAt: pr.updatedAt })),
      };
    }),
  );
}
