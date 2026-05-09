# Product Requirements Document (PRD): Pomodoro & Todo System

## 1. Project Overview
- **Name**: Pomodoro & Todo Focus App
- **Objective**: 시각적으로 뛰어난 '애플 스타일'의 UI를 통해 사용자의 집중력을 높이고, 구글 스프레드시트와 실시간 연동되는 투두 리스트를 제공하여 생산성을 관리합니다.
- **Target Audience**: 세련된 디자인을 선호하며, 익숙한 도구(구글 시트)로 작업 내역을 관리하고 싶은 개인 사용자 및 지식 노동자.

## 2. Core Features
### 2.1. Apple Style Pomodoro Timer
- **Focus Mode (25 min)**: 집중 작업을 위한 타이머.
- **Break Modes**: Short Break(5 min), Long Break(15 min) 전환 기능.
- **Visual Feedback**: 미니멀한 원형 프로그레스 바 및 부드러운 숫자 전환 애니메이션.
- **Controls**: 재생, 일시정지, 초기화 기능 제공.

### 2.2. Real-time Google Sheets Todo List
- **Two-way Sync**: 웹앱에서의 변경 사항(추가, 완료, 삭제)이 즉시 구글 시트에 반영되며, 시트에서의 변경 사항도 앱으로 동기화됨.
- **Metadata Logging**: 할 일 추가 시 생성 날짜와 시간이 자동으로 기록됨 (D열).
- **Optimistic UI**: 네트워크 지연 없이 즉각적인 사용자 피드백 제공.

### 2.3. Security & Admin Access
- **Sheet Revealer**: 비밀번호(1234) 인증을 통해서만 연결된 구글 시트 링크를 확인할 수 있는 보안 창구 제공.
- **Environment Safety**: 민감한 API 정보 및 주소는 서버 환경 변수에서 관리하여 외부 노출 차단.

## 3. Design Principles (Apple Style)
- **Glassmorphism**: 반투명 배경 및 블러 효과(`backdrop-filter`).
- **Typography**: San Francisco 스타일의 깔끔한 산세리프 폰트 위계.
- **Spacing**: 넉넉한 여백과 부드러운 라운드 코너(32px 이상).
- **Interactions**: Framer Motion을 활용한 물리 기반의 자연스러운 모션.

## 4. Success Metrics
- 사용자가 집중 세션을 성공적으로 완료하는 횟수.
- 구글 스프레드시트 데이터와 앱 상태의 100% 일치성.
