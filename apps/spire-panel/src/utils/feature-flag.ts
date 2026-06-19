/**
 * SpirePanel 功能开关 - Lite vs Pro
 *
 * 通过环境变量 VITE_PRO_ENABLED 控制 Pro 功能可见性
 * Lite 版中 Pro 入口显示为「升级提示」
 */
export const isProEnabled = import.meta.env.VITE_PRO_ENABLED === 'true';

export const FEATURE_FLAGS = {
  tickets: isProEnabled,
  monitor: isProEnabled,
  notifications: isProEnabled,
  advancedAnalytics: isProEnabled,
  customerPortal: isProEnabled,
  auditLogs: import.meta.env.PROD || true,
} as const;

/** Lite 版功能限制 */
export const LITE_LIMITS = {
  maxTenants: 5,
  maxUsersPerTenant: 20,
  maxOrdersPerPage: 100,
} as const;
