# TOp_DOwn Frontend

프로젝트 사진 첨부

# Overview

- 많은 사람들이 목표를 설정하고 세부 계획을 수립하는 과정에서 과도한 시간을 소비하며, 이로 인해 실제 작업에 집중하기 어려움을 겪고 있습니다.

- 그래서 이 프로젝트는 사용자가 보다 효율적으로 목표를 설정하고 계획을 세울 수 있도록 돕는 간단한 도구를 제공합니다. 이를 통해 복잡한 계획 수립 과정을 간소화하고 시간을 절약할 수 있습니다.

- 이로 인해 사용자는 계획 수립에 소비하는 시간을 줄이고, 보다 효과적으로 일정 관리를 수행하여 실제 작업과 목표 달성에 집중할 수 있습니다.

# Getting Start

설치

```bash
$ pnpm install
```

실행

```bash
$ pnpm run dev
```

# 팀원 및 역할 분담

|                                           오상현                                           |
| :----------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/101708377?v=4" alt="오상현" width="150"> |
|                                             FE                                             |
|                           [GitHub](https://github.com/Cr28self)                            |

<br/>
<br/>

# 기술 스택

### FE

- React
- TypeScript

### Data fetching

- React-query

### Form & Input Validation

- React-hook-form
- Zod

### Router

- React-router

[💻 라우팅 구조](docs/skill/routing-structure.md)

### UI

- Shadcn
- TailwindCSS
- Radix-ui

[💻 컴포넌트 & 스타일링](docs/application-overview.md)

### Testing

- jest
- Storybook
- MSW
- RTL
- playwright

[💻 테스팅 가이드](docs/application-overview.md)

### 배포

- Docker
- AWS
- Sentry

<br/>

# 주요 기능

1. 목표와 하위 계획 생성, 수정, 삭제.

2. 목표 및 계획을 캘린더에 추가, 드래그로 조정.
3. 생성된 목표/일정을 클릭해 정보 확인 및 메모 추가.
4. 대시보드에서 오늘 할 일 및 통계 확인.

5. 친구 추가 및 일정 공유.
6. 학생 할인 정보 확인.
7. 수업 또는 외부 캘린더 정보 연동.
8. 계정 생성, 삭제, 로그인.

<br />

# 트러블 슈팅 목록

노션 링크

- [💻 .env 타입스크립트 지원](https://www.notion.so/hyuns00/env-2c1a2c2650444c29962c2137851c23b0?pvs=4)
- [💻 성능 최적화](docs/application-overview.md)
- [💻 프로젝트 배포 문제 해결](docs/application-overview.md)
- [💻 jwt 토큰 관리](docs/application-overview.md)
- etc..

<br />

# 🗄️ 디렉토리 구조

```sh
src
|
+-- app               # application layer 내부:
|   |
|   +-- routes        # application 루트 / 페이지
|   +-- app.tsx       # main application 컴포넌트
|   +-- provider.tsx  # 글로벌 provider들을 여기다가 모아서 전체 app을 감싸는 provider
|   +-- router.tsx    # application 라우터 설정
+-- assets            # 정적파일 모아둠 ( image, font, logo )
|
+-- components        # 전체 application에서 사용되는 공통 컴포넌트
|
+-- config            # 글로벌 설정, env 변수 내보내기 등등
|
+-- features          # feature based modules
|
+-- hooks             # 전체 application에서 사용되는 공통 커스텀훅
|
+-- lib               # reusable libraries preconfigured for the application
|
+-- stores            # 글로벌 상태 관리
|
+-- test              # test 유틸리티 and 모킹
|
+-- types             # 전체 application에서 사용되는 공통 타입
|
+-- utils             # 전체 application에서 사용되는 공통 유틸리티 함수들
```

각 feature 폴더 내부 디렉토리

```sh
src/features/기능1
|
+-- api         # 해당 기능1에서 사용하는 api 요청에 대한 정의를 내보내는 곳
|
+-- assets      # 해당 기능1에서 사용하는 assets
|
+-- components  # 해당 기능1에서 사용하는 컴포넌트
|
+-- hooks       # 해당 기능1에서 사용하는 커스텀훅
|
+-- stores      # 해당 기능1에서 사용하는 store
|
+-- types       # 해당 기능1에서 사용하는 타입 모음
|
+-- utils       # 해당 기능1에서 사용하는 util함수들
```

<br />

# 라우팅 구조

이 프로젝트의 라우팅 구조는 React Router를 사용하여 구성되었습니다. 주요 라우트와 서브 라우트는 다음과 같습니다:

라우팅 관리는 [src/app/router.tsx](src/app/router.tsx)에서 관리합니다.

- `/` ([랜딩 페이지](src/app/routes/landing.tsx))

- `/auth` (사용자 인증 루트)

  - `/auth/login` ([로그인 페이지](src/app/routes/auth/login.tsx))
  - `/auth/register` ([회원가입 페이지](src/app/routes/auth/register.tsx))

- `/app` (애플리케이션 루트) ( 사용자 인증 필요 )

  - `/app/calendar` ([캘린더 페이지](src/app/routes/app/calendar.tsx))

# 개발 기간

- 프로토타입 : 2023.01.07 ~ 2024.01.14
- 완성 : 2025.01.07 ~ 2025.02
