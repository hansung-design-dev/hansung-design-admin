import React from 'react';

interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string; // ex: 'w-20'
  containerClassName?: string;
  wrapperClassName?: string;
  type?: string;
  placeholder?: string;
}

const LabelInput: React.FC<LabelInputProps> = ({
  label,
  labelClassName = 'w-20',
  containerClassName = 'items-center gap-2',
  wrapperClassName,
  className = 'outline-none border-b',
  type = 'text',
  placeholder,
  ...props
}) => {
  if (type === 'file') {
    return (
      <div className={`flex pb-2 ${containerClassName} ${wrapperClassName}`}>
        <span className={labelClassName}>{label}</span>
        <label className="flex-1 cursor-pointer">
          <span className="block border-b border-gray-2 py-1 text-0-75-500 text-gray-400">
            {placeholder || '이미지를 업로드해주세요'}
          </span>
          <input {...props} type="file" className="hidden" />
        </label>
      </div>
    );
  }
  // 기본 input
  return (
    <div className={`flex pb-2 ${containerClassName} ${wrapperClassName}`}>
      <span className={labelClassName}>{label}</span>
      <input
        {...props}
        type={type}
        className={` border-gray-2 ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default LabelInput;
