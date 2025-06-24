'use client';
import { CommonTable, TableColumn } from '@/components/layout/commonTable';
import Header from '@/components/layout/header';
import Button from '@/components/ui/button';
import Image from 'next/image';
import Checkbox from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Modal from '@/components/modal-contents/modal';
import OrderDateEdit from '@/components/layout/orderDateEdit';

// 1. 구 코드-이름 매핑 (실제 DB에서는 code만 저장, name은 프론트에서 매핑)
// const districts = [
//   { code: 'seodaemun', name: '서대문구' },
//   { code: 'yongsan', name: '용산구' },
//   { code: 'gwanak', name: '관악구' },
//   { code: 'songpa', name: '송파구' },
//   { code: 'mapo', name: '마포구' },
// ];

// const getDistrictCode = (name: string) =>
//   districts.find((d) => d.name === name)?.code || name;
//const getDistrictName = (code: string) =>
//  districts.find((d) => d.code === code)?.name || code;

// 2. board_schedule 테이블 구조에 맞춘 타입 및 목데이터
interface BoardSchedule {
  id: string;
  district_name: string; // ex. 서대문구
  category: string; // 'banner' | 'led'
  first_half_start: Date;
  first_half_end: Date;
  second_half_start: Date;
  second_half_end: Date;
  first_half_deadline_count: number;
  second_half_deadline_count: number;
  next_first_half_start: Date;
  next_first_half_end: Date;
  next_second_half_start: Date;
  next_second_half_end: Date;
  next_first_half_deadline_count: number;
  next_second_half_deadline_count: number;
  created_at: Date;
  updated_at: Date;
}

