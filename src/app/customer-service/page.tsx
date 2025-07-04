'use client';
import Header from '@/components/layout/header';
import { CommonTable } from '@/components/layout/commonTable';
import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/modal-contents/modal';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';

// 컬럼 정의
const columnsByTab = {
  상담: [
    { key: 'id', header: 'no', minWidth: '8rem', maxWidth: '8rem' },
    { key: 'title', header: '제목', minWidth: '30rem', maxWidth: '30rem' },
    {
      key: 'contents',
      header: '내용',
      minWidth: '30rem',
      maxWidth: '30rem',
      render: (row: { contents: string }) => (
        <div className="text-center align-middle whitespace-pre-line break-words line-clamp-5">
          {row.contents}
        </div>
      ),
    },
    { key: 'status', header: '상태', minWidth: '8rem', maxWidth: '8rem' },
    {
      key: 'created_at',
      header: '작성일',
      minWidth: '10rem',
      maxWidth: '10rem',
    },
  ],
  공지사항: [
    { key: 'id', header: 'no', minWidth: '8rem', maxWidth: '8rem' },
    { key: 'title', header: '제목', minWidth: '30rem', maxWidth: '30rem' },
    {
      key: 'contents',
      header: '내용',
      minWidth: '30rem',
      maxWidth: '30rem',
      render: (row: { contents: string }) => (
        <div className="text-center align-middle whitespace-pre-line break-words line-clamp-5">
          {row.contents}
        </div>
      ),
    },
    { key: 'status', header: '상태', minWidth: '8rem', maxWidth: '8rem' },
    {
      key: 'created_at',
      header: '작성일',
      minWidth: '10rem',
      maxWidth: '10rem',
    },
  ],
  자주묻는질문: [
    { key: 'id', header: 'no', minWidth: '8rem', maxWidth: '8rem' },
    {
      key: 'question',
      header: '자주묻는 질문',
      minWidth: '30rem',
      maxWidth: '30rem',
    },
    {
      key: 'answer',
      header: '답변 내용',
      minWidth: '30rem',
      maxWidth: '30rem',
      render: (row: { answer: string }) => (
        <div className="text-center align-middle whitespace-pre-line break-words line-clamp-5">
          {row.answer}
        </div>
      ),
    },
    { key: 'status', header: '상태', minWidth: '8rem', maxWidth: '8rem' },
    {
      key: 'created_at',
      header: '작성일',
      minWidth: '10rem',
      maxWidth: '10rem',
    },
  ],
};

// 더미 데이터
const 상담데이터 = [
  {
    id: '01',
    title: '신청은 어떻게 하나요?',
    contents: '상담 내용입니다.',
    status: '활성화',
    created_at: '2025-05-30',
  },
  {
    id: '02',
    title: '결제가 두번 된 것 같아요! ㅠㅠ',
    contents: '상담 내용입니다.',
    status: '비활성화',
    created_at: '2025-05-30',
  },
];
const 공지데이터 = [
  {
    id: '01',
    title: '공지사항',
    contents: '공지사항 내용입니다.',
    status: '활성화',
    created_at: '2025-05-30',
  },
];
const initialFaqData = {
  공공디자인: [
    {
      id: '01',
      question: '신청은 어떻게 하나요?',
      answer:
        '내용을 미리 볼 수 있는 곳입니다. 미리볼 수 있는 내용은 최대 3줄이며 넘어갈 경우에는 이런식으로 점점점이 나오게 부탁드립니다 ...',
      status: '활성화',
      created_at: '2025-05-30',
    },
    {
      id: '02',
      question: '결제가 두번 된 것 같아요! ㅠㅠ',
      answer:
        '내용을 미리 볼 수 있는 곳입니다. 미리볼 수 있는 내용은 최대 3줄이며 넘어갈 경우에는 이런식으로 점점점이 나오게 부탁드립니다 ...',
      status: '비활성화',
      created_at: '2025-05-30',
    },
  ],
  현수막디자인: [
    {
      id: '01',
      question: '신청은 어떻게 하나요?',
      answer:
        '내용을 미리 볼 수 있는 곳입니다. 미리볼 수 있는 내용은 최대 3줄이며 넘어갈 경우에는 이런식으로 점점점이 나오게 부탁드립니다 ...',
      status: '활성화',
      created_at: '2025-05-30',
    },
    {
      id: '02',
      question: '결제가 두번 된 것 같아요! ㅠㅠ',
      answer:
        '내용을 미리 볼 수 있는 곳입니다. 미리볼 수 있는 내용은 최대 3줄이며 넘어갈 경우에는 이런식으로 점점점이 나오게 부탁드립니다 ...',
      status: '비활성화',
      created_at: '2025-05-30',
    },
  ],
};

