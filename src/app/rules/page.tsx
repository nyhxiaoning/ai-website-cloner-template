'use client';

import { useState } from 'react';
import type { Snippet, Rule } from '@/types';
import StudioShell from '@/components/StudioShell';
import RulesView from '@/components/RulesView';
import { mockSnippets, mockRules, mockProjects } from '@/data/mock-data';

export default function RulesPage() {
  const [snippets] = useState<Snippet[]>(mockSnippets);
  const [rules, setRules] = useState<Rule[]>(mockRules);
  const [createOpen, setCreateOpen] = useState(false);
  const projects = mockProjects;

  const handleCreate = (data: {
    key: string;
    title: string;
    content: string;
    description: string;
    tags: string;
  }) => {
    const newRule: Rule = {
      id: data.key,
      title: data.title || data.key,
      content: data.content,
      createdAt: new Date().toISOString(),
    };
    setRules((prev) => [...prev, newRule]);
  };

  return (
    <StudioShell projects={projects} activeProjectId={projects[0]?.id}>
      <RulesView
        snippets={snippets}
        rules={rules}
        onCreateOpen={createOpen}
        onCreateChange={setCreateOpen}
        onCreateRule={handleCreate}
      />
    </StudioShell>
  );
}
