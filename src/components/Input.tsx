import { type InputHTMLAttributes, type ReactNode, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  icon?: ReactNode;
  label?: string;
  error?: string;
  id?: string;
}

const Input = ({ fullWidth, icon, label, error, id, className, ...rest }: InputProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-50 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          className={`block w-full rounded-xl border ${
            error ? 'border-red-500' : 'border-gray-700'
          } bg-gray-800 px-4 py-3 text-sm text-gray-50 
          transition-all focus:outline-none focus:ring-2 ${
            error
              ? 'focus:border-red-500 focus:ring-red-500/20'
              : 'focus:border-primary-500 focus:ring-primary-500/20'
          } 
              ${icon ? 'pl-10' : ''}
              ${className}
          `}
          {...rest}
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
