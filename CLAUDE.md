# Nova Landing

Nova 소개 랜딩 사이트. AI 개발 품질 게이트인 Nova를 처음 접하는 사람에게 소개하는 정적 웹사이트.

## Language
- Claude는 사용자에게 항상 **한국어**로 응답한다.

## Stack
- Next.js 16 (App Router, SSG, output: export)
- TypeScript 6
- Tailwind CSS v4
- Motion 12 (motion/react)
- pnpm

## Structure
- 단일 페이지 스크롤 랜딩 (10개 섹션)
- components/sections/ — 각 섹션 컴포넌트
- components/ui/ — 공유 UI 컴포넌트
- components/layout/ — NavBar, Footer

## Build & Deploy
```bash
pnpm dev -p 4100          # 로컬 개발
pnpm build                # 정적 빌드 (out/)
```
- GitHub Pages 배포: main push → GitHub Actions 자동 빌드
- URL: https://jay-swk.github.io/nova-landing/
- basePath: /nova-landing

## Design System
- 다크모드 기본
- 브랜드: 보라 #7c3aed, 파랑 #2563eb
- 폰트: Geist Sans + Geist Mono

## Git Convention
feat: 새 기능 | fix: 버그 수정 | update: 기존 개선 | docs: 문서 | chore: 설정
