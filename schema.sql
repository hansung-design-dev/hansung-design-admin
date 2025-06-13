-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. board_schedule – 게시 일정 (전반기/하반기)
CREATE TABLE board_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  district_name TEXT NOT NULL, -- ex. 서대문구
  category TEXT NOT NULL, -- 'banner' 또는 'led'
  this_month_first_half_start DATE,
  this_month_first_half_end DATE,
  this_month_second_half_start DATE,
  this_month_second_half_end DATE,
  this_month_deadline_count INT DEFAULT 0,
  next_month_first_half_start DATE,
  next_month_first_half_end DATE,
  next_month_second_half_start DATE,
  next_month_second_half_end DATE,
  next_month_deadline_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 2. board_zone – 게시 위치 상세 (해당 자치구의 동별 게시대 정보)
CREATE TABLE board_zone (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL, -- 'banner' 또는 'led'
  schedule_id UUID REFERENCES board_schedule(id) ON DELETE CASCADE,
  district_name TEXT NOT NULL,
  location_name TEXT, -- 위치명
  has_photo BOOLEAN DEFAULT FALSE,
  has_location BOOLEAN DEFAULT FALSE,
  has_map BOOLEAN DEFAULT FALSE,
  neighborhood TEXT, -- 행정동
  posting_days TEXT,
  price NUMERIC,
  size TEXT,
  face_count INT,
  deadline_count INT,
  is_for_admin BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- 3. board_face_usage – 추가된 면 사용 내역
CREATE TABLE board_face_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_id UUID REFERENCES board_zone(id) ON DELETE CASCADE,
  face_number INT,
  usage_type TEXT, -- 예: 광고/행정용
  attach_date DATE,
  unit_price NUMERIC,
  fee NUMERIC,
  is_active BOOLEAN DEFAULT TRUE,
  is_deadline BOOLEAN DEFAULT FALSE,
  business_name TEXT
);

-- 4. popup_notice – 안내 팝업 리스트
CREATE TABLE popup_notice (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  is_active BOOLEAN DEFAULT TRUE,
  title TEXT,
  show_once BOOLEAN DEFAULT FALSE,
  content TEXT,
  image_url TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 5. board_guidelines – 유의사항 및 안내사항
CREATE TABLE board_guidelines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL, -- 'banner', 'led'
  notes TEXT,
  application_period TEXT,
  application_method TEXT,
  account_info TEXT,
  guide_file_url TEXT,
  basic_notice TEXT,
  caution_notice TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- 6. applications – 신청 현황 메인 테이블
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_number TEXT NOT NULL,
  applicant_name TEXT,
  birthdate DATE,
  phone TEXT,
  company_name TEXT,
  quantity INT,
  total_amount NUMERIC,
  applicant_id TEXT, -- 유저 식별자
  depositor_name TEXT,
  deposit_date DATE,
  is_paid BOOLEAN DEFAULT FALSE,
  is_checked BOOLEAN DEFAULT FALSE,
  invoice_issued_at DATE,
  invoice_file TEXT,
  payment_method TEXT,
  email TEXT,
  category TEXT NOT NULL, -- 'banner' 또는 'led'
  display_id UUID,        -- 게시대 상세 참조 (banner/led 모두)
  received_at TIMESTAMP,
  has_proof BOOLEAN DEFAULT FALSE,
  inspection_status TEXT,
  warehouse_status TEXT,
  is_selected BOOLEAN DEFAULT FALSE,
  location_address TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 7. application_details – 신청 세부항목 테이블
CREATE TABLE application_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  code TEXT,
  board_name TEXT,
  face_count INT,
  start_date DATE,
  remove_date DATE,
  unit_price NUMERIC,
  fee NUMERIC,
  amount NUMERIC,
  category TEXT NOT NULL, -- 'banner' 또는 'led'
  board_zone_id UUID,     -- 게시대 상세 참조
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  CONSTRAINT fk_board_zone
    FOREIGN KEY (board_zone_id)
    REFERENCES board_zone(id)
    ON DELETE CASCADE
);

-- 8. application_meta – 신청서 정보 등록/수정용 확장 테이블
CREATE TABLE application_meta (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  application_date DATE,
  applicant_birthdate DATE,
  business_info TEXT,
  department_or_company TEXT,
  fax_number TEXT,
  mobile TEXT,
  construction_company TEXT,
  ceo_name TEXT,
  registration_number TEXT,
  office_phone TEXT,
  ad_content TEXT,
  notes TEXT,
  deposit_amount NUMERIC,
  reservation_month DATE,
  confirmation_date DATE,
  transaction_number TEXT,
  store_after_removal BOOLEAN DEFAULT FALSE,
  request_production BOOLEAN DEFAULT FALSE,
  inspection_done BOOLEAN DEFAULT FALSE,
  banner_received BOOLEAN DEFAULT FALSE,
  exclude_proof BOOLEAN DEFAULT FALSE,
  proof_url TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX idx_applications_category ON applications(category);
CREATE INDEX idx_application_details_category ON application_details(category);
CREATE INDEX idx_board_zone_category ON board_zone(category);
CREATE INDEX idx_applications_display_id ON applications(display_id);
CREATE INDEX idx_application_details_board_zone_id ON application_details(board_zone_id);

-- Add comments for better documentation
COMMENT ON TABLE applications IS '신청 현황 메인 테이블 - banner/led display 모두 관리';
COMMENT ON TABLE application_details IS '신청 세부항목 테이블 - 각 신청의 상세 정보';
COMMENT ON TABLE board_zone IS '게시 위치 상세 테이블 - banner/led display 공용';
COMMENT ON TABLE application_meta IS '신청서 정보 등록/수정용 확장 테이블'; 