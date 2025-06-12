import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'xL' | 'L' | 'M' | 'S' | 'XS';
  textColor?: 'black' | 'gray';
}

const sizeStyles: Record<string, string> = {
  XL: 'w-[15rem] h-[1rem] ',
  L: 'w-[8.5rem] h-[1rem] ',
  M: 'w-[7rem] h-[1.5rem]',
  S: 'w-[4rem] h-[1.7rem] px-[0.375rem] py-[0.625rem] text-0-75-500',
  XS: 'w-[2rem] h-[1rem] px-[0.375rem] py-[0.625rem] text-0-75-500',
};

const colorStyles: Record<string, string> = {
  black: 'text-black',
  gray: 'text-gray-1', // Tailwind gray-400이 gray-1에 해당한다고 가정
};

const Button: React.FC<ButtonProps> = ({
  size = 'M',
  textColor = 'black',
  className = '',
  children,
  ...props
}) => {
  return (
    <button
      className={`border border-[#D9D9D9] bg-white rounded-md flex items-center justify-center ${sizeStyles[size]} ${colorStyles[textColor]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
