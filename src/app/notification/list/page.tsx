'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { notifications, type NotificationItem } from '@/lib/mock-data';
import { Bell, Mail, AlertCircle, CheckCheck, CheckCircle2, MoreVertical } from 'lucide-react';

const typeIcons: Record<string, React.ReactNode> = {
  system: <Bell className="size-5 text-primary" />,
  message: <Mail className="size-5 text-emerald-500" />,
  alert: <AlertCircle className="size-5 text-destructive" />,
};

const tabs = ['全部', '未读', '系统通知', '私信', '提醒'];

export default function NotificationListPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [items, setItems] = useState(notifications);

  const unreadCount = items.filter((n) => !n.read).length;

  const filtered = activeTab === 0 ? items :
    activeTab === 1 ? items.filter((n) => !n.read) :
    activeTab === 2 ? items.filter((n) => n.type === 'system') :
    activeTab === 3 ? items.filter((n) => n.type === 'message') :
    items.filter((n) => n.type === 'alert');

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: !n.read } : n));
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-4">
        {/* Header */}
        <div className="flex-center-between">
          <h1 className="text-2xl font-bold text-foreground">消息中心</h1>
          <button onClick={markAllRead} className="flex-center gap-1.5 text-sm text-primary hover:underline">
            <CheckCheck className="size-4" />
            全部标为已读
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-0 border-b border-border">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`relative px-4 py-2.5 text-sm transition-colors whitespace-nowrap ${
                activeTab === i
                  ? 'text-foreground font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
              {tab === '未读' && unreadCount > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center h-4 min-w-4 rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">{unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Notification list */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <CheckCircle2 className="size-12 mb-3 opacity-40" />
              <p className="text-sm">暂无消息</p>
            </div>
          ) : (
            filtered.map((item) => (
              <NotificationCard key={item.id} item={item} onToggleRead={toggleRead} />
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function NotificationCard({ item, onToggleRead }: { item: NotificationItem; onToggleRead: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`group relative rounded-lg border border-border p-4 transition-colors hover:bg-muted/30 cursor-pointer ${
        !item.read ? 'bg-primary/[0.03] border-primary/10' : 'bg-card'
      }`}
      onClick={() => onToggleRead(item.id)}
    >
      <div className="flex gap-3">
        <div className={`relative mt-0.5 flex-center size-10 shrink-0 rounded-full ${
          !item.read ? 'bg-primary/10' : 'bg-muted'
        }`}>
          {typeIcons[item.type]}
          {!item.read && (
            <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-primary ring-2 ring-background" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className={`text-sm ${!item.read ? 'font-semibold text-foreground' : 'font-medium text-foreground'}`}>
                {item.title}
              </span>
              <span className="ml-2 text-xs text-muted-foreground">{item.time}</span>
            </div>
            <div className="relative shrink-0">
              <button
                onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
                className="flex-center size-7 rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-accent transition-all"
              >
                <MoreVertical className="size-4" />
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 top-full z-50 mt-0.5 w-28 rounded-lg border border-border bg-popover p-1 shadow-lg">
                    <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-foreground hover:bg-accent transition-colors">
                      {item.read ? '标为未读' : '标为已读'}
                    </button>
                    <button className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-destructive hover:bg-destructive/10 transition-colors">
                      删除
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <p className={`mt-1 text-sm leading-relaxed ${
            !item.read ? 'text-foreground/80' : 'text-muted-foreground'
          }`}>
            {item.content}
          </p>
        </div>
      </div>
    </div>
  );
}
