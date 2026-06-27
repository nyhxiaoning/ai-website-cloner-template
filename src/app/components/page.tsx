'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import {
  ChevronDown, Loader2, Search, Plus, X, Trash2, Bell, Home, Settings, Star, Inbox,
  AlertCircle, Info, CheckCircle2,
} from 'lucide-react';

type ButtonDemo = { label: string; variant: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'; size?: 'default' | 'sm' | 'lg' | 'xs' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg' };

const componentSections: { title: string; items: ButtonDemo[] }[] = [
  {
    title: '按钮 Button',
    items: [
      { label: '默认按钮', variant: 'default' },
      { label: '次要按钮', variant: 'secondary' },
      { label: '轮廓按钮', variant: 'outline' },
      { label: '幽灵按钮', variant: 'ghost' },
      { label: '危险按钮', variant: 'destructive' },
      { label: '链接按钮', variant: 'link' },
    ],
  },
  {
    title: '按钮尺寸',
    items: [
      { label: '小尺寸', variant: 'default', size: 'sm' },
      { label: '默认尺寸', variant: 'default', size: 'default' },
      { label: '大尺寸', variant: 'default', size: 'lg' },
    ],
  },
];

export default function ComponentsPage() {
  const [copied, setCopied] = useState(false);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">组件示例</h1>
          <p className="mt-1 text-sm text-muted-foreground">常用 UI 组件展示与使用示例</p>
        </div>

        {/* Buttons */}
        <Section title="按钮 Button">
          <div className="flex flex-wrap gap-3">
            {componentSections[0].items.map((btn) => (
              <Button key={btn.label} variant={btn.variant}>
                {btn.label}
              </Button>
            ))}
          </div>
        </Section>

        {/* Button sizes */}
        <Section title="按钮尺寸">
          <div className="flex flex-wrap items-center gap-3">
            {componentSections[1].items.map((btn) => (
              <Button key={btn.label} variant={btn.variant} size={btn.size}>
                {btn.label}
              </Button>
            ))}
          </div>
        </Section>

        {/* Button states */}
        <Section title="按钮状态">
          <div className="flex flex-wrap gap-3">
            <Button disabled>禁用状态</Button>
            <Button>
              <Loader2 className="size-4 animate-spin" />
              加载中
            </Button>
            <Button variant="outline">
              <Plus className="size-4" />
              带图标
            </Button>
            <Button variant="outline">
              带图标
              <ChevronDown className="size-4" />
            </Button>
          </div>
        </Section>

        {/* Icon buttons */}
        <Section title="图标按钮">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="icon"><Search className="size-4" /></Button>
            <Button variant="outline" size="icon"><Bell className="size-4" /></Button>
            <Button variant="outline" size="icon"><Settings className="size-4" /></Button>
            <Button variant="outline" size="icon"><Home className="size-4" /></Button>
            <Button variant="outline" size="icon"><Star className="size-4" /></Button>
            <Button variant="destructive" size="icon"><Trash2 className="size-4" /></Button>
            <Button size="icon"><Plus className="size-4" /></Button>
          </div>
        </Section>

        {/* Tags / Badges */}
        <Section title="标签 Badge">
          <div className="flex flex-wrap gap-2">
            {['默认', 'Primary', '成功', '警告', '危险', '信息'].map((tag) => {
              const colors: Record<string, string> = {
                '默认': 'bg-muted text-muted-foreground',
                'Primary': 'bg-primary text-primary-foreground',
                '成功': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
                '警告': 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
                '危险': 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400',
                '信息': 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
              };
              return (
                <span key={tag} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[tag] || colors['默认']}`}>
                  {tag}
                  <X className="size-3 cursor-pointer opacity-60 hover:opacity-100" />
                </span>
              );
            })}
          </div>
        </Section>

        {/* Status indicators */}
        <Section title="状态指示">
          <div className="flex flex-wrap gap-4">
            {[
              { label: '进行中', color: 'bg-blue-500' },
              { label: '已完成', color: 'bg-emerald-500' },
              { label: '待处理', color: 'bg-amber-500' },
              { label: '已关闭', color: 'bg-muted-foreground' },
              { label: '错误', color: 'bg-red-500' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-foreground">
                <span className={`size-2 rounded-full ${item.color}`} />
                {item.label}
              </div>
            ))}
          </div>
        </Section>

        {/* Alert banners */}
        <Section title="提示横幅 Alert">
          <div className="space-y-2">
            {[
              { icon: Info, label: '提示信息', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-200 dark:border-blue-500/20' },
              { icon: CheckCircle2, label: '成功提示', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/20' },
              { icon: AlertCircle, label: '警告信息', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/20' },
              { icon: AlertCircle, label: '错误信息', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-500/10', border: 'border-red-200 dark:border-red-500/20' },
            ].map((alert) => (
              <div key={alert.label} className={`flex items-start gap-3 rounded-lg border ${alert.border} ${alert.bg} p-3`}>
                <alert.icon className={`size-5 mt-0.5 shrink-0 ${alert.color}`} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${alert.color}`}>{alert.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">这是一条{alert.label}类型的提示信息。</p>
                </div>
                <X className="size-4 text-muted-foreground cursor-pointer hover:text-foreground shrink-0" />
              </div>
            ))}
          </div>
        </Section>

        {/* Skeleton */}
        <Section title="骨架屏 Skeleton">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-1/3 rounded bg-muted animate-pulse" />
                <div className="h-2 w-1/2 rounded bg-muted animate-pulse" />
              </div>
            </div>
            <div className="h-24 rounded-lg bg-muted animate-pulse" />
            <div className="flex gap-2">
              <div className="h-8 flex-1 rounded-lg bg-muted animate-pulse" />
              <div className="h-8 w-20 rounded-lg bg-muted animate-pulse" />
            </div>
          </div>
        </Section>

        {/* Empty state */}
        <Section title="空状态 Empty">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex-center size-16 rounded-full bg-muted mb-4">
              <Inbox className="size-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-base font-medium text-foreground">暂无数据</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-xs">当前没有可显示的内容，请稍后再来查看。</p>
            <Button variant="outline" className="mt-4">
              <Plus className="size-4" />
              新建
            </Button>
          </div>
        </Section>
      </div>
    </DashboardLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border px-5 py-3">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
