import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'xL' | 'L' | 'M' | 'S' | 'XS';
  color?: 'black' | 'gray-1';
}

const sizeStyles: Record<string, string> = {
  XL: 'w-[15rem] h-[1rem] ',
  L: 'w-[8.5rem] h-[1rem] ',
  M: 'w-[7rem] h-[1.5rem]',
  S: 'w-[3rem] h-[1rem] ',
  XS: 'w-[2rem] h-[1rem]',
};

const colorStyles: Record<string, string> = {
  black: 'text-black',
  'gray-1': 'text-gray-400', // Tailwind gray-400이 gray-1에 해당한다고 가정
};

const Button: React.FC<ButtonProps> = ({
  size = 'M',
  color = 'black',
  className = '',
  children,
  ...props
}) => {
  return (
    <button
      className={`border border-[#D9D9D9] bg-white rounded-md flex items-center justify-center ${sizeStyles[size]} ${colorStyles[color]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
