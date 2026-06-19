import { callEdgeFunction } from './client';

export interface DashboardStats {
  tenantCount: number;
  userCount: number;
  activeUsers: number;
  todayOrders: number;
  totalRevenue: number;
  monthlyRevenue: number;
  orderTrend: Array<{ date: string; count: number; amount: number }>;
}

export const dashboardApi = {
  /** 获取仪表盘统计数据 */
  async getStats() {
    return callEdgeFunction<DashboardStats>('dashboard/stats');
  },
};
