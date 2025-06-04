import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  className = '',
  ...props
}) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={` rounded border-[1rem] ${
        checked ? 'accent-black ' : 'accent-gray-2 '
      } ${className}`}
      {...props}
    />
  );
};
export default Checkbox;
