import React from 'react';

type Props = {
  label?: string;
  name: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'checked' | 'onChange' | 'type'>;

const FormCheckbox: React.FC<Props> = ({ label, name, checked, onChange, error, className, ...props }) => (
  <div className={className}>
    <label className="inline-flex items-center gap-2">
      <input type="checkbox" name={name} checked={checked} onChange={onChange} {...props} />
      <span>{label}</span>
    </label>
    {error ? <p className="text-sm text-red-600 mt-1">{error}</p> : null}
  </div>
);

export default FormCheckbox;

