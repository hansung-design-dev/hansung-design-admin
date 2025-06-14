import React from 'react';

interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelClassName?: string; // ex: 'w-20'
  containerClassName?: string;
}

const LabelInput: React.FC<LabelInputProps> = ({
  label,
  labelClassName = 'w-20',
  containerClassName = 'items-center, gap-2',
  className = '',
  ...props
}) => (
  <div className={`flex  pb-2 ${containerClassName}`}>
    <span className={labelClassName}>{label}</span>
    <input
      {...props}
      className={`outline-none border-b border-gray-2 ${className}`}
    />
  </div>
);

export default LabelInput;
