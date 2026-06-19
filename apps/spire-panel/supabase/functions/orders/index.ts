/**
 * SpirePanel Orders Edge Function
 * POST /orders/list — Lite 版订单管理
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

    const { data: tenantUsers } = await supabase
      .from('tenant_users')
      .select('tenant_id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .limit(1);

    const tenantId = tenantUsers?.[0]?.tenant_id;
    if (!tenantId) return new Response(JSON.stringify(error(403, 'No tenant access')), { headers: corsHeaders });

    const { page = 1, pageSize = 10, status } = await req.json().catch(() => ({}));
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from('orders')
      .select('*', { count: 'exact' })
      .eq('tenant_id', tenantId)
      .range(from, to)
      .order('created_at', { ascending: false });

    if (status) query = query.eq('status', status);

    const { data, count } = await query;

    return new Response(
      JSON.stringify(success({ items: data ?? [], total: count ?? 0 })),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify(error(500, (err as Error).message)),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
