import fs from "fs";
import path from "path";

export interface NovaMeta {
  version: string;
  generatedAt: string;
  stats: {
    commands: number;
    skills: number;
    agents: number;
    rules: number;
    mcpTools: number;
  };
  commands: Array<{ cmd: string; description: string }>;
  skills: Array<{ name: string; description: string }>;
  agents: Array<{ name: string; description: string; tools: string }>;
}

const FALLBACK_META_URL =
  "https://raw.githubusercontent.com/TeamSPWK/nova/main/docs/nova-meta.json";

/**
 * 빌드 타임에 nova-meta.json을 로드한다.
 *
 * 우선순위:
 * 1. public/nova-meta.json (sync workflow가 커밋한 로컬 파일)
 * 2. GitHub raw URL에서 fetch (fallback)
 */
export async function getNovaMeta(): Promise<NovaMeta> {
  // 1. 로컬 파일 시도
  const localPath = path.join(process.cwd(), "public", "nova-meta.json");
  if (fs.existsSync(localPath)) {
    const raw = fs.readFileSync(localPath, "utf-8");
    return JSON.parse(raw) as NovaMeta;
  }

  // 2. GitHub raw URL fetch
  const res = await fetch(FALLBACK_META_URL, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Failed to fetch nova-meta.json: ${res.status}`);
  }
  return (await res.json()) as NovaMeta;
}
