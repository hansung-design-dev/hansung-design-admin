'use client';
import Header from '@/components/layout/header';
import { CommonTable, TableColumn } from '@/components/layout/commonTable';
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
import Modal from '@/components/modal-contents/modal';
import PopupEditForm from '@/components/modal-contents/popupEditForm';
import DeleteConfirmModal from '@/components/modal-contents/deleteConfirmModal';
import BannerEditForm from '@/components/modal-contents/BannerEditForm';
import CodeEditForm from '@/components/modal-contents/codeEditForm';
import Button from '@/components/ui/button';
import { BoxedTableWrapper } from '@/components/table/boxedTableWrapper';
import Checkbox from '@/components/ui/checkbox';

interface BannerPanelRow {
  post_code: string;
  region_gu: string;
  region_dong: string;
  address: string;
  max_banners: number;
  post_height: number;
  post_width: number;
  installation_date: string;
  status: string;
  maintenance_notes?: string;
}

const bannerPanelColumns = [
  { key: 'post_code', header: '게시대코드' },
  { key: 'region_gu', header: '구' },
  { key: 'region_dong', header: '동' },
  { key: 'address', header: '상세주소' },
  { key: 'max_banners', header: '최대수용' },
  { key: 'post_height', header: '높이(m)' },
  { key: 'post_width', header: '너비(m)' },
  { key: 'installation_date', header: '설치일' },
  { key: 'status', header: '상태' },
  { key: 'maintenance_notes', header: '유지보수메모' },
];

const bannerPanelData: BannerPanelRow[] = [
  {
    post_code: 'BP001',
    region_gu: '서대문구',
    region_dong: '연희동',
    address: '서울시 서대문구 연희동 123-45',
    max_banners: 5,
    post_height: 3.5,
    post_width: 2.0,
    installation_date: '2023-01-15',
    status: '사용',
    maintenance_notes: '2024-05-01 점검 완료',
  },
  {
    post_code: 'BP002',
    region_gu: '서대문구',
    region_dong: '홍제동',
    address: '서울시 서대문구 홍제동 67-89',
    max_banners: 4,
    post_height: 3.0,
    post_width: 1.8,
    installation_date: '2022-11-10',
    status: '유지보수',
    maintenance_notes: '2024-04-10 보수 필요',
  },
  {
    post_code: 'BP003',
    region_gu: '마포구',
    region_dong: '합정동',
    address: '서울시 마포구 합정동 12-34',
    max_banners: 6,
    post_height: 4.0,
    post_width: 2.2,
    installation_date: '2021-09-05',
    status: '비활성',
    maintenance_notes: '',
  },
];

const taxColumns = [
  { key: 'row_column_type', header: '행/열구분' },
  { key: 'total_price', header: '총납부액' },
  { key: 'tax_price', header: '허가수수료' },
  { key: 'road_usage_fee', header: '도로사용료' },
  { key: 'advertising_price', header: '광고대행료' },
];

const taxData = [
  {
    row_column_type: '열합치기',
    total_price: 111000,
    tax_price: 1000,
    road_usage_fee: 33000,
    advertising_price: 67000,
  },
  {
    row_column_type: '행합치기',
    total_price: 123000,
    tax_price: 1000,
    road_usage_fee: 22600,
    advertising_price: 90400,
  },
  {
    row_column_type: '행합치기',
    total_price: 123000,
    tax_price: 1000,
    road_usage_fee: 22600,
    advertising_price: 90400,
  },
];

const districtColumns = [
  {
    key: 'isUsing',
    header: '사용여부',
  },
  {
    key: 'title',
    header: '타이틀',

    render: (row: { title: string }) => (
      <div className="text-center align-middle whitespace-pre-line break-words line-clamp-5">
        {row.title}
      </div>
    ),
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
    title:
      '내용이 길어질 경우 최대 두 줄까지 가능합니다.내용이 길어질 경우 최대 두 줄까지 가능합니다.내용이 길어질 경우 최대 두 줄까지 가능합니다.',
    period: '2025/01/01 ~ 2025/01/01',
  },
  {
    isUsing: N,
    title: '공지사항 안내',
    period: '2025/01/01 ~ 2025/01/01',
  },
];

interface PanelFaceUsageRow {
  face_number: number;
  usage_type: string;
  attach_date_from: string;
  unit_price: number;
  tax_price: number;
  is_active: boolean;
  is_closed: boolean;
  company_name: string;
}
// 면수관리 테이블 컬럼 및 목데이터 (panel_face_usage 기준)
const panelFaceUsageColumns: TableColumn<PanelFaceUsageRow>[] = [
  { key: 'face_number', header: '면수' },
  { key: 'usage_type', header: '사용구분' },
  { key: 'attach_date_from', header: '부착일' },
  { key: 'unit_price', header: '부착단가' },
  { key: 'tax_price', header: '수수료' },
  {
    key: 'is_active',
    header: '사용',
    render: (row: PanelFaceUsageRow) => (row.is_active ? '가능' : '불가능'),
  },
  {
    key: 'is_closed',
    header: '마감',
    render: (row: PanelFaceUsageRow) => (row.is_closed ? '마감' : '-'),
  },
  { key: 'company_name', header: '사업자명' },
];

