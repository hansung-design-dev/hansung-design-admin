import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/button';
import { useState } from 'react';
import Checkbox from '@/components/ui/checkbox';
import { BoxedTableWrapper } from './boxedTableWrapper';
import { TableColumn } from './commonTable';

// interface PopupRow {
//   id: number;
//   use: string;
//   title: string;
//   period: string;
// }

// const mockRows: PopupRow[] = [
//   { id: 1, use: '사용', title: '이전 안내', period: '25/06/16 ~ 25/06/30' },
//   { id: 2, use: '-', title: '공지사항 안내', period: '25/06/16 ~ 25/06/30' },
//   {
//     id: 3,
//     use: '-',
//     title: '내용이 길어질 경우 최대 두줄까지 가능합니다.',
//     period: '25/06/16 ~ 25/06/30',
//   },
//   { id: 4, use: '-', title: '추가 안내', period: '25/06/16 ~ 25/06/30' },
//   { id: 5, use: '-', title: '5번째 안내', period: '25/06/16 ~ 25/06/30' },
// ];

interface PopupEditProps<T> {
  handleListRowClick: (row: T) => void;
  columns: TableColumn<T>[];
  data: T[];
  boxedTableTitle?: string;
  title?: string;
  additionalContent?: boolean;
}

export default function PopupEdit<T>({
  handleListRowClick,
  columns,
  data,
  boxedTableTitle,
  title,
  additionalContent,
}: PopupEditProps<T>) {
  const [isPosted, setIsPosted] = useState(true);
  return (
    <div className="w-full md:w-1/2 p-2 md:p-4">
      {/* 제목 */}
      <div className="text-1-700 mb-4">{title}</div>
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
        <Button size="S" colorStyles="gray" className="text-0-75-500">
          수정
        </Button>
      </div>
      {/* 표 */}

      <BoxedTableWrapper
        columns={columns}
        data={data}
        onRowClick={handleListRowClick}
        title={boxedTableTitle}
        className="px-0"
      />
      {/* 하단 안내 */}
      {additionalContent && (
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
                      console.log(
                        '체크박스 값:',
                        setIsPosted(e.target.checked)
                      );
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
      )}
    </div>
  );
}
