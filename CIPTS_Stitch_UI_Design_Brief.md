# CIPTS — AI UI Design Brief for Stitch / AI UI Tools

## 0. Core Instruction

Design a complete responsive website for **College Internships & Placement Tracking System (CIPTS)**.

CIPTS is an institutional internship and placement management platform for colleges. It connects students, corporate recruiters, and placement officers in one controlled system.

Use the attached visual reference as the **primary visual direction**.

Do not make a generic admin dashboard.

The website should feel like a premium education/career platform: editorial, airy, human, soft, trustworthy, modern, and highly polished.

Use the visual language of the reference:
- Pale sky-blue atmosphere
- Warm ivory/cream sections
- Large editorial typography
- Mixed serif + sans-serif typography
- Huge whitespace
- Soft cloud-like gradients
- Rounded cards
- Thin translucent borders
- Floating content blocks
- Human photography
- Small circular avatars
- Minimal navigation
- Subtle glassmorphism
- Soft shadows
- Asymmetric compositions
- Large centered hero
- Editorial section layouts
- Premium SaaS finish

Do NOT copy reference branding, text, logo, or exact composition. Recreate its design language for CIPTS.

---

# 1. Product Context

## Product Name

**College Internships & Placement Tracking System**

Short name:

**CIPTS**

## Product Type

Institutional Management Information System for:

1. Students
2. Corporate Recruiters
3. Placement Officers

## Main Goal

Replace spreadsheets, scattered emails, notice boards, and disconnected recruitment workflows with one synchronized platform.

The system manages:

- Student academic eligibility
- Internship and job opportunities
- Corporate partner onboarding
- Job posting
- Automated eligibility screening
- Applications
- Recruitment stages
- Interviews
- Candidate evaluation
- Placement tracking
- Department analytics
- Institutional KPIs
- Reports
- Audit logs

---

# 2. Visual Direction

## Reference Style

The provided reference shows a premium creator/education landing page with:

- Large centered headline
- Light blue sky background
- Warm cream lower sections
- Cloud textures
- Minimal navigation
- Pill-shaped controls
- Large human-centered hero visual
- Floating testimonial/stat elements
- Rounded image containers
- Editorial typography
- Serif emphasis inside sans-serif headlines
- Large section spacing
- Soft transitions between background colors
- Small uppercase eyebrow labels
- Thin separators
- Minimal iconography
- Strong visual hierarchy
- Human photography instead of excessive illustrations
- Cards that feel integrated into page rather than boxed dashboard widgets

Apply this visual language to CIPTS.

---

# 3. Design System

## 3.1 Color Palette

### Primary Background

```text
Sky Blue:
#B8DDEB

Soft Sky:
#D8EEF4

Cloud White:
#F8FAF8

Warm Ivory:
#FFF8E9

Cream:
#F7F0DE
```

### Main Text

```text
Ink:
#17191C

Soft Ink:
#34373B

Muted Text:
#73777B
```

### Primary Brand Accent

Use restrained indigo/blue for interactive system actions.

```text
Primary Indigo:
#4F46E5

Deep Indigo:
#3730A3
```

Use this mainly for:
- Primary CTA
- Active navigation
- Important system actions
- Links
- Selected states

Do not allow indigo to dominate landing-page visuals.

### Semantic Colors

```text
Success:
#059669

Success Background:
#ECFDF5

Warning:
#D97706

Warning Background:
#FFFBEB

Error:
#DC2626

Error Background:
#FEF2F2

Neutral:
#71717A

Neutral Background:
#F4F4F5
```

### Borders

```text
Soft Border:
#E7E8E5

Glass Border:
rgba(255,255,255,0.55)

Dark Border:
#2A2C30
```

---

# 4. Typography

Use a premium editorial pairing.

## Primary Sans

Recommended:

**Manrope**

Use for:
- Navigation
- Body
- Buttons
- Forms
- Dashboard labels
- Tables
- Metadata
- UI controls

Alternative:

**Inter**

## Editorial Serif

Recommended:

**DM Serif Display**

Use selectively for:
- Hero emphasis
- Important words
- Section headings
- Marketing statements
- Large statistics

Use serif sparingly.

Example:

> Build better careers through **smarter placement**

"Build better careers through" = sans

"smarter placement" = serif

## Typography Behavior

Headlines:
- Large
- Tight tracking
- High line-height control
- Maximum width around 850–1000px
- Use mixed serif/sans emphasis

Body:
- 15–18px
- Comfortable line-height
- Muted gray

