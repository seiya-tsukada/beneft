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
| `api/` | Vercel Functions（`/api/*` のエンドポイント） |
| `server/` | API の処理本体・メールテンプレート・メール送信 |

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
- 無料相談フォームの送信先は `POST /api/consultation` です。詳しくは下の「無料相談メール」を参照してください。
- `metadata.json` は Google AI Studio 用の設定ファイルです。

## 無料相談メール

結果画面の無料相談フォームを送信すると、`POST /api/consultation` が [Resend](https://resend.com) で次の 2 通を送ります。

| メール | 宛先 | テンプレート |
| --- | --- | --- |
| 運営向け通知（返信すると申込者宛て） | `MAIL_FROM` のアドレス（`CONSULTATION_NOTIFY_TO` があればそちら） | `server/consultation/templates/staffNotification.ts` |
| 申込者への自動返信 | フォームのメールアドレス | `server/consultation/templates/userConfirmation.ts` |

- 文面を変えるときは上のテンプレートを編集します。共通の枠・フッター・会社名は `templates/layout.ts` にあります。
- 運営向け通知が送れなかった場合だけ送信エラーにし、自動返信の失敗はログに残すだけにしています。
- 送信処理は `server/mail/resend.ts`、入力チェックとメール設定の読み込みは `server/consultation/handler.ts` です。
- 開発中は `npm run dev` の Vite サーバーが `/api/consultation` を処理します。`RESEND_API_KEY` が未設定なら実際には送らず、内容をターミナルに表示します。本番（Vercel）では `api/consultation.ts` が処理します。

### 環境変数

`.env.example` を `.env.local` にコピーして設定します。Vercel ではプロジェクトの Settings → Environment Variables に同じキーを設定してください（`VITE_` を付けないこと。付けるとブラウザに公開されます）。

| キー | 必須 | 内容 |
| --- | --- | --- |
| `RESEND_API_KEY` | Vercel では必須 | Resend の API キー。権限は Sending access・送信ドメイン限定を推奨 |
| `MAIL_FROM` | API キー設定時は必須 | 送信元。例 `BeneFT <info@example.com>`。ドメインは Resend で認証済みであること |
| `CONSULTATION_NOTIFY_TO` | 任意 | 運営向け通知の宛先を送信元と別にしたいときだけ設定 |

設定が足りない・形式が不正なときは、送信せずに 500（`mail_not_configured`）を返します。

### セキュリティ上の対策

- API キーはサーバー側（Vercel Functions）だけで読み、ブラウザには出しません。
- `Content-Type: application/json` 以外と、別オリジンからの送信（`Origin` がホストと異なる）は拒否します。本文は 16KB まで。
- 入力はサーバー側で再検証します（必須・200 文字以内・改行や制御文字なし、メールアドレスは 1 件のみ、役職は選択肢のみ、従業員数は範囲内）。
- メール本文の HTML に入れる値はすべてエスケープしています。
