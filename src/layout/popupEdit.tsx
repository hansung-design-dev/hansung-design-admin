import Image from 'next/image';
import Button from '@/components/ui/button';
import { useState } from 'react';
import Checkbox from '@/components/ui/checkbox';

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

export default function PopupEdit({
  handleListRowClick,
}: {
  handleListRowClick?: (row: any) => void;
}) {
  const [rows] = useState(mockRows);
  const [isPosted, setIsPosted] = useState(true);

  return (
    <div className="w-full md:w-1/2 p-2 md:p-4">
      {/* 제목 */}
      <div className="text-1-700 mb-4">안내팝업</div>
      {/* 상단 버튼 영역 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 text-0-75-500 text-gray-1 gap-2 md:gap-0">
        <div className="flex gap-2">
          <Button
            size="S"
            className="flex gap-2 text-0-75-500"
            colorStyles="gray"
          >
            <Image src="/svg/plus.svg" alt="추가" width={12} height={12} />
            추가
          </Button>
          <Button
            size="S"
            className="flex gap-2 text-0-75-500"
            colorStyles="gray"
          >
            <Image src="/svg/minus.svg" alt="삭제" width={12} height={12} />
            삭제
          </Button>
        </div>
        <Button
          size="S"
          colorStyles="gray"
          className="text-0-75-500"
          text-0-75-500
        >
          수정
        </Button>
      </div>
      {/* 표 */}
      <div className="rounded-[0.375rem] border-[0.07rem] border-gray-2 overflow-hidden text-gray-1">
        <div className="grid grid-cols-3  text-center text-0-75-500 md:text-0-875-500  border-b-[0.07rem] border-gray-2">
          <div className="py-2 px-1 md:px-2">사용여부</div>
          <div className="py-2 px-1 md:px-2">타이틀</div>
          <div className="py-2 px-1 md:px-2">팝업기간</div>
        </div>
        <div className="max-h-[10rem] md:max-h-[13rem] overflow-y-auto">
          {rows.map((row) => (
            <div
              key={row.id}
              className={`grid grid-cols-3 text-center text-0-75-500 md:text-0-875-500 border-b border-gray-100 cursor-pointer hover:bg-gray-50 `}
              style={{ minHeight: '2.5rem' }}
              onClick={handleListRowClick}
            >
              <div className="flex items-center justify-center py-2 px-1 md:px-2">
                {row.use}
              </div>
              <div className="flex items-center justify-center py-2 px-1 md:px-2 whitespace-pre-line">
                {row.title}
              </div>
              <div className="flex items-center justify-center py-2 px-1 md:px-2">
                {row.period}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 하단 안내 */}
      <div className="mt-8">
        <div className="text-1-700 mb-4">하단 안내</div>

        <div className="flex flex-col gap-4 text-0-75-500 text-gray-1">
          <div className="flex gap-16">
            <span className="w-16">카피</span>
            <input
              type="text"
              placeholder="  내용을 입력하세요"
              className="border-b-[0.05rem] border-gray-2 w-full placeholder:text-gray-1"
            />
          </div>
          <div className="flex gap-16 items-center">
            <span className="w-16">게시여부</span>
            <div className="flex gap-2 justify-between w-full">
              <div className="flex flex-col gap-2 items-start ">
                <Checkbox
                  className="w-[1.5rem] h-[1.5rem]"
                  checked={isPosted}
                  onChange={(e) => {
                    console.log('체크박스 값:', setIsPosted(e.target.checked));
                    return setIsPosted(!isPosted);
                  }}
                />
                <span className="text-gray-1 text-0-75-400">
                  *현재 홈페이지에 안내 중입니다
                </span>
              </div>
              <Button size="S" colorStyles="gray" className="text-0-75-500">
                수정
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
