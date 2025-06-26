import React from 'react';
import Checkbox from '@/components/ui/checkbox';
import AddItem from '@/components/layout/addItem';
import SearchInput from '@/components/layout/searchInput';

export interface TableColumn<T> {
  key: string;
  header: React.ReactNode;
  render?: (row: T, rowIndex: number) => React.ReactNode;
  className?: string;
  minWidth?: string;
  width?: string;
  maxWidth?: string;
}

export interface CommonTableProps<T> {
  columns: TableColumn<T>[];
  data?: T[];
  className?: string;
  headerClassName?: string;
  rowClassName?: string | ((row: T, rowIndex: number) => string);
  style?: React.CSSProperties;
  theadStyle?: React.CSSProperties;
  tbodyStyle?: React.CSSProperties;
  tableRowClick?: (row: T, rowIndex: number) => void;
  onAddItem?: () => void;
  searchInput?: boolean;
  searchTitle?: string;
  tableClassName?: string;
  selectedRow?: T | null;
}

function getValue<T>(row: T, key: string): unknown {
  return (row as Record<string, unknown>)[key];
}

export function CommonTable<T>({
  columns = [],
  data,
  className = '',
  headerClassName = 'py-3',
  rowClassName = '',
  style = {},
  theadStyle = {},
  tbodyStyle = {},
  tableRowClick,
  onAddItem,
  searchInput,
  searchTitle,
  tableClassName = '',
  selectedRow,
}: CommonTableProps<T>) {
  return (
    <div className={` ${className}`} style={{ ...style, overflowX: 'auto' }}>
      {searchInput && <SearchInput title={searchTitle} className="pb-4" />}
      <table
        className={`border-separate border-spacing-0 w-full table-auto  ${tableClassName}`}
      >
        <thead style={theadStyle}>
          <tr>
            {(columns || []).map((col) => (
              <th
                key={col.key}
                className={`text-center align-middle text-0-75-500 text-gray-1 bg-white border-b-1 border-gray-2 pb-2  ${headerClassName} ${
                  col.className ?? ''
                }`}
                style={{
                  minWidth: col.minWidth,
                  width: col.width,
                  maxWidth: col.maxWidth,
                  whiteSpace: 'nowrap',
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={tbodyStyle}>
          {data && data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`text-0-75-500 md:text-0-875-500 cursor-pointer ${
                  typeof rowClassName === 'function'
                    ? rowClassName(row, rowIndex)
                    : rowClassName
                } ${
                  selectedRow === row
                    ? 'bg-gray-3 hover:bg-gray-3'
                    : 'hover:bg-gray-3'
                }`}
                onClick={() => tableRowClick?.(row, rowIndex)}
              >
                {(columns || []).map((col) => (
                  <td
                    key={col.key}
                    className={`text-center align-middle px-[0.5rem] py-[0.87rem]  border-b border-gray-2 ${
                      col.className ?? ''
                    }`}
                    style={{
                      minWidth: col.minWidth,
                      width: col.width,
                      maxWidth: col.maxWidth,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {col.render ? (
                      col.render(row, rowIndex)
                    ) : typeof getValue(row, col.key) === 'boolean' ? (
                      <Checkbox
                        checked={getValue(row, col.key) as boolean}
                        onChange={() => {
                          /* handle change */
                        }}
                      />
                    ) : (
                      (getValue(row, col.key) as React.ReactNode)
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="p-0">
                <AddItem onClick={onAddItem} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
