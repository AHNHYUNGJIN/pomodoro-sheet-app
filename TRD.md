# Technical Requirements Document (TRD): Pomodoro & Todo System

## 1. System Architecture
- **Orchestrator**: **Gemini CLI** (Leader Agent)
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Integration**: Google Apps Script (Web App API)

## 2. Technical Stack Details
### 2.1. Frontend
- **State Management**: React `useState`, `useEffect` 기반의 로컬 상태 관리.
- **Components**:
    - `PomodoroTimer`: 타이머 로직 및 SVG 기반 프로그레스 바.
    - `TodoList`: CRUD 인터페이스 및 서버 동기화 로직.
    - `SheetRevealer`: 환경 변수 기반 비밀번호 인증 컴포넌트.

### 2.2. Backend (API Routes)
- **`/api/todos`**: 클라이언트와 Google Apps Script 사이의 프록시 역할. CORS 문제를 방지하고 환경 변수를 보호함.
- **`/api/reveal-sheet`**: 서버 측 비밀번호 검증 로직 구현.

### 2.3. Google Apps Script Integration
- **`doGet()`**: 스프레드시트 전체 데이터를 JSON 배열로 반환.
- **`doPost()`**: `action` 파라미터(add, update, delete)에 따라 행 조작 수행.
- **Timezone**: `GMT+9` (KST) 고정 설정.

## 3. Data Schema (Google Sheets)
- **Column A**: `id` (String) - Unique identifier (Math.random base-36).
- **Column B**: `text` (String) - Todo description.
- **Column C**: `completed` (Boolean/String) - TRUE/FALSE.
- **Column D**: `createdAt` (String) - YYYY-MM-DD HH:mm:ss.

## 4. Deployment & Security
- **Platform**: Vercel (CI/CD connected to GitHub).
- **Environment Variables**:
    - `GOOGLE_SHEET_URL`: 시트 직접 접근 주소.
    - `APP_PASSWORD`: 웹앱 관리자 비밀번호.
- **Protection**: `.env.local` 파일은 `.gitignore`에 의해 깃허브 업로드 제외.

## 5. Performance Optimization
- **Polling**: 30초 간격으로 서버 데이터를 자동 리프레시하여 외부 변경 사항 반영.
- **Optimistic Updates**: 사용자 액션 즉시 UI를 업데이트하고 백그라운드에서 API 요청 처리.
