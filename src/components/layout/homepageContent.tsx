import LabelInput from './labelInput';
//import Checkbox from '@/components/ui/checkbox';
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/button';
import Modal from '@/components/modal-contents/modal';
import DeleteConfirmModal from '@/components/modal-contents/deleteConfirmModal';
import Dropdown from '@/components/ui/dropdown';

interface HomepageContentData {
  id: number;
  title: string;
  image: string | null;
  logoImage: string | null;
  cardImage: string | null;
  mainTitle: string;
  subTitle1: string;
  subTitle2: string;
  description: string;
  description1: string;
}

interface HomepageContentProps {
  id: number;
  title: string;
  onDelete?: (id: number) => void;
  onSave?: (data: HomepageContentData) => void;
}

function HomepageContent({
  id,
  title,
  onDelete,
  onSave,
}: HomepageContentProps) {
  const [image, setImage] = useState<string | null>(null);
  const [mainTitle, setMainTitle] = useState('');
  const [subTitle2, setSubTitle2] = useState('');
  const [description, setDescription] = useState('');
  const [description1, setDescription1] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'save' | 'delete'>('save');

  // 드롭다운 옵션들
  const titleOptions = [
    { value: '메인', label: '메인' },
    { value: '공공디자인', label: '공공디자인' },
    { value: '디지털샤이니지', label: '디지털샤이니지' },
    { value: 'LED전자게시대', label: 'LED전자게시대' },
  ];

  const [selectedTitle, setSelectedTitle] = useState(title);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleTitleChange = (value: string) => {
    setSelectedTitle(value);
    setSelectedCategory(value); // 제목 선택 시 분류도 같이 설정
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const data: HomepageContentData = {
      id,
      title: selectedTitle,
      image,
      logoImage: null,
      cardImage: null,
      mainTitle,
      subTitle1: selectedCategory,
      subTitle2,
      description,
      description1,
    };
    onSave?.(data);
    setModalType('save');
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    setModalType('delete');
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete?.(id);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full px-[2rem] mt-8 ml-6 min-w-[400px]">
      {/* 상단 헤더 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Dropdown
            options={titleOptions}
            value={selectedTitle}
            onChange={handleTitleChange}
            className="w-32"
          />
        </div>
        <div className="flex gap-2">
          <Button
            size="S"
            colorStyles="gray"
            className="text-0-75-500"
            onClick={handleSave}
          >
            저장
          </Button>
          <Button
            size="S"
            colorStyles="gray"
            className="text-0-75-500"
            onClick={handleDelete}
          >
            삭제
          </Button>
        </div>
      </div>

      {/* 사진 등록 */}
      <LabelInput
        label="사진 등록"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        labelClassName="text-0-75-500 w-[6rem]"
        containerClassName="items-center gap-2"
        className="text-gray-500 text-0-75-500"
      />
      {image && (
        <div className="w-64 h-40 relative">
          <Image
            src={image}
            alt="미리보기"
            fill
            className="object-cover rounded "
          />
        </div>
      )}
      {/* 입력 폼 */}
      <LabelInput
        label="메인타이틀"
        value={mainTitle}
        onChange={(e) => setMainTitle(e.target.value)}
        placeholder="입력하세요."
        labelClassName="text-0-75-500 w-[6rem]"
        containerClassName="items-center gap-2"
        className="text-0-75-500"
      />
      <div className="flex gap-8">
        <label className="block mb-1 text-gray-700 text-0-75-500 w-[4.5rem]">
          분류
        </label>
        <div className="text-gray-400 text-0-75-500">{selectedCategory}</div>
      </div>
      <div className="flex gap-8">
        <label className="block mb-1 text-gray-700 text-0-75-500 w-[5rem]">
          서브타이틀 2
        </label>
        <textarea
          className="w-full min-h-[48px] border border-gray-2 rounded px-2 py-1 resize-none text-0-75-500"
          placeholder="입력하세요."
          value={subTitle2}
          onChange={(e) => setSubTitle2(e.target.value)}
        />
      </div>
      <div className="flex gap-8">
        <label className="mb-1 text-gray-700 text-0-75-500 w-[5rem]">
          설명
        </label>
        <textarea
          className="w-full min-h-[48px] border border-gray-2 rounded px-2 py-1 resize-none text-0-75-500"
          placeholder="입력하세요."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <LabelInput
        label="설명1 (선택)"
        value={description1}
        onChange={(e) => setDescription1(e.target.value)}
        placeholder="추가 설명이 있다면 입력하세요"
        labelClassName="text-0-75-500 w-[6rem]"
        containerClassName="items-center gap-4"
        className="text-0-75-500 w-full"
      />
      {/* URL */}

      {/* 배너 예시 이미지 */}
      <div>
        <span className="block mb-2 font-semibold text-0-75-500">
          배너 예시 이미지
        </span>
        <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded">
          <span className="text-gray-400 text-0-75-500">예시 이미지 영역</span>
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <Modal
          title={modalType === 'save' ? '저장 완료' : '삭제 확인'}
          onClose={handleCloseModal}
          footer={
            modalType === 'save' ? (
              <Button
                size="L"
                colorStyles="black"
                className="w-[20rem]"
                onClick={handleCloseModal}
              >
                확인
              </Button>
            ) : null
          }
        >
          {modalType === 'save' && (
            <div className="p-6 text-center">
              <p className="text-1-500">저장되었습니다.</p>
            </div>
          )}
          {modalType === 'delete' && (
            <DeleteConfirmModal
              onConfirm={handleDeleteConfirm}
              onCancel={handleCloseModal}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

export default HomepageContent;
