#DROP TABLE IF EXISTS attachments;
#DROP TABLE IF EXISTS milestones;
#DROP TABLE IF EXISTS guestbooks;
#DROP TABLE IF EXISTS inquiries;
#DROP TABLE IF EXISTS personal_infos;
#DROP TABLE IF EXISTS career_projects;
#DROP TABLE IF EXISTS careers;
#DROP TABLE IF EXISTS projects;
#DROP TABLE IF EXISTS users;


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
    git_username	VARCHAR(100) COMMENT 'GitHub Contributions 출력을 위한 GitHub 사용자 이름',
    gender 			ENUM('M','F','O') NOT NULL COMMENT '성별 (M:남, F:여, O:기타)',
    birth_date  	DATE NOT NULL COMMENT '생년월일',
    address     	VARCHAR(255) NOT NULL COMMENT '거주 지역 또는 주소',
    created_at  	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    updated_at  	TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    PRIMARY KEY (id)
) COMMENT = '사용자 정보 통합 관리 테이블';

INSERT INTO hyunzai_db.users (name_ko,name_en,sub_title_ko,sub_title_en,email,git_username,gender,birth_date,address,created_at,updated_at) VALUES
	 ('김현재','Hyunjae Kim','저는 <span className=''text-foreground''>효율을 추구하고 도전을 망설이지 않는 개발자</span>입니다.','I''m a <span className=''text-foreground''>developer who values efficiency end embraces new challenges</span>.','contact@hyunzai.com','HyunZai','M','1998-03-09','대한민국 서울시','2025-12-20 21:08:11.601131','2025-12-21 17:48:56.039976');

	
-- ===================================================
-- 2. PROJECTS 테이블 (프로젝트 정보)
-- ===================================================
CREATE TABLE IF NOT EXISTS projects (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '프로젝트 고유 식별자 (PK)',
    title           VARCHAR(255) NOT NULL COMMENT '프로젝트 제목',
    description     TEXT NOT NULL COMMENT '프로젝트 상세 설명',
    tech_stack      TEXT NOT NULL COMMENT '사용된 기술 스택 (콤마로 구분된 문자열 배열)',
    demo_link       VARCHAR(512) NULL COMMENT '프로젝트 데모 링크',
    git_link        VARCHAR(512) NULL COMMENT '프로젝트 Git 저장소 링크',
    start_date      DATE NULL COMMENT '프로젝트 시작일',
    end_date        DATE NULL COMMENT '프로젝트 종료일',
    display_order   INT UNSIGNED NOT NULL COMMENT '화면에 표시할 순서 (숫자가 낮을수록 먼저 표시)',
    hidden_at       TIMESTAMP NULL COMMENT '숨김 처리 일시 (NULL이면 공개 상태)',
    user_id          INT UNSIGNED NOT NULL COMMENT '사용자 외래 키 (FK)',
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_order (display_order),
    INDEX idx_hidden_at (hidden_at),
    INDEX idx_start_date (start_date)
) COMMENT = '프로젝트 정보 관리 테이블';

INSERT INTO hyunzai_db.projects (title,description,tech_stack,demo_link,git_link,start_date,end_date,display_order,hidden_at,user_id,created_at,updated_at) VALUES
	 ('PhoneLink','PhoneLink는 전국 핸드폰 매장의 시세를 등록 및 관리할 수 있도록 판매자들을 지원하고, 사용자들은 쉽고 투명하게 최저가로 핸드폰을 구매할 수 있도록 돕는 B2B2C 플랫폼입니다. 핸드폰을 저렴하게 구매하는 방법에 대한 정보의 파편화를 해결하여 소비자와 판매자 모두에게 이익이 되는 생태계를 구축하는 것을 목표로 개발하게 되었습니다.','Node.js,React,TypeScript,TypeORM,MySQL,JWT',NULL,'https://github.com/phone-link-org/phone-link',NULL,NULL,1,NULL,1,'2025-12-20 21:08:11.634271','2025-12-20 21:08:11.644015'),
	 ('Youtube Cue Finder','Youtube Cue Finder는 다시 보고 싶은 유튜브 영상의 기억나는 대사를 키워드로 검색하여 쉽게 찾아볼 수 있게 해줍니다.','Node.js,React,JavaScript,Flask,Python',NULL,'https://github.com/HyunZai/youtube-cue-finder',NULL,NULL,2,NULL,1,'2025-12-20 21:08:11.634271','2025-12-20 21:08:11.644015');


