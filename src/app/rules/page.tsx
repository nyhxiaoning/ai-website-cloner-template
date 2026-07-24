'use client';

import { useState } from 'react';
import { useStudio } from '@/hooks/useStudio';
import StudioShell from '@/components/StudioShell';
import RulesView from '@/components/RulesView';
import CreateRuleDialog from '@/components/CreateRuleDialog';

export default function RulesPage() {
  const {
    projects,
    activeProjectId,
    projectRules,
    createRule,
    updateRule,
    deleteRule,
  } = useStudio();

  const [createOpen, setCreateOpen] = useState(false);

  const handleCreate = (data: { key: string; title: string; content: string; description: string; tags: string }) => {
    createRule({
      id: data.key,
      title: data.title || data.key,
      content: data.content,
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <StudioShell>
      <RulesView
        snippets={[]}
        rules={projectRules ?? []}
        onCreateRule={handleCreate}
        onUpdateRule={updateRule}
        onDeleteRule={deleteRule}
      />
      <CreateRuleDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onConfirm={handleCreate}
      />
    </StudioShell>
  );
}
