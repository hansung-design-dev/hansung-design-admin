'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface MenuContextType {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  // SSR/CSR hydration mismatch 방지: 초기값은 ''로 두고, useEffect에서 localStorage 값으로 갱신
  const [selectedMenu, setSelectedMenuState] = useState<string>('');

  // 클라이언트에서만 localStorage 접근
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('selectedMenu');
      if (stored) setSelectedMenuState(stored);
    }
  }, []);

  // setter에서 localStorage에도 저장
  const setSelectedMenu = (menu: string) => {
    setSelectedMenuState(menu);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedMenu', menu);
    }
  };

  return (
    <MenuContext.Provider value={{ selectedMenu, setSelectedMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within a MenuProvider');
  return context;
}
