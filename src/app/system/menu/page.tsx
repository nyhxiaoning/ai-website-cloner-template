'use client';

import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { menuTree as defaultMenuTree, type MenuItemTree } from '@/lib/mock-data';
import { Plus, Edit, Trash2, ChevronRight, Eye, EyeOff, Menu as MenuIcon, X, GripVertical } from 'lucide-react';

const LS_KEY = 'fa_menus';

function useLocalMenus() {
  const [data, setData] = useState<MenuItemTree[]>(defaultMenuTree);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY);
    if (stored) {
      try { setData(JSON.parse(stored)); } catch {}
    }
    setReady(true);
  }, []);

  const persist = useCallback((newData: MenuItemTree[]) => {
    setData(newData);
    localStorage.setItem(LS_KEY, JSON.stringify(newData));
  }, []);

  return { data, ready, persist };
}

interface MenuForm {
  label: string;
  icon: string;
  path: string;
  type: 'menu' | 'button';
  visible: boolean;
  order: number;
  parentId: string;
}

const emptyForm: MenuForm = { label: '', icon: 'Menu', path: '', type: 'menu', visible: true, order: 1, parentId: '' };

const iconOptions = ['Home', 'LayoutDashboard', 'Bell', 'Settings', 'Users', 'UserCheck', 'Menu', 'Grid3X3', 'Table', 'FileText', 'ShoppingCart', 'Package', 'Truck', 'CreditCard', 'DollarSign', 'Star', 'Mail', 'Inbox', 'BookOpen', 'Building2'];

function flattenTree(items: MenuItemTree[], parentPath = ''): { id: string; label: string; depth: number }[] {
  const result: { id: string; label: string; depth: number }[] = [];
  for (const item of items) {
    result.push({ id: item.id, label: item.label, depth: 0 });
    if (item.children) result.push(...flattenTree(item.children, item.id));
  }
  return result;
}

function removeFromTree(items: MenuItemTree[], id: string): MenuItemTree[] {
  return items.filter((item) => {
    if (item.id === id) return false;
    if (item.children) item.children = removeFromTree(item.children, id);
    return true;
  });
}

function addToTree(items: MenuItemTree[], parentId: string, newItem: MenuItemTree): MenuItemTree[] {
  if (!parentId) return [...items, newItem];
  return items.map((item) => {
    if (item.id === parentId) {
      return { ...item, children: [...(item.children || []), newItem] };
    }
    if (item.children) {
      return { ...item, children: addToTree(item.children, parentId, newItem) };
    }
    return item;
  });
}

function updateInTree(items: MenuItemTree[], id: string, updates: Partial<MenuItemTree>): MenuItemTree[] {
  return items.map((item) => {
    if (item.id === id) return { ...item, ...updates };
    if (item.children) return { ...item, children: updateInTree(item.children, id, updates) };
    return item;
  });
}

function moveToParent(items: MenuItemTree[], id: string, newParentId: string): MenuItemTree[] {
  let movedItem: MenuItemTree | null = null;
  const withoutOld = removeFromTree(items, id);
  // Find the item from original
  function findItem(list: MenuItemTree[], targetId: string): MenuItemTree | null {
    for (const item of list) {
      if (item.id === targetId) return item;
      if (item.children) {
        const found = findItem(item.children, targetId);
        if (found) return found;
      }
    }
    return null;
  }
  // We need to reconstruct since removeFromTree gives us the item-less tree
  // Actually simpler: store the item before removing
  // Let me take a different approach - pass the item
  return withoutOld; // placeholder, we'll handle this differently
}

