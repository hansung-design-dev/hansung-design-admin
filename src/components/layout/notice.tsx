/**
 * Notice 컴포넌트
 *
 * 배너 디스플레이 페이지의 유의사항 섹션을 관리하는 컴포넌트입니다.
 *
 * 주요 기능:
 * - 드롭다운으로 섹션 선택 (안내사항-기본안내, 제한사항-기본안내 등)
 * - TinyMCE 에디터로 텍스트 스타일링
 * - 실시간 미리보기
 * - JSON 형태로 DB 저장
 */
'use client';
import React, { useState, useRef } from 'react';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import Image from 'next/image';
import { BoxedTableWrapper } from '@/components/table/boxedTableWrapper';
import Dropdown from '@/components/ui/dropdown';
import { Editor } from '@tinymce/tinymce-react';

interface NoticeProps {
  className?: string;
}

interface NoticeSection {
  id: string;
  title: string;
  subTitle: string;
  content: string;
  style?: Record<string, unknown>;
}

interface NoticeData {
  [key: string]: NoticeSection;
}

export default function Notice({ className = '' }: NoticeProps) {
  const [isPosted, setIsPosted] = useState(false);
  const [additionalContent, setAdditionalContent] = useState(false);
  const [selectedSection, setSelectedSection] = useState('basic');
  const editorRef = useRef<{ getContent: () => string } | null>(null);

  // 드롭다운 옵션
  const sectionOptions = [
    { value: 'basic', label: '안내사항 - 기본안내' },
    { value: 'additional', label: '안내사항 - 추가안내' },
    { value: 'restrictions', label: '제한사항 - 기본안내' },
    { value: 'restrictions-additional', label: '제한사항 - 추가안내' },
    { value: 'precautions', label: '유의사항 - 기본안내' },
  ];

  // 초기 데이터 (실제로는 DB에서 가져올 데이터)
  const [noticeData, setNoticeData] = useState<NoticeData>({
    basic: {
      id: 'basic',
      title: '안내사항',
      subTitle: '기본안내',
      content:
        '문의처 : 송파구 게시대 담당자 02-719-0093 / (주)한성디자인 02-3272-1452<br/>게첨방법 : (주)한성디자인 기획에서 탈부착 (게시대는 맨위쪽 1면, 아래로 내려오면서 2,3,4입니다.)',
    },
    additional: {
      id: 'additional',
      title: '안내사항',
      subTitle: '추가안내',
      content: '게첨사진은 웹하드에서 확인하실 수 있습니다.',
    },
    restrictions: {
      id: 'restrictions',
      title: '제한사항',
      subTitle: '기본안내',
      content:
        '현수막 표시내용의 금지 제안, 하상법 위반 등 현수막 표시내용의 금지 제안, 하상법 위반 등',
    },
    'restrictions-additional': {
      id: 'restrictions-additional',
      title: '제한사항',
      subTitle: '추가안내',
      content: '',
    },
    precautions: {
      id: 'precautions',
      title: '유의사항',
      subTitle: '기본안내',
      content: '',
    },
  });

  // 현재 선택된 섹션 데이터
  const currentSection = noticeData[selectedSection];

  // 에디터 내용 변경 핸들러
  const handleEditorChange = (content: string) => {
    setNoticeData((prev) => ({
      ...prev,
      [selectedSection]: {
        ...prev[selectedSection],
        content,
      },
    }));
  };

  // 저장 핸들러
  const handleSave = () => {
    const sectionData = noticeData[selectedSection];

    // JSON 형태로 저장할 데이터 구조
    const saveData = {
      id: sectionData.id,
      title: sectionData.title,
      subTitle: sectionData.subTitle,
      content: sectionData.content,
      style: {
        // 여기에 추가 스타일 정보가 들어갈 수 있음
        lastModified: new Date().toISOString(),
        editor: 'tinymce',
      },
    };

    console.log('Saving to DB:', saveData);
    // 여기서 실제 DB 저장 로직 추가
  };

  // 세부안내 테이블 데이터
  const taxColumns = [
    { key: 'row_column_type', header: '행/열구분' },
    { key: 'total_price', header: '총납부액' },
    { key: 'tax_price', header: '허가수수료' },
    { key: 'road_usage_fee', header: '도로사용료' },
    { key: 'advertising_price', header: '광고대행료' },
  ];

  const taxData = [
    {
      row_column_type: '열합치기',
      total_price: 111000,
      tax_price: 1000,
      road_usage_fee: 33000,
      advertising_price: 67000,
    },
    {
      row_column_type: '행합치기',
      total_price: 123000,
      tax_price: 1000,
      road_usage_fee: 22600,
      advertising_price: 90400,
    },
    {
      row_column_type: '행합치기',
      total_price: 123000,
      tax_price: 1000,
      road_usage_fee: 22600,
      advertising_price: 90400,
    },
  ];

  return (
    <div className={`flex gap-8 ${className}`}>
      {/* 왼쪽 편집 영역 */}
      <div className="flex-1">
        <div className="border border-gray-2 rounded-lg p-4">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-1-700 font-semibold">유의사항 편집</h3>
            <Button
              size="S"
              colorStyles="default"
              onClick={handleSave}
              className="text-0-75-500 text-black"
            >
              저장하기
            </Button>
          </div>

          {/* 섹션 선택 드롭다운 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-1 mb-2">
              편집할 섹션 선택
            </label>
            <Dropdown
              options={sectionOptions}
              value={selectedSection}
              onChange={setSelectedSection}
              className="w-full"
            />
          </div>

          {/* TinyMCE 에디터 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-1 mb-2">
              {currentSection?.title} - {currentSection?.subTitle}
            </label>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              value={currentSection?.content || ''}
              onEditorChange={handleEditorChange}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'advlist',
                  'autolink',
                  'lists',
                  'link',
                  'image',
                  'charmap',
                  'preview',
                  'anchor',
                  'searchreplace',
                  'visualblocks',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'code',
                  'help',
                  'wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
            />
          </div>
        </div>

        {/* 세부안내 섹션 */}
        <div className="mt-8 border border-gray-2 rounded-lg p-4">
          <div className="text-1-700 mb-4">세부안내</div>

          {/* 기타안내 입력 */}
          <div className="w-full justify-start items-center flex gap-4 py-7 text-0-75-500 text-gray-1">
            <label htmlFor="additionalContent">기타안내</label>
            <input
              type="text"
              id="additionalContent"
              value={additionalContent ? 'true' : 'false'}
              onChange={(e) => {
                setAdditionalContent(e.target.checked);
              }}
              placeholder="내용을 입력하세요"
              className="border-gray-2 border-b-[0.1rem] w-[50%]"
            />
          </div>

          {/* 버튼 영역 */}
          <div className="flex flex-col md:flex-row items-start md:items-center mb-4 text-0-75-500 text-gray-1 lg:gap-6 md:gap-0">
            <div className="flex gap-1">
              <Button
                size="SM"
                className="flex gap-2 text-0-75-500"
                colorStyles="gray"
              >
                <Image src="/svg/plus.svg" alt="추가" width={12} height={12} />
                열추가
              </Button>
              <Button
                size="SM"
                className="flex gap-2 text-0-75-500"
                colorStyles="gray"
              >
                <Image src="/svg/minus.svg" alt="삭제" width={12} height={12} />
                열삭제
              </Button>
            </div>

            <div className="flex gap-1">
              <Button
                size="SM"
                className="flex gap-2 text-0-75-500"
                colorStyles="gray"
              >
                <Image src="/svg/plus.svg" alt="추가" width={12} height={12} />
                행추가
              </Button>
              <Button
                size="SM"
                className="flex gap-2 text-0-75-500"
                colorStyles="gray"
              >
                <Image src="/svg/minus.svg" alt="삭제" width={12} height={12} />
                행삭제
              </Button>
            </div>
          </div>

          {/* 테이블 */}
          <BoxedTableWrapper
            columns={taxColumns}
            data={taxData}
            className="px-0"
            headerClassName="border-b-1 border-gray-2 pb-1"
          />

          {/* 하단 기타안내 */}
          <div className="w-full justify-start items-center flex gap-4 py-7 text-0-75-500 text-gray-1">
            <label htmlFor="additionalContent2">기타안내</label>
            <input
              type="text"
              id="additionalContent2"
              value={additionalContent ? 'true' : 'false'}
              onChange={(e) => {
                setAdditionalContent(e.target.checked);
              }}
              placeholder="내용을 입력하세요"
              className="border-gray-2 border-b-[0.1rem] w-[50%]"
            />
            <Button
              size="S"
              colorStyles="default"
              className="text-0-75-500 text-black"
            >
              변경하기
            </Button>
          </div>

          {/* 하단 안내 */}
          {additionalContent && (
            <div className="mt-8">
              <div className="text-1-700 mb-4">하단 안내</div>

              <div className="flex flex-col gap-4 text-0-75-500 text-gray-1">
                <div className="flex gap-16">
                  <span className="w-16">카피</span>
                  <input
                    type="text"
                    placeholder="  내용을 입력하세요"
                    className="border-b-[0.05rem] border-gray-2 w-full placeholder:text-gray-1"
                  />
                </div>
                <div className="flex gap-16 items-center">
                  <span className="w-16">게시여부</span>
                  <div className="flex gap-2 justify-between w-full">
                    <div className="flex flex-col gap-2 items-start">
                      <Checkbox
                        className="w-[1.5rem] h-[1.5rem]"
                        checked={isPosted}
                        onChange={(e) => {
                          setIsPosted(e.target.checked);
                        }}
                      />
                      <span className="text-gray-1 text-0-75-400">
                        *현재 홈페이지에 안내 중입니다
                      </span>
                    </div>
                    <Button
                      size="S"
                      colorStyles="gray"
                      className="text-0-75-500"
                    >
                      수정
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 오른쪽 미리보기 영역 */}
      <div className="w-80 border max-h-[31rem] border-gray-2 rounded-lg p-4">
        <h3 className="text-1-700 font-semibold mb-4">미리보기</h3>
        <div className="h-[20rem] overflow-y-auto">
          {currentSection?.content ? (
            <div
              className="text-0-875-500 text-gray-1"
              dangerouslySetInnerHTML={{ __html: currentSection.content }}
            />
          ) : (
            <div className="text-0-875-500 text-gray-3 text-center py-8">
              미리보기
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