-- ===================================================
-- 3. CAREERS 테이블 (경력 정보)
-- ===================================================
CREATE TABLE IF NOT EXISTS careers (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '경력 고유 식별자 (PK)',
    company         VARCHAR(255) NOT NULL COMMENT '회사(조직)명',
    department      VARCHAR(255) NULL     COMMENT '소속 부서',
    job_title       VARCHAR(100) NOT NULL COMMENT '직급',
    start_date      DATE NOT NULL COMMENT '경력 시작일',
    end_date        DATE NULL COMMENT '경력 종료일 (현재 재직 중이면 NULL)',
    description     TEXT COMMENT '주요 역할 및 성과 상세 설명',
    user_id          INT UNSIGNED NOT NULL COMMENT '사용자 외래 키 (FK)',
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_start_date (user_id, start_date),
    INDEX idx_company (company)
) COMMENT = '경력 정보 관리 테이블';

INSERT INTO hyunzai_db.careers (company,department,job_title,start_date,end_date,description,user_id,created_at,updated_at) VALUES
	 ('SOLBIT','솔루션개발팀','인턴','2025-03-01','2025-08-31',NULL,1,'2025-12-20 21:08:11.616885','2025-12-20 21:08:11.625683'),
	 ('M&J SOFT','개발팀','사원','2020-05-01','2023-02-28',NULL,1,'2025-12-20 21:08:11.616885','2025-12-20 21:08:11.625683');


-- ===================================================
-- 4. CAREER_PROJECT 테이블 (경력 내 프로젝트 정보)
-- ===================================================
CREATE TABLE IF NOT EXISTS career_projects (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '경력 프로젝트 고유 식별자 (PK)',
    career_id       INT UNSIGNED NOT NULL COMMENT '경력 외래 키 (FK)',
    title           VARCHAR(255) NOT NULL COMMENT '프로젝트 명',
    description     TEXT NOT NULL COMMENT '프로젝트 상세 설명 및 기여도',
    role            VARCHAR(255) NULL COMMENT '프로젝트 내 역할',
    tech_stack      TEXT COMMENT '프로젝트에 사용한 기술 스택',
    start_date      DATE COMMENT '프로젝트 시작일',
    end_date        DATE COMMENT '프로젝트 종료일',
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    PRIMARY KEY (id),
    FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE CASCADE,
    INDEX idx_career_project_date (career_id, start_date)
) COMMENT = '경력 내 프로젝트 정보 관리 테이블';

