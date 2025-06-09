'use client';
import Image from 'next/image';
import { useMenu } from '@/components/providers/menu-provider';
import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  breadcrumbs?: string[];
}

export default function Header({ breadcrumbs }: HeaderProps) {
  const { selectedMenu } = useMenu();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-[5.5rem] w-[95%] h-16 border-b-[0.1rem] border-gray-2 bg-white z-0">
      <div className="h-full flex items-center px-6 justify-between">
        <h1 className="text-1-700">
          {breadcrumbs ? breadcrumbs.join(' > ') : selectedMenu}
        </h1>
        <div className="flex items-center gap-2 text-0-875-500">
          안녕하세요 성은지님
          <button onClick={() => setIsOpen(!isOpen)}>
            <Image src="/svg/user.svg" alt="logo" width={20} height={20} />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-16 right-0 w-48 bg-white shadow-md rounded-md">
          <div className="flex flex-col gap-2 p-2">
            <Link className="hover:bg-gray-3 " href="/mypage">
              My Page
            </Link>
            <Link className="hover:bg-gray-3" href="/">
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
