import type { MenuItem } from '@/types';

export const sidebarMenuItems: MenuItem[] = [
  { id: '1', label: '首页', icon: 'Home', path: '/dashboard/workplace' },
  { id: '2', label: '仪表盘', icon: 'LayoutDashboard', path: '/dashboard' },
  { id: '3', label: '消息中心', icon: 'Bell', path: '/notification/list', badge: '12' },
  {
    id: '4', label: '系统管理', icon: 'Settings', path: '/system',
    children: [
      { id: '4-1', label: '用户管理', icon: 'Users', path: '/system/user' },
      { id: '4-2', label: '角色管理', icon: 'UserCheck', path: '/system/role' },
      { id: '4-3', label: '菜单管理', icon: 'Menu', path: '/system/menu' },
    ],
  },
  { id: '5', label: '组件示例', icon: 'Grid3X3', path: '/components' },
  { id: '6', label: '表格', icon: 'Table', path: '/table/index' },
];

export const mockUser = { name: 'Admin', avatar: '', role: '超级管理员' };
export const defaultTabs = ['首页', '仪表盘', '消息'];

// Workplace data
export interface WorkplaceStat {
  title: string;
  value: string;
  unit?: string;
  trend: string;
  trendUp: boolean;
  icon: string;
  color: string;
}

export interface RecentProject {
  id: string;
  name: string;
  desc: string;
  status: '进行中' | '已完成' | '已暂停';
  progress: number;
  members: number;
  deadline: string;
}

export interface QuickNav {
  icon: string;
  label: string;
  color: string;
  bgColor: string;
}

export const workplaceStats: WorkplaceStat[] = [
  { title: '项目数', value: '28', trend: '+15%', trendUp: true, icon: 'Briefcase', color: 'bg-blue-500' },
  { title: '任务总数', value: '186', trend: '+8%', trendUp: true, icon: 'CheckSquare', color: 'bg-emerald-500' },
  { title: '团队成员', value: '24', trend: '+3', trendUp: true, icon: 'Users', color: 'bg-violet-500' },
  { title: '完成率', value: '92.5%', trend: '+5.2%', trendUp: true, icon: 'Target', color: 'bg-amber-500' },
];

export const recentProjects: RecentProject[] = [
  { id: '1', name: '企业官网重构', desc: '基于 Next.js 构建全新的企业官网，支持多语言与 SEO 优化', status: '进行中', progress: 75, members: 5, deadline: '2025-08-15' },
  { id: '2', name: '后台管理系统', desc: '内部运营后台，包含用户管理、订单管理、数据分析模块', status: '进行中', progress: 45, members: 8, deadline: '2025-09-30' },
  { id: '3', name: '移动端 App', desc: 'iOS/Android 双端开发，使用 React Native 实现跨平台', status: '已完成', progress: 100, members: 6, deadline: '2025-06-01' },
  { id: '4', name: '数据中台建设', desc: '搭建统一的数据处理平台，整合多数据源，提供实时分析能力', status: '已暂停', progress: 30, members: 4, deadline: '2025-12-31' },
];

