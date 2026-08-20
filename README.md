# CIPTS - College Career & Placement Platform

CIPTS is an airy, intuitive ecosystem connecting visionary students with premier career opportunities. Designed with modern aesthetics and robust functionality, it serves as the ultimate bridge between academic institutions, students, and recruiters.

## 🌟 Features

- **Role-Based Portals**: Dedicated dashboards and workflows for Students, Recruiters, and Placement Officers.
- **Student Pipeline**: Apply for jobs, track application statuses in real-time, and build dynamic professional profiles.
- **Recruiter Tools**: Post recruitment drives, manage applications, and shortlist candidates seamlessly.
- **Officer Analytics**: Monitor placements, verify recruiters, and audit system activities with comprehensive reports.
- **Modern UI/UX**: Built with a stunning "Airy Editorial" design system utilizing glassmorphism, dynamic micro-interactions, and premium typography.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL & Row Level Security)
- **Typography**: DM Serif Display & Manrope
- **Icons**: Lucide React / Google Material Symbols

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm
- A Supabase Project

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cipts.git
   cd cipts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   - Copy `.env.example` to `.env.local`
   ```bash
   cp .env.example .env.local
   ```
   - Fill in your Supabase URL and Anon Key in `.env.local`.

4. Initialize the Database:
   - Open your Supabase SQL Editor and run the provided `DATABASE_SCHEMA.sql` script to set up all tables, enums, and Row Level Security (RLS) policies.

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔐 Security & Auth
This project leverages Supabase Authentication paired with Next.js Server Actions and Middleware. Ensure that your `.env.local` is never committed to version control. The `.gitignore` is pre-configured to exclude sensitive environment files.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
