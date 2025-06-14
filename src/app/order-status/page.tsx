'use client';
import { CommonTable } from '@/components/layout/commonTable';
import Header from '@/components/layout/header';
import Button from '@/components/ui/button';
import Image from 'next/image';
import Checkbox from '@/components/ui/checkbox';
import { useState } from 'react';
import Modal from '@/components/layout/modal';
import PopupAddForm from '@/components/modal-contents/popupAddForm';
import OrderEditForm from '@/components/modal-contents/orderEditForm';
import CodeEditForm from '@/components/modal-contents/codeEditForm';

interface DistrictRow {
  id: string;
  order_number: string;
  applicant_name: string;
  birthdate: string;
  phone: string;
  company_name: string;
  quantity: number;
  total_amount: number;
  depositor_id: string;
  depositor_name: string;
  deposit_date: string;
  is_paid: boolean;
  is_checked: boolean;
  invoice_issued_at: string;
}

const statusColumns = [
  {
    key: 'order_number',
    header: '신청번호',
  },
  {
    key: 'applicant_name',
    header: '성명',
  },
  {
    key: 'birthdate',
    header: '생년월일',
  },
  {
    key: 'phone',
    header: '전화번호',
  },
  {
    key: 'company_name',
    header: '업체명',
  },
  {
    key: 'quantity',
    header: '신청수량',
  },
  {
    key: 'total_amount',
    header: '총금액',
  },
  {
    key: 'depositor_id',
    header: '신청자 ID',
  },
  {
    key: 'depositor_name',
    header: '입금자',
  },
  {
    key: 'deposit_date',
    header: '입금일자',
  },
  {
    key: 'is_paid',
    header: '입금',
  },
  {
    key: 'is_checked',
    header: '확인',
  },
  {
    key: 'invoice_issued_at',
    header: '계산서발행',
  },
  {
    key: 'invoice',
    header: '계산서',
  },
  {
    key: 'payment_method',
    header: '결제구분',
  },
  {
    key: 'email',
    header: '이메일',
  },
  {
    key: 'district_name',
    header: '구역명',
  },
  {
    key: 'created_at',
    header: '접수시각',
  },
  {
    key: 'is_design_sent',
    header: '시안여부',
  },
  {
    key: 'is_confirmed',
    header: '검수',
  },
  {
    key: 'is_received',
    header: '입고',
  },
  {
    key: 'is_printed',
    header: '출력',
  },
  {
    key: 'is_file_checked',
    header: '파일',
  },
  {
    key: 'display_address',
    header: '송출주소',
  },
];

const statusData = [
  {
    id: '1',
    order_number: '1234567890',
    applicant_name: '홍길동',
    birthdate: '1990-01-01',
    phone: '010-1234-5678',
    company_name: '홍길동',
    quantity: 1,
    total_amount: 100000,
    depositor_id: '1234567890',
    depositor_name: '홍길동',
    deposit_date: '2021-01-01',
    is_paid: true,
    is_checked: true,
    invoice_issued_at: '2021-01-01',
    invoice: '1234567890',
    payment_method: '1234567890',
    email: 'test@test.com',
    district_name: '서울',
    created_at: '2021-01-01',
    is_design_sent: true,
    is_confirmed: true,
    is_received: true,
    is_printed: true,
    is_file_checked: true,
    display_address: '서울',
  },
];

export default function OrderStatus() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'popup' | 'order' | 'code'>(
    'popup'
  );
  const [selectedRow, setSelectedRow] = useState<DistrictRow | null>(null);

  const handleClose = () => setIsModalOpen(false);

  const handleListRowClick = (row: DistrictRow) => {
    setSelectedRow(row);
    setModalType('popup');
    setIsModalOpen(true);
  };

  return (
    <div className="pt-16 px-8 ml-[5rem]">
      <Header breadcrumbs={['신청현황']} />
      <div className=" flex items-center gap-4 justify-between py-4">
        <div className="text-0-75-500 text-gray-1 flex items-center gap-2">
          <Checkbox
            checked={true}
            onChange={() => {}}
            className="w-[1.25rem] h-[1.25rem]"
          />
          사용 안하는 게시대 제외
        </div>
        <Button size="S" className="text-0-75-500">
          <Image src="/svg/plus.svg" alt="logo" width={20} height={20} />
          추가
        </Button>
      </div>

      <CommonTable
        columns={statusColumns}
        data={statusData}
        tableRowClick={handleListRowClick}
      />
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
                { key: 'order_number', label: '신청번호' },
                { key: 'applicant_name', label: '성명' },
                { key: 'birthdate', label: '생년월일' },
                { key: 'phone', label: '전화번호' },
                { key: 'company_name', label: '업체명' },
                { key: 'quantity', label: '신청수량' },
                { key: 'total_amount', label: '총금액' },
                { key: 'depositor_id', label: '신청자 ID' },
                { key: 'depositor_name', label: '입금자' },
                { key: 'deposit_date', label: '입금일자' },
                { key: 'is_paid', label: '입금' },
                { key: 'is_checked', label: '확인' },
                { key: 'invoice_issued_at', label: '계산서발행' },
              ]}
            />
          )}
          {modalType === 'code' && (
            <CodeEditForm columns={statusColumns} data={statusData} />
          )}
        </Modal>
      )}
    </div>
  );
}
