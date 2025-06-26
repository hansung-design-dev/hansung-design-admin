import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = '선택하세요',
  className = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: DropdownOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className="flex items-center justify-between w-full border border-gray-2 rounded-[0.375rem] h-[2rem] px-3 text-center text-0-75-500 cursor-pointer bg-white  transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedOption ? 'text-gray-1' : 'text-gray-3'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <Image
          src="/svg/arrow-down.svg"
          alt="드롭다운"
          width={12}
          height={12}
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-2 rounded-[0.375rem] shadow-lg z-10 max-h-40 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-3 py-2 text-0-75-500 cursor-pointer hover:bg-gray-3 transition-colors text-center"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
