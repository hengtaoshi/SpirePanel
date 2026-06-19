/**
 * SpirePanel Supabase API 客户端
 *
 * Lite 版使用 Supabase 匿名客户端
 * Pro 版可替换为自定义 Axios 实例
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let supabaseClient: any = null;

export function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase 未配置，请在 .env 中设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY');
    return null;
  }

  // 动态导入 supabase-js
  // 注：需要在 spire-panel 依赖中安装 @supabase/supabase-js
  try {
    // 使用动态 require 兼容
    // 实际使用时在 package.json 添加 "@supabase/supabase-js": "^2"
    supabaseClient = null;
    console.info('Supabase 客户端待初始化 — 请安装 @supabase/supabase-js');
    return null;
  } catch {
    console.error('Failed to initialize Supabase client');
    return null;
  }
}

/**
 * Supabase Edge Function 调用
 */
export async function callEdgeFunction<T = unknown>(
  functionName: string,
  options?: { body?: unknown; headers?: Record<string, string> },
): Promise<{ code: number; message: string; data: T }> {
  const client = getSupabaseClient();
  if (!client) {
    return { code: 500, message: 'Supabase 未配置', data: null as T };
  }

  const { data, error } = await client.functions.invoke(functionName, {
    body: options?.body,
    headers: options?.headers,
  });

  if (error) {
    return { code: error.status || 500, message: error.message, data: null as T };
  }

  return data;
}
