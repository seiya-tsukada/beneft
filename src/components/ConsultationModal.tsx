import React, { useState } from 'react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  userEmail
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('平日 10:00〜10:15');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const slots = [
    '平日 10:00〜10:15',
    '平日 11:30〜11:45',
    '平日 14:00〜14:15',
    '平日 16:30〜16:45',
    'その他日程（別途メールにて調整）'
  ];

  const handleBooking = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">無料特典</span>
            <h3 className="font-bold text-slate-900 text-sm">専任コンサルタント 15分オンライン相談</h3>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
            aria-label="閉じる"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
              <i className="fa-solid fa-check"></i>
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">相談枠のリクエストを受付ました</h4>
            <p className="text-xs text-slate-600">
              担当コンサルタントより、{userEmail || 'ご登録アドレス'} 宛てにZoom招待URLをお送りします。
            </p>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              「BeneFT」導入時の解約スケジュールや従業員向け周知マニュアルなど、貴社の状況に合わせた個別相談が可能です。
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                ご希望の時間帯を選択
              </label>
              <div className="space-y-2">
                {slots.map((slot) => (
                  <label 
                    key={slot}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                      selectedSlot === slot 
                        ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-semibold' 
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="consultation_slot"
                      value={slot}
                      checked={selectedSlot === slot}
                      onChange={() => setSelectedSlot(slot)}
                      className="text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <span>{slot}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button 
                type="button"
                onClick={onClose} 
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition cursor-pointer"
              >
                キャンセル
              </button>
              <button 
                type="button"
                onClick={handleBooking} 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-lg text-xs transition cursor-pointer shadow-xs"
              >
                この時間帯で予約する
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