const mockData: BoardSchedule[] = [
  {
    id: '1',
    district_name: '서대문구',
    category: 'banner',
    first_half_start: new Date(2025, 5, 1),
    first_half_end: new Date(2025, 5, 15),
    second_half_start: new Date(2025, 5, 16),
    second_half_end: new Date(2025, 5, 31),
    first_half_deadline_count: 12,
    second_half_deadline_count: 0,
    next_first_half_start: new Date(2025, 6, 1),
    next_first_half_end: new Date(2025, 6, 15),
    next_second_half_start: new Date(2025, 6, 16),
    next_second_half_end: new Date(2025, 6, 30),
    next_first_half_deadline_count: 12,
    next_second_half_deadline_count: 0,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '2',
    district_name: '용산구',
    category: 'banner',
    first_half_start: new Date(2025, 5, 1),
    first_half_end: new Date(2025, 5, 15),
    second_half_start: new Date(2025, 5, 16),
    second_half_end: new Date(2025, 5, 31),
    first_half_deadline_count: 12,
    second_half_deadline_count: 0,
    next_first_half_start: new Date(2025, 6, 1),
    next_first_half_end: new Date(2025, 6, 15),
    next_second_half_start: new Date(2025, 6, 16),
    next_second_half_end: new Date(2025, 6, 30),
    next_first_half_deadline_count: 12,
    next_second_half_deadline_count: 0,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '3',
    district_name: '관악구',
    category: 'banner',
    first_half_start: new Date(2025, 5, 1),
    first_half_end: new Date(2025, 5, 15),
    second_half_start: new Date(2025, 5, 16),
    second_half_end: new Date(2025, 5, 31),
    first_half_deadline_count: 12,
    second_half_deadline_count: 0,
    next_first_half_start: new Date(2025, 6, 1),
    next_first_half_end: new Date(2025, 6, 15),
    next_second_half_start: new Date(2025, 6, 16),
    next_second_half_end: new Date(2025, 6, 30),
    next_first_half_deadline_count: 12,
    next_second_half_deadline_count: 0,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '4',
    district_name: '송파구',
    category: 'banner',
    first_half_start: new Date(2025, 5, 1),
    first_half_end: new Date(2025, 5, 15),
    second_half_start: new Date(2025, 5, 16),
    second_half_end: new Date(2025, 5, 31),
    first_half_deadline_count: 12,
    second_half_deadline_count: 0,
    next_first_half_start: new Date(2025, 6, 1),
    next_first_half_end: new Date(2025, 6, 15),
    next_second_half_start: new Date(2025, 6, 16),
    next_second_half_end: new Date(2025, 6, 30),
    next_first_half_deadline_count: 12,
    next_second_half_deadline_count: 0,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '5',
    district_name: '마포구',
    category: 'banner',
    first_half_start: new Date(2025, 5, 1),
    first_half_end: new Date(2025, 5, 15),
    second_half_start: new Date(2025, 5, 16),
    second_half_end: new Date(2025, 5, 31),
    first_half_deadline_count: 12,
    second_half_deadline_count: 0,
    next_first_half_start: new Date(2025, 6, 1),
    next_first_half_end: new Date(2025, 6, 15),
    next_second_half_start: new Date(2025, 6, 16),
    next_second_half_end: new Date(2025, 6, 30),
    next_first_half_deadline_count: 12,
    next_second_half_deadline_count: 0,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

function formatDate(date: Date) {
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}/${String(date.getDate()).padStart(2, '0')}`;
}

const columns: TableColumn<BoardSchedule>[] = [
  { key: 'district_name', header: '위치' },
  {
    key: 'first_half_period',
    header: '전반기',
    render: (row) =>
      `${formatDate(row.first_half_start)} ~ ${formatDate(row.first_half_end)}`,
  },
  {
    key: 'first_half_deadline_count',
    header: '마감수',
    render: (row) => row.first_half_deadline_count,
  },
  {
    key: 'second_half_period',
    header: '후반기',
    render: (row) =>
      `${formatDate(row.second_half_start)} ~ ${formatDate(
        row.second_half_end
      )}`,
  },
  {
    key: 'second_half_deadline_count',
    header: '마감수',
    render: (row) => row.second_half_deadline_count,
  },
];

export default function LedDisplay() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLocation, setModalLocation] = useState('');
  const [tableData, setTableData] = useState(mockData);

  const handleAdd = () => {
    setModalLocation('');
    setIsModalOpen(true);
  };

  const handleSave = () => {
    // 예시: location만 추가, 실제로는 더 많은 필드 필요
    setTableData([
      ...tableData,
      {
        id: (tableData.length + 1).toString(),
        district_name: modalLocation,
        category: 'banner',
        first_half_start: new Date(),
        first_half_end: new Date(),
        second_half_start: new Date(),
        second_half_end: new Date(),
        first_half_deadline_count: 0,
        second_half_deadline_count: 0,
        next_first_half_start: new Date(),
        next_first_half_end: new Date(),
        next_second_half_start: new Date(),
        next_second_half_end: new Date(),
        next_first_half_deadline_count: 0,
        next_second_half_deadline_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    setIsModalOpen(false);
  };

  return (
    <div className="pt-16 px-8 ml-[5rem]">
      <Header />
      <div className=" flex items-center gap-4 justify-between py-4">
        <div className="text-0-75-500 text-gray-1 flex items-center gap-2">
          <Checkbox
            checked={true}
            onChange={() => {}}
            className="w-[1.25rem] h-[1.25rem]"
          />
          사용 안하는 게시대 제외
        </div>
        <Button size="S" className="text-0-75-500" onClick={handleAdd}>
          <Image src="/svg/plus.svg" alt="logo" width={20} height={20} />
          추가
        </Button>
      </div>

      <CommonTable
        columns={columns}
        data={tableData}
        tableRowClick={(row) => {
          router.push(`/banner-display/${row.id}`);
        }}
      />
      {isModalOpen && (
        <Modal
          title="게시대 추가"
          onClose={() => setIsModalOpen(false)}
          footer={
            <Button
              size="L"
              colorStyles="black"
              className="w-[20rem]"
              onClick={handleSave}
            >
              저장
            </Button>
          }
        >
          <OrderDateEdit location={modalLocation} />
        </Modal>
      )}
    </div>
  );
}