Small labels:
- 10–12px
- Uppercase
- Letter spacing
- Muted gray

Dashboard numbers:
- Tabular figures
- Monospace optional
- Strong weight

Recommended numeric font:

**Geist Mono**

---

# 5. Layout System

## Desktop

Maximum content width:

```text
1200px–1320px
```

Main horizontal padding:

```text
32px–64px
```

## Mobile

Horizontal padding:

```text
20px–24px
```

## Border Radius

Use generous rounding.

```text
Small:
10px

Medium:
16px

Large:
24px

Hero:
32px–40px

Pills:
999px
```

Avoid sharp rectangular cards.

---

# 6. Spacing

Use generous vertical whitespace.

Typical section spacing:

```text
120px–180px
```

Dashboard spacing:

```text
24px–32px
```

Landing-page hero:

```text
140px+ top/bottom breathing room
```

The design should never feel cramped.

---

# 7. Visual Effects

Use subtle effects only.

## Background

Use soft gradients:

```text
Sky Blue → Soft White → Warm Ivory
```

Add extremely subtle cloud/noise textures.

Avoid strong gradients.

## Glassmorphism

Use selectively:

```text
background: rgba(255,255,255,0.45)
border: 1px solid rgba(255,255,255,0.55)
backdrop-filter: blur(16px)
```

Good for:
- Navigation
- Floating stats
- Hero cards
- Small overlays

Do not turn entire dashboard into glass.

## Shadows

Use soft layered shadows.

Avoid:
- Heavy black shadows
- Neon glow
- Excessive drop shadows

## Motion

Use subtle:
- Fade-in
- Translate-up
- Hover elevation
- Scale on click
- Number counters
- Progress animations
- Skeleton loading

Interactive controls:

```text
active:scale-[0.98]
```

---

# 8. Global Navigation

## Landing Navigation

Minimal floating navigation.

Left:

**CIPTS logo**

Center:

- Home
- Opportunities
- Students
- Recruiters
- About

Right:

- Log In
- Get Started

Navigation should look like floating glass pill from reference.

On mobile:

- Logo
- Menu button

---

# 9. Landing Page

Route:

```text
/
```

## Section 1 — Hero

Eyebrow:

```text
COLLEGE CAREER & PLACEMENT PLATFORM
```

Main headline:

```text
Build better careers through
smarter placement
```

Use mixed typography.

Make "smarter placement" serif.

Supporting text:

```text
CIPTS connects students, recruiters, and placement teams through one intelligent platform for internships, recruitment, eligibility, and institutional placement tracking.
```

Primary CTA:

```text
Explore Opportunities
```

Secondary CTA:

```text
For Recruiters
```

Hero visual:

Create large centered recruitment interface inspired by reference's video-call card.

Instead of a person on video call, show:

- Student profile card
- Internship/job card
- Eligibility badge
- Company avatars
- Application progress
- Small floating statistics
- Interview indicator

Use human photography around or inside hero composition.

Floating side elements:

```text
25K+
Student Profiles
```

```text
500+
Corporate Partners
```

```text
94%
Profile Completion
```

Do not overpopulate hero.

---

# 10. Landing Page — Institutional Trust Section

Eyebrow:

```text
WHY CIPTS
```

Heading:

```text
Turn placement operations
into measurable outcomes
```

Two-column editorial layout.

Left:
- Student/recruiter human image
- Floating quote card
- Small play button
- Profile/avatar card

Right:
- Explanation
- Three large statistics
- Thin divider lines

Example:

```text
92%
Placement visibility
```

```text
500+
Recruitment partners
```

```text
10K+
Applications tracked
```

Use reference layout where image occupies left side and editorial text occupies right.

---

# 11. Landing Page — Recruitment Lifecycle

Heading:

```text
From eligibility to offer
```

Supporting text:

```text
One connected workflow for every stage of campus recruitment.
```

Create 4 large rounded cards:

### 01
Student Verification

Academic records, GPA, department, graduation year.

### 02
Opportunity Matching

Automatically identify eligible internships and jobs.

### 03
Evaluation

Track applications, shortlists, interviews, and recruiter feedback.

### 04
Placement

Record final offers and generate institutional analytics.

Cards should have soft sky-blue backgrounds and editorial illustrations/photos.

---

# 12. Landing Page — Role-Based Value

Heading:

```text
One platform.
Three experiences.
```

Three large cards.

## Student

```text
Discover opportunities built around your eligibility.
```

