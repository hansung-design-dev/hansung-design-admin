// pages/manage-homepage.tsx
'use client';

import AddItem from '@/components/layout/addItem';
import Header from '@/components/layout/header';
import HomepageContent from '@/components/layout/homepageContent';
import PopupEdit from '@/components/layout/popupEdit';

const regionGuColumns = [
  { key: 'no', header: 'No.', maxWidth: '2rem' },
  { key: 'mainTitle', header: '메인타이틀', maxWidth: '5rem' },
  {
    key: 'subTitle',
    header: '서브타이틀',
    maxWidth: '12rem',
    render: (row: { size: string; population: string; trend: string }) => (
      <div className="whitespace-pre-line break-words line-clamp-3">
        {[row.size, row.population, row.trend].join('\n')}
      </div>
    ),
  },
  { key: 'url', header: 'URL', maxWidth: '5rem' },
];
const regionGuData = [
  {
    id: 1,
    no: '01',
    mainTitle: '강동구',
    size: '송출사이즈 800*416 픽셀',
    population: '유동인구 : -명',
    trend: '소비자트렌드 :',
    url: 'www.com/1213',
  },
  {
    id: 2,
    no: '02',
    mainTitle: '강남구',
    size: '송출사이즈 800*416 픽셀',
    population: '유동인구 : -명',
    trend: '소비자트렌드 :',
    url: 'www.com/1213',
  },
  {
    id: 3,
    no: '03',
    mainTitle: '강서구',
    size: '송출사이즈 800*416 픽셀',
    population: '유동인구 : -명',
    trend: '소비자트렌드 :',
    url: 'www.com/1213',
  },
];

export default function ManageHomepage() {
  const onAddItem = () => {
    console.log('add item');
  };
  return (
    <div className="pt-16 px-8">
      <Header />
      <div className="mt-8 text-gray-1 ml-14">
        <div className="grid grid-cols-3 gap-8">
          <HomepageContent title="메인" />
          <div></div>
          <div className="p-0 w-full h-full">
            <AddItem
              onClick={onAddItem}
              className="h-full w-full"
              containerclassName="h-full w-full"
            />
          </div>
        </div>
        <div className="border-b-[0.1rem] border-gray-2 w-[95%] mx-auto py-4"></div>
        <div className="grid grid-cols-3 gap-8">
          <HomepageContent title="메인" />
          <HomepageContent title="Part 1" />
          <PopupEdit columns={regionGuColumns} data={regionGuData} />
        </div>
      </div>
    </div>
  );
}
