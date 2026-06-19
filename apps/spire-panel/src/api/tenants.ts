import { callEdgeFunction } from './client';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  contact_email: string | null;
  contact_name: string | null;
  status: 'active' | 'inactive';
  plan_type: string;
  max_users: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTenantParams {
  name: string;
  slug: string;
  contact_email?: string;
  contact_name?: string;
}

export const tenantApi = {
  /** 获取租户列表 */
  async getList(params?: { page?: number; pageSize?: number; search?: string }) {
    return callEdgeFunction<{ items: Tenant[]; total: number }>('tenants/list', {
      body: params,
    });
  },

  /** 获取单个租户 */
  async getById(id: string) {
    return callEdgeFunction<Tenant>('tenants/get', { body: { id } });
  },

  /** 创建租户 */
  async create(params: CreateTenantParams) {
    return callEdgeFunction<Tenant>('tenants/create', { body: params });
  },

  /** 更新租户 */
  async update(id: string, params: Partial<CreateTenantParams>) {
    return callEdgeFunction<Tenant>('tenants/update', { body: { id, ...params } });
  },

  /** 切换租户状态 */
  async toggleStatus(id: string) {
    return callEdgeFunction<Tenant>('tenants/toggle-status', { body: { id } });
  },
};
