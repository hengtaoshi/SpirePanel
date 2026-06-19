import { callEdgeFunction } from './client';

export interface Order {
  id: string;
  order_no: string;
  tenant_id: string;
  type: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded' | 'expired';
  amount: number;
  currency: string;
  payment_method: string | null;
  payment_channel: string | null;
  paid_at: string | null;
  created_at: string;
}

export const orderApi = {
  /** 获取订单列表 */
  async getList(params?: { page?: number; pageSize?: number; status?: string }) {
    return callEdgeFunction<{ items: Order[]; total: number }>('orders/list', {
      body: params,
    });
  },

  /** 获取订单详情 */
  async getById(id: string) {
    return callEdgeFunction<Order>('orders/get', { body: { id } });
  },

  /** 创建订单 */
  async create(params: { type: string; amount: number; currency?: string }) {
    return callEdgeFunction<Order>('orders/create', { body: params });
  },
};
