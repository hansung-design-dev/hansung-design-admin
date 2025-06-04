'use client';

//import React, { useState } from 'react';
import Sidebar from '@/components/sidebar';
// import { BoxedTableWrapper } from '@/layout/BoxedTableWrapper';
// import { CommonTable, TableColumn } from '@/layout/CommonTable';
// import { Checkbox } from '@/components/ui/Checkbox';

// 1. 데이터 타입 정의
// interface RowType {
//   id: number;
//   locationName: string;
//   photo: boolean;
//   location: boolean;
//   map: boolean;
//   admin: string;
//   postDays: string;
//   amount: number;
//   size: string;
//   count: number;
//   close: number;
//   isAdmin: boolean;
//   note: string;
//   isBatchClose: boolean;
// }

export default function Home() {
  // const datadata: RowType[] = [
  //   {
  //     id: 1,
  //     locationName: '(상업용) 흥운초교(홍제동286-12)',
  //     photo: true,
  //     location: true,
  //     map: true,
  //     admin: '연희동',
  //     postDays: '15일',
  //     amount: 0,
  //     size: '480*70cm',
  //     count: 6,
  //     close: 2,
  //     isAdmin: true,
  //     note: '업로드됨',
  //     isBatchClose: false,
  //   },
  //   {
  //     id: 2,
  //     locationName: '(행정용) 대림아파트앞(연희동 산66-2)',
  //     photo: false,
  //     location: false,
  //     map: false,
  //     admin: '연희동',
  //     postDays: '15일',
  //     amount: 0,
  //     size: '480*70cm',
  //     count: 6,
  //     close: 2,
  //     isAdmin: false,
  //     note: '-',
  //     isBatchClose: true,
  //   },
  //   {
  //     id: 3,
  //     locationName: '(행정용) 대림아파트앞(연희동 산66-2)',
  //     photo: true,
  //     location: false,
  //     map: true,
  //     admin: '연희동',
  //     postDays: '15일',
  //     amount: 0,
  //     size: '480*70cm',
  //     count: 6,
  //     close: 2,
  //     isAdmin: false,
  //     note: '-',
  //     isBatchClose: false,
  //   },
  // ];
  // const [data, setData] = useState<RowType[]>(datadata);

  // const columns: TableColumn<RowType>[] = [
  //   { key: 'id', header: '고유번호' },
  //   { key: 'locationName', header: '위치명' },
  //   {
  //     key: 'photo',
  //     header: '사진',
  //     render: (row) =>
  //       row.photo ? <span className="">업로드됨</span> : <span>-</span>,
  //   },
  //   {
  //     key: 'location',
  //     header: '위치',
  //     render: (row) =>
  //       row.location ? (
  //         <span className="">업로드됨</span>
  //       ) : (
  //         <span className="text-gray-400">-</span>
  //       ),
  //   },
  //   {
  //     key: 'map',
  //     header: '지도',
  //     render: (row) =>
  //       row.map ? (
  //         <span className="">업로드됨</span>
  //       ) : (
  //         <span className="text-gray-400">-</span>
  //       ),
  //   },
  //   { key: 'admin', header: '행정동' },
  //   { key: 'postDays', header: '게시일수' },
  //   { key: 'amount', header: '금액' },
  //   { key: 'size', header: '규격' },
  //   { key: 'count', header: '면수' },
  //   { key: 'close', header: '마감' },
  //   {
  //     key: 'isAdmin',
  //     header: '행정용',
  //     render: (row, rowIndex) => (
  //       <Checkbox
  //         checked={row.isAdmin}
  //         onChange={() => {
  //           setData((prev) =>
  //             prev.map((item, idx) =>
  //               idx === rowIndex ? { ...item, isAdmin: !item.isAdmin } : item
  //             )
  //           );
  //         }}
  //       />
  //     ),
  //   },
  //   { key: 'note', header: '비고' },
  //   {
  //     key: 'isBatchClose',
  //     header: '일괄마감',
  //     render: (row) => (
  //       <Checkbox checked={row.isBatchClose} onChange={() => {}} readOnly />
  //     ),
  //   },
  // ];

  return (
    <>
      <Sidebar />

      {/* <BoxedTableWrapper />
      <CommonTable columns={columns} data={data} /> */}
    </>
  );
}
