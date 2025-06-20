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

  const renderInput = (name: keyof MemberFormState, label: string) => (
    <div key={name}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        value={formState[name] || ''}
        onChange={handleInputChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border-b"
      />
    </div>
  );

  return (
    <div className="max-h-[80vh] overflow-y-auto pr-4">
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 p-4">
        {renderInput('id', 'NO')}
        {renderInput('order_number', '신청번호')}
        {renderInput('applicant_name', '성명')}
        {renderInput('birthdate', '생년월일')}
        {renderInput('phone', '전화번호')}
        {renderInput('company_name', '업체명')}
        {renderInput('quantity', '신청수량')}
        {renderInput('total_amount', '총금액')}
        {renderInput('depositor_id', '신청자 ID')}
        {renderInput('depositor_name', '입금자')}
        {renderInput('deposit_date', '입금일자')}
        {renderInput('is_paid', '입금')}
        {renderInput('is_checked', '확인')}
        {renderInput('invoice_issued_at', '계산서발행')}
      </div>
    </div>
  );
}

export default MemberEditForm;
