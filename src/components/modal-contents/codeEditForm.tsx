import React, { useState } from 'react';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import LabelInput from '@/components/layout/LabelInput';
import { BoxedTableWrapper } from '../layout/boxedTableWrapper';

// 왼쪽 필드+버튼 정의
interface FieldButton {
  label: string;
  key: string;
}
interface FormField {
  key: string;
  label: string;
  placeholder: string;
  buttons?: FieldButton[];
}
const formFields: FormField[] = [
  {
    key: 'location',
    label: '위치명',
    placeholder: '입력해주세요.',
  },
  {
    key: 'photo',
    label: '사진',
    placeholder: '첨부해주세요.',
    buttons: [
      { label: '사진 보기', key: 'photoView' },
      { label: '수정', key: 'photoEdit' },
      { label: '삭제', key: 'photoDelete' },
    ],
  },
  {
    key: 'address',
    label: '위치',
    placeholder: '입력해주세요.',
    buttons: [
      { label: '위치 보기', key: 'addressView' },
      { label: '수정', key: 'addressEdit' },
      { label: '삭제', key: 'addressDelete' },
    ],
  },
  {
    key: 'map',
    label: '지도',
    placeholder: '입력해주세요.',
    buttons: [
      { label: '지도 보기', key: 'mapView' },
      { label: '수정', key: 'mapEdit' },
      { label: '삭제', key: 'mapDelete' },
    ],
  },
  {
    key: 'note',
    label: '비고',
    placeholder: '비고내용',
  },
];

// 오른쪽 옵션 정의
interface RadioOption {
  type: 'radio';
  label: string;
  name: string;
  options: { label: string; value: string }[];
}
interface SizeOption {
  type: 'size';
  label: string;
  widthKey: string;
  heightKey: string;
  unit: string;
}
interface InputOption {
  type: 'input';
  label: string;
  key: string;
  placeholder: string;
}
type RightOption = RadioOption | SizeOption | InputOption;
const rightOptions: RightOption[] = [
  {
    type: 'radio',
    label: '게시대종류',
    name: 'type',
    options: [
      { label: '가로형', value: 'horizontal' },
      { label: '세로형', value: 'vertical' },
      { label: '현수기', value: 'banner' },
    ],
  },
  {
    type: 'size',
    label: '규격',
    widthKey: 'width',
    heightKey: 'height',
    unit: 'px',
  },
  {
    type: 'input',
    label: '금액',
    key: 'price',
    placeholder: '코드를 입력해주세요.',
  },
];

// 테이블 row 타입
interface TableRow {
  count: string;
  usageType: string;
  attachDate: string;
  attachPrice: string;
  fee: string;
  usage: string;
  done: string;
  companyName: string;
}

// 컬럼 정의
const tableColumns = [
  { key: 'count', header: '면수' },
  { key: 'usageType', header: '사용구분' },
  { key: 'attachDate', header: '부착일' },
  { key: 'attachPrice', header: '부착단가' },
  { key: 'fee', header: '수수료' },
  { key: 'usage', header: '사용' },
  { key: 'done', header: '마감' },
  { key: 'companyName', header: '사업자명' },
];

// 예시 데이터
const tableData: TableRow[] = [
  {
    count: '01',
    usageType: '사용구분',
    attachDate: '부착일',
    attachPrice: '부착단가',
    fee: '수수료',
    usage: '가능',
    done: '-',
    companyName: '-',
  },
  {
    count: '02',
    usageType: '사용구분',
    attachDate: '부착일',
    attachPrice: '부착단가',
    fee: '수수료',
    usage: '가능',
    done: '마감',
    companyName: '회사이름',
  },
  {
    count: '03',
    usageType: '사용구분',
    attachDate: '부착일',
    attachPrice: '부착단가',
    fee: '수수료',
    usage: '가능',
    done: '마감',
    companyName: '회사이름',
  },
  {
    count: '04',
    usageType: '사용구분',
    attachDate: '부착일',
    attachPrice: '부착단가',
    fee: '수수료',
    usage: '가능',
    done: '-',
    companyName: '-',
  },
  {
    count: '0',
    usageType: '사용구분',
    attachDate: '부착일',
    attachPrice: '부착단가',
    fee: '수수료',
    usage: '불가능',
    done: '-',
    companyName: '홍길동',
  },
];

