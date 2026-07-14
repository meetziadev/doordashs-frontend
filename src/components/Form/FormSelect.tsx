import React from 'react';
import Select, { Props as SelectProps, StylesConfig } from 'react-select';
import { SelectOption } from '@/types';

type Props = {
  label?: string;
  name: string;
  value?: any;
  onChange?: (e: { target: { name: string; value: any } }) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  className?: string;
  options?: SelectOption[];
  stylesOverride?: StylesConfig<any, boolean>;
} & Omit<SelectProps, 'onChange' | 'value' | 'name' | 'options'>;

const defaultStyles: StylesConfig<any, boolean> = {
  control: (base, state) => ({
    ...base,
    borderColor: state.isFocused ? 'rgba(59,130,246,0.6)' : '#e5e7eb',
    boxShadow: state.isFocused ? '0 0 0 3px rgba(59,130,246,0.2)' : 'none',
    minHeight: 38,
    '&:hover': { borderColor: '#cbd5e1' }
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#e5f0ff' : state.isFocused ? '#f1f5f9' : 'white',
    color: '#0f172a'
  }),
  menu: (base) => ({ ...base, zIndex: 40 })
};

const FormSelect: React.FC<Props> = ({ label, name, value, onChange, onBlur, error, className, options, stylesOverride, ...props }) => (
  <div className={className}>
    {label ? <label className="block mb-1 text-sm font-medium" htmlFor={name}>{label}</label> : null}
    <Select
      inputId={name}
      name={name}
      value={value}
      onChange={(v) => onChange && onChange({ target: { name, value: v } })}
      onBlur={onBlur as any}
      options={options}
      classNamePrefix="rs"
      styles={{ ...defaultStyles, ...(stylesOverride || {}) }}
      {...(props as any)}
    />
    {error ? <p className="text-sm text-red-600 mt-1">{error}</p> : null}
  </div>
);

export default FormSelect;

