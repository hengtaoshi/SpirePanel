/**
 * SpirePanel 统一响应格式
 */

export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export function success<T>(data: T, message = 'ok'): ApiResponse<T> {
  return { code: 0, message, data };
}

export function error(code: number, message: string): ApiResponse<null> {
  return { code, message, data: null };
}