Features:
- Job discovery
- Eligibility checking
- Applications
- Interview tracking
- Career profile

CTA:

```text
Student Portal
```

## Recruiter

```text
Find qualified candidates without recruitment chaos.
```

Features:
- Job posting
- Eligibility rules
- Candidate screening
- Interview pipeline
- Selection management

CTA:

```text
Recruiter Portal
```

## Placement Officer

```text
See your institution's placement performance in real time.
```

Features:
- Institutional KPIs
- Department analytics
- Student directory
- Reports
- Audit logs

CTA:

```text
Executive Center
```

---

# 13. Landing Page — Opportunities Preview

Heading:

```text
Opportunities worth applying for
```

Show premium opportunity cards.

Each card:

- Company logo
- Company name
- Role
- Internship / Full-time
- Location
- Salary
- Deadline
- Eligible / Not eligible
- Apply button

Example:

```text
Software Engineering Intern
Acme Technologies

Internship · Remote
$800 / month

Eligible to Apply

Apply Now
```

Use rounded cards and lots of whitespace.

---

# 14. Landing Page — Final CTA

Large cream/sky section.

Heading:

```text
Your next opportunity
starts here.
```

Supporting text:

```text
Join a smarter campus recruitment ecosystem built for students, recruiters, and institutions.
```

Buttons:

```text
Get Started
Explore Opportunities
```

---

# 15. Student Portal Pages

## Page 1 — Student Dashboard

Route:

```text
/student/dashboard
```

Design:

More functional than marketing page, but retain visual language.

Top:

```text
Good morning, Alex
Your placement journey at a glance.
```

Hero metric area:

- Current GPA
- Placement status
- Profile completion
- Active applications

Application pipeline:

```text
Applied → Shortlisted → Interviewing → Offer
```

Recommended jobs.

Upcoming interviews.

Profile completion card.

Use white/cream surfaces over soft background.

---

# 16. Student Jobs Explorer

Route:

```text
/student/jobs
```

Header:

```text
Find your next opportunity
```

Search bar.

Filters:

- Search
- Department
- Minimum GPA
- Compensation
- Employment Type
- Location
- Deadline

Opportunity grid.

Every job card must clearly show:

```text
Eligible to Apply
```

or

```text
GPA Requirement Not Met
```

Avoid making eligibility ambiguous.

---

# 17. Student Job Details

Route:

```text
/student/jobs/[id]
```

Sections:

1. Company and role header
2. Employment type
3. Location
4. Salary
5. Deadline
6. Description
7. Responsibilities
8. Requirements
9. Eligibility
10. Application panel

Eligible state:

```text
You are eligible to apply.
```

CTA:

```text
Apply Now
```

Ineligible state:

```text
Eligibility cutoff requires a minimum GPA of 3.50.
Your registered GPA is 3.20.
```

CTA disabled.

---

# 18. Student Applications

Route:

```text
/student/applications
```

Metrics:

- Applications
- Shortlisted
- Interviews
- Offers

Application timeline.

Statuses:

```text
Pending
Shortlisted
Interviewing
Rejected
Selected
```

Allow:

- View details
- Withdraw application

---

# 19. Student Profile

Route:

```text
/student/profile
```

Sections:

### Identity

- Full name
- Roll number
- Registration ID
- Department

### Academic

- Current GPA
- Semester GPA
- Graduation year

### Career

- Resume
- Portfolio
- GitHub
- LinkedIn

### Skills

Use pill tags.

Example:

```text
React
Next.js
Flutter
Node.js
Python
Firebase
PostgreSQL
```

---

# 20. Recruiter Portal Pages

## Recruiter Dashboard

Route:

```text
/recruiter/dashboard
```

Header:

```text
Recruitment command center
```

Metrics:

- Active postings
- Candidates received
- Interview pipeline
- Confirmed selections

Active recruitment drives.

Urgent actions.

Deadline alerts.

---

# 21. Recruiter Job Management

Routes:

```text
/recruiter/jobs
/recruiter/jobs/new
```

Job creation form.

Fields:

- Job title
- Employment type
- Vacancy count
- Salary
- Deadline
- Description
- Minimum GPA
- Eligible departments
- Required skills
- Selection rounds

Selection stages:

```text
Round 1 — Aptitude
Round 2 — Technical
Round 3 — HR
```

Use a visual step builder.

---

# 22. Recruiter Applicant Screening

Route:

```text
/recruiter/jobs/[id]/applicants
```

Top funnel:

