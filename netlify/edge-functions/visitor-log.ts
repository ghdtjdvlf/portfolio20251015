import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  // 정적 파일 및 내부 요청 제외
  const skipPaths = [
    '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg',
    '.ico', '.woff', '.woff2', '.ttf', '.json', '.webp',
    '/_next/', '/api/', '/__nextjs'
  ];

  const shouldSkip = skipPaths.some(path =>
    url.pathname.includes(path) || url.pathname.startsWith(path)
  );

  if (shouldSkip) {
    return context.next();
  }

  // Next.js prefetch 요청 제외 (실제 클릭만 로깅)
  const purpose = request.headers.get('purpose');
  const nextRouter = request.headers.get('next-router-prefetch');
  const nextUrl = request.headers.get('next-url');

  if (purpose === 'prefetch' || nextRouter === '1' || nextUrl) {
    return context.next();
  }

  // 간단한 접속 로그만 출력
  const time = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit' });
  const ip = context.ip;
  const country = context.geo?.country?.code || "??"; // KR, US 등

  // URL 디코딩 및 간략화
  let page = decodeURIComponent(url.pathname);

  // /blog/ 경로는 제목만 표시
  if (page.startsWith('/blog/')) {
    page = page.replace('/blog/', '').substring(0, 20); // 앞 20자만
    if (page.length >= 20) page += '...';
    page = `📝 ${page}`;
  } else if (page === '/') {
    page = '🏠 홈';
  }

  console.log(`${ip} (${country}) → ${page} [${time}]`);

  return context.next();
};
