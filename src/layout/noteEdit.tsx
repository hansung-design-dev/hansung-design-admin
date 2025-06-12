import { useState } from 'react';
import Button from '@/components/ui/button';

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
          <div className="flex gap-2">
            <label className="text-0-75-500 text-gray-1">접수기간</label>
            <textarea
              className="border-b-[0.1rem] border-b-gray-2 rounded w-full md:w-[25.6875rem] resize-none text-0-875-500 placeholder:text-center"
              rows={3}
              maxLength={120}
              placeholder="입력해주세요"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            />
          </div>
          {/* 접수방법 */}
          <div className="flex gap-2">
            <label className="text-0-75-500 text-gray-1 mt-2">접수방법</label>
            <textarea
              className="border-b-[0.1rem] border-b-gray-2 rounded w-full md:w-[25.6875rem] resize-none text-0-875-500 placeholder:text-center"
              rows={2}
              maxLength={80}
              placeholder="입력해주세요"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            />
          </div>
          {/* 계좌번호 */}
          <div className="flex gap-2">
            <label className="text-0-75-500 text-gray-1 mt-2">계좌번호</label>
            <textarea
              className="border-b-[0.1rem] border-b-gray-2 rounded w-full md:w-[25.6875rem] resize-none text-0-875-500 placeholder:text-center"
              rows={2}
              maxLength={80}
              placeholder="입력해주세요"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            />
          </div>
        </div>
        {/* 변경하기 버튼 */}
        <Button
          size="M"
          className="p-2 w-full md:w-auto"
          onClick={handleChange}
        >
          변경하기
        </Button>
      </div>
      {/* 미리보기 표 */}
      <div className="w-full md:w-[35rem] mt-4 md:mt-6">
        <div className="border-[0.1rem] rounded-[0.25rem] overflow-hidden">
          <div className="grid grid-cols-3 bg-[#3F3F3F] text-white text-0-75-700 md:text-0-875-700 text-center">
            <div className="py-2 px-2 md:px-3">접수기간</div>
            <div className="py-2 px-2 md:px-3">접수방법</div>
            <div className="py-2 px-2 md:px-3">계좌번호</div>
          </div>
          <div className="grid grid-cols-3 text-0-75-500 md:text-0-875-500">
            <div className="py-2 px-2 md:px-3 whitespace-pre-line text-center">
              {preview.period ||
                '관내외업체 상반기 1일/16일\n9:00부터 선착순 접수\n* 토,일,공휴일 접수가능'}
              {preview.period === '' && (
                <span className="block text-red-500">
                  * 토,일,공휴일 접수가능
                </span>
              )}
            </div>
            <div className="py-2 px-2 md:px-3 whitespace-pre-line text-center">
              {preview.method || '인터넷접수\n(전화접수불가)'}
              {preview.method === '' && (
                <span className="block text-0-75-700 md:text-0-875-700 text-gray-400">
                  (전화접수불가)
                </span>
              )}
            </div>
            <div className="py-2 px-2 md:px-3 whitespace-pre-line text-center">
              {preview.account || '우리은행\n1005-303-618971'}
              {preview.account === '' && (
                <span className="block text-0-75-700 md:text-0-875-700 text-gray-400">
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
