-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";



-- 1. Display Category
CREATE TABLE display_categories (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name TEXT NOT NULL, -- '현수막게시대, banner_display', 'LED전자게시대 led_display', '공공디자인' public-design, '디지털사이니지 digital-signage'
description TEXT,
created_at TIMESTAMP DEFAULT now()
);

-- + 구, 행정동 테이블 생성 필요
--2. gu dong
CREATE TABLE region_gu (
id UUID PRIMART KEY DEFAULT gen_random_uuid(),
name TEXT enum('강북구','','','','',)
logo_image TEXT
)

CREATE TABLE region_dong (
id UUID PRIMART KEY DEFAULT gen_random_uuid(),
gu_id UUID REFERENCES gu(id)
name TEXT enum('대현동','','','','',)
)

-- 2. Product (게시대 상세) 현수막게시대, LED전자게시대
-- 현수막게시대 only : 행정용, 규격, 
-- LED전자게시대 only : 노출수량 


-- 3. 현수막 게시대 메타데이터 테이블.
CREATE TABLE panel_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_category_id UUID REFERENCES display_categories(id),
    post_code TEXT UNIQUE NOT NULL, -- 게시대 고유 코드 (예: BP001, BP002)
    region_gu_id UUID REFERENCES region_gu(id),  -- 구 테이블
    region_dong_id UUID REFERENCES region_gu(id), -- 행정동
    address TEXT NOT NULL, -- 상세 주소
    photo_url TEXT, -- 사진 URL
    location TEXT,
    map TEXT,
    latitude DECIMAL(10, 8), -- 위도
    longitude DECIMAL(11, 8), -- 경도
    max_banners INTEGER DEFAULT 5, -- 최대 현수막 수용 개수
    post_height DECIMAL(5, 2), -- 게시대 높이 (미터)
    post_width DECIMAL(5, 2), -- 게시대 너비 (미터)
    installation_date DATE, -- 게시대 설치일
    is_for_admin BOOLEAN DEFAULT FALSE, -- 현수막게시대-행정용 only **
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'maintenance', 'inactive')),
    maintenance_notes TEXT, -- 유지보수 메모
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- (게시대 구단위) 스케줄이라는게 제목에 명시되게.(이 db에는 구 x2 만큼의 갯수가 들어가니 - 확인해보기, 현수막 LED에 어떤 구가 있는지))
-- 4.스케줄메타데이터.
CREATE TABLE region_gu_display_periods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_category_id UUID REFERENCES display_categories(id), -- 현수막, LED
  region_gu_id UUID REFERENCES region_gu(id),    -- 구 이름 (예: 서대문구)
  first_half_from DATE,                              -- 전반기 시작일
  first_half_to DATE,                                -- 전반기 종료일
  first_half_closure_quantity INT DEFAULT 0,           -- 전반기 마감수
  second_half_from DATE,                             -- 하반기 시작일
  second_half_to DATE,                               -- 하반기 종료일
  second_half_closure_quantity INT DEFAULT 0,          -- 하반기 마감수
  next_first_half_from DATE,                         -- 다음 전반기 시작일
  next_first_half_to DATE,                           -- 다음 전반기 종료일
  next_first_half_closure_quantity INT DEFAULT 0,      -- 다음 전반기 마감수
  next_second_half_from DATE,                        -- 다음 하반기 시작일
  next_second_half_to DATE,                          -- 다음 하반기 종료일
  next_second_half_closure_quantity INT DEFAULT 0,     -- 다음 하반기 마감수
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);



