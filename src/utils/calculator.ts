import { DiagnosticAnswers, DiagnosisReport, SimulationResult, PlanFeature } from '../types';

export function calculateDiagnosisReport(answers: DiagnosticAnswers): DiagnosisReport {
  const q1 = answers.q1 || "low_usage";
  const q2 = answers.q2 || "high_usage";
  const q3 = answers.q3 || "remote_work";

  // 1. Headline & Analysis
  let headline = "パッケージ型の利用率低迷・固定費掛け捨ての典型パターンです";
  let bodyText = "既存のリロクラブ等のパッケージ型サービスは、提携施設割引を中心としているため、一部の旅行・映画好き社員以外には利用されにくく、実質的な利用率は10%台に低迷しがちです。全社員分の固定月額費を払い続けている場合、多くのコストが未利用のまま消失しています。";
  
  const painPoints = [
    {
      title: "利用率の乖離",
      desc: "全社員のうち約85%が日常的に恩恵を感じておらず、形骸化。",
      icon: "fa-solid fa-chart-pie",
      color: "text-red-500"
    },
    {
      title: "固定費の浪費",
      desc: "未利用社員分も一律月額が徴収される『掛け捨て』構造。",
      icon: "fa-solid fa-money-bill-transfer",
      color: "text-amber-500"
    },
    {
      title: "就業環境のズレ",
      desc: "在宅・若手社員の日常ニーズ（コンビニ・デリバリー等）と不一致。",
      icon: "fa-solid fa-house-user",
      color: "text-blue-500"
    }
  ];

  if (q1 === "cost_inefficient") {
    headline = "費用対効果の不透明さ・無駄な固定費負担が顕著な状態です";
    bodyText = "毎月一定の福利厚生費を投じているにもかかわらず、社員満足度や採用・定着への寄与度が測定できていません。使った分だけ精算される従量制やポイント型「BeneFT」へのリプレイスにより、無駄な支出を即座に最適化できます。";
  } else if (q1 === "mismatch_needs") {
    headline = "従業員のライフスタイルと福利厚生内容のミスマッチが発生しています";
    bodyText = "若手世代やリモート社員は『休日にわざわざ提携施設へ行く』ことよりも、『日々のカフェ代やランチ、自己啓発、在宅環境補助』に還元される福利厚生を強く望んでいます。";
  } else if (q1 === "not_introduced") {
    headline = "ゼロからの構築に最適！無駄なパッケージ型を回避すべき好機です";
    bodyText = "既存の古いパッケージ型を導入してしまうと、利用率低迷と解約手続きの手間に悩まされるケースが後を絶ちません。最初からスマホ完結・実利用型の次世代モデル「BeneFT」を選択することが最も賢明です。";
  }

  // 2. Recommended Plan Customization based on Q2 (Goal) & Q3 (Workstyle)
  let planTitle = "次世代型カフェテリア・ポイント還元プラン（BeneFT フレックス）";
  let planConcept = "社員1人ひとりに専用ポイントを付与し、スマホからコンビニ・カフェ・デリバリー・自己啓発・健康支援など好きな使途で1円単位で利用可能。使われなかったポイントは失効または翌期繰越可能なため、企業の掛け捨てリスクをゼロに抑えます。";

  if (q2 === "engagement") {
    planTitle = "エンゲージメント＆還元実感特化型『BeneFT ピア・カフェテリア』";
    planConcept = "社員への感謝や成果をポイントで日常的に還元。形骸化したパッケージ型と異なり、同僚同士の称賛や健康増進行動に連動して付与でき、帰属意識と定着率を劇的に引き上げます。";
  } else if (q2 === "cost_savings") {
    planTitle = "完全実利用連動・コスト最適化型『BeneFT スマートハイブリッド』";
    planConcept = "固定費を極限まで抑え、従業員が実際に利用した分だけを後精算する無駄ゼロ設計。全社員分の掛け捨て月額費が発生していたリロクラブ等から移行することで、年間30〜50%の福利厚生予算適正化を実現します。";
  } else if (q2 === "recruiting") {
    planTitle = "採用ブランディング＆若手訴求特化型『BeneFT ネクストキャリア』";
    planConcept = "求職者が最も重視する『日常生活への還元』と『自己啓発・スキルアップ支援』をパッケージ化。スマホアプリ完結の先進的な福利厚生として採用ピッチ資料や求人票で強力なアピールポイントになります。";
  }

  // Feature 3 customization based on Q3 (Workstyle)
  let feature3Title = "多様な働き方に完全フィット";
  let feature3Desc = "若手〜ベテランまで、年代や居住地を問わず不公平感のない還元を実現。";
  let feature3Icon = "fa-solid fa-users text-amber-400";

  if (q3 === "remote_work") {
    feature3Title = "在宅・リモート環境に特化した手当連携";
    feature3Desc = "近隣施設に行けない在宅社員へ、UberEatsや出前館、通信費・光熱費補助、PC周辺機器補助として日常還元。";
    feature3Icon = "fa-solid fa-house-laptop text-indigo-400";
  } else if (q3 === "office_work") {
    feature3Title = "出社時のランチ・健康サポート充実";
    feature3Desc = "オフィス周辺のコンビニ・カフェ・飲食店での昼食補助や、フィットネス・健康診断オプションに直接利用可能。";
    feature3Icon = "fa-solid fa-utensils text-emerald-400";
  } else if (q3 === "young_generation") {
    feature3Title = "20〜30代が喜ぶデジタル即時還元";
    feature3Desc = "書籍購入（Amazon・Kindle）、Udemy動画学習、カフェ・日用品など、若手が本当に日常で使いたい使途を網羅。";
    feature3Icon = "fa-solid fa-bolt text-yellow-400";
  } else if (q3 === "diverse_regions") {
    feature3Title = "地方拠点・年齢差の不公平感をゼロに";
    feature3Desc = "大都市圏限定の提携店割引と異なり、全国の主要チェーン・EC・育児介護サービスで誰でも等しく利用可能。";
    feature3Icon = "fa-solid fa-map-location-dot text-amber-400";
  }

  const features: PlanFeature[] = [
    {
      title: "使った分だけ精算でコスト削減",
      desc: "全社員一律の掛け捨て固定費を撤廃。実利用分のみの精算で無駄なコストを30〜50%適正化。",
      icon: "fa-solid fa-coins text-emerald-400"
    },
    {
      title: "スマホ完結で利用率85%超",
      desc: "専用カードや紙のクーポン発券不要。LINEやスマホアプリで全国どこでも日常の支払いに充当。",
      icon: "fa-solid fa-mobile text-blue-400"
    },
    {
      title: feature3Title,
      desc: feature3Desc,
      icon: feature3Icon
    }
  ];

  return {
    headline,
    bodyText,
    painPoints,
    planTitle,
    planConcept,
    features
  };
}

export function calculateSimulation(employeeCount: number): SimulationResult {
  // Annual savings per employee approx 4,800 JPY (wasteful fixed overhead reduction)
  const annualSavings = employeeCount * 4800;
  const adminHours = Math.round(employeeCount * 1.2);

  return {
    annualSavings,
    formattedSavings: `約 ${annualSavings.toLocaleString('ja-JP')} 円`,
    adminHours,
    utilizationCurrent: 15,
    utilizationProjected: 86
  };
}
