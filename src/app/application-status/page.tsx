'use client';
import { CommonTable } from '@/layout/commonTable';
import Header from '@/components/layout/header';
import Button from '@/components/ui/button';
import Image from 'next/image';
import Checkbox from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import { mockData, columns } from '@/mockdata/banner-display';

export default function ApplicationStatus() {
  const router = useRouter();

  return (
    <div className="pt-16 px-8 ml-[5rem]">
      <Header breadcrumbs={['신청현황']} />
      <div className=" flex items-center gap-4 justify-between py-4">
        <div className="text-0-75-500 text-gray-1 flex items-center gap-2">
          <Checkbox
            checked={true}
            onChange={() => {}}
            className="w-[1.25rem] h-[1.25rem]"
          />
          사용 안하는 게시대 제외
        </div>
        <Button size="S" className="text-0-75-500">
          <Image src="/svg/plus.svg" alt="logo" width={20} height={20} />
          추가
        </Button>
      </div>

      <CommonTable
        columns={columns}
        data={mockData}
        tableRowClick={(row) => {
          router.push(`/banner-display/${row.id}`);
        }}
      />
    </div>
  );
}
