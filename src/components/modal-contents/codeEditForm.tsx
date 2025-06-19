import React, { useState } from 'react';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import LabelInput from '../layout/labelInput';
import { BoxedTableWrapper } from '../table/boxedTableWrapper';
import { TableColumn } from '../layout/commonTable';

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

// 확장된 필드 타입
interface InputWithButtonsField {
  type: 'inputWithButtons';
  key: string;
  label: string;
  placeholder?: string;
  buttons: FieldButton[];
}
interface CustomField {
  type: 'custom';
  render: () => React.ReactNode;
}
interface CheckboxField {
  type: 'checkbox';
  key: string;
  label: string;
}
type FlexibleField =
  | (FormField & { type?: 'input' })
  | InputWithButtonsField
  | CustomField
  | CheckboxField;

function FlexibleForm({
  leftFields,
  rightFields,
  formState,
  setFormState,
}: {
  leftFields: FlexibleField[];
  rightFields: FlexibleField[];
  formState: Record<string, unknown>;
  setFormState: (s: Record<string, unknown>) => void;
}) {
  return (
    <div className="flex gap-8">
      {/* 왼쪽 영역 */}
      <div className="flex-1 flex flex-col gap-4 text-gray-1">
        {leftFields.map((field, i) => {
          if (field.type === 'inputWithButtons') {
            return (
              <div key={field.key} className="flex items-center gap-2">
                <LabelInput
                  label={field.label}
                  placeholder={field.placeholder}
                  value={(formState[field.key] as string) || ''}
                  onChange={(e) =>
                    setFormState({ ...formState, [field.key]: e.target.value })
                  }
                  labelClassName="w-[3rem] text-sm"
                  className="w-[8rem] placeholder:text-sm border-b"
                />
                {field.buttons.map((btn) => (
                  <Button key={btn.key} size="S" className="text-0-75-500">
                    {btn.label}
                  </Button>
                ))}
              </div>
            );
          }
          if (field.type === 'custom') {
            return <div key={i}>{field.render()}</div>;
          }
          // 기본 input
          return (
            <LabelInput
              key={field.key}
              label={field.label}
              {...('placeholder' in field
                ? { placeholder: field.placeholder }
                : {})}
              value={(formState[field.key] as string) || ''}
              onChange={(e) =>
                setFormState({ ...formState, [field.key]: e.target.value })
              }
              className="w-[10rem] border-b"
            />
          );
        })}
      </div>
      {/* 오른쪽 영역 */}
      <div className="w-[350px] flex flex-col gap-2 text-0-75-500 text-gray-1">
        {rightFields.map((field, i) => {
          if (field.type === 'checkbox') {
            return (
              <div key={field.key} className="flex items-center gap-2 mb-2">
                <Checkbox
                  checked={!!formState[field.key]}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      [field.key]: e.target.checked,
                    })
                  }
                />
                <span>{field.label}</span>
              </div>
            );
          }
          if (field.type === 'custom') {
            return <div key={i}>{field.render()}</div>;
          }
          // 기본 input
          return (
            <LabelInput
              key={field.key}
              label={field.label}
              {...('placeholder' in field
                ? { placeholder: field.placeholder }
                : {})}
              value={(formState[field.key] as string) || ''}
              onChange={(e) =>
                setFormState({ ...formState, [field.key]: e.target.value })
              }
              className="w-[10rem] border-b"
            />
          );
        })}
      </div>
    </div>
  );
}

interface CodeEditFormProps<T> {
  columns: TableColumn<T>[];
  data: T[];
}

function CodeEditForm<T>({ columns, data }: CodeEditFormProps<T>) {
  const [formState, setFormState] = useState<Record<string, unknown>>({});
  return (
    <>
      <div className="text-1-700 text-xl mb-8"></div>
      <div className="flex items-center gap-8 mb-4">
        <LabelInput
          label="위치명"
          placeholder="입력해주세요."
          value={(formState['location'] as string) || ''}
          onChange={(e) =>
            setFormState({ ...formState, location: e.target.value })
          }
          labelClassName="text-sm"
          className="w-[10rem] border-b placeholder:text-sm"
        />
        <LabelInput
          label="넘버"
          placeholder="입력해주세요."
          value={(formState['post_code'] as string) || ''}
          onChange={(e) =>
            setFormState({ ...formState, post_code: e.target.value })
          }
          labelClassName="text-sm"
          className="w-[10rem] border-b placeholder:text-sm"
        />
        <LabelInput
          label="행정동"
          placeholder="입력해주세요."
          value={(formState['region_dong'] as string) || ''}
          onChange={(e) =>
            setFormState({ ...formState, region_dong: e.target.value })
          }
          labelClassName="text-sm"
          className="w-[10rem] border-b placeholder:text-sm"
        />
      </div>
      <FlexibleForm
        leftFields={[
          {
            type: 'inputWithButtons',
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
            type: 'inputWithButtons',
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
            type: 'inputWithButtons',
            key: 'map',
            label: '지도',
            placeholder: '입력해주세요.',
            buttons: [
              { label: '지도 보기', key: 'mapView' },
              { label: '수정', key: 'mapEdit' },
              { label: '삭제', key: 'mapDelete' },
            ],
          },
        ]}
        rightFields={[
          {
            type: 'input',
            key: 'installation_date',
            label: '게시',
            placeholder: '입력해주세요.',
          },
          {
            type: 'custom',
            render: () => (
              <div className="flex items-center gap-2">
                <span className="w-[7rem]">규격(가로 x 세로)</span>
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={(formState['post_width'] as string) || ''}
                    onChange={(e) =>
                      setFormState({ ...formState, post_width: e.target.value })
                    }
                    className="w-[3rem] border-b border-gray-2 bg-transparent text-right px-1"
                  />
                  <span>px x</span>
                  <input
                    type="text"
                    value={(formState['post_height'] as string) || ''}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        post_height: e.target.value,
                      })
                    }
                    className="w-[3rem] border-b border-gray-2 bg-transparent text-right px-1"
                  />
                  <span>px</span>
                </div>
              </div>
            ),
          },
          {
            type: 'input',
            key: 'price',
            label: '금액',
            placeholder: '입력해주세요.',
          },
          {
            type: 'custom',
            render: () => (
              <div className="flex items-center gap-4 py-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={!!formState['is_bulk_close']}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        is_bulk_close: e.target.checked,
                      })
                    }
                  />
                  <span>일괄마감</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={!!formState['is_for_admin']}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        is_for_admin: e.target.checked,
                      })
                    }
                  />
                  <span>행정용</span>
                </div>
              </div>
            ),
          },
        ]}
        formState={formState}
        setFormState={setFormState}
      />
      <div className="mb-8"></div>
      <BoxedTableWrapper columns={columns} data={data} />
    </>
  );
}

export default CodeEditForm;
