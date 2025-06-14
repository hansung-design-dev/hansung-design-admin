import { TableColumn } from '@/components/layout/commonTable';

export interface BoardSchedule {
  id: string;
  district_name: string; // ex. 서대문구
  category: string; // 'banner' | 'led'
  first_half_start: Date;
  first_half_end: Date;
  second_half_start: Date;
  second_half_end: Date;
  first_half_deadline_count: number;
  second_half_deadline_count: number;
  next_first_half_start: Date;
  next_first_half_end: Date;
  next_second_half_start: Date;
  next_second_half_end: Date;
  next_first_half_deadline_count: number;
  next_second_half_deadline_count: number;
  created_at: Date;
  updated_at: Date;
}

export const mockData: BoardSchedule[] = [
  {
    id: '1',
    district_name: '서대문구',
    category: 'banner',
    first_half_start: new Date(2025, 5, 1),
    first_half_end: new Date(2025, 5, 15),
    second_half_start: new Date(2025, 5, 16),
    second_half_end: new Date(2025, 5, 31),
    first_half_deadline_count: 12,
    second_half_deadline_count: 0,
    next_first_half_start: new Date(2025, 6, 1),
    next_first_half_end: new Date(2025, 6, 15),
    next_second_half_start: new Date(2025, 6, 16),
    next_second_half_end: new Date(2025, 6, 30),
    next_first_half_deadline_count: 12,
    next_second_half_deadline_count: 0,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '2',
    district_name: '용산구',
    category: 'banner',
    first_half_start: new Date(2025, 5, 1),
    first_half_end: new Date(2025, 5, 15),
    second_half_start: new Date(2025, 5, 16),
    second_half_end: new Date(2025, 5, 31),
    first_half_deadline_count: 12,
    second_half_deadline_count: 0,
    next_first_half_start: new Date(2025, 6, 1),
    next_first_half_end: new Date(2025, 6, 15),
    next_second_half_start: new Date(2025, 6, 16),
    next_second_half_end: new Date(2025, 6, 30),
    next_first_half_deadline_count: 12,
    next_second_half_deadline_count: 0,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '3',
    district_name: '관악구',
    category: 'banner',
    first_half_start: new Date(2025, 5, 1),
    first_half_end: new Date(2025, 5, 15),
    second_half_start: new Date(2025, 5, 16),
    second_half_end: new Date(2025, 5, 31),
    first_half_deadline_count: 12,
    second_half_deadline_count: 0,
    next_first_half_start: new Date(2025, 6, 1),
    next_first_half_end: new Date(2025, 6, 15),
    next_second_half_start: new Date(2025, 6, 16),
    next_second_half_end: new Date(2025, 6, 30),
    next_first_half_deadline_count: 12,
    next_second_half_deadline_count: 0,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '4',
    district_name: '송파구',
    category: 'banner',
    first_half_start: new Date(2025, 5, 1),
    first_half_end: new Date(2025, 5, 15),
    second_half_start: new Date(2025, 5, 16),
    second_half_end: new Date(2025, 5, 31),
    first_half_deadline_count: 12,
    second_half_deadline_count: 0,
    next_first_half_start: new Date(2025, 6, 1),
    next_first_half_end: new Date(2025, 6, 15),
    next_second_half_start: new Date(2025, 6, 16),
    next_second_half_end: new Date(2025, 6, 30),
    next_first_half_deadline_count: 12,
    next_second_half_deadline_count: 0,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '5',
    district_name: '마포구',
    category: 'banner',
    first_half_start: new Date(2025, 5, 1),
    first_half_end: new Date(2025, 5, 15),
    second_half_start: new Date(2025, 5, 16),
    second_half_end: new Date(2025, 5, 31),
    first_half_deadline_count: 12,
    second_half_deadline_count: 0,
    next_first_half_start: new Date(2025, 6, 1),
    next_first_half_end: new Date(2025, 6, 15),
    next_second_half_start: new Date(2025, 6, 16),
    next_second_half_end: new Date(2025, 6, 30),
    next_first_half_deadline_count: 12,
    next_second_half_deadline_count: 0,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export function formatDate(date: Date) {
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}/${String(date.getDate()).padStart(2, '0')}`;
}

export const columns: TableColumn<BoardSchedule>[] = [
  { key: 'district_name', header: '위치', minWidth: '10rem' },
  {
    key: 'first_half_period',
    header: '전반기',
    render: (row: BoardSchedule) =>
      `${formatDate(row.first_half_start)} ~ ${formatDate(row.first_half_end)}`,
    minWidth: '20rem',
  },
  {
    key: 'first_half_deadline_count',
    header: '마감수',
    render: (row: BoardSchedule) => row.first_half_deadline_count,
    minWidth: '20rem',
  },
  {
    key: 'second_half_period',
    header: '후반기',
    render: (row: BoardSchedule) =>
      `${formatDate(row.second_half_start)} ~ ${formatDate(
        row.second_half_end
      )}`,
    minWidth: '20rem',
  },
  {
    key: 'second_half_deadline_count',
    header: '마감수',
    render: (row: BoardSchedule) => row.second_half_deadline_count,
    minWidth: '20rem',
  },
];