INSERT INTO hyunzai_db.career_projects (career_id,title,description,`role`,tech_stack,start_date,end_date,created_at,updated_at) VALUES
	 (1,'University e-IRB System Web Application','특정 사용자의 대용량 데이터 조회로 인한 메인 페이지 로딩 Timeout 및 서비스 장애 이슈를 해결했습니다. 로그 분석을 통해 단순 쿼리 튜닝으로는 한계가 있음을 파악하고, 데이터 조회 로직을 AJAX 기반의 비동기 처리 방식으로 전면 전환했습니다. 그 결과 로딩 지연 문제를 근본적으로 해결하고, 대량 데이터 처리 시에도 전체 시스템에 영향을 주지 않도록 안정성을 확보했습니다.','Full Stack Web Developer','Spring,JSP,Oracle,JavaScript',NULL,NULL,'2025-12-20 21:08:11.737690','2025-12-20 21:08:11.746140'),
	 (1,'Kiosk Backoffice Web Application','클라이언트의 반복적인 수동 데이터 조회 요청 업무를 개선했습니다. 매번 발생하는 유사한 요청을 처리하는 비효율을 해결하고자, 검색 및 필터링 기능이 포함된 사용자 정보 조회 어드민 기능을 제안하고 개발했습니다. 도입 이후 수동 요청 건수가 약 95% 감소하여 운영 팀이 핵심 업무에 집중할 수 있는 환경을 조성했습니다.','Full Stack Web Developer','Node.js,React,MariaDB,JavaScript',NULL,NULL,'2025-12-20 21:08:11.737690','2025-12-20 21:08:11.746140'),
	 (2,'EMS (Engineering Management System) Web Application','사내 유일한 웹 개발 담당자로서 ASP.NET Core 기반 웹 애플리케이션의 아키텍처 설계부터 프론트엔드, 백엔드 개발 전 과정을 주도했습니다. 초기 구축 단계에서 다양한 시행착오를 겪으며 코딩뿐만 아니라 서비스 기획과 설계의 중요성을 깊이 체감했습니다. 이 경험은 제가 웹 개발자로서의 확고한 커리어 방향성을 설정하는 중요한 계기가 되었습니다.','Full Stack Web Developer','ASP.NET Core,C#,MSSQL,HTML/CSS,JavaScript',NULL,NULL,'2025-12-20 21:08:11.737690','2025-12-20 21:08:11.746140'),
	 (2,'Intergraph S3D API Desktop Application','Intergraph사의 Smart 3D API를 활용하여 설계 자동화 및 데이터 검증을 위한 데스크톱 애플리케이션을 개발 및 유지보수했습니다.','Desktop Application Developer','C#,.NET WinForms',NULL,NULL,'2025-12-20 21:08:11.737690','2025-12-20 21:08:11.746140');


-- ===================================================
-- 5. PERSONAL_INFOS 테이블 (챗봇용 비정형 개인 정보)
-- ===================================================
CREATE TABLE IF NOT EXISTS personal_infos (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '개인 정보 고유 식별자 (PK)',
    category        VARCHAR(50) NOT NULL COMMENT '정보 대분류 (ex. SKILL, LIFESTYLE, TMI)',
    key_name        VARCHAR(100) NOT NULL COMMENT '정보 세부 항목명 (ex. Height, Favorite_Food, Main_Stack)',
    content         TEXT NOT NULL COMMENT '정보 내용 (값)',
    user_id          INT UNSIGNED NOT NULL COMMENT '사용자 외래 키 (FK)',
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    PRIMARY KEY (id),
    UNIQUE KEY uk_user_info (user_id, category, key_name), 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_category (category)
) COMMENT = '챗봇용 비정형 개인 정보 관리 테이블';

