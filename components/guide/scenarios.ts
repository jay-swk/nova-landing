export interface Step {
  type: "user" | "nova" | "result";
  content: string;
  detail?: string;
  status?: "pass" | "fail" | "info" | "working";
}

export interface Scenario {
  level: number;
  title: string;
  subtitle: string;
  complexity: string;
  badge: string;
  badgeColor: string;
  description: string;
  timeEstimate: string;
  steps: Step[];
}

export const scenarios: Scenario[] = [
  {
    level: 1,
    title: "Todo API 만들기",
    subtitle: "설치하고 바로 써보기",
    complexity: "간단 (1-2 파일)",
    badge: "Beginner",
    badgeColor: "#22c55e",
    description:
      "기존 Express 프로젝트에 Todo 기능을 추가합니다. Nova를 설치하고 자연어로 요청하면 끝. 커맨드를 외울 필요 없이 Nova가 백그라운드에서 맥락과 검증 루프를 관리합니다.",
    timeEstimate: "5분",
    steps: [
      {
        type: "user",
        content: "이 프로젝트에 Todo CRUD API를 추가해줘.",
      },
      {
        type: "nova",
        content: "복잡도 판단: 간단 (2파일 변경) → 바로 구현 시작",
        detail:
          "Nova가 기존 프로젝트 구조를 분석하고, 라우트 1개 + 모델 1개만 추가하면 되는 간단한 작업이라 Plan 없이 바로 구현합니다.",
        status: "working",
      },
      {
        type: "nova",
        content: "구현 완료 — src/routes/todos.ts, src/models/todo.ts 생성",
        status: "info",
      },
      {
        type: "nova",
        content: "Evaluator 자동 실행 (독립 서브에이전트)",
        detail:
          "코드를 만든 AI와 다른 독립된 AI가 검증합니다. 같은 AI가 자기 코드를 검증하면 '잘했다'고 착각하기 때문입니다.",
        status: "working",
      },
      {
        type: "result",
        content: "PASS — 커밋 가능",
        detail:
          "변경 코드에 대한 테스트가 없습니다. 테스트 추가를 권장합니다. (Warning)",
        status: "pass",
      },
      {
        type: "user",
        content: "커밋해줘",
      },
      {
        type: "nova",
        content:
          "커밋 완료. 자연어로 요청했을 뿐인데, Nova가 자동으로 검증까지 마쳤습니다.",
        status: "pass",
      },
    ],
  },
  {
    level: 2,
    title: "JWT 인증 추가",
    subtitle: "Nova가 보안 버그를 잡는 순간",
    complexity: "보통 → 고위험 상향 (5파일)",
    badge: "Intermediate",
    badgeColor: "#eab308",
    description:
      "파일이 3개 이상이면 Nova가 자동으로 Plan을 먼저 작성합니다. 인증은 '고위험 영역'이라 검증 강도가 한 단계 상향됩니다.",
    timeEstimate: "15분",
    steps: [
      {
        type: "user",
        content: "이 프로젝트에 JWT 인증 기능을 추가해줘.",
      },
      {
        type: "nova",
        content:
          "복잡도 판단: 보통 (5파일) + 인증 = 고위험 → 한 단계 상향 적용",
        detail:
          "인증/DB/결제 영역은 파일 수와 무관하게 자동으로 한 단계 상향됩니다. 5파일이지만 고위험이라 더 엄격한 검증이 적용됩니다.",
        status: "working",
      },
      {
        type: "nova",
        content: "Plan 작성 완료 — 회원가입, 로그인, 미들웨어, 토큰 갱신 정의",
        detail:
          "3파일 이상 + 고위험 상향이므로 Plan을 먼저 작성합니다. 커맨드를 직접 호출할 필요 없습니다.",
        status: "info",
      },
      {
        type: "user",
        content: "좋아, 구현 진행해줘.",
      },
      {
        type: "nova",
        content: "구현 완료 — 5개 파일 생성/수정",
        detail:
          "src/auth/register.ts, src/auth/login.ts, src/middleware/auth.ts, src/auth/refresh.ts, src/models/user.ts",
        status: "info",
      },
      {
        type: "nova",
        content: "Evaluator 실행 중... (고위험 상향 → 3단계 풀 검증)",
        detail:
          "Layer 1: 정적 분석 → Layer 2: 의미론 분석 → Layer 3: 실행 검증\n인증 영역이라 기본보다 엄격한 검증이 적용됩니다.",
        status: "working",
      },
      {
        type: "result",
        content: "FAIL — Hard-Block 2건 (즉시 중단)",
        detail:
          '🚨 Hard-Block: jwt_secret이 코드에 하드코딩 ("mysecret123")\n🚨 Hard-Block: 비밀번호를 bcrypt 없이 평문 저장\n\n보안 취약점은 Hard-Block으로 분류됩니다. 자동 진행이 중단되고 사용자 확인을 요청합니다.',
        status: "fail",
      },
      {
        type: "user",
        content: "수정해줘.",
      },
      {
        type: "nova",
        content:
          "사용자 승인 확인 → jwt_secret을 환경변수로 이동, bcrypt 해싱 추가",
        detail:
          "Hard-Block은 사용자 승인 없이 자동 수정하지 않습니다. AI는 제안, 인간이 결정합니다.\n수정은 지적된 항목만 — 다른 코드는 건드리지 않습니다.",
        status: "working",
      },
      {
        type: "result",
        content: "재검증 PASS — 커밋 가능",
        detail:
          "Nova 없이 했다면? 이 2건은 프로덕션에서 사용자가 발견했을 보안 취약점입니다.",
        status: "pass",
      },
    ],
  },
  {
    level: 3,
    title: "결제 시스템 연동",
    subtitle: "멀티 에이전트가 협업하는 대규모 작업",
    complexity: "복잡 (12파일, 3 스프린트)",
    badge: "Advanced",
    badgeColor: "#a855f7",
    description:
      "8파일 이상이면 Nova가 스프린트로 분할합니다. 결제는 고위험 영역이라 설계부터 검증까지 전 과정에 더 엄격한 기준이 적용됩니다.",
    timeEstimate: "1시간",
    steps: [
      {
        type: "user",
        content: "Stripe 결제를 연동해줘. 구독 결제 + 웹훅 처리까지.",
      },
      {
        type: "nova",
        content:
          "복잡도 판단: 복잡 (12파일) + 결제 = 고위험 → Plan → Design → 스프린트 분할",
        detail:
          "결제는 '고위험 영역'이라 파일 수와 무관하게 한 단계 상향합니다. 자연어 요청 하나로 전체 설계가 시작됩니다.",
        status: "working",
      },
      {
        type: "nova",
        content: "설계 완료 → 3개 스프린트로 분할",
        detail:
          "Sprint 1: DB 스키마 + 모델 (3파일)\nSprint 2: API 엔드포인트 (5파일)\nSprint 3: 웹훅 + 프론트엔드 (4파일)\n\n각 스프린트마다 독립 검증을 수행합니다.",
        status: "info",
      },
      {
        type: "user",
        content: "설계 괜찮아 보여. 진행해.",
      },
      {
        type: "nova",
        content: "Sprint 1 실행 — 구현 → 독립 검증",
        detail:
          "각 스프린트마다 구현과 검증을 독립 에이전트가 분리 수행합니다.",
        status: "working",
      },
      {
        type: "result",
        content: "Sprint 1 PASS",
        status: "pass",
      },
      {
        type: "nova",
        content: "Sprint 2 실행 — 구현 → 독립 검증 (결제 API 보안 집중)",
        detail:
          "결제 API는 보안 관점이 추가로 적용되어 금액 조작, 결제 상태 위변조를 집중 점검합니다.",
        status: "working",
      },
      {
        type: "result",
        content: "Sprint 2 FAIL — Hard-Block 1건 (즉시 중단)",
        detail:
          "🚨 Hard-Block: Stripe 웹훅 서명 검증 누락\n외부에서 가짜 결제 이벤트를 주입할 수 있는 보안 취약점입니다.\n\n사용자 확인을 요청합니다.",
        status: "fail",
      },
      {
        type: "user",
        content: "수정 진행해.",
      },
      {
        type: "nova",
        content:
          "사용자 승인 확인 → stripe.webhooks.constructEvent() 서명 검증 추가 → 재검증 PASS",
        status: "pass",
      },
      {
        type: "nova",
        content: "Sprint 3 실행 + 전체 통합 검증 → PASS",
        status: "pass",
      },
      {
        type: "result",
        content: "전체 PASS — 3 스프린트 완료, 커밋 가능",
        detail:
          "자연어 한 줄로 시작해서, 설계 → 스프린트 분할 → 독립 검증 → 보안 Hard-Block 차단까지 자동으로.\n결제 같은 고위험 영역도 Nova가 구조적으로 관리합니다.",
        status: "pass",
      },
    ],
  },
];
