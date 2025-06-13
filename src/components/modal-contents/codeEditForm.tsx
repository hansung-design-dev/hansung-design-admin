import React, { useState } from 'react';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import LabelInput from '@/components/layout/LabelInput';
import { BoxedTableWrapper } from '../layout/boxedTableWrapper';
import { TableColumn } from '../layout/commonTable';

interface CodeEditFormProps<T> {
  columns: TableColumn<T>[];
  data: T[];
}

const CodeEditForm = <T,>({ columns, data }: CodeEditFormProps<T>) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div className="flex gap-2 mb-4">
        <Button size="S">+ 추가</Button>
        <Button size="S">수정</Button>
        <Button size="S">삭제</Button>
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex gap-4">
          <LabelInput
            label="신청자"
            placeholder="입력해주세요."
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
          />
          <LabelInput
            label="신청번호"
            placeholder="입력해주세요."
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
          <LabelInput
            label="사업자번호"
            placeholder="입력해주세요."
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <span>접수완료</span>
        </div>
      </div>
      {/* 테이블 mockup */}

      <BoxedTableWrapper columns={columns} data={data} />
    </>
  );
};

export default CodeEditForm;