const panelFaceUsageData: PanelFaceUsageRow[] = [
  {
    face_number: 1,
    usage_type: '소형게시대',
    attach_date_from: '2025-06-01',
    unit_price: 10000,
    tax_price: 1000,
    is_active: true,
    is_closed: false,
    company_name: '-',
  },
  {
    face_number: 2,
    usage_type: '대형게시대',
    attach_date_from: '2025-06-01',
    unit_price: 12000,
    tax_price: 1200,
    is_active: true,
    is_closed: true,
    company_name: '회사이름',
  },
  {
    face_number: 3,
    usage_type: '소형게시대',
    attach_date_from: '2025-06-01',
    unit_price: 10000,
    tax_price: 1000,
    is_active: true,
    is_closed: true,
    company_name: '회사이름',
  },
  {
    face_number: 4,
    usage_type: '소형게시대',
    attach_date_from: '2025-06-01',
    unit_price: 10000,
    tax_price: 1000,
    is_active: true,
    is_closed: false,
    company_name: '-',
  },
  {
    face_number: 0,
    usage_type: '소형게시대',
    attach_date_from: '2025-06-01',
    unit_price: 10000,
    tax_price: 1000,
    is_active: false,
    is_closed: false,
    company_name: '홍길동',
  },
];

export default function BannerDisplayDetail() {
  const params = useParams();
  const id = params.id as string;
  const rowData = useMemo(() => mockData.filter((row) => row.id === id), [id]);
  const location = rowData[0]?.district_name || '';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    'popup-add' | 'popup-edit' | 'popup-delete' | 'order' | 'code'
  >('popup-add');
  const [selectedRow, setSelectedRow] = useState<DistrictRow | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPosted, setIsPosted] = useState(false);
  const [additionalContent, setAdditionalContent] = useState(false);

  const handleClose = () => setIsModalOpen(false);

  const handleModal = () => {
    setModalType('code');
    setIsModalOpen(true);
  };

  const handleListRowClick = () => {
    setModalType('code');
    setIsModalOpen(true);
  };

  const handlePopupAdd = () => {
    setSelectedRow(null);
    setModalType('popup-add');
    setIsModalOpen(true);
  };

  const handlePopupEdit = (row: DistrictRow) => {
    setSelectedRow(row);
    setModalType('popup-edit');
    setIsModalOpen(true);
  };

  const handlePopupDelete = (row: DistrictRow) => {
    setSelectedRow(row);
    setModalType('popup-delete');
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log('삭제할 행:', selectedRow);
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
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
    <div className="py-16 md:pt-16">
      <Header breadcrumbs={['현수막게시대', location]} />
      <div>
        <Title title={location} />
      </div>
      <div className="sm:ml-[7rem] lg:ml-[2rem]">
        <div className="pt-8 md:pt-16 px-4 md:px-8 ml-8">
          {/* Horizontal Divider */}
          <div className="w-full flex justify-center mb-4 ">
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
            columns={districtColumns}
            data={districtData}
            title="안내팝업"
            additionalContent
            onAddItem={handlePopupAdd}
            onEditItem={handlePopupEdit}
            onDeleteItem={handlePopupDelete}
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
            <CommonTable<BannerPanelRow>
              columns={bannerPanelColumns}
              data={bannerPanelData}
              onAddItem={handleModal}
              searchInput
              searchTitle="조회"
              tableRowClick={handleListRowClick}
              tableClassName="px-0"
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
            <div className="mt-8">
              <AddItem
                title="가이드 업로드"
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
            </div>
          )}
        </div>

        <div className="px-4 md:px-8 ml-0 md:ml-[5rem] w-[50%] mt-12 flex flex-col gap-4">
          <TextUpdate
            title="안내사항"
            subTitle="기본안내"
            buttonName="변경하기"
            placeholder="문의처 : 송파구 게시대 담당자 02-719-0093 / (주)한성디자인 02-3272-1452