-- 6. 현수막 자리(층) 각 면 하나하나에 대한 메타데이터 테이블
CREATE TABLE panel_slot_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    panel_info_id UUID NOT NULL REFERENCES panel_info(id) ON DELETE CASCADE,
    slot_number INTEGER NOT NULL CHECK (slot_number BETWEEN 1 AND 5), -- 1(최상단) ~ 5(최하단)
    slot_name TEXT, -- 자리 이름 (예: "상단", "중단", "하단" 등)
    max_width DECIMAL(5, 2), -- 해당 자리 최대 너비 (미터)
    max_height DECIMAL(5, 2), -- 해당 자리 최대 높이 (미터)
    base_price DECIMAL(10, 2), -- 기본 요금. 부착 단가 (일당 또는 월당)
    tax_price NUMERIC, -- 세금 
    banner_type TEXT NOT NULL, -- '가로형', '세로형', '현수막' 
    price_unit TEXT DEFAULT 'daily' CHECK (price_unit IN ('daily', 'weekly', 'monthly')),
    is_premium BOOLEAN DEFAULT FALSE, -- 프리미엄 자리 여부 (눈에 잘 띄는 위치)
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'maintenance', 'unavailable')),
    notes TEXT, -- 자리별 특이사항
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
   
    -- 같은 게시대에서 슬롯 번호는 유일해야 함
    UNIQUE(panel_post_id, slot_number)
);


-- 7. Panel slot Usage (면 사용 내역)
-- 현수막 게시대, LED 전자 게시대의 한 면 (e.g. 5층 중 1층 면)
-- orders 로부터 trigger 필요
CREATE TABLE panel_slot_usage (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
product_id UUID REFERENCES products(id) ON DELETE CASCADE,
order_id UUID REFERENCES orders(id),
slot_number INT,
usage_type TEXT, -- 분류 : 소형게시대, 등.. 확인 필요
attach_date_from DATE, -- 부착일 =게시일
unit_price NUMERIC, -- 부착 단가
tax_price NUMERIC, --세금
total_price NUMERIC,
is_active BOOLEAN DEFAULT TRUE, -- 가능, 불가능
is_closed BOOLEAN DEFAULT FALSE, -- 마감
banner_type TEXT NOT NULL, -- '가로형', '세로형', '현수막' 
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now(),

);

--디지털사이니지와 공공디자인 용 테이블? 필요할까, 구체적인 구성 물어보기
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
thumnail_image TEXT, --배열
title TEXT,
description TEXT,
notice TEXT,
page_detail ???
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now()


-- 8. Users
CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
email TEXT UNIQUE NOT NULL,
password_hash TEXT NOT NULL,
name TEXT NOT NULL,
phone TEXT,
birthdate DATE,
is_business BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now()
);


-- 9. Company Info --
CREATE TABLE companies (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
company_name TEXT,
business_number TEXT,
representative TEXT,
address TEXT,
phone TEXT,
fax TEXT,
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now()
);

-- 10. User-Company 연결 테이블
CREATE TABLE user_companies (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
role TEXT DEFAULT 'member', -- 'owner', 'admin', 'manager', 'member' 등
is_primary BOOLEAN DEFAULT FALSE, -- 주 소속 회사 여부
joined_at TIMESTAMP DEFAULT now(),
left_at TIMESTAMP NULL, -- 퇴사일 (NULL이면 현재 재직중)
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now(),
    
-- 한 사용자가 같은 회사에 중복으로 소속될 수 없도록 제약
UNIQUE(user_id, company_id)
);

-- 인덱스 생성
CREATE INDEX idx_user_companies_user_id ON user_companies(user_id);
CREATE INDEX idx_user_companies_company_id ON user_companies(company_id);
CREATE INDEX idx_user_companies_active ON user_companies(user_id, company_id) WHERE left_at IS NULL;

-- 주 소속 회사는 사용자당 하나만 가질 수 있도록 하는 제약 (선택사항)
CREATE UNIQUE INDEX idx_user_primary_company ON user_companies(user_id) 
WHERE is_primary = TRUE AND left_at IS NULL;



