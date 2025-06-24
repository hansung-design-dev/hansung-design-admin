import React, { useState } from 'react';

type MemberFormState = {
  code?: string;
  applicant_id?: string;
  applicant_name?: string;
  birthdate?: string;
  phone_no?: string;
  mobile_no?: string;
  email?: string;
  address?: string;
  join_date?: string;
  business_division?: string;
  business_no?: string;
  company_name?: string;
  representative?: string;
  business_address?: string;
  business_type?: string;
  business_category?: string;
  is_approved?: string;
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

  const fields: { key: keyof MemberFormState; label: string; type?: string }[] =
    [
      { key: 'code', label: '코드' },
      { key: 'applicant_id', label: '아이디' },
      { key: 'applicant_name', label: '성명' },
      { key: 'birthdate', label: '생년월일' },
      { key: 'phone_no', label: '전화번호' },
      { key: 'mobile_no', label: '휴대폰번호' },
      { key: 'email', label: '이메일' },
      { key: 'address', label: '주소' },
      { key: 'join_date', label: '가입일자' },
      { key: 'business_division', label: '구분' },
      { key: 'business_no', label: '사업자번호' },
      { key: 'company_name', label: '사업자명' },
      { key: 'representative', label: '대표자' },
      { key: 'business_address', label: '사업장주소' },
      { key: 'business_type', label: '업태' },
      { key: 'business_category', label: '업종' },
      { key: 'is_approved', label: '승인여부' },
    ];

  return (
    <div className="max-h-[80vh] overflow-y-auto pr-4">
      <div className="mb-6">
        <div className="text-md font-medium  mb-4 text-gray-700">회원 정보</div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {fields.map(({ key, label, type }) => (
            <div key={key}>
              <label className="block text-sm font-medium  mb-1">{label}</label>
              <input
                type={type || 'text'}
                name={key}
                value={formState[key] || ''}
                onChange={handleInputChange}
                className="w-full border-b bg-transparent outline-none placeholder:text-xs text-xs border-gray-2 py-1"
                placeholder={label}
              />
            </div>
          ))}
          {/* 비밀번호는 항상 마지막에 한 칸 전체로 */}
          <div className="col-span-2">
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
