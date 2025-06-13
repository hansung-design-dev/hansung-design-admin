import Button from '@/components/ui/button';
import React from 'react';

interface ModalProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
  footer?: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onClose,
  footer,
  className = '',
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div
      className={`bg-white rounded-lg shadow-lg w-full max-w-3xl p-8 relative ${className}`}
    >
      {/* 닫기 버튼 (Button 컴포넌트로 고정) */}
      <Button
        size="S"
        className="absolute top-4 right-4"
        onClick={onClose}
        aria-label="닫기"
      >
        닫기
      </Button>

      {/* 제목 */}
      {title && <div className="text-1-700 mb-8">{title}</div>}
      {/* 내용 */}
      <div>{children}</div>
      {/* 하단 버튼 등 */}
      {footer && <div className="mt-8 flex justify-center">{footer}</div>}
    </div>
  </div>
);

export default Modal;
