import React, { useState } from 'react';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import LabelInput from '../layout/labelInput';

const PopupAddForm: React.FC = () => {
  const [useYn, setUseYn] = useState(true);
  const [oneDay, setOneDay] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <>
      <div className="flex flex-col gap-6 mb-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="w-20">사용 여부</span>
            <Checkbox
              checked={useYn}
              onChange={(e) => setUseYn(e.target.checked)}
            />
            <span>사용</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-20">하루 안보기</span>
            <Checkbox
              checked={oneDay}
              onChange={(e) => setOneDay(e.target.checked)}
            />
            <span>사용</span>
          </div>
        </div>
        <LabelInput
          label="타이틀"
          placeholder="입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <Button size="M" className="text-0-75-500">
          이미지로 올리기
        </Button>
        <span className="text-0-75-500 text-gray-2">
          *너비는 640px로 고정되어 있습니다.
        </span>
      </div>
      <textarea
        className="w-full h-40 border border-gray-2 rounded p-2 mb-8"
        placeholder="내용을 입력하세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </>
  );
};

export default PopupAddForm;
