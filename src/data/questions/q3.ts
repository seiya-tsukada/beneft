import { Question } from '../../types';

export const q3: Question = {
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
};