export default function MenuManagementPage() {
  const { data: menus, ready, persist } = useLocalMenus();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['m1', 'm2', 'm3', 'm4', 'm5', 'm6']));
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<MenuForm>(emptyForm);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof MenuForm, string>>>({});
  const [deleteTarget, setDeleteTarget] = useState<MenuItemTree | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const flatItems = flattenTree(menus);

  const validate = (): boolean => {
    const errors: Partial<Record<keyof MenuForm, string>> = {};
    if (!form.label.trim()) errors.label = '请输入菜单名称';
    if (!form.path.trim()) errors.path = '请输入路由路径';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const openAdd = (parentId = '') => {
    setEditingId(null);
    setForm({ ...emptyForm, parentId });
    setFormErrors({});
    setShowModal(true);
  };

  const openEdit = (item: MenuItemTree, parentId = '') => {
    setEditingId(item.id);
    setForm({ label: item.label, icon: item.icon, path: item.path, type: item.type, visible: item.visible, order: item.order, parentId });
    setFormErrors({});
    setShowModal(true);
  };

  const handleSave = () => {
    if (!validate()) return;
    if (editingId) {
      const updated = updateInTree(menus, editingId, {
        label: form.label, icon: form.icon, path: form.path, type: form.type, visible: form.visible, order: form.order,
      });
      persist(updated);
      showToast('菜单已更新');
    } else {
      const newItem: MenuItemTree = {
        id: `m_${Date.now()}`,
        label: form.label,
        icon: form.icon,
        path: form.path,
        type: form.type,
        visible: form.visible,
        order: form.order,
      };
      persist(addToTree(menus, form.parentId, newItem));
      // Expand parent
      if (form.parentId) setExpandedIds((prev) => new Set(prev).add(form.parentId));
      showToast('菜单已创建');
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    const hasChildren = deleteTarget.children && deleteTarget.children.length > 0;
    if (hasChildren) {
      showToast('请先删除子菜单');
      setDeleteTarget(null);
      return;
    }
    persist(removeFromTree(menus, deleteTarget.id));
    showToast('菜单已删除');
    setDeleteTarget(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (!ready) return <DashboardLayout><div className="flex-center h-64 text-muted-foreground">加载中...</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-4">
        {toast && (
          <div className="fixed right-4 top-4 z-[9999] rounded-lg bg-foreground px-4 py-2.5 text-sm text-background shadow-lg animate-in fade-in slide-in-from-top-2">
            {toast}
          </div>
        )}

        <div className="flex-center-between">
          <h1 className="text-2xl font-bold text-foreground">菜单管理</h1>
          <button onClick={() => openAdd('')} className="flex-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="size-4" />
            新增菜单
          </button>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border px-5 py-3">
            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <span className="flex-1">菜单名称</span>
              <span className="w-20 text-center">类型</span>
              <span className="w-16 text-center">排序</span>
              <span className="w-16 text-center">可见</span>
              <span className="w-24 text-center">操作</span>
            </div>
          </div>
          <div className="p-2">
            {menus.length === 0 ? (
              <div className="flex-center h-32 text-sm text-muted-foreground">暂无菜单，点击右上角新增</div>
            ) : (
              menus.map((item) => (
                <MenuItemRow
                  key={item.id}
                  item={item}
                  depth={0}
                  expandedIds={expandedIds}
                  onToggle={toggleExpand}
                  onAdd={openAdd}
                  onEdit={openEdit}
                  onDelete={setDeleteTarget}
                />
              ))
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
              <h2 className="text-lg font-semibold text-foreground">{editingId ? '编辑菜单' : '新增菜单'}</h2>
              <button onClick={() => setShowModal(false)} className="flex-center size-7 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                <X className="size-4" />
              </button>
            </div>
            <div className="space-y-4">
              {!editingId && (
                <Field label="上级菜单">
                  <select value={form.parentId} onChange={(e) => setForm({ ...form, parentId: e.target.value })}
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50">
                    <option value="">顶级菜单</option>
                    {flatItems.map((f) => (
                      <option key={f.id} value={f.id}>{'  '.repeat(f.depth)}{f.label}</option>
                    ))}
                  </select>
                </Field>
              )}
              <Field label="菜单名称" error={formErrors.label}>
                <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })}
                  className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="图标">
                  <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50">
                    {iconOptions.map((ico) => <option key={ico} value={ico}>{ico}</option>)}
                  </select>
                </Field>
                <Field label="排序">
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50" />
                </Field>
              </div>
              <Field label="路由路径" error={formErrors.path}>
                <input value={form.path} onChange={(e) => setForm({ ...form, path: e.target.value })}
                  className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-ring/50" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="类型">
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as 'menu' | 'button' })}
                    className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50">
                    <option value="menu">菜单</option>
                    <option value="button">按钮</option>
                  </select>
                </Field>
                <Field label="可见">
                  <div className="flex gap-3 h-9 items-center">
                    {[true, false].map((v) => (
                      <label key={String(v)} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={form.visible === v} onChange={() => setForm({ ...form, visible: v })}
                          className="size-4 accent-primary" />
                        <span className="text-sm text-foreground">{v ? '可见' : '隐藏'}</span>
                      </label>
                    ))}
                  </div>
                </Field>
              </div>
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
            <p className="mt-2 text-sm text-muted-foreground">
              确定要删除菜单 <span className="font-medium text-foreground">{deleteTarget.label}</span> 吗？
              {deleteTarget.children && deleteTarget.children.length > 0 && (
                <span className="block mt-1 text-destructive">此菜单包含子菜单，请先删除子菜单。</span>
              )}
            </p>
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

function MenuItemRow({
  item, depth, expandedIds, onToggle, onAdd, onEdit, onDelete,
}: {
  item: MenuItemTree; depth: number; expandedIds: Set<string>; onToggle: (id: string) => void;
  onAdd: (parentId: string) => void; onEdit: (item: MenuItemTree, parentId: string) => void; onDelete: (item: MenuItemTree) => void;
}) {
  const hasChildren = !!item.children?.length;
  const expanded = expandedIds.has(item.id);

  return (
    <>
      <div
        className="flex items-center gap-4 rounded-lg px-3 py-2.5 text-sm hover:bg-muted/50 transition-colors group"
        style={{ paddingLeft: `${12 + depth * 24}px` }}
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          {hasChildren ? (
            <button onClick={() => onToggle(item.id)} className="flex-center shrink-0">
              <ChevronRight className={`size-4 text-muted-foreground transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`} />
            </button>
          ) : (
            <span className="w-4 shrink-0" />
          )}
          <MenuIcon className="size-4 text-muted-foreground shrink-0" />
          <span className="text-foreground font-medium truncate">{item.label}</span>
          <span className="text-xs text-muted-foreground hidden sm:inline truncate">{item.path}</span>
        </div>
        <div className="w-20 text-center">
          <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${
            item.type === 'menu'
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
              : 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400'
          }`}>
            {item.type === 'menu' ? '菜单' : '按钮'}
          </span>
        </div>
        <div className="w-16 text-center text-muted-foreground">{item.order}</div>
        <div className="w-16 flex justify-center">
          {item.visible ? <Eye className="size-4 text-muted-foreground" /> : <EyeOff className="size-4 text-muted-foreground/40" />}
        </div>
        <div className="w-24 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(item, '')} className="flex-center size-7 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors" title="编辑">
            <Edit className="size-3.5" />
          </button>
          <button onClick={() => onAdd(item.id)} className="flex-center size-7 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors" title="添加子菜单">
            <Plus className="size-3.5" />
          </button>
          <button onClick={() => onDelete(item)} className="flex-center size-7 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors" title="删除">
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>
      {hasChildren && expanded && item.children!.map((child) => (
        <MenuItemRow key={child.id} item={child} depth={depth + 1} expandedIds={expandedIds} onToggle={onToggle} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </>
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
