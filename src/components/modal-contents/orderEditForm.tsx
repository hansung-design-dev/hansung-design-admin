import React, { useState } from 'react';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import { BoxedTableWrapper } from '../table/boxedTableWrapper';
import { TableColumn } from '../layout/commonTable';
import { DistrictRow } from '@/app/order-status/page';

type OrderFormState = Partial<
  DistrictRow & {
    company_info: string;
    fax_no: string;
    phone: string;
    mobile_no: string;
    email: string;
    industrial_complex: string;
    representative: string;
    business_no: string;
    display_contents: string;
    note: string;
    is_keep_banner: boolean;
    is_order_requested: boolean;
    is_print_except_draft: boolean;
    deposit_amount: string;
    reserved_date: string;
    confirmed_date: string;
    transaction_id: string;
  }
>;

interface OrderEditFormProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  selectedRow: DistrictRow | null;
}

function OrderEditForm<T>({
  columns,
  data,
  selectedRow,
}: OrderEditFormProps<T>) {
  const [formState, setFormState] = useState<OrderFormState>(selectedRow || {});
  const handleCheckboxChange = (
    key: keyof OrderFormState,
    checked: boolean
  ) => {
    setFormState((prev: OrderFormState) => ({ ...prev, [key]: checked }));
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev: OrderFormState) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-h-[60vh] overflow-y-auto pr-4">
      {/* 1. 기본 정보 */}
      <div className="grid grid-cols-3 gap-x-8 gap-y-2 mb-4">
        {/* 신청일자 */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500 w-20">신청일자</span>
          <input
            type="text"
            placeholder="명칭(위치명)을 입력해주세요."
            name="order_at"
            value={formState['order_at']}
            onChange={handleInputChange}
            className="w-[7rem] placeholder:text-xs value:text-xs border-b outline-none bg-transparent border-gray-2"
          />
        </label>
        {/* 신청번호 */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500 w-20">신청번호</span>
          <input
            type="text"
            placeholder="명칭(위치명)을 입력해주세요."
            name="id"
            value={formState['id']}
            onChange={handleInputChange}
            className="w-[7rem] placeholder:text-xs value:text-xs border-b outline-none bg-transparent border-gray-2"
          />
        </label>
        {/* 사업자정보 */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500 w-20">사업자정보</span>
          <input
            type="text"
            placeholder="명칭(위치명)을 입력해주세요."
            name="company_info"
            value={formState['company_info']}
            onChange={handleInputChange}
            className="w-[7rem] placeholder:text-xs value:text-xs border-b outline-none bg-transparent border-gray-2"
          />
        </label>
        {/* 성명 */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500 w-20">성명</span>
          <input
            type="text"
            placeholder="명칭(위치명)을 입력해주세요."
            name="applicant_name"
            value={formState['applicant_name']}
            onChange={handleInputChange}
            className="w-[7rem] placeholder:text-xs value:text-xs border-b outline-none bg-transparent border-gray-2"
          />
        </label>
        {/* 사업자 생년월일 */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500 w-20">사업자 생년월일</span>
          <input
            type="text"
            placeholder="명칭(위치명)을 입력해주세요."
            name="birthdate"
            value={formState['birthdate']}
            onChange={handleInputChange}
            className="w-[7rem] placeholder:text-xs value:text-xs border-b outline-none bg-transparent border-gray-2"
          />
        </label>
        {/* 팩스번호 */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500 w-20">팩스번호</span>
          <input
            type="text"
            placeholder="명칭(위치명)을 입력해주세요."
            name="fax_no"
            value={formState['fax_no']}
            onChange={handleInputChange}
            className="w-[7rem] placeholder:text-xs value:text-xs border-b outline-none bg-transparent border-gray-2"
          />
        </label>
        {/* 전화번호 */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500 w-20">전화번호</span>
          <input
            type="text"
            placeholder="명칭(위치명)을 입력해주세요."
            name="phone"
            value={formState['phone']}
            onChange={handleInputChange}
            className="w-[8rem] placeholder:text-xs value:text-xs border-b outline-none bg-transparent border-gray-2"
          />
        </label>
        {/* 부서 업체명 */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500 w-20">부서 업체명</span>
          <input
            type="text"
            placeholder="명칭(위치명)을 입력해주세요."
            name="company_name"
            value={formState['company_name']}
            onChange={handleInputChange}
            className="w-[7rem] placeholder:text-xs value:text-xs border-b outline-none bg-transparent border-gray-2"
          />
        </label>
        {/* 체크박스 영역 */}
        <div className="col-span-1 ">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="is_keep_banner"
                checked={!!formState['is_keep_banner']}
                onChange={(e) =>
                  handleCheckboxChange('is_keep_banner', e.target.checked)
                }
              />
              <label htmlFor="is_keep_banner" className="text-0-75-500">
                철거시 현수막보관
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="is_order_requested"
                checked={!!formState['is_order_requested']}
                onChange={(e) =>
                  handleCheckboxChange('is_order_requested', e.target.checked)
                }
              />
              <label htmlFor="is_order_requested" className="text-0-75-500">
                제작(설치)의뢰
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="is_approved"
                checked={!!formState['is_approved']}
                onChange={(e) =>
                  handleCheckboxChange('is_approved', e.target.checked)
                }
              />
              <label htmlFor="is_approved" className="text-0-75-500">
                검수완료
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="is_instock"
                checked={!!formState['is_instock']}
                onChange={(e) =>
                  handleCheckboxChange('is_instock', e.target.checked)
                }
              />
              <label htmlFor="is_instock" className="text-0-75-500">
                현수막입고(전체)
              </label>
            </div>
          </div>
        </div>
        {/* 주소 */}
        <label className="flex pb-2 items-center gap-2 col-span-3">
          <span className="text-0-75-500 w-20">주소</span>
          <input
            type="text"
            name="display_address"
            value={formState['display_address']}
            onChange={handleInputChange}
            className="placeholder:text-xs value:text-xs border-b outline-none bg-transparent border-gray-2 w-[50%]"
          />
        </label>
        {/* 이메일 */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500 w-20">이메일</span>
          <input
            type="text"
            placeholder="명칭(위치명)을 입력해주세요."
            name="email"
            value={formState['email']}
            onChange={handleInputChange}
            className="w-[7rem] placeholder:text-xs value:text-xs border-b outline-none bg-transparent border-gray-2"
          />
        </label>
        {/* 핸드폰 */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500 w-20">핸드폰</span>
          <input
            type="text"
            placeholder="명칭(위치명)을 입력해주세요."
            name="mobile_no"
            value={formState['mobile_no']}
            onChange={handleInputChange}
            className="w-[7rem] placeholder:text-xs value:text-xs border-b outline-none bg-transparent border-gray-2"
          />
        </label>
        <div />
        {/* 게시시설공업소 */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500 w-20">게시시설공업소</span>
          <input
            type="text"
            placeholder="명칭(위치명)을 입력해주세요."
            name="industrial_complex"
            value={formState['industrial_complex']}
            onChange={handleInputChange}
            className="w-[7rem] placeholder:text-xs value:text-xs border-b outline-none bg-transparent border-gray-2"
          />
        </label>
        {/* 대표자 */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500 w-20">대표자</span>
          <input
            type="text"
            placeholder="명칭(위치명)을 입력해주세요."
            name="representative"
            value={formState['representative']}
            onChange={handleInputChange}
            className="w-[7rem] placeholder:text-xs value:text-xs border-b outline-none bg-transparent border-gray-2"
          />
        </label>
        <div />
        {/* 등록번호 */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500 w-20">등록번호</span>
          <input
            type="text"
            placeholder="명칭(위치명)을 입력해주세요."
            name="business_no"
            value={formState['business_no']}
            onChange={handleInputChange}
            className="w-[7rem] placeholder:text-xs value:text-xs border-b outline-none bg-transparent border-gray-2"
          />
        </label>
        {/* 전화번호 */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500 w-20">전화번호</span>
          <input
            type="text"
            placeholder="명칭(위치명)을 입력해주세요."
            name="phone_no"
            value={formState['phone_no']}
            onChange={handleInputChange}
            className="w-[8rem] placeholder:text-xs value:text-xs border-b outline-none bg-transparent border-gray-2"
          />
        </label>
      </div>
      {/* 2. 광고 내용, 특이사항 */}
      <div className="mb-4">
        {/* 광고내용 */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 grow">
            <span className="text-0-75-500 w-20 shrink-0">광고내용</span>
            <input
              type="text"
              placeholder="명칭(위치명)을 입력해주세요."
              name="display_contents"
              value={formState['display_contents']}
              onChange={handleInputChange}
              className="w-full placeholder:text-xs value:text-xs border-b outline-none bg-transparent border-gray-2"
            />
          </label>
          <div className="flex gap-2 shrink-0">
            <Button size="S" className="text-0-75-500">
              시안보기
            </Button>
            <Button size="S" className="text-0-75-500">
              시안등록
            </Button>
            <Button size="S" className="text-0-75-500">
              시안삭제
            </Button>
          </div>
        </div>

        {/* 특이사항 */}
        <div className="flex items-start gap-4 mt-4 w-full">
          <label className="flex items-start gap-2 grow">
            <span className="text-0-75-500 w-20 shrink-0 mt-2">특이사항</span>
            <textarea
              id="note"
              name="note"
              rows={3}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder:text-xs value:text-xs"
              placeholder="명칭(위치명)을 입력해주세요."
              value={formState['note']}
              onChange={handleInputChange}
            />
          </label>
          <div className="flex flex-col gap-4 shrink-0">
            <div className="flex items-center gap-2 ">
              <Checkbox
                id="is_print_except_draft"
                checked={!!formState['is_print_except_draft']}
                onChange={(e) =>
                  handleCheckboxChange(
                    'is_print_except_draft',
                    e.target.checked
                  )
                }
              />
              <label htmlFor="is_print_except_draft" className="text-0-75-500">
                시안제외 인쇄
              </label>
            </div>
            <Button
              size="ML"
              className="text-0-75-500 w-[13rem]"
              colorStyles="white"
            >
              첨부등록
            </Button>
          </div>
        </div>
      </div>
      {/* 3. 입금 정보 */}
      <div className="grid grid-cols-4 gap-x-8 gap-y-4 mb-4 pt-4">
        {/* 신청일자 (ReadOnly) */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500">신청일자</span>
          <input
            type="text"
            value={formState['order_at'] || '2025-03-17'}
            readOnly
            className="w-[5rem] border-b text-xs value:text-xs outline-none bg-transparent border-gray-2"
          />
        </label>
        {/* 입금자명 (ReadOnly) */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500">입금자명</span>
          <input
            type="text"
            value={formState['depositor_name'] || '홍길동'}
            readOnly
            className="w-[5rem] border-b text-xs value:text-xs outline-none bg-transparent border-gray-2 placeholder:text-xs"
          />
        </label>
        {/* 입금일자 (ReadOnly) */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500">입금일자</span>
          <input
            type="text"
            value={formState['depositor_date'] || '2025-03-17'}
            readOnly
            className="w-[5rem] border-b text-xs value:text-xs outline-none bg-transparent border-gray-2"
          />
        </label>
        {/* 입금금액 (ReadOnly) */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500">입금금액</span>
          <input
            type="text"
            value={formState['deposit_amount'] || '279,600원'}
            readOnly
            className="w-[5rem] border-b text-xs value:text-xs outline-none bg-transparent border-gray-2"
          />
        </label>
        {/* 신청자ID (ReadOnly) */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500">신청자ID</span>
          <input
            type="text"
            value={formState['applicant_id'] || '2025-03-17'}
            readOnly
            className="w-[5rem] border-b text-xs value:text-xs outline-none bg-transparent border-gray-2"
          />
        </label>
        {/* 예약년월 (ReadOnly) */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500">예약년월</span>
          <input
            type="text"
            value={formState['reserved_date'] || '홍길동홍길동'}
            readOnly
            className="w-[5rem] border-b text-xs value:text-xs outline-none bg-transparent border-gray-2"
          />
        </label>
        {/* 확인일자 (ReadOnly) */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500">확인일자</span>
          <input
            type="text"
            value={formState['confirmed_date'] || '2025-03-17'}
            readOnly
            className="w-[5rem] border-b text-xs value:text-xs outline-none bg-transparent border-gray-2"
          />
        </label>
      </div>
      <div className="flex gap-[15rem] mb-4 ">
        <Button size="M" className="text-0-75-500">
          증빙정보수정
        </Button>
        <Button size="M" className="text-0-75-500">
          입금취소관리
        </Button>
      </div>
      {/* 4. 결제방법, 거래번호 */}
      <div className="grid grid-cols-4 gap-x-8 gap-y-4 mb-8">
        {/* 결제방법 (ReadOnly) */}
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500">결제방법</span>
          <input
            type="text"
            value={formState['payment_method'] || '무통장입금'}
            readOnly
            className="w-[5rem] border-b text-xs value:text-xs outline-none bg-transparent border-gray-2"
          />
        </label>
        <label className="flex pb-2 items-center gap-2">
          <span className="text-0-75-500">거래번호</span>
          <input
            type="text"
            value={formState['payment_method'] || '무통장입금'}
            readOnly
            className="w-[5rem] border-b text-xs value:text-xs outline-none bg-transparent border-gray-2"
          />
        </label>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Button size="M" className="text-0-75-500 mb-4">
            + 추가
          </Button>
          <Button size="M" className="text-0-75-500 mb-4">
            - 삭제
          </Button>
          <Button size="M" className="text-0-75-500 mb-4">
            유휴연수복사
          </Button>
        </div>
        <Button size="S" className="text-0-75-500 mb-4">
          면생성
        </Button>
      </div>
      <BoxedTableWrapper columns={columns} data={data} />
    </div>
  );
}
export default OrderEditForm;
