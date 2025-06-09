'use client';
import Header from '@/components/layout/header';

export default function PublicDesign() {
  return (
    <div className="pt-16">
      <Header />
      <div className="pt-16 px-8 ml-[5rem]">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Public Design</h1>
        </div>
      </div>
    </div>
  );
}