```text
Applied
↓
Shortlisted
↓
Interviewing
↓
Selected
```

Candidate table:

- Name
- Roll number
- Department
- GPA
- Resume
- Status
- Actions

Candidate drawer:

- Profile
- Resume
- Skills
- Academic record
- Interview feedback
- Status controls

Actions:

```text
Shortlist
Advance to Interview
Mark as Selected
Reject
```

---

# 23. Placement Officer Pages

## Executive Dashboard

Route:

```text
/officer/dashboard
```

This is highest-information page.

Header:

```text
Institutional placement overview
```

Core KPIs:

- Overall placement percentage
- Placed students
- Unplaced students
- Active corporate partners
- Average package
- Highest package

Charts:

1. Department placement comparison
2. Recruitment conversion funnel
3. Placement trend
4. Compensation distribution

Live operational activity stream.

---

# 24. Department Analytics

Route:

```text
/officer/analytics
```

Filter:

```text
Department
Cohort
Academic Year
```

Charts:

- Placement rate
- Salary tiers
- Applications
- Shortlists
- Offers
- Recruiter performance

Recruiter leaderboard:

- Hiring volume
- Average accepted GPA
- Visit consistency

Use restrained charts.

Charts should look editorial and premium, not like default BI software.

---

# 25. Master Student Directory

Route:

```text
/officer/students
```

Search:

- Name
- Roll number

Filters:

- Department
- Academic standing
- Placement status
- CGPA

Student table.

Bulk actions:

```text
Export Selected
Update Status
Flag Inactive
```

Administrative override modal.

Every override must display:

```text
This action will be recorded in audit logs.
```

---

# 26. Report Generator

Route:

```text
/officer/reports
```

Report builder.

Filters:

- Cohort year
- Department
- GPA range
- Placement status

Preview data.

Actions:

```text
Export CSV
Export Excel
Generate PDF
```

PDF preview should feel like official institutional documentation.

---

# 27. System Settings & Audit Logs

Route:

```text
/officer/settings
```

Sections:

### Recruitment Controls

- Open recruitment session
- Close recruitment session
- Registration cutoff

### Academic Structure

- Departments
- Degree programs
- Curriculum tracks

### Audit Logs

Columns:

- Actor
- Event type
- Target entity
- Timestamp
- Network IP

Make audit logs dense and professional.

---

# 28. Authentication Pages

## Login

Route:

```text
/auth/login
```

Visual direction:

Split-screen or centered card.

Left:

- Large editorial statement
- Soft sky background
- Human campus/career image

Right:

- CIPTS logo
- Role selector
- Email
- Password
- Remember me
- Forgot password
- Login

Roles:

```text
Student
Recruiter
Placement Officer
```

## Registration

Route:

```text
/auth/register
```

First choose:

```text
Student Account
Corporate Partner
```

Student fields:

- Roll number
- Department
- Graduation year
- Email
- Password

Recruiter fields:

- Company
- Corporate email
- Industry
- Contact phone
- Website
- Password

---

# 29. Global Components

Create reusable components:

```text
Button
Card
Badge
Dialog
Input
Select
Table
Tabs
Avatar
MetricCard
StatusBadge
FilterToolbar
Sidebar
MobileDrawer
UserDropdown
SkeletonTable
ApplicationTimeline
Pipeline
FunnelChart
DepartmentBarChart
OpportunityCard
CandidateDrawer
```

---

# 30. Component Styling

## Buttons

Primary:

- Indigo
- White text
- Rounded pill
- Medium height
- Subtle shadow

Secondary:

- White/translucent
- Thin border
- Dark text

Ghost:

- No background
- Minimal hover state

## Cards

Default:

```text
background: #FFFFFF
border: 1px solid #E7E8E5
border-radius: 24px
```

Marketing cards can use:

```text
background: rgba(255,255,255,0.55)
backdrop-filter: blur(16px)
```

## Badges

Pill shape.

Examples:

```text
Eligible to Apply
Shortlisted
Interviewing
Selected
Rejected
```

---

# 31. Responsive Design

Desktop first but fully responsive.

## Desktop

Use:
- Wide editorial layouts
- Asymmetric image/text sections
- Floating cards
- Multi-column dashboards

## Tablet

Reduce:
- Section spacing
- Hero typography
- Grid columns

## Mobile

Navigation becomes drawer.

Hero becomes stacked.

Floating cards become inline.

Dashboard cards become one/two-column.

Tables become:
- Horizontal scroll
- Or mobile card list where appropriate

Never allow text or controls to overflow.

