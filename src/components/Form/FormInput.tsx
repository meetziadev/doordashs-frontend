import React, { useState } from 'react';
import { Eye, EyeOff } from '@assets/icons';

type Props = {
  label?: string;
  name: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: string;
  inputClassName?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'value' | 'onChange' | 'onBlur' | 'type'>;

const FormInput: React.FC<Props> = ({ label, name, value, onChange, onBlur, error, className, leftIcon, rightIcon, type = 'text', inputClassName, ...props }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  const actualType = isPassword ? (show ? 'text' : 'password') : type;
  return (
    <div className={className}>
      {label ? <label className="block mb-1.5 text-sm font-semibold text-gray-800 text-left" htmlFor={name}>{label}</label> : null}
      <div className="relative">
        {leftIcon ? <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">{leftIcon}</span> : null}
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={actualType}
          className={inputClassName || `w-full border border-gray-300 rounded-[16px] px-5 py-4 text-gray-950 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition-all ${leftIcon ? 'pl-12' : ''} ${isPassword || rightIcon ? 'pr-12' : ''}`}
          {...props}
        />
        {isPassword ? (
          <button type="button" aria-label={show ? 'Hide password' : 'Show password'} className="absolute inset-y-0 right-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors" onClick={() => setShow((s) => !s)}>
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        ) : rightIcon ? (
          <span className="absolute inset-y-0 right-3.5 flex items-center text-gray-500">{rightIcon}</span>
        ) : null}
      </div>
      {error ? <p className="text-sm text-red-600 mt-1 text-left">{error}</p> : null}
    </div>
  );
};

export default FormInput;

