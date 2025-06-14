'use client';
import Header from '@/components/layout/header';
import { CommonTable } from '@/components/layout/commonTable';
import { useState } from 'react';
import Image from 'next/image';

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
    title: '공지사항 제목',
    contents: '공지사항 내용입니다.',
    status: '활성화',
    created_at: '2025-05-30',
  },
];
const faqData = {
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

export default function CustomerService() {
  const [tab, setTab] = useState<'상담' | '자주묻는질문' | '공지사항'>(
    '자주묻는질문'
  );
  // 자주묻는질문 서브카테고리 필요시 state 추가 가능

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
              </div>
              <CommonTable
                columns={columnsByTab['자주묻는질문']}
                data={faqData['공공디자인']}
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
              </div>
              <CommonTable
                columns={columnsByTab['자주묻는질문']}
                data={faqData['현수막디자인']}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <CommonTable
              columns={columnsByTab[tab]}
              data={tab === '상담' ? 상담데이터 : 공지데이터}
            />
          </div>
        )}
      </div>
    </div>
  );
}
