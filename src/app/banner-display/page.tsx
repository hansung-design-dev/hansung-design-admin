'use client';
import { CommonTable, TableColumn } from '@/layout/commonTable';
import Header from '@/components/layout/header';
import Button from '@/components/ui/button';
import Image from 'next/image';
import Checkbox from '@/components/ui/checkbox';

// 1. 데이터 타입 정의
interface RowType {
  id: number;
  location: string;
  firstPeriodFrom: Date;
  firstPeriodTo: Date;
  firstPeriodClosedCount: number;
  secondPeriodFrom: Date;
  secondPeriodTo: Date;
  secondPeriodClosedCount: number;
}
const datadata: RowType[] = [
  {
    id: 1,
    location: '서대문구',
    firstPeriodFrom: new Date(2025, 5, 1),
    firstPeriodTo: new Date(2025, 5, 15),
    firstPeriodClosedCount: 12,
    secondPeriodFrom: new Date(2025, 6, 1),
    secondPeriodTo: new Date(2025, 6, 15),
    secondPeriodClosedCount: 12,
  },
  {
    id: 2,
    location: '용산구',
    firstPeriodFrom: new Date(2025, 5, 1),
    firstPeriodTo: new Date(2025, 5, 15),
    firstPeriodClosedCount: 12,
    secondPeriodFrom: new Date(2025, 6, 1),
    secondPeriodTo: new Date(2025, 6, 15),
    secondPeriodClosedCount: 12,
  },
  {
    id: 3,
    location: '관악구',
    firstPeriodFrom: new Date(2025, 5, 1),
    firstPeriodTo: new Date(2025, 5, 15),
    firstPeriodClosedCount: 12,
    secondPeriodFrom: new Date(2025, 6, 1),
    secondPeriodTo: new Date(2025, 6, 15),
    secondPeriodClosedCount: 12,
  },
  {
    id: 4,
    location: '송파구',
    firstPeriodFrom: new Date(2025, 5, 1),
    firstPeriodTo: new Date(2025, 5, 15),
    firstPeriodClosedCount: 12,
    secondPeriodFrom: new Date(2025, 6, 1),
    secondPeriodTo: new Date(2025, 6, 15),
    secondPeriodClosedCount: 12,
  },
  {
    id: 4,
    location: '마포구',
    firstPeriodFrom: new Date(2025, 5, 1),
    firstPeriodTo: new Date(2025, 5, 15),
    firstPeriodClosedCount: 12,
    secondPeriodFrom: new Date(2025, 6, 1),
    secondPeriodTo: new Date(2025, 6, 15),
    secondPeriodClosedCount: 12,
  },
];

function formatDate(date: Date) {
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}/${String(date.getDate()).padStart(2, '0')}`;
}

const columns: TableColumn<RowType>[] = [
  { key: 'location', header: '위치' },
  {
    key: 'firstPeriod',
    header: '전반기 기간',
    render: (row) =>
      `${formatDate(row.firstPeriodFrom)} ~ ${formatDate(row.firstPeriodTo)}`,
  },
  {
    key: 'firstPeriodClosedCount',
    header: '마감수',
    render: (row) => row.firstPeriodClosedCount,
  },
  {
    key: 'secondPeriod',
    header: '후반기 기간',
    render: (row) =>
      `${formatDate(row.secondPeriodFrom)} ~ ${formatDate(row.secondPeriodTo)}`,
  },
  {
    key: 'secondPeriodClosedCount',
    header: '마감수',
    render: (row) => row.secondPeriodClosedCount,
  },
];

export default function BannerDisplay() {
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
        <Button size="M">
          <Image src="/svg/plus.svg" alt="logo" width={20} height={20} />
          추가
        </Button>
      </div>

      <CommonTable columns={columns} data={datadata} />
    </div>
  );
}
