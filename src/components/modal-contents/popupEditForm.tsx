import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Editor } from '@tinymce/tinymce-react';

interface DistrictRow {
  isUsing: string;
  title: string;
  period: string;
  content?: string;
}

interface PopupEditFormProps {
  selectedRow?: DistrictRow | null;
  isEdit?: boolean;
}

export default function PopupEditForm({
  selectedRow,
  isEdit = false,
}: PopupEditFormProps) {
  const [formData, setFormData] = useState<DistrictRow>({
    isUsing: '',
    title: '',
    period: '',
    content: '',
  });

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [content, setContent] = useState('');
  const editorRef = useRef<{ getContent: () => string } | null>(null);

  useEffect(() => {
    if (selectedRow && isEdit) {
      setFormData(selectedRow);
      setContent(selectedRow.content || '');
      // 기존 period에서 시작일과 끝일 분리
      const periodParts = selectedRow.period.split(' ~ ');
      if (periodParts.length === 2) {
        setStartDate(periodParts[0]);
        setEndDate(periodParts[1]);
      }
    } else {
      setFormData({
        isUsing: '',
        title: '',
        period: '',
        content: '',
      });
      setContent('');
      setStartDate('');
      setEndDate('');
    }
  }, [selectedRow, isEdit]);

  const handleInputChange = (field: keyof DistrictRow, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    if (type === 'start') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  const handleContentChange = (content: string) => {
    setContent(content);
    setFormData((prev) => ({
      ...prev,
      content: content,
    }));
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <label className="w-20 text-0-875-500 text-gray-1">사용여부</label>
          <input
            type="text"
            value={formData.isUsing}
            onChange={(e) => handleInputChange('isUsing', e.target.value)}
            placeholder="사용여부를 입력하세요"
            className="flex-1 border border-gray-2 rounded px-3 py-2 text-0-875-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-20 text-0-875-500 text-gray-1">타이틀</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="타이틀을 입력하세요"
            className="flex-1 border border-gray-2 rounded px-3 py-2 text-0-875-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-20 text-0-875-500 text-gray-1">팝업기간</label>
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1">
              <input
                type="date"
                value={startDate}
                onChange={(e) => handleDateChange('start', e.target.value)}
                className="w-full border border-gray-2 rounded px-3 py-2 text-0-875-500 pr-10"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Image
                  src="/svg/calendar.svg"
                  alt="달력"
                  width={16}
                  height={16}
                />
              </div>
            </div>
            <span className="text-0-875-500 text-gray-1">~</span>
            <div className="relative flex-1">
              <input
                type="date"
                value={endDate}
                onChange={(e) => handleDateChange('end', e.target.value)}
                className="w-full border border-gray-2 rounded px-3 py-2 text-0-875-500 pr-10"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Image
                  src="/svg/calendar.svg"
                  alt="달력"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-0-875-500 text-gray-1">내용</label>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={content}
            onEditorChange={handleContentChange}
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
    </div>
  );
}
