import { Question } from '../../types';

export const q1: Question = {
  id: 1,
  step: 1,
  category: "QUESTION 01 / 現状の課題",
  title: "現在の福利厚生の導入状況・課題は？",
  subtitle: "自社の実態に最も近い項目を選択してください",
  choices: [
    {
      key: "low_usage",
      label: "リロクラブ等のパッケージ型を導入中だが、利用率が低い",
      sub: "提携施設が限定的で、社員の大半がほとんど使っていない状態",
      icon: "fa-solid fa-arrow-trend-down",
      iconBg: "bg-red-100 text-red-600"
    },
    {
      key: "cost_inefficient",
      label: "導入済みだが、費用対効果（コスト）に見合っていないと感じる",
      sub: "使われないのに全社員分の固定費を毎月支払い続けている",
      icon: "fa-solid fa-coins",
      iconBg: "bg-amber-100 text-amber-600"
    },
    {
      key: "mismatch_needs",
      label: "従業員（若手やリモートワーカー等）のニーズに合っていない",
      sub: "旅行や映画の割引が中心で、日常や在宅ワークに役立たない",
      icon: "fa-solid fa-user-xmark",
      iconBg: "bg-blue-100 text-blue-600"
    },
    {
      key: "not_introduced",
      label: "まだ何も導入していない / 制度を見直したい",
      sub: "採用強化や社員定着のために、本当に喜ばれる新しい仕組みを探している",
      icon: "fa-solid fa-wand-magic-sparkles",
      iconBg: "bg-emerald-100 text-emerald-600"
    }
  ]
};
