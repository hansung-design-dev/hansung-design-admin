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
}: BoxedTableWrapperProps<T>) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<T | null>(null);
  const [tableData, setTableData] = useState<T[]>(data);

  // row 클릭 시
  const handleRowClick = (row: T, rowIndex: number) => {
    setEditingIndex(rowIndex);
    setEditRow({ ...row });
  };

  // input/select 등 값 변경
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let newValue: string | boolean = value;
    if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    }
    setEditRow((prev) => (prev ? { ...prev, [name]: newValue } : prev));
  };

  // 저장
  const handleSave = () => {
    if (editingIndex === null || !editRow) return;
    const newData = [...tableData];
    newData[editingIndex] = editRow;
    setTableData(newData);
    setEditingIndex(null);
    setEditRow(null);
    if (onSaveAll) onSaveAll(newData);
  };

  // 취소
  const handleCancel = () => {
    setEditingIndex(null);
    setEditRow(null);
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
              onChange={handleInputChange}
              className="w-16 border border-gray-300 rounded px-1 py-2 text-center"
            />
          );
        }
        if (col.key === 'usage_type') {
          return (
            <select
              name="usage_type"
              value={editRow['usage_type' as keyof T] as string}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              className="border border-gray-300 rounded px-1 py-2"
            />
          );
        }
        if (col.key === 'is_active') {
          return (
            <select
              name="is_active"
              value={editRow['is_active' as keyof T] ? 'true' : 'false'}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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

  // actions 컬럼 추가
  editableColumns.push({
    key: 'actions',
    header: '',
    render: (_row: T, rowIndex: number) =>
      editingIndex === rowIndex ? (
        <>
          <button className="text-blue-600 mr-2" onClick={handleSave}>
            저장
          </button>
          <button className="text-gray-500" onClick={handleCancel}>
            취소
          </button>
        </>
      ) : null,
  });

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
        tableClassName="px-3"
      />
    </div>
  );
}
