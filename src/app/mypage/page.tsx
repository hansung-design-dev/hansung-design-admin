'use client';
import Header from '@/components/layout/header';

export default function Mypage() {
  return (
    <div className="pt-16">
      <Header />
      <div className="pt-16 px-8 ml-[5rem]">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Page</h1>
        </div>
      </div>
    </div>
  );
}
