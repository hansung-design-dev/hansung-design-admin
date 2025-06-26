import Button from '@/components/ui/button';

export default function TextUpdate({
  title,
  subTitle,
  buttonName,
  placeholder,
}: {
  title?: string;
  subTitle: string;
  buttonName: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-0-875-700 md:text-1-700 mb-2 w-full">{title}</span>
      <span className="text-0-75-500 md:text-0-875-500 text-gray-1">
        {subTitle}
      </span>
      <div className="flex flex-col gap-2 justify-between items-end">
        <textarea
          name={subTitle}
          id="1"
          placeholder={placeholder}
          className="w-full h-[8rem] border rounded-[0.375rem] p-2 border-gray-2 placeholder:text-xs text-xs"
        ></textarea>
        <Button size="S" className="text-0-875-700">
          {buttonName}
        </Button>
      </div>
    </div>
  );
}
