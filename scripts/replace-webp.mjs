import fs from 'fs';
import path from 'path';

const targets = [
  'app/about/page.tsx',
  'app/page.tsx',
  'components/3hour-to-5min-content.tsx',
  'components/30000.tsx',
  'components/Fullstack.tsx',
  'components/ui/bento-gallery-flip.tsx',
  'blog/content/뉴발란스 운영.mdx',
  'blog/content/딱세줄 바이브코딩.mdx',
  'blog/content/Google Gemini 활용 챗봇 사이트.mdx',
  'blog/content/애플 클론 사이트.mdx',
  'blog/content/워드프레스 포트폴리오 사이트.mdx',
  'blog/content/카페24 쇼핑몰 위젯.mdx',
  'blog/content/카페24 쇼핑몰.mdx',
  'blog/content/포켓몬스터 도감 사이트.mdx',
  'blog/content/필성 성형외과.mdx',
];

const publicDir = 'public';

function webpExists(imgPath) {
  const clean = imgPath.replace(/^\//, '');
  const webpPath = clean.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  return fs.existsSync(path.join(publicDir, webpPath));
}

let totalReplaced = 0;

for (const file of targets) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  let replaced = 0;
  content = content.replace(/(["'])(\/[^"'\s]*?\.(jpg|jpeg|png))(["'])/gi, (match, q1, imgPath, ext, q2) => {
    if (webpExists(imgPath)) {
      replaced++;
      return q1 + imgPath.replace(/\.(jpg|jpeg|png)$/i, '.webp') + q2;
    }
    return match;
  });
  if (replaced > 0) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(file + ': ' + replaced + '개 교체');
    totalReplaced += replaced;
  }
}
console.log('\n총 ' + totalReplaced + '개 경로 교체 완료');
