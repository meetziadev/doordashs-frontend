import React from 'react';

type Props = {
  label?: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'value' | 'onChange' | 'checked' | 'type'>;

const FormRadio: React.FC<Props> = ({ label, name, value, checked, onChange, error, className, ...props }) => (
  <div className={className}>
    <label className="inline-flex items-center gap-2">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} {...props} />
      <span>{label}</span>
    </label>
    {error ? <p className="text-sm text-red-600 mt-1">{error}</p> : null}
  </div>
);

export default FormRadio;

