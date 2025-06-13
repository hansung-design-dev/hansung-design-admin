import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'xL' | 'L' | 'M' | 'S' | 'XS';
  colorStyles?: string;
}

const sizeStyles: Record<string, string> = {
  XL: 'w-[15rem] h-[1rem] ',
  L: 'w-[26rem] h-[3.2rem] ',
  M: 'w-[7rem] h-[1.5rem]',
  S: 'w-[4rem] h-[1.7rem] px-[0.375rem] py-[0.625rem] ',
  XS: 'w-[2rem] h-[1rem] px-[0.375rem] py-[0.625rem] text-0-75-500',
};

const colorStylesObj: Record<string, string> = {
  black: 'text-white bg-black',
  gray: 'text-gray-1',
  white: 'text-black bg-white',
};

const Button: React.FC<ButtonProps> = ({
  size = 'S',
  className = '',
  children,
  colorStyles = '',
  ...props
}) => {
  const colorClass = colorStylesObj[colorStyles] || '';

  return (
    <button
      className={`border border-[#D9D9D9] rounded-md flex items-center justify-center ${sizeStyles[size]} ${colorClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
