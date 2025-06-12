import Image from 'next/image';

export default function Title({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 px-8 ml-[5rem] pt-[1rem]">
      <div>
        <Image src="/svg/arrow-left.svg" alt="plus" width={32} height={32} />
      </div>
      <div className="text-2-700">{title}</div>
      <div>
        <Image
          src="/svg/edit.svg"
          alt="plus"
          width={20}
          height={20}
          className="w-[1.5rem] h-[1.5rem]"
        />
      </div>
    </div>
  );
}
