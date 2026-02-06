import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
  maxReachedStep?: number;
}

const STEP_TITLES = [
  'Choose Service',
  'Preferred Date & Time',
  'Personal Information',
  'Summary',
  'Confirmation',
];

import localFont from "next/font/local";

const levenim = localFont ({
  src: "../fonts/Levenim_MT/levenim-mt.ttf"
})
const cinzel = localFont ({
  src: "../fonts/Cinzel/CinzelDecorative-Regular.otf"
})
const open_sans = localFont ({
  src: "../fonts/OpenSans/OpenSans-SemiBold.ttf"
})
const inter_heading = localFont ({
  src: "../fonts/Inter/Inter-Medium.otf"
})
const inter = localFont ({
  src: "../fonts/Inter/Inter-Regular.otf"
})

export default function StepIndicator({ currentStep, onStepClick, maxReachedStep = currentStep }: StepIndicatorProps) {
  return (
    <>
    <div className="w-full flex justify-center mb-1">
      <h2
        className={`
          ${inter_heading.className}
          text-2xl md:text-3xl
          font-semibold
          text-[#ffdf20]
          transition-all duration-300
        `}
      >
        {STEP_TITLES[currentStep - 1]}
      </h2>
    </div>
    <div className="grid grid-cols-[auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto] items-start px-2 pb-2 w-full md:ml-8">
      {STEP_TITLES.map((title, index) => {
        const step = index + 1;
        const isCompleted = currentStep > step;
        const isCurrent = currentStep === step;
        const isClickable = step <= maxReachedStep;
        
        return (
          <React.Fragment key={step}>
            {/* Step */}
            <div className="flex flex-col items-center gap-2 min-w-[72px]">
              <div
                onClick={() => isClickable && onStepClick?.(step)}
                className={`
                  relative
                  w-8 h-8 rounded-full flex items-center justify-center
                  font-semibold
                  transition-all duration-300 ease-out
                  
                  ${isCompleted && 'bg-[#ffdf20]/90 text-gray-900'}
                  ${isCurrent && 'bg-[#ffdf20] text-[#1C1C1C] scale-110 shadow-[0_0_0_6px_rgba(245,183,0,0.15)]'}
                  ${!isCompleted && !isCurrent && 'bg-[#0D4D5C] text-white border border-[#F5B700]/60'}
                  ${isClickable && 'cursor-pointer hover:scale-105 active:scale-95'}
                  ${!isClickable && 'cursor-not-allowed opacity-60'}
                `}
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
              </div>
            </div>
            {/* Connector */}
            {step < STEP_TITLES.length && (
              <div className="relative flex items-center h-8">
                <div className="relative w-full h-8">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[3px] rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`
                        absolute left-0 top-1/2 -translate-y-1/2
                        h-full rounded-full
                        bg-gradient-to-r from-[#F5B700] to-[#FFD966]
                        transition-all duration-500 ease-out
                        ${currentStep > step ? 'w-full' : 'w-0'}
                      `}
                    />
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  </>
  );
}