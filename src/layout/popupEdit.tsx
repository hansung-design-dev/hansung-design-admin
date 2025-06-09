import Image from 'next/image';
import Button from '@/components/ui/button';
import { useState } from 'react';

const mockRows = [
  { id: 1, use: '사용', title: '이전 안내', period: '25/06/16 ~ 25/06/30' },
  { id: 2, use: '-', title: '공지사항 안내', period: '25/06/16 ~ 25/06/30' },
  {
    id: 3,
    use: '-',
    title: '내용이 길어질 경우 최대 두줄까지 가능합니다.',
    period: '25/06/16 ~ 25/06/30',
  },
  { id: 4, use: '-', title: '추가 안내', period: '25/06/16 ~ 25/06/30' },
  { id: 5, use: '-', title: '5번째 안내', period: '25/06/16 ~ 25/06/30' },
];

export default function PopupEdit() {
  const [rows] = useState(mockRows);
  const handleRowClick = (row: (typeof mockRows)[0]) => {
    // 모달 오픈 로직 (임시 alert)
    alert(`팝업: ${row.title}`);
  };

  return (
    <div className="w-full max-w-2xl border border-dashed border-blue-400 rounded-md p-4">
      {/* 제목 */}
      <div className="text-1-700 mb-2">안내팝업</div>
      {/* 상단 버튼 영역 */}
      <div className="flex justify-between items-center mb-2 text-0-75-500 text-gray-1">
        <div className="flex gap-2">
          <div className="flex items-center gap-1 cursor-pointer px-2 py-1 rounded hover:bg-gray-100">
            <Image src="/svg/plus.svg" alt="추가" width={16} height={16} />
            <div>추가</div>
          </div>
          <div className="flex items-center gap-1 cursor-pointer px-2 py-1 rounded hover:bg-gray-100">
            <Image src="/svg/minus.svg" alt="삭제" width={16} height={16} />
            <div>삭제</div>
          </div>
        </div>
        <Button size="S">수정</Button>
      </div>
      {/* 표 */}
      <div className="rounded-[0.375rem] border-[0.1rem] border-gray-2 overflow-hidden">
        <div className="grid grid-cols-3 bg-gray-50 text-center text-0-875-500 font-semibold border-b-[0.1rem] border-gray-2">
          <div className="py-2">사용여부</div>
          <div className="py-2">타이틀</div>
          <div className="py-2">팝업기간</div>
        </div>
        <div className="max-h-[13rem] overflow-y-auto">
          {rows.map((row, idx) => (
            <div
              key={row.id}
              className={`grid grid-cols-3 text-center text-0-875-500 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                idx % 2 === 0 ? 'bg-gray-1/10' : ''
              }`}
              style={{ minHeight: '3rem' }}
              onClick={() => handleRowClick(row)}
            >
              <div className="flex items-center justify-center py-2">
                {row.use}
              </div>
              <div className="flex items-center justify-center py-2 whitespace-pre-line">
                {row.title}
              </div>
              <div className="flex items-center justify-center py-2">
                {row.period}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
