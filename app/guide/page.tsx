import type { Metadata } from "next";
import GuidePage from "@/components/guide/GuidePage";

export const metadata: Metadata = {
  title: "Nova Guide — 처음 써보기",
  description:
    "자연어로 요청하면 Nova가 알아서 판단하고 실행합니다. 3단계 인터랙티브 가이드로 Nova를 체험해보세요.",
};

export default function Guide() {
  return <GuidePage />;
}
