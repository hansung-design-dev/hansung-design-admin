'use client';
import Header from '@/components/layout/header';
import { CommonTable, TableColumn } from '@/components/layout/commonTable';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface DigitalSignageRow {
  id: string;
  product_name: string;
  thumbnail: string;
  description: string;
  note: string;
  detail: string;
}

const digitalSignageColumns: TableColumn<DigitalSignageRow>[] = [
  { key: 'id', header: '코드', minWidth: '8rem', maxWidth: '8rem' },
  {
    key: 'product_name',
    header: '상품명',
    minWidth: '10rem',
    maxWidth: '10rem',
    className: 'text-center align-middle',
  },
  {
    key: 'thumbnail',
    header: '썸네일',
    minWidth: '17rem',
    maxWidth: '17rem',
    render: (row) => (
      <div className="flex items-center justify-center ">
        <Image
          src={row.thumbnail}
          alt={row.product_name}
          style={{
            width: 200,
            height: 200,
            objectFit: 'cover',
            borderRadius: 4,
          }}
          width={200}
          height={200}
        />
      </div>
    ),
  },
  {
    key: 'description',
    header: '설명',
    minWidth: '30rem',
    maxWidth: '30rem',
    render: (row) => (
      <div className="text-center align-middle whitespace-pre-line break-words line-clamp-5">
        {row.description}
      </div>
    ),
  },
  {
    key: 'note',
    header: '유의사항',
    minWidth: '30rem',
    maxWidth: '30rem',
    render: (row) => (
      <div className="text-center align-middle whitespace-pre-line break-words line-clamp-5">
        {row.note}
      </div>
    ),
  },
  { key: 'detail', header: '상세페이지', minWidth: '30rem', maxWidth: '30rem' },
];

const digitalSignageRow: DigitalSignageRow[] = [
  {
    id: '0000001',
    product_name: 'smart01',
    thumbnail: '/image/rectangle.png',
    description:
      '내용을 미리 볼 수 있는 곳입니다. 미리볼 수 있는 내용은 최대 5줄이며 넘어갈 경우에는 이런식으로 점점점이 나오게 부탁드립니다, 내용을 미리 볼 수 있는 곳입니다. 미리볼 수 있는 내용은 최대 5줄이며 넘어갈 경우에는 이런식으로 점점점이 나오게 부탁드립니다',
    note: '내용을 미리 볼 수 있는 곳입니다. 미리볼 수 있는 내용은 최대 5줄이며 넘어갈 경우에는 이런식으로 점점점이 나오게 부탁드립니다,내용을 미리 볼 수 있는 곳입니다. 미리볼 수 있는 내용은 최대 5줄이며 넘어갈 경우에는 이런식으로 점점점이 나오게 부탁드립니다,내용을 미리 볼 수 있는 곳입니다. 미리볼 수 있는 내용은 최대 5줄이며 넘어갈 경우에는 이런식으로 점점점이 나오게 부탁드립니다',
    detail: '상세페이지',
  },
  {
    id: '0000002',
    product_name: 'smart02',
    thumbnail: '/image/rectangle.png',
    description:
      '내용을 미리 볼 수 있는 곳입니다. 미리볼 수 있는 내용은 최대 5줄이며 넘어갈 경우에는 이런식으로 점점점이 나오게 부탁드립니다',
    note: '내용을 미리 볼 수 있는 곳입니다. 미리볼 수 있는 내용은 최대 5줄이며 넘어갈 경우에는 이런식으로 점점점이 나오게 부탁드립니다',
    detail: '상세페이지',
  },
];

export default function PublicDesign() {
  const router = useRouter();
  const handleListRowClick = (row: DigitalSignageRow) => {
    router.push(`/public-design/${row.id}`);
  };
  return (
    <div className="pt-16">
      <Header />
      <div className="pt-16 px-8 ml-[5rem]">
        <div className="flex justify-between items-center">
          <CommonTable
            columns={digitalSignageColumns}
            data={digitalSignageRow}
            tableRowClick={handleListRowClick}
          />
        </div>
      </div>
    </div>
  );
}
