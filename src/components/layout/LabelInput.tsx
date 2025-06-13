import React from 'react';

interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelWidth?: string; // ex: 'w-20'
  containerClassName?: string;
}

const LabelInput: React.FC<LabelInputProps> = ({
  label,
  labelWidth = 'w-20',
  containerClassName = '',
  className = '',
  ...props
}) => (
  <div className={`flex items-center gap-2 pb-2 ${containerClassName}`}>
    <span className={labelWidth}>{label}</span>
    <input
      {...props}
      className={`flex-1 outline-none bg-transparent border-b border-gray-2 ${className}`}
    />
  </div>
);

export default LabelInput;
