export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ProgramStatus =
  | "draft"
  | "published"
  | "applications_open"
  | "reviewing"
  | "completed"
  | "archived";
export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "shortlisted"
  | "accepted"
  | "rejected"
  | "withdrawn";
export type QuestionType =
  | "short_text"
  | "long_text"
  | "url"
  | "number"
  | "boolean"
  | "single_select"
  | "multi_select";
export type UserRole = "user" | "reviewer" | "admin";
export type ReviewRecommendation =
  | "pending"
  | "shortlist"
  | "accept"
  | "reject";

export type AdminUserMetrics = {
  total_accounts: number;
  confirmed_accounts: number;
  unconfirmed_accounts: number;
  new_accounts_30d: number;
  active_accounts_30d: number;
  completed_profiles: number;
  accounts_with_applications: number;
  administrator_accounts: number;
  reviewer_accounts: number;
  suspended_accounts: number;
};

export type AdminUserRow = {
  total_count: number;
  user_id: string;
  email: string | null;
  full_name: string | null;
  student_number: string | null;
  registration_number: string | null;
  university: string | null;
  course: string | null;
  year_of_study: number | null;
  role: UserRole;
  email_confirmed: boolean;
  suspended: boolean;
  account_created_at: string;
  last_sign_in_at: string | null;
  application_count: number;
  submitted_application_count: number;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string | null;
          student_number: string;
          registration_number: string;
          university: string | null;
          course: string | null;
          year_of_study: number | null;
          bio: string | null;
          github_url: string | null;
          linkedin_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email?: string | null;
          student_number: string;
          registration_number: string;
          university?: string | null;
          course?: string | null;
          year_of_study?: number | null;
          bio?: string | null;
          github_url?: string | null;
          linkedin_url?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      user_roles: {
        Row: { user_id: string; role: UserRole; created_at: string };
        Insert: { user_id: string; role?: UserRole };
        Update: { role?: UserRole };
        Relationships: [];
      };
      programs: {
        Row: {
          id: string;
          title: string;
          slug: string;
          summary: string;
          description: string;
          eligibility: string | null;
          status: ProgramStatus;
          applications_open_at: string | null;
          applications_close_at: string | null;
          program_start_date: string | null;
          program_end_date: string | null;
          stipend_description: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          summary?: string;
          description?: string;
          eligibility?: string | null;
          status?: ProgramStatus;
          applications_open_at?: string | null;
          applications_close_at?: string | null;
          program_start_date?: string | null;
          program_end_date?: string | null;
          stipend_description?: string | null;
          created_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["programs"]["Insert"]>;
        Relationships: [];
      };
      program_questions: {
        Row: {
          id: string;
          program_id: string;
          label: string;
          description: string | null;
          field_type: QuestionType;
          required: boolean;
          position: number;
          configuration: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          program_id: string;
          label: string;
          description?: string | null;
          field_type: QuestionType;
          required?: boolean;
          position?: number;
          configuration?: Json;
        };
        Update: Partial<
          Database["public"]["Tables"]["program_questions"]["Insert"]
        >;
        Relationships: [];
      };
      applications: {
        Row: {
          id: string;
          program_id: string;
          applicant_id: string | null;
          legacy_applicant: Json | null;
          status: ApplicationStatus;
          submitted_at: string | null;
          created_at: string;
          updated_at: string;
          profile_snapshot: Json | null;
        };
        Insert: {
          id?: string;
          program_id: string;
          applicant_id?: string | null;
          legacy_applicant?: Json | null;
          status?: ApplicationStatus;
          submitted_at?: string | null;
          profile_snapshot?: Json | null;
        };
        Update: Partial<Database["public"]["Tables"]["applications"]["Insert"]>;
        Relationships: [];
      };
      application_answers: {
        Row: {
          id: string;
          application_id: string;
          question_id: string;
          answer: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          application_id: string;
          question_id: string;
          answer: Json;
        };
        Update: { answer?: Json };
        Relationships: [];
      };
      reviewer_assignments: {
        Row: {
          id: string;
          application_id: string;
          reviewer_id: string;
          assigned_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          application_id: string;
          reviewer_id: string;
          assigned_by: string;
        };
        Update: never;
        Relationships: [];
      };
      application_reviews: {
        Row: {
          id: string;
          application_id: string;
          reviewer_id: string;
          recommendation: ReviewRecommendation;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          application_id: string;
          reviewer_id: string;
          recommendation?: ReviewRecommendation;
          notes?: string | null;
        };
        Update: {
          recommendation?: ReviewRecommendation;
          notes?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      submit_application: {
        Args: { target_application_id: string };
        Returns: undefined;
      };
      withdraw_application: {
        Args: { target_application_id: string };
        Returns: undefined;
      };
      admin_set_application_status: {
        Args: { target_application_id: string; next_status: ApplicationStatus };
        Returns: undefined;
      };
      admin_user_metrics: {
        Args: Record<PropertyKey, never>;
        Returns: AdminUserMetrics[];
      };
      admin_list_users: {
        Args: {
          search_term?: string | null;
          result_limit?: number;
          result_offset?: number;
        };
        Returns: AdminUserRow[];
      };
    };
    Enums: {
      program_status: ProgramStatus;
      application_status: ApplicationStatus;
      question_type: QuestionType;
      user_role: UserRole;
      review_recommendation: ReviewRecommendation;
    };
    CompositeTypes: Record<string, never>;
  };
};
