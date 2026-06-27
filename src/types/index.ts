export interface LoginFormData {
  account: string;
  password: string;
  remember: boolean;
}

export interface UserInfo {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  children?: MenuItem[];
  badge?: string;
}

export interface DashboardStats {
  title: string;
  value: string;
  unit?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  icon?: string;
  color?: string;
}

export interface TableColumn {
  key: string;
  label: string;
  width?: number;
  sortable?: boolean;
  type?: 'text' | 'tag' | 'avatar' | 'action';
  align?: 'left' | 'center' | 'right';
}
