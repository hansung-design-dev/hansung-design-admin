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
    <div className="pt-16">
      <Header breadcrumbs={['현수막게시대', location]} />
      <div>
        <Title />
      </div>

      <div className="pt-16 px-8 ml-[5rem]">
        <CommonTable columns={columns} data={rowData} />
      </div>
      <div className="py-[5rem] flex border-r-[0.1rem] border-gray-2">
        <ApplicationDateEdit location={location} />
        <PopupEdit />
      </div>
      <div>
        <CommonTable columns={columns} data={rowData} />
      </div>
      <div className="pt-16 px-8 ml-[5rem]">
        <NoteEdit />
      </div>
    </div>
  );
}
