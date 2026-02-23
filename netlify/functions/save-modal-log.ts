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
    const { modalTitle } = await request.json();
    const timestamp = new Date().toISOString();
    const ip = context.ip || 'unknown';
    const country = context.geo?.country?.code || "??";
    const city = context.geo?.city || undefined;
    const region = context.geo?.subdivision?.name || undefined;
    const timezone = context.geo?.timezone || undefined;
    const userAgent = request.headers.get('user-agent') || '';

    const log: VisitorLog = {
      timestamp,
      ip,
      country,
      city,
      region,
      timezone,
      page: `🔍 ${modalTitle}`,
      path: `/modal/${modalTitle}`,
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
    console.log(`${ip} (${country}) → 🔍 ${modalTitle} [${time}]`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error saving modal log:', error);
    return new Response('Error', { status: 500 });
  }
};
