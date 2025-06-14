'use client';
import Header from '@/components/layout/header';
import { CommonTable } from '@/components/layout/commonTable';
import { useParams } from 'next/navigation';
import { useMemo, useState, useRef } from 'react';
import { mockData, columns } from '@/mockdata/banner-display';
import Image from 'next/image';
import Title from '@/components/layout/title';
import OrderDateEdit from '@/components/layout/orderDateEdit';
import PopupEdit from '@/components/layout/popupEdit';
import NoteEdit from '@/components/layout/noteEdit';
import AddItem from '@/components/layout/addItem';
import TextUpdate from '@/components/layout/textUpdate';
import Modal from '@/components/layout/modal';
import PopupAddForm from '@/components/modal-contents/popupAddForm';
import OrderEditForm from '@/components/modal-contents/orderEditForm';
import CodeEditForm from '@/components/modal-contents/codeEditForm';
import Button from '@/components/ui/button';

interface DistrictRow {
  isUsing: string;
  title: string;
  period: string;
}

const districtColumns = [
  {
    key: 'isUsing',
    header: '사용여부',
  },
  {
    key: 'title',
    header: '타이틀',
  },
  {
    key: 'period',
    header: '팝업기간',
  },
];
const Y = '업로드 됨';
const N = '-';

interface DistrictRow {
  isUsing: string;
  title: string;
  period: string;
}

const districtData: DistrictRow[] = [
  {
    isUsing: Y,
    title: '이전안내',
    period: '2025/01/01 ~ 2025/01/01',
  },
  {
    isUsing: N,
    title: '공지사항 안내',
    period: '2025/01/01 ~ 2025/01/01',
  },
  {
    isUsing: N,
    title: '내용이 길어질 경우 최대 두 줄까지 가능합니다.',
    period: '2025/01/01 ~ 2025/01/01',
  },
  {
    isUsing: N,
    title: '공지사항 안내',
    period: '2025/01/01 ~ 2025/01/01',
  },
];

export default function BannerDisplayDetail() {
  const params = useParams();
  const id = params.id as string;
  const rowData = useMemo(() => mockData.filter((row) => row.id === id), [id]);
  const location = rowData[0]?.district_name || '';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'popup' | 'order' | 'code'>(
    'popup'
  );
  const [selectedRow, setSelectedRow] = useState<DistrictRow | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => setIsModalOpen(false);

  const handleModal = () => {
    setModalType('code');
    setIsModalOpen(true);
    //console.log('modalType', modalType);
  };

  const handleListRowClick = (row: DistrictRow) => {
    setSelectedRow(row);
    setModalType('popup');
    setIsModalOpen(true);
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // console.log(rowData[0]);

  return (
    <div className="pt-8 md:pt-16">
      <Header breadcrumbs={['현수막게시대', location]} />
      <div>
        <Title title={location} />
      </div>
      <div className="sm:ml-[7rem] lg:ml-[2rem]">
        <div className="pt-8 md:pt-16 px-4 md:px-8 ml-8">
          {/* Horizontal Divider */}
          <div className="w-full flex justify-center mb-4 bg-gray-3">
            <CommonTable columns={columns} data={rowData} />
          </div>
        </div>
        <div className="py-[3rem] md:py-[5rem] flex flex-col md:flex-row gap-4 md:gap-8  md:ml-[5rem]">
          <OrderDateEdit location={location} />
          {/* Vertical Divider */}
          <div className="hidden md:flex items-stretch justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2"
              height="473"
              viewBox="0 0 2 473"
              fill="none"
            >
              <path d="M1 0L0.999979 473" stroke="#D9D9D9" />
            </svg>
          </div>
          <PopupEdit
            handleListRowClick={handleListRowClick}
            columns={districtColumns}
            data={districtData}
            title="안내팝업"
          />
        </div>
        <div className="px-4 md:px-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="2"
            viewBox="0 0 1688 2"
            fill="none"
          >
            <path d="M0 1L1688 1" stroke="#D9D9D9" />
          </svg>
          <div className="ml-[5rem] pt-8 relative">
            <CommonTable
              columns={districtColumns}
              onAddItem={handleModal}
              searchInput
              searchTitle="팝업조회"
              data={districtData}
              tableRowClick={handleListRowClick}
            />
          </div>
        </div>
        <div className="pt-8 md:pt-16 px-4 md:px-8 ml-0 md:ml-[5rem] lg:w-[50%] sm:w-full">
          <NoteEdit />
        </div>
        <div className="px-4 md:px-8 ml-0 md:ml-[5rem] lg:w-[50%] sm:w-full">
          {imageUrl ? (
            <div className="mt-4 flex flex-col items-center">
              <Image
                src={imageUrl}
                alt="미리보기"
                className="h-24 rounded"
                width={1000}
                height={30}
              />
              <Button
                size="M"
                className="mt-2 text-0-75-500"
                onClick={handleImageUploadClick}
              >
                이미지 변경
              </Button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </div>
          ) : (
            <>
              <AddItem
                title="현수막 이미지"
                className="mt-4"
                onUpload={handleImageUploadClick}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </>
          )}
        </div>

        <div className="px-4 md:px-8 ml-0 md:ml-[5rem] w-[50%] mt-4 flex flex-col gap-4">
          <TextUpdate
            title="안내사항"
            subTitle="기본안내"
            buttonName="변경하기"
          />
          <TextUpdate subTitle="추가안내" buttonName="변경하기" />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title={
            modalType === 'popup'
              ? '팝업 추가하기'
              : modalType === 'order'
              ? '(행정용) 대림아파트... 수정화면'
              : '게시대코드등록 및 수정화면'
          }
          onClose={handleClose}
          footer={
            <Button size="L" colorStyles="black" className="w-[20rem]">
              저장
            </Button>
          }
        >
          {modalType === 'popup' && <PopupAddForm />}
          {modalType === 'order' && selectedRow && (
            <OrderEditForm
              fields={[
                { key: 'id', label: 'NO' },
                { key: 'location', label: '위치' },
                { key: 'isPhoto', label: '사진' },
                { key: 'isLocation', label: '위치' },
                { key: 'isMap', label: '지도' },
                { key: 'disrtict_name', label: '행정동' },
                { key: 'display', label: '게시' },
                { key: 'amount', label: '금액' },
                { key: 'size', label: '크기' },
                { key: 'announcement', label: '안내사항' },
                { key: 'CountArea', label: '면수' },
                { key: 'done', label: '마감' },
                { key: 'isForAdmin', label: '행정용' },
                { key: 'note', label: '비고' },
              ]}
            />
          )}
          {modalType === 'code' && (
            <CodeEditForm columns={districtColumns} data={districtData} />
          )}
        </Modal>
      )}
    </div>
  );
}
