import LabelInput from './LabelInput';
import Checkbox from '@/components/ui/checkbox';
import React, { useState } from 'react';
import Image from 'next/image';

function HomepageContent({ title }: { title: string }) {
  const [image, setImage] = useState<string | null>(null);
  const [mainTitle, setMainTitle] = useState('');
  const [subTitle1, setSubTitle1] = useState('');
  // const [subTitle2, setSubTitle2] = useState('');
  // const [description, setDescription] = useState('');
  const [description1, setDescription1] = useState('');
  const [showUrl, setShowUrl] = useState(false);
  const [url, setUrl] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [buttonContent, setButtonContent] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-bold">{title}</h2>
      {/* 사진 등록 */}
      <LabelInput
        label="사진 등록"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        labelClassName="text-0-75-500 "
        containerClassName="items-center gap-2"
        className="placeholder:text-0-75-500"
      />
      {image && (
        <div className="w-64 h-40 relative">
          <Image
            src={image}
            alt="미리보기"
            fill
            className="object-cover rounded "
          />
        </div>
      )}
      {/* 입력 폼 */}
      <LabelInput
        label="메인타이틀"
        value={mainTitle}
        onChange={(e) => setMainTitle(e.target.value)}
        placeholder="입력하세요."
        labelClassName="text-0-75-500"
        containerClassName="items-center gap-2"
        className="placeholder:text-0-75-500"
      />
      <div className="flex  gap-8">
        <label className="block mb-1 text-gray-700 text-0-75-500">
          서브타이틀 1
        </label>
        <textarea
          className="w-full min-h-[48px] border border-gray-2 rounded px-2 py-1 resize-none placeholder:text-0-75-500"
          placeholder="입력하세요."
          value={subTitle1}
          onChange={(e) => setSubTitle1(e.target.value)}
        />
      </div>
      <div className="flex  gap-8">
        <label className="block mb-1 text-gray-700 text-0-75-500">
          서브타이틀 2
        </label>
        <textarea
          className="w-full min-h-[48px] border border-gray-2 rounded px-2 py-1 resize-none placeholder:text-0-75-500"
          placeholder="입력하세요."
          value={subTitle1}
          onChange={(e) => setSubTitle1(e.target.value)}
        />
      </div>
      <div className="flex gap-8">
        <label className=" mb-1 text-gray-700 text-0-75-500">설명</label>
        <textarea
          className="w-full min-h-[48px] border border-gray-2 rounded px-2 py-1 resize-none placeholder:text-0-75-500"
          placeholder="입력하세요."
          value={subTitle1}
          onChange={(e) => setSubTitle1(e.target.value)}
        />
      </div>
      <LabelInput
        label="설명1 (선택)"
        value={description1}
        onChange={(e) => setDescription1(e.target.value)}
        placeholder="추가 설명이 있다면 입력하세요"
        labelClassName="text-0-75-500"
        containerClassName="items-center gap-2"
        className="placeholder:text-0-75-500"
      />
      {/* URL */}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={showUrl}
          onChange={(e) => setShowUrl(e.target.checked)}
        />
        <LabelInput
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL을 입력하세요"
          labelClassName="text-0-75-500"
          containerClassName="items-center gap-2"
          className="placeholder:text-0-75-500"
          disabled={!showUrl}
        />
      </div>
      {/* 버튼 */}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={showButton}
          onChange={(e) => setShowButton(e.target.checked)}
        />
        <LabelInput
          label="버튼"
          value={buttonContent}
          onChange={(e) => setButtonContent(e.target.value)}
          placeholder="버튼에 들어갈 내용을 입력하세요"
          labelClassName="text-0-75-500"
          containerClassName="items-center gap-2"
          className="placeholder:text-0-75-500"
          disabled={!showButton}
        />
      </div>
      {/* 배너 예시 이미지 */}
      <div>
        <span className="block mb-2 font-semibold text-0-75-500">
          배너 예시 이미지
        </span>
        <div className="w-64 h-40 bg-gray-100 flex items-center justify-center  rounded">
          <span className="text-gray-400">예시 이미지 영역</span>
        </div>
      </div>
    </div>
  );
}

export default HomepageContent;
