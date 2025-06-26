import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'XL' | 'L' | 'M' | 'ML' | 'S' | 'SM' | 'XS';
  colorStyles?: string;
}

const sizeStyles: Record<string, string> = {
  XL: 'w-[15rem] h-[1rem]',
  L: 'w-[26rem] h-[3.2rem]',
  ML: ' h-[2rem]',
  M: 'w-[7rem] h-[1.5rem]',
  SM: 'w-[5.4rem] h-[1.6rem] px-[1rem] py-[0.625rem]',
  S: 'w-[4rem] h-[1.7rem] px-[0.375rem] py-[0.625rem]',
  XS: 'w-[3.5rem] h-[1.3rem] py-[0.8rem] px-[0.375rem]',
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
  const buttonClassName = `border border-[#D9D9D9] rounded-md flex items-center justify-center ${sizeStyles[size]} ${colorClass} ${className}`;

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
