import Checkbox from '@/components/ui/checkbox';

export default function ApplicationDate({
  month = '5월',
  firstHalf = '25/06/01 ~ 25/06/15',
  secondHalf = '25/06/16 ~ 25/06/30',
  firstHalfClosed = false,
  secondHalfClosed = false,
  onToggleFirstHalf = () => {},
  onToggleSecondHalf = () => {},
  showFirstHalfCheckbox = true,
  showSecondHalfCheckbox = true,
  isThisMonth = true,
}: {
  location?: string;
  month?: string;
  firstHalf?: string;
  secondHalf?: string;
  firstHalfClosed?: boolean;
  secondHalfClosed?: boolean;
  onToggleFirstHalf?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleSecondHalf?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showFirstHalfCheckbox?: boolean;
  showSecondHalfCheckbox?: boolean;
  isThisMonth?: boolean;
}) {
  return (
    <div className="">
      <div
        className={`grid grid-cols-[7rem_1fr] gap-0 bg-gray-3 text-center rounded-md  ${
          showFirstHalfCheckbox && showSecondHalfCheckbox
            ? 'w-[32rem]'
            : 'w-[27rem]'
        }`}
      >
        {/* 왼쪽: 이번달(5월) 세로 병합 */}
        <div className="row-span-2 flex flex-col justify-center items-center text-0-875-500 bg-gray-50 border-r-[0.1rem] border-gray-2 w-[6rem]">
          {isThisMonth ? '이번달' : '다음달'}
          <br />({month})
        </div>
        {/* 오른쪽: 전반기 */}
        <div
          className={`grid border-b-[0.1rem] border-gray-2 p-1 ${
            showFirstHalfCheckbox && showSecondHalfCheckbox
              ? 'grid-cols-6'
              : 'grid-cols-3'
          }`}
        >
          <div className="flex items-center justify-center p-1 text-0-75-500 text-gray-1">
            전반기
          </div>
          <div
            className={`flex items-center justify-center p-2 h-[3.1rem] text-0-875-500 ${
              showFirstHalfCheckbox && showSecondHalfCheckbox
                ? 'col-span-3'
                : 'col-span-2'
            }`}
          >
            {firstHalf}
          </div>
          {showFirstHalfCheckbox && (
            <div className="col-span-2 flex items-center justify-center p-2">
              <Checkbox
                checked={firstHalfClosed}
                onChange={onToggleFirstHalf}
                className="w-5 h-5 accent-black border-gray-400 "
              />
              <span className="ml-2 text-0-75-500 text-gray-1">일괄마감</span>
            </div>
          )}
        </div>
        {/* 하반기 */}
        <div
          className={`grid  p-2 ${
            showFirstHalfCheckbox && showSecondHalfCheckbox
              ? 'grid-cols-6'
              : 'grid-cols-3'
          }`}
        >
          <div className="flex items-center justify-center p-2 text-0-75-500 text-gray-1">
            하반기
          </div>
          <div
            className={`flex items-center justify-center p-2 h-[3.1rem] text-0-875-500 ${
              showFirstHalfCheckbox && showSecondHalfCheckbox
                ? 'col-span-3'
                : 'col-span-2'
            }`}
          >
            {secondHalf}
          </div>
          {showSecondHalfCheckbox && (
            <div className="col-span-2 flex items-center justify-center p-2">
              <Checkbox
                checked={secondHalfClosed}
                onChange={onToggleSecondHalf}
                className="w-5 h-5 accent-black border-gray-3 "
              />
              <span className="ml-2 text-0-75-500 text-gray-1">일괄마감</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