// 타입 정의

type 상담Row = (typeof 상담데이터)[number];
type 공지Row = (typeof 공지데이터)[number];
type FAQRow = (typeof initialFaqData)['공공디자인'][number];
type RowType = 상담Row | 공지Row | FAQRow;

export default function CustomerService() {
  const [tab, setTab] = useState<'상담' | '자주묻는질문' | '공지사항'>(
    '자주묻는질문'
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RowType | null>(null);
  const [answerValue, setAnswerValue] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [faqDataState, setFaqDataState] = useState(initialFaqData);
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [faqEditMode, setFaqEditMode] = useState<'add' | 'edit'>('add');
  const [faqEditCategory, setFaqEditCategory] = useState<
    '공공디자인' | '현수막디자인'
  >('공공디자인');
  const [faqEditIndex, setFaqEditIndex] = useState<number | null>(null);
  const [faqForm, setFaqForm] = useState<FAQRow>({
    id: '',
    question: '',
    answer: '',
    status: '활성화',
    created_at: '',
  });

  // row click handler
  const handleRowClick = (row: RowType) => {
    setSelectedRow(row);
    setAnswerValue((row as FAQRow).answer || '');
    setIsAnswered(false);
    setModalOpen(true);
  };

  // FAQ 추가 버튼 클릭
  const handleAddFaq = (category: '공공디자인' | '현수막디자인') => {
    setFaqEditMode('add');
    setFaqEditCategory(category);
    setFaqEditIndex(null);
    setFaqForm({
      id: '',
      question: '',
      answer: '',
      status: '활성화',
      created_at: new Date().toISOString().slice(0, 10),
    });
    setFaqModalOpen(true);
  };

  // FAQ row 클릭 시 수정 모달
  const handleFaqRowClick = (
    row: FAQRow,
    idx: number,
    category: '공공디자인' | '현수막디자인'
  ) => {
    setFaqEditMode('edit');
    setFaqEditCategory(category);
    setFaqEditIndex(idx);
    setFaqForm({ ...row });
    setFaqModalOpen(true);
  };

  // FAQ 저장
  const handleSaveFaq = () => {
    setFaqDataState((prev) => {
      const newData = { ...prev };
      if (faqEditMode === 'add') {
        const newId = (newData[faqEditCategory].length + 1)
          .toString()
          .padStart(2, '0');
        newData[faqEditCategory] = [
          {
            ...faqForm,
            id: newId,
            created_at: new Date().toISOString().slice(0, 10),
          },
          ...newData[faqEditCategory],
        ];
      } else if (faqEditMode === 'edit' && faqEditIndex !== null) {
        newData[faqEditCategory] = newData[faqEditCategory].map((item, idx) =>
          idx === faqEditIndex ? { ...faqForm } : item
        );
      }
      return newData;
    });
    setFaqModalOpen(false);
  };

  // FAQ 삭제
  const handleDeleteFaq = () => {
    if (faqEditMode === 'edit' && faqEditIndex !== null) {
      setFaqDataState((prev) => {
        const newData = { ...prev };
        newData[faqEditCategory] = newData[faqEditCategory].filter(
          (_, idx) => idx !== faqEditIndex
        );
        return newData;
      });
    }
    setFaqModalOpen(false);
  };

  // FAQ 폼 입력 핸들러
  const handleFaqFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFaqForm((prev) => ({ ...prev, [name]: value }));
  };

  // FAQ 상태 토글
  const handleFaqStatusToggle = () => {
    setFaqForm((prev) => ({
      ...prev,
      status: prev.status === '활성화' ? '비활성화' : '활성화',
    }));
  };

  // 팝업 내용 렌더링
  const renderPopupContent = () => {
    if (!selectedRow) return null;
    // FAQRow: question/answer, 상담/공지: title/contents
    const isFAQ = (row: RowType): row is FAQRow => 'question' in row;
    if (isFAQ(selectedRow)) {
      return (
        <div className="flex flex-col gap-6 w-full items-end">
          <div className="flex flex-col gap-6 w-full items-start">
            <div className="text-1-700 mb-8 border-b-[#E1E1E1] border-b-1 pb-4 w-full">
              {selectedRow.question}
            </div>
            <div className="w-full">
              <textarea
                className="w-full h-[15rem] border border-gray-2 rounded px-2 py-1 resize-none text-0-75-500"
                placeholder="내용을 입력해주세요."
                value={selectedRow.answer}
                readOnly
                rows={5}
              />
            </div>
            {/* 답변 입력/완료 UI */}
            {!isAnswered ? (
              <div className="w-full">
                <textarea
                  className="w-full h-[15rem] border border-gray-2 rounded px-2 py-1 resize-none text-0-75-500"
                  placeholder="내용을 입력해주세요."
                  value={answerValue}
                  onChange={(e) => setAnswerValue(e.target.value)}
                  rows={5}
                />
              </div>
            ) : (
              <div className="w-full bg-[#F9F9F9] rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-4 items-center">
                    <span className="text-0-75-500 text-gray-2">답변완료</span>
                    <span className="text-0-75-500 text-gray-2">
                      {selectedRow.created_at}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="S"
                      className="text-0-75-500"
                      onClick={() => setIsAnswered(false)}
                    >
                      수정
                    </Button>
                    <Button size="S" className="text-0-75-500">
                      삭제
                    </Button>
                  </div>
                </div>
                <textarea
                  className="w-full h-[10rem] border border-gray-2 rounded px-2 py-1 resize-none text-0-75-500 bg-[#F9F9F9]"
                  value={answerValue}
                  readOnly
                  rows={5}
                />
              </div>
            )}
          </div>
          {!isAnswered && (
            <Button
              size="S"
              colorStyles="black"
              className="text-1-700 w-[5rem] h-[2.5rem]"
              onClick={() => setIsAnswered(true)}
            >
              답변하기
            </Button>
          )}
        </div>
      );
    } else {
      return (
        <div className="flex flex-col gap-6 w-full items-end">
          <div className="flex flex-col gap-6 w-full items-start">
            <div className="text-1-700 mb-8 border-b-[#E1E1E1] border-b-1 pb-4 w-full">
              {selectedRow.title}
            </div>
            <div className="w-full">
              <textarea
                className="w-full h-[15rem] border border-gray-2 rounded px-2 py-1 resize-none text-0-75-500"
                placeholder="내용을 입력해주세요."
                value={selectedRow.contents}
                readOnly
                rows={5}
              />
            </div>
            {/* 답변 입력/완료 UI */}
            {!isAnswered ? (
              <div className="w-full">
                <textarea
                  className="w-full h-[15rem] border border-gray-2 rounded px-2 py-1 resize-none text-0-75-500"
                  placeholder="내용을 입력해주세요."
                  value={answerValue}
                  onChange={(e) => setAnswerValue(e.target.value)}
                  rows={5}
                />
              </div>
            ) : (
              <div className="w-full bg-[#F9F9F9] rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-4 items-center">
                    <span className="text-0-75-500 text-gray-2">답변완료</span>
                    <span className="text-0-75-500 text-gray-2">
                      {selectedRow.created_at}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="S"
                      className="text-0-75-500"
                      onClick={() => setIsAnswered(false)}
                    >
                      수정
                    </Button>
                    <Button size="S" className="text-0-75-500">
                      삭제
                    </Button>
                  </div>
                </div>
                <textarea
                  className="w-full h-[10rem] border border-gray-2 rounded px-2 py-1 resize-none text-0-75-500 bg-[#F9F9F9]"
                  value={answerValue}
                  readOnly
                  rows={5}
                />
              </div>
            )}
          </div>
          {!isAnswered && (
            <Button
              size="S"
              colorStyles="black"
              className="text-1-700 w-[5rem] h-[2.5rem]"
              onClick={() => setIsAnswered(true)}
            >
              답변하기
            </Button>
          )}
        </div>
      );
    }
  };

  return (
    <div className="pt-16">
      <Header />
      <div className="pt-16 px-8 ml-[5rem]">
        {/* 탭 UI */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          {['1:1 상담', '자주묻는 질문', '공지사항'].map((name, idx) => (
            <button
              key={name}
              className={`pb-2 px-4 text-lg font-semibold border-b-2 transition-colors duration-200 ${
                (tab === '상담' && idx === 0) ||
                (tab === '자주묻는질문' && idx === 1) ||
                (tab === '공지사항' && idx === 2)
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-400'
              }`}
              onClick={() =>
                setTab(
                  idx === 0 ? '상담' : idx === 1 ? '자주묻는질문' : '공지사항'
                )
              }
            >
              {name}
            </button>
          ))}
        </div>
        {/* 테이블 렌더링 */}
        {tab === '자주묻는질문' ? (
          <div className="flex flex-col gap-12">
            {/* 공공디자인 FAQ */}
            <div>
              <div className="flex items-center gap-[1.1rem] bg-gray-3 font-semibold text-lg mb-2 px-4 py-2 rounded">
                <span className="text-0-875-500">공공디자인</span>
                <Image
                  src="/svg/arrow-down.svg"
                  alt="arrow down"
                  width={20}
                  height={20}
                  className="text-0-875-500"
                />
                <Button
                  size="S"
                  className="ml-auto text-0-75-500"
                  onClick={() => handleAddFaq('현수막디자인')}
                >
                  추가
                </Button>
              </div>
              <CommonTable
                columns={columnsByTab['자주묻는질문']}
                data={faqDataState['공공디자인']}
                tableRowClick={(row, idx) =>
                  handleFaqRowClick(row, idx, '공공디자인')
                }
              />
            </div>
            {/* 현수막디자인 FAQ */}
            <div>
              <div className="flex items-center gap-[1.1rem] bg-gray-3 font-semibold text-lg mb-2 px-4 py-2 rounded">
                <span className="text-0-875-500">현수막디자인</span>
                <Image
                  src="/svg/arrow-down.svg"
                  alt="arrow down"
                  width={20}
                  height={20}
                  className="text-0-875-500"
                />
                <Button
                  size="S"
                  className="ml-auto text-0-75-500"
                  onClick={() => handleAddFaq('현수막디자인')}
                >
                  추가
                </Button>
              </div>
              <CommonTable
                columns={columnsByTab['자주묻는질문']}
                data={faqDataState['현수막디자인']}
                tableRowClick={(row, idx) =>
                  handleFaqRowClick(row, idx, '현수막디자인')
                }
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <CommonTable
              columns={columnsByTab[tab]}
              data={tab === '상담' ? 상담데이터 : 공지데이터}
              tableRowClick={handleRowClick}
            />
          </div>
        )}
        {/* 팝업 모달 */}
        {modalOpen && (
          <Modal
            className="w-full"
            title={tab === '자주묻는질문' ? '질문/답변 상세' : ''}
            onClose={() => setModalOpen(false)}
          >
            {renderPopupContent()}
          </Modal>
        )}
        {/* FAQ 추가/수정 모달 */}
        {faqModalOpen && (
          <Modal
            className="w-full"
            title={faqEditMode === 'add' ? 'FAQ 추가' : 'FAQ 수정'}
            onClose={() => setFaqModalOpen(false)}
          >
            <div className="flex flex-col gap-4 w-full">
              <div className="mb-2">
                <span className="text-sm text-gray-600">
                  카테고리: {faqEditCategory}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">질문</label>
                <input
                  type="text"
                  name="question"
                  value={faqForm.question}
                  onChange={handleFaqFormChange}
                  className="w-full border-b bg-transparent outline-none placeholder:text-xs text-xs border-gray-2 py-1"
                  placeholder="질문을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">답변</label>
                <textarea
                  name="answer"
                  value={faqForm.answer}
                  onChange={handleFaqFormChange}
                  className="w-full border-b bg-transparent outline-none placeholder:text-xs text-xs border-gray-2 py-1 min-h-[6rem]"
                  placeholder="답변을 입력하세요"
                  rows={5}
                />
              </div>
              <div className="flex items-center gap-4 mt-2">
                <label className="block text-sm font-medium">상태</label>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={faqForm.status === '활성화'}
                    onChange={handleFaqStatusToggle}
                  />
                  <span className="text-sm">활성화</span>
                </div>
              </div>
              <div className="flex gap-2 justify-end mt-6">
                {faqEditMode === 'edit' && (
                  <Button size="S" colorStyles="gray" onClick={handleDeleteFaq}>
                    삭제
                  </Button>
                )}
                <Button size="S" colorStyles="black" onClick={handleSaveFaq}>
                  저장
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
