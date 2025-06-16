import React, { useState } from 'react';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import LabelInput from '@/components/layout/labelInput';
import { BoxedTableWrapper } from '../table/boxedTableWrapper';
import { TableColumn } from '../layout/commonTable';

interface OrderEditFormProps {
  fields: { key: string; label: string }[];
}

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
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // 필드 분류: textarea, checkbox, 일반 input 등
  const textAreaFields = ['note', 'display_contents'];
  const checkboxFields = [
    { key: 'is_keep_banner', label: '철거시 현수막보관' },
    { key: 'is_order_requested', label: '제작(설치)의뢰' },
    { key: 'is_approved', label: '검수완료' },
    { key: 'is_instock', label: '현수막입고(전체)' },
  ];
  const buttonFields = [
    { key: 'view_design', label: '시안보기' },
    { key: 'register_design', label: '시안등록' },
    { key: 'delete_design', label: '시안삭제' },
    { key: 'register_attachment', label: '첨부등록' },
  ];

  return (
    <form className="flex flex-col gap-6">
      {/* 상단 버튼 */}

      <div className="flex gap-2 mb-2">
        <Button size="S" className="text-0-75-500">
          수정
        </Button>
        <Button size="S" className="text-0-75-500">
          삭제
        </Button>
      </div>

      {/* 2단 그리드 입력 */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {fields.map(({ key, label }) => {
          if (textAreaFields.includes(key)) {
            return (
              <div className="col-span-2" key={key}>
                <label className="block mb-1 text-0-75-500 text-gray-1">
                  {label}
                </label>
                <textarea
                  className="w-full border border-gray-2 rounded px-2 py-1 resize-none text-0-75-500"
                  placeholder={label + '을(를) 입력해주세요.'}
                  value={formState[key] || ''}
                  onChange={(e) =>
                    setFormState({ ...formState, [key]: e.target.value })
                  }
                  rows={3}
                />
              </div>
            );
          }
          return (
            <LabelInput
              key={key}
              label={label}
              placeholder={'내용을 입력해주세요'}
              value={formState[key] || ''}
              onChange={(e) =>
                setFormState({ ...formState, [key]: e.target.value })
              }
              labelClassName="w-[4rem] text-0-75-500"
              className="text-0-75-500 placeholder:text-0-75-500"
            />
          );
        })}
      </div>

      {/* 체크박스 그룹 */}
      <div className="flex flex-wrap gap-6 items-center mt-2">
        {checkboxFields.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2">
            <Checkbox
              checked={!!checked[key]}
              onChange={(e) =>
                setChecked({ ...checked, [key]: e.target.checked })
              }
            />
            <span className="text-0-75-500">{label}</span>
          </label>
        ))}
      </div>

      {/* 버튼 그룹 */}
      <div className="flex flex-wrap gap-2 mt-2">
        {buttonFields.map(({ key, label }) => (
          <Button key={key} size="S" className="text-0-75-500">
            {label}
          </Button>
        ))}
      </div>
      <div className="mt-8">
        <div className="flex gap-2 mb-4">
          <Button size="S">+ 추가</Button>
          <Button size="S">삭제</Button>
        </div>
        <BoxedTableWrapper columns={tableColumns} data={tableData} />
      </div>
    </form>
  );
}

export default OrderEditForm;
