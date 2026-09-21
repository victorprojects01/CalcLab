import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

/**
 * Logo oficial do CalcLab (Cubo 3D + Tipografia + Subtítulo)
 */
export const CalcLabLogo: React.FC<{
  className?: string;
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
}> = ({ className = '', showSubtitle = true, size = 'md' }) => {
  const heightClass =
    size === 'sm' ? 'h-9 sm:h-10' : size === 'lg' ? 'h-14 sm:h-16' : 'h-11 sm:h-12';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Cubo Isométrico 3D CalcLab */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className={heightClass}
          style={{ width: 'auto', aspectRatio: '1/1' }}
          fill="none"
          aria-hidden="true"
        >
          {/* Top Face (Blue with Filament) */}
          <path d="M50 8 L92 32 L50 56 L8 32 Z" fill="#2563EB" />
          <path
            d="M48 10 C46 22 56 26 48 38 C44 44 48 50 52 55"
            stroke="#10B981"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Left Face (White with Dark Dice Dots) */}
          <path d="M8 32 L50 56 L50 96 L8 72 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <circle cx="20" cy="54" r="5" fill="#0F172A" />
          <circle cx="36" cy="70" r="5" fill="#0F172A" />

          {/* Right Face (Dark Navy with White Grid Dots) */}
          <path d="M50 56 L92 32 L92 72 L50 96 Z" fill="#0F172A" />
          <rect x="62" y="48" width="5" height="5" rx="1" fill="#FFFFFF" />
          <rect x="71" y="43" width="5" height="5" rx="1" fill="#FFFFFF" />
          <rect x="80" y="38" width="5" height="5" rx="1" fill="#FFFFFF" />
          <rect x="62" y="58" width="5" height="5" rx="1" fill="#FFFFFF" />
          <rect x="71" y="53" width="5" height="5" rx="1" fill="#FFFFFF" />
          <rect x="80" y="48" width="5" height="5" rx="1" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Tipografia CalcLab */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-none">
            CalcLab
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-500 leading-none">
            .
          </span>
        </div>
        {showSubtitle && (
          <span className="text-xs sm:text-xs font-medium text-slate-500 mt-1 tracking-tight leading-none">
            Quanto custa sua impressão 3D?
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Ícone da Impressora 3D oficial CalcLab
 */
export const IconImpressora3D: React.FC<IconProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
    {...props}
  >
    <rect x="6" y="6" width="52" height="52" rx="12" stroke="#2563EB" strokeWidth="5" fill="none" />
    <rect x="15" y="12" width="34" height="4" rx="1.5" fill="#2563EB" />
    <rect x="29.5" y="16" width="5" height="6" fill="#2563EB" />
    <rect x="22" y="22" width="20" height="11" rx="2" fill="#2563EB" />
    <rect x="28" y="26" width="8" height="4" fill="#0F172A" />
    <polygon points="30,33 34,33 32,37" fill="#2563EB" />
    <rect x="15" y="47" width="34" height="4" rx="1.5" fill="#2563EB" />
    <path d="M22 47 L25 40 L32 38 L39 40 L42 47 Z" fill="#2563EB" />
    <circle cx="28.5" cy="44" r="1.2" fill="#0F172A" />
    <circle cx="35.5" cy="44" r="1.2" fill="#0F172A" />
  </svg>
);

/**
 * Ícone de Filamento oficial CalcLab
 */
export const IconFilamento: React.FC<IconProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
    {...props}
  >
    <rect x="12" y="8" width="40" height="7" rx="3.5" fill="#2563EB" />
    <rect x="12" y="49" width="40" height="7" rx="3.5" fill="#2563EB" />
    <rect x="18" y="15" width="28" height="34" rx="2" fill="#2563EB" />
    <line x1="18" y1="20" x2="46" y2="20" stroke="#1D4ED8" strokeWidth="2" />
    <line x1="18" y1="25" x2="46" y2="25" stroke="#1D4ED8" strokeWidth="2" />
    <line x1="18" y1="30" x2="46" y2="30" stroke="#1D4ED8" strokeWidth="2" />
    <line x1="18" y1="35" x2="46" y2="35" stroke="#1D4ED8" strokeWidth="2" />
    <line x1="18" y1="40" x2="46" y2="40" stroke="#1D4ED8" strokeWidth="2" />
    <line x1="18" y1="45" x2="46" y2="45" stroke="#1D4ED8" strokeWidth="2" />
    <path
      d="M42 34 C50 34 54 40 54 52"
      stroke="#10B981"
      strokeWidth="5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

/**
 * Ícone de Energia oficial CalcLab
 */
export const IconEnergia: React.FC<IconProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
    {...props}
  >
    <polygon
      points="34,4 16,33 29,33 24,60 48,27 35,27"
      fill="#2563EB"
      stroke="#1D4ED8"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Ícone de Acessórios oficial CalcLab
 */
export const IconAcessorios: React.FC<IconProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
    {...props}
  >
    <polygon
      points="24,14 40,14 48,22 40,30 24,30 16,22"
      stroke="#2563EB"
      strokeWidth="4.5"
      fill="none"
      strokeLinejoin="round"
    />
    <rect x="10" y="20" width="8" height="4" rx="1" fill="#10B981" />
    <rect x="46" y="20" width="8" height="4" rx="1" fill="#10B981" />
    <rect x="29" y="30" width="6" height="24" fill="#2563EB" />
    <rect x="12" y="38" width="12" height="4" rx="1" fill="#10B981" />
    <rect x="40" y="38" width="12" height="4" rx="1" fill="#10B981" />
    <rect x="18" y="52" width="28" height="5" rx="2" fill="#2563EB" />
  </svg>
);

/**
 * Ícone de Acabamento oficial CalcLab
 */
export const IconAcabamento: React.FC<IconProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
    {...props}
  >
    <g transform="rotate(-40 32 32)">
      <rect x="18" y="10" width="16" height="18" rx="4" stroke="#2563EB" strokeWidth="5" fill="none" />
      <path
        d="M26 28 L26 54 C26 56 24 58 22 58"
        stroke="#2563EB"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </g>
    <path d="M42 16 L50 16 M46 12 L46 20" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M48 30 L56 30 M52 26 L52 34" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" />
  </svg>
);

/**
 * Ícone de Lucro oficial CalcLab
 */
export const IconLucro: React.FC<IconProps> = ({
  className = 'w-6 h-6',
  size,
  ...props
}) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
    {...props}
  >
    <rect x="8" y="37" width="10" height="20" rx="2" fill="#2563EB" />
    <rect x="22" y="27" width="10" height="30" rx="2" fill="#2563EB" />
    <rect x="36" y="19" width="10" height="38" rx="2" fill="#2563EB" />
    <rect x="50" y="15" width="8" height="42" rx="2" fill="#2563EB" />
    <path
      d="M10 29 L21 21 L32 26 L49 10"
      stroke="#10B981"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <polygon points="54,8 43,7 48,13" fill="#10B981" />
  </svg>
);
