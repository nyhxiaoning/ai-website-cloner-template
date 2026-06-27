import DashboardLayout from '@/components/DashboardLayout';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <h1 className="text-2xl font-bold text-foreground">仪表盘</h1>

        {/* Stats cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: '总用户数', value: '12,846', trend: '+12%', color: 'bg-blue-500' },
            { title: '订单量', value: '3,421', trend: '+8%', color: 'bg-emerald-500' },
            { title: '营业额', value: '¥68,420', trend: '+23%', color: 'bg-violet-500' },
            { title: '活跃用户', value: '8,239', trend: '+5%', color: 'bg-amber-500' },
          ].map((stat) => (
            <div key={stat.title} className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <div className="flex-center-between">
                <span className="text-sm text-muted-foreground">{stat.title}</span>
                <span className={`${stat.color} size-3 rounded-full`} />
              </div>
              <p className="mt-2 text-2xl font-bold text-card-foreground">{stat.value}</p>
              <p className="mt-1 text-xs text-emerald-500">{stat.trend} 较上月</p>
            </div>
          ))}
        </div>

        {/* Charts and activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Chart */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <h2 className="text-base font-semibold text-card-foreground mb-4">访问趋势</h2>
            <div className="h-64 flex items-end gap-3">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 88].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-sm bg-primary/20 transition-all hover:bg-primary/40" style={{ height: `${h}%` }} />
                  <span className="text-[10px] text-muted-foreground">{i + 1}月</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <h2 className="text-base font-semibold text-card-foreground mb-4">最新动态</h2>
            <div className="space-y-4">
              {[
                { user: '张三', action: '创建了新订单', time: '5分钟前' },
                { user: '李四', action: '更新了个人信息', time: '15分钟前' },
                { user: '王五', action: '完成了实名认证', time: '1小时前' },
                { user: '赵六', action: '提交了退款申请', time: '2小时前' },
                { user: '钱七', action: '升级为VIP会员', time: '3小时前' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-center size-8 shrink-0 rounded-full bg-primary/10 text-primary text-xs font-medium">{item.user[0]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground"><span className="font-medium">{item.user}</span> {item.action}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
