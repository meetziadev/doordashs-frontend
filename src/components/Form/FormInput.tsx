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
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'value' | 'onChange' | 'onBlur' | 'type'>;

const FormInput: React.FC<Props> = ({ label, name, value, onChange, onBlur, error, className, leftIcon, rightIcon, type = 'text', ...props }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  const actualType = isPassword ? (show ? 'text' : 'password') : type;
  return (
    <div className={className}>
      {label ? <label className="block mb-1 text-sm font-medium" htmlFor={name}>{label}</label> : null}
      <div className="relative">
        {leftIcon ? <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">{leftIcon}</span> : null}
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={actualType}
          className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${leftIcon ? 'pl-9' : ''} ${isPassword || rightIcon ? 'pr-9' : ''}`}
          {...props}
        />
        {isPassword ? (
          <button type="button" aria-label={show ? 'Hide password' : 'Show password'} className="absolute inset-y-0 right-3 flex items-center text-gray-500" onClick={() => setShow((s) => !s)}>
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        ) : rightIcon ? (
          <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">{rightIcon}</span>
        ) : null}
      </div>
      {error ? <p className="text-sm text-red-600 mt-1">{error}</p> : null}
    </div>
  );
};

export default FormInput;