export const quickNavs: QuickNav[] = [
  { icon: 'Plus', label: '新建项目', color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-500/10' },
  { icon: 'Mail', label: '消息通知', color: 'text-emerald-600', bgColor: 'bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: 'Calendar', label: '日程安排', color: 'text-violet-600', bgColor: 'bg-violet-50 dark:bg-violet-500/10' },
  { icon: 'FileText', label: '文档中心', color: 'text-amber-600', bgColor: 'bg-amber-50 dark:bg-amber-500/10' },
];

// Notification data
export interface NotificationItem {
  id: string;
  type: 'system' | 'message' | 'alert';
  title: string;
  content: string;
  time: string;
  avatar?: string;
  read: boolean;
}

export const notifications: NotificationItem[] = [
  { id: '1', type: 'system', title: '系统更新通知', content: '系统 v3.2.0 版本已发布，新增数据导出功能和权限管理优化。', time: '5分钟前', read: false },
  { id: '2', type: 'message', title: '张三', content: '项目方案已经修改完成，请查收最新版本。', time: '15分钟前', read: false },
  { id: '3', type: 'alert', title: '服务器告警', content: '生产环境服务器 CPU 使用率超过 85%，请及时处理。', time: '1小时前', read: false },
  { id: '4', type: 'system', title: '账号安全提醒', content: '您的账号在陌生设备上登录，若非本人操作请立即修改密码。', time: '2小时前', read: false },
  { id: '5', type: 'message', title: '李四', content: '本周五下午3点召开项目评审会议，请各位准时参加。', time: '3小时前', read: true },
  { id: '6', type: 'system', title: '数据备份完成', content: '今日凌晨3点自动备份已完成，备份文件大小 2.3GB。', time: '5小时前', read: true },
  { id: '7', type: 'message', title: '王五', content: '新版本 UI 设计稿已上传至 Figma，请查看。', time: '昨天', read: true },
  { id: '8', type: 'alert', title: '证书即将过期', content: 'SSL 证书将在 7 天后过期，请及时续费以避免服务中断。', time: '昨天', read: true },
  { id: '9', type: 'system', title: '权限变更通知', content: '您已被授予「超级管理员」角色，请谨慎操作。', time: '3天前', read: true },
  { id: '10', type: 'message', title: '赵六', content: '客户反馈问题已解决，可以关闭工单 #20240531。', time: '3天前', read: true },
];

// User management data
export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: '启用' | '禁用';
  avatar?: string;
  department: string;
  createdTime: string;
}

export const users: UserItem[] = [
  { id: '1', name: 'Admin', email: 'admin@example.com', role: '超级管理员', status: '启用', department: '技术部', createdTime: '2024-01-01' },
  { id: '2', name: '张三', email: 'zhangsan@example.com', role: '管理员', status: '启用', department: '技术部', createdTime: '2024-03-15' },
  { id: '3', name: '李四', email: 'lisi@example.com', role: '普通用户', status: '启用', department: '运营部', createdTime: '2024-04-20' },
  { id: '4', name: '王五', email: 'wangwu@example.com', role: '普通用户', status: '禁用', department: '市场部', createdTime: '2024-05-10' },
  { id: '5', name: '赵六', email: 'zhaoliu@example.com', role: '编辑', status: '启用', department: '内容部', createdTime: '2024-06-01' },
  { id: '6', name: '钱七', email: 'qianqi@example.com', role: '管理员', status: '启用', department: '技术部', createdTime: '2024-06-15' },
  { id: '7', name: '孙八', email: 'sunba@example.com', role: '普通用户', status: '启用', department: '人事部', createdTime: '2024-07-01' },
  { id: '8', name: '周九', email: 'zhoujiu@example.com', role: '编辑', status: '禁用', department: '内容部', createdTime: '2024-07-20' },
  { id: '9', name: '吴十', email: 'wushi@example.com', role: '普通用户', status: '启用', department: '财务部', createdTime: '2024-08-05' },
  { id: '10', name: '郑十一', email: 'zheng11@example.com', role: '普通用户', status: '启用', department: '运营部', createdTime: '2024-08-15' },
];

// Role management data
export interface RoleItem {
  id: string;
  name: string;
  code: string;
  desc: string;
  userCount: number;
  status: '启用' | '禁用';
  createdTime: string;
}

export interface PermissionItem {
  id: string;
  name: string;
  key: string;
  children?: PermissionItem[];
}

export const roles: RoleItem[] = [
  { id: '1', name: '超级管理员', code: 'super_admin', desc: '拥有系统全部权限', userCount: 2, status: '启用', createdTime: '2024-01-01' },
  { id: '2', name: '管理员', code: 'admin', desc: '拥有大部分管理权限', userCount: 5, status: '启用', createdTime: '2024-01-15' },
  { id: '3', name: '编辑', code: 'editor', desc: '内容编辑与发布权限', userCount: 8, status: '启用', createdTime: '2024-02-01' },
  { id: '4', name: '普通用户', code: 'user', desc: '基础访问权限', userCount: 45, status: '启用', createdTime: '2024-02-15' },
  { id: '5', name: '访客', code: 'guest', desc: '只读访问权限', userCount: 12, status: '禁用', createdTime: '2024-03-01' },
];

export const permissions: PermissionItem[] = [
  {
    id: 'p1', name: '系统管理', key: 'system',
    children: [
      { id: 'p1-1', name: '用户管理', key: 'system:user', children: [
        { id: 'p1-1-1', name: '创建用户', key: 'system:user:create' },
        { id: 'p1-1-2', name: '编辑用户', key: 'system:user:edit' },
        { id: 'p1-1-3', name: '删除用户', key: 'system:user:delete' },
      ]},
      { id: 'p1-2', name: '角色管理', key: 'system:role', children: [
        { id: 'p1-2-1', name: '创建角色', key: 'system:role:create' },
        { id: 'p1-2-2', name: '编辑角色', key: 'system:role:edit' },
        { id: 'p1-2-3', name: '删除角色', key: 'system:role:delete' },
      ]},
      { id: 'p1-3', name: '菜单管理', key: 'system:menu', children: [
        { id: 'p1-3-1', name: '创建菜单', key: 'system:menu:create' },
        { id: 'p1-3-2', name: '编辑菜单', key: 'system:menu:edit' },
        { id: 'p1-3-3', name: '删除菜单', key: 'system:menu:delete' },
      ]},
    ],
  },
  {
    id: 'p2', name: '内容管理', key: 'content',
    children: [
      { id: 'p2-1', name: '文章管理', key: 'content:article', children: [
        { id: 'p2-1-1', name: '发布文章', key: 'content:article:publish' },
        { id: 'p2-1-2', name: '编辑文章', key: 'content:article:edit' },
        { id: 'p2-1-3', name: '删除文章', key: 'content:article:delete' },
      ]},
      { id: 'p2-2', name: '分类管理', key: 'content:category' },
    ],
  },
  {
    id: 'p3', name: '数据管理', key: 'data',
    children: [
      { id: 'p3-1', name: '数据查看', key: 'data:view' },
      { id: 'p3-2', name: '数据导出', key: 'data:export' },
    ],
  },
];

// Menu management data
export interface MenuItemTree {
  id: string;
  label: string;
  icon: string;
  path: string;
  type: 'menu' | 'button';
  visible: boolean;
  order: number;
  children?: MenuItemTree[];
}

export const menuTree: MenuItemTree[] = [
  {
    id: 'm1', label: '首页', icon: 'Home', path: '/dashboard/workplace', type: 'menu', visible: true, order: 1,
  },
  {
    id: 'm2', label: '仪表盘', icon: 'LayoutDashboard', path: '/dashboard', type: 'menu', visible: true, order: 2,
  },
  {
    id: 'm3', label: '消息中心', icon: 'Bell', path: '/notification/list', type: 'menu', visible: true, order: 3,
  },
  {
    id: 'm4', label: '系统管理', icon: 'Settings', path: '/system', type: 'menu', visible: true, order: 4,
    children: [
      { id: 'm4-1', label: '用户管理', icon: 'Users', path: '/system/user', type: 'menu', visible: true, order: 1 },
      { id: 'm4-2', label: '角色管理', icon: 'UserCheck', path: '/system/role', type: 'menu', visible: true, order: 2 },
      { id: 'm4-3', label: '菜单管理', icon: 'Menu', path: '/system/menu', type: 'menu', visible: true, order: 3 },
    ],
  },
  {
    id: 'm5', label: '组件示例', icon: 'Grid3X3', path: '/components', type: 'menu', visible: true, order: 5,
  },
  {
    id: 'm6', label: '表格', icon: 'Table', path: '/table/index', type: 'menu', visible: true, order: 6,
  },
];

// Table data
export interface OrderItem {
  id: string;
  orderNo: string;
  customer: string;
  phone: string;
  product: string;
  amount: number;
  status: '待付款' | '已付款' | '已发货' | '已完成' | '已取消';
  createTime: string;
}

const products = ['iPhone 15 Pro Max', 'MacBook Air M3', 'AirPods Pro', 'iPad Air', 'Apple Watch S9', 'iMac 24"', 'Mac mini M2 Pro'];
const statuses: OrderItem['status'][] = ['待付款', '已付款', '已发货', '已完成', '已取消'];

export function generateOrders(count: number): OrderItem[] {
  const customers = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十', '郑十一', '陈十二', '林十三', '黄十四'];
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    orderNo: `ORD${String(Date.now()).slice(-8)}${String(i + 1).padStart(4, '0')}`,
    customer: customers[i % customers.length],
    phone: `138${String(10000000 + Math.floor(Math.random() * 90000000)).slice(0, 8)}`,
    product: products[i % products.length],
    amount: Math.round(Math.random() * 10000 * 100) / 100,
    status: statuses[i % statuses.length],
    createTime: `2025-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, '0')} ${String(8 + (i % 8)).padStart(2, '0')}:${String(i * 7 % 60).padStart(2, '0')}`,
  }));
}
