/**
 * SpirePanel Tenants Edge Function
 * POST /tenants/list — Lite 版租户管理
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { success, error } from '../_shared/response.ts';

serve(async (req: Request) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } },
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return new Response(JSON.stringify(error(401, 'Unauthorized')), { headers: corsHeaders });

    // 获取用户可见的 tenant IDs
    const { data: tenantUsers } = await supabase
      .from('tenant_users')
      .select('tenant_id, role')
      .eq('user_id', user.id)
      .eq('status', 'active');

    const tenantIds = tenantUsers?.map(t => t.tenant_id) ?? [];
    const isAdmin = tenantUsers?.some(t => t.role === 'owner' || t.role === 'admin');

    const { page = 1, pageSize = 10 } = await req.json().catch(() => ({}));
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const query = supabase
      .from('tenants')
      .select('*', { count: 'exact' })
      .in('id', tenantIds)
      .range(from, to)
      .order('created_at', { ascending: false });

    const { data, count } = await query;

    return new Response(
      JSON.stringify(success({ items: data ?? [], total: count ?? 0 }, 'ok')),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify(error(500, (err as Error).message)),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
