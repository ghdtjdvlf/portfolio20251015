import Image from "next/image";

const GMAIL_BODY = `안녕하세요, 홍성필님.

저는 [회사명]의 [담당자명]입니다.

아래 포지션을 제안드리고 싶어 연락드립니다.

■ 포지션  :
■ 회사명  :
■ 근무형태 : (정규직 / 계약직 / 프리랜서)
■ 근무지  :
■ 급여    :
■ 면접 일정 :

업무 내용 및 기타 세부 사항을 자유롭게 기재해 주세요.


감사합니다.
[담당자명] 드림`;

const GMAIL_URL = `https://mail.google.com/mail/?view=cm&to=tjdvlf0416@gmail.com&su=${encodeURIComponent("[면접 제의] 회사명 · 직군명")}&body=${encodeURIComponent(GMAIL_BODY)}`;

const CAREERS = [
  {
    period: "2025.12 — 2026.03",
    duration: "4개월",
    company: "포비즈코리아",
    team: "FE팀",
    work: "뉴발란스 웹사이트 유지보수, 프론트엔드 개발, PC/모바일 퍼블리싱, UI 개선 및 최적화",
    salary: "2,900만원",
    type: "Frontend Developer",
  },
  {
    period: "2025.09 — 2025.11",
    duration: "3개월",
    company: "퍼널먼스",
    team: "퍼포먼스AI1팀",
    work: "카페24 유지보수 및 운영, PC/모바일 퍼블리싱, UI 개선",
    salary: "2,800만원",
    type: "Web Publisher",
  },
  {
    period: "2023.08 — 2024.07",
    duration: "1년",
    company: "원스톤",
    team: "디자인팀",
    work: "자사 웹사이트 유지보수 및 운영, PC/모바일 퍼블리싱, UI 개선",
    salary: "2,600만원",
    type: "Web Publisher",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f7f6f3] dark:bg-[#0f0f0e] text-[#111110] dark:text-[#f0ede8]">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="border-b border-[#e0ddd8] dark:border-[#252525]">
        <div className="flex items-center justify-between px-6 md:px-12 pt-8">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#999] font-medium">About Me</span>
          <span className="text-[11px] tracking-[0.2em] text-[#bbb] font-mono">2026</span>
        </div>

        <div className="px-6 md:px-12 pt-10 pb-16">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-0">

            {/* Left */}
            <div className="flex-1 flex flex-col gap-7 lg:pr-16 lg:pt-4">
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#999] font-medium">
                Web Publisher · Frontend Developer
              </p>

              <h1
                className="font-bold leading-[0.85] tracking-tighter"
                style={{ fontSize: "clamp(5rem, 13vw, 10rem)" }}
              >
                홍<br />성필
              </h1>

              <p className="text-base md:text-lg text-[#666] dark:text-[#888] max-w-xs leading-relaxed">
                효율을 숫자로 증명해온 퍼블리셔.<br />
                확실한 긍정적 변화를 약속합니다.
              </p>

              <div className="flex flex-wrap gap-2">
                {["책임감", "효율적인", "능동적인"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 border border-[#d8d5cf] dark:border-[#2e2e2e] text-sm font-medium rounded-full text-[#444] dark:text-[#aaa]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-8 pt-6 border-t border-[#e0ddd8] dark:border-[#252525]">
                {[
                  { value: "1년 7개월", label: "총 경력" },
                  { value: "3h → 5min", label: "업무 효율화" },
                  { value: "3,000만원", label: "비용 절감" },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p className="text-xl md:text-2xl font-bold tracking-tight">{value}</p>
                    <p className="text-[10px] text-[#999] mt-1 tracking-[0.2em] uppercase">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Photo */}
            <div className="relative w-full lg:w-[360px] xl:w-[420px] flex-shrink-0">
              <span className="absolute -top-6 -right-2 text-[9rem] font-bold leading-none select-none pointer-events-none text-[#111110]/[0.04] dark:text-[#f0ede8]/[0.04]">
                01
              </span>

              <div
                className="relative w-full max-w-[320px] ml-auto overflow-hidden rounded-2xl"
                style={{ aspectRatio: "3/4" }}
              >
                <Image
                  src="/images/me.webp"
                  alt="홍성필 프로필"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              <div className="absolute bottom-4 left-0 bg-[#111110] dark:bg-[#f0ede8] text-[#f0ede8] dark:text-[#111110] px-4 py-2 text-[10px] tracking-[0.25em] uppercase font-semibold">
                HSP · 홍성필
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STORY ──────────────────────────────────────── */}
      <section className="border-b border-[#e0ddd8] dark:border-[#252525]">
        <div className="px-6 md:px-12 py-16 md:py-24">
          <div className="flex flex-col md:flex-row gap-10 md:gap-20">
            <div className="md:w-44 flex-shrink-0 pt-1">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#999] font-medium">
                02 · Story
              </span>
            </div>
            <div className="flex-1 max-w-2xl">
              <blockquote className="text-2xl md:text-[1.75rem] font-semibold leading-snug tracking-tight mb-8">
                "9살 때 고장 난 PC를 스스로 고치며 느꼈던
                문제해결의 희열이, 저만의 경쟁력이 되었습니다."
              </blockquote>
              <div className="space-y-4 text-[#666] dark:text-[#999] leading-relaxed text-[0.9375rem]">
                <p>
                  어린 시절부터 남들이 포기할 때 끝까지 답을 찾는 아이였습니다.
                  그 성향은 성인이 되어{" "}
                  <strong className="text-[#111110] dark:text-[#f0ede8]">
                    &apos;기존보다 더 나은 효율&apos;
                  </strong>
                  을 찾아내는 경쟁력이 되었습니다.
                </p>
                <p>
                  사수 없이 독립적으로 레퍼런스를 분석·적용하며{" "}
                  <strong className="text-[#111110] dark:text-[#f0ede8]">
                    3시간짜리 업무를 5분으로 단축
                  </strong>
                  하고, 월 300만 원 외주 의존을 자체 개발로 전환했습니다.
                </p>
                <p>
                  뉴발란스 프로젝트에서 10명 규모 팀의 FE 파트를 담당하며 복잡한
                  요구사항을 빠르게 파악하고 사용자 중심 인터페이스를 설계·구현하는
                  역량을 갖췄습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAREER ─────────────────────────────────────── */}
      <section className="border-b border-[#e0ddd8] dark:border-[#252525]">
        <div className="px-6 md:px-12 py-16 md:py-24">
          <div className="flex flex-col md:flex-row gap-10 md:gap-20 mb-10">
            <div className="md:w-44 flex-shrink-0 pt-1">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#999] font-medium">
                03 · Career
              </span>
            </div>
            <p className="text-sm text-[#999]">총 경력 1년 7개월</p>
          </div>

          <div className="divide-y divide-[#e0ddd8] dark:divide-[#252525] border-t border-[#e0ddd8] dark:border-[#252525]">
            {CAREERS.map((c, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-start gap-3 md:gap-0 py-8">
                <div className="md:w-12 flex-shrink-0 pt-0.5">
                  <span className="text-xs font-mono text-[#ccc] dark:text-[#444]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:w-44 flex-shrink-0">
                  <p className="text-sm font-mono text-[#666] dark:text-[#777]">{c.period}</p>
                  <p className="text-xs text-[#bbb] dark:text-[#555] mt-0.5">{c.duration}</p>
                </div>
                <div className="flex-1 md:px-8">
                  <p className="text-xl font-bold tracking-tight">{c.company}</p>
                  <p className="text-sm text-[#999] mt-0.5">{c.team}</p>
                  <p className="text-sm text-[#777] dark:text-[#888] mt-3 leading-relaxed max-w-md">
                    {c.work}
                  </p>
                </div>
                <div className="md:w-44 flex-shrink-0 md:text-right flex md:flex-col gap-2 items-center md:items-end">
                  <span className="inline-block px-3 py-1 text-xs border border-[#d8d5cf] dark:border-[#2e2e2e] rounded-full font-medium text-[#666] dark:text-[#aaa]">
                    {c.type}
                  </span>
                  <p className="text-sm text-[#999]">{c.salary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHARACTER ──────────────────────────────────── */}
      <section className="border-b border-[#e0ddd8] dark:border-[#252525]">
        <div className="px-6 md:px-12 py-16 md:py-24">
          <div className="mb-12">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#999] font-medium">
              04 · Character
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e0ddd8] dark:divide-[#252525] border border-[#e0ddd8] dark:border-[#252525] rounded-2xl overflow-hidden">
            {[
              {
                badge: "장점",
                title: "극한의 효율성과\n집요한 문제해결력",
                body: "3시간 업무를 5분으로. 3,000만 원 외주를 내재화로 0원에. 숫자로 증명해온 실행력입니다.",
                stat: "3h → 5min",
              },
              {
                badge: "단점",
                title: "낯선 방식 도입에\n따른 조직 내 우려",
                body: "기존 방식에 안주하지 않으려는 성향이 때로는 동료에게 부담으로 다가올 수 있음을 경계합니다.",
                stat: null,
              },
              {
                badge: "보완점",
                title: "설득과 검증을 통한\n점진적 변화",
                body: "독단적으로 진행하지 않습니다. 팀원과 충분히 상의하고 PoC로 효용성을 먼저 입증합니다.",
                stat: null,
              },
            ].map(({ badge, title, body, stat }) => (
              <div key={badge} className="p-8 md:p-10">
                <span className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase border border-[#d8d5cf] dark:border-[#2e2e2e] rounded-full text-[#888] mb-6 font-medium">
                  {badge}
                </span>
                <h3 className="text-xl font-bold leading-tight mb-4 whitespace-pre-line">
                  {title}
                </h3>
                <p className="text-sm text-[#777] dark:text-[#888] leading-relaxed">{body}</p>
                {stat && (
                  <p className="mt-6 text-2xl font-bold">{stat}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION ─────────────────────────────────────── */}
      <section className="border-b border-[#e0ddd8] dark:border-[#252525]">
        <div className="px-6 md:px-12 py-16 md:py-28">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#999] font-medium mb-10">
            05 · Vision
          </p>
          <h2
            className="font-bold leading-tight tracking-tight mb-8 max-w-4xl"
            style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)" }}
          >
            &ldquo;AI 에이전트 기반 자동화로
            <span className="text-[#aaa]"> 24시간 멈추지 않는</span>
            <br />지능형 시스템을 구축합니다.&rdquo;
          </h2>
          <p className="text-base text-[#777] dark:text-[#888] leading-relaxed max-w-xl">
            단순 도구 활용을 넘어, AI가 결과물을 검수하고 관리하는 자동화 시스템 구축이
            가장 도전하고 싶은 핵심 영역입니다. 팀이 반복 업무에서 자유로워지고
            독보적인 기술 우위를 점할 수 있도록 기여하겠습니다.
          </p>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────── */}
      <section>
        <div className="px-6 md:px-12 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#999] font-medium mb-3">
                06 · Contact
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                포지션 제안하기
              </h2>
              <p className="text-[#999] mt-2 text-sm">
                채용 제안, 프로젝트 협업 문의를 환영합니다.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:01067315242"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#d8d5cf] dark:border-[#2e2e2e] hover:bg-[#111110] hover:text-[#f0ede8] dark:hover:bg-[#f0ede8] dark:hover:text-[#111110] transition-colors text-sm font-medium rounded-xl"
              >
                📞 010-6731-5242
              </a>
              <a
                href={GMAIL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#111110] text-[#f0ede8] dark:bg-[#f0ede8] dark:text-[#111110] hover:opacity-75 transition-opacity text-sm font-medium rounded-xl"
              >
                ✉️ 이메일로 제안하기
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
