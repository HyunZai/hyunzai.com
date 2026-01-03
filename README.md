# Hyunzai.com Portfolio Website

**[https://hyunzai.com](https://hyunzai.com)**

저의 개인 포트폴리오 웹사이트입니다.
이 프로젝트는 저의 기술 스택과 작업물을 소개하고, AI 챗봇을 통해 방문자와 상호작용할 수 있도록 개발되었습니다.
누구나 최소한의 공수로 이 프로젝트를 활용해 자신만의 사이트를 구축할 수 있도록, 확장성을 고려하여 개발하고 있습니다.

---

## 🛠️ Tech Stack

### **Frontend**

- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**:
  - [Framer Motion](https://www.framer.com/motion/)
  - [React Type Animation](https://www.npmjs.com/package/react-type-animation)
  - [TSParticles](https://particles.js.org/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

### **Backend & AI**

- **AI Integration**: [Google Gemini API](https://ai.google.dev/) (via Vercel AI SDK / LangChain)
- **Database**: MySQL (via [TypeORM](https://typeorm.io/))
- **API**: Next.js Route Handlers
- **Authentication**: Custom secured routes for Admin

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── admin/          # CMS Admin Dashboard
│   ├── api/            # Next.js API Routes (Chat, Guestbook, etc.)
│   ├── components/
│   │   ├── features/   # Complex features (Chat, Guestbook)
│   │   ├── layout/     # Layout components (Navbar, Footer)
│   │   ├── sections/   # Page sections (Intro, About, Projects, etc.)
│   │   └── ui/         # Reusable UI components
│   ├── global.css      # Global Styles
│   ├── layout.tsx      # Root Layout
│   └── page.tsx        # Main Landing Page
├── dtos/               # Data Transfer Objects
├── entities/           # TypeORM Entities
├── lib/                # Utility functions & DB config
├── services/           # Business Logic Layer
└── store/              # Global State (Zustand)
```

---

## ✨ Key Features

1.  **AI Chatbot**: Gemini 기반의 페르소나 챗봇이 저(김현재)를 대신하여 방문자의 질문에 실시간으로 답변합니다.
2.  **Guestbook**: 방문자가 자유롭게 응원 메시지나 코멘트를 남길 수 있는 방명록 기능입니다.
3.  **Admin Dashboard**: 포트폴리오의 주요 데이터(경력, 프로젝트, 수상 이력 등)와 방명록을 손쉽게 관리할 수 있는 CMS 시스템입니다.
