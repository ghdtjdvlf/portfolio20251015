import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

interface VisitorLog {
  timestamp: string;
  ip: string;
  country: string;
  city?: string;
  region?: string;
  timezone?: string;
  page: string;
  path: string;
  duration?: number;
  userAgent?: string;
}

function getTopPages(logs: VisitorLog[], limit: number) {
  const pageCounts = logs.reduce((acc, log) => {
    acc[log.page] = (acc[log.page] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([page, count]) => ({ page, count }));
}

export default async (request: Request, context: Context) => {
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || '24h';

    const store = getStore("visitor-logs");
    const now = new Date();
    let logs: VisitorLog[] = [];

    // date:YYYY-MM-DD 형식 체크 (특정 날짜 조회)
    if (period.startsWith('date:')) {
      const specificDate = period.replace('date:', '');
      const logKey = `logs-${specificDate}`;

      try {
        const logsStr = await store.get(logKey);
        if (logsStr) {
          logs = JSON.parse(logsStr);
        }
      } catch (e) {
        // 해당 날짜 로그 없음
      }
    } else {
      // 기간 계산
      let startDate: Date;
      switch (period) {
        case '24h':
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case '1week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '1month':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case 'all':
        default:
          startDate = new Date(0);
          break;
      }

      // 필요한 날짜들의 로그 가져오기
      const daysToFetch = period === 'all' ? 365 : Math.ceil((now.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)) + 1;

      for (let i = 0; i < daysToFetch; i++) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split('T')[0];
        const logKey = `logs-${dateStr}`;

        try {
          const logsStr = await store.get(logKey);
          if (logsStr) {
            const dayLogs: VisitorLog[] = JSON.parse(logsStr);
            const filteredLogs = dayLogs.filter(log => {
              const logDate = new Date(log.timestamp);
              return logDate >= startDate;
            });
            logs = logs.concat(filteredLogs);
          }
        } catch (e) {
          continue;
        }
      }
    }

    // 최신순 정렬
    logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // 통계 계산
    const stats = {
      total: logs.length,
      uniqueIPs: new Set(logs.map(log => log.ip)).size,
      countries: Array.from(new Set(logs.map(log => log.country))),
      avgDuration: logs.filter(log => log.duration).length > 0
        ? Math.round(logs.filter(log => log.duration).reduce((sum, log) => sum + (log.duration || 0), 0) / logs.filter(log => log.duration).length)
        : 0,
      topPages: getTopPages(logs, 10)
    };

    return new Response(JSON.stringify({ logs, stats, period }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('Error fetching visitor logs:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch logs' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
