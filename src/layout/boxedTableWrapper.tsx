import React from 'react';
import { CommonTable, TableColumn } from './commonTable';
import Button from '@/components/ui/button';
import Image from 'next/image';

// 예시 데이터 타입
interface BoxedTableRow {
  id: string;
  name: string;
  count: number;
  startDate: string;
  endDate: string;
  unit: string;
  fee: string;
  amount: string;
  checked?: boolean;
}

// 컬럼 정의 예시
const columns: TableColumn<BoxedTableRow>[] = [
  { key: 'id', header: 'N' },
  { key: 'name', header: '게시대명' },
  { key: 'count', header: '연수' },
  { key: 'startDate', header: '시작일' },
  { key: 'endDate', header: '철거일' },
  { key: 'unit', header: '단가' },
  { key: 'fee', header: '수수료' },
  { key: 'amount', header: '금액' },
  // 예시: 체크박스 컬럼
  // {
  //   key: 'checked',
  //   header: '선택',
  //   render: (row, rowIndex) => (
  //     <Checkbox checked={!!row.checked} onChange={() => {}} />
  //   ),
  // },
];

// 더미 데이터 예시
const data: BoxedTableRow[] = [
  {
    id: '01',
    name: '동춘사거리 보성중고 앞',
    count: 12,
    startDate: '25.05.01',
    endDate: '25.05.01',
    unit: '4,000,000',
    fee: '4,000,000',
    amount: '4,000,000',
    checked: false,
  },
  // ...
];

export function BoxedTableWrapper() {
  return (
    <div className="bg-white rounded-lg shadow p-4 pl-[7rem]">
      {/* 상단 버튼 UI 예시 */}
      <div className="flex items-center gap-2 mb-4">
        <Button size="M" className="text-0-75-500 text-gray-1 flex gap-3">
          <Image src="/svg/plus.svg" alt="plus" width={16} height={16} /> 추가
        </Button>
        <Button size="M" className="text-0-75-500  text-gray-1 flex gap-3">
          <Image src="/svg/minus.svg" alt="minus" width={16} height={16} /> 삭제
        </Button>
        <Button size="M" className="text-0-75-500  text-gray-1 px-[0.6rem] ">
          유휴연수복사
        </Button>
        <div className="flex-1" />
        <Button size="M">수량</Button>
        <Button size="M">연생성</Button>
      </div>
      <CommonTable columns={columns} data={data} className="w-full" />
    </div>
  );
}
