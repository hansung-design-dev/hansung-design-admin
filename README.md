# 한성관리자 시스템 (Hansung Admin)

현수막 게시대 관리 및 홈페이지 콘텐츠 관리 시스템입니다.

## 🚀 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom Components
- **Text Editor**: TinyMCE
- **Database**: Supabase

## 📁 프로젝트 구조

```
src/
├── app/                          # Next.js App Router
│   ├── banner-display/           # 현수막 게시대 관리
│   │   └── [id]/                # 게시대 상세 페이지
│   └── manage-hompage/          # 홈페이지 콘텐츠 관리
├── components/
│   ├── layout/                  # 레이아웃 컴포넌트
│   │   ├── commonTable.tsx      # 공통 테이블 컴포넌트
│   │   ├── HomepageContent.tsx  # 홈페이지 콘텐츠 컴포넌트
│   │   ├── popupEdit.tsx        # 팝업 편집 컴포넌트
│   │   └── ...
│   ├── modal-contents/          # 모달 컴포넌트
│   │   ├── modal.tsx           # 기본 모달
│   │   ├── popupEditForm.tsx   # 팝업 편집 폼
│   │   └── ...
│   └── ui/                     # UI 기본 컴포넌트
│       ├── button.tsx          # 버튼 컴포넌트
│       ├── dropdown.tsx        # 드롭다운 컴포넌트
│       └── ...
└── mockdata/                   # 목 데이터
    └── banner-display.ts       # 게시대 목 데이터
```

## 🛠️ 설치 및 실행

### 필수 요구사항

- **Node.js**: 18.17.0 이상
- **npm**: 9.0.0 이상 또는 **yarn**: 1.22.0 이상

### 1. 프로젝트 클론

```bash
git clone [repository-url]
cd hansung-admin
```

### 2. 의존성 설치

```bash
# npm 사용
npm install

# 또는 yarn 사용
yarn install
```

### 3. 환경 변수 설정 (선택사항)

현재는 목 데이터를 사용하므로 환경 변수 설정이 필수는 아닙니다.

```bash
# .env.local 파일 생성
cp .env.example .env.local
```

```env
# .env.local
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### 4. 개발 서버 실행

```bash
# npm 사용
npm run dev

# 또는 yarn 사용
yarn dev
```

### 5. 브라우저에서 확인

```
http://localhost:3000
```

### 6. 주요 페이지 접속

- **홈페이지 관리**: http://localhost:3000/manage-hompage
- **현수막 게시대 관리**: http://localhost:3000/banner-display/1

## 📦 주요 라이브러리

### 핵심 의존성

```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "typescript": "^5.0.0"
}
```

### 스타일링

```json
{
  "tailwindcss": "^3.3.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0"
}
```

### 개발 도구

```json
{
  "@types/node": "^20.0.0",
  "@types/react": "^18.0.0",
  "@types/react-dom": "^18.0.0",
  "eslint": "^8.0.0",
  "eslint-config-next": "^14.0.0"
}
```

## 🔧 개발 환경 설정

### VS Code 추천 확장 프로그램

1. **ES7+ React/Redux/React-Native snippets**
2. **Tailwind CSS IntelliSense**
3. **TypeScript Importer**
4. **Prettier - Code formatter**
5. **ESLint**

### 유용한 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 타입 체크
npm run type-check

# 린트 검사
npm run lint

# 린트 자동 수정
npm run lint:fix
```

## 🚨 문제 해결

### 자주 발생하는 문제

#### 1. 포트 3000이 이미 사용 중인 경우

```bash
# 다른 포트로 실행
npm run dev -- -p 3001
```

#### 2. 의존성 설치 실패

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

#### 3. TypeScript 오류

```bash
# 타입 체크 실행
npm run type-check
```

#### 4. Tailwind CSS 스타일이 적용되지 않는 경우

```bash
# Tailwind CSS 재빌드
npm run build:css
```

## 📋 주요 기능

### 🏠 홈페이지 관리 (`/manage-hompage`)

#### 동적 콘텐츠 관리

- **상단 영역**: 최대 3개의 HomepageContent 컴포넌트
- **하단 영역**: 최대 2개의 HomepageContent 컴포넌트 + 고정 표
- **추가 버튼**: 총 5개까지 동적 생성 가능

#### HomepageContent 컴포넌트 기능

- **제목 드롭다운**: 메인, 공공디자인, 디지털샤이니지, LED전자게시대
- **분류**: 제목과 자동 연동
- **이미지 업로드**: 사진 등록 및 미리보기
- **텍스트 입력**: 메인타이틀, 서브타이틀, 설명 등
- **저장/삭제**: 개별 컴포넌트 관리

#### 레이아웃 특징

- **가로 스크롤**: 상단 영역 화면 넘침 시 스크롤
- **반응형**: 화면 크기에 따른 적응형 레이아웃
- **고정 표**: 하단 마지막 자리에 항상 위치

### 🏢 현수막 게시대 관리 (`/banner-display/[id]`)

#### 게시대 상세 정보

- **기본 정보**: 게시대 코드, 위치, 크기 등
- **면수 관리**: 부착 현황 및 사용 상태
- **유지보수**: 설치일, 상태, 메모 등

#### 팝업 관리

- **안내팝업**: 사용여부, 타이틀, 기간, 내용
- **TinyMCE 에디터**: 리치 텍스트 편집
- **모달 기능**: 추가/수정/삭제

#### 검색 및 필터링

- **드롭다운 필터**: 전체, 행정용, 상업용
- **검색 기능**: 키워드 검색

### 📊 공통 컴포넌트

#### CommonTable

- **컬럼 정의**: 헤더, 렌더링 함수, 스타일링
- **데이터 표시**: 체크박스, 텍스트, 커스텀 렌더링
- **인터랙션**: 행 클릭, 선택 상태
- **검색**: 드롭다운 필터 포함

#### PopupEdit

- **테이블 관리**: 추가/수정/삭제
- **모달 지원**: showModals 옵션으로 모달 기능 활성화
- **커스텀 폼**: addModalContent, editModalContent

## 🎨 UI/UX 특징

### 디자인 시스템

- **색상**: gray-1, gray-2, gray-3 ...
- **타이포그래피**: text-0-75-500, text-0-875-500 등 크기 체계
- **간격**: gap-8, gap-4 등 일관된 간격 시스템

### 반응형 디자인

- **모바일**: flex-col 레이아웃
- **데스크톱**: grid 레이아웃
- **태블릿**: 중간 크기 최적화

### 사용자 경험

- **로딩 상태**: 적절한 피드백
- **에러 처리**: 사용자 친화적 메시지
- **접근성**: 키보드 네비게이션 지원

## 🔧 개발 가이드

### 컴포넌트 추가

1. `src/components/` 하위에 적절한 폴더 생성
2. TypeScript 인터페이스 정의
3. 컴포넌트 구현
4. 필요한 경우 스토리북 추가

### 스타일링

- Tailwind CSS 클래스 사용
- 커스텀 CSS는 최소화
- 디자인 시스템 준수

### 상태 관리

- React useState/useEffect 사용
- 복잡한 상태는 Context API 고려
- 서버 상태는 추후 상태 관리 라이브러리 도입 예정

## 📝 환경 설정

### 환경 변수

```env
# .env.local
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### 개발 도구

- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅
- **TypeScript**: 타입 안정성

## 🚀 배포

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 🤝 기여 가이드

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 생성해주세요.

---
