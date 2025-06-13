import React, { useState } from 'react';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import LabelInput from '@/layout/LabelInput';

const ApplicationEditForm: React.FC = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex gap-4">
          <LabelInput
            label="위치"
            placeholder="입력해주세요."
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
          />
          <LabelInput
            label="사진"
            placeholder="입력해주세요."
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
          <Button size="S" className="ml-2">
            사진 보기
          </Button>
          <Button size="S">수정</Button>
          <Button size="S">삭제</Button>
        </div>
        <div className="flex gap-4">
          <LabelInput
            label="지도"
            placeholder="입력해주세요."
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
          />
          <Button size="S" className="ml-2">
            지도 보기
          </Button>
          <Button size="S">수정</Button>
          <Button size="S">삭제</Button>
        </div>
        <div className="flex gap-4">
          <LabelInput
            label="비고"
            placeholder="비고내용"
            value={input4}
            onChange={(e) => setInput4(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <span>행정용</span>
        </div>
      </div>
      {/* 테이블 mockup */}
      <div className="border rounded p-2 bg-gray-50">
        <table className="w-full text-center text-0-75-500">
          <thead>
            <tr className="bg-gray-100">
              <th>N</th>
              <th>코드</th>
              <th>게시대명</th>
              <th>입수</th>
              <th>시작일</th>
              <th>참가일</th>
              <th>단가</th>
              <th>수수료</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="border-t">
                <td>{i}</td>
                <td>S09</td>
                <td>동탄사거리 버스정류장 앞</td>
                <td>12</td>
                <td>25.05.01</td>
                <td>25.05.01</td>
                <td>4,000,000</td>
                <td>4,000,000</td>
                <td>4,000,000</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApplicationEditForm;
