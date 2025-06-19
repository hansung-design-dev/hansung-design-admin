'use client';
import Sidebar from '@/components/sidebar';
import SignIn from './signin/page';

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <SignIn />
      </div>
    </div>
  );
}
