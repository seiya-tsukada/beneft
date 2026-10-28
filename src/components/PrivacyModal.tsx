import React from 'react';
import { CloseButton, Modal } from './ui/Modal';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} className="max-w-lg p-6 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-bold text-slate-900 text-sm">個人情報の取扱い方針</h3>
        <CloseButton onClick={onClose} />
      </div>
      <div className="py-4 text-xs text-slate-600 space-y-3 leading-relaxed max-h-60 overflow-y-auto">
        <p>1. 収集した企業名、担当者名、連絡先情報は、「BeneFT」無料相談の日程調整および関連する最適化提案のご連絡のみに利用いたします。</p>
        <p>2. 法令に基づく場合を除き、ご本人の同意なく第三者への提供は行いません。</p>
        <p>3. 入力情報はSSL暗号化通信により安全に保護されております。</p>
      </div>
      <div className="pt-3 border-t border-slate-100 text-right">
        <button 
          type="button"
          onClick={onClose} 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition cursor-pointer"
        >
          閉じる
        </button>
      </div>
    </Modal>
  );
};
