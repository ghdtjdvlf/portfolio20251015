import {
  FaHtml5,
  FaCss3Alt,
  FaSass,
  FaBootstrap,
  FaWordpress,
  FaGitAlt,
} from "react-icons/fa";

import {
  SiAdobe,
  SiFigma,
  SiTailwindcss,
  SiStyledcomponents,
  SiJavascript,
  SiJquery,
  SiGreensock,
  SiReact,
  SiNotion,
  SiAntdesign,
  SiFirebase,
  SiClaude,
  SiJira,
  SiSourcetree,
  SiGooglegemini,
  SiOpenai,
} from "react-icons/si";

// MdAnimation 추가 (Lottie 대체용)
import { MdWeb, MdAnimation } from "react-icons/md"; 

const skillCategories = [
  {
    category: "디자인 툴",
    icon: "🎨",
    skills: [
      {
        icon: <SiAdobe size={30} color="#31A8FF" />,
        title: "Adobe Photoshop",
        desc: "사진 색보정, 합성, 배경 제거, 목업 이미지 제작 등 다양한 시각 자료를 편집하고 보정할 수 있습니다.",
      },
      {
        icon: <SiFigma size={30} color="#F24E1E" />,
        title: "Figma",
        desc: "UI 시안 제작과 프로토타입 설계 경험이 있으며, 컴포넌트화와 오토 레이아웃을 활용해 효율적인 디자인 협업을 진행할 수 있습니다.",
        trend: true,
      },
    ],
  },
  {
    category: "마크업 & 스타일링",
    icon: "💅",
    skills: [
      {
        icon: <FaHtml5 size={30} color="#E34F26" />,
        title: "Html5",
        desc: "시멘틱 태그를 사용해 기본 구조의 웹페이지를 만들 수 있습니다.",
      },
      {
        icon: <FaCss3Alt size={30} color="#1572B6" />,
        title: "CSS3",
        desc: "미디어쿼리로 반응형 페이지를 구현해본 경험이 있습니다.",
      },
      {
        icon: <FaSass size={30} color="#CC6699" />,
        title: "SCSS",
        desc: "변수와 믹스를 사용해 스타일 코드를 정리해본 경험이 있습니다.",
      },
      {
        icon: <SiTailwindcss size={30} color="#38BDF8" />,
        title: "Tailwind",
        desc: "유틸리티 클래스로 빠르게 시안을 구현해봤습니다.",
        trend: true,
      },
      {
        icon: <SiStyledcomponents size={30} color="#DB7093" />,
        title: "Styled Components",
        desc: "React에서 컴포넌트 단위 스타일링을 적용해본 경험이 있습니다.",
      },
      {
        icon: <FaBootstrap size={30} color="#7952B3" />,
        title: "Bootstrap5",
        desc: "그리드 시스템으로 반응형 레이아웃을 구성해봤습니다.",
      },
      {
        icon: <SiAntdesign size={30} color="#0170FE" />, 
        title: "Ant Design",
        desc: "직관적인 UI 컴포넌트를 활용해 통일성 있는 디자인 시스템을 구축할 수 있습니다.",
      },
    ],
  },
  {
    category: "프로그래밍 & 라이브러리",
    icon: "⚡",
    skills: [
      {
        icon: <SiJavascript size={30} color="#F7DF1E" />,
        title: "JavaScript",
        desc: "이벤트 처리와 간단한 인터랙션 기능을 구현할 수 있습니다.",
      },
      {
        icon: <SiJquery size={30} color="#0769AD" />,
        title: "jQuery",
        desc: "간단한 애니메이션과 DOM 조작을 적용해본 경험이 있습니다.",
      },
      {
        icon: <SiGreensock size={30} color="#88CE02" />,
        title: "Gsap",
        desc: "간단한 스크롤 애니메이션을 적용해본 경험이 있습니다.",
      },
      {
        // 1. Lottie 아이콘 대체 (버전 호환성 문제 해결)
        // SiLottiefiles 대신 Material Design의 Animation 아이콘 사용
        icon: <MdAnimation size={30} color="#00D1C1" />,
        title: "Lottie",
        desc: "JSON 기반의 애니메이션을 활용해 가볍고 인터랙티브한 모션을 구현할 수 있습니다.",
      },
      {
        icon: <SiReact size={30} color="#61DAFB" />,
        title: "React",
        desc: "컴포넌트를 만들고 상태 관리를 적용해본 경험이 있습니다.",
        trend: true,
      },
      {
        icon: <SiFirebase size={30} color="#FFCA28" />,
        title: "Firebase",
        desc: "인증(Auth) 및 DB 연동을 통해 서버리스 환경의 웹 서비스를 구축해본 경험이 있습니다.",
      },
    ],
  },
  {
    category: "CMS & 플랫폼",
    icon: "🛒",
    skills: [
      {
        icon: <FaWordpress size={30} color="#21759B" />,
        title: "WordPress",
        desc: "테마 수정과 플러그인 설치로 기본 사이트를 운영해본 경험이 있습니다.",
      },
      {
        icon: <MdWeb size={30} color="#3B82F6" />,
        title: "카페24",
        desc: "자사몰 구축부터 모듈 개발, 결제 연동, API연동 UI 커스터마이징까지 브랜드 맞춤형 쇼핑몰 구현 경험 실무 경험 있습니다.",
      },
      {
        icon: <MdWeb size={30} color="#3B82F6" />,
        title: "그누보드",
        desc: "게시판·회원관리 기능을 활용해 간단한 웹사이트를 제작해본 경험이 있습니다.",
      },
    ],
  },
  {
    category: "협업 도구",
    icon: "🤝",
    skills: [
      {
        icon: <SiNotion size={30} color="#000000" />,
        title: "Notion",
        desc: "학습 내용과 작업 기록을 정리하는 용도로 활용하고 있습니다.",
      },
      {
        icon: <FaGitAlt size={30} color="#F1502F" />,
        title: "git",
        desc: "기본 명령어로 버전 관리와 협업 준비를 할 수 있습니다.",
      },
      {
        icon: <SiJira size={30} color="#0052CC" />,
        title: "Jira",
        desc: "스프린트 기반 이슈 트래킹과 칸반 보드를 활용해 팀 협업 및 업무 진행 상황을 관리한 경험이 있습니다.",
        trend: true,
      },
      {
        icon: <SiSourcetree size={30} color="#0052CC" />,
        title: "SourceTree",
        desc: "GUI 기반으로 브랜치 관리, 커밋 이력 확인, 병합 작업을 시각적으로 처리한 경험이 있습니다.",
      },
    ],
  },
  {
    category: "개발환경 & DevOps",
    icon: "⚙️",
    skills: [
      {
        icon: <img src="/images/icon/인텔리제이.png" width={30} height={30} alt="IntelliJ IDEA" style={{objectFit:"contain"}} />,
        title: "IntelliJ IDEA",
        desc: "Java 및 웹 프로젝트 개발 시 IDE로 활용하며, 코드 자동완성과 디버깅 기능을 사용한 경험이 있습니다.",
      },
      {
        icon: <img src="/images/icon/jenkins.webp" width={30} height={30} alt="Jenkins" style={{objectFit:"contain"}} />,
        title: "Jenkins",
        desc: "CI/CD 파이프라인 구성을 통해 빌드 자동화 및 배포 프로세스를 경험한 적이 있습니다.",
      },
    ],
  },
  {
    category: "AI 개발",
    icon: "🤖",
    skills: [
      {
        icon: <SiClaude size={30} color="#CC785C" />,
        title: "Claude Code",
        desc: "Claude Code CLI 에이전트를 활용해 파일 편집·명령 실행·자동화 워크플로우를 구성합니다. PRD 기반 바이브코딩으로 프로덕션 수준의 코드를 빠르게 구현하며 개발 생산성을 극대화합니다.",
        trend: true,
      },
      {
        icon: <SiGooglegemini size={30} color="#4285F4" />,
        title: "Google Gemini API",
        desc: "Gemini 1.5 Pro/Flash 멀티모달 API를 활용해 이미지 분석·키워드 발굴·콘텐츠 자동 생성 시스템을 구축합니다. AI 블로그 자동화, 이미지 합성 스튜디오 등 실제 서비스에 적용한 경험이 있습니다.",
        trend: true,
      },
      {
        icon: <SiOpenai size={30} color="#10a37f" />,
        title: "ChatGPT / GPT API",
        desc: "GPT 모델을 프롬프트 설계·코드 리뷰·아이디어 발산에 활용합니다. 체계적인 프롬프트 엔지니어링으로 원하는 출력 형식과 품질을 제어하는 방법을 이해하고 있습니다.",
        trend: true,
      },
      {
        icon: <span style={{fontSize:"26px", lineHeight:1}}>⌨️</span>,
        title: "Cursor",
        desc: "AI 기반 IDE인 Cursor로 코드 자동완성·인라인 편집·채팅 기반 리팩토링을 활용합니다. Claude Code와 병행해 상황에 맞게 최적의 AI 도구를 선택합니다.",
        trend: true,
      },
    ],
  },
];

const allSkills = skillCategories
  .flatMap(category => category.skills)
  .sort((a, b) => (b.trend ? 1 : 0) - (a.trend ? 1 : 0));

export default skillCategories;
export { allSkills };