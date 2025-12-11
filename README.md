# Hyunzai.com Portfolio Website

**[https://hyunzai.com](https://hyunzai.com)**

안녕하세요! 저의 개인 포트폴리오 웹사이트입니다.
이 프로젝트는 저의 기술 스택과 작업물을 소개하고, AI 챗봇을 통해 방문자와 상호작용할 수 있도록 개발되었습니다.

---

## 🛠️ Tech Stack

### **Frontend**

- **Framework**: [Next.js(App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**:
  - [Framer Motion](https://www.framer.com/motion/) (UI/Scroll Animations)
  - [React Type Animation](https://www.npmjs.com/package/react-type-animation) (Typing Effects)
  - [TSParticles](https://particles.js.org/) (Interactive Backgrounds)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

### **Backend & AI**

- **AI Integration**: [Google Gemini API](https://ai.google.dev/) (via Vercel AI SDK / LangChain)
- **Database**: MySQL (via TypeORM)
- **API**: Next.js Route Handlers

---

## 🚀 Getting Started

로컬 환경에서 실행하는 방법입니다.

### 1. Repository Clone

먼저 프로젝트를 로컬에 복제합니다.

```bash
git clone https://github.com/Start-Z/hyunzai.com.git
cd hyunzai.com
```

### 2. Install Dependencies

프로젝트 의존성을 설치합니다.

```bash
npm install
```

### 3. Environment Variables Setup

프로젝트 루트 경로에 `.env` 파일을 생성하고 아래 내용을 작성해 주세요.
AI 챗봇 기능과 데이터베이스 연결을 위해 필요합니다.

**.env**

```env
# Google Gemini AI API Key
GEMINI_API_KEY=your_google_gemini_api_key

# Database Connection (MySQL)
# 로컬 개발 시 기본값으로 설정된 경우는 생략 가능하지만, 명시하는 것을 권장합니다.
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=hyunzai_db
```

### 4. Run Development Server

개발 서버를 실행합니다.

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속하여 확인해 주세요.

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── api/            # Next.js API Routes (Chat, etc.)
│   ├── components/     # Reusable UI Components (Navbar, Intro, etc.)
│   ├── globals.css     # Global Styles (Tailwind config)
│   ├── layout.tsx      # Root Layout
│   └── page.tsx        # Main Landing Page
├── lib/                # Utility functions & DB config
└── config/             # Configuration files (particles, etc.)
```

---

## ✨ Key Features

1.  **Dynamic Scroll Navbar**: 스크롤 시 자연스럽게 나타나는 글래스모피즘 네비게이션 바.
2.  **Interactive Intro**: 타이핑 효과와 파티클 배경이 적용된 인상적인 인트로 섹션.
3.  **Scroll Animations**: Framer Motion을 활용한 부드러운 스크롤 진입 애니메이션.
4.  **AI Chatbot**: 방문자의 질문에 답변해주는 인터랙티브 챗봇 인터페이스 (Gemini 기반).
