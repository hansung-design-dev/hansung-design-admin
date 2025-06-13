import Image from 'next/image';
import { useRef } from 'react';

interface AddItemProps {
  title?: string;
  className?: string;
  onClick?: () => void;
  onUpload?: (file?: File) => void;
  onAddItem?: () => void;
}

export default function AddItem({
  title,
  className,
  onClick,
  onUpload,
  onAddItem,
}: AddItemProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (onUpload) {
      fileInputRef.current?.click();
    } else if (onClick) {
      onClick();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  return (
    <div
      className={`flex flex-col gap-2 ${className} hover:cursor-pointer`}
      onClick={onAddItem}
    >
      <div className="text-0-875-700 md:text-1-700 mb-2 w-full">{title}</div>
      <div className="flex items-center justify-center gap-2 border border-gray-2 rounded-[0.375rem] p-2 h-[4rem]">
        <button
          className="flex gap-2 text-0-75-500 items-center text-gray-1"
          onClick={handleButtonClick}
          type="button"
        >
          <Image src="/svg/plus.svg" alt="추가" width={15} height={15} />
          추가
        </button>
        {onUpload && (
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        )}
      </div>
    </div>
  );
}
