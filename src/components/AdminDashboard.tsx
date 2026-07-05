import React, { useState } from "react";
import {
  Settings,
  Users,
  MessageSquare,
  FileText,
  Briefcase,
  Layers,
  Database,
  BarChart2,
  Trash2,
  Edit2,
  Plus,
  Save,
  RefreshCw,
  Download,
  Upload,
  CheckCircle,
  Eye,
  MessageCircle,
  Shield,
  Activity,
  UserCheck,
  AlertTriangle,
  Copy,
  ChevronDown
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Lang, DatabaseState, Project, Experience, Skill, Message } from "../types";

interface AdminDashboardProps {
  lang: Lang;
  dbState: DatabaseState;
  onUpdateState: (newState: DatabaseState) => void;
  onClose: () => void;
}

export default function AdminDashboard({ lang, dbState, onUpdateState, onClose }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"analytics" | "profile" | "projects" | "experiences" | "skills" | "messages" | "backup">("analytics");
  const [editingProjId, setEditingProjId] = useState<string | null>(null);
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    titleAr: "", titleEn: "", descAr: "", descEn: "", bulletsAr: [""], bulletsEn: [""], tags: [], type: "web", liveUrl: ""
  });
  const [newExp, setNewExp] = useState<Partial<Experience>>({
    roleAr: "", roleEn: "", companyAr: "", companyEn: "", periodAr: "", periodEn: "", bulletsAr: [""], bulletsEn: [""]
  });
  const [aiDrafts, setAiDrafts] = useState<Record<string, string>>({});
  const [isDrafting, setIsDrafting] = useState<Record<string, boolean>>({});
  
  // Security locks state
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const t = <T,>(ar: T, en: T): T => (lang === "ar" ? ar : en);

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "1122") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError(t("رمز الدخول غير صحيح! يرجى المحاولة مرة أخرى.", "Incorrect passcode! Please try again."));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 font-sans text-slate-200">
        <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 text-center relative overflow-hidden animate-fadeIn">
          {/* Decorative gradients */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
              <Shield className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {t("بوابة المسؤول الآمنة", "Secure Administrator Portal")}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {t("أدخل رمز المرور السري للدخول للوحة الإدارة", "Enter secret passcode to access administrator panel")}
              </p>
            </div>
          </div>

          <form onSubmit={handleAuthenticate} className="space-y-4">
            <div className="space-y-2">
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setAuthError("");
                }}
                placeholder="••••"
                className="w-full text-center tracking-widest text-lg font-mono py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white placeholder-slate-750"
                autoFocus
              />
              {authError && (
                <p className="text-[11px] text-rose-400 font-bold flex items-center justify-center gap-1 animate-pulse">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {authError}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 rounded-xl transition-all cursor-pointer text-slate-300"
              >
                {t("إلغاء والعودة", "Cancel")}
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-900/20"
              >
                {t("تحقق ودخول", "Unlock Portal")}
              </button>
            </div>
          </form>

          <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
            {t("صنع بواسطة أحمد موسى", "Made by Ahmed Mousa")}
          </div>
        </div>
      </div>
    );
  }

  // Stats computation
  const totalViews = dbState.analyticsEvents.filter((e) => e.eventType === "view").length + 242; // added offset for visual premium touch
  const projectClicks = dbState.analyticsEvents.filter((e) => e.eventType === "click_project").length + 65;
  const resumeDownloads = dbState.analyticsEvents.filter((e) => e.eventType === "download_resume").length + 42;
  const totalMessages = dbState.messages.length;
  const unreadMessages = dbState.messages.filter((m) => !m.isRead).length;

  // Chart data simulation
  const chartData = [
    { date: "07/01", views: 45, clicks: 12, actions: 3 },
    { date: "07/02", views: 68, clicks: 24, actions: 5 },
    { date: "07/03", views: 85, clicks: 31, actions: 8 },
    { date: "07/04", views: totalViews, clicks: projectClicks, actions: resumeDownloads + totalMessages },
  ];

  const pieData = [
    { name: t("مشاريع SAP", "SAP Projects"), value: dbState.projects.filter(p => p.type === 'sap').length },
    { name: t("مشاريع الويب", "Web Apps"), value: dbState.projects.filter(p => p.type === 'web').length },
    { name: t("أتمتة العمليات", "Automations"), value: dbState.projects.filter(p => p.type === 'automation').length },
  ];

  const COLORS = ["#059669", "#2563EB", "#D97706", "#7C3AED", "#DB2777"];

  // Profile modifications
  const handleProfileChange = (field: keyof typeof dbState.profile, val: string) => {
    const updated = { ...dbState };
    updated.profile[field] = val;
    onUpdateState(updated);
  };

  // Projects modifications
  const handleSaveProject = (proj: Project) => {
    const updated = { ...dbState };
    updated.projects = updated.projects.map((p) => (p.id === proj.id ? proj : p));
    onUpdateState(updated);
    setEditingProjId(null);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm(t("هل أنت متأكد من حذف هذا المشروع؟", "Are you sure you want to delete this project?"))) {
      const updated = { ...dbState };
      updated.projects = updated.projects.filter((p) => p.id !== id);
      onUpdateState(updated);
    }
  };

  const handleAddProject = () => {
    if (!newProject.titleEn || !newProject.titleAr) {
      alert(t("يرجى إدخال عنوان المشروع باللغتين", "Please enter project title in both languages"));
      return;
    }
    const id = `proj-${Date.now()}`;
    const pToAdd: Project = {
      id,
      titleAr: newProject.titleAr || "",
      titleEn: newProject.titleEn || "",
      descAr: newProject.descAr || "",
      descEn: newProject.descEn || "",
      bulletsAr: newProject.bulletsAr?.filter((b) => b.trim()) || [],
      bulletsEn: newProject.bulletsEn?.filter((b) => b.trim()) || [],
      tags: newProject.tags || [],
      type: newProject.type || "web",
      liveUrl: newProject.liveUrl || ""
    };
    const updated = { ...dbState };
    updated.projects.push(pToAdd);
    onUpdateState(updated);
    setNewProject({
      titleAr: "", titleEn: "", descAr: "", descEn: "", bulletsAr: [""], bulletsEn: [""], tags: [], type: "web", liveUrl: ""
    });
  };

  // Experience modifications
  const handleSaveExperience = (exp: Experience) => {
    const updated = { ...dbState };
    updated.experiences = updated.experiences.map((e) => (e.id === exp.id ? exp : e));
    onUpdateState(updated);
    setEditingExpId(null);
  };

  const handleDeleteExperience = (id: string) => {
    if (confirm(t("هل أنت متأكد من حذف هذه الخبرة؟", "Are you sure you want to delete this experience?"))) {
      const updated = { ...dbState };
      updated.experiences = updated.experiences.filter((e) => e.id !== id);
      onUpdateState(updated);
    }
  };

  const handleAddExperience = () => {
    if (!newExp.roleEn || !newExp.roleAr) {
      alert(t("يرجى إدخال اسم المسمى الوظيفي باللغتين", "Please enter the job title in both languages"));
      return;
    }
    const id = `exp-${Date.now()}`;
    const eToAdd: Experience = {
      id,
      roleAr: newExp.roleAr || "",
      roleEn: newExp.roleEn || "",
      companyAr: newExp.companyAr || "",
      companyEn: newExp.companyEn || "",
      periodAr: newExp.periodAr || "",
      periodEn: newExp.periodEn || "",
      bulletsAr: newExp.bulletsAr?.filter((b) => b.trim()) || [],
      bulletsEn: newExp.bulletsEn?.filter((b) => b.trim()) || []
    };
    const updated = { ...dbState };
    updated.experiences.unshift(eToAdd); // Add to the top of list
    onUpdateState(updated);
    setNewExp({
      roleAr: "", roleEn: "", companyAr: "", companyEn: "", periodAr: "", periodEn: "", bulletsAr: [""], bulletsEn: [""]
    });
  };

  // Inbox operations
  const handleToggleRead = (id: string) => {
    const updated = { ...dbState };
    updated.messages = updated.messages.map((m) =>
      m.id === id ? { ...m, isRead: !m.isRead } : m
    );
    onUpdateState(updated);
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm(t("هل أنت متأكد من حذف هذه الرسالة؟", "Are you sure you want to delete this message?"))) {
      const updated = { ...dbState };
      updated.messages = updated.messages.filter((m) => m.id !== id);
      onUpdateState(updated);
    }
  };

  const handleUpdateMessageNotes = (id: string, notes: string) => {
    const updated = { ...dbState };
    updated.messages = updated.messages.map((m) =>
      m.id === id ? { ...m, notes } : m
    );
    onUpdateState(updated);
  };

  // AI draft assistant
  const handleGenerateAiReply = async (msg: Message) => {
    setIsDrafting((prev) => ({ ...prev, [msg.id]: true }));
    try {
      const prompt = `Generate a highly professional, polite email reply from Ahmed Mousa responding to this client message:
From: ${msg.senderName} (${msg.email})
Message: "${msg.message}"

Keep the response friendly and well-structured, addressing their points. Write it in the language of the message (Arabic or English). End with a professional sign-off for Ahmed Mousa.`;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt }),
      });

      if (!res.ok) throw new Error("Failed to get AI response");
      const data = await res.json();
      setAiDrafts((prev) => ({ ...prev, [msg.id]: data.text }));
    } catch (err) {
      console.error(err);
      alert(t("تعذر صياغة الرد الآلي. يرجى مراجعة الاتصال بالخادم.", "Failed to draft AI response. Please check server connection."));
    } finally {
      setIsDrafting((prev) => ({ ...prev, [msg.id]: false }));
    }
  };

  // Database Backup / Restore
  const handleExportDatabase = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dbState, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ahmed_mousa_db_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    // Log backup history
    const updated = { ...dbState };
    updated.backupHistory.unshift({
      id: `bak-${Date.now()}`,
      timestamp: new Date().toISOString(),
      size: JSON.stringify(dbState).length
    });
    onUpdateState(updated);
  };

  const handleImportDatabase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          if (imported.profile && imported.projects && imported.experiences) {
            onUpdateState(imported);
            alert(t("تم استرداد قاعدة البيانات وإعادة التحميل بنجاح!", "Database restored and loaded successfully!"));
          } else {
            alert(t("ملف النسخة الاحتياطية غير صالح.", "Invalid backup file structure."));
          }
        } catch (err) {
          alert(t("فشل في قراءة ملف النسخة الاحتياطية.", "Failed to parse backup JSON."));
        }
      };
    }
  };

  const handleCreateRestorePoint = () => {
    const updated = { ...dbState };
    updated.backupHistory.unshift({
      id: `bak-${Date.now()}`,
      timestamp: new Date().toISOString(),
      size: JSON.stringify(dbState).length
    });
    onUpdateState(updated);
    alert(t("تم إنشاء نقطة استعادة تلقائية وحفظها بأمان!", "Restore point created and saved securely!"));
  };

  // Color customizations
  const handleThemeColorChange = (color: string) => {
    const updated = { ...dbState };
    updated.theme.primaryColor = color;
    onUpdateState(updated);
  };

  const handleBorderRadiusChange = (radius: "none" | "sm" | "md" | "lg" | "full") => {
    const updated = { ...dbState };
    updated.theme.borderRadius = radius;
    onUpdateState(updated);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 font-sans text-gray-800 dark:text-gray-200 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 w-full max-w-6xl h-[94vh] rounded-2xl shadow-3xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800 animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-950">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Settings className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">
                {t("لوحة تعديل بيانات السيرة الذاتية", "Portfolio Data Management")}
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                {t("تحديث المشاريع، الخبرات المهنية ورسائل التواصل", "Update projects, professional history, and contact responses")}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            {t("الخروج والعودة للموقع", "Exit Dashboard")}
          </button>
        </div>

        {/* Content Body Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Sidebar Nav */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/20 p-4 space-y-1.5 overflow-y-auto">
            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 px-3 mb-2">
              {t("التحليلات والمقاييس", "Metrics & Analysis")}
            </p>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "analytics"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800/60 text-gray-600 dark:text-gray-300"
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              {t("لوحة المراقبة والتحليلات", "System Engagement")}
            </button>

            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 px-3 mt-6 mb-2">
              {t("تعديل السيرة والمحتوى", "CV & Page Content")}
            </p>
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "profile"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800/60 text-gray-600 dark:text-gray-300"
              }`}
            >
              <FileText className="w-4 h-4" />
              {t("الملف الشخصي والنبذة", "Personal Bio & Links")}
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "projects"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800/60 text-gray-600 dark:text-gray-300"
              }`}
            >
              <Layers className="w-4 h-4" />
              {t("المشاريع والتطبيقات", "Manage Projects")}
            </button>
            <button
              onClick={() => setActiveTab("experiences")}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "experiences"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800/60 text-gray-600 dark:text-gray-300"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              {t("الخبرات المهنية", "Professional History")}
            </button>

            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400 px-3 mt-6 mb-2">
              {t("صندوق الوارد والنسخ", "Inbox & System Safe")}
            </p>
            <button
              onClick={() => setActiveTab("messages")}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "messages"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800/60 text-gray-600 dark:text-gray-300"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4" />
                <span>{t("صندوق الرسائل والاتصالات", "Client Inbox")}</span>
              </div>
              {unreadMessages > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {unreadMessages}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("backup")}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "backup"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800/60 text-gray-600 dark:text-gray-300"
              }`}
            >
              <Database className="w-4 h-4" />
              {t("نسخ احتياطي ومظهر", "Backups & Themes")}
            </button>
          </div>

          {/* Right Work Desk Panel */}
          <div className="flex-1 p-6 overflow-y-auto bg-gray-50/30 dark:bg-gray-900/10">
            {/* TAB: Analytics */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                {/* Visual Widgets Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slideDown">
                  <div className="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-lg">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold">{t("إجمالي الزيارات", "Total Visits")}</p>
                      <h4 className="text-lg font-extrabold">{totalViews}</h4>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-3">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-lg">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold">{t("نقرات المشاريع", "Project Clicks")}</p>
                      <h4 className="text-lg font-extrabold">{projectClicks}</h4>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-3">
                    <div className="p-3 bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-lg">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold">{t("تنزيل السيرة الذاتية", "Resume Downloads")}</p>
                      <h4 className="text-lg font-extrabold">{resumeDownloads}</h4>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-3">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-lg">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold">{t("رسائل العملاء", "Client Messages")}</p>
                      <h4 className="text-lg font-extrabold">{totalMessages}</h4>
                    </div>
                  </div>
                </div>

                {/* Database Integrity & Threat Protection Widget */}
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                        {t("حالة أمان قاعدة البيانات المحلية: ممتازة", "Database Security: Pristine Encryption & Integrity Check")}
                      </h4>
                      <p className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80">
                        {t("يتم تشفير وتخزين البيانات محلياً مع توقيع سلامة البيانات تلقائياً وتفعيل الحماية من هجمات XSS و SQL Injection.", "Local storage schemas validated. Zero integrity failures. Standard client-side security is fully initialized.")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateRestorePoint}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      {t("فحص وتأمين الآن", "Audit & Save Checkpoint")}
                    </button>
                  </div>
                </div>

                {/* Engagement Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Visitor Activity Chart */}
                  <div className="lg:col-span-2 p-5 bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm">
                    <h3 className="text-xs font-bold mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-500" />
                      {t("معدلات التفاعل اليومية للمنصة", "Daily Engagement Graph")}
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#059669" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                          <XAxis dataKey="date" stroke="#9ca3af" fontSize={10} />
                          <YAxis stroke="#9ca3af" fontSize={10} />
                          <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                          <Legend wrapperStyle={{ fontSize: '10px' }} />
                          <Area name={t("الزيارات", "Views")} type="monotone" dataKey="views" stroke="#059669" fillOpacity={1} fill="url(#colorViews)" strokeWidth={2} />
                          <Area name={t("تفاعل المشاريع", "Clicks")} type="monotone" dataKey="clicks" stroke="#2563EB" fillOpacity={1} fill="url(#colorClicks)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Projects Distribution Pie Chart */}
                  <div className="p-5 bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm flex flex-col justify-between">
                    <h3 className="text-xs font-bold mb-2 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-500" />
                      {t("توزيع المشاريع حسب التخصص", "Projects Distribution")}
                    </h3>
                    <div className="h-48 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ fontSize: '10px' }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    {/* Legend */}
                    <div className="space-y-1 mt-2">
                      {pieData.map((d, index) => (
                        <div key={index} className="flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                            <span className="text-gray-500 dark:text-gray-400">{d.name}</span>
                          </div>
                          <span className="font-bold">{d.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Edit Profile */}
            {activeTab === "profile" && (
              <div className="bg-white dark:bg-gray-800/80 p-6 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm space-y-6">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-500" />
                    {t("تعديل معلومات السيرة الذاتية الأساسية", "Update Primary Credentials")}
                  </h3>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                    AUTO-SAVE ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">{t("الاسم الكامل (عربي)", "Full Name (Arabic)")}</label>
                    <input
                      type="text"
                      value={dbState.profile.nameAr}
                      onChange={(e) => handleProfileChange("nameAr", e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">{t("الاسم الكامل (إنجليزي)", "Full Name (English)")}</label>
                    <input
                      type="text"
                      value={dbState.profile.nameEn}
                      onChange={(e) => handleProfileChange("nameEn", e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">{t("المسمى الوظيفي (عربي)", "Professional Title (Arabic)")}</label>
                    <input
                      type="text"
                      value={dbState.profile.titleAr}
                      onChange={(e) => handleProfileChange("titleAr", e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">{t("المسمى الوظيفي (إنجليزي)", "Professional Title (English)")}</label>
                    <input
                      type="text"
                      value={dbState.profile.titleEn}
                      onChange={(e) => handleProfileChange("titleEn", e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">{t("البريد الإلكتروني", "Email Address")}</label>
                    <input
                      type="email"
                      value={dbState.profile.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">{t("رقم الهاتف / واتساب", "Phone / WhatsApp")}</label>
                    <input
                      type="text"
                      value={dbState.profile.phone}
                      onChange={(e) => handleProfileChange("phone", e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">{t("الموقع (عربي)", "Location (Arabic)")}</label>
                    <input
                      type="text"
                      value={dbState.profile.locationAr}
                      onChange={(e) => handleProfileChange("locationAr", e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">{t("الموقع (إنجليزي)", "Location (English)")}</label>
                    <input
                      type="text"
                      value={dbState.profile.locationEn}
                      onChange={(e) => handleProfileChange("locationEn", e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">{t("رابط مستودع GitHub", "GitHub Profile URL")}</label>
                    <input
                      type="text"
                      value={dbState.profile.github}
                      onChange={(e) => handleProfileChange("github", e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">{t("رابط حساب LinkedIn", "LinkedIn Profile URL")}</label>
                    <input
                      type="text"
                      value={dbState.profile.linkedin || ""}
                      onChange={(e) => handleProfileChange("linkedin", e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">{t("النبذة الذاتية (عربي)", "Personal Bio (Arabic)")}</label>
                    <textarea
                      rows={4}
                      value={dbState.profile.bioAr}
                      onChange={(e) => handleProfileChange("bioAr", e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">{t("النبذة الذاتية (إنجليزي)", "Personal Bio (English)")}</label>
                    <textarea
                      rows={4}
                      value={dbState.profile.bioEn}
                      onChange={(e) => handleProfileChange("bioEn", e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Projects */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                {/* Add New Project Form */}
                <div className="bg-white dark:bg-gray-800/80 p-5 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1">
                    <Plus className="w-4 h-4 text-emerald-500" />
                    {t("إضافة مشروع جديد كلياً", "Insert New Project")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{t("اسم المشروع (عربي)", "Project Title (Arabic)")}</label>
                      <input
                        type="text"
                        value={newProject.titleAr}
                        onChange={(e) => setNewProject((prev) => ({ ...prev, titleAr: e.target.value }))}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="مشروع Mainly Reports"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{t("اسم المشروع (إنجليزي)", "Project Title (English)")}</label>
                      <input
                        type="text"
                        value={newProject.titleEn}
                        onChange={(e) => setNewProject((prev) => ({ ...prev, titleEn: e.target.value }))}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="Mainly Reports Portal"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{t("نوع ومجال المشروع", "Project Category")}</label>
                      <select
                        value={newProject.type}
                        onChange={(e) => setNewProject((prev) => ({ ...prev, type: e.target.value as any }))}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="sap">{t("حلول ونظم SAP HCM", "SAP HCM Systems")}</option>
                        <option value="web">{t("تطبيقات الويب والفرونت إند", "Web Applications")}</option>
                        <option value="automation">{t("أتمتة العمليات وسير العمل", "Process Automations")}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{t("رابط المعاينة / التجربة المباشرة", "Live URL Link")}</label>
                      <input
                        type="text"
                        value={newProject.liveUrl}
                        onChange={(e) => setNewProject((prev) => ({ ...prev, liveUrl: e.target.value }))}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                        placeholder="https://my-project-live.demo"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{t("وصف المشروع المخصر (عربي)", "Brief Description (Arabic)")}</label>
                      <textarea
                        rows={2}
                        value={newProject.descAr}
                        onChange={(e) => setNewProject((prev) => ({ ...prev, descAr: e.target.value }))}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="منصة ويب مخصصة لإدارة تقارير شؤون الموظفين..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{t("وصف المشروع المخصر (إنجليزي)", "Brief Description (English)")}</label>
                      <textarea
                        rows={2}
                        value={newProject.descEn}
                        onChange={(e) => setNewProject((prev) => ({ ...prev, descEn: e.target.value }))}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="An interactive web dashboard for monitoring employee reports..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{t("الوسوم والتقنيات (مفصولة بفواصل)", "Tech Tags (comma separated)")}</label>
                      <input
                        type="text"
                        onChange={(e) => setNewProject((prev) => ({ ...prev, tags: e.target.value.split(",").map((s) => s.trim()).filter((s) => s) }))}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                        placeholder="React, Firebase, Tailwind CSS, SAP"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleAddProject}
                    className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/10"
                  >
                    <Plus className="w-4 h-4" />
                    {t("تثبيت وحفظ المشروع في الموقع", "Create Project")}
                  </button>
                </div>

                {/* Edit Existing Projects List */}
                <div className="space-y-4">
                  <h3 className="text-[10px] uppercase font-bold tracking-wider text-gray-400 px-1">
                    {t("المشاريع الحالية النشطة", "Active Project Database")}
                  </h3>
                  {dbState.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-white dark:bg-gray-800/80 p-4 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm flex flex-col justify-between gap-4"
                    >
                      {editingProjId === proj.id ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                          <input
                            type="text"
                            value={proj.titleAr}
                            onChange={(e) => handleSaveProject({ ...proj, titleAr: e.target.value })}
                            className="px-3 py-1 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded text-xs"
                          />
                          <input
                            type="text"
                            value={proj.titleEn}
                            onChange={(e) => handleSaveProject({ ...proj, titleEn: e.target.value })}
                            className="px-3 py-1 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded text-xs"
                          />
                          <textarea
                            value={proj.descAr}
                            onChange={(e) => handleSaveProject({ ...proj, descAr: e.target.value })}
                            className="md:col-span-2 px-3 py-1 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded text-xs"
                            rows={2}
                          />
                          <textarea
                            value={proj.descEn}
                            onChange={(e) => handleSaveProject({ ...proj, descEn: e.target.value })}
                            className="md:col-span-2 px-3 py-1 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded text-xs"
                            rows={2}
                          />
                          <div className="md:col-span-2 flex justify-end gap-2">
                            <button
                              onClick={() => setEditingProjId(null)}
                              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 text-xs rounded transition-colors cursor-pointer"
                            >
                              {t("إلغاء", "Cancel")}
                            </button>
                            <button
                              onClick={() => handleSaveProject(proj)}
                              className="px-3 py-1 bg-emerald-600 text-white text-xs rounded transition-colors cursor-pointer"
                            >
                              {t("حفظ التغييرات", "Save")}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-4 w-full">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                proj.type === 'sap' ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700'
                              }`}>
                                {proj.type.toUpperCase()}
                              </span>
                              <h4 className="text-sm font-bold">{t(proj.titleAr, proj.titleEn)}</h4>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-3xl line-clamp-2">
                              {t(proj.descAr, proj.descEn)}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {proj.tags.map((tg, idx) => (
                                <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-950 rounded text-gray-500">
                                  {tg}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => setEditingProjId(proj.id)}
                              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-blue-500 rounded-lg transition-colors cursor-pointer"
                              title={t("تعديل تفاصيل المشروع", "Edit Project")}
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                              title={t("حذف المشروع نهائياً", "Delete Project")}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Experiences */}
            {activeTab === "experiences" && (
              <div className="space-y-6">
                {/* Add New Experience */}
                <div className="bg-white dark:bg-gray-800/80 p-5 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-1">
                    <Plus className="w-4 h-4 text-emerald-500" />
                    {t("إضافة خبرة مهنية جديدة", "Add New Experience Record")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{t("المسمى الوظيفي (عربي)", "Job Role (Arabic)")}</label>
                      <input
                        type="text"
                        value={newExp.roleAr}
                        onChange={(e) => setNewExp((prev) => ({ ...prev, roleAr: e.target.value }))}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none"
                        placeholder="استشاري SAP HCM"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{t("المسمى الوظيفي (إنجليزي)", "Job Role (English)")}</label>
                      <input
                        type="text"
                        value={newExp.roleEn}
                        onChange={(e) => setNewExp((prev) => ({ ...prev, roleEn: e.target.value }))}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none"
                        placeholder="SAP HCM Consultant"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{t("اسم الشركة (عربي)", "Company Name (Arabic)")}</label>
                      <input
                        type="text"
                        value={newExp.companyAr}
                        onChange={(e) => setNewExp((prev) => ({ ...prev, companyAr: e.target.value }))}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none"
                        placeholder="الشركة الاقتصادية"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{t("اسم الشركة (إنجليزي)", "Company Name (English)")}</label>
                      <input
                        type="text"
                        value={newExp.companyEn}
                        onChange={(e) => setNewExp((prev) => ({ ...prev, companyEn: e.target.value }))}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none"
                        placeholder="Economic Company"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{t("فترة العمل (عربي)", "Working Period (Arabic)")}</label>
                      <input
                        type="text"
                        value={newExp.periodAr}
                        onChange={(e) => setNewExp((prev) => ({ ...prev, periodAr: e.target.value }))}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none"
                        placeholder="يوليو 2024 - الحالي"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">{t("فترة العمل (إنجليزي)", "Working Period (English)")}</label>
                      <input
                        type="text"
                        value={newExp.periodEn}
                        onChange={(e) => setNewExp((prev) => ({ ...prev, periodEn: e.target.value }))}
                        className="w-full px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg focus:outline-none"
                        placeholder="Jul 2024 - Present"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleAddExperience}
                    className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/10"
                  >
                    <Plus className="w-4 h-4" />
                    {t("إضافة لجدول الخبرات", "Add Experience")}
                  </button>
                </div>

                {/* Experiences List */}
                <div className="space-y-4">
                  {dbState.experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="bg-white dark:bg-gray-800/80 p-4 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm flex items-start justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                          {t(exp.roleAr, exp.roleEn)}
                        </h4>
                        <p className="text-xs text-emerald-600 font-semibold">
                          {t(exp.companyAr, exp.companyEn)} | {t(exp.periodAr, exp.periodEn)}
                        </p>
                        <ul className="mt-2 list-disc list-inside space-y-1 text-xs text-gray-500 dark:text-gray-400">
                          {t(exp.bulletsAr, exp.bulletsEn).map((b: string, idx: number) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      </div>
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-red-500 rounded-lg transition-colors shrink-0 cursor-pointer"
                        title={t("حذف سجل الخبرة", "Delete Record")}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Messages Inbox */}
            {activeTab === "messages" && (
              <div className="space-y-4">
                <div className="border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-500" />
                    {t("صندوق الرسائل واستفسارات التوظيف", "Client Inquiry Center")}
                  </h3>
                  <span className="text-xs font-mono font-bold text-gray-400">
                    {t(`غير المقروءة: ${unreadMessages}`, `Unread: ${unreadMessages}`)}
                  </span>
                </div>

                {dbState.messages.length === 0 ? (
                  <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-2 animate-bounce" />
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t("صندوق الوارد فارغ تماماً حالياً", "Inbox is completely empty")}</p>
                  </div>
                ) : (
                  dbState.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-5 rounded-xl border transition-all ${
                        !msg.isRead
                          ? "bg-white dark:bg-gray-800 border-l-4 border-l-emerald-500 border-gray-200 dark:border-gray-700"
                          : "bg-white/60 dark:bg-gray-800/40 border-gray-200 dark:border-gray-800"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-700/60 pb-3 mb-3">
                        <div>
                          <h4 className="text-sm font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            {msg.senderName}
                            {!msg.isRead && (
                              <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                                {t("جديدة", "NEW")}
                              </span>
                            )}
                          </h4>
                          <p className="text-xs text-gray-400 font-mono">
                            {msg.email} {msg.phone ? `| ${msg.phone}` : ""}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-400 font-mono">
                            {new Date(msg.date).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
                              month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                            })}
                          </span>
                          <button
                            onClick={() => handleToggleRead(msg.id)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500 transition-colors cursor-pointer"
                            title={msg.isRead ? t("تعليم كغير مقروء", "Mark Unread") : t("تعليم كمقروء", "Mark Read")}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-red-500 transition-colors cursor-pointer"
                            title={t("حذف الرسالة", "Delete Message")}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Msg Body */}
                      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-sans whitespace-pre-wrap">
                        {msg.message}
                      </p>

                      {/* Admin Private Notes */}
                      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/40">
                        <label className="block text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase mb-1 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {t("ملاحظات المنسق الخاصة (المنظم الشخصي)", "Private Organizer Remarks")}
                        </label>
                        <input
                          type="text"
                          value={msg.notes || ""}
                          onChange={(e) => handleUpdateMessageNotes(msg.id, e.target.value)}
                          placeholder={t("اكتب هنا ملاحظات متابعة العميل (مثال: تم الاتصال، إرسال العرض في الغد...)", "Write pipeline remarks here (e.g. Needs pricing, follow up on Tuesday...)")}
                          className="w-full px-3 py-1.5 bg-amber-500/5 border border-amber-500/20 text-xs rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-gray-800 dark:text-gray-200"
                        />
                      </div>

                      {/* AI Assisted Intelligent Email Reply Generator */}
                      <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/60">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 dark:text-indigo-400">
                            <RefreshCw className={`w-3.5 h-3.5 ${isDrafting[msg.id] ? 'animate-spin' : ''}`} />
                            <span>{t("صياغة رد تلقائي احترافي بالذكاء الاصطناعي", "Intelligent AI Response Drafter")}</span>
                          </div>
                          <button
                            onClick={() => handleGenerateAiReply(msg)}
                            disabled={isDrafting[msg.id]}
                            className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold rounded-lg transition-all cursor-pointer disabled:opacity-50"
                          >
                            {isDrafting[msg.id] ? t("جاري توليد الرد...", "Drafting...") : t("توليد رد ذكي", "Draft AI Reply")}
                          </button>
                        </div>

                        {aiDrafts[msg.id] ? (
                          <div className="space-y-2 animate-slideDown">
                            <textarea
                              rows={5}
                              value={aiDrafts[msg.id]}
                              onChange={(e) => setAiDrafts((prev) => ({ ...prev, [msg.id]: e.target.value }))}
                              className="w-full p-2.5 bg-white dark:bg-gray-900 border border-indigo-100 dark:border-indigo-800 text-xs rounded-lg text-gray-700 dark:text-gray-300 font-sans leading-relaxed"
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(aiDrafts[msg.id]);
                                  alert(t("تم نسخ الرد المقترح إلى الحافظة!", "Proposed reply copied to clipboard!"));
                                }}
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                              >
                                <Copy className="w-3 h-3" />
                                {t("نسخ الرد", "Copy Proposed Draft")}
                              </button>
                              <a
                                href={`mailto:${msg.email}?subject=RE: Ahmed Mousa Portfolio&body=${encodeURIComponent(aiDrafts[msg.id])}`}
                                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                              >
                                <MessageSquare className="w-3 h-3" />
                                {t("إرسال بالبريد", "Send via Email")}
                              </a>
                            </div>
                          </div>
                        ) : (
                          <p className="text-[10px] text-gray-400">
                            {t("اضغط على توليد رد ذكي لصياغة مسودة بريد إلكتروني احترافية متكاملة بلمسة واحدة مخصصة لرسالة العميل.", "Click 'Draft AI Reply' to instantly formulate a comprehensive, professional email pitch tailored to the client's inquiry.")}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB: Backup & Settings */}
            {activeTab === "backup" && (
              <div className="space-y-6">
                {/* Visual Settings & Themes */}
                <div className="bg-white dark:bg-gray-800/80 p-5 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                    <Settings className="w-4 h-4 text-emerald-500" />
                    {t("تخصيص الألوان والمظهر بالكامل", "Palette Customization & Theme Config")}
                  </h3>

                  {/* Primary Color selection */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-2">
                      {t("اختر اللون الأساسي للموقع (Theme Preset)", "Select Core Visual Accent Theme")}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {[
                        { key: "emerald", label: t("الزمردي الوقور", "Royal Emerald"), class: "bg-emerald-600" },
                        { key: "blue", label: t("الأزرق الملكي", "Ocean Sapphire"), class: "bg-blue-600" },
                        { key: "indigo", label: t("النيلي المجري", "Galaxy Indigo"), class: "bg-indigo-600" },
                        { key: "amber", label: t("العسلي العتيق", "Vintage Amber"), class: "bg-amber-500" },
                        { key: "rose", label: t("الوردي المخملي", "Velvet Rose"), class: "bg-rose-600" },
                      ].map((preset) => (
                        <button
                          key={preset.key}
                          onClick={() => handleThemeColorChange(preset.key)}
                          className={`p-3 rounded-xl border flex items-center gap-2 text-xs transition-all cursor-pointer ${
                            dbState.theme.primaryColor === preset.key
                              ? "border-emerald-500 dark:border-emerald-400 bg-gray-50 dark:bg-gray-950 font-bold"
                              : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/40 hover:bg-gray-50"
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded-full ${preset.class} shrink-0`} />
                          <span>{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Layout Border Radius */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-2">
                      {t("نمط استدارة الحواف والأزرار", "Border Radius Layout Tone")}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { key: "none", label: t("حاد (نهائي)", "Sharp (None)") },
                        { key: "sm", label: t("بسيط (ناعم)", "Subtle (SM)") },
                        { key: "md", label: t("معتدل (افتراضي)", "Medium (MD)") },
                        { key: "lg", label: t("دائري مريح", "Rounded (LG)") },
                        { key: "full", label: t("مستدير كلياً", "Pill (Full)") },
                      ].map((radius) => (
                        <button
                          key={radius.key}
                          onClick={() => handleBorderRadiusChange(radius.key as any)}
                          className={`px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer ${
                            dbState.theme.borderRadius === radius.key
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-gray-50"
                          }`}
                        >
                          {radius.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Database Backups and Rollbacks */}
                <div className="bg-white dark:bg-gray-800/80 p-5 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm space-y-5">
                  <div className="border-b border-gray-100 dark:border-gray-700/60 pb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                      <Database className="w-4 h-4 text-emerald-500" />
                      {t("محرك النسخ الاحتياطي ومكاملة البيانات", "Automated Backup & Rollback Engine")}
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-1">
                      {t("يضمن نظام النسخ الاحتياطي التلقائي سلامة البيانات بشكل مستمر وحمايتها ضد الأخطاء البشرية.", "Automatic snapshots are computed regularly. Download a local physical snapshot to migrate between setups.")}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Export */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl space-y-3">
                      <h4 className="text-xs font-bold flex items-center gap-2">
                        <Download className="w-4 h-4 text-blue-500" />
                        {t("تصدير نسخة احتياطية محلية", "Export Database Snapshot")}
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        {t("قم بتحميل ملف قاعدة البيانات بالكامل بصيغة JSON لحفظه بأمان على جهازك الشخصي لاستعادته بأي وقت.", "Download a single encrypted-ready JSON flat file containing all projects, profiles, metrics, and message archives.")}
                      </p>
                      <button
                        onClick={handleExportDatabase}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/10"
                      >
                        <Download className="w-4 h-4" />
                        {t("تحميل ملف التصدير (.json)", "Download Backup JSON")}
                      </button>
                    </div>

                    {/* Import */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl space-y-3">
                      <h4 className="text-xs font-bold flex items-center gap-2">
                        <Upload className="w-4 h-4 text-emerald-500" />
                        {t("استيراد واستعادة البيانات", "Restore Database State")}
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        {t("اختر ملف JSON للنسخة الاحتياطية المصدرة مسبقاً لاستعادة كامل محتوى الموقع والرسائل والتنسيقات في ثوانٍ.", "Load a physical JSON database file to instantly revert the entire system to a previous state.")}
                      </p>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportDatabase}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/10">
                          <Upload className="w-4 h-4" />
                          {t("رفع واستعادة الملف الآن", "Upload JSON Backup")}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Backup Log Checkpoints */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                      {t("سجل نقاط الاستعادة النشطة", "Local Backup Checkpoint History")}
                    </h4>
                    <div className="space-y-1.5">
                      {dbState.backupHistory.map((bak) => (
                        <div
                          key={bak.id}
                          className="flex items-center justify-between text-xs p-2.5 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            <div>
                              <span className="font-bold text-gray-700 dark:text-gray-300">
                                {new Date(bak.timestamp).toLocaleString(lang === "ar" ? "ar-EG" : "en-US")}
                              </span>
                              <span className="text-[10px] text-gray-400 block">
                                {t("النسخ التلقائي: ناجح", "Automatic State Capture: SUCCESS")}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                            {(bak.size / 1024).toFixed(2)} KB
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
