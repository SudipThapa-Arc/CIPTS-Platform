**# College Internships & Placement Tracking System (CIPTS)**
**## Comprehensive System Specification & Operational Architecture**

---

**## 1. System Vision & Domain Definition**

**### 1.1 What the System Is**
The **\*\*College Internships & Placement Tracking System (CIPTS)\*\*** is an institutional Management Information System (MIS) designed for collegiate placement cells and career service departments. It replaces manual spreadsheets, unstructured emails, and bulletin boards with a synchronized platform covering the full recruitment lifecycle:
\* Corporate partner onboarding and job posting.
\* Automated eligibility screening based on real-time academic records.
\* Application tracking through multi-round evaluation pipelines.
\* Aggregate institutional analytics, department-level performance metrics, and compliance-ready exportable reports.

**### 1.2 What the System Is Not**
\* **\*\*Not a social networking or open job portal:\*\*** There are no open-ended public posts, unstructured direct messaging channels, or arbitrary third-party advertisements.
\* **\*\*Not a static data repository:\*\*** Every single transactional event (such as an application status change or a GPA update) cascades immediately into managerial reporting calculations, historical logs, and executive summary dashboards.

---

**## 2. Design Tokens & UI/UX Standards**

The system adheres to an executive, modern SaaS design system (inspired by platforms like Linear and Vercel) to eliminate generic AI layouts and provide a focused administrative user experience.

