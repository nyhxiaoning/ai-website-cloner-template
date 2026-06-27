'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useTheme } from '@/components/ThemeProvider';
import { Sun, Moon, Monitor, Bell, Shield, Eye, Save } from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifyLogin, setNotifyLogin] = useState(true);
  const [notifySystem, setNotifySystem] = useState(true);
  const [notifyMessage, setNotifyMessage] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold text-foreground">系统设置</h1>

        {saved && (
          <div className="rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-4 py-2.5 text-sm text-emerald-700 dark:text-emerald-400">
            设置已保存
          </div>
        )}

        {/* Theme */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-center size-9 rounded-lg bg-primary/10 text-primary"><Sun className="size-4" /></div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">主题设置</h2>
              <p className="text-xs text-muted-foreground">选择界面主题风格</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'light', label: '浅色', icon: Sun },
              { value: 'dark', label: '深色', icon: Moon },
              { value: 'system', label: '跟随系统', icon: Monitor },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setTheme(value as 'light' | 'dark' | 'system')}
                className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                  theme === value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-muted-foreground/30'
                }`}
              >
                <Icon className={`size-6 ${theme === value ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-sm font-medium ${theme === value ? 'text-primary' : 'text-foreground'}`}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-center size-9 rounded-lg bg-primary/10 text-primary"><Bell className="size-4" /></div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">通知设置</h2>
              <p className="text-xs text-muted-foreground">管理消息通知偏好</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { key: 'login', label: '登录通知', desc: '新设备登录时发送通知提醒', value: notifyLogin, set: setNotifyLogin },
              { key: 'system', label: '系统通知', desc: '系统更新、维护等通知', value: notifySystem, set: setNotifySystem },
              { key: 'message', label: '私信通知', desc: '收到新消息时通知', value: notifyMessage, set: setNotifyMessage },
            ].map(({ key, label, desc, value, set }) => (
              <label key={key} className="flex items-center justify-between rounded-lg border border-border px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors">
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
                <div
                  onClick={() => set(!value)}
                  className={`relative h-5 w-9 shrink-0 rounded-full transition-colors cursor-pointer ${value ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                >
                  <div className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${value ? 'translate-x-4' : ''}`} />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-center size-9 rounded-lg bg-primary/10 text-primary"><Shield className="size-4" /></div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">安全设置</h2>
              <p className="text-xs text-muted-foreground">账号安全与隐私</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: '修改密码', desc: '建议定期更换密码以保护账号安全' },
              { label: '两步验证', desc: '增加登录安全验证，保护账号不被盗用' },
            ].map(({ label, desc }) => (
              <div key={label} className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
                <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors">去设置</button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pb-6">
          <button onClick={handleSave} className="flex-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Save className="size-4" />保存设置
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
