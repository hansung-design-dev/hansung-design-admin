'use client';
import React, { useState } from 'react';
import { CommonTable, TableColumn } from '../layout/commonTable';
import Button from '@/components/ui/button';
import Image from 'next/image';

interface BoxedTableWrapperProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onAddItem?: () => void;
  onRowClick?: (row: T) => void;
  onSaveAll?: (data: T[]) => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
}

export function BoxedTableWrapper<T>({
  columns,
  data,
  onAddItem,
  //onRowClick,
  onSaveAll,
  title,
  children,
  className = '',
  tableClassName = '',
  headerClassName = '',
}: BoxedTableWrapperProps<T>) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<T | null>(null);
  const [tableData, setTableData] = useState<T[]>(data);

  // row 클릭 시
  const handleRowClick = (row: T, rowIndex: number) => {
    // 이전 편집 중인 행이 있으면 먼저 저장
    if (editingIndex !== null && editRow) {
      const newData = [...tableData];
      newData[editingIndex] = editRow;
      setTableData(newData);
      if (onSaveAll) onSaveAll(newData);
    }

    // 새로운 행 편집 시작
    setEditingIndex(rowIndex);
    setEditRow({ ...row });
  };

  // input/select 등 값 변경 (자동 저장 포함)
  const handleInputChangeWithAutoSave = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let newValue: string | boolean = value;
    if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    }
    setEditRow((prev) => (prev ? { ...prev, [name]: newValue } : prev));

    // 값 변경 후 자동 저장
    setTimeout(() => {
      if (editingIndex !== null && editRow) {
        const updatedRow = { ...editRow, [name]: newValue };
        const newData = [...tableData];
        newData[editingIndex] = updatedRow;
        setTableData(newData);
        if (onSaveAll) onSaveAll(newData);
      }
    }, 100);
  };

  // columns 확장: render에서 인라인 수정 지원
  const editableColumns = columns.map((col) => ({
    ...col,
    render: (row: T, rowIndex: number) => {
      if (editingIndex === rowIndex && editRow) {
        // 필드별로 input/select 등 분기
        if (
          col.key === 'face_number' ||
          col.key === 'unit_price' ||
          col.key === 'tax_price'
        ) {
          return (
            <input
              name={col.key}
              type="number"
              value={editRow[col.key as keyof T] as number | string}
              onChange={handleInputChangeWithAutoSave}
              className="w-16 border border-gray-300 rounded px-1 py-2 text-center"
            />
          );
        }
        if (col.key === 'usage_type') {
          return (
            <select
              name="usage_type"
              value={editRow['usage_type' as keyof T] as string}
              onChange={handleInputChangeWithAutoSave}
              className="border border-gray-300 rounded px-1 py-2"
            >
              <option value="소형게시대">소형게시대</option>
              <option value="대형게시대">대형게시대</option>
            </select>
          );
        }
        if (col.key === 'attach_date_from') {
          return (
            <input
              name="attach_date_from"
              type="date"
              value={editRow['attach_date_from' as keyof T] as string}
              onChange={handleInputChangeWithAutoSave}
              className="border border-gray-300 rounded px-1 py-2"
            />
          );
        }
        if (col.key === 'is_active') {
          return (
            <select
              name="is_active"
              value={editRow['is_active' as keyof T] ? 'true' : 'false'}
              onChange={handleInputChangeWithAutoSave}
              className="border border-gray-300 rounded px-1 py-2"
            >
              <option value="true">가능</option>
              <option value="false">불가능</option>
            </select>
          );
        }
        if (col.key === 'is_closed') {
          return (
            <select
              name="is_closed"
              value={editRow['is_closed' as keyof T] ? 'true' : 'false'}
              onChange={handleInputChangeWithAutoSave}
              className="border border-gray-300 rounded px-1 py-2"
            >
              <option value="true">마감</option>
              <option value="false">오픈</option>
            </select>
          );
        }
        if (col.key === 'company_name') {
          return (
            <input
              name="company_name"
              type="text"
              value={editRow['company_name' as keyof T] as string}
              onChange={handleInputChangeWithAutoSave}
              className="border border-gray-300 rounded px-1 py-2"
            />
          );
        }
      }
      // 기본 render
      return col.render
        ? col.render(row, rowIndex)
        : String(row[col.key as keyof T] ?? '');
    },
  }));

  // actions 컬럼 제거 (자동 저장이므로 버튼 불필요)

  return (
    <div className={`bg-white rounded-lg border border-gray-2 ${className}`}>
      {title && <div className="text-lg font-bold mb-4">{title}</div>}
      <div className="flex items-center gap-2 mb-4">
        {onAddItem && (
          <Button size="M" className="text-0-75-500 text-gray-1 flex gap-3">
            <Image src="/svg/plus.svg" alt="plus" width={16} height={16} /> 추가
          </Button>
        )}
        {children}
      </div>
      <CommonTable
        columns={editableColumns}
        data={tableData}
        tableRowClick={handleRowClick}
        tableClassName={tableClassName}
        headerClassName={headerClassName}
      />
    </div>
  );
}
