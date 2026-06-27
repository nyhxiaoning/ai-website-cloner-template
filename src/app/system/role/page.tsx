'use client';

import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { roles as defaultRoles, permissions as defaultPermissions, type RoleItem, type PermissionItem } from '@/lib/mock-data';
import { Plus, Edit, Trash2, Shield, ChevronRight, Check, X } from 'lucide-react';

const LS_ROLES = 'fa_roles';
const LS_PERMS = 'fa_role_perms';

interface RolePerms {
  [roleId: string]: string[];
}

function collectGroupIds(items: PermissionItem[]): string[] {
  const ids: string[] = [];
  for (const item of items) {
    if (item.children && item.children.length > 0) {
      ids.push(item.id);
      ids.push(...collectGroupIds(item.children));
    }
  }
  return ids;
}

const allGroupIds = collectGroupIds(defaultPermissions);

const defaultPerms: RolePerms = {
  '1': ['system:user:create', 'system:user:edit', 'system:user:delete', 'system:role:create', 'system:role:edit', 'system:role:delete', 'system:menu:create', 'system:menu:edit', 'system:menu:delete', 'content:article:publish', 'content:article:edit', 'content:article:delete', 'content:category', 'data:view', 'data:export'],
  '2': ['system:user:create', 'system:user:edit', 'system:role:create', 'system:role:edit', 'content:article:publish', 'content:article:edit', 'content:category', 'data:view', 'data:export'],
  '3': ['content:article:publish', 'content:article:edit', 'content:category', 'data:view'],
  '4': ['data:view'],
  '5': [],
};

interface RoleForm {
  name: string;
  code: string;
  desc: string;
  status: '启用' | '禁用';
}

const emptyForm: RoleForm = { name: '', code: '', desc: '', status: '启用' };

function getAllPermissionKeys(items: PermissionItem[]): string[] {
  const keys: string[] = [];
  for (const item of items) {
    if (item.children) keys.push(...getAllPermissionKeys(item.children));
    else keys.push(item.key);
  }
  return keys;
}

