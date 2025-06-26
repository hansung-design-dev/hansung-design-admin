import Button from '@/components/ui/button';
import Dropdown from '@/components/ui/dropdown';
import { useState } from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

interface SearchInputProps {
  title: string | undefined;
  className?: string;
  dropdownOptions?: DropdownOption[];
  selectedDropdownValue?: string;
  onDropdownChange?: (value: string) => void;
}

export default function SearchInput({
  title,
  className,
  dropdownOptions,
  selectedDropdownValue = '전체',
  onDropdownChange,
}: SearchInputProps) {
  const [dropdownValue, setDropdownValue] = useState(selectedDropdownValue);

  const handleDropdownChange = (value: string) => {
    setDropdownValue(value);
    onDropdownChange?.(value);
  };

  return (
    <div className={`flex gap-4 bg-white items-center ${className}`}>
      <div className="text-0-75-500 text-gray-1">{title}</div>
      {dropdownOptions ? (
        <Dropdown
          options={dropdownOptions}
          value={dropdownValue}
          onChange={handleDropdownChange}
          className="w-20"
        />
      ) : (
        <Button size="S" className="text-0-75-500">
          전체
        </Button>
      )}
      <input
        type="text"
        className="w-[10rem] border border-gray-2 rounded-md"
      />
      <Button size="S" className="text-0-75-500">
        조회
      </Button>
    </div>
  );
}
