// pages/manage-homepage.tsx
'use client';

import AddItem from '@/components/layout/addItem';
import Header from '@/components/layout/header';
import HomepageContent from '@/components/layout/homepageContent';
import PopupEdit from '@/components/layout/popupEdit';
import { useState } from 'react';
import Image from 'next/image';

// 모달 폼 컴포넌트
interface RegionGuData {
  id: number;
  no: string;
  mainTitle: string;
  size: string;
  population: string;
  trend: string;
  url: string;
}

interface HomepageContentData {
  id: number;
  title: string;
  image: string | null;
  logoImage: string | null;
  cardImage: string | null;
  mainTitle: string;
  subTitle1: string;
  subTitle2: string;
  description: string;
  description1: string;
}

const RegionGuForm = ({ data = null }: { data?: RegionGuData | null }) => {
  const [formData, setFormData] = useState({
    mainTitle: data?.mainTitle || '',
    size: data?.size || '',
    population: data?.population || '',
    trend: data?.trend || '',
    url: data?.url || '',
  });
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [cardImage, setCardImage] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCardImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCardImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4">
        {/* 로고 이미지 등록 */}
        <div className="flex items-center gap-4">
          <label className="w-20 text-0-875-500 text-gray-1">로고</label>
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoImageChange}
              className="w-full border border-gray-2 rounded px-3 py-2 text-0-875-500"
            />
            {logoImage && (
              <div className="mt-2 w-32 h-16 relative">
                <Image
                  src={logoImage}
                  alt="로고 미리보기"
                  fill
                  className="object-contain rounded"
                />
              </div>
            )}
          </div>
        </div>

        {/* 구별 카드 이미지 등록 */}
        <div className="flex items-center gap-4">
          <label className="w-20 text-0-875-500 text-gray-1">구별카드</label>
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleCardImageChange}
              className="w-full border border-gray-2 rounded px-3 py-2 text-0-875-500"
            />
            {cardImage && (
              <div className="mt-2 relative w-full h-[12rem]">
                <Image
                  src={cardImage}
                  alt="구별 카드 미리보기"
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-20 text-0-875-500 text-gray-1">메인타이틀</label>
          <input
            type="text"
            value={formData.mainTitle}
            onChange={(e) => handleInputChange('mainTitle', e.target.value)}
            placeholder="메인타이틀을 입력하세요"
            className="flex-1 border border-gray-2 rounded px-3 py-2 text-0-875-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-20 text-0-875-500 text-gray-1">송출사이즈</label>
          <input
            type="text"
            value={formData.size}
            onChange={(e) => handleInputChange('size', e.target.value)}
            placeholder="송출사이즈를 입력하세요"
            className="flex-1 border border-gray-2 rounded px-3 py-2 text-0-875-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-20 text-0-875-500 text-gray-1">유동인구</label>
          <input
            type="text"
            value={formData.population}
            onChange={(e) => handleInputChange('population', e.target.value)}
            placeholder="유동인구를 입력하세요"
            className="flex-1 border border-gray-2 rounded px-3 py-2 text-0-875-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-20 text-0-875-500 text-gray-1">
            소비자트렌드
          </label>
          <input
            type="text"
            value={formData.trend}
            onChange={(e) => handleInputChange('trend', e.target.value)}
            placeholder="소비자트렌드를 입력하세요"
            className="flex-1 border border-gray-2 rounded px-3 py-2 text-0-875-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-20 text-0-875-500 text-gray-1">URL</label>
          <input
            type="text"
            value={formData.url}
            onChange={(e) => handleInputChange('url', e.target.value)}
            placeholder="URL을 입력하세요"
            className="flex-1 border border-gray-2 rounded px-3 py-2 text-0-875-500"
          />
        </div>
      </div>
    </div>
  );
};

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
  const [homepageContents, setHomepageContents] = useState<
    HomepageContentData[]
  >([]);

  const onAddItem = () => {
    const newId = homepageContents.length + 1;
    const newContent: HomepageContentData = {
      id: newId,
      title: `Part ${newId}`,
      image: null,
      logoImage: null,
      cardImage: null,
      mainTitle: '',
      subTitle1: '',
      subTitle2: '',
      description: '',
      description1: '',
    };
    setHomepageContents((prev) => [...prev, newContent]);
  };

  const handleSave = (data: RegionGuData) => {
    console.log('저장할 데이터:', data);
    // 여기에 실제 저장 로직을 추가할 수 있습니다
  };

  const handleHomepageContentSave = (data: {
    title: string;
    image: string | null;
    logoImage: string | null;
    cardImage: string | null;
    mainTitle: string;
    subTitle1: string;
    subTitle2: string;
    description: string;
    description1: string;
  }) => {
    console.log('HomepageContent 저장:', data);
    // 여기에 실제 저장 로직을 추가할 수 있습니다
  };

  const handleHomepageContentDelete = (id: number) => {
    setHomepageContents((prev) => prev.filter((item) => item.id !== id));
  };

  // 상단에 표시될 HomepageContent들 (최대 3개)
  const topContents = homepageContents.slice(0, 3);
  // 하단에 표시될 HomepageContent들 (최대 2개)
  const bottomContents = homepageContents.slice(3, 5);

  return (
    <div className="pt-16 px-8">
      <Header />
      <div className="mt-8 text-gray-1 ml-14">
        {/* 상단 영역 - 최대 3개 + 추가버튼 */}
        <div className="overflow-x-auto">
          <div className="grid grid-cols-4 gap-8 min-w-max">
            {/* 상단 HomepageContent들 */}
            {topContents.map((content) => (
              <div key={content.id} className="w-[37rem]">
                <HomepageContent
                  id={content.id}
                  title={content.title}
                  onSave={handleHomepageContentSave}
                  onDelete={handleHomepageContentDelete}
                />
              </div>
            ))}

            {/* 추가 버튼 - 총 5개 미만일 때만 표시 */}
            {homepageContents.length < 5 && (
              <div
                className="w-[33rem] h-[40rem] cursor-pointer hover:bg-gray-50 rounded-lg transition-colors overflow-hidden"
                onClick={onAddItem}
              >
                <AddItem
                  className="h-full w-full pb-7"
                  containerclassName="h-full w-full"
                />
              </div>
            )}

            {/* 빈 자리들 */}
            {Array.from({
              length:
                4 - topContents.length - (homepageContents.length < 5 ? 1 : 0),
            }).map((_, index) => (
              <div
                key={`empty-top-${index}`}
                className="w-[37rem] min-h-[400px]"
              />
            ))}
          </div>
        </div>

        <div className="border-b-[0.1rem] border-gray-2 w-[95%] mx-auto py-4"></div>

        {/* 하단 영역 - 최대 2개 + 표 */}
        <div className="grid grid-cols-3 gap-[10rem] pb-16">
          {/* 하단 HomepageContent들 */}
          {bottomContents.map((content) => (
            <div key={content.id} className="w-[33rem] ">
              <HomepageContent
                id={content.id}
                title={content.title}
                onSave={handleHomepageContentSave}
                onDelete={handleHomepageContentDelete}
              />
            </div>
          ))}

          {/* 빈 자리들 */}
          {Array.from({ length: 2 - bottomContents.length }).map((_, index) => (
            <div
              key={`empty-bottom-${index}`}
              className="w-[33rem] min-h-[400px]"
            />
          ))}

          {/* 고정 표 위치 */}
          <div className="col-span-1 pl-[4rem]">
            <PopupEdit
              columns={regionGuColumns}
              data={regionGuData}
              showModals={true}
              addModalContent={<RegionGuForm />}
              editModalContent={<RegionGuForm />}
              onSave={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
