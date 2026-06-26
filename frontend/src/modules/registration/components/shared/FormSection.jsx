import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FormSection({ title, children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-xs mb-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-stone-50 border-b border-stone-100 hover:bg-stone-100/50 transition-colors"
      >
        <h3 className="text-base font-bold text-stone-900 font-display text-left">
          {title}
        </h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-stone-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-stone-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-6 space-y-6">
          {children}
        </div>
      )}
    </div>
  );
}
