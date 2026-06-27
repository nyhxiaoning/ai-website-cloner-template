'use client';

import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { users as defaultUsers, type UserItem } from '@/lib/mock-data';
import {
  Search, Plus, Edit, Trash2, X, ChevronLeft, ChevronRight,
} from 'lucide-react';

const LS_KEY = 'fa_users';
const departments = ['技术部', '运营部', '市场部', '内容部', '人事部', '财务部'];
const roles = ['超级管理员', '管理员', '编辑', '普通用户', '访客'];

function useLocalUsers() {
  const [data, setData] = useState<UserItem[]>(defaultUsers);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY);
    if (stored) {
      try { setData(JSON.parse(stored)); } catch {}
    }
    setReady(true);
  }, []);

  const persist = useCallback((newData: UserItem[]) => {
    setData(newData);
    localStorage.setItem(LS_KEY, JSON.stringify(newData));
  }, []);

  return { data, ready, persist };
}

interface UserForm {
  name: string;
  email: string;
  role: string;
  department: string;
  status: '启用' | '禁用';
}

const emptyForm: UserForm = { name: '', email: '', role: '普通用户', department: '技术部', status: '启用' };

export default function UserManagementPage() {
  const { data: users, ready, persist } = useLocalUsers();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<UserForm>(emptyForm);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof UserForm, string>>>({});
  const [deleteTarget, setDeleteTarget] = useState<UserItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const pageSize = 5;

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Reset page when search changes
  useEffect(() => { setCurrentPage(1); }, [search]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormErrors({});
    setShowModal(true);
  };

  const openEdit = (user: UserItem) => {
    setEditingId(user.id);
    setForm({ name: user.name, email: user.email, role: user.role, department: user.department, status: user.status });
    setFormErrors({});
    setShowModal(true);
  };

  const validate = (): boolean => {
    const errors: Partial<Record<keyof UserForm, string>> = {};
    if (!form.name.trim()) errors.name = '请输入用户名';
    if (!form.email.trim()) errors.email = '请输入邮箱';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = '邮箱格式不正确';
    if (!form.role) errors.role = '请选择角色';
    if (!form.department) errors.department = '请选择部门';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    if (editingId) {
      const updated = users.map((u) =>
        u.id === editingId ? { ...u, ...form } : u
      );
      persist(updated);
      showToast('用户已更新');
    } else {
      const newUser: UserItem = {
        id: String(Date.now()),
        ...form,
        createdTime: new Date().toISOString().slice(0, 10),
      };
      persist([newUser, ...users]);
      showToast('用户已创建');
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    persist(users.filter((u) => u.id !== deleteTarget.id));
    showToast('用户已删除');
    setDeleteTarget(null);
  };

  if (!ready) return <DashboardLayout><div className="flex-center h-64 text-muted-foreground">加载中...</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-4">
        {/* Toast */}
        {toast && (
          <div className="fixed right-4 top-4 z-[9999] rounded-lg bg-foreground px-4 py-2.5 text-sm text-background shadow-lg animate-in fade-in slide-in-from-top-2">
            {toast}
          </div>
        )}

        <div className="flex-center-between">
          <h1 className="text-2xl font-bold text-foreground">用户管理</h1>
          <button onClick={openAdd} className="flex-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="size-4" />
            新增用户
          </button>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="搜索用户名或邮箱..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
          />
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">用户</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">邮箱</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">角色</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">部门</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">状态</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">创建时间</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-sm text-muted-foreground">
                      {search ? '未找到匹配的用户' : '暂无用户数据'}
                    </td>
                  </tr>
                ) : (
                  paginated.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-center size-8 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            {user.name[0]}
                          </div>
                          <span className="font-medium text-foreground">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                      <td className="px-4 py-3 text-foreground">{user.role}</td>
                      <td className="px-4 py-3 text-muted-foreground">{user.department}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          user.status === '启用'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                            : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                        }`}>
                          <span className={`size-1.5 rounded-full ${user.status === '启用' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{user.createdTime}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(user)} className="flex-center size-7 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                            <Edit className="size-3.5" />
                          </button>
                          <button onClick={() => setDeleteTarget(user)} className="flex-center size-7 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex-center-between border-t border-border px-4 py-3">
            <span className="text-xs text-muted-foreground">共 {filtered.length} 条，第 {currentPage}/{totalPages || 1} 页</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage <= 1}
                className="flex-center h-7 w-7 rounded-md text-xs text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors">
                <ChevronLeft className="size-3.5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setCurrentPage(p)}
                  className={`flex-center h-7 min-w-7 rounded-md text-xs font-medium transition-colors ${p === currentPage ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}>
                  {p}
                </button>
              ))}
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages}
                className="flex-center h-7 w-7 rounded-md text-xs text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors">
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95">
            <div className="flex-center-between mb-5">
              <h2 className="text-lg font-semibold text-foreground">{editingId ? '编辑用户' : '新增用户'}</h2>
              <button onClick={() => setShowModal(false)} className="flex-center size-7 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                <X className="size-4" />
              </button>
            </div>
            <div className="space-y-4">
              <Field label="用户名" error={formErrors.name}>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50" />
              </Field>
              <Field label="邮箱" error={formErrors.email}>
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="角色" error={formErrors.role}>
                  <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50">
                    {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </Field>
                <Field label="部门" error={formErrors.department}>
                  <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50">
                    {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="状态">
                <div className="flex gap-3">
                  {(['启用', '禁用'] as const).map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="status" checked={form.status === s} onChange={() => setForm({ ...form, status: s })}
                        className="size-4 accent-primary" />
                      <span className="text-sm text-foreground">{s}</span>
                    </label>
                  ))}
                </div>
              </Field>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowModal(false)} className="rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">取消</button>
              <button onClick={handleSave} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                {editingId ? '保存' : '创建'}
              </button>
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
            <p className="mt-2 text-sm text-muted-foreground">确定要删除用户 <span className="font-medium text-foreground">{deleteTarget.name}</span> 吗？此操作不可撤销。</p>
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
