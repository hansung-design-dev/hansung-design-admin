import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/button';
import { useState } from 'react';
import Checkbox from '@/components/ui/checkbox';
import { CommonTable } from './commonTable';
import { TableColumn } from './commonTable';

interface PopupEditProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  boxedTableTitle?: string;
  title?: string;
  additionalContent?: boolean;
  headerClassName?: string;
  onAddItem?: () => void;
  onEditItem?: (row: T) => void;
  onDeleteItem?: (row: T) => void;
}

export default function PopupEdit<T>({
  columns,
  data,
  boxedTableTitle,
  title,
  additionalContent,
  headerClassName,
  onAddItem,
  onEditItem,
  onDeleteItem,
}: PopupEditProps<T>) {
  const [isPosted, setIsPosted] = useState(true);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  // 행 클릭 시 선택된 행 설정
  const handleRowClick = (row: T) => {
    setSelectedRow(row);
  };

  // 상단 수정 버튼 클릭
  const handleEditClick = () => {
    if (selectedRow && onEditItem) {
      onEditItem(selectedRow);
    }
  };

  // 상단 삭제 버튼 클릭
  const handleDeleteClick = () => {
    if (selectedRow && onDeleteItem) {
      onDeleteItem(selectedRow);
      setSelectedRow(null);
    }
  };

  // 추가 버튼 클릭
  const handleAddClick = () => {
    if (onAddItem) {
      onAddItem();
    }
  };

  return (
    <div className="min-w-[23rem] max-w-[40rem] p-2 md:p-4">
      {/* 제목 */}
      <div className="text-1-700 mb-4">{title}</div>
      {/* 상단 버튼 영역 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 text-0-75-500 text-gray-1 gap-2 md:gap-0">
        <div className="flex gap-2">
          <Button
            size="S"
            className="flex gap-2 text-0-75-500"
            colorStyles="gray"
            onClick={handleAddClick}
          >
            <Image src="/svg/plus.svg" alt="추가" width={12} height={12} />
            추가
          </Button>
          <Button
            size="S"
            className={`flex gap-2 text-0-75-500 ${
              selectedRow ? '' : 'opacity-50 cursor-not-allowed'
            }`}
            colorStyles="gray"
            onClick={handleDeleteClick}
            disabled={!selectedRow}
          >
            <Image src="/svg/minus.svg" alt="삭제" width={12} height={12} />
            삭제
          </Button>
        </div>
        <Button
          size="S"
          colorStyles="gray"
          className={`text-0-75-500 ${
            selectedRow ? '' : 'opacity-50 cursor-not-allowed'
          }`}
          onClick={handleEditClick}
          disabled={!selectedRow}
        >
          수정
        </Button>
      </div>
      {/* 표 */}
      <div className="bg-white rounded-lg border border-gray-2 px-0 py-4">
        {boxedTableTitle && (
          <div className="text-lg font-bold mb-4">{boxedTableTitle}</div>
        )}
        <CommonTable
          columns={columns}
          data={data}
          tableRowClick={handleRowClick}
          tableClassName="px-3"
          headerClassName={headerClassName ?? ''}
          selectedRow={selectedRow}
        />
      </div>
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
