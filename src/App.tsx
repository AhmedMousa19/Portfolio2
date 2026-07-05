import React, { useState, useEffect } from "react";
import {
  Globe,
  Sun,
  Moon,
  Settings,
  Download,
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Briefcase,
  Layers,
  Award,
  CheckCircle,
  Activity,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Bot,
  Terminal,
  Printer,
  X,
  Bell
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { initialDatabase } from "./initialData";
import { DatabaseState, Lang, Toast } from "./types";
import ProjectCard from "./components/ProjectCard";
import ContactForm from "./components/ContactForm";
import AIAssistant from "./components/AIAssistant";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [dbState, setDbState] = useState<DatabaseState>(() => {
    const local = localStorage.getItem("ahmed_mousa_portfolio_db");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.profile && parsed.projects) {
          // Auto-update to include the new personalized Ahmed Mousa messages if not loaded
          if (!parsed.messages || parsed.messages.length < 3 || !parsed.messages.some((m: any) => m.id === "msg-3")) {
            parsed.messages = initialDatabase.messages;
          }
          // Force update the title to the clean professional specialization (SAP HCM Consultant | React Developer)
          if (
            !parsed.profile.titleEn ||
            parsed.profile.titleEn === "SAP HCM Consultant & Web Developer" ||
            parsed.profile.titleEn.includes("Builder") ||
            !parsed.profile.titleEn.includes("React")
          ) {
            parsed.profile.titleEn = "SAP HCM Consultant | React Developer";
            parsed.profile.titleAr = "استشاري SAP HCM | مطور React";
          }
          if (!parsed.profile.linkedin) {
            parsed.profile.linkedin = "https://www.linkedin.com/in/ahmed-mousa-hcm";
          }
          return parsed;
        }
      } catch (e) {
        console.error("Local database corrupted, resetting", e);
      }
    }
    return initialDatabase;
  });

  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("ahmed_mousa_portfolio_lang");
    return (saved as Lang) || "en"; // Defaults to English first as requested
  });

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);

  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("admin") === "true" || params.get("cms") === "true") {
        localStorage.setItem("ahmed_mousa_portfolio_admin", "true");
        return true;
      }
      return localStorage.getItem("ahmed_mousa_portfolio_admin") === "true";
    }
    return false;
  });

  const [secretClicks, setSecretClicks] = useState(0);

  const handleSecretClick = () => {
    setSecretClicks((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        const nextVal = !isAdminMode;
        setIsAdminMode(nextVal);
        if (nextVal) {
          localStorage.setItem("ahmed_mousa_portfolio_admin", "true");
          spawnNotification("تم تفعيل وضع المسؤول - Admin Mode Activated", "info");
        } else {
          localStorage.removeItem("ahmed_mousa_portfolio_admin");
          spawnNotification("تم إلغاء وضع المسؤول - Admin Mode Deactivated", "info");
        }
        return 0;
      }
      return next;
    });
  };

  // Sync language and database to localStorage
  useEffect(() => {
    localStorage.setItem("ahmed_mousa_portfolio_db", JSON.stringify(dbState));
  }, [dbState]);

  useEffect(() => {
    localStorage.setItem("ahmed_mousa_portfolio_lang", lang);
  }, [lang]);

  // Log active visitor session analytics
  useEffect(() => {
    const visited = sessionStorage.getItem("ahmed_portfolio_session_v2");
    if (!visited) {
      sessionStorage.setItem("ahmed_portfolio_session_v2", "true");
      logAction("view");
    }
  }, []);

  // Set class for body (Arabic RTL/LTR & Theme Mode) & Update SEO Meta Tags
  useEffect(() => {
    const root = document.documentElement;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    
    if (dbState.theme.isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Dynamic SEO Document Title
    document.title = lang === "ar"
      ? "أحمد موسى | استشاري SAP HCM ومطور React"
      : "Ahmed Mousa | SAP HCM Consultant";

    // Dynamic SEO Document Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      lang === "ar"
        ? "تصفح المعرض المهني للأستاذ أحمد موسى، استشاري معتمد في أنظمة SAP HCM ومطور React متكامل، متخصص في أتمتة رواتب الموظفين، إدارة الوقت، وتطوير الويب فائق السرعة."
        : "Explore the professional portfolio of Ahmed Mousa, a certified SAP HCM Consultant and React Developer specializing in HR systems integration, payroll testing, and high-performance custom web applications."
    );
  }, [lang, dbState.theme.isDarkMode]);

  const t = <T,>(ar: T, en: T): T => (lang === "ar" ? ar : en);

  const logAction = (type: "view" | "click_project" | "download_resume" | "chat_message" | "contact_submit", details?: string) => {
    const updated = { ...dbState };
    updated.analyticsEvents.unshift({
      timestamp: new Date().toISOString(),
      eventType: type,
      details: details || "",
    });
    setDbState(updated);
  };

  const spawnNotification = (text: string, type: "success" | "info" | "error") => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const handleToggleMode = () => {
    const updated = {
      ...dbState,
      theme: {
        ...dbState.theme,
        isDarkMode: !dbState.theme.isDarkMode,
      },
    };
    setDbState(updated);
    spawnNotification(
      updated.theme.isDarkMode
        ? t("الوضع الليلي", "Dark Mode")
        : t("الوضع النهاري", "Light Mode"),
      "info"
    );
  };

  const handlePrintResume = () => {
    logAction("download_resume");
    spawnNotification(t("جاري فتح نافذة طباعة السيرة الذاتية المهنية...", "Opening resume printable document view..."), "success");
    window.print();
  };

  // Border radius dynamic assignment
  const getBorderRadiusClass = () => {
    switch (dbState.theme.borderRadius) {
      case "none": return "rounded-none";
      case "sm": return "rounded-sm";
      case "md": return "rounded-md";
      case "lg": return "rounded-2xl";
      case "full": return "rounded-3xl";
      default: return "rounded-2xl";
    }
  };

  // Header Theme Classes
  const getAccentTextClass = () => {
    switch (dbState.theme.primaryColor) {
      case "emerald": return "text-emerald-500 dark:text-emerald-400";
      case "blue": return "text-blue-500 dark:text-blue-400";
      case "indigo": return "text-indigo-500 dark:text-indigo-400";
      case "amber": return "text-amber-500 dark:text-amber-400";
      default: return "text-rose-500 dark:text-rose-400";
    }
  };

  const getAccentBgClass = () => {
    switch (dbState.theme.primaryColor) {
      case "emerald": return "bg-emerald-600 hover:bg-emerald-500 text-white";
      case "blue": return "bg-blue-600 hover:bg-blue-500 text-white";
      case "indigo": return "bg-indigo-600 hover:bg-indigo-500 text-white";
      case "amber": return "bg-amber-600 hover:bg-amber-500 text-white";
      default: return "bg-rose-600 hover:bg-rose-500 text-white";
    }
  };

  const getAccentBorderClass = () => {
    switch (dbState.theme.primaryColor) {
      case "emerald": return "border-emerald-500/20";
      case "blue": return "border-blue-500/20";
      case "indigo": return "border-indigo-500/20";
      case "amber": return "border-amber-500/20";
      default: return "border-rose-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans flex flex-col relative">
      {/* Primary Header/Nav */}
      <nav className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between shrink-0 shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded flex items-center justify-center text-white font-bold text-sm shrink-0 ${
            dbState.theme.primaryColor === 'emerald' ? 'bg-emerald-600' :
            dbState.theme.primaryColor === 'blue' ? 'bg-blue-600' :
            dbState.theme.primaryColor === 'indigo' ? 'bg-indigo-600' :
            dbState.theme.primaryColor === 'amber' ? 'bg-amber-600' :
            'bg-rose-600'
          }`}>
            {lang === "ar" ? "أم" : "AM"}
          </div>
          <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-slate-100">
            {t(dbState.profile.nameAr, dbState.profile.nameEn)}
            <span className={`italic font-normal ml-1 ${getAccentTextClass()}`}> {t("السيرة الذاتية", "Portfolio")}</span>
          </span>
        </div>

        {/* Navigation Action Hub */}
        <div className="flex items-center gap-2">
          {/* Social Links */}
          <div className="flex items-center gap-1.5 sm:gap-2 mr-1">
            <a
              href={dbState.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-all cursor-pointer"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            {dbState.profile.linkedin && (
              <a
                href={dbState.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-all cursor-pointer"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 border-r border-slate-200 dark:border-slate-800 pr-3 sm:pr-4 mr-1">
            <button
              onClick={() => setLang("en")}
              className={`text-xs font-semibold px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                lang === "en"
                  ? `${getAccentTextClass()} bg-slate-100 dark:bg-slate-800`
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("ar")}
              className={`text-xs font-semibold px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                lang === "ar"
                  ? `${getAccentTextClass()} bg-slate-100 dark:bg-slate-800`
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              AR
            </button>
          </div>

          {/* Theme Toggler */}
          <button
            onClick={handleToggleMode}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title={t("تبديل مظهر الإضاءة", "Toggle Light/Dark Theme")}
          >
            {dbState.theme.isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Admin backoffice portal */}
          {isAdminMode && (
            <button
              onClick={() => setShowAdmin(true)}
              className="p-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors cursor-pointer flex items-center gap-1.5 font-semibold"
              title={t("تعديل بيانات السيرة الذاتية", "Edit Portfolio Data")}
            >
              <Settings className="w-4 h-4 animate-spin-slow text-slate-500" />
              <span className="text-xs font-bold hidden sm:inline">{t("لوحة الإدارة", "Admin Panel")}</span>
            </button>
          )}
        </div>
      </nav>

      {/* Floating System Notifications */}
      <div className="fixed top-20 right-6 left-6 sm:left-auto z-50 flex flex-col gap-3 max-w-sm select-none" id="live-toasts">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`p-4 shadow-xl border flex items-start gap-3 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 ${getBorderRadiusClass()}`}
            >
              <div className={`p-1 rounded ${
                toast.type === "success" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                toast.type === "error" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" :
                "bg-blue-500/10 text-blue-600 dark:text-blue-400"
              }`}>
                <CheckCircle className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold leading-snug">{toast.text}</p>
              </div>
              <button
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Dual-Panel Content Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-7xl mx-auto w-full">
        {/* Sidebar Left/Right (RTL respects order naturally in modern browsers, or responsive grid/flex) */}
        <aside className="w-full lg:w-80 bg-white dark:bg-slate-900 border-b lg:border-b-0 lg:border-r lg:border-l-0 border-slate-200 dark:border-slate-800 flex flex-col shrink-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, x: lang === 'ar' ? 25 : -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-6 space-y-8"
          >
            {/* Profile Summary Card */}
            <section className="space-y-3">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                {t(dbState.profile.titleAr, dbState.profile.titleEn)}
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                {t(dbState.profile.nameAr, dbState.profile.nameEn)}
              </h2>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {t(dbState.profile.bioAr, dbState.profile.bioEn)}
              </p>
            </section>

            {/* Core Expertise Skills list */}
            <section className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                {t("الخبرات الأساسية", "Core Expertise")}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {dbState.skills.slice(0, 10).map((sk) => (
                  <motion.span
                    whileHover={{ scale: 1.05, y: -1 }}
                    transition={{ duration: 0.2 }}
                    key={sk.id}
                    className="px-2 py-1 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 rounded text-[10px] font-mono border border-slate-150 dark:border-slate-800 cursor-default select-none"
                  >
                    {t(sk.nameAr, sk.nameEn)}
                  </motion.span>
                ))}
              </div>
            </section>

            {/* Direct Contact mini panel */}
            <section className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-150 dark:border-slate-850 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {t("معلومات التواصل الفوري", "Direct Inquiry")}
              </h3>
              <div className="space-y-2 text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{dbState.profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{dbState.profile.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t(dbState.profile.locationAr, dbState.profile.locationEn)}</span>
                </div>
              </div>
              <motion.a
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                href="#contact-hub"
                className={`w-full py-1.5 text-[11px] font-bold rounded text-center block transition-all shadow-sm cursor-pointer ${getAccentBgClass()}`}
              >
                {t("أرسل رسالة سريعة", "Inquire Message")}
              </motion.a>
            </section>


          </motion.div>
        </aside>

        {/* Main Display Panel scrollable area */}
        <main className="flex-1 p-4 sm:p-8 space-y-12 overflow-y-auto">
          {/* SECTION: Hero/Call-to-Action Greeting */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="py-6 space-y-4" 
            id="hero-landing"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm text-[10px] font-bold text-slate-500">
              <Sparkles className="w-3 h-3 text-yellow-500 animate-pulse" />
              <span>{t("استشاري معتمد ومطور ريأكت", "Certified Consultant & React Developer")}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
              {t("نصمم ونطوّر كفاءة أعمالك الرقمية", "Architecting high-fidelity enterprise workflows")}
            </h1>
            
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
              {t("مرحباً بك في المنصة المهنية الشاملة. بصفتي متخصصاً في استشارات أنظمة SAP المتقدمة ومطوراً متكاملاً لتطبيقات الويب، أجمع بين عمق سير عمل الشركات الكبرى وسرعة الابتكار البرمجي الحديث.",
                 "Welcome to my smart workspace suite. Bridging the gap between robust SAP HCM logic and fast-loading web applications to maximize business performance and modern UX.")}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <motion.a
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                href="#contact-hub"
                className={`px-5 py-2 text-xs font-bold rounded-xl shadow transition-all cursor-pointer ${getAccentBgClass()}`}
              >
                {t("ابدأ المشروع الآن", "Let's Consult")}
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                href="/Ahmed_Mousa_SAP_HCM_CV.pdf"
                download="Ahmed_Mousa_SAP_HCM_CV.pdf"
                onClick={() => logAction("download_resume")}
                className="px-5 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>{t("تحميل السيرة الذاتية PDF", "Download CV PDF")}</span>
              </motion.a>
            </div>
          </motion.section>

          {/* SECTION: SAP Expertise & Core Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SAP Expertise Card */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="p-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 shadow-sm rounded-2xl space-y-4 text-left rtl:text-right"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/80">
                <Activity className={`w-5 h-5 ${getAccentTextClass()}`} />
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                    {t("تخصص وخبرات SAP", "SAP Expertise")}
                  </h2>
                  <p className="text-[10px] text-slate-400">
                    {t("الوحدات الوظيفية والمهارات التي تم تطبيقها بنجاح", "Functional modules & core enterprise competencies")}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { nameEn: "Personnel Administration (PA)", nameAr: "شؤون الموظفين (PA)" },
                  { nameEn: "Organizational Management (OM)", nameAr: "الهياكل التنظيمية (OM)" },
                  { nameEn: "Time Management (TM)", nameAr: "إدارة الوقت (TM)" },
                  { nameEn: "Payroll", nameAr: "كشوف الرواتب" },
                  { nameEn: "Payroll Testing", nameAr: "اختبار الرواتب" },
                  { nameEn: "Master Data", nameAr: "البيانات الأساسية" },
                  { nameEn: "Organizational Structure", nameAr: "الهيكل التنظيمي" },
                  { nameEn: "Time Evaluation", nameAr: "تقييم الوقت" },
                  { nameEn: "SAP GUI", nameAr: "واجهة SAP GUI" },
                  { nameEn: "UAT (User Acceptance Testing)", nameAr: "اختبارات قبول المستخدم" },
                  { nameEn: "End User Training", nameAr: "تدريب المستخدم النهائي" }
                ].map((skill, sIdx) => (
                  <motion.span
                    whileHover={{ scale: 1.05, y: -1 }}
                    transition={{ duration: 0.15 }}
                    key={sIdx}
                    className="px-2.5 py-1 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 rounded-lg text-[11px] font-semibold border border-slate-150 dark:border-slate-800/60 cursor-default select-none flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {t(skill.nameAr, skill.nameEn)}
                  </motion.span>
                ))}
              </div>
            </motion.section>

            {/* Achievements Card */}
            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="p-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 shadow-sm rounded-2xl space-y-4 text-left rtl:text-right"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/80">
                <Award className={`w-5 h-5 ${getAccentTextClass()}`} />
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                    {t("الإنجازات المميزة", "Achievements")}
                  </h2>
                  <p className="text-[10px] text-slate-400">
                    {t("نقاط مضيئة تثير اهتمام مسؤولي التوظيف والشركات", "Key milestones that capture recruiters' attention")}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-1 text-xs">
                {[
                  {
                    en: "Participated in SAP HCM Implementation",
                    ar: "المشاركة في تطبيق نظام SAP HCM بنجاح",
                    descEn: "Executed core configurations across crucial enterprise HR streams.",
                    descAr: "تنفيذ التهيئة والربط الأساسي لمستويات الموارد البشرية المختلفة."
                  },
                  {
                    en: "Conducted End User Training",
                    ar: "تقديم برامج تدريبية وتأهيلية للمستخدمين النهائيين",
                    descEn: "Designed simple manuals to ensure transition and fast adoption.",
                    descAr: "تصميم مواد تدريبية مبسطة لضمان انتقال سلس وكفء للنظام الجديد."
                  },
                  {
                    en: "Built Workflow Automation Systems",
                    ar: "بناء وتصميم نظم أتمتة العمليات وسير العمل",
                    descEn: "Optimized complex authorization steps, saving manual efforts.",
                    descAr: "أتمتة دورات الموافقات والمستندات مما وفر الوقت والمجهود التشغيلي."
                  },
                  {
                    en: "Developed Enterprise Dashboards",
                    ar: "تطوير لوحات بيانات ذكية تفاعلية للمؤسسات",
                    descEn: "Integrated customized KPI reporting dashboards for HR leaders.",
                    descAr: "توفير تحليلات فورية لدعم قرارات إدارة القوى العاملة بدقة عالية."
                  },
                  {
                    en: "Supported Payroll Testing",
                    ar: "دعم وتدقيق اختبارات كشوف الرواتب وحسابات الوقت",
                    descEn: "Ensured highly accurate salary calculations and criteria auditing.",
                    descAr: "التحقق التام من دقة العمليات الحسابية واللوائح القانونية والتعويضات."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-extrabold text-[9px] shrink-0">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                        {t(item.ar, item.en)}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal mt-0.5">
                        {t(item.descAr, item.descEn)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* SECTION: Projects Grid & Showroom */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-850">
              <Layers className={`w-5 h-5 ${getAccentTextClass()}`} />
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">{t("المشاريع المنفذة", "Projects Showcase")}</h2>
                <p className="text-[11px] text-slate-400">{t("نماذج من الحلول التقنية والمشاريع البرمجية المطورة", "A selection of technical solutions and custom developed projects")}</p>
              </div>
            </div>
            <ProjectCard lang={lang} dbState={dbState} onLogAction={logAction} />
          </motion.section>

          {/* SECTION: Timeline Experience */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-850">
              <Briefcase className={`w-5 h-5 ${getAccentTextClass()}`} />
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">{t("الخبرة المهنية", "Professional Experience")}</h2>
                <p className="text-[11px] text-slate-400">{t("السجل المهني والمشاريع الاستشارية وإعداد الأنظمة للجهات المختلفة", "Professional work history, advisory roles, and enterprise system deployments")}</p>
              </div>
            </div>

            <div className="relative border-l border-slate-200 dark:border-slate-800 pl-6 space-y-6 ml-3">
              {dbState.experiences.map((exp, idx) => (
                <div key={exp.id} className="relative">
                  {/* Timeline bullet */}
                  <span className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center ${
                    idx === 0 ? `${
                      dbState.theme.primaryColor === 'emerald' ? 'bg-emerald-500' :
                      dbState.theme.primaryColor === 'blue' ? 'bg-blue-500' :
                      dbState.theme.primaryColor === 'indigo' ? 'bg-indigo-500' :
                      dbState.theme.primaryColor === 'amber' ? 'bg-amber-500' :
                      'bg-rose-500'
                    } pulse-glow` : "bg-slate-300 dark:bg-slate-700"
                  }`} />

                  <div className={`p-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 shadow-sm ${getBorderRadiusClass()}`}>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-bold block mb-1">
                      {t(exp.periodAr, exp.periodEn)}
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                      {t(exp.roleAr, exp.roleEn)}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {t(exp.companyAr, exp.companyEn)}
                    </p>
                    
                    <ul className="mt-3 space-y-1.5 list-disc list-inside text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {t(exp.bulletsAr, exp.bulletsEn).map((bullet: string, bIdx: number) => (
                        <li key={bIdx} className="pl-1">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* SECTION: Certifications & Structured Training */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-850">
              <Award className={`w-5 h-5 ${getAccentTextClass()}`} />
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">{t("الشهادات والبرامج التدريبية", "Certifications & Training")}</h2>
                <p className="text-[11px] text-slate-400">{t("الشهادات المعتمدة والبرامج التأهيلية والدورات التخصصية", "Official program certifications, accredited training, and professional development")}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dbState.trainings.map((train) => (
                <div
                  key={train.id}
                  className={`p-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 shadow-sm flex flex-col justify-between ${getBorderRadiusClass()}`}
                >
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-150 dark:border-slate-800">
                      {t(train.periodAr, train.periodEn)}
                    </span>
                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 mt-2">
                      {t(train.titleAr, train.titleEn)}
                    </h3>
                    <p className={`text-[11px] font-semibold mt-0.5 ${getAccentTextClass()}`}>
                      {t(train.providerAr, train.providerEn)}
                    </p>
                    
                    <ul className="mt-3 space-y-1.5 list-disc list-inside text-[11px] text-slate-600 dark:text-slate-400">
                      {t(train.bulletsAr, train.bulletsEn).map((b: string, bIdx: number) => (
                        <li key={bIdx} className="leading-relaxed pl-0.5">{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* SECTION: Direct Message Center */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4" 
            id="contact-hub"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-850">
              <Mail className={`w-5 h-5 ${getAccentTextClass()}`} />
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">{t("تواصل معي", "Contact Me")}</h2>
                <p className="text-[11px] text-slate-400">{t("أرسل استفسارك مباشرة وسأقوم بالرد عليك في أقرب وقت ممكن", "Send your inquiries directly and I will get back to you as soon as possible")}</p>
              </div>
            </div>

            <ContactForm
              lang={lang}
              dbState={dbState}
              onUpdateState={setDbState}
              onSpawnNotification={spawnNotification}
              onLogAction={logAction}
            />
          </motion.section>
        </main>
      </div>

      {/* Footer / Status Bar style of the theme */}
      <footer className="h-10 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-medium shrink-0 z-10 select-none">
        <div className="flex items-center gap-3">
          <div 
            onClick={handleSecretClick}
            className="flex items-center gap-2 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            title="Admin Mode Toggle"
          >
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="font-mono text-[10px] uppercase tracking-wider">{t("صنع بواسطة أحمد موسى", "Made by Ahmed Mousa")}</span>
          </div>
          
          {isAdminMode && (
            <button
              onClick={() => setShowAdmin(true)}
              className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer font-bold border-l border-slate-200 dark:border-slate-800 pl-3"
              title={t("تعديل السيرة الذاتية", "Edit Portfolio")}
            >
              <Settings className="w-3 h-3 animate-spin-slow text-slate-500" />
              <span>{t("لوحة الإدارة", "Admin Panel")}</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-3 sm:gap-4 uppercase tracking-wider font-mono">
          <div className="flex items-center gap-2 border-r border-slate-200 dark:border-slate-800 pr-3 rtl:border-r-0 rtl:border-l rtl:pl-3 mr-1">
            <a
              href={dbState.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              GitHub
            </a>
            {dbState.profile.linkedin && (
              <a
                href={dbState.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors pl-2"
              >
                LinkedIn
              </a>
            )}
          </div>
          <span>&copy; {new Date().getFullYear()} {t("أحمد موسى", "Ahmed Mousa")}</span>
        </div>
      </footer>

      {/* FLOAT WIDGET: Floating AI Assistant Chatbot */}
      <AIAssistant lang={lang} dbState={dbState} onLogAction={logAction} />

      {/* PANEL OVERLAY: Content Manager Dashboard */}
      {showAdmin && (
        <AdminDashboard
          lang={lang}
          dbState={dbState}
          onUpdateState={setDbState}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </div>
  );
}
