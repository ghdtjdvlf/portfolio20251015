import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

interface VisitorLog {
  timestamp: string;
  ip: string;
  country: string;
  page: string;
  path: string;
  duration?: number;
  userAgent?: string;
}

export default async (request: Request, context: Context) => {
  if (request.method !== 'DELETE') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { timestamp } = await request.json();

    if (!timestamp) {
      return new Response(JSON.stringify({ error: 'timestamp is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const store = getStore("visitor-logs");
    const logDate = new Date(timestamp).toISOString().split('T')[0];
    const logKey = `logs-${logDate}`;

    // 해당 날짜의 로그 가져오기
    const logsStr = await store.get(logKey);
    if (!logsStr) {
      return new Response(JSON.stringify({ error: 'Log not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const logs: VisitorLog[] = JSON.parse(logsStr);

    // timestamp가 일치하는 로그 제외
    const filteredLogs = logs.filter(log => log.timestamp !== timestamp);

    if (logs.length === filteredLogs.length) {
      return new Response(JSON.stringify({ error: 'Log not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 업데이트된 로그 저장
    await store.set(logKey, JSON.stringify(filteredLogs));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error deleting visitor log:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete log' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
