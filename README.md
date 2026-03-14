# Mood Healer Web App

당신의 마음을 깊이 이해하고 따뜻한 위로와 해결책을 제안합니다.

![Mood Healer Screenshot](./public/screenshot.png) *(Note: Add screenshot here later)*

## 🌟 개요 (Overview)
Mood Healer는 사용자의 현재 감정 상태를 입력 받아 원인을 심리학적으로 분석하고, 당장 실행할 수 있는 작고 실천 가능한 위로/극복 방법을 제안해주는 웹 애플리케이션입니다.
최신 AI 모델인 **Gemini API**를 통해 사용자 맞춤형 분석을 제공합니다.

## ✨ 주요 기능 (Features)
- **감정 분석**: 현재 느끼는 감정이나 기분을 편하게 글로 작성하면, AI가 그 이면의 심리적 배경을 분석해 줍니다.
- **실천 가능한 솔루션 제안**: 우울감, 무기력함 등을 극복하기 위한 3가지의 간단한 행동 지침을 제시합니다.
- **아름답고 편안한 UI**: Glassmorphism (글래스모피즘) 디자인과 부드러운 애니메이션 효과를 적용하여, 앱을 사용하는 동안 시각적인 안정감을 느낄 수 있습니다.
- **토큰 제한 안내 (Error Handling)**: AI API 요청 제한(Quota Exhausted)에 도달했을 경우, 자연스럽고 따뜻한 안내 메시지와 함께 우아하게 에러를 처리합니다.

## 🚀 시작하기 (Getting Started)

### 요구사항
- Node.js (v18 이상 권장)
- npm 또는 yarn
- Google Gemini API Key

### 설치 및 실행

1. 저장소 클론
```bash
git clone https://github.com/your-username/mood-healer.git
cd mood-healer
```

2. 패키지 설치
```bash
npm install
```

3. 환경 변수 설정
루트 디렉토리에 `.env` 파일을 생성하고 발급받은 Gemini API 키를 입력합니다.
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

4. 개발 서버 실행
```bash
npm run dev
```

5. 브라우저에서 접속
`http://localhost:5173` 에서 앱을 확인할 수 있습니다.

## 🛠 기술 스택 (Tech Stack)
- **Frontend Framework**: React 18, Vite
- **Styling**: Vanilla CSS (Glassmorphism design system)
- **AI Integration**: Google Gemini API (`@google/genai` SDK)
- **Deployment**: GitHub Pages (via GitHub Actions)

## 📄 라이선스 (License)
MIT License
