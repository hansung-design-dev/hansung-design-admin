import React from 'react';
import { CommonTable, TableColumn } from '../layout/commonTable';

// 예시 데이터 타입
interface WideTableRow {
  location: string;
  photo: string;
  map: string;
  admin: string;
  postDate: string;
  amount: string;
  type: string;
  count: number;
  close: number;
  expose: number;
  note: string;
}

// 컬럼 정의 예시
const columns: TableColumn<WideTableRow>[] = [
  { key: 'location', header: '위치' },
  { key: 'photo', header: '사진' },
  { key: 'map', header: '지도' },
  { key: 'admin', header: '행정동' },
  { key: 'postDate', header: '게시' },
  { key: 'amount', header: '금액' },
  { key: 'type', header: '분류' },
  { key: 'count', header: '연수' },
  { key: 'close', header: '마감' },
  { key: 'expose', header: '노출수량' },
  { key: 'note', header: '비고' },
];

// 더미 데이터 예시
const data: WideTableRow[] = [
  // 실제 데이터로 교체 필요
  {
    location: '(상업용) 흥운초교(홍제동286-12)',
    photo: '업로드됨',
    map: '업로드됨',
    admin: '연희동',
    postDate: '15일',
    amount: '-',
    type: '소형게시대',
    count: 6,
    close: 2,
    expose: 1,
    note: '업로드됨',
  },
  // ...
];

export function WideTableWrapper() {
  return (
    <div className="w-full">
      {/* 상단 검색/필터/버튼 UI 예시 */}
      <div className="flex items-center gap-2 mb-4">
        <select className="border rounded px-2 py-1">
          <option>전체</option>
        </select>
        <input className="border rounded px-2 py-1" placeholder="위치 검색" />
        <button className="bg-gray-200 px-4 py-1 rounded">조회</button>
      </div>
      <CommonTable columns={columns} data={data} className="w-full" />
    </div>
  );
}
