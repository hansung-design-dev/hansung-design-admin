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

  const fields: { key: keyof MemberFormState; label: string }[] = [
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
  ];

  return (
    <div className="max-h-[80vh] overflow-y-auto pr-4">
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 p-4">
        {fields.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 pb-2">
            <span className="w-24 shrink-0 text-sm font-medium text-gray-700">
              {label}
            </span>
            <input
              type="text"
              placeholder="내용을 입력해주세요."
              name={key}
              value={formState[key] || ''}
              onChange={handleInputChange}
              className="w-full border-b bg-transparent outline-none placeholder:text-xs value:text-xs border-gray-2"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default MemberEditForm;
