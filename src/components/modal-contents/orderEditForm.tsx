import React from 'react';
//import Button from '@/components/ui/button';
// import Checkbox from '@/components/ui/checkbox';
import LabelInput from '@/components/layout/LabelInput';

interface OrderEditFormProps<T> {
  row: T;
  fields: { key: keyof T; label: string }[];
}

function OrderEditForm<T>({ row, fields }: OrderEditFormProps<T>) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {fields.map(({ key, label }) => (
        <div className="flex gap-4" key={String(key)}>
          <LabelInput
            label={label}
            placeholder="입력해주세요."
            value={row[key] as string}
            onChange={() => {}}
            // 실제 사용 시 onChange 핸들러를 props로 추가해 확장 가능
          />
        </div>
      ))}
      {/* 예시: 체크박스는 별도 처리 필요시 props로 추가 */}
    </div>
  );
}

export default OrderEditForm;
