import React, { useState } from 'react';
import { POSITIONS } from '../../data/content';
import { LeadFormData } from '../../types';

interface LeadFormProps {
  onSubmitLead: (data: LeadFormData) => void;
  onOpenPrivacy: () => void;
  isSubmitting: boolean;
}

// The header's 提案シート請求 button scrolls here while the result screen is shown
export const LEAD_FORM_ID = 'lead-form-section';

const inputClass =
  'w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition';

const RequiredTag = () => (
  <span className="ml-1.5 text-[10px] font-bold text-white bg-blue-600 px-1.5 py-0.5 rounded">必須</span>
);

export const LeadForm: React.FC<LeadFormProps> = ({ onSubmitLead, onOpenPrivacy, isSubmitting }) => {
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState(POSITIONS[0]);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !name.trim() || !email.trim()) {
      alert('必須項目をすべてご入力ください。');
      return;
    }
    if (!privacyAgreed) {
      alert('個人情報の取扱い方針にご同意の上、送信してください。');
      return;
    }

    onSubmitLead({
      company: company.trim(),
      name: name.trim(),
      email: email.trim(),
      position
    });
  };

  return (
    <div id={LEAD_FORM_ID} className="bg-white rounded-2xl border-2 border-blue-600 shadow-lg p-6 sm:p-10 mt-10">
      <div className="text-center mb-8 [word-break:auto-phrase]">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          診断レポートを無料で受け取る
        </h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          <span className="sm:block">詳細な試算結果・他社の乗り換え事例・移行手順を</span>
          <span className="sm:block">まとめた提案シート（PDF）をお送りします。</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
        <div>
          <label htmlFor="lead-company" className="flex items-center text-sm font-bold text-slate-700 mb-1.5">
            会社名<RequiredTag />
          </label>
          <input
            type="text"
            id="lead-company"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="例：株式会社サンプル"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="lead-name" className="flex items-center text-sm font-bold text-slate-700 mb-1.5">
            お名前<RequiredTag />
          </label>
          <input
            type="text"
            id="lead-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例：山田 太郎"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="lead-email" className="flex items-center text-sm font-bold text-slate-700 mb-1.5">
            メールアドレス<RequiredTag />
          </label>
          <input
            type="email"
            id="lead-email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="例：yamada@example.co.jp"
            className={inputClass}
          />
          <p className="text-xs text-slate-400 mt-1.5">提案シートの送付先になります。会社のメールアドレスをご入力ください。</p>
        </div>

        <div>
          <label htmlFor="lead-position" className="block text-sm font-bold text-slate-700 mb-1.5">
            部署・役職
          </label>
          <select
            id="lead-position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className={inputClass}
          >
            {POSITIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2">
          <input
            type="checkbox"
            id="lead-privacy"
            required
            checked={privacyAgreed}
            onChange={(e) => setPrivacyAgreed(e.target.checked)}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
          <label htmlFor="lead-privacy" className="text-sm text-slate-600 cursor-pointer">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-blue-600 underline underline-offset-2 hover:text-blue-700 cursor-pointer"
            >
              個人情報の取扱い
            </button>
            に同意する
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <i className="fa-solid fa-spinner animate-spin"></i>
              <span>送信中...</span>
            </>
          ) : (
            <span>無料でレポートを受け取る</span>
          )}
        </button>

        <p className="text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <span><i className="fa-solid fa-lock mr-1"></i>SSL暗号化通信</span>
          <span>しつこい営業連絡は行いません</span>
        </p>
      </form>
    </div>
  );
};
