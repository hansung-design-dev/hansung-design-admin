'use client';
import Header from '@/components/layout/header';
import Title from '@/components/layout/title';
import TextUpdate from '@/components/layout/textUpdate';
import LabelInput from '@/components/layout/labelInput';
import Button from '@/components/ui/button';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import PopupEdit from '@/components/layout/popupEdit';

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png'];
function isImageFile(file: File) {
  const ext = file.name.split('.').pop()?.toLowerCase();
  return ext && IMAGE_EXTENSIONS.includes(ext);
}

export default function DigitalSignageDetail() {
  const params = useParams();
  const id = params.id as string;
  const handleListRowClick = () => {};
  const [previewUrls, setPreviewUrls] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);
  const [fileNames, setFileNames] = useState<string[]>(['', '', '']);
  const [errors, setErrors] = useState<string[]>(['', '', '']);

  const handleThumbnailChange =
    (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      let error = '';
      let fileName = '';
      if (file) {
        fileName = file.name;
        if (!isImageFile(file)) {
          error =
            '이미지 파일(jpg, jpeg, png, gif, webp, bmp)만 업로드 가능합니다.';
        } else {
          const reader = new FileReader();
          reader.onload = (event) => {
            const newPreviewUrls = [...previewUrls];
            newPreviewUrls[idx] = event.target?.result as string;
            setPreviewUrls(newPreviewUrls);
          };
          reader.readAsDataURL(file);
        }
      }
      const newFileNames = [...fileNames];
      newFileNames[idx] = fileName;
      setFileNames(newFileNames);
      const newErrors = [...errors];
      newErrors[idx] = error;
      setErrors(newErrors);
    };

  return (
    <div className="pt-8 md:pt-16">
      <Header breadcrumbs={['공공디자인']} />
      <div>
        <Title title={id} />
      </div>
      <div>
        <div className="flex ml-[7rem] pt-16 gap-16">
          {/* 코드/썸네일 입력 라인 */}
          <div className="flex flex-col items-start gap-2 mb-8">
            {/* 코드 입력 */}
            <LabelInput
              label="코드"
              type="file"
              accept="image/*"
              placeholder={'입력해주세요'}
              className="placeholder:text-0-75-500 text-0-75-500 text-gray-1"
              labelClassName="text-0-75-500 text-gray-1"
              containerClassName="w-[20rem] gap-15 text-0-75-500 text-gray-1 placeholder:text-center placeholder:text-0-75-500 items-center"
            />
            {/* 썸네일 입력 + 버튼 */}
            <div className="flex ">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="flex flex-col items-start mb-8">
                  <div className="flex items-center gap-2 w-[30rem]">
                    <LabelInput
                      label="썸네일"
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange(idx)}
                      placeholder={fileNames[idx] || '첨부파일 불러오기'}
                      className="placeholder:text-0-75-500 text-0-75-500 text-gray-1"
                      labelClassName="text-0-75-500 text-gray-1"
                      containerClassName="w-[20rem] gap-12 text-0-75-500 text-gray-1 placeholder:text-center placeholder:text-0-75-500"
                    />
                    <Button size="S" className="text-0-75-700">
                      변경하기
                    </Button>
                  </div>
                  {/* 썸네일 미리보기 */}
                  <div className="flex gap-4 mt-2">
                    <span className="mb-2 text-0-75-500 text-gray-1">
                      썸네일 미리보기
                    </span>
                    <div className="w-[150px] h-[150px] bg-gray-200 flex items-end justify-start relative">
                      {previewUrls[idx] ? (
                        <Image
                          src={previewUrls[idx]!}
                          alt="썸네일 미리보기"
                          className="object-cover w-full h-full rounded-lg"
                          width={150}
                          height={150}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                      {errors[idx] && (
                        <span className="text-red-500 text-0-5-500 absolute bottom-0 left-0">
                          {errors[idx]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="px-4 md:px-8 ml-0 md:ml-[5rem] w-[70%] mt-4 flex flex-col gap-4">
            <TextUpdate subTitle="추가안내" buttonName="변경하기" />
            <TextUpdate subTitle="유의사항" buttonName="변경하기" />
          </div>
          <PopupEdit
            handleListRowClick={handleListRowClick}
            columns={[
              { key: 'id', header: 'no' },
              { key: 'file_name', header: '파일명' },
            ]}
            data={[
              { id: 1, file_name: 'test.jpg' },
              { id: 2, file_name: 'test2.jpg' },
              { id: 3, file_name: 'test3.jpg' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
