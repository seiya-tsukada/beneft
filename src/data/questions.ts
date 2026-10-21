import { Question } from '../types';

export const QUESTIONS: Question[] = [
  {
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
  },
  {
    id: 2,
    step: 2,
    category: "QUESTION 02 / 重視する目的",
    title: "福利厚生において最も重視したい目的は？",
    subtitle: "今後注力したい経営・人事課題を選択してください",
    choices: [
      {
        key: "engagement",
        label: "従業員エンゲージメント・離職防止の向上",
        sub: "社員への還元を実感させ、会社への愛着や帰属意識を高めたい",
        icon: "fa-solid fa-heart-pulse",
        iconBg: "bg-rose-100 text-rose-600"
      },
      {
        key: "high_usage",
        label: "利用率の高さと手軽さ（使いやすさ）",
        sub: "申請の煩わしさをゼロにし、全員がスマホから日常的に使える体験",
        icon: "fa-solid fa-mobile-screen-button",
        iconBg: "bg-blue-100 text-blue-600"
      },
      {
        key: "cost_savings",
        label: "コスト削減と柔軟なカスタマイズ性",
        sub: "実利用に応じた無駄のない予算配分と柔軟な自社ルール設定",
        icon: "fa-solid fa-scale-balanced",
        iconBg: "bg-emerald-100 text-emerald-600"
      },
      {
        key: "recruiting",
        label: "採用力の強化・企業の魅力付け",
        sub: "求職者や新入社員に『先進的で働きやすい会社』としてアピールしたい",
        icon: "fa-solid fa-bullhorn",
        iconBg: "bg-purple-100 text-purple-600"
      }
    ]
  },
  {
    id: 3,
    step: 3,
    category: "QUESTION 03 / 組織・働き方",
    title: "貴社の主な働き方・従業員層は？",
    subtitle: "貴社の職場環境やメンバー構成を選択してください",
    choices: [
      {
        key: "remote_work",
        label: "リモートワーク / 在宅勤務メイン",
        sub: "在宅補助、オンライン自己啓発、デリバリーなど遠隔での支援が必要",
        icon: "fa-solid fa-house-laptop",
        iconBg: "bg-indigo-100 text-indigo-600"
      },
      {
        key: "office_work",
        label: "オフィス出社メイン",
        sub: "ランチ補助、健康維持、オフィス周辺でのリフレッシュ支援を重視",
        icon: "fa-solid fa-building",
        iconBg: "bg-slate-100 text-slate-700"
      },
      {
        key: "young_generation",
        label: "20〜30代の若手社員が多い",
        sub: "デジタル完結、カフェ・日用品・スキルアップなど手軽な還元を好む",
        icon: "fa-solid fa-users-rays",
        iconBg: "bg-emerald-100 text-emerald-600"
      },
      {
        key: "diverse_regions",
        label: "多様な年齢層・地方拠点がある",
        sub: "居住地やライフステージによる不公平感をなくし、誰もが使える仕組み",
        icon: "fa-solid fa-map-location-dot",
        iconBg: "bg-amber-100 text-amber-600"
      }
    ]
  }
];
