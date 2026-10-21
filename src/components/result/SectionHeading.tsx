import React from 'react';

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  note?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  label,
  title,
  note
}) => (
  <div className="mb-6">
    <p className="text-xs font-bold text-blue-600 tracking-wider mb-1.5">
      {index} <span className="mx-1 text-slate-300">|</span> {label}
    </p>
    <h3 className="text-lg sm:text-xl font-bold text-slate-900 [word-break:auto-phrase]">{title}</h3>
    {note && <p className="text-sm text-slate-500 mt-1 leading-relaxed">{note}</p>}
  </div>
);
