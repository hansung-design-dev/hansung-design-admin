import React, { useState } from 'react';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import LabelInput from '@/components/layout/LabelInput';
import { BoxedTableWrapper } from '../layout/boxedTableWrapper';
import { TableColumn } from '../layout/commonTable';

interface OrderEditFormProps {
  fields: { key: string; label: string }[];
}

// 테이블 row 타입 정의
interface TableRow {
  count: string;
  usageType: string;
  attachDate: string;
  attachPrice: string;
  fee: string;
  usage: string;
  done: string;
  companyName: string;
}

// 테이블 컬럼 정의
const tableColumns: TableColumn<TableRow>[] = [
  { key: 'count', header: '면수' },
  { key: 'usageType', header: '사용구분' },
  { key: 'attachDate', header: '부착일' },
  { key: 'attachPrice', header: '부착단가' },
  { key: 'fee', header: '수수료' },
  { key: 'usage', header: '사용' },
  { key: 'done', header: '마감' },
  { key: 'companyName', header: '사업자명' },
];

// 테이블 데이터 예시
const tableData: TableRow[] = [
  {
    count: '01',
    usageType: '사용구분',
    attachDate: '부착일',
    attachPrice: '부착단가',
    fee: '수수료',
    usage: '가능',
    done: '-',
    companyName: '-',
  },
  {
    count: '02',
    usageType: '사용구분',
    attachDate: '부착일',
    attachPrice: '부착단가',
    fee: '수수료',
    usage: '가능',
    done: '마감',
    companyName: '회사이름',
  },
  {
    count: '03',
    usageType: '사용구분',
    attachDate: '부착일',
    attachPrice: '부착단가',
    fee: '수수료',
    usage: '가능',
    done: '마감',
    companyName: '회사이름',
  },
  {
    count: '04',
    usageType: '사용구분',
    attachDate: '부착일',
    attachPrice: '부착단가',
    fee: '수수료',
    usage: '가능',
    done: '-',
    companyName: '-',
  },
  {
    count: '0',
    usageType: '사용구분',
    attachDate: '부착일',
    attachPrice: '부착단가',
    fee: '수수료',
    usage: '불가능',
    done: '-',
    companyName: '홍길동',
  },
];

function OrderEditForm({ fields }: OrderEditFormProps) {
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 mb-6">
        {fields.map(({ key, label }) => (
          <LabelInput
            key={key}
            label={label}
            placeholder={label + '를 입력해주세요.'}
            value={formState[key] || ''}
            onChange={(e) =>
              setFormState({ ...formState, [key]: e.target.value })
            }
          />
        ))}
        <div className="flex items-center gap-2 mt-2">
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <span>행정용</span>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex gap-2 mb-4">
          <Button size="S">+ 추가</Button>
          <Button size="S">삭제</Button>
        </div>
        <BoxedTableWrapper columns={tableColumns} data={tableData} />
      </div>
    </>
  );
}

export default OrderEditForm;
