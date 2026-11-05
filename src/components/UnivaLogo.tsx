import React from 'react';

interface UnivaLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'white';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const UnivaLogo: React.FC<UnivaLogoProps> = ({
  className = '',
  variant = 'dark',
  showTagline = false,
  size = 'md',
}) => {
  const isWhite = variant === 'white';
  const textColor = isWhite ? 'text-white' : 'text-[#1B1A4E]';
  const subTextColor = isWhite ? 'text-slate-300' : 'text-[#55587A]';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const tagSizes = {
    sm: 'text-[9px] tracking-[0.22em]',
    md: 'text-[11px] tracking-[0.25em]',
    lg: 'text-[13px] tracking-[0.28em]',
    xl: 'text-[16px] tracking-[0.3em]',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Exact Vector Brand Emblem from Company Profile */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Outer Rounded U in Brand Indigo #3B2FBF */}
          <path
            d="M20 20V55C20 71.5685 33.4315 85 50 85C66.5685 85 80 71.5685 80 55V20C80 15.5817 76.4183 12 72 12C67.5817 12 64 15.5817 64 20V55C64 62.732 57.732 69 50 69C42.268 69 36 62.732 36 55V20C36 15.5817 32.4183 12 28 12C23.5817 12 20 15.5817 20 20Z"
            fill="#3B2FBF"
          />
          {/* Inner Central Emblem Dot in Accent Teal #0E9F80 */}
          <circle cx="50" cy="46" r="9.5" fill="#0E9F80" />
        </svg>
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col leading-none">
        <span className={`font-extrabold ${textSizes[size]} tracking-tight ${textColor} font-sans`}>
          univa
        </span>
        <span className={`font-bold ${tagSizes[size]} uppercase ${subTextColor} mt-0.5`}>
          HIRE TECH
        </span>
        {showTagline && (
          <span className="text-[10px] text-[#0E9F80] font-medium tracking-normal mt-1">
            Strategic Manpower Partner
          </span>
        )}
      </div>
    </div>
  );
};
