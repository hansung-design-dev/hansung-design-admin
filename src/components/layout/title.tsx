import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function Title({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2 px-8 ml-[5rem] pt-[1rem]">
      <div>
        <button onClick={() => router.back()}>
          <Image src="/svg/arrow-left.svg" alt="plus" width={32} height={32} />
        </button>
      </div>
      <div className="text-2-700">{title}</div>
      <div>
        <button>
          <Image
            src="/svg/edit.svg"
            alt="plus"
            width={20}
            height={20}
            className="w-[1.5rem] h-[1.5rem]"
          />
        </button>
      </div>
    </div>
  );
}
