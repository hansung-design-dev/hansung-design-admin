import React, { useState } from 'react';

type MemberFormState = {
  id?: string;
  order_number?: string;
  applicant_name?: string;
  birthdate?: string;
  phone?: string;
  company_name?: string;
  quantity?: string;
  total_amount?: string;
  depositor_id?: string;
  depositor_name?: string;
  deposit_date?: string;
  is_paid?: string;
  is_checked?: string;
  invoice_issued_at?: string;
  password?: string;
};

interface MemberEditFormProps {
  selectedRow: MemberFormState;
}

function MemberEditForm({ selectedRow }: MemberEditFormProps) {
  const [formState, setFormState] = useState<MemberFormState>(
    selectedRow || {}
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto pr-4">
      {/* 기본 정보 */}
      <div className="mb-6">
        <div className="text-md font-medium  mb-4 text-gray-700">기본 정보</div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <label className="block text-sm font-medium  mb-1">NO</label>
            <input
              type="text"
              name="id"
              value={formState.id || ''}
              onChange={handleInputChange}
              className="w-full border-b bg-transparent outline-none placeholder:text-xs text-xs border-gray-2 py-1"
              placeholder="NO"
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">신청번호</label>
            <input
              type="text"
              name="order_number"
              value={formState.order_number || ''}
              onChange={handleInputChange}
              className="w-full border-b bg-transparent outline-none placeholder:text-xs text-xs border-gray-2 py-1"
              placeholder="신청번호"
            />
          </div>
          <div className="">
            <label className="block text-sm font-medium  mb-1">성명</label>
            <input
              type="text"
              name="applicant_name"
              value={formState.applicant_name || ''}
              onChange={handleInputChange}
              className="w-full border-b bg-transparent outline-none placeholder:text-xs text-xs border-gray-2 py-1 font-semibold"
              placeholder="성명"
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">생년월일</label>
            <input
              type="text"
              name="birthdate"
              value={formState.birthdate || ''}
              onChange={handleInputChange}
              className="w-full border-b bg-transparent outline-none placeholder:text-xs text-xs border-gray-2 py-1"
              placeholder="생년월일"
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">전화번호</label>
            <input
              type="text"
              name="phone"
              value={formState.phone || ''}
              onChange={handleInputChange}
              className="w-full border-b bg-transparent outline-none placeholder:text-xs text-xs border-gray-2 py-1"
              placeholder="전화번호"
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">업체명</label>
            <input
              type="text"
              name="company_name"
              value={formState.company_name || ''}
              onChange={handleInputChange}
              className="w-full border-b bg-transparent outline-none placeholder:text-xs text-xs border-gray-2 py-1"
              placeholder="업체명"
            />
          </div>
        </div>
      </div>
      {/* 입금 정보 */}
      <div className="mb-6">
        <div className="text-md font-medium  mb-4 text-gray-700">입금 정보</div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <label className="block text-sm font-medium  mb-1">신청수량</label>
            <input
              type="text"
              name="quantity"
              value={formState.quantity || ''}
              onChange={handleInputChange}
              className="w-full border-b bg-transparent outline-none placeholder:text-xs text-xs border-gray-2 py-1"
              placeholder="신청수량"
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">총금액</label>
            <input
              type="text"
              name="total_amount"
              value={formState.total_amount || ''}
              onChange={handleInputChange}
              className="w-full border-b bg-transparent outline-none placeholder:text-xs text-xs border-gray-2 py-1"
              placeholder="총금액"
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">신청자 ID</label>
            <input
              type="text"
              name="depositor_id"
              value={formState.depositor_id || ''}
              onChange={handleInputChange}
              className="w-full border-b bg-transparent outline-none placeholder:text-xs text-xs border-gray-2 py-1"
              placeholder="신청자 ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">입금자</label>
            <input
              type="text"
              name="depositor_name"
              value={formState.depositor_name || ''}
              onChange={handleInputChange}
              className="w-full border-b bg-transparent outline-none placeholder:text-xs text-xs border-gray-2 py-1"
              placeholder="입금자"
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">입금일자</label>
            <input
              type="text"
              name="deposit_date"
              value={formState.deposit_date || ''}
              onChange={handleInputChange}
              className="w-full border-b bg-transparent outline-none placeholder:text-xs text-xs border-gray-2 py-1"
              placeholder="입금일자"
            />
          </div>
        </div>
      </div>
      {/* 기타 정보 */}
      <div>
        <div className="text-md font-medium  mb-4 text-gray-700">기타 정보</div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <label className="block text-sm font-medium  mb-1">입금</label>
            <input
              type="text"
              name="is_paid"
              value={formState.is_paid || ''}
              onChange={handleInputChange}
              className="w-full border-b bg-transparent outline-none placeholder:text-xs text-xs border-gray-2 py-1"
              placeholder="입금"
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">확인</label>
            <input
              type="text"
              name="is_checked"
              value={formState.is_checked || ''}
              onChange={handleInputChange}
              className="w-full border-b bg-transparent outline-none placeholder:text-xs text-xs border-gray-2 py-1"
              placeholder="확인"
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">
              계산서발행
            </label>
            <input
              type="text"
              name="invoice_issued_at"
              value={formState.invoice_issued_at || ''}
              onChange={handleInputChange}
              className="w-full border-b bg-transparent outline-none placeholder:text-xs text-xs border-gray-2 py-1"
              placeholder="계산서발행"
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-1">비밀번호</label>
            <input
              type="password"
              name="password"
              value={formState.password || ''}
              onChange={handleInputChange}
              className="w-full border-b bg-transparent outline-none placeholder:text-xs text-xs border-gray-2 py-1"
              placeholder="비밀번호"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberEditForm;