---

# 32. Image Direction

Use authentic human photography.

Preferred subjects:

- Students
- Graduates
- Recruiters
- Faculty
- Career advisors
- Interview scenes
- Campus environments

Visual characteristics:

- Bright natural light
- Soft backgrounds
- Clean clothing
- Friendly professional expressions
- Editorial photography
- White/cream/blue environments

Avoid:
- Generic corporate handshake stock photos
- Dark corporate imagery
- Overly posed business scenes
- Excessive laptop-only stock photos

Use circular portraits for:
- Testimonials
- Recruiters
- Students
- Activity feeds

---

# 33. Iconography

Use minimal line icons.

Recommended:

**Lucide Icons**

Avoid mixing icon libraries.

Icons should be:
- Thin
- Small
- Consistent
- Secondary to typography

---

# 34. Dashboard Visual Philosophy

Do not design every metric as a colorful rectangular card.

Use hierarchy:

```text
Large KPI
    ↓
Supporting metric
    ↓
Thin divider
    ↓
Chart / activity
```

Some metrics can be integrated directly into layouts.

Use whitespace as a design element.

---

# 35. Data Model Context

Core tables:

```text
users
students
recruiters
jobs
applications
audit_logs
```

## users

```text
user_id
email
password_hash
role
created_at
updated_at
```

Roles:

```text
STUDENT
RECRUITER
OFFICER
```

## students

```text
student_id
user_id
full_name
roll_number
department
gpa
graduation_year
resume_url
skills
placement_status
created_at
```

## recruiters

```text
recruiter_id
user_id
company_name
company_website
industry_sector
contact_phone
is_verified
created_at
```

## jobs

```text
job_id
recruiter_id
role_title
job_description
min_gpa_req
eligible_departments
vacancies
salary_package
application_deadline
status
created_at
```

## applications

```text
app_id
student_id
job_id
applied_date
app_status
recruiter_feedback
updated_at
```

Prevent duplicate applications with unique:

```text
(student_id, job_id)
```

## audit_logs

```text
log_id
actor_id
action_type
target_entity
details
created_at
```

---

# 36. Core Business Logic

## Candidate Eligibility

A student is eligible when:

```text
students.gpa >= jobs.min_gpa_req
AND
students.department IN jobs.eligible_departments
AND
jobs.status = 'OPEN'
```

The UI must reflect this rule consistently.

Never show a student as eligible if backend rules reject application.

---

# 37. Placement Analytics

## Overall Placement Rate

```text
Placed Students / Total Registered Students × 100
```

## Department Placement Rate

```text
Placed Students in Department /
Total Registered Students in Department × 100
```

Analytics should update from transactional data.

---

# 38. SEO

## Website SEO Title

```text
CIPTS — College Internship & Placement Management System
```

## SEO Description

```text
CIPTS is a modern college internship and placement management platform that connects students, recruiters, and placement officers through intelligent job matching, eligibility tracking, recruitment pipelines, placement analytics, and institutional reporting.
```

## Suggested Keywords

```text
college placement management system
college internship management system
student placement portal
campus recruitment software
college recruitment platform
student job portal
internship tracking system
placement cell management software
campus placement management
college career services platform
student recruitment management
placement analytics software
```

## Landing Page H1

```text
Build better careers through smarter placement
```

## Suggested Open Graph Description

```text
Manage internships, campus recruitment, student applications, corporate hiring, placement analytics, and institutional reports from one connected platform.
```

---

# 39. SEO-Friendly Page Metadata

## Home

Title:

```text
CIPTS | College Internship & Placement Management
```

Description:

```text
Connect students, recruiters, and placement teams with one modern platform for internships, campus recruitment, eligibility tracking, applications, and placement analytics.
```

## Student Jobs

Title:

```text
Find Internships & Jobs | CIPTS
```

Description:

```text
Discover internships and job opportunities matched to your academic eligibility, department, GPA, skills, and career goals.
```

## Student Dashboard

Title:

```text
Student Placement Dashboard | CIPTS
```

Description:

```text
Track applications, interviews, shortlisted opportunities, placement status, career profile, and upcoming recruitment activities.
```

## Recruiter Portal

Title:

```text
Campus Recruitment Platform for Employers | CIPTS
```

Description:

```text
Post campus jobs, define eligibility rules, screen qualified candidates, manage interviews, and track recruitment outcomes with CIPTS.
```

## Placement Officer

Title:

```text
College Placement Analytics & MIS | CIPTS
```

