import Button from '@/components/ui/button';

interface SearchInputProps {
  title: string;
  className?: string;
}

export default function SearchInput({ title, className }: SearchInputProps) {
  return (
    <div className={`flex gap-4 bg-white items-center ${className}`}>
      <div className="text-0-75-500 text-gray-1">{title}</div>
      <Button size="S" className="text-0-75-500">
        전체
      </Button>
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
