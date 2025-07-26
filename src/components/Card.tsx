import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  hover?: boolean;
  glowEffect?: boolean;
  className?: string;
}

const Card = ({
  children,
  title,
  subtitle,
  icon,
  hover = false,
  glowEffect = false,
  className = '',
}: CardProps) => {
  return (
    <div
      className={`
        bg-gray-900 rounded-xl cursor-pointer border shadow-md p-6 transition-all
        transform ${hover ? 'hover:-translate-y-0.5' : ''} /* Movimento de 1mm para cima */
        ${className}
        ${
          glowEffect
            ? className.includes('bg-red-500/10')
              ? 'border-red-500 shadow-red-500/50 hover:shadow-red-500/70 hover:border-red-500'
              : 'border-green-500 shadow-green-500/50 hover:shadow-green-500/70 hover:border-green-500'
            : 'border-gray-700 hover:border-gray-700'
        }
      `}
    >
      {(title || icon) && (
        <div className="flex items-center space-x-3 mb-4">
          {icon && (
            <div className="p-2 bg-primary-500/10 rounded-xl flex items-center justify-center">
              {icon}
            </div>
          )}
          {(title || subtitle) && (
            <div>
              {title && <h3 className="text-lg font-medium">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
            </div>
          )}
        </div>
      )}

      {children}
    </div>
  );
};

export default Card;