export default function RoleManagementPage() {
  const [roles, setRoles] = useState<RoleItem[]>(defaultRoles);
  const [rolePerms, setRolePerms] = useState<RolePerms>(defaultPerms);
  const [rolesReady, setRolesReady] = useState(false);
  const [permsReady, setPermsReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LS_ROLES);
    if (stored) { try { setRoles(JSON.parse(stored)); } catch {} }
    setRolesReady(true);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(LS_PERMS);
    if (stored) { try { setRolePerms(JSON.parse(stored)); } catch {} }
    setPermsReady(true);
  }, []);

  const updateRoles = useCallback((newRoles: RoleItem[]) => {
    setRoles(newRoles);
    localStorage.setItem(LS_ROLES, JSON.stringify(newRoles));
  }, []);

  const updatePerms = useCallback((newPerms: RolePerms) => {
    setRolePerms(newPerms);
    localStorage.setItem(LS_PERMS, JSON.stringify(newPerms));
  }, []);

  const [selectedRole, setSelectedRole] = useState<string | null>('1');
  const [expandedPerms, setExpandedPerms] = useState<Set<string>>(new Set(allGroupIds));
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<RoleForm>(emptyForm);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof RoleForm, string>>>({});
  const [deleteTarget, setDeleteTarget] = useState<RoleItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedPerms((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const currentRole = roles.find((r) => r.id === selectedRole);
  const currentPermKeys = (selectedRole && rolePerms[selectedRole]) || [];

  const handleTogglePerm = (permKey: string) => {
    if (!selectedRole) return;
    const current = rolePerms[selectedRole] || [];
    let updated: string[];
    if (current.includes(permKey)) {
      updated = current.filter((k) => k !== permKey);
    } else {
      updated = [...current, permKey];
    }
    const newPerms = { ...rolePerms, [selectedRole]: updated };
    setRolePerms(newPerms);
    localStorage.setItem(LS_PERMS, JSON.stringify(newPerms));
    setToast(updated.includes(permKey) ? '已分配权限' : '已取消权限');
    setTimeout(() => setToast(null), 1200);
  };

  const selectAllPerms = () => {
    if (!selectedRole) return;
    const allKeys = getAllPermissionKeys(defaultPermissions);
    const newPerms = { ...rolePerms, [selectedRole]: allKeys };
    setRolePerms(newPerms);
    localStorage.setItem(LS_PERMS, JSON.stringify(newPerms));
  };

  const deselectAllPerms = () => {
    if (!selectedRole) return;
    const newPerms = { ...rolePerms, [selectedRole]: [] };
    setRolePerms(newPerms);
    localStorage.setItem(LS_PERMS, JSON.stringify(newPerms));
  };

  // CRUD handlers
  const openAdd = () => { setEditingId(null); setForm(emptyForm); setFormErrors({}); setShowModal(true); };
  const openEdit = (role: RoleItem) => { setEditingId(role.id); setForm({ name: role.name, code: role.code, desc: role.desc, status: role.status }); setFormErrors({}); setShowModal(true); };

  const validate = () => {
    const errors: Partial<Record<keyof RoleForm, string>> = {};
    if (!form.name.trim()) errors.name = '请输入角色名称';
    if (!form.code.trim()) errors.code = '请输入角色编码';
    else if (!/^[a-z_]+$/.test(form.code)) errors.code = '编码只能包含小写字母和下划线';
    if (!form.desc.trim()) errors.desc = '请输入角色描述';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (editingId) {
      const updated = roles.map((r) => r.id === editingId ? { ...r, ...form } : r);
      setRoles(updated);
      localStorage.setItem(LS_ROLES, JSON.stringify(updated));
      showToast('角色已更新');
    } else {
      const newRole: RoleItem = { id: String(Date.now()), ...form, userCount: 0, createdTime: new Date().toISOString().slice(0, 10) };
      const updatedRoles = [...roles, newRole];
      setRoles(updatedRoles);
      localStorage.setItem(LS_ROLES, JSON.stringify(updatedRoles));
      const updatedPerms = { ...rolePerms, [newRole.id]: [] };
      setRolePerms(updatedPerms);
      localStorage.setItem(LS_PERMS, JSON.stringify(updatedPerms));
      showToast('角色已创建');
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    const updatedRoles = roles.filter((r) => r.id !== deleteTarget.id);
    setRoles(updatedRoles);
    localStorage.setItem(LS_ROLES, JSON.stringify(updatedRoles));
    const { [deleteTarget.id]: _, ...restPerms } = rolePerms;
    setRolePerms(restPerms);
    localStorage.setItem(LS_PERMS, JSON.stringify(restPerms));
    showToast('角色已删除');
    if (selectedRole === deleteTarget.id) setSelectedRole(roles[0]?.id || null);
    setDeleteTarget(null);
  };

  const ready = rolesReady && permsReady;
  if (!ready) return <DashboardLayout><div className="flex-center h-64 text-muted-foreground">加载中...</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-4">
        {toast && (
          <div className="fixed right-4 top-4 z-[9999] rounded-lg bg-foreground px-4 py-2.5 text-sm text-background shadow-lg animate-in fade-in slide-in-from-top-2">
            {toast}
          </div>
        )}

        <div className="flex-center-between">
          <h1 className="text-2xl font-bold text-foreground">角色管理</h1>
          <button onClick={openAdd} className="flex-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="size-4" />新增角色
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* Role list */}
          <div className="rounded-lg border border-border bg-card">
            <div className="border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold text-foreground">角色列表</h2>
            </div>
            <div className="divide-y divide-border">
              {roles.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">暂无角色</div>
              ) : (
                roles.map((role) => (
                  <div key={role.id} className="group relative">
                    <button
                      onClick={() => setSelectedRole(role.id)}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/30 ${selectedRole === role.id ? 'bg-primary/5' : ''}`}
                    >
                      <div className={`flex-center size-9 shrink-0 rounded-lg ${
                        role.code === 'super_admin' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                        role.code === 'admin' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        <Shield className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{role.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{role.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-muted-foreground">{role.userCount}人</span>
                        <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${
                          role.status === '启用'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                            : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                        }`}>{role.status}</span>
                      </div>
                    </button>
                    <div className="absolute right-2 top-2 hidden group-hover:flex items-center gap-0.5">
                      <button onClick={(e) => { e.stopPropagation(); openEdit(role); }} className="flex-center size-6 rounded text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"><Edit className="size-3" /></button>
                      <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(role); }} className="flex-center size-6 rounded text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"><Trash2 className="size-3" /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Permission matrix */}
          <div className="rounded-lg border border-border bg-card">
            <div className="flex-center-between border-b border-border px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-foreground">权限配置</h2>
                {currentRole && <p className="text-xs text-muted-foreground mt-0.5">当前角色：{currentRole.name}</p>}
              </div>
              {currentRole && (
                <div className="flex items-center gap-2">
                  <button onClick={selectAllPerms} className="text-xs text-primary hover:underline">全选</button>
                  <button onClick={deselectAllPerms} className="text-xs text-muted-foreground hover:text-foreground">取消全选</button>
                </div>
              )}
            </div>
            {!currentRole ? (
              <div className="flex-center h-48 text-sm text-muted-foreground">请选择一个角色</div>
            ) : (
              <div className="p-4 space-y-1">
                {defaultPermissions.map((perm) => (
                  <div key={perm.id}>
                    <button
                      onClick={() => toggleExpand(perm.id)}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left hover:bg-muted/50 transition-colors"
                    >
                      <ChevronRight className={`size-4 text-muted-foreground transition-transform duration-200 ${expandedPerms.has(perm.id) ? 'rotate-90' : ''}`} />
                      <span className="text-sm font-medium text-foreground flex-1">{perm.name}</span>
                      <span className="text-xs text-muted-foreground">({perm.key})</span>
                    </button>
                    {expandedPerms.has(perm.id) && perm.children && (
                      <div className="ml-6 space-y-0.5 border-l border-border pl-4">
                        {perm.children.map((child) => (
                          <div key={child.id}>
                            {child.children ? (
                              <>
                                <button
                                  onClick={() => toggleExpand(child.id)}
                                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left hover:bg-muted/30 transition-colors"
                                >
                                  <ChevronRight className={`size-3.5 text-muted-foreground transition-transform duration-200 ${expandedPerms.has(child.id) ? 'rotate-90' : ''}`} />
                                  <span className="text-sm text-foreground">{child.name}</span>
                                  <span className="text-xs text-muted-foreground">({child.key})</span>
                                </button>
                                {expandedPerms.has(child.id) && (
                                  <div className="ml-6 space-y-0.5">
                                    {child.children.map((leaf) => (
                                      <div
                                        key={leaf.id}
                                        onClick={() => handleTogglePerm(leaf.key)}
                                        className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 hover:bg-muted/30 transition-colors cursor-pointer select-none"
                                      >
                                        <div className={`flex-center size-4 shrink-0 rounded border transition-colors ${
                                          currentPermKeys.includes(leaf.key)
                                            ? 'border-primary bg-primary text-primary-foreground'
                                            : 'border-border bg-background'
                                        }`}>
                                          {currentPermKeys.includes(leaf.key) && <Check className="size-3" />}
                                        </div>
                                        <span className="text-sm text-foreground">{leaf.name}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </>
                            ) : (
                              <div
                                onClick={() => handleTogglePerm(child.key)}
                                className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 hover:bg-muted/30 transition-colors cursor-pointer select-none"
                              >
                                <div className={`flex-center size-4 shrink-0 rounded border transition-colors ${
                                  currentPermKeys.includes(child.key)
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'border-border bg-background'
                                }`}>
                                  {currentPermKeys.includes(child.key) && <Check className="size-3" />}
                                </div>
                                <span className="text-sm text-foreground">{child.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95">
            <div className="flex-center-between mb-5">
              <h2 className="text-lg font-semibold text-foreground">{editingId ? '编辑角色' : '新增角色'}</h2>
              <button onClick={() => setShowModal(false)} className="flex-center size-7 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"><X className="size-4" /></button>
            </div>
            <div className="space-y-4">
              <Field label="角色名称" error={formErrors.name}>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50" />
              </Field>
              <Field label="角色编码" error={formErrors.code}>
                <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-ring/50" />
              </Field>
              <Field label="描述" error={formErrors.desc}>
                <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className="h-20 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring/50" />
              </Field>
              <Field label="状态">
                <div className="flex gap-3">
                  {(['启用', '禁用'] as const).map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="status" checked={form.status === s} onChange={() => setForm({ ...form, status: s })} className="size-4 accent-primary" />
                      <span className="text-sm text-foreground">{s}</span>
                    </label>
                  ))}
                </div>
              </Field>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowModal(false)} className="rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">取消</button>
              <button onClick={handleSave} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">{editingId ? '保存' : '创建'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDeleteTarget(null)} />
          <div className="relative w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95">
            <h2 className="text-lg font-semibold text-foreground">确认删除</h2>
            <p className="mt-2 text-sm text-muted-foreground">确定要删除角色 <span className="font-medium text-foreground">{deleteTarget.name}</span> 吗？</p>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setDeleteTarget(null)} className="rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">取消</button>
              <button onClick={handleDelete} className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors">删除</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
