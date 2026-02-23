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

export default async (request: Request, context: Context) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { path, duration } = await request.json();
    const timestamp = new Date().toISOString();
    const ip = context.ip || 'unknown';
    const country = context.geo?.country?.code || "??";
    const city = context.geo?.city || undefined;
    const region = context.geo?.subdivision?.name || undefined;
    const timezone = context.geo?.timezone || undefined;
    const userAgent = request.headers.get('user-agent') || '';

    // URL 디코딩 및 간략화
    let page = decodeURIComponent(path || '/');
    if (page.startsWith('/blog/')) {
      const blogTitle = page.replace('/blog/', '').substring(0, 20);
      page = blogTitle.length >= 20 ? `${blogTitle}...` : blogTitle;
      page = `📝 ${page}`;
    } else if (page === '/') {
      page = '🏠 홈';
    }

    const log: VisitorLog = {
      timestamp,
      ip,
      country,
      city,
      region,
      timezone,
      page,
      path,
      duration,
      userAgent
    };

    // Netlify Blobs에 저장
    const store = getStore("visitor-logs");
    const today = new Date().toISOString().split('T')[0];
    const logKey = `logs-${today}`;

    // 기존 로그 가져오기
    const existingLogsStr = await store.get(logKey);
    const existingLogs: VisitorLog[] = existingLogsStr ? JSON.parse(existingLogsStr) : [];

    // 새 로그 추가
    existingLogs.push(log);

    // 저장
    await store.set(logKey, JSON.stringify(existingLogs));

    // 콘솔에도 출력
    const time = new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      hour: '2-digit',
      minute: '2-digit'
    });

    const durationText = duration ? ` (${Math.round(duration)}초)` : '';
    console.log(`${ip} (${country}) → ${page} [${time}]${durationText}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error saving visitor log:', error);
    return new Response('Error', { status: 500 });
  }
};
