import Image from 'next/image';

export default function Title() {
  return (
    <div className="flex items-center gap-2 px-8 ml-[5rem]">
      <div>
        <Image src="/svg/arrow-left.svg" alt="plus" width={16} height={16} />
      </div>
      <div>타이틀</div>
      <div>
        <Image src="/svg/edit.svg" alt="plus" width={16} height={16} />
      </div>
    </div>
  );
}
