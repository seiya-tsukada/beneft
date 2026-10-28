# BeneFT 福利厚生診断

3問の診断に答えると、課題分析・おすすめプラン・導入効果の試算を表示し、無料相談の申し込みまで行うシングルページアプリです。

React 19 + Vite + Tailwind CSS v4 で構成し、Vercel にデプロイしています（`vercel.json` で全パスを `index.html` にリライト）。

## 開発

前提: Node.js 20 以上

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # 型チェック (tsc)
npm test         # ユニットテスト (vitest)
npm run build    # dist/ に本番ビルド
```

## ディレクトリ構成

| パス | 内容 |
| --- | --- |
| `src/App.tsx` | 画面遷移と状態の管理 |
| `src/lib/` | URL ルーティング・セッション保存などのブラウザ周りの処理 |
| `src/data/` | 設問・診断文言・比較表などのコンテンツ |
| `src/utils/` | 診断結果と試算の計算、表示用フォーマット |
| `src/components/` | 画面とモーダル（共通部品は `components/ui/`） |

文言や設問を変えるときは、基本的に `src/data/` だけを編集すれば済むようにしています。設問は 1 問 1 ファイル（`src/data/questions/q1.ts` 〜 `q3.ts`）で、表示順は `src/data/questions/index.ts` の配列で決まります。

## 画面と URL

| URL | 画面 | 備考 |
| --- | --- | --- |
| `/` | トップ | |
| `/quiz` | 設問 | 回答完了後のローディング画面も同じ URL |
| `/result` | 診断結果 | 未回答で開くとトップへ戻る |
| `/thanks` | 送信完了 | フォーム未送信なら結果画面へ戻る |

回答内容はタブごとに `sessionStorage` に保存し、リロードしても結果画面を開き直せます。

## 補足

- アイコンは Font Awesome 6 (CDN) を使っています（`index.html`）。
- リード送信は現状デモ動作で、外部への送信は行っていません（`App.tsx` の `handleSubmitLead`）。
- `metadata.json` は Google AI Studio 用の設定ファイルです。