Description:

```text
Monitor institutional placement performance, department analytics, recruiter activity, student outcomes, reports, and recruitment operations in real time.
```

---

# 40. Accessibility

Follow WCAG-oriented design principles.

Requirements:

- Strong text contrast
- Visible focus states
- Keyboard navigation
- Semantic headings
- Proper form labels
- Accessible dialogs
- Accessible tables
- Do not rely on color alone for status
- Provide text labels with status badges
- Touch targets at least approximately 44px
- Respect reduced-motion preferences

---

# 41. UI Quality Rules

Do not use:

- Generic purple AI gradients
- Excessive glassmorphism
- Huge rounded rectangles everywhere
- Random colorful dashboard cards
- Dense default admin layouts
- Tiny text
- Excessive shadows
- Stock-photo overload
- Random decorative blobs
- Excessive animations
- Default browser form styling

Do use:

- Editorial typography
- Large whitespace
- Soft atmospheric backgrounds
- Strong visual hierarchy
- Premium photography
- Asymmetric layouts
- Thin borders
- Rounded surfaces
- Subtle glass effects
- Human-centered imagery
- Clear information hierarchy

---

# 42. Stitch Generation Prompt

Use this as primary prompt when generating UI in Stitch or similar AI UI design tools:

> Design a complete responsive web application called **CIPTS — College Internships & Placement Tracking System**.
>
> CIPTS is a premium institutional platform connecting college students, corporate recruiters, and placement officers. It manages internships, job opportunities, academic eligibility, applications, recruitment pipelines, interviews, placement outcomes, institutional analytics, and official reports.
>
> The visual direction must closely follow the provided reference image's **design language**, not its branding or content.
>
> Create an airy editorial education/career website with a pale sky-blue to warm ivory atmosphere, large expressive typography, mixed sans-serif and serif headlines, generous whitespace, soft cloud-like gradients, rounded 24–40px surfaces, thin translucent borders, subtle glassmorphism, soft shadows, human photography, circular avatars, floating statistics, asymmetric image/text compositions, and minimal pill-shaped navigation.
>
> Use **Manrope** for UI/body typography and **DM Serif Display** for selective editorial emphasis. Use dark ink typography around `#17191C`, sky backgrounds around `#B8DDEB`, warm ivory around `#FFF8E9`, white surfaces, restrained indigo `#4F46E5` for primary actions, emerald for success, amber for warnings, and red for errors.
>
> Landing page should feel like a premium education/career brand rather than an enterprise admin dashboard.
>
> Use large centered hero headline:
>
> **Build better careers through smarter placement**
>
> Use a large central recruitment interface visual instead of a generic hero illustration. Show a student profile, opportunity card, eligibility badge, application progress, recruiter avatars, and small floating statistics.
>
> Include sections for:
>
> 1. Hero
> 2. Institutional trust and platform value
> 3. Recruitment lifecycle
> 4. Student / Recruiter / Placement Officer experiences
> 5. Opportunity preview
> 6. Institutional statistics
> 7. Final CTA
>
> Then create authenticated product pages:
>
> - Student Dashboard
> - Student Jobs Explorer
> - Job Details & Application
> - Application Tracking
> - Student Career Profile
> - Recruiter Dashboard
> - Recruiter Job Management
> - Applicant Screening Pipeline
> - Placement Officer Executive Dashboard
> - Department Analytics
> - Master Student Directory
> - Report Generator
> - System Settings & Audit Logs
> - Role-aware Login
> - Registration & Onboarding
>
> Product pages should retain the same visual language but become more functional and information-dense. Use white/cream surfaces, subtle sky backgrounds, editorial section headers, restrained KPI cards, clean charts, rounded tables, soft borders, and strong whitespace.
>
> Build reusable components and consistent responsive behavior.
>
> Do not make every element rounded. Do not use generic AI-dashboard aesthetics. Do not use neon gradients. Do not use excessive shadows. Do not make the interface look like a banking dashboard.
>
> Prioritize visual hierarchy, typography, whitespace, human imagery, editorial composition, accessibility, responsive layouts, and premium SaaS polish.

---

# 43. Final Design Principle

CIPTS should visually communicate:

```text
Human
+
Institutional
+
Career-focused
+
Trustworthy
+
Premium
+
Data-driven
```

Reference image provides visual personality.

CIPTS system specification provides product structure.

Do not let one overpower the other.

Landing pages should feel editorial and emotional.

Authenticated pages should feel operational and precise.

Both must feel like same product.
