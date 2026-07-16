// components/ToothRoot.tsx
import React from 'react';

interface ToothRootProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const ToothRoot: React.FC<ToothRootProps> = ({
  children,
  className = '',
  contentClassName = 'items-start text-left max-w-[240px]',
}) => {
  return (
    <div className={`relative flex flex-col ${className}`}>
      {/* Crown: solid rounded rectangle, sits above the gumline */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-[85%] w-32 h-12 lg:w-36 lg:h-14 rounded-[20px] bg-[#fdfbf5] shadow-[0_4px_10px_rgba(0,0,0,0.18)] pointer-events-none select-none"
      />

      {/* Root: your tooth artwork, faded, behind the text content */}
      <img
        src="/tooth-shape.svg"
        alt=""
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 top-0 w-36 lg:w-44 h-auto opacity-30 pointer-events-none select-none"
      />

      <div className={`relative z-10 pt-10 lg:pt-12 flex flex-col px-2 ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default ToothRoot;