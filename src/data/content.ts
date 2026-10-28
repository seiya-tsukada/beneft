// Static copy shown across screens. Edit here rather than in the components.

interface IconItem {
  icon: string;
  iconBg: string;
  title: string;
  desc: string;
}

// Hero: pain points above the start button
export const HERO_PAIN_POINTS: IconItem[] = [
  {
    icon: 'fa-solid fa-arrow-trend-down',
    iconBg: 'bg-red-100 text-red-600',
    title: '利用率の低迷',
    desc: '提携施設が遠く、一部社員しか使っていない'
  },
  {
    icon: 'fa-solid fa-coins',
    iconBg: 'bg-amber-100 text-amber-600',
    title: '費用対効果の不透明さ',
    desc: '使われないのに全社員分の固定費が発生'
  },
  {
    icon: 'fa-solid fa-laptop-house',
    iconBg: 'bg-indigo-100 text-indigo-600',
    title: '在宅・多様性の不一致',
    desc: '在宅勤務や若手社員の日常に還元されない'
  }
];

// Hero: social proof banner
export const HERO_STATS = [
  { icon: 'fa-solid fa-building text-blue-400', label: '診断実績', value: '4,200社突破' },
  { icon: 'fa-solid fa-face-smile text-emerald-400', label: '見直し後 満足度', value: '94.8%' },
  { icon: 'fa-solid fa-piggy-bank text-amber-400', label: '平均コスト削減率', value: '最大 42%' }
];

// Hero: what the diagnosis does
export const HERO_FEATURES: IconItem[] = [
  {
    icon: 'fa-solid fa-clipboard-check',
    iconBg: 'bg-blue-100 text-blue-600',
    title: '1. 現状の課題を客観分析',
    desc: '固定費負担や社員の利用率ギャップなど、見過ごされがちな福利厚生の課題を明確化。'
  },
  {
    icon: 'fa-solid fa-sliders',
    iconBg: 'bg-emerald-100 text-emerald-600',
    title: '2. 最適なリプレイス案を提示',
    desc: 'ポイント型、実利用精算など、貴社の就業形態に最適な次世代モデル「BeneFT」を提案。'
  },
  {
    icon: 'fa-solid fa-calculator',
    iconBg: 'bg-purple-100 text-purple-600',
    title: '3. 削減額＆利用率を即時算出',
    desc: '従業員数を指定するだけで、年間の想定削減コストや利用率向上インパクトをリアルタイム算出。'
  }
];

// Loading: messages and checklist advance together, one step per entry
export const LOADING_STEPS = [
  {
    message: '貴社の課題と従業員プロファイルを照合しています...',
    label: '現状のパッケージ型（リロクラブ等）ギャップ分析'
  },
  {
    message: 'パッケージ型（リロクラブ等）とのギャップ数値を算出中...',
    label: '就業形態・従業員層に応じた推奨プラン選定'
  },
  {
    message: '「BeneFT」による最適な次世代プランを構成しています...',
    label: '年間想定削減コスト＆利用率シミュレーション構築'
  }
];

// Result: package-type vs BeneFT comparison table
export const COMPARISON_ROWS = [
  { item: '社員の利用率', current: '12〜18%（一部の社員のみ）', beneft: '82〜89%（全社員が日常利用）' },
  { item: 'コスト構造', current: '全員分の月額固定費（未利用分も発生）', beneft: '低額の基本料＋実利用分のみ精算' },
  { item: '利用シーン', current: '宿泊・映画・提携レジャー施設が中心', beneft: 'カフェ・コンビニ・書籍・フィットネスなど日常使い' },
  { item: 'リモート・若手対応', current: '都市部・特定施設に限られ使いづらい', beneft: 'スマホ完結で全国どこでも利用可能' },
  { item: '管理者の工数', current: '会報誌配布・クーポン管理・問い合わせ対応', beneft: '管理画面で自動集計、工数を約90%削減' }
];

// Result: employee count slider
export const EMPLOYEE_COUNT = { default: 100, min: 10, max: 1000, step: 10 };
export const EMPLOYEE_PRESETS = [30, 50, 100, 300, 500];

// Result: lead form position options (the first is the default)
export const POSITIONS = ['総務・人事責任者', '総務・人事担当者', '経営者・役員', '経営企画・管理部門', 'その他'];

// PDF sheet: migration roadmap
export const MIGRATION_STEPS = [
  {
    title: '現行契約の確認・解約予告通知',
    desc: 'リロクラブ等の年間自動更新月を確認し、解約期日の1〜3ヶ月前に通知書を送付。'
  },
  {
    title: '「BeneFT」ポイント設計・付与ルール策定',
    desc: '月次または年次の付与ポイント額、利用可能カテゴリ（健康・自己啓発・日用品・リモート等）を決定。'
  },
  {
    title: '社員向けキックオフ＆アプリ配布',
    desc: 'スマホアプリ・WEBの招待コード配布で、導入初日から全従業員が利用開始可能。'
  }
];

