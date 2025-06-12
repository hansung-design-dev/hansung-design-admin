'use client';
import Header from '@/components/layout/header';
import { CommonTable } from '@/layout/commonTable';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { mockData, columns } from '@/mockdata/banner-display';
import Title from '@/layout/title';
import ApplicationDateEdit from '@/layout/applicationDateEdit';
import PopupEdit from '@/layout/popupEdit';
import NoteEdit from '@/layout/noteEdit';

export default function BannerDisplayDetail() {
  const params = useParams();
  const id = params.id as string;
  const rowData = useMemo(() => mockData.filter((row) => row.id === id), [id]);
  const location = rowData[0]?.district_name || '';

  return (
    <div className="pt-8 md:pt-16">
      <Header breadcrumbs={['현수막게시대', location]} />
      <div>
        <Title title={location} />
      </div>

      <div className="pt-8 md:pt-16 px-4 md:px-8 ml-8 md:ml-[5rem]">
        {/* Horizontal Divider */}
        <div className="w-full flex justify-center mb-4"></div>
        <CommonTable columns={columns} data={rowData} className="bg-gray-3" />
      </div>
      <div className="py-[3rem] md:py-[5rem] flex flex-col md:flex-row gap-4 md:gap-8 border-r-0 md:border-r-[0.1rem] border-gray-2 md:ml-[5rem]">
        <ApplicationDateEdit location={location} />
        {/* Vertical Divider */}
        <div className="hidden md:flex items-stretch justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2"
            height="473"
            viewBox="0 0 2 473"
            fill="none"
          >
            <path d="M1 0L0.999979 473" stroke="#D9D9D9" />
          </svg>
        </div>
        <PopupEdit />
      </div>
      <div className="px-4 md:px-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="2"
          viewBox="0 0 1688 2"
          fill="none"
        >
          <path d="M0 1L1688 1" stroke="#D9D9D9" />
        </svg>
        <CommonTable columns={columns} data={rowData} />
      </div>
      <div className="pt-8 md:pt-16 px-4 md:px-8 ml-0 md:ml-[5rem]">
        <NoteEdit />
      </div>
    </div>
  );
}
