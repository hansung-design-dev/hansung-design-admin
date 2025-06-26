import React from 'react';
import Button from '@/components/ui/button';

interface DeleteConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

export default function DeleteConfirmModal({
  onConfirm,
  onCancel,
  message = '정말 삭제하시겠습니까?',
}: DeleteConfirmModalProps) {
  return (
    <div className="flex flex-col items-center gap-6 p-6 w-[70%] mx-auto">
      <div className="text-center">
        <p className="text-1-500 text-gray-1">{message}</p>
      </div>
      <div className="flex gap-4">
        <Button size="M" colorStyles="gray" onClick={onCancel} className="w-24">
          취소
        </Button>
        <Button
          size="M"
          colorStyles="black"
          onClick={onConfirm}
          className="w-24"
        >
          확인
        </Button>
      </div>
    </div>
  );
}
