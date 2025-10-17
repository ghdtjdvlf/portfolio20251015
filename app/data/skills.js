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
} from "react-icons/si";

import { MdWeb } from "react-icons/md";

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
      },
      {
        icon: <MdWeb size={30} color="#22C55E" />,
        title: "After Effects",
        desc: "영상 및 웹 모션 그래픽을 제작할 수 있으며, 텍스트 애니메이션과 마스크, 키프레임을 활용해 시각적인 인터랙션을 구현해본 경험이 있습니다.",
      },
      {
        icon: <MdWeb size={30} color="#22C55E" />,
        title: "Premiere Pro",
        desc: "컷 편집, 색보정, 자막 및 오디오 믹싱 등 영상 편집 전반을 다룰 수 있으며, 브랜드 홍보용 및 프로젝트 시연 영상 제작 경험이 있습니다.",
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
        icon: <SiReact size={30} color="#61DAFB" />,
        title: "React",
        desc: "컴포넌트를 만들고 상태 관리를 적용해본 경험이 있습니다.",
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
    ],
  },
];

// 모든 스킬을 평면화한 배열 (PC용 그리드)
const allSkills = skillCategories.flatMap(category => category.skills);

export default skillCategories;
export { allSkills };
