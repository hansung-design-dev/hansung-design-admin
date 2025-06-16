'use client';
import { useState } from 'react';
import Button from '@/components/ui/button';
import LabelInput from '@/components/layout/labelInput';

export default function NoteEdit() {
  const [period, setPeriod] = useState('');
  const [method, setMethod] = useState('');
  const [account, setAccount] = useState('');
  const [preview, setPreview] = useState({
    period: '',
    method: '',
    account: '',
  });

  const handleChange = () => {
    setPreview({ period, method, account });
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6 items-start w-full">
      {/* 제목 */}
      <div className="text-0-875-700 md:text-1-700 mb-2 w-full">유의사항</div>
      {/* 작성폼+버튼 */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full md:w-[35rem] gap-4">
        {/* 작성폼 */}
        <div className="flex flex-col gap-3 w-full">
          {/* 접수기간 */}
          <LabelInput
            label="접수기간"
            labelClassName="text-0-75-500 text-gray-1 mt-2 sm:w-12"
            containerClassName="flex gap-2 sm:gap-8"
            className="border-b-[0.1rem] border-b-gray-2  w-full md:w-[25.6875rem] resize-none text-0-875-500 placeholder:text-center"
            maxLength={80}
            placeholder="입력해주세요"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          />
          {/* 접수방법 */}
          <LabelInput
            label="접수방법"
            labelClassName="text-0-75-500 text-gray-1 mt-2 sm:w-12"
            containerClassName="flex gap-2 sm:gap-8"
            className="border-b-[0.1rem] border-b-gray-2  w-full md:w-[25.6875rem] resize-none text-0-875-500 placeholder:text-center"
            maxLength={80}
            placeholder="입력해주세요"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
          {/* 계좌번호 */}
          <LabelInput
            label="계좌번호"
            labelClassName="text-0-75-500 text-gray-1 mt-2 sm:w-12"
            containerClassName="flex gap-2 sm:gap-8"
            className="border-b-[0.1rem] border-b-gray-2 w-full md:w-[25.6875rem] resize-none text-0-875-500 placeholder:text-center"
            maxLength={80}
            placeholder="입력해주세요"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </div>
        {/* 변경하기 버튼 */}
        <Button size="M" className="text-0-75-500" onClick={handleChange}>
          변경하기
        </Button>
      </div>
      {/* 미리보기 표 */}
      <div className="w-full mt-4 md:mt-6 ">
        <div className="border-[0.1rem] rounded-[0.25rem] overflow-hidden">
          <div className="grid grid-cols-3 bg-[#3F3F3F] text-white text-0-75-700 md:text-0-875-700 text-center ">
            <div className="py-2 px-2 md:px-3">접수기간</div>
            <div className="py-2 px-2 md:px-3">접수방법</div>
            <div className="py-2 px-2 md:px-3">계좌번호</div>
          </div>
          <div className="grid grid-cols-3 text-0-75-500 md:text-0-875-500">
            <div className="py-2 px-2 md:px-3 whitespace-pre-line flex flex-col items-center justify-center">
              {preview.period === '' && (
                <div className="flex flex-col items-center justify-center">
                  <div>
                    관내외업체 상반기 1일/16일
                    <br />
                    9:00부터 선착순 접수
                  </div>
                  <span className="block text-red-500">
                    * 토,일,공휴일 접수가능
                  </span>
                </div>
              )}
            </div>
            <div className="flex py-2 px-2 md:px-3 whitespace-pre-line  justify-center items-center">
              {preview.method === '' && (
                <span className="block text-0-75-700 md:text-0-875-700 text-gray-400 text-center">
                  인터넷접수
                  <br />
                  (전화접수불가)
                </span>
              )}
            </div>
            <div className="py-2 px-2 md:px-3 whitespace-pre-line text-center">
              {preview.account === '' && (
                <span className="block text-0-75-700 md:text-0-875-700 text-gray-400">
                  우리은행
                  <br />
                  1005-303-618971
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
