'use client';
import { useState } from 'react';
import OrderDate from './orderDate';
import Checkbox from '@/components/ui/checkbox';
import Button from '@/components/ui/button';
import Dropdown from '@/components/ui/dropdown';

// 오늘 날짜 기준으로 현재 월과 연도 가져오기
const today = new Date();
const currentMonth = today.getMonth() + 1; // 0부터 시작하므로 +1

// 2025년부터 각 월의 말일 계산
const getLastDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

// 2025년부터 2030년까지 각 월의 말일 생성
const generateLastDayOptions = () => {
  const options = [];
  for (let year = 2025; year <= 2030; year++) {
    for (let month = 1; month <= 12; month++) {
      const lastDay = getLastDayOfMonth(year, month);
      const yearStr = year.toString().slice(-2); // 25, 26, 27...
      const monthStr = month.toString().padStart(2, '0'); // 01, 02, 03...
      options.push({
        value: `${yearStr}/${monthStr}/말일`,
        label: `말일(${lastDay}일)`,
      });
    }
  }
  return options;
};

// 년/월 옵션 생성
const generateYearMonthOptions = () => {
  const options = [];
  for (let year = 2025; year <= 2030; year++) {
    for (let month = 1; month <= 12; month++) {
      const yearStr = year.toString().slice(-2); // 25, 26, 27...
      const monthStr = month.toString().padStart(2, '0'); // 01, 02, 03...
      options.push({
        value: `${yearStr}/${monthStr}`,
        label: `${year}년 ${month}월`,
      });
    }
  }
  return options;
};

const days = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);

// 드롭다운 옵션 생성
const dayOptions = days.map((day) => ({ value: day, label: day }));
const lastDayOptions = generateLastDayOptions();
const yearMonthOptions = generateYearMonthOptions();

