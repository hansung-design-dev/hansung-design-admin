import React from 'react';
import { CommonTable, TableColumn } from './commonTable';
import Button from '@/components/ui/button';
import Image from 'next/image';

interface BoxedTableWrapperProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onAddItem?: () => void;
  onRowClick?: (row: T) => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export function BoxedTableWrapper<T>({
  columns,
  data,
  onAddItem,
  onRowClick,
  title,
  children,
  className = '',
}: BoxedTableWrapperProps<T>) {
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
      <CommonTable columns={columns} data={data} tableRowClick={onRowClick} />
    </div>
  );
}
