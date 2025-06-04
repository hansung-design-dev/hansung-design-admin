import React from 'react';
import Checkbox from '@/components/ui/checkbox';

export interface TableColumn<T> {
  key: string;
  header: React.ReactNode;
  render?: (row: T, rowIndex: number) => React.ReactNode;
  className?: string;
}

export interface CommonTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  headerClassName?: string;
  rowClassName?: string | ((row: T, rowIndex: number) => string);
  style?: React.CSSProperties;
  theadStyle?: React.CSSProperties;
  tbodyStyle?: React.CSSProperties;
}

function getValue<T>(row: T, key: string): unknown {
  return (row as Record<string, unknown>)[key];
}

export function CommonTable<T>({
  columns,
  data,
  className = '',
  headerClassName = '',
  rowClassName = '',
  style = {},
  theadStyle = {},
  tbodyStyle = {},
}: CommonTableProps<T>) {
  return (
    <div className={`overflow-x-auto ${className}`} style={style}>
      <table className="border-separate border-spacing-0 w-full table-fixed">
        <thead style={theadStyle}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-center align-middle px-4 py-2 text-0-75-500 text-gray-1 bg-white ${headerClassName} ${
                  col.className ?? ''
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={tbodyStyle}>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`hover:bg-gray-3 text-0-875-500 ${
                typeof rowClassName === 'function'
                  ? rowClassName(row, rowIndex)
                  : rowClassName
              }`}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`text-center align-middle px-4 py-[0.87rem] border-b border-gray-2 ${
                    col.className ?? ''
                  }`}
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
