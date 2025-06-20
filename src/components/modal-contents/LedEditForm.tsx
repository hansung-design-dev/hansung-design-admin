import React, { useState } from 'react';

type LedFormState = {
  id?: string;
  location?: string;
  isPhoto?: string;
  isLocation?: string;
  isMap?: string;
  disrtict_name?: string;
  display?: string;
  amount?: string;
  size?: string;
  announcement?: string;
  CountArea?: string;
  done?: number;
  isForAdmin?: string;
  note?: string;
};

interface LedEditFormProps {
  selectedRow: LedFormState;
}

function LedEditForm({ selectedRow }: LedEditFormProps) {
  const [formState, setFormState] = useState<LedFormState>(selectedRow || {});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const renderInput = (name: keyof LedFormState, label: string) => (
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
        {renderInput('location', '위치')}
        {renderInput('isPhoto', '사진')}
        {renderInput('isLocation', '위치')}
        {renderInput('isMap', '지도')}
        {renderInput('disrtict_name', '행정동')}
        {renderInput('display', '게시')}
        {renderInput('amount', '금액')}
        {renderInput('size', '크기')}
        {renderInput('announcement', '안내사항')}
        {renderInput('CountArea', '면수')}
        {renderInput('done', '마감')}
        {renderInput('isForAdmin', '행정용')}
        {renderInput('note', '비고')}
      </div>
    </div>
  );
}

export default LedEditForm;
