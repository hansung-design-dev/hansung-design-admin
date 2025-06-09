'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useMenu } from '@/components/providers/menu-provider';

const menuItems: { id: number; name: string; href: string }[] = [
  { id: 1, name: '현수막게시대', href: '/banner-display' },
  { id: 2, name: 'LED전자게시대', href: '/led-display' },
  { id: 3, name: '디지털사이니지', href: '/digital-signage' },
  { id: 4, name: '공공디자인', href: '/public-design' },
  { id: 5, name: '신청현황', href: '/application-status' },
  { id: 6, name: '온라인회원관리', href: '/manage-members' },
  { id: 7, name: '홈페이지관리', href: '/manage-hompage' },
  { id: 8, name: '상담관리', href: '/customer-service' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { setSelectedMenu } = useMenu();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Overlay: appears when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0   z-40"
          style={{ left: '21.375rem' }}
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className="fixed left-0 top-0 h-screen z-50">
        {/* Collapsed Sidebar */}
        <div
          className={`h-full bg-black transition-all duration-300 ${
            isOpen ? 'w-[21.375rem]' : 'w-[5.75rem]'
          }`}
        >
          <div className="flex flex-col items-center h-full py-6">
            {/* Logo */}
            <div className="mb-8">
              {isOpen ? (
                <button onClick={() => router.push('/')}>
                  <Image
                    src="/image/hansung-logo.png"
                    alt="Hansung Logo"
                    width={200}
                    height={87}
                    className="w-auto h-auto"
                  />{' '}
                </button>
              ) : (
                <button onClick={() => router.push('/')}>
                  <Image
                    src="/svg/hansung-logo-w.svg"
                    alt="Hansung Logo"
                    width={43.82}
                    height={19}
                    className="w-[2.73856rem] h-[1.1875rem]"
                  />
                </button>
              )}
            </div>

            {/* Icons */}
            <div className="flex flex-col items-center gap-8">
              <button onClick={toggleSidebar} className="w-6 h-6">
                <Image
                  src="/svg/menu-hamburger.svg"
                  alt="Menu"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </button>
              <Link href="/banner" className="w-6 h-6">
                <Image
                  src="/svg/file-text.svg"
                  alt="File"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </Link>
              <Link
                href="/customer-service"
                className="w-6 h-6"
                onClick={() => {
                  setSelectedMenu(menuItems[7].name);
                  setIsOpen(false);
                }}
              >
                <Image
                  src="/svg/calendar.svg"
                  alt="Calendar"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </Link>
              <Link href="/database" className="w-6 h-6">
                <Image
                  src="/svg/database.svg"
                  alt="Database"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </Link>
              <Link
                href="/manage-members"
                className="w-6 h-6"
                onClick={() => {
                  setSelectedMenu(menuItems[5].name);
                  setIsOpen(false);
                }}
              >
                <Image
                  src="/svg/users.svg"
                  alt="Users"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </Link>
            </div>
          </div>

          {/* Expanded Menu */}
          {isOpen && (
            <div className="absolute top-0 left-0 w-full h-full bg-white">
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center pl-8">
                  <Link
                    href="/"
                    className="flex justify-center items-center gap-2"
                  >
                    <Image
                      src="/svg/hansung.svg"
                      alt="Close"
                      width={100}
                      height={100}
                      className="w-[2.7rem] h-[1.1rem]"
                    />
                    <Image
                      src="/svg/hansung-logo-b.svg"
                      alt="Close"
                      width={100}
                      height={100}
                      className="w-[2.7rem] h-[1.1rem]"
                    />
                  </Link>
                </div>
                <div className="flex justify-end p-4">
                  <button onClick={toggleSidebar} className="w-6 h-6">
                    <Image
                      src="/svg/x.svg"
                      alt="Close"
                      width={24}
                      height={24}
                      className="w-[1.1rem] h-[1.1rem]"
                    />
                  </button>
                </div>
              </div>
              <div className="mt-8 px-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setSelectedMenu(item.name);
                      setIsOpen(false);
                    }}
                    className={`block py-4 text-1-500 hover:text-1-700 ${
                      pathname === item.href
                        ? 'text-1-700 border-b border-b-[0.1rem]'
                        : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
