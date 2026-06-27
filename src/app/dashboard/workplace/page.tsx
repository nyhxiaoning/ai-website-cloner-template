'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { workplaceStats, recentProjects, quickNavs } from '@/lib/mock-data';
import { Plus, Briefcase, CheckSquare, Users, Target, ArrowRight, Clock, User } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase className="size-5" />,
  CheckSquare: <CheckSquare className="size-5" />,
  Users: <Users className="size-5" />,
  Target: <Target className="size-5" />,
};

const statusColors: Record<string, string> = {
  '进行中': 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
  '已完成': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
  '已暂停': 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
};

export default function WorkplacePage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Welcome banner */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/10 p-6">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-foreground">早上好，Admin 👋</h1>
              <p className="mt-1 text-sm text-muted-foreground">欢迎回来，以下是您的工作台概览。</p>
            </div>
            <div className="flex gap-3">
              {quickNavs.map((nav) => (
                <button key={nav.label} className={`flex-center size-10 rounded-lg ${nav.bgColor} ${nav.color} transition-all hover:scale-105`} title={nav.label}>
                  {nav.icon === 'Plus' ? <Plus className="size-5" /> :
                   nav.icon === 'Mail' ? <ArrowRight className="size-5" /> :
                   nav.icon === 'Calendar' ? <Clock className="size-5" /> :
                   <Briefcase className="size-5" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workplaceStats.map((stat) => (
            <div key={stat.title} className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <div className="flex-center-between">
                <span className="text-sm text-muted-foreground">{stat.title}</span>
                <div className={`flex-center size-9 rounded-lg ${stat.color.replace('bg-', 'bg-').replace('500', '100')} dark:${stat.color.replace('bg-', 'bg-').replace('500', '500/20')}`}>
                  {iconMap[stat.icon] || <Briefcase className="size-5" />}
                </div>
              </div>
              <p className="mt-2 text-2xl font-bold text-card-foreground">{stat.value}</p>
              <p className={`mt-1 text-xs ${stat.trendUp ? 'text-emerald-500' : 'text-red-500'}`}>{stat.trend} 较上月</p>
            </div>
          ))}
        </div>

        {/* Recent projects */}
        <div className="rounded-lg border border-border bg-card shadow-sm">
          <div className="flex-center-between border-b border-border px-5 py-4">
            <h2 className="text-base font-semibold text-card-foreground">近期项目</h2>
            <button className="text-sm text-primary hover:underline">查看全部</button>
          </div>
          <div className="divide-y divide-border">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{project.name}</span>
                    <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${statusColors[project.status]}`}>{project.status}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground truncate">{project.desc}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                  <div className="flex items-center gap-1">
                    <div className="flex -space-x-1.5">
                      {Array.from({ length: Math.min(project.members, 3) }).map((_, i) => (
                        <div key={i} className="flex-center size-6 rounded-full bg-primary/10 text-primary text-[10px] font-medium ring-2 ring-card"><User className="size-3" /></div>
                      ))}
                      {project.members > 3 && <span className="flex-center size-6 rounded-full bg-muted text-[10px] text-muted-foreground ring-2 ring-card">+{project.members - 3}</span>}
                    </div>
                  </div>
                  <span>截止 {project.deadline}</span>
                  {project.status !== '已完成' && (
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${project.progress}%` }} />
                      </div>
                      <span>{project.progress}%</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