export default function OrderDateEdit({
  location = '',
}: {
  location?: string;
}) {
  // 선택된 년/월 상태
  const [selectedYearMonth, setSelectedYearMonth] = useState(
    `25/${currentMonth.toString().padStart(2, '0')}`
  );
  const [applyThisMonth, setApplyThisMonth] = useState(true);

  // 오늘 기준으로 6월 전하반기 설정
  const [firstHalfStart, setFirstHalfStart] = useState('1일');
  const [firstHalfEnd, setFirstHalfEnd] = useState('15일');
  const [secondHalfStart, setSecondHalfStart] = useState('16일');
  const [secondHalfEnd, setSecondHalfEnd] = useState(
    `25/${currentMonth.toString().padStart(2, '0')}/말일`
  );

  // 표의 날짜 상태 (이번달)
  const [firstHalfClosed, setFirstHalfClosed] = useState(false);
  const [secondHalfClosed, setSecondHalfClosed] = useState(false);
  const [tableFirstHalf, setTableFirstHalf] = useState(
    `25/${currentMonth.toString().padStart(2, '0')}/01 ~ 25/${currentMonth
      .toString()
      .padStart(2, '0')}/15`
  );
  const [tableSecondHalf, setTableSecondHalf] = useState(
    `25/${currentMonth.toString().padStart(2, '0')}/16 ~ 25/${currentMonth
      .toString()
      .padStart(2, '0')}/30`
  );

  // 선택된 년/월에서 월 추출
  const selectedMonth = parseInt(selectedYearMonth.split('/')[1]);
  const selectedYear = parseInt(selectedYearMonth.split('/')[0]) + 2000;

  // 다음달 표 데이터 (예시)
  const nextMonth = selectedMonth === 12 ? 1 : selectedMonth + 1;
  const nextYear = selectedMonth === 12 ? selectedYear + 1 : selectedYear;
  const nextYearStr = (nextYear - 2000).toString().padStart(2, '0');
  const nextFirstHalf = `${nextYearStr}/${nextMonth
    .toString()
    .padStart(2, '0')}/01 ~ ${nextYearStr}/${nextMonth
    .toString()
    .padStart(2, '0')}/15`;
  const nextSecondHalf = `${nextYearStr}/${nextMonth
    .toString()
    .padStart(2, '0')}/16 ~ ${nextYearStr}/${nextMonth
    .toString()
    .padStart(2, '0')}/${getLastDayOfMonth(nextYear, nextMonth)}`;

  // 이번달부터 체크박스 변경 시
  const handleApplyThisMonthChange = (checked: boolean) => {
    setApplyThisMonth(checked);
    if (checked) {
      // 오늘 기준으로 설정
      setSelectedYearMonth(`25/${currentMonth.toString().padStart(2, '0')}`);
    }
  };

  // 변경하기 버튼 클릭 시 표의 날짜 변경
  const handleChange = () => {
    const startDay = firstHalfStart.replace('일', '').padStart(2, '0');
    const endDay = firstHalfEnd.replace('일', '').padStart(2, '0');

    setTableFirstHalf(
      `${selectedYearMonth}/${startDay} ~ ${selectedYearMonth}/${endDay}`
    );

    const secondStartDay = secondHalfStart.replace('일', '').padStart(2, '0');
    let secondEndDay;

    if (secondHalfEnd.includes('말일')) {
      const lastDay = getLastDayOfMonth(selectedYear, selectedMonth);
      secondEndDay = lastDay.toString().padStart(2, '0');
    } else {
      secondEndDay = secondHalfEnd.replace('일', '').padStart(2, '0');
    }

    setTableSecondHalf(
      `${selectedYearMonth}/${secondStartDay} ~ ${selectedYearMonth}/${secondEndDay}`
    );
  };

  return (
    <div className="flex flex-col gap-4 items-start w-full px-4 md:px-8">
      {/* 제목 */}
      <div className="mb-4 md:mb-8 w-full">
        <span className="text-lg md:text-xl font-semibold">
          {location} 신청일 수정
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <Checkbox checked={true} onChange={() => {}} />
        <span className="text-0-75-500 text-gray-1">상시접수</span>
      </div>
      {/* 인풋/체크박스/버튼 */}
      <div className="flex flex-col gap-4 mb-6 md:mb-12 w-[21rem] items-start">
        {/* 년/월 선택 및 이번달부터 체크박스 */}
        <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2 md:gap-4">
          <span className="mb-1 text-sm">적용월</span>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Dropdown
              options={yearMonthOptions}
              value={selectedYearMonth}
              onChange={setSelectedYearMonth}
              className="w-[12rem]"
            />
            <div className="flex items-center gap-2">
              <Checkbox
                checked={applyThisMonth}
                onChange={(e) => handleApplyThisMonthChange(e.target.checked)}
                id="applyThisMonth"
                className="w-4 h-4 accent-black border-gray-400"
              />
              <label
                htmlFor="applyThisMonth"
                className="text-0-75-500 text-gray-1 text-sm"
              >
                이번달부터
              </label>
            </div>
          </div>
        </div>
        {/* 전반기 */}
        <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2 md:gap-4">
          <span className="mb-1 text-sm">전반기</span>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Dropdown
              options={dayOptions}
              value={firstHalfStart}
              onChange={setFirstHalfStart}
              className="w-[8rem]"
            />
            <span>~</span>
            <Dropdown
              options={dayOptions}
              value={firstHalfEnd}
              onChange={setFirstHalfEnd}
              className="w-[8rem]"
            />
          </div>
        </div>
        {/* 하반기 */}
        <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-2 md:gap-4">
          <span className="mb-1 text-sm">하반기</span>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Dropdown
              options={dayOptions}
              value={secondHalfStart}
              onChange={setSecondHalfStart}
              className="w-[8rem]"
            />
            <span>~</span>
            <Dropdown
              options={lastDayOptions}
              value={secondHalfEnd}
              onChange={setSecondHalfEnd}
              className="w-[8rem]"
            />
          </div>
        </div>
        {/* 변경하기 버튼 */}
        <div className="flex justify-end w-full">
          <Button size="S" onClick={handleChange} className="text-0-75-500">
            변경하기
          </Button>
        </div>
      </div>
      {/* 표: 이번달, 다음달 */}
      <div className="flex flex-col lg:flex-row gap-2 md:gap-4 w-full">
        <OrderDate
          location={location}
          month={`${selectedMonth}월`}
          firstHalf={tableFirstHalf}
          secondHalf={tableSecondHalf}
          isThisMonth={true}
          firstHalfClosed={firstHalfClosed}
          secondHalfClosed={secondHalfClosed}
          onToggleFirstHalf={(e) => setFirstHalfClosed(e.target.checked)}
          onToggleSecondHalf={(e) => setSecondHalfClosed(e.target.checked)}
          className="w-full lg:w-1/2"
        />
        <OrderDate
          location={location}
          month={`${nextMonth}월`}
          firstHalf={nextFirstHalf}
          secondHalf={nextSecondHalf}
          showFirstHalfCheckbox={false}
          showSecondHalfCheckbox={false}
          isThisMonth={false}
          className="w-full lg:w-1/2"
        />
      </div>
    </div>
  );
}
