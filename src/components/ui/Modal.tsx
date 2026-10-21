import React from 'react';

interface ModalProps {
  isOpen: boolean;
  // Classes for the white panel (size, padding, layout)
  className: string;
  overlayClassName?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  className,
  overlayClassName = 'bg-slate-900/60',
  children
}) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 ${overlayClassName} backdrop-blur-xs flex items-center justify-center p-4`}>
      <div className={`bg-white rounded-2xl w-full border border-slate-200 ${className}`}>{children}</div>
    </div>
  );
};

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
}

export const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  className = 'text-slate-400 hover:text-slate-600'
}) => (
  <button type="button" onClick={onClick} className={`${className} cursor-pointer`} aria-label="閉じる">
    <i className="fa-solid fa-xmark"></i>
  </button>
);
