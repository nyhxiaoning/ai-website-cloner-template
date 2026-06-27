'use client';

import { useState, useCallback, useEffect, createContext, useContext, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Menu, Bell, Search, Sun, Moon, Maximize2, Minimize2, User, ChevronLeft, ChevronDown, ChevronRight,
  LogOut, Settings, X, Home, LayoutDashboard, Users, UserCheck, Grid3X3, Table as TableIcon,
} from '@/components/icons';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MenuItem } from '@/types';
import { sidebarMenuItems, mockUser, defaultTabs } from '@/lib/mock-data';
import { useTheme } from './ThemeProvider';

const iconMap: Record<string, LucideIcon> = {
  Home, LayoutDashboard, Bell, Settings, Users, UserCheck, Menu, Grid3X3, Table: TableIcon,
};

function MenuItemIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name];
  return Icon ? <Icon className={className || 'size-5'} /> : null;
}

interface SidebarContextValue { collapsed: boolean; mobileOpen: boolean; toggle: () => void; closeMobile: () => void; onNavigate?: (path: string) => void; }
const SidebarContext = createContext<SidebarContextValue>({ collapsed: false, mobileOpen: false, toggle: () => {}, closeMobile: () => {} });
export function useSidebar() { return useContext(SidebarContext); }

function SidebarNavItem({ item, collapsed, depth = 0, onNavigate, activePath }: { item: MenuItem; collapsed: boolean; depth?: number; onNavigate?: (path: string) => void; activePath?: string }) {
  const hasChildren = !!item.children?.length;
  const isActive = item.path === activePath;
  const hasActiveChild = hasActiveChildAt(item, activePath);
  const defaultExpanded = hasActiveChild || isActive;
  const [expanded, setExpanded] = useState(defaultExpanded);

  useEffect(() => {
    if (defaultExpanded && !expanded) setExpanded(true);
  }, [defaultExpanded]);

  return (
    <div>
      <button
        onClick={() => { if (hasChildren) setExpanded((p) => !p); else onNavigate?.(item.path); }}
        className={cn(
          'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
          isActive
            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
            : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground',
          depth > 0 && 'ml-3',
        )}
      >
        <MenuItemIcon name={item.icon} className="size-5 shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 text-left truncate">{item.label}</span>
            {item.badge && <span className="flex-center h-5 min-w-5 shrink-0 rounded-full bg-destructive px-1.5 text-[10px] font-medium text-destructive-foreground">{item.badge}</span>}
            {hasChildren && <ChevronDown className={cn('size-4 shrink-0 transition-transform duration-200', expanded && 'rotate-180')} />}
          </>
        )}
      </button>
      {!collapsed && hasChildren && expanded && (
        <div className="mt-0.5 space-y-0.5">
          {item.children!.map((child) => <SidebarNavItem key={child.id} item={child} collapsed={collapsed} depth={depth + 1} onNavigate={onNavigate} activePath={activePath} />)}
        </div>
      )}
    </div>
  );
}

function hasActiveChildAt(item: MenuItem, activePath?: string): boolean {
  if (!item.children || !activePath) return false;
  return item.children.some((child) =>
    child.path === activePath || hasActiveChildAt(child, activePath)
  );
}

