'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function SignIn() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [pwError, setPwError] = useState('');

  // 비밀번호 유효성 검사 함수
  const validatePassword = (pw: string) => {
    if (pw.length < 8) return '비밀번호는 8자 이상이어야 합니다.';
    if (
      !/[A-Za-z]/.test(pw) ||
      !/[0-9]/.test(pw) ||
      !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(pw)
    ) {
      return '영문, 숫자, 특수문자를 모두 포함해야 합니다.';
    }
    return '';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPwError(validatePassword(value));
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-[27rem] flex flex-col items-center">
        <div className="text-2-265-600 mt-12 mb-8">로그인</div>
        {/* 아이디 인풋 */}
        <div className="flex items-center w-full h-[4rem] bg-white rounded mb-3 px-4 border border-gray-200">
          <Image
            src="/svg/login-user.svg"
            alt="아이디"
            width={20}
            height={20}
            className="h-[1.25rem] w-[1.25rem] mr-2"
          />
          <input
            type="text"
            placeholder="아이디를 적어주세요."
            className="flex-1 bg-transparent outline-none text-1-100"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        {/* 비밀번호 인풋 */}
        <div className="flex flex-col w-full">
          <div className="flex items-center h-[4rem] bg-white rounded px-4 border border-gray-200">
            <Image
              src="/svg/login-password.svg"
              alt="비밀번호"
              width={20}
              height={20}
              className="h-[1.25rem] w-[1.25rem] mr-2"
            />
            <input
              type="password"
              placeholder="비밀번호를 적어주세요."
              className="flex-1 bg-transparent outline-none text-1-100"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {pwError && (
            <div className="text-red-500 text-1-500 mt-1 ml-2">{pwError}</div>
          )}
        </div>
        {/* 로그인 버튼 */}
        <button
          className="w-full h-[4rem] bg-black text-white text-1-25-500 rounded mb-3 mt-4"
          disabled={!!pwError || !userId || !password}
        >
          로그인
        </button>
        {/* 카카오 로그인 버튼 */}
        <button className="w-full h-[4rem] flex items-center justify-center bg-[#FEE500] text-1-25-500 rounded mb-3">
          <Image
            src="/svg/kakao-icon.svg"
            alt="카카오"
            width={28}
            height={26}
            className="h-[1.625rem] w-[1.76rem] mr-2"
          />
          카카오로 로그인
        </button>
      </div>
    </div>
  );
}
