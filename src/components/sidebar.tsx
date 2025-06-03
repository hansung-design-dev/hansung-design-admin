'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const menuItems = [
  { name: '현수막게시대', href: '/banner' },
  { name: 'LED전자게시대', href: '/led' },
  { name: '디지털사이니지', href: '/digital-signage' },
  { name: '공공디자인', href: '/public-design' },
  { name: '신청현황', href: '/applications' },
  { name: '온라인회원관리', href: '/members' },
  { name: '홈페이지관리', href: '/website' },
  { name: '상담관리', href: '/counseling' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed left-0 top-0 h-screen">
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
              <Image
                src="/image/hansung-logo.png"
                alt="Hansung Logo"
                width={200}
                height={87}
                className="w-auto h-auto"
              />
            ) : (
              <Image
                src="/svg/hansung-logo-w.svg"
                alt="Hansung Logo"
                width={43.82}
                height={19}
                className="w-[2.73856rem] h-[1.1875rem]"
              />
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
            <Link href="/calendar" className="w-6 h-6">
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
            <Link href="/users" className="w-6 h-6">
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
                <button className="flex justify-center items-center gap-2">
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
                </button>
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
                  className={`block py-4 text-1-500 hover:text-1-700 ${
                    selectedMenu === item.href
                      ? 'text-1-700 border-b border-b-[1rem]'
                      : ''
                  }`}
                  onClick={() => setSelectedMenu(item.href)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