function Sidebar({ collapsed, onToggleCollapse, onNavigate, activePath }: { collapsed: boolean; onToggleCollapse: () => void; onNavigate?: (path: string) => void; activePath?: string }) {
  return (
    <aside className="flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-250 ease-in-out h-full" style={{ width: collapsed ? 'var(--g-sidebar-collapsed-width)' : 'var(--g-sidebar-width)' }}>
      <div className="flex-center h-[var(--g-toolbar-height)] shrink-0 gap-2.5 border-b border-sidebar-border px-4">
        <div className="flex-center size-7 shrink-0 rounded-lg bg-primary text-primary-foreground"><span className="text-xs font-bold">F</span></div>
        {!collapsed && <span className="text-sm font-semibold whitespace-nowrap">Fantastic-admin</span>}
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        <div className="space-y-1">{sidebarMenuItems.map((item) => <SidebarNavItem key={item.id} item={item} collapsed={collapsed} onNavigate={onNavigate} activePath={activePath} />)}</div>
      </nav>
      <div className="flex-center border-t border-sidebar-border p-3">
        <button onClick={onToggleCollapse} className="flex-center size-8 rounded-lg text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors" aria-label={collapsed ? '展开侧边栏' : '收起侧边栏'}>
          <ChevronLeft className={cn('size-4 transition-transform duration-250', collapsed && 'rotate-180')} />
        </button>
      </div>
    </aside>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = useCallback((path: string) => {
    router.push(path);
    setMobileSidebarOpen(false);
  }, [router]);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const handleToggleSidebar = useCallback(() => {
    if (window.innerWidth < 768) setMobileSidebarOpen((p) => !p);
    else setSidebarCollapsed((p) => !p);
  }, []);

  const toggleCollapse = useCallback(() => setSidebarCollapsed((p) => !p), []);
  const closeMobile = useCallback(() => setMobileSidebarOpen(false), []);

  return (
    <SidebarContext.Provider value={{ collapsed: sidebarCollapsed, mobileOpen: mobileSidebarOpen, toggle: handleToggleSidebar, closeMobile, onNavigate: handleNavigate }}>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Desktop sidebar */}
        <div className="hidden md:flex"><Sidebar collapsed={sidebarCollapsed} onToggleCollapse={toggleCollapse} onNavigate={handleNavigate} activePath={pathname} /></div>

        {/* Mobile sidebar overlay */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50 animate-in fade-in duration-200" onClick={closeMobile} />
            <div className="relative h-full w-[var(--g-sidebar-width)] animate-in slide-in-from-left duration-250">
              <Sidebar collapsed={false} onToggleCollapse={closeMobile} onNavigate={handleNavigate} activePath={pathname} />
            </div>
          </div>
        )}

        {/* Main area */}
        <div className="flex flex-1 flex-col overflow-hidden min-w-0">
          {/* Toolbar */}
          <header className="flex-center-between h-[var(--g-toolbar-height)] shrink-0 border-b border-border bg-background px-3 lg:px-4">
            <div className="flex-center-start gap-2 lg:gap-3">
              <button onClick={handleToggleSidebar} className="flex-center size-8 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="切换侧边栏">
                <Menu className="size-5" />
              </button>
              <nav className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
                <span className="cursor-pointer hover:text-foreground transition-colors">首页</span>
                <ChevronRight className="size-3" />
                <span className="text-foreground">仪表盘</span>
              </nav>
            </div>

            <div className="flex-center-start gap-0.5">
              <button className="flex-center size-8 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"><Search className="size-5" /></button>
              <button className="relative flex-center size-8 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                <Bell className="size-5" />
                <span className="absolute right-1.5 top-1.5 flex-center h-4 min-w-4 rounded-full bg-destructive px-1 text-[9px] font-medium leading-none text-destructive-foreground">3</span>
              </button>
              <button onClick={async () => { try { if (!document.fullscreenElement) await document.documentElement.requestFullscreen(); else await document.exitFullscreen(); } catch {} }} className="hidden sm:flex-center size-8 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="全屏切换">
                {isFullscreen ? <Minimize2 className="size-5" /> : <Maximize2 className="size-5" />}
              </button>
              <button onClick={toggleTheme} className="flex-center size-8 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors" aria-label="主题切换">
                {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </button>

              {/* User menu */}
              <div className="relative ml-1">
                <button onClick={() => setUserMenuOpen((p) => !p)} className="flex-center-start gap-2 rounded-lg px-2 py-1 text-sm text-foreground hover:bg-accent transition-colors">
                  <div className="flex-center size-8 rounded-full bg-primary/10 text-primary"><User className="size-4" /></div>
                  <span className="hidden lg:inline text-sm font-medium">{mockUser.name}</span>
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full z-50 mt-1.5 w-48 rounded-lg border border-border bg-popover p-1.5 shadow-lg">
                      <div className="border-b border-border px-3 py-2.5">
                        <p className="text-sm font-medium">{mockUser.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{mockUser.role}</p>
                      </div>
                      <div className="mt-1 space-y-0.5">
                        <button onClick={() => { router.push('/system/profile'); setUserMenuOpen(false); }} className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"><User className="size-4" />个人中心</button>
                        <button onClick={() => { router.push('/system/settings'); setUserMenuOpen(false); }} className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"><Settings className="size-4" />系统设置</button>
                      </div>
                      <div className="my-1 border-t border-border" />
                      <button onClick={() => { localStorage.clear(); router.push('/login'); }} className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"><LogOut className="size-4" />退出登录</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* Tabbar */}
          <div className="flex h-[var(--g-tabbar-height)] shrink-0 items-center gap-0 overflow-x-auto border-b border-border bg-background px-2">
            {defaultTabs.map((tab, i) => (
              <div key={`${tab}-${i}`} className={cn('flex-center-start shrink-0 gap-1.5 border-b-2 px-3.5 py-2 text-sm cursor-pointer transition-colors', i === 0 ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground')}>
                <span className="whitespace-nowrap">{tab}</span>
                <button className="flex-center size-4 rounded-full text-muted-foreground/60 hover:bg-accent hover:text-foreground transition-colors" aria-label={`关闭 ${tab}`}><X className="size-3" /></button>
              </div>
            ))}
          </div>

          {/* Content */}
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
