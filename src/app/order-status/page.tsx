'use client';
import { CommonTable } from '@/components/layout/commonTable';
import Header from '@/components/layout/header';
import Button from '@/components/ui/button';
import Image from 'next/image';
import Checkbox from '@/components/ui/checkbox';
import { useState } from 'react';
import Modal from '@/components/modal-contents/modal';
import OrderEditForm from '@/components/modal-contents/orderEditForm';

export interface DistrictRow {
  id: string;
  applicant_name: string;
  birthdate: string;
  phone_no: string;
  company_name: string;
  buying_amount: string;
  total_amount: string;
  applicant_id: string;
  depositor_name: string;
  depositor_date: string;
  is_paid: boolean;
  is_confirmed: boolean;
  invoice_issued_at: string;
  is_invoice_ordered: boolean;
  payment_method: string;
  district_name: string;
  order_at: string;
  is_sample: boolean;
  is_approved: boolean;
  is_instock: boolean;
  is_selected: boolean;
  display_address: string;
}

const statusColumns = [
  {
    key: 'id',
    header: '신청번호',
    minWidth: '5rem',
  },
  {
    key: 'applicant_name',
    header: '성명',
    minWidth: '2rem',
  },
  {
    key: 'birthdate',
    header: '생년월일',
    minWidth: '3rem',
  },
  {
    key: 'phone_no',
    header: '전화번호',
    minWidth: '3rem',
  },
  {
    key: 'company_name',
    header: '업체명',
    minWidth: '6rem',
  },

  {
    key: 'buying_amount',
    header: '수량',
    minWidth: '2rem',
  },
  {
    key: 'total_amount',
    header: '총금액',
    minWidth: '2rem',
  },
  {
    key: 'applicant_id',
    header: '신청자ID',
    minWidth: '2rem',
  },
  {
    key: 'depositor_name',
    header: '입금자',
    minWidth: '6rem',
  },
  {
    key: 'depositor_date',
    header: '입금일자',
    minWidth: '2rem',
  },
  {
    key: 'is_paid',
    header: '입금여부',
    minWidth: '2.5rem',
  },
  {
    key: 'is_confirmed',
    header: '확인여부',
    minWidth: '2rem',
  },
  {
    key: 'invoice_issued_at',
    header: '계산서발행',
    minWidth: '2rem',
  },
  {
    key: 'is_invoice_ordered',
    header: '계산서주문',
    minWidth: '2rem',
  },
  {
    key: 'payment_method',
    header: '결제방법',
    minWidth: '2rem',
  },
  {
    key: 'district_name',
    header: '게시구역',
    minWidth: '2rem',
  },
  {
    key: 'order_at',
    header: '접수시각',
    minWidth: '2rem',
  },
  {
    key: 'is_sample',
    header: '시안',
    minWidth: '2rem',
  },
  {
    key: 'is_approved',
    header: '검수',
    minWidth: '2rem',
  },
  {
    key: 'is_instock',
    header: '입고',
    minWidth: '2rem',
  },
  {
    key: 'is_selected',
    header: '선택',
    minWidth: '2rem',
  },
  {
    key: 'display_address',
    header: '송출주소',
    minWidth: '2rem',
  },
];

const statusData = [
  {
    id: '0000000000001',
    code: '01',
    applicant_name: '홍길동',
    birthdate: '90-01-01',
    phone_no: '010-1234-5678',
    company_name: '홍길동',
    buying_amount: '10',
    total_amount: '100000',
    applicant_id: 'smart1',
    depositor_name: '홍길동',
    depositor_date: '2021-01-01',
    is_paid: true,
    is_confirmed: true,
    invoice_issued_at: '2021-01-01',
    is_invoice_ordered: true,
    payment_method: '신용카드',
    district_name: '서울',
    order_at: '2021-01-01',
    is_sample: true,
    is_approved: true,
    is_instock: true,
    is_selected: true,
    display_address: '서울특별시 강남구 역삼동 123-123',
  },
  {
    id: '0000000000002',
    code: '02',
    applicant_name: '홍길동',
    birthdate: '90-01-01',
    phone_no: '010-1234-5678',
    company_name: '홍길동',
    buying_amount: '10',
    total_amount: '100000',
    applicant_id: 'smart2',
    depositor_name: '홍길동',
    depositor_date: '2021-01-01',
    is_paid: true,
    is_confirmed: true,
    invoice_issued_at: '2021-01-01',
    is_invoice_ordered: true,
    payment_method: '신용카드',
    district_name: '서울',
    order_at: '2021-01-01',
    is_sample: true,
    is_approved: true,
    is_instock: true,
    is_selected: true,
    display_address: '서울특별시 강남구 역삼동 123-123',
  },
  {
    id: '0000000000003',
    code: '03',
    applicant_name: '홍길동',
    birthdate: '90-01-01',
    phone_no: '010-1234-5678',
    company_name: '홍길동',
    buying_amount: '10',
    total_amount: '100000',
    applicant_id: 'smart3',
    depositor_name: '홍길동',
    depositor_date: '2021-01-01',
    is_paid: true,
    is_confirmed: true,
    invoice_issued_at: '2021-01-01',
    is_invoice_ordered: true,
    payment_method: '신용카드',
    district_name: '서울',
    order_at: '2021-01-01',
    is_sample: true,
    is_approved: true,
    is_instock: true,
    is_selected: true,
    display_address: '서울특별시 강남구 역삼동 123-123',
  },
  {
    id: '0000000000004',
    code: '04',
    applicant_name: '홍길동',
    birthdate: '90-01-01',
    phone_no: '010-1234-5678',
    company_name: '홍길동',
    buying_amount: '10',
    total_amount: '100000',
    applicant_id: 'smart4',
    depositor_name: '홍길동',
    depositor_date: '2021-01-01',
    is_paid: true,
    is_confirmed: true,
    invoice_issued_at: '2021-01-01',
    is_invoice_ordered: true,
    payment_method: '신용카드',
    district_name: '서울',
    order_at: '2021-01-01',
    is_sample: true,
    is_approved: true,
    is_instock: true,
    is_selected: true,
    display_address: '서울특별시 강남구 역삼동 123-123',
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
    setModalType('order');
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
        searchInput
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
          {modalType === 'order' && selectedRow && (
            <OrderEditForm
              columns={statusColumns}
              data={[selectedRow]}
              selectedRow={selectedRow}
            />
          )}
        </Modal>
      )}
    </div>
  );
}
