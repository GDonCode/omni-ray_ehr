import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export default function StepIndicator({ currentStep, totalSteps = 5 }: StepIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between px-8 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-l md:w-[60%] md:ml-8">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step;
        const isCurrent = currentStep === step;
        const isPending = currentStep < step;

        return (
          <React.Fragment key={step}>
            {/* Step Circle */}
            <div className="flex flex-col items-center gap-1">
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  font-bold text-sm transition-all duration-300
                  ${isCompleted ? 'bg-yellow-400 text-gray-900' : ''}
                  ${isCurrent ? 'bg-white text-[#011B3E] ring-4 ring-yellow-400 scale-110' : ''}
                  ${isPending ? 'bg-[#032d68] text-white/60 border-2 border-white/30' : ''}
                `}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="relative w-12 h-0.5 bg-white/20">
                <div 
                  className={`
                    absolute top-0 left-0 h-full bg-[#E6C84F] transition-all duration-300
                    ${currentStep > step ? 'w-full' : 'w-0'}
                  `}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}