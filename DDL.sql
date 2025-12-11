-- ===================================================
-- 1. USERS 테이블 (사용자 정보)
-- ===================================================
CREATE TABLE IF NOT EXISTS users (
    id          	INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '사용자 고유 식별자 (PK)',
    name_ko			VARCHAR(255) NOT NULL COMMENT '사용자 실명(한국어)',
    name_en			VARCHAR(255) NOT NULL COMMENT '사용자 실명(영어)',
    sub_title_ko	TEXT NOT NULL COMMENT '메인페이지 서브 문구(한국어)',
    sub_title_en	TEXT NOT NULL COMMENT '메인페이지 서브 문구(영어)',
    email       	VARCHAR(255) UNIQUE NOT NULL COMMENT '이메일 주소',
    image_url   	VARCHAR(1024) NOT NULL COMMENT '프로필 이미지 URL',
    gender 			ENUM('M','F','O') NOT NULL COMMENT '성별 (M:남, F:여, O:기타)',
    birth_date  	DATE NOT NULL COMMENT '생년월일',
    address     	VARCHAR(255) NOT NULL COMMENT '거주 지역 또는 주소',
    created_at  	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    updated_at  	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    PRIMARY KEY (id)
) COMMENT = '사용자 정보 통합 관리 테이블';


-- ===================================================
-- 2. PROJECTS 테이블 (프로젝트 정보)
-- ===================================================
CREATE TABLE IF NOT EXISTS projects (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '프로젝트 고유 식별자 (PK)',
    title           VARCHAR(255) NOT NULL COMMENT '프로젝트 제목',
    thumbnail       VARCHAR(1024) NOT NULL COMMENT '썸네일 URL',
    display_order   INT UNSIGNED NOT NULL COMMENT '화면에 표시할 순서 (숫자가 낮을수록 먼저 표시)',
    description     TEXT NOT NULL COMMENT '프로젝트 상세 설명',
    tech_stack      TEXT NOT NULL COMMENT '사용된 기술 스택 (콤마로 구분된 문자열 배열)',
    demo_link       VARCHAR(512) NULL COMMENT '프로젝트 데모 링크',
    git_link        VARCHAR(512) NULL COMMENT '프로젝트 Git 저장소 링크',
    start_date      DATE NULL COMMENT '프로젝트 시작일',
    end_date        DATE NULL COMMENT '프로젝트 종료일',
    hidden_at       TIMESTAMP NULL COMMENT '숨김 처리 일시 (NULL이면 공개 상태)',
    userId          INT UNSIGNED NOT NULL COMMENT '사용자 외래 키 (FK)',
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_order (display_order),
    INDEX idx_hidden_at (hidden_at),
    INDEX idx_start_date (start_date)
) COMMENT = '프로젝트 정보 관리 테이블';


-- ===================================================
-- 3. CAREERS 테이블 (경력 정보)
-- ===================================================
CREATE TABLE IF NOT EXISTS careers (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '경력 고유 식별자 (PK)',
    position        VARCHAR(255) NOT NULL COMMENT '직무 또는 역할',
    company         VARCHAR(255) NOT NULL COMMENT '회사(조직)명',
    start_date      DATE NOT NULL COMMENT '경력 시작일',
    end_date        DATE NULL COMMENT '경력 종료일 (현재 재직 중이면 NULL)',
    description     TEXT NOT NULL COMMENT '주요 역할 및 성과 상세 설명',
    tech_stack      TEXT NULL COMMENT '해당 경력에서 사용된 주요 기술 스택',
    userId          INT UNSIGNED NOT NULL COMMENT '사용자 외래 키 (FK)',
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_start_date (start_date)
) COMMENT = '경력 정보 관리 테이블';


-- ===================================================
-- 4. PERSONAL_INFOS 테이블 (챗봇용 비정형 개인 정보)
-- ===================================================
CREATE TABLE IF NOT EXISTS personal_infos (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '개인 정보 고유 식별자 (PK)',
    category        VARCHAR(50) NOT NULL COMMENT '정보 대분류 (ex. SKILL, LIFESTYLE, TMI)',
    key_name        VARCHAR(100) NOT NULL COMMENT '정보 세부 항목명 (ex. Height, Favorite_Food, Main_Stack)',
    content         TEXT NOT NULL COMMENT '정보 내용 (값)',
    userId          INT UNSIGNED NOT NULL COMMENT '사용자 외래 키 (FK)',
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    PRIMARY KEY (id),
    UNIQUE KEY uk_user_info (userId, category, key_name), 
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_category (category)
) COMMENT = '챗봇용 비정형 개인 정보 관리 테이블';


-- ===================================================
-- 5. INQUIRIES 테이블 (문의 정보)
-- ===================================================
CREATE TABLE IF NOT EXISTS inquiries (
    id				INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '문의 고유 식별자 (PK)',
    name			VARCHAR(255) NOT NULL COMMENT '문의를 남긴 사용자 이름',
    email			VARCHAR(255) NOT NULL COMMENT '문의를 남긴 사용자 이메일',
    message			TEXT NOT NULL COMMENT '문의 내용',
    is_responded	TINYINT(1) NOT NULL DEFAULT 0 COMMENT '답변 완료 여부 (0:미답변, 1:답변 완료)',
    created_at		TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '문의 생성 일시',
    PRIMARY KEY (id),
    INDEX idx_responded (is_responded),
    INDEX idx_created_at (created_at)
) COMMENT = '문의 관리 테이블';


-- ===================================================
-- 6. MILESTONES 테이블 (타임라인 및 주요 이력 관리 정보)
-- ===================================================
CREATE TABLE IF NOT EXISTS milestones (
    id				INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '이력 고유 식별자 (PK)',
    start_date		DATE NOT NULL COMMENT '이력 시작일 (또는 졸업/취득일)',
    end_date		DATE NULL COMMENT '이력 종료일 (현재 진행형이면 NULL)',
    title			VARCHAR(255) NOT NULL COMMENT '제목 (예: XX대학교 컴퓨터공학과, 육군 병장 만기제대)',
    organization	VARCHAR(255) NULL COMMENT '소속 기관/회사 (예: XX대학교, XX 회사)',
    description		TEXT COMMENT '상세 설명 (배운 내용, 주요 성과 등)',
    type			ENUM('EDUCATION', 'SERVICE', 'CERTIFICATE', 'PERSONAL') NOT NULL COMMENT '이력 유형',
    display_order	INT UNSIGNED NOT NULL COMMENT '타임라인에 표시될 순서',
    userId			INT UNSIGNED NOT NULL COMMENT '사용자 외래 키 (FK)',
    created_at		TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    updated_at		TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_timeline (start_date, display_order) 
) COMMENT = '타임라인 및 주요 이력 관리 테이블';