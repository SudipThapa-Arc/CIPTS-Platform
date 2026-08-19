export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          app_id: string
          app_status: Database["public"]["Enums"]["application_status"] | null
          applied_date: string
          job_id: string
          recruiter_feedback: string | null
          student_id: string
          updated_at: string
        }
        Insert: {
          app_id?: string
          app_status?: Database["public"]["Enums"]["application_status"] | null
          applied_date?: string
          job_id: string
          recruiter_feedback?: string | null
          student_id: string
          updated_at?: string
        }
        Update: {
          app_id?: string
          app_status?: Database["public"]["Enums"]["application_status"] | null
          applied_date?: string
          job_id?: string
          recruiter_feedback?: string | null
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["job_id"]
          },
          {
            foreignKeyName: "applications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action_type: string
          actor_id: string | null
          created_at: string
          details: Json | null
          log_id: string
          target_entity: string
        }
        Insert: {
          action_type: string
          actor_id?: string | null
          created_at?: string
          details?: Json | null
          log_id?: string
          target_entity: string
        }
        Update: {
          action_type?: string
          actor_id?: string | null
          created_at?: string
          details?: Json | null
          log_id?: string
          target_entity?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          application_deadline: string
          created_at: string
          eligible_departments: string[]
          job_description: string
          job_id: string
          min_gpa_req: number | null
          recruiter_id: string
          role_title: string
          salary_package: string | null
          status: Database["public"]["Enums"]["job_status"] | null
          vacancies: number
        }
        Insert: {
          application_deadline: string
          created_at?: string
          eligible_departments: string[]
          job_description: string
          job_id?: string
          min_gpa_req?: number | null
          recruiter_id: string
          role_title: string
          salary_package?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          vacancies: number
        }
        Update: {
          application_deadline?: string
          created_at?: string
          eligible_departments?: string[]
          job_description?: string
          job_id?: string
          min_gpa_req?: number | null
          recruiter_id?: string
          role_title?: string
          salary_package?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          vacancies?: number
        }
        Relationships: [
          {
            foreignKeyName: "jobs_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "recruiters"
            referencedColumns: ["recruiter_id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      recruiters: {
        Row: {
          company_name: string
          company_website: string | null
          contact_phone: string | null
          created_at: string
          industry_sector: string | null
          is_verified: boolean | null
          recruiter_id: string
          user_id: string
        }
        Insert: {
          company_name: string
          company_website?: string | null
          contact_phone?: string | null
          created_at?: string
          industry_sector?: string | null
          is_verified?: boolean | null
          recruiter_id?: string
          user_id: string
        }
        Update: {
          company_name?: string
          company_website?: string | null
          contact_phone?: string | null
          created_at?: string
          industry_sector?: string | null
          is_verified?: boolean | null
          recruiter_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recruiters_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          created_at: string
          department: string
          full_name: string
          gpa: number
          graduation_year: number
          placement_status:
            | Database["public"]["Enums"]["student_placement_status"]
            | null
          resume_url: string | null
          roll_number: string
          skills: string[] | null
          student_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department: string
          full_name: string
          gpa: number
          graduation_year: number
          placement_status?:
            | Database["public"]["Enums"]["student_placement_status"]
            | null
          resume_url?: string | null
          roll_number: string
          skills?: string[] | null
          student_id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string
          full_name?: string
          gpa?: number
          graduation_year?: number
          placement_status?:
            | Database["public"]["Enums"]["student_placement_status"]
            | null
          resume_url?: string | null
          roll_number?: string
          skills?: string[] | null
          student_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status:
        | "PENDING"
        | "SHORTLISTED"
        | "INTERVIEWING"
        | "REJECTED"
        | "SELECTED"
      job_status: "OPEN" | "CLOSED" | "ARCHIVED"
      student_placement_status:
        | "UNPLACED"
        | "APPLIED"
        | "INTERVIEWING"
        | "PLACED"
      user_role: "STUDENT" | "RECRUITER" | "OFFICER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: [
        "PENDING",
        "SHORTLISTED",
        "INTERVIEWING",
        "REJECTED",
        "SELECTED",
      ],
      job_status: ["OPEN", "CLOSED", "ARCHIVED"],
      student_placement_status: [
        "UNPLACED",
        "APPLIED",
        "INTERVIEWING",
        "PLACED",
      ],
      user_role: ["STUDENT", "RECRUITER", "OFFICER"],
    },
  },
} as const