게첨방법 : (주)한성디자인 기획에서 탈부착 (게시대는 맨위쪽 1면, 아래로 내려오면서 2,3,4입니다.)"
          />

          <TextUpdate
            subTitle="추가안내"
            buttonName="변경하기"
            placeholder="게첨사진은 웹하드에서 확인하실 수 있습니다."
          />

          <div className="min-w-[40rem] ">
            {/* 제목 */}
            <div className="text-1-700 mb-4">세부안내</div>
            <div className="w-full justify-start items-center flex gap-4 py-7 text-0-75-500 text-gray-1">
              <label htmlFor="additionalContent">기타안내</label>
              <input
                type="text"
                id="additionalContent"
                checked={additionalContent}
                onChange={(e) => {
                  setAdditionalContent(e.target.checked);
                }}
                placeholder="내용을 입력하세요"
                className=" border-gray-2 border-b-[0.1rem] w-[50%]"
              />
            </div>
            <div className="flex flex-col md:flex-row  items-start md:items-center mb-4 text-0-75-500 text-gray-1 lg:gap-6 md:gap-0">
              {/* 상단 버튼 영역 dufcnrk */}
              <div className="flex gap-1">
                <Button
                  size="SM"
                  className="flex gap-2 text-0-75-500"
                  colorStyles="gray"
                >
                  <Image
                    src="/svg/plus.svg"
                    alt="추가"
                    width={12}
                    height={12}
                  />
                  열추가
                </Button>
                <Button
                  size="SM"
                  className="flex gap-2 text-0-75-500"
                  colorStyles="gray"
                >
                  <Image
                    src="/svg/minus.svg"
                    alt="삭제"
                    width={12}
                    height={12}
                  />
                  열삭제
                </Button>
              </div>

              <div className="flex gap-1">
                <Button
                  size="SM"
                  className="flex gap-2 text-0-75-500"
                  colorStyles="gray"
                >
                  <Image
                    src="/svg/plus.svg"
                    alt="추가"
                    width={12}
                    height={12}
                  />
                  행추가
                </Button>
                <Button
                  size="SM"
                  className="flex gap-2 text-0-75-500"
                  colorStyles="gray"
                >
                  <Image
                    src="/svg/minus.svg"
                    alt="삭제"
                    width={12}
                    height={12}
                  />
                  행삭제
                </Button>
              </div>
            </div>
            {/* 표 */}

            <BoxedTableWrapper
              columns={taxColumns}
              data={taxData}
              className="px-0"
              headerClassName="border-b-1 border-gray-2 pb-1"
            />
            <div className="w-full justify-start items-center flex gap-4 py-7 text-0-75-500 text-gray-1">
              <label htmlFor="additionalContent">기타안내</label>
              <input
                type="text"
                id="additionalContent"
                checked={additionalContent}
                onChange={(e) => {
                  setAdditionalContent(e.target.checked);
                }}
                placeholder="내용을 입력하세요"
                className=" border-gray-2 border-b-[0.1rem] w-[50%]"
              />
              <Button
                size="S"
                colorStyles="default"
                className="text-0-75-500 text-black"
              >
                변경하기
              </Button>
            </div>
            {/* 하단 안내 */}
            {additionalContent && (
              <div className="mt-8">
                <div className="text-1-700 mb-4">하단 안내</div>

                <div className="flex flex-col gap-4 text-0-75-500 text-gray-1">
                  <div className="flex gap-16">
                    <span className="w-16">카피</span>
                    <input
                      type="text"
                      placeholder="  내용을 입력하세요"
                      className="border-b-[0.05rem] border-gray-2 w-full placeholder:text-gray-1"
                    />
                  </div>
                  <div className="flex gap-16 items-center">
                    <span className="w-16">게시여부</span>
                    <div className="flex gap-2 justify-between w-full">
                      <div className="flex flex-col gap-2 items-start ">
                        <Checkbox
                          className="w-[1.5rem] h-[1.5rem]"
                          checked={isPosted}
                          onChange={(e) => {
                            console.log(
                              '체크박스 값:',
                              setIsPosted(e.target.checked)
                            );
                            return setIsPosted(!isPosted);
                          }}
                        />
                        <span className="text-gray-1 text-0-75-400">
                          *현재 홈페이지에 안내 중입니다
                        </span>
                      </div>
                      <Button
                        size="S"
                        colorStyles="gray"
                        className="text-0-75-500"
                      >
                        수정
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <TextUpdate
            title="제한사항"
            subTitle="현수막 표시내용의 금지 제안, 하상법 위반 등 현수막 표시내용의 금지 제안, 하상법 위반 등"
            buttonName="변경하기"
          />

          <TextUpdate subTitle="추가안내" buttonName="변경하기" />

          <TextUpdate
            title="유의사항"
            subTitle="기본안내"
            buttonName="변경하기"
          />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title={
            modalType === 'popup-add'
              ? '팝업 추가하기'
              : modalType === 'popup-edit'
              ? '팝업 수정하기'
              : modalType === 'popup-delete'
              ? '삭제 확인'
              : modalType === 'order'
              ? '(행정용) 대림아파트... 수정화면'
              : '수정화면'
          }
          onClose={handleClose}
          footer={
            modalType === 'popup-delete' ? null : (
              <Button size="L" colorStyles="black" className="w-[20rem]">
                저장
              </Button>
            )
          }
        >
          {modalType === 'popup-add' && <PopupEditForm />}
          {modalType === 'popup-edit' && selectedRow && (
            <PopupEditForm selectedRow={selectedRow} isEdit={true} />
          )}
          {modalType === 'popup-delete' && (
            <DeleteConfirmModal
              onConfirm={handleDeleteConfirm}
              onCancel={handleDeleteCancel}
            />
          )}
          {modalType === 'order' && selectedRow && (
            <BannerEditForm
              columns={panelFaceUsageColumns}
              data={panelFaceUsageData}
              selectedRow={selectedRow}
            />
          )}
          {modalType === 'code' && (
            <CodeEditForm
              columns={panelFaceUsageColumns}
              data={panelFaceUsageData}
            />
          )}
        </Modal>
      )}
    </div>
  );
}