function FlexibleForm({
  fields,
  rightOptions,
  formState,
  setFormState,
}: {
  fields: FormField[];
  rightOptions: RightOption[];
  formState: Record<string, unknown>;
  setFormState: (s: Record<string, unknown>) => void;
}) {
  return (
    <>
      <div className="flex gap-8">
        {/* 왼쪽 폼 */}
        <div className="flex-1 flex flex-col gap-4 text-gray-1 ">
          {fields.map((field) => (
            <div className="flex items-center text-0-75-500 " key={field.key}>
              <LabelInput
                label={field.label}
                placeholder={field.placeholder}
                value={(formState[field.key] as string) || ''}
                onChange={(e) =>
                  setFormState({ ...formState, [field.key]: e.target.value })
                }
              />
              {Array.isArray(field.buttons) && field.buttons.length > 0 && (
                <div className="ml-4 flex gap-2 pb-2">
                  {field.buttons.map((btn) => (
                    <Button
                      size="XS"
                      className={`text-0-875-700 text-black ${
                        btn.label.length === 5
                          ? 'min-w-[4.5rem]'
                          : 'min-w-[3rem]'
                      }`}
                      key={btn.key}
                    >
                      {btn.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* 오른쪽 옵션 */}
        <div className="w-[350px] flex flex-col gap-4 text-0-75-500 text-gray-1">
          {rightOptions.map((opt, i) => {
            if (opt.type === 'radio') {
              return (
                <div key={i} className="flex gap-2">
                  <div>{opt.label}</div>
                  <div className="flex gap-2">
                    {opt.options.map((o) => (
                      <label key={o.value} className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={opt.name}
                          value={o.value}
                          checked={formState[opt.name] === o.value}
                          onChange={() =>
                            setFormState({ ...formState, [opt.name]: o.value })
                          }
                        />
                        {o.label}
                      </label>
                    ))}
                  </div>
                </div>
              );
            }
            if (opt.type === 'size') {
              return (
                <div key={i} className="flex gap-2">
                  <div className="flex flex-col gap-0 items-end">
                    <div>{opt.label}</div>
                    <div className="text-0-625-500">(가로 x 세로)</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <input
                        type="number"
                        value={(formState[opt.widthKey] as string) || ''}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            [opt.widthKey]: e.target.value,
                          })
                        }
                        className="input w-8 border-gray-2 border-b-1 text-center"
                      />
                      {opt.unit}
                    </div>
                    <span>x</span>
                    <div>
                      <input
                        type="number"
                        value={(formState[opt.heightKey] as string) || ''}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            [opt.heightKey]: e.target.value,
                          })
                        }
                        className="input w-8 border-gray-2 border-b-1 text-center"
                      />
                      {opt.unit}
                    </div>
                  </div>
                </div>
              );
            }
            if (opt.type === 'input') {
              return (
                <LabelInput
                  key={i}
                  label={opt.label}
                  placeholder={opt.placeholder}
                  value={(formState[opt.key] as string) || ''}
                  onChange={(e) =>
                    setFormState({ ...formState, [opt.key]: e.target.value })
                  }
                  labelWidth="w-12"
                  containerClassName="text-end gap-2"
                  className="placeholder:text-center w-[70%]"
                />
              );
            }
            return null;
          })}
        </div>
      </div>
      {/* 표 및 표 상단 버튼/토글 */}
      <div className="mt-8">
        <div className="w-full flex gap-2 mb-4 items-center">
          <span className="text-1-700 mr-4">면수관리</span>
          <div className="flex  items-center justify-between w-[80%]">
            <div className="flex items-center gap-2">
              <Button size="S" className="text-0-75-500 text-gray-1">
                + 추가
              </Button>
              <Button size="S" className="text-0-75-500 text-gray-1">
                삭제
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                checked={!!formState['isAdminTable']}
                onChange={(e) =>
                  setFormState({ ...formState, isAdminTable: e.target.checked })
                }
                className="ml-2"
              />
              <span className=" text-0-75-500 text-gray-1">행정용</span>
            </div>
          </div>
        </div>
        <BoxedTableWrapper columns={tableColumns} data={tableData} />
      </div>
    </>
  );
}

function CodeEditForm() {
  const [formState, setFormState] = useState<Record<string, unknown>>({});
  return (
    <>
      <div className="text-1-700 text-xl mb-8">
        (행정용) 대림아파트앞(연희동 산66-2) 수정화면
      </div>
      <FlexibleForm
        fields={formFields}
        rightOptions={rightOptions}
        formState={formState}
        setFormState={setFormState}
      />
    </>
  );
}

export default CodeEditForm;
