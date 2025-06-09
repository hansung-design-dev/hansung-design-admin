import { useState } from 'react';
import ApplicationDate from './applicationDate';
import Checkbox from '@/components/ui/checkbox';
import Button from '@/components/ui/button';

const days = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);
const lastDayOptions = ['말일'];

export default function ApplicationDateEdit({
  location = '',
}: {
  location?: string;
}) {
  // 날짜 인풋 상태
  const [firstHalfStart, setFirstHalfStart] = useState('1일');
  const [firstHalfEnd, setFirstHalfEnd] = useState('15일');
  const [secondHalfStart, setSecondHalfStart] = useState('16일');
  const [secondHalfEnd, setSecondHalfEnd] = useState('말일');
  const [applyThisMonth, setApplyThisMonth] = useState(true);

  // 표의 날짜 상태 (이번달)
  const [firstHalfClosed, setFirstHalfClosed] = useState(false);
  const [secondHalfClosed, setSecondHalfClosed] = useState(false);
  const [tableFirstHalf, setTableFirstHalf] = useState('25/05/01 ~ 25/05/15');
  const [tableSecondHalf, setTableSecondHalf] = useState('25/05/16 ~ 25/05/30');

  // 다음달 표 데이터 (예시)
  const nextFirstHalf = '25/06/01 ~ 25/06/16';
  const nextSecondHalf = '25/06/17 ~ 25/06/30';

  // 변경하기 버튼 클릭 시 표의 날짜 변경
  const handleChange = () => {
    setTableFirstHalf(
      `25/05/${firstHalfStart
        .replace('일', '')
        .padStart(2, '0')} ~ 25/05/${firstHalfEnd
        .replace('일', '')
        .padStart(2, '0')}`
    );
    setTableSecondHalf(
      `25/05/${secondHalfStart.replace('일', '').padStart(2, '0')} ~ 25/05/${
        secondHalfEnd === '말일'
          ? '30'
          : secondHalfEnd.replace('일', '').padStart(2, '0')
      }`
    );
  };

  return (
    <div className="flex flex-col gap-4 items-start w-full pl-[8rem]">
      {/* 제목 */}
      <div className="mb-8 w-full">
        <span className="text-xl font-semibold">{location} 신청일 수정</span>
      </div>
      {/* 인풋/체크박스/버튼 */}
      <div className="flex flex-col gap-4 mb-12 w-full items-start">
        {/* 전반기 */}
        <div className="flex items-center w-full gap-4">
          <span className="mb-1 text-sm">전반기</span>
          <div className="flex items-center gap-2">
            <select
              value={firstHalfStart}
              onChange={(e) => setFirstHalfStart(e.target.value)}
              className="border rounded-[0.375rem] w-[10rem] py-2 text-center"
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <span>~</span>
            <select
              value={firstHalfEnd}
              onChange={(e) => setFirstHalfEnd(e.target.value)}
              className="border rounded-[0.375rem] w-[10rem] py-2 text-center "
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* 하반기 */}
        <div className="flex  items-center w-full gap-4">
          <span className="mb-1 text-sm">하반기</span>
          <div className="flex items-center gap-2">
            <select
              value={secondHalfStart}
              onChange={(e) => setSecondHalfStart(e.target.value)}
              className="border rounded-[0.375rem] w-[10rem] py-2 text-center "
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <span>~</span>
            <select
              value={secondHalfEnd}
              onChange={(e) => setSecondHalfEnd(e.target.value)}
              className="border rounded-[0.375rem] w-[10rem] py-2 text-center "
            >
              {[...days, ...lastDayOptions].map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* 체크박스+버튼 */}
        <div className="flex items-center justify-between gap-4 mt-2 w-[25rem]">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={applyThisMonth}
              onChange={(e) => setApplyThisMonth(e.target.checked)}
              id="applyThisMonth"
              className="w-5 h-5 accent-black border-gray-400 "
            />
            <label htmlFor="applyThisMonth" className="text-base">
              이번달부터
            </label>
          </div>
          <Button size="M" onClick={handleChange}>
            변경하기
          </Button>
        </div>
      </div>
      {/* 표: 이번달, 다음달 */}
      <div className="flex gap-8">
        <ApplicationDate
          location={location}
          month="5월"
          firstHalf={tableFirstHalf}
          secondHalf={tableSecondHalf}
          isThisMonth={true}
          firstHalfClosed={firstHalfClosed}
          secondHalfClosed={secondHalfClosed}
          onToggleFirstHalf={(e) => setFirstHalfClosed(e.target.checked)}
          onToggleSecondHalf={(e) => setSecondHalfClosed(e.target.checked)}
        />
        <ApplicationDate
          location={location}
          month="6월"
          firstHalf={nextFirstHalf}
          secondHalf={nextSecondHalf}
          showFirstHalfCheckbox={false}
          showSecondHalfCheckbox={false}
          isThisMonth={false}
        />
      </div>
    </div>
  );
}
