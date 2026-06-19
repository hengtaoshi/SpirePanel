/**
 * SpirePanel Dashboard Edge Function
 * GET /dashboard/stats — Lite 版基础统计
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

    // 获取用户所属租户
    const { data: tenantUsers } = await supabase
      .from('tenant_users')
      .select('tenant_id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .limit(1);

    const tenantId = tenantUsers?.[0]?.tenant_id;

    // 并行查询统计
    const [tenantCount, userCount, orderCount, revenueResult] = await Promise.all([
      supabase.from('tenants').select('id', { count: 'exact', head: true }),
      supabase.from('users').select('id', { count: 'exact', head: true }),
      tenantId
        ? supabase.from('orders').select('id', { count: 'exact', head: true }).eq('tenant_id', tenantId)
        : Promise.resolve({ count: 0 }),
      tenantId
        ? supabase.from('orders').select('amount').eq('tenant_id', tenantId).eq('status', 'paid')
        : Promise.resolve({ data: [] }),
    ]);

    const totalRevenue = (revenueResult as { data: { amount: number }[] })?.data
      ?.reduce((sum: number, o: { amount: number }) => sum + Number(o.amount), 0) ?? 0;

    return new Response(
      JSON.stringify(success({
        tenantCount: tenantCount.count ?? 0,
        userCount: userCount.count ?? 0,
        todayOrders: orderCount.count ?? 0,
        totalRevenue,
      })),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify(error(500, (err as Error).message)),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
