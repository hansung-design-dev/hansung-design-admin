'use client';
import { CommonTable } from '@/components/layout/commonTable';
import Header from '@/components/layout/header';
import Button from '@/components/ui/button';
import Image from 'next/image';
import Checkbox from '@/components/ui/checkbox';
import { useState } from 'react';
import Modal from '@/components/modal-contents/modal';
import MemberEditForm from '@/components/modal-contents/MemberEditForm';

interface DistrictRow {
  id: string;
  code: string;
  applicant_id: string;
  applicant_name: string;
  birthdate: string;
  phone_no: string;
  mobile_no: string;
  email: string;
  address: string;
  join_date: string;
  product_type: string;
  business_no: string;
  company_name: string;
  representative: string;
  business_division: string;
  business_address: string;
  business_type: string;
  is_approved: string;
  memo?: string;
}

const statusColumns = [
  {
    key: 'code',
    header: '코드',
    minWidth: '3rem',
  },
  {
    key: 'applicant_id',
    header: '아이디',
    minWidth: '3rem',
  },
  {
    key: 'applicant_name',
    header: '성명',
    minWidth: '3rem',
  },
  {
    key: 'birthdate',
    header: '생년월일',
    minWidth: '3rem',
  },
  {
    key: 'phone_no',
    header: '전화번호',
    minWidth: '6rem',
  },
  {
    key: 'mobile_no',
    header: '휴대폰번호',
    minWidth: '6rem',
  },
  {
    key: 'email',
    header: '이메일',
    minWidth: '9rem',
  },

  {
    key: 'address',
    header: '주소',
    minWidth: '10rem',
  },
  {
    key: 'join_date',
    header: '가입일자',
    minWidth: '7rem',
  },
  {
    key: 'business_division',
    header: '구분',
    minWidth: '3rem',
  },
  {
    key: 'business_no',
    header: '사업자번호',
    minWidth: '7rem',
  },
  {
    key: 'company_name',
    header: '사업자명',
    minWidth: '6rem',
  },
  {
    key: 'representative',
    header: '대표자',
    minWidth: '3rem',
  },
  {
    key: 'business_address',
    header: '사업장주소',
    minWidth: '7rem',
  },
  {
    key: 'business_type',
    header: '업태',
    minWidth: '2rem',
  },
  {
    key: 'business_category',
    header: '업종',
    minWidth: '2rem',
  },
  {
    key: 'is_approved',
    header: '승인여부',
    minWidth: '2rem',
  },
];

const statusData = [
  {
    id: '01',
    code: '01',
    applicant_id: 'smart1',
    applicant_name: '홍길동',
    birthdate: '90-01-01',
    phone_no: '010-1234-5678',
    mobile_no: '010-1234-5678',
    email: 'test@test.com',
    address: '서울 강남구 역삼동 123-123',
    join_date: '2021-01-01',
    product_type: 'LED전자게시대',
    business_division: '개인',
    business_no: '1234567890',
    company_name: '홍길동컴퍼니',
    representative: '홍길동',
    business_address: '서울 강남구 역삼동 123-123',
    business_type: '개인',
    business_category: '개인',
    is_approved: '승인',
    memo: '메모',
  },
  {
    id: '02',
    code: '02',
    applicant_id: 'smart2',
    applicant_name: '홍길동',
    birthdate: '90-01-01',
    phone_no: '010-1234-5678',
    mobile_no: '010-1234-5678',
    email: 'test@test.com',
    address: '서울 강남구 역삼동 123-123',
    join_date: '2021-01-01',
    product_type: 'LED전자게시대',
    business_division: '개인',
    business_no: '1234567890',
    company_name: '홍길동컴퍼니',
    representative: '홍길동',
    business_address: '서울 강남구 역삼동 123-123',
    business_type: '개인',
    business_category: '개인',
    is_approved: '승인',
    memo: '메모',
  },
  {
    id: '03',
    code: '03',
    applicant_id: 'smart3',
    applicant_name: '홍길동',
    birthdate: '90-01-01',
    phone_no: '010-1234-5678',
    mobile_no: '010-1234-5678',
    email: 'test@test.com',
    address: '서울 강남구 역삼동 123-123',
    join_date: '2021-01-01',
    product_type: 'LED전자게시대',
    business_no: '1234567890',
    company_name: '홍길동컴퍼니',
    representative: '홍길동',
    business_division: '개인',
    business_address: '서울 강남구 역삼동 123-123',
    business_type: '개인',
    business_category: '개인',
    is_approved: '승인',
    memo: '메모',
  },
  {
    id: '04',
    code: '04',
    applicant_id: 'smart4',
    applicant_name: '홍길동',
    birthdate: '90-01-01',
    phone_no: '010-1234-5678',
    mobile_no: '010-1234-5678',
    email: 'test@test.com',
    address: '서울 강남구 역삼동 123-123',
    join_date: '2021-01-01',
    product_type: 'LED전자게시대',
    business_no: '1234567890',
    company_name: '홍길동컴퍼니',
    representative: '홍길동',
    business_division: '개인',
    business_address: '서울 강남구 역삼동 123-123',
    business_type: '개인',
    business_category: '개인',
    is_approved: '승인',
    memo: '메모',
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
      <Header breadcrumbs={['온라인회원관리']} />
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
          title={modalType === 'order' && '회원추가/수정'}
          onClose={handleClose}
          footer={
            <Button size="L" colorStyles="black" className="w-[20rem]">
              저장
            </Button>
          }
        >
          {modalType === 'order' && selectedRow && (
            <MemberEditForm selectedRow={selectedRow} />
          )}
        </Modal>
      )}
    </div>
  );
}
