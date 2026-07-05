export type Lang = "ar" | "en";

export interface Project {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  bulletsAr: string[];
  bulletsEn: string[];
  tags: string[];
  liveUrl?: string;
  type: "sap" | "web" | "automation";
  imageUrl?: string;
  problemAr?: string;
  problemEn?: string;
  solutionAr?: string;
  solutionEn?: string;
  roleAr?: string;
  roleEn?: string;
  techAr?: string;
  techEn?: string;
  resultsAr?: string;
  resultsEn?: string;
  screenshots?: string[];
}

export interface Experience {
  id: string;
  roleAr: string;
  roleEn: string;
  companyAr: string;
  companyEn: string;
  periodAr: string;
  periodEn: string;
  bulletsAr: string[];
  bulletsEn: string[];
}

export interface Education {
  id: string;
  degreeAr: string;
  degreeEn: string;
  periodAr: string;
  periodEn: string;
  gradeAr: string;
  gradeEn: string;
}

export interface Training {
  id: string;
  titleAr: string;
  titleEn: string;
  providerAr: string;
  providerEn: string;
  periodAr: string;
  periodEn: string;
  bulletsAr: string[];
  bulletsEn: string[];
}

export interface Skill {
  id: string;
  category: "sap" | "web" | "soft";
  nameAr: string;
  nameEn: string;
}

export interface Message {
  id: string;
  senderName: string;
  email: string;
  phone?: string;
  message: string;
  date: string;
  isRead: boolean;
  notes?: string;
}

export interface AnalyticsEvent {
  timestamp: string;
  eventType: "view" | "click_project" | "download_resume" | "chat_message" | "contact_submit";
  details?: string;
}

export interface AnalyticsSummary {
  totalViews: number;
  projectClicks: number;
  resumeDownloads: number;
  chatInteractions: number;
  contactSubmissions: number;
  dailyVisits: { date: string; views: number; actions: number }[];
  categoryClicks: { name: string; value: number }[];
}

export interface ThemeConfig {
  themeName: string;
  primaryColor: string; // e.g., 'blue', 'emerald', 'indigo', 'amber', 'rose'
  isDarkMode: boolean;
  borderRadius: "none" | "sm" | "md" | "lg" | "full";
}

export interface DatabaseState {
  profile: {
    nameAr: string;
    nameEn: string;
    titleAr: string;
    titleEn: string;
    email: string;
    phone: string;
    locationAr: string;
    locationEn: string;
    github: string;
    linkedin?: string;
    bioAr: string;
    bioEn: string;
  };
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  trainings: Training[];
  skills: Skill[];
  messages: Message[];
  analyticsEvents: AnalyticsEvent[];
  theme: ThemeConfig;
  backupHistory: { id: string; timestamp: string; size: number }[];
}

export interface Toast {
  id: string;
  text: string;
  type: "success" | "info" | "error";
}

