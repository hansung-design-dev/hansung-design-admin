import React from 'react';
import Image from 'next/image';

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
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
        {...props}
      />
      <span
        className={`w-[1.1rem] h-[1.1rem] border border-gray-400 rounded flex items-center justify-center bg-white`}
      >
        {checked && (
          <Image
            src="/svg/checked.svg"
            alt="check"
            className="w-full h-full p-0"
            width={14}
            height={14}
          />
        )}
      </span>
    </label>
  );
};

export default Checkbox;
