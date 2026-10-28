import { Question } from '../../types';

export const q2: Question = {
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
};
