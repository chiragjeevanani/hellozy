import React from 'react';

export default function ProgressBar({ steps, currentStep }) {
  const percentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="w-full mb-8">
      {/* Step Numbers & Labels */}
      <div className="flex justify-between items-center text-xs font-bold text-stone-500 mb-3 font-display uppercase tracking-wider">
        <span className="bg-stone-100 px-3 py-1 rounded-full text-stone-600 border border-stone-200">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
          {steps[currentStep]}
        </span>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full bg-stone-150 h-2.5 rounded-full overflow-hidden border border-stone-200/50 shadow-inner">
        <div 
          className="bg-accent h-full rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Desktop Step Names */}
      <div className="hidden md:flex justify-between mt-3.5 px-1">
        {steps.map((step, idx) => {
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;
          return (
            <span 
              key={idx} 
              className={`text-[11px] font-bold font-display tracking-wide uppercase transition-colors duration-300 ${
                isActive 
                  ? 'text-primary border-b-2 border-primary pb-0.5' 
                  : isCompleted 
                    ? 'text-accent' 
                    : 'text-stone-400'
              }`}
            >
              {step}
            </span>
          );
        })}
      </div>
    </div>
  );
}
