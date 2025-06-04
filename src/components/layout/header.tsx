import Image from 'next/image';
import { useMenu } from '@/components/providers/menu-provider';

export default function Header() {
  const { selectedMenu } = useMenu();

  return (
    <div className="fixed top-0 left-[5.5rem] w-[95%] h-16 border-b-[0.1rem] border-gray-2 bg-white z-0">
      <div className="h-full flex items-center px-6 justify-between">
        <h1 className="text-1-700">{selectedMenu}</h1>
        <div className="flex items-center gap-2 text-0-875-500">
          안녕하세요 성은지님
          <button>
            <Image src="/svg/user.svg" alt="logo" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