-- 11. Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL, -- 
  order_name TEXT,
  user_id UUID REFERENCES users(id), 
  company_id UUID REFERENCES companies(id), 
  panel_slot_info_id UUID REFERENCES products(id), --게시대 정보
  panel_slot_usage_id UUID REFERENCES panel_slot_usage(id), --게시대
  total_price NUMERIC, -- 총 금액
  depositor_name TEXT, -- 입금자명
  deposit_date DATE, -- 입금일 
  is_paid BOOLEAN DEFAULT FALSE, -- 입금 확인
  is_checked BOOLEAN DEFAULT FALSE, -- 한성 담당자 체크 여부 
  invoice_issued_at DATE, -- 계산서 발행일
  invoice_file TEXT, -- 계산서 파일 이미지? 
  payment_method TEXT, -- 결제 구분 
  email TEXT, -- 누구의 이메일?
  panel_posts_id UUID ,        -- 게시대 상세 참조 (banner/led 모두)
  is_draft_uploaded BOOLEAN --  + 시안 여부 boolean
  received_at TIMESTAMP,
  is_verified BOOLEAN DEFAULT FALSE,-- 검수 
	is_image_verified BOOLEAN, --  시안여부 
  is_received BOOLEAN, -- 입고여부 , 무엇이?
  is_all_checked BOOLEAN -- 전체 확인여부
  is_selected BOOLEAN DEFAULT FALSE, 
  display_location TEXT
  -- location_address TEXT, -- 송출 주소
  
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
-- 총 3번의 검수 진행

- 9. Order Details -- 구체적인 면 구매 기한
CREATE TABLE order_details (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
order_id UUID REFERENCES orders(id),
slot_order_quantity INT, --면 구매 수량
display_start_date DATE, --송출 시작일
display_end_date DATE, --송출 종료일
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now()

);

- 10. Customer Service ()
CREATE TABLE panel_infocustomer-service (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID REFERENCES users(id),
panel_category_id REFERENCES panel_categories
cs_category TEXT -- enum personal_cs , frequant_questions
question_title TEXT,
question_content TEXT,
is_answered TEXT,
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now()

);


- 11. Homepage Contents
CREATE TABLE homepage_contents (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
display_category_id REFERENCES display_categories(id)
region_gu_id REFERENCES region_gu(id)
title TEXT NOT NULL, --랜딩,공공,led,현수막,디지털 페이지의 카피문구
subtitle TEXT NOT NULL, --랜딩,공공,led,현수막,디지털 페이지의 카피문구
description TEXT,  -- 랜딩페이지 설명
image_url TEXT,
is_active BOOLEAN DEFAULT TRUE,
button_content TEXT, --버튼이 있다면 버튼내용
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now()
);
--홈페이지의 지역별 콘텐츠, 페이지별 콘텐츠로 테이블 나누기 
-- 메인랜딩페이지 구분을 어떻게 해야할지...테이블을 나누는게 좋을지.

CREATE TABLE homepage_contents_region (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
region_gu_id REFERENCES region_gu(id)
panel_info_id REFERENCES panel_info(id),  -- 랜딩페이지 설명
traffic_info TEXT, -- 유동인구 정보
memo TEXT, -- 회원 정보
image_url TEXT, -- 이미지 첨부 
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now()
);


- 11. Homepage homepage_notices (홈페이지 공지사항)
CREATE TABLE homepage_notice (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
title TEXT,
content TEXT,
image_url TEXT,
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now()
);


- 4. Product Notice (구 별 안내 팝업)
CREATE TABLE panel_popup_notices (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
display_category_id UUID REFERENCES display_categories(id),
title TEXT, -- 팝업 타이틀
hide_oneday BOOLEAN DEFAULT FALSE, --하루 안보기
content TEXT, -- 내용
image_url TEXT, -- 이미지로 올리기
start_date DATE,
end_date DATE,
created_at TIMESTAMP DEFAULT now()
updated_at TIMESTAMP DEFAULT now()

);


- 5. Product Guidelines ( 구 별 유의사항 및 안내사항)
CREATE TABLE panel_guideline (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
display_category_id UUID REFERENCES display_categories(id),
notes TEXT,
order_period TEXT, --접수기간
order_method TEXT, -- 접수방법 내용
account_info TEXT, -- 계좌번호
guide_file_url TEXT, -- 가이드업로드 (이미지)
main_notice TEXT,  -- 기본안내
sub_notice TEXT, -- 주의사항안내
created_at TIMESTAMP DEFAULT now(),
updated_at TIMESTAMP DEFAULT now()
);



- Create indexes
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_product ON orders(product_id);
CREATE INDEX idx_business_info_user ON business_info(user_id);
CREATE INDEX idx_consultations_user ON consultations(user_id);