INSERT INTO hyunzai_db.personal_infos (category,key_name,content,user_id,created_at,updated_at) VALUES
	 ('ABOUT_CONTENT','INTRODUCTION','<p>
                저의 가치관은 <span className="text-white font-semibold">아쉬워하되, 후회는 말자</span>입니다.
                과거에 머무르기보다 미래를 위해 현재를 투자하는 삶을 지향하며, 모든 결과는 스스로의 선택에서 비롯된다고 믿습니다.
                그래서 어떤 상황에서도 책임감을 가지고 끝까지 해내는 태도를 중요하게 생각합니다.
              </p>
              <p>
                비전공자로 코딩을 처음 접했지만, 개발의 매력에 깊이 빠져 더 배우고 성장하기 위해 비교적 늦은 나이에 대학교 진학이라는 <span className="text-white font-semibold">도전</span>을 선택했습니다.
                즐거움에서 시작된 이 선택은 지금도 저를 계속해서 성장하게 만드는 원동력이 되고 있습니다.
              </p>
              <p>
                현재는 웹 프론트엔드와 백엔드 전반에 걸친 기술 스택을 다루고 있으며,
                특히 React, Next.js, Node.js 생태계에 깊은 관심을 가지고 있습니다.
              </p>',1,'2025-12-20 21:08:11.652199','2025-12-20 21:08:11.659358'),
	 ('SKILL','STACK','Java,C#,TypeScript,HTML,CSS,SQL,Spring Boot,ASP.NET Core,Node.js,Next.js,React,TailwindCSS,Git',1,'2025-12-20 21:08:11.652199','2025-12-20 21:08:11.659358');


-- ===================================================
-- 6. INQUIRIES 테이블 (문의 정보)
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
-- 7. MILESTONES 테이블 (타임라인 및 주요 이력 관리 정보)
-- ===================================================
CREATE TABLE IF NOT EXISTS milestones (
    id				INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '이력 고유 식별자 (PK)',
    type			ENUM('EDUCATION', 'SERVICE', 'PERSONAL', 'AWARD', 'CERTIFICATION') NOT NULL COMMENT '이력 유형',
    title			VARCHAR(255) NOT NULL COMMENT '제목 (예: XX대학교 컴퓨터공학과, 육군 병장 만기제대)',
    start_date		DATE NOT NULL COMMENT '이력 시작일 (또는 졸업/취득일)',
    end_date		DATE NULL COMMENT '이력 종료일 (현재 진행형이면 NULL)',
    organization	VARCHAR(255) NULL COMMENT '소속 기관/회사 (예: XX대학교, XX 회사)',
    description		TEXT COMMENT '상세 설명 (배운 내용, 주요 성과 등)',
    display_order	INT UNSIGNED NOT NULL COMMENT '타임라인에 표시될 순서',
    user_id			INT UNSIGNED NOT NULL COMMENT '사용자 외래 키 (FK)',
    created_at		TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    updated_at		TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 일시',
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_timeline (start_date, display_order) 
) COMMENT = '타임라인 및 주요 이력 관리 테이블';

INSERT INTO hyunzai_db.milestones (`type`,title,start_date,end_date,organization,description,display_order,user_id,created_at,updated_at) VALUES
	 ('AWARD','캡스톤디자인 경진대회 우수상','2024-12-20',NULL,'(사)한국산학기술학회','대학교 전공동아리 W.I.S에서 팀장으로 참여. 팀원들과 ''미아 방지 교육 캐주얼게임 보드판''을 제작하고 Unity 기반의 캐주얼게임을 개발해 출품.',0,1,'2025-12-20 21:08:11.699656','2025-12-20 21:08:11.708196'),
	 ('CERTIFICATION','SQL 개발자(SQLD)','2025-04-04',NULL,'한국데이터산업진흥원',NULL,1,1,'2025-12-20 21:08:11.699656','2025-12-20 21:08:11.708196'),
	 ('CERTIFICATION','정보처리기사','2024-12-11',NULL,'한국산업인력공단',NULL,2,1,'2025-12-20 21:08:11.699656','2025-12-20 21:08:11.708196'),
	 ('EDUCATION','서일대학교 입학','2023-03-01',NULL,'서일대학교','소프트웨어공학',4,1,'2025-12-20 21:08:11.699656','2025-12-21 20:10:06.537978'),
	 ('SERVICE','육군 15사단 군복무','2018-03-05','2019-11-03','육군 15사단 50연대 2대대','대대탄약병 만기제대',6,1,'2025-12-20 21:08:11.699656','2025-12-21 20:12:21.118212'),
	 ('EDUCATION','서일대학교 졸업','2026-02-10',NULL,'서일대학교','소프트웨어공학 전문학사 (GPA: 4.46 / 4.5)',1,1,'2025-12-21 20:04:07.557208','2025-12-21 20:04:07.557208'),
	 ('SERVICE','SOLIBT 인턴십','2025-03-01','2025-08-31','SOLBIT','- Node.js / React 기반의 Kiosk Backoffice Web Application 개발 및 유지보수 - Spring / JSP 기반의 대학 e-IRB System Web Application 개발 및 유지보수',2,1,'2025-12-21 20:08:29.675825','2025-12-21 20:08:29.675825'),
	 ('EDUCATION','전공동아리 W.I.S','2023-04-01','2025-02-28','서일대학교','팀프로젝트 진행 및 캡스톤디자인 경진대회 출전',3,1,'2025-12-21 20:10:06.536001','2025-12-21 20:10:06.536001'),
	 ('SERVICE','M&J SOFT 근무','2020-05-01','2023-02-28','M&J SOFT','- .NET Winforms 기반의 Desktop Application 개발 - ASP.NET Core 기반의 EMS Web Application 개발',5,1,'2025-12-21 20:12:21.115740','2025-12-21 20:12:21.115740');


-- ===================================================
-- 8. ATTACHMENTS 테이블 (공용 이미지 및 첨부파일 관리 정보)
-- ===================================================
CREATE TABLE IF NOT EXISTS attachments (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '파일 고유 식별자 (PK)',
    target_id       INT UNSIGNED NOT NULL COMMENT '연결된 대상 테이블의 PK (예: project의 id, career의 id)',
    target_type     VARCHAR(50) NOT NULL COMMENT '연결된 대상 구분 (예: PROJECT, CAREER, USER, MILESTONE)',
    file_url        VARCHAR(1024) NOT NULL COMMENT '파일 또는 이미지의 URL(경로)',
    file_type       ENUM('IMAGE', 'FILE', 'VIDEO', 'PDF') NOT NULL DEFAULT 'IMAGE' COMMENT '파일 형식 구분',
    original_name   VARCHAR(255) NULL COMMENT '사용자가 업로드한 실제 파일명',
    file_size       INT UNSIGNED NULL COMMENT '파일 용량 (Byte)',
    display_order   INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '표시 순서 (이미지 슬라이더 등에서 활용)',
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    PRIMARY KEY (id),
    INDEX idx_target (target_type, target_id),
    INDEX idx_order (display_order)
) COMMENT = '전체 섹션 공용 이미지 및 첨부파일 관리 테이블';

INSERT INTO hyunzai_db.attachments (target_id,target_type,file_url,file_type,original_name,file_size,display_order,created_at) VALUES
	 (1,'USER','/uploads/profile/profile.png','IMAGE','profile.png',NULL,0,'2025-12-18 16:28:44'),
	 (1,'PROJECT','/uploads/projects/PhoneLink1.png','IMAGE','PhoneLink1.png',NULL,1,'2025-12-18 16:53:10'),
	 (1,'PROJECT','/uploads/projects/PhoneLink2.png','IMAGE','PhoneLink2.png',NULL,2,'2025-12-18 16:53:37'),
	 (1,'PROJECT','/uploads/projects/PhoneLink3.png','IMAGE','PhoneLink3.png',NULL,3,'2025-12-18 16:54:04'),
	 (1,'PROJECT','/uploads/projects/PhoneLink4.png','IMAGE','PhoneLink4.png',NULL,4,'2025-12-18 16:54:28'),
	 (2,'PROJECT','/uploads/projects/YoutubeCueFinder.png','IMAGE','YoutubeCueFinder.png',NULL,1,'2025-12-18 16:55:00');


-- ===================================================
-- 9. GUESTBOOKS 테이블
-- ===================================================
CREATE TABLE IF NOT EXISTS guestbooks (
    id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '방명록 고유 식별자 (PK)',
    nickname        VARCHAR(50) NOT NULL COMMENT '작성자 닉네임',
    content         TEXT NOT NULL COMMENT '방명록 내용',
    ip_address      VARCHAR(45) NULL COMMENT '악성 도배 방지용 IP 주소',
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일시',
    PRIMARY KEY (id),
    INDEX idx_created_at (created_at)
) COMMENT = '익명 사용자 방명록 관리 테이블';