**### 2.1 Color Architecture**
\* **\*\*Background Canvas:\*\*** Soft Off-White (\`#FAFAFA\` / \`zinc-50\`) in light mode; Deep Charcoal (\`#09090B\` / \`zinc-950\`) in dark mode.
\* **\*\*Card & Surface Elevation:\*\*** Solid White (\`#FFFFFF\`) with subtle border containment (\`#E4E4E7\` / \`zinc-200/80\`) and multi-layer micro-shadows.
\* **\*\*Primary Accent:\*\*** Slate Indigo (\`#4F46E5\` / \`indigo-600\`) for primary action buttons, key metrics, and selected navigation states.
\* **\*\*Status Badges & Semantic Accents:\*\***
  \* **\*\*Placed / Success:\*\*** Emerald (\`#059669\` / \`emerald-600\`) with soft container background (\`#ECFDF5\` / \`emerald-50\`).
  \* **\*\*Shortlisted / Warning:\*\*** Amber (\`#D97706\` / \`amber-600\`) with soft container background (\`#FFFBEB\` / \`amber-50\`).
  \* **\*\*Rejected / Inactive:\*\*** Muted Rose/Red (\`#DC2626\` / \`red-600\`) with soft container background (\`#FEF2F2\` / \`red-50\`).
  \* **\*\*Neutral / In Review:\*\*** Slate Gray (\`#71717A\` / \`zinc-500\`) with subtle gray background (\`#F4F4F5\` / \`zinc-100\`).

**### 2.2 Typography & Hierarchy**
\* **\*\*Primary Typeface:\*\*** High-legibility neutral sans-serif (\`Geist Sans\` or \`Inter\`) with tight tracking (\`tracking-tight\`) on section headers and title displays.
\* **\*\*Monospace Figures:\*\*** Tabular monospace formatting (\`Geist Mono\` or \`JetBrains Mono\`) for all numeric figures, GPAs, dates, student roll numbers, and currency values.

**### 2.3 Microinteractions & Visual Feedback**
\* **\*\*Dynamic Status Indicators:\*\*** Active recruitment drives and pending review tasks feature dual-layer pulsing status dots.
\* **\*\*Tactile Controls:\*\*** Interactive elements utilize scale reductions on active click (\`active\:scale-[0.98]\`) and soft hover elevations.
\* **\*\*Content Suspense:\*\*** Data-fetching phases use dimension-matched skeleton blocks to eliminate layout shifts during asynchronous loads.

---

**## 3. Global Multi-Page & Multi-Section Map**

The system is partitioned into **\*\*16 functional pages\*\*** across **\*\*4 permission zones\*\***, each containing dedicated structural sections.
+--------------------------+
                          |      CIPTS Platform      |
                          +--------------------------+
                                       |
+--------------------+-----------------+--------------------+--------------------+
\|                    |                                      |                    |
+---v--------------+ +---v----------------+             +-------v--------------+ +---v----------------+
\| 1. Public & Auth | | 2. Student Portal  |             | 3. Recruiter Portal  | | 4. Placement Officer |
\|    Zone          | |    Zone            |             |    Zone              | |    (MIS Executive)   |
+------------------+ +--------------------+             +----------------------+ +--------------------+
\| - Landing Page   | | - Student Overview |             | - Recruiter Command  | | - Executive Center |
\| - Unified Login  | | - Job Explorer     |             | - Job Management     | | - Department Deep  |
\| - Registration   | | - Job Details/App  |             | - Candidate Screening| | - Master Directory |
\|                  | | - Application Hub  |             | - Corporate Profile  | | - Report Generator |
\|                  | | - Career Portfolio |             |                      | | - System Config    |
+------------------+ +--------------------+             +----------------------+ +--------------------+
**### Zone 1: Public & Authentication Zone**

**#### Page 1: Institutional Public Portal & Landing Page (\`/\`)**
\* **\*\*Section 1 (Hero & Institutional Verification):\*\*** Official college placement cell banner, active recruitment drive indicators, and primary role-directed entry triggers ("Student Access", "Recruiter Portal", "Placement Officer Sign-In").
\* **\*\*Section 2 (Recruitment Summary Counters):\*\*** Key institutional metrics (Total Partner Companies, Overall Historical Placement Percentage, Highest Compensation Benchmark, Average Package Benchmark).
\* **\*\*Section 3 (Corporate Partners Marquee):\*\*** Curated display of verified recruiting organizations across technology, consulting, and engineering domains.
\* **\*\*Section 4 (Recruitment Lifecycle Infographic):\*\*** Visual 4-stage process guide (Student Profile Verification $\rightarrow$ Vacancy Matching $\rightarrow$ Multi-Stage Evaluation $\rightarrow$ Institutional Offer Issuance).
\* **\*\*Section 5 (Institutional Footer):\*\*** Accreditation notices, placement office contact directory, privacy and regulatory disclosures, and academic calendar links.

**#### Page 2: Unified Role-Aware Authentication (\`/auth/login\`)**
\* **\*\*Section 1 (Branding & Trust Panel):\*\*** Institutional imagery, accreditation highlights, and campus data security notices.
\* **\*\*Section 2 (Authentication Form):\*\*** Role selector toggle (\`Student\` | \`Recruiter\` | \`Placement Officer\`), email field, password field with visibility toggle, "Remember Me" session toggle, password recovery link, and submit trigger with loading state.

**#### Page 3: Registration & Onboarding Portal (\`/auth/register\`)**
\* **\*\*Section 1 (Account Path Selection):\*\*** Separate paths for "Student Account Registration" and "Corporate Partner Onboarding".
\* **\*\*Section 2 (Dynamic Verification Fields):\*\***
  \* *\*For Students:\** Institutional Roll Number verification, Department selector, Expected Graduation Year, and Password setup.
  \* *\*For Recruiters:\** Registered Corporate Entity Name, Corporate Domain Email, Industry Sector, HR Point-of-Contact Phone, and Website URL.

---

**### Zone 2: Student Portal (\`/student/\*\`)**

**#### Page 4: Student Overview Dashboard (\`/student/dashboard\`)**
\* **\*\*Section 1 (Academic Status Bar):\*\*** Display of Student Roll Number, Registered Department, Current GPA, Placement Status Pill (\`UNPLACED\`, \`INTERVIEWING\`, \`PLACED\`), and Profile Completion Indicator.
\* **\*\*Section 2 (Active Application Progress):\*\*** Tracked cards for in-progress applications grouped by stage (\`Review Pending\`, \`Shortlisted\`, \`Technical Round\`, \`Offer Extended\`) with timestamps.
\* **\*\*Section 3 (Personalized Job Recommendations):\*\*** Curated list of newly posted vacancies matching the student's exact department and GPA eligibility cutoff.
\* **\*\*Section 4 (Scheduled Assessments & Interviews):\*\*** Timeline display containing upcoming technical interviews, screening tests, dates, time slots, and virtual meeting links.

**#### Page 5: Job & Internship Opportunity Explorer (\`/student/jobs\`)**
\* **\*\*Section 1 (Filter & Discovery Toolbar):\*\*** Full-text search by title/company, filter by minimum compensation, department qualification, and application deadline countdown.
\* **\*\*Section 2 (Opportunity Feed Grid):\*\*** Information cards displaying Company Name, Job Role, Vacancies, Package, and a dynamic qualification banner (\`Eligible to Apply\` vs. \`GPA Requirement Not Met\`).
\* **\*\*Section 3 (Pagination & Filter Meta):\*\*** Total job count indicators and sorting controls (Newest, Highest Salary, Earliest Deadline).

**#### Page 6: Job Details & Application Terminal (\`/student/jobs/[id]\`)**
\* **\*\*Section 1 (Role Header Summary):\*\*** Company Entity, Role Title, Location Type (On-site / Hybrid / Remote), Posting Date, and Application Deadline countdown.
\* **\*\*Section 2 (Job Description & Requirements):\*\*** Full job scope, technical requirements, and explicit eligibility criteria checklist.
\* **\*\*Section 3 (Application Action Container):\*\***
  \* *\*When Qualified:\** One-click submission trigger, resume version selector, optional statement of interest, and confirmation prompt.
  \* *\*When Ineligible:\** Explicit diagnostic alert (e.g., *\*"Eligibility cutoff requires a minimum GPA of 3.50; your registered GPA is 3.20"\**).

**#### Page 7: Application Tracking Center (\`/student/applications\`)**
\* **\*\*Section 1 (Application Metrics Strip):\*\*** Metrics for Total Applications Submitted, Active Shortlists, Interviews Completed, and Formal Offers Received.
\* **\*\*Section 2 (Historical Applications Matrix):\*\*** Data table containing Company Name, Applied Position, Submission Date, Current Evaluation Stage, and Action Menu (View Details, Withdraw Application).

**#### Page 8: Student Profile & Career Portfolio (\`/student/profile\`)**
\* **\*\*Section 1 (Verified Academic Records):\*\*** Read-only verified records (Full Name, Roll Number, Department, Registration ID, Semester-wise GPA progression).
\* **\*\*Section 2 (Resume & Document Management):\*\*** PDF resume upload container, portfolio links, GitHub URL, and LinkedIn integration.
\* **\*\*Section 3 (Technical Skill Matrix):\*\*** Standardized skill tags used by system matchmaking algorithms.

---

**### Zone 3: Corporate Recruiter Portal (\`/recruiter/\*\`)**

**#### Page 9: Recruiter Command Center (\`/recruiter/dashboard\`)**
\* **\*\*Section 1 (Recruitment Operations Metrics):\*\*** Total Active Postings, Total Received Candidates, Candidates in Interview Pipeline, Total Confirmed Selections.
\* **\*\*Section 2 (Active Postings Overview):\*\*** Summary list of open recruitment drives showing application volumes and unreviewed candidate counts.
\* **\*\*Section 3 (Urgent Actions & Deadlines):\*\*** Priority items requiring attention (e.g., pending shortlists for approaching interview dates).

**#### Page 10: Job Creation & Lifecycle Management (\`/recruiter/jobs/new\` and \`/recruiter/jobs\`)**
\* **\*\*Section 1 (Posting Specifications Form):\*\*** Job Title, Employment Type (Internship vs. Full-time), Vacancy Count, Salary Range, and Application Deadline Picker.
\* **\*\*Section 2 (Automated Eligibility Ruleset):\*\*** Minimum GPA cutoff slider, Department checkboxes (e.g., CS, IT, ECE, Mechanical), and required technical skills.
\* **\*\*Section 3 (Job Description & Selection Stages):\*\*** Detailed job specifications and custom evaluation round definitions (e.g., Round 1: Aptitude, Round 2: Technical, Round 3: HR).

**#### Page 11: Applicant Screening & Pipeline Review (\`/recruiter/jobs/[id]/applicants\`)**
\* **\*\*Section 1 (Recruitment Stage Funnel):\*\*** Visual pipeline tracking conversion across stages (\`Applied\` $\rightarrow$ \`Shortlisted\` $\rightarrow$ \`Interviewing\` $\rightarrow$ \`Selected\`).
\* **\*\*Section 2 (Candidate Evaluation Table):\*\*** Filterable table listing Candidate Name, Roll Number, Department, GPA, Resume View Link, Current Application Status, and Action Menu.
\* **\*\*Section 3 (Candidate Detail Drawer):\*\*** Slide-out panel providing a full profile view, embedded resume viewer, interview feedback notes, and status transition buttons (\`Shortlist\`, \`Advance to Interview\`, \`Mark as Selected\`, \`Reject\`).

---

**### Zone 4: Placement Officer (Executive MIS) Zone**

**#### Page 12: Executive Analytics & MIS Command Center (\`/officer/dashboard\`)**
\* **\*\*Section 1 (Core Institutional KPIs):\*\***
  \* Overall Institutional Placement Percentage.
  \* Total Placed vs. Unplaced Students Ratio.
  \* Active Corporate Partners Count.
  \* Average Institutional Package and Highest Offer Benchmark.
\* **\*\*Section 2 (Departmental Placement Comparison):\*\*** Comparative bar chart contrasting placement percentages across academic branches (CS vs. IT vs. ECE vs. Mechanical).
\* **\*\*Section 3 (Recruitment Pipeline Conversion Funnel):\*\*** End-to-end institutional conversion chart mapping Total Registered Cohort $\rightarrow$ Applications $\rightarrow$ Shortlists $\rightarrow$ Final Accepted Offers.
\* **\*\*Section 4 (Live Operational Audit Stream):\*\*** Real-time feed of transactional platform actions (e.g., student application approvals, recruiter selections, status updates).

**#### Page 13: Academic Department Analytics (\`/officer/analytics\`)**
\* **\*\*Section 1 (Departmental Filter Selector):\*\*** Filter to view comprehensive statistics for individual departments.
\* **\*\*Section 2 (Compensation Tier Distribution):\*\*** Distribution chart categorizing placements by salary brackets (Tier 1: High Package, Tier 2: Mid Range, Tier 3: Entry Level).
\* **\*\*Section 3 (Recruiter Performance Leaderboard):\*\*** Table ranking corporate partners by hiring volume, average candidate GPA accepted, and multi-year visit consistency.

**#### Page 14: Master Student Directory & Administrative Overrides (\`/officer/students\`)**
\* **\*\*Section 1 (Global Directory Search & Filter):\*\*** Search by Name or Roll Number; Filter by Branch, Academic Standing, Placement Status, and CGPA range.
\* **\*\*Section 2 (Master Student Data Matrix):\*\*** Comprehensive cohort table with bulk operational actions (Export Selected, Update Status, Flag Inactive).
\* **\*\*Section 3 (Administrative Override Console):\*\*** Modal interface enabling the placement officer to manually correct a student's status or GPA record, with required audit logging.

**#### Page 15: Automated Management Report Generator (\`/officer/reports\`)**
\* **\*\*Section 1 (Custom Report Query Builder):\*\*** Filter panel with parameters for Academic Cohort Year, Department Selection, GPA Bounds, and Placement Status.
\* **\*\*Section 2 (Report Data Preview Grid):\*\*** Live tabular preview of data meeting specified filter criteria.
\* **\*\*Section 3 (Export Command Bar):\*\***
  \* **\*\*Export to Structured CSV/Excel:\*\*** Machine-readable spreadsheet export for departmental accreditation filings.
  \* **\*\*Generate Official PDF Report:\*\*** Formatted institutional document featuring college headers, executive summary graphs, candidate breakdowns, and signature lines.

**#### Page 16: System Configuration & Security Audit Logs (\`/officer/settings\`)**
\* **\*\*Section 1 (Recruitment Drive Lifecycle Controls):\*\*** Controls to open/close recruitment sessions and configure campus registration cutoff dates.
\* **\*\*Section 2 (Departmental & Curriculum Management):\*\*** Interface to register new academic branches, degree programs, and curriculum tracks.
\* **\*\*Section 3 (Immutable Audit Log Table):\*\*** Complete administrative trail tracking administrative actions (Actor, Event Type, Target Entity, Timestamp, Network IP) for governance and data integrity.

---

**## 4. Relational Data Architecture & Entities**

The relational database schema is structured for transactional data integrity, fast analytical rollups, and permanent historical auditing.

+------------------+         +-------------------+         +-------------------+
\|      users       |         |     students      |         |       jobs        |
+------------------+         +-------------------+         +-------------------+
\| user\_id (PK)     |<------->| student\_id (PK)   |         | job\_id (PK)       |
\| email            |         | user\_id (FK)      |         | recruiter\_id (FK) |
\| password\_hash    |         | full\_name         |         | role\_title        |
\| role             |         | roll\_number       |         | min\_gpa\_req       |
+------------------+         | department        |         | vacancies         |
\| gpa               |         | status            |
\| placement\_status  |         +-------------------+
+-------------------+                   ^
^                             |
\|     +------------------+    |
+-----|   applications   |----+
+------------------+
\| app\_id (PK)      |
\| student\_id (FK)  |
\| job\_id (FK)      |
\| app\_status       |
+------------------+


**### Table Definitions & Attributes**

**#### 1. \`users\` (Authentication & Identities)**
\* \`user\_id\` (UUID, Primary Key): Unique platform identifier.
\* \`email\` (VARCHAR(255), Unique, Not Null): User login address.
\* \`password\_hash\` (VARCHAR(255), Not Null): Securely hashed credentials.
\* \`role\` (ENUM: \`'STUDENT'\`, \`'RECRUITER'\`, \`'OFFICER'\`, Not Null): System permission tier.
\* \`created\_at\` (TIMESTAMP WITH TIME ZONE, Default: Current Time).
\* \`updated\_at\` (TIMESTAMP WITH TIME ZONE, Default: Current Time).

**#### 2. \`students\` (Academic Cohort Records)**
\* \`student\_id\` (UUID, Primary Key): Unique student record identifier.
\* \`user\_id\` (UUID, Foreign Key $\rightarrow$ \`users.user\_id\`, Unique, Not Null).
\* \`full\_name\` (VARCHAR(255), Not Null): Student's legal name.
\* \`roll\_number\` (VARCHAR(50), Unique, Not Null): Institutional registration roll number.
\* \`department\` (VARCHAR(100), Not Null): Academic branch (e.g., \`CS\`, \`IT\`, \`ECE\`, \`Civil\`).
\* \`gpa\` (DECIMAL(3,2), Not Null, Check: \`gpa >= 0.00 AND gpa <= 4.00\`): Cumulative GPA.
\* \`graduation\_year\` (INTEGER, Not Null): Cohort graduation year.
\* \`resume\_url\` (TEXT): Cloud link to uploaded PDF resume.
\* \`skills\` (TEXT[]): Array of registered skill identifiers.
\* \`placement\_status\` (ENUM: \`'UNPLACED'\`, \`'APPLIED'\`, \`'INTERVIEWING'\`, \`'PLACED'\`, Default: \`'UNPLACED'\`).
\* \`created\_at\` (TIMESTAMP WITH TIME ZONE, Default: Current Time).

**#### 3. \`recruiters\` (Corporate Partner Profiles)**
\* \`recruiter\_id\` (UUID, Primary Key): Unique recruiter identifier.
\* \`user\_id\` (UUID, Foreign Key $\rightarrow$ \`users.user\_id\`, Unique, Not Null).
\* \`company\_name\` (VARCHAR(255), Not Null): Registered enterprise name.
\* \`company\_website\` (VARCHAR(255)): Official corporate website.
\* \`industry\_sector\` (VARCHAR(100)): Sector classification (e.g., Software, Finance, Engineering).
\* \`contact\_phone\` (VARCHAR(50)): Primary contact number.
\* \`is\_verified\` (BOOLEAN, Default: True): Verification flag.
\* \`created\_at\` (TIMESTAMP WITH TIME ZONE, Default: Current Time).

**#### 4. \`jobs\` (Recruitment Openings & Rules)**
\* \`job\_id\` (UUID, Primary Key): Unique job vacancy identifier.
\* \`recruiter\_id\` (UUID, Foreign Key $\rightarrow$ \`recruiters.recruiter\_id\`, Not Null).
\* \`role\_title\` (VARCHAR(255), Not Null): Position designation.
\* \`job\_description\` (TEXT, Not Null): Detailed job requirements.
\* \`min\_gpa\_req\` (DECIMAL(3,2), Default: \`0.00\`): Minimum eligibility GPA cutoff.
\* \`eligible\_departments\` (TEXT[], Not Null): Array of allowed branches (e.g., \`['CS', 'IT']\`).
\* \`vacancies\` (INTEGER, Not Null, Check: \`vacancies > 0\`).
\* \`salary\_package\` (VARCHAR(100)): Compensation string (e.g., \`$10,000/yr\`).
\* \`application\_deadline\` (TIMESTAMP WITH TIME ZONE, Not Null): Cutoff date.
\* \`status\` (ENUM: \`'OPEN'\`, \`'CLOSED'\`, \`'ARCHIVED'\`, Default: \`'OPEN'\`).
\* \`created\_at\` (TIMESTAMP WITH TIME ZONE, Default: Current Time).

**#### 5. \`applications\` (Transactional Matching Engine)**
\* \`app\_id\` (UUID, Primary Key): Unique application instance identifier.
\* \`student\_id\` (UUID, Foreign Key $\rightarrow$ \`students.student\_id\`, Not Null).
\* \`job\_id\` (UUID, Foreign Key $\rightarrow$ \`jobs.job\_id\`, Not Null).
\* \`applied\_date\` (TIMESTAMP WITH TIME ZONE, Default: Current Time).
\* \`app\_status\` (ENUM: \`'PENDING'\`, \`'SHORTLISTED'\`, \`'INTERVIEWING'\`, \`'REJECTED'\`, \`'SELECTED'\`, Default: \`'PENDING'\`).
\* \`recruiter\_feedback\` (TEXT): Optional evaluation feedback notes.
\* \`updated\_at\` (TIMESTAMP WITH TIME ZONE, Default: Current Time).
\* **\*\*Constraint:\*\*** Unique pair constraint on (\`student\_id\`, \`job\_id\`) to prevent duplicate submissions.

**#### 6. \`audit\_logs\` (Governance & Long-Term Data Retention)**
\* \`log\_id\` (UUID, Primary Key): Unique log entry.
\* \`actor\_id\` (UUID, Foreign Key $\rightarrow$ \`users.user\_id\`, Nullable on system events).
\* \`action\_type\` (VARCHAR(100), Not Null): Description of action (e.g., \`STATUS\_OVERRIDE\`, \`JOB\_CLOSED\`).
\* \`target\_entity\` (VARCHAR(100), Not Null): Affected table name.
\* \`details\` (JSONB): Structured payload capturing previous state and updated state.
\* \`created\_at\` (TIMESTAMP WITH TIME ZONE, Default: Current Time).

---

**## 5. Decision-Support & MIS Analytical Logic**

The analytical core of the system derives high-level management metrics from underlying transactional tables:

**### 5.1 Institutional Placement Percentage Formula**
$$\text{Overall Placement Rate (\\%)} = \left( \frac{\sum \text{Students where } \text{placement\\\_status} = \text{'PLACED'}}{\text{Total Registered Students in Cohort}} \right) \times 100$$

**### 5.2 Departmental Placement Ratio Index**
Calculated independently for each academic department to identify performance gaps:
$$\text{Department Placement Rate (\\%)} = \left( \frac{\text{Students in Department with Status 'PLACED'}}{\text{Total Registered Students in Department}} \right) \times 100$$

**### 5.3 Automated Candidate Matching Predicate**
The conditional query used to render opportunities to students and prevent unqualified applications:
$$\text{Candidate Qualified} \iff (\text{students.gpa} \ge \text{jobs.min\\\_gpa\\\_req}) \land (\text{students.department} \in \text{jobs.eligible\\\_departments}) \land (\text{jobs.status} = \text{'OPEN'})$$

---

**## 6. Access Control & Security Matrix (RBAC)**

\| System Resource / Action | Student Role | Corporate Recruiter | Placement Officer (Manager) |
\| :--- | :--- | :--- | :--- |
\| **\*\*Browse Job Directory\*\*** | Qualified listings only | Self-posted listings only | Full system directory |
\| **\*\*Submit Applications\*\*** | Permitted (if eligible) | Restricted | Restricted |
\| **\*\*Review Candidate Resumes\*\*** | Restricted (own resume only) | Applicants for own listings | All registered students |
\| **\*\*Update Application State\*\*** | Restricted | Permitted (for own listings) | Full administrative override |
\| **\*\*View Executive Analytics\*\*** | Restricted | Restricted | Full dashboard access |
\| **\*\*Export Official Reports\*\*** | Restricted | Restricted | Full CSV/PDF generation |
\| **\*\*System Configuration\*\*** | Restricted | Restricted | Full administrative control |

---

**## 7. Complete System File & Directory Architecture**

\`\`\`text
cipts-placement-system/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (public)/
│   │   │   ├── page.tsx                 # Public Landing Page
│   │   │   └── layout.tsx
│   │   ├── student/
│   │   │   ├── layout.tsx               # Student Shell
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── jobs/
│   │   │   │   ├── page.tsx             # Job Explorer
│   │   │   │   └── [id]/page.tsx        # Job Details & Apply
│   │   │   ├── applications/page.tsx
│   │   │   └── profile/page.tsx
│   │   ├── recruiter/
│   │   │   ├── layout.tsx               # Recruiter Shell
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── jobs/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx         # Post a Job Form
│   │   │   │   └── [id]/page.tsx        # Job Applicants Review
│   │   │   └── profile/page.tsx
│   │   ├── officer/
│   │   │   ├── layout.tsx               # Officer Sidebar & Shell
│   │   │   ├── dashboard/page.tsx       # MIS Command Center
│   │   │   ├── analytics/page.tsx       # Department Breakdown
│   │   │   ├── students/page.tsx        # Student Directory & Overrides
│   │   │   ├── reports/page.tsx         # PDF/CSV Export Engine
│   │   │   └── settings/page.tsx        # Audit Logs & Config
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── export/
│   │   │   │   ├── csv/route.ts
│   │   │   │   └── pdf/route.ts
│   │   │   ├── analytics/route.ts
│   │   │   └── jobs/route.ts
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                          # Base Component Primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── table.tsx
│   │   │   ├── badge.tsx
│   │   │   └── select.tsx
│   │   ├── dashboard/
│   │   │   ├── AnimatedCounter.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   ├── DepartmentBarChart.tsx
│   │   │   └── FunnelChart.tsx
│   │   ├── navigation/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── MobileDrawer.tsx
│   │   │   └── UserDropdown.tsx
│   │   └── shared/
│   │       ├── SkeletonTable.tsx
│   │       ├── StatusBadge.tsx
│   │       └── FilterToolbar.tsx
│   ├── lib/
│   │   ├── supabaseClient.ts
│   │   ├── db.ts                        # Database Connection Pool
│   │   ├── utils.ts                     # Formatting Utilities
│   │   └── exportHelpers.ts             # CSV/PDF Export Formatting Logic
│   └── middleware.ts                    # RBAC Route Protection Engine
├── public/
│   ├── college-logo.svg
│   └── hero-pattern.svg
├── .env.local
├── tailwind.config.ts
├── tsconfig.json
└── package.json
8\. Execution & Phased Delivery Strategy
Development should be carried out in five sequential phases to ensure complete structural stability:

Phase 1: Data Modeling & Identity Infrastructure: Deploy database schema migrations, configure unique constraints and foreign keys, set up password hashing and session tokens, and implement role-based route middleware.

Phase 2: Operational Workflows: Construct student profile forms with GPA validation, recruiter job-posting forms with departmental criteria selection, and the candidate application pipeline with duplicate-submission prevention.

Phase 3: Administrative MIS Analytics: Build aggregation queries for department placement rates, embed interactive comparison bar charts and conversion funnels, and construct the live operational activity stream.

Phase 4: Reporting & Export Engine: Implement filtering modules for custom criteria searches and connect client-side tabular CSV and styled PDF document generators.

Phase 5: UI/UX Refinement: Add microinteraction states, status indicator animations, skeleton loaders, and responsive drawer navigation.