'use client';

import { useState, useMemo } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { generateOrders, type OrderItem } from '@/lib/mock-data';
import { Search, ChevronDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';

const orders = generateOrders(46);

const statusColors: Record<string, string> = {
  '待付款': 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  '已付款': 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  '已发货': 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400',
  '已完成': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  '已取消': 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400',
};

type SortKey = keyof OrderItem;
type SortDir = 'asc' | 'desc';

export default function TablePage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('全部');
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const pageSize = 10;

  const filtered = useMemo(() => {
    let result = orders.filter((o) =>
      o.orderNo.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
    );
    if (statusFilter !== '全部') {
      result = result.filter((o) => o.status === statusFilter);
    }
    if (sortKey) {
      result.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
        }
        return sortDir === 'asc'
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }
    return result;
  }, [search, statusFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const toggleAll = () => {
    if (selectedRows.size === paginated.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginated.map((o) => o.id)));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <ChevronDown className="size-3 text-muted-foreground/40" />;
    return sortDir === 'asc'
      ? <ArrowUp className="size-3 text-primary" />
      : <ArrowDown className="size-3 text-primary" />;
  };

  const statuses = ['全部', ...new Set(orders.map((o) => o.status))];

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-4">
        <div className="flex-center-between">
          <h1 className="text-2xl font-bold text-foreground">订单表格</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            共 {filtered.length} 条订单
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="搜索订单号或客户..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="h-9 w-64 rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
            />
          </div>
          <div className="flex items-center gap-1">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  statusFilter === s
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.size === paginated.length && paginated.length > 0}
                      onChange={toggleAll}
                      className="size-4 rounded border-border accent-primary"
                    />
                  </th>
                  {[
                    { key: 'orderNo', label: '订单号' },
                    { key: 'customer', label: '客户' },
                    { key: 'phone', label: '电话' },
                    { key: 'product', label: '商品' },
                    { key: 'amount', label: '金额' },
                    { key: 'status', label: '状态' },
                    { key: 'createTime', label: '创建时间' },
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key as SortKey)}
                      className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors select-none"
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        <SortIcon column={col.key as SortKey} />
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginated.map((order) => (
                  <tr key={order.id} className={`hover:bg-muted/30 transition-colors ${
                    selectedRows.has(order.id) ? 'bg-primary/[0.02]' : ''
                  }`}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(order.id)}
                        onChange={() => toggleRow(order.id)}
                        className="size-4 rounded border-border accent-primary"
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-foreground">{order.orderNo}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{order.customer}</td>
                    <td className="px-4 py-3 text-muted-foreground">{order.phone}</td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[160px] truncate">{order.product}</td>
                    <td className="px-4 py-3 font-medium tabular-nums">¥{order.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{order.createTime}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-xs text-primary hover:underline">编辑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex-center-between border-t border-border px-4 py-3">
            <span className="text-xs text-muted-foreground">
              已选 {selectedRows.size} 项
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex-center h-7 w-7 rounded-md text-xs text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex-center h-7 min-w-7 rounded-md text-xs font-medium transition-colors ${
                    page === currentPage
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex-center h-7 w-7 rounded-md text-xs text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
