import Checkbox from '@/components/ui/checkbox';

export default function ApplicationDate({
  className = '',
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
  ...props
}: {
  className?: string;
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
    <div className={className}>
      <div
        className={`grid grid-cols-[4rem_1fr]  gap-0 bg-gray-3 text-center rounded-md w-full h-[6.25rem]`}
      >
        {/* 왼쪽: 이번달(5월) 세로 병합 */}
        <div className="row-span-2 flex flex-col justify-center items-center text-0-75-500 md:text-0-875-500 bg-gray-50 border-r-[0.1rem] border-gray-2 w-[4rem] ">
          {isThisMonth ? '이번달' : '다음달'}
          <br />({month})
        </div>
        {/* 오른쪽: 전반기 */}
        <div
          className={`grid border-b-[0.1rem] border-gray-2 p-0.5 md:p-1 ${
            showFirstHalfCheckbox && showSecondHalfCheckbox
              ? 'grid-cols-6'
              : 'grid-cols-3'
          }`}
        >
          <div className="flex items-center justify-center p-0.5 md:p-0  text-0-75-500 text-gray-1 text-xs md:text-sm">
            전반기
          </div>
          <div
            className={`flex items-center justify-center text-0-75-500 md:text-0-875-500 text-xs md:text-sm ${
              showFirstHalfCheckbox && showSecondHalfCheckbox
                ? 'col-span-3'
                : 'col-span-2'
            }`}
          >
            {firstHalf}
          </div>
          {showFirstHalfCheckbox && (
            <div className="col-span-2 flex items-center justify-center p-0.5 md:p-1">
              <Checkbox
                checked={firstHalfClosed}
                onChange={onToggleFirstHalf}
                className="w-3 h-3 md:w-4 md:h-4 accent-black border-gray-400"
              />
              <span className="ml-1 md:ml-2 text-0-75-500 text-gray-1 text-xs ">
                일괄마감
              </span>
            </div>
          )}
        </div>
        {/* 하반기 */}
        <div
          className={`grid p-0.5 md:p-1  ${
            showFirstHalfCheckbox && showSecondHalfCheckbox
              ? 'grid-cols-6'
              : 'grid-cols-3'
          }`}
        >
          <div className="flex items-center justify-center p-0.5 md:p-1 text-0-75-500 text-gray-1 text-xs ">
            하반기
          </div>
          <div
            className={`flex items-center justify-center p-0.5 text-0-75-500 md:text-0-875-500 text-xs md:text-sm ${
              showFirstHalfCheckbox && showSecondHalfCheckbox
                ? 'col-span-3'
                : 'col-span-2'
            }`}
          >
            {secondHalf}
          </div>
          {showSecondHalfCheckbox && (
            <div className="col-span-2 flex items-center justify-center p-0.5 md:p-1">
              <Checkbox
                checked={secondHalfClosed}
                onChange={onToggleSecondHalf}
                className="w-3 h-3 md:w-4 md:h-4 accent-black border-gray-3"
              />
              <span className="ml-1 md:ml-2 text-0-75-500 text-gray-1 text-xs md:text-sm">
                일괄마감
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
