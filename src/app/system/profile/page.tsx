'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { mockUser } from '@/lib/mock-data';
import { User, Mail, Shield, Calendar, Save } from 'lucide-react';

export default function ProfilePage() {
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState('admin@example.com');
  const [role] = useState(mockUser.role);
  const [phone, setPhone] = useState('138-0000-0000');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold text-foreground">个人中心</h1>

        {/* Toast */}
        {saved && (
          <div className="rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-4 py-2.5 text-sm text-emerald-700 dark:text-emerald-400">
            个人信息已保存
          </div>
        )}

        {/* Avatar & Basic Info */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="flex-center size-20 shrink-0 rounded-full bg-primary/10 text-primary">
              <span className="text-2xl font-bold">{mockUser.name[0]}</span>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-semibold text-foreground">{mockUser.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{mockUser.role}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Mail className="size-3.5" /> admin@example.com
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Shield className="size-3.5" /> 超级管理员
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="size-3.5" /> 2024-01-01 加入
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-base font-semibold text-foreground mb-5">基本信息</h2>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">用户名</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  <input value={name} onChange={(e) => setName(e.target.value)} className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">邮箱</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">手机号</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">角色</label>
                <input value={role} disabled className="h-9 w-full rounded-lg border border-border bg-muted px-3 text-sm text-muted-foreground cursor-not-allowed" />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button onClick={handleSave} className="flex-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              <Save className="size-4" />保存
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
