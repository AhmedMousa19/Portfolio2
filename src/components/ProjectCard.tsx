import React, { useState, useMemo } from "react";
import { Search, ExternalLink, Code, Database, Layers, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Lang, Project, DatabaseState } from "../types";

interface ProjectCardProps {
  lang: Lang;
  dbState: DatabaseState;
  onLogAction: (type: "click_project", details?: string) => void;
}

export default function ProjectCard({ lang, dbState, onLogAction }: ProjectCardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "sap" | "web" | "automation">("all");
  const [expandedProj, setExpandedProj] = useState<Record<string, boolean>>({});

  const t = <T,>(ar: T, en: T): T => (lang === "ar" ? ar : en);

  // Advanced filtration and scoring
  const filteredProjects = useMemo(() => {
    return dbState.projects.filter((proj) => {
      // Category filter
      if (activeCategory !== "all" && proj.type !== activeCategory) {
        return false;
      }

      // Search Query filter
      const searchLower = searchQuery.toLowerCase().trim();
      if (!searchLower) return true;

      const titleMatch = proj.titleAr.includes(searchLower) || proj.titleEn.toLowerCase().includes(searchLower);
      const descMatch = proj.descAr.includes(searchLower) || proj.descEn.toLowerCase().includes(searchLower);
      const tagMatch = proj.tags.some((tag) => tag.toLowerCase().includes(searchLower));
      
      return titleMatch || descMatch || tagMatch;
    });
  }, [dbState.projects, searchQuery, activeCategory]);

  const toggleExpand = (id: string) => {
    setExpandedProj((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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

  const getPrimaryColorClass = () => {
    switch (dbState.theme.primaryColor) {
      case "emerald": return "text-emerald-500 bg-emerald-500/10 focus:ring-emerald-500 border-emerald-500/30";
      case "blue": return "text-blue-500 bg-blue-500/10 focus:ring-blue-500 border-blue-500/30";
      case "indigo": return "text-indigo-500 bg-indigo-500/10 focus:ring-indigo-500 border-indigo-500/30";
      case "amber": return "text-amber-500 bg-amber-500/10 focus:ring-amber-500 border-amber-500/30";
      default: return "text-rose-500 bg-rose-500/10 focus:ring-rose-500 border-rose-500/30";
    }
  };

  return (
    <div className="space-y-6" id="projects-showroom">
      {/* Search and Filters Hub */}
      <div className={`p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-sm ${getBorderRadiusClass()}`}>
        <div className="flex flex-col md:flex-row gap-3 items-center">
          {/* Search Field */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("البحث المتقدم بين المشاريع والتقنيات (مثال: SAP, React...)", "Search by project name, tech tag, or keywords...")}
              className={`w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 text-slate-800 dark:text-slate-200`}
            />
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {[
              { id: "all", label: t("الكل", "All Projects") },
              { id: "sap", label: t("أنظمة SAP", "SAP HCM") },
              { id: "web", label: t("تطوير الويب", "Web Apps") },
              { id: "automation", label: t("أتمتة العمليات", "Automations") },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? dbState.theme.primaryColor === "emerald"
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : dbState.theme.primaryColor === "blue"
                      ? "bg-blue-600 text-white border-blue-600"
                      : dbState.theme.primaryColor === "indigo"
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : dbState.theme.primaryColor === "amber"
                      ? "bg-amber-600 text-white border-amber-600"
                      : "bg-rose-600 text-white border-rose-600"
                    : "bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>


      </div>

      {/* Projects Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`col-span-full text-center py-16 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 ${getBorderRadiusClass()}`}
            >
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-2 animate-bounce" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t("لم نجد أي مشروع يطابق استفسارك الحالي. حاول البحث بكلمات أبسط.", "No projects match your current keywords. Try another query.")}
              </p>
            </motion.div>
          ) : (
            filteredProjects.map((proj) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)" }}
                transition={{ duration: 0.3 }}
                key={proj.id}
                className={`bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-emerald-500/40 dark:hover:border-emerald-400/40 transition-colors duration-300 ${getBorderRadiusClass()}`}
              >
                {/* Card top */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-0.5 text-[9px] font-extrabold rounded-lg tracking-wider uppercase ${
                        proj.type === "sap"
                          ? "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300"
                          : proj.type === "web"
                          ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                          : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                      }`}
                    >
                      {proj.type === "sap"
                        ? t("أنظمة ساب (SAP HCM)", "SAP Enterprise")
                        : proj.type === "web"
                        ? t("تطوير ويب (React)", "Frontend / Web")
                        : t("أتمتة ذكية (Automation)", "Workflow Scripting")}
                    </span>

                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => onLogAction("click_project", proj.titleEn)}
                        className="text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-950 transition-colors cursor-pointer"
                        title={t("معاينة التجربة المباشرة", "Open Live Demo")}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {t(proj.titleAr, proj.titleEn)}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {t(proj.descAr, proj.descEn)}
                  </p>

                  {/* Expanded Recruiter-Focused Details */}
                  <AnimatePresence initial={false}>
                    {expandedProj[proj.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4 overflow-hidden text-xs"
                      >
                        {/* Problem */}
                        {proj.problemEn && (
                          <div className="space-y-1 text-left rtl:text-right">
                            <span className="inline-block px-1.5 py-0.5 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-extrabold text-[9px] rounded uppercase tracking-wider">
                              {t("المشكلة والعقبات", "The Problem & Obstacles")}
                            </span>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium pl-1 pr-1">
                              {t(proj.problemAr, proj.problemEn)}
                            </p>
                          </div>
                        )}

                        {/* Solution */}
                        {proj.solutionEn && (
                          <div className="space-y-1 text-left rtl:text-right">
                            <span className="inline-block px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-extrabold text-[9px] rounded uppercase tracking-wider">
                              {t("الحل المقترح", "The Strategic Solution")}
                            </span>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium pl-1 pr-1">
                              {t(proj.solutionAr, proj.solutionEn)}
                            </p>
                          </div>
                        )}

                        {/* Your Role */}
                        {proj.roleEn && (
                          <div className="space-y-1 text-left rtl:text-right">
                            <span className="inline-block px-1.5 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-extrabold text-[9px] rounded uppercase tracking-wider">
                              {t("دورك في المشروع", "Your Core Role")}
                            </span>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium pl-1 pr-1">
                              {t(proj.roleAr, proj.roleEn)}
                            </p>
                          </div>
                        )}

                        {/* Technology */}
                        {proj.techEn && (
                          <div className="space-y-1 text-left rtl:text-right">
                            <span className="inline-block px-1.5 py-0.5 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 font-extrabold text-[9px] rounded uppercase tracking-wider">
                              {t("البيئة والتقنيات", "Technology Stack")}
                            </span>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-mono text-[11px] pl-1 pr-1">
                              {t(proj.techAr, proj.techEn)}
                            </p>
                          </div>
                        )}

                        {/* Results */}
                        {proj.resultsEn && (
                          <div className="space-y-1 text-left rtl:text-right">
                            <span className="inline-block px-1.5 py-0.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-extrabold text-[9px] rounded uppercase tracking-wider">
                              {t("النتائج والأرقام", "Business Outcomes & Impact")}
                            </span>
                            <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-bold pl-2 pr-2 border-l-2 rtl:border-l-0 rtl:border-r-2 border-amber-400 dark:border-amber-500">
                              {t(proj.resultsAr, proj.resultsEn)}
                            </p>
                          </div>
                        )}

                        {/* Key Contributions List */}
                        <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-left rtl:text-right">
                          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                            {t("أبرز الإنجازات والمهام الفنية", "Key Contributions & System Engineering")}
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-500 dark:text-slate-400 pl-1 pr-1">
                            {t(proj.bulletsAr, proj.bulletsEn).map((bullet: string, bIdx: number) => (
                              <li key={bIdx} className="leading-relaxed">
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Screenshots */}
                        {proj.screenshots && proj.screenshots.length > 0 && (
                          <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-left rtl:text-right">
                            <span className="inline-block px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-extrabold text-[9px] rounded uppercase tracking-wider">
                              {t("لقطات شاشة معمارية ومخططات", "System Blueprint & Wireframes")}
                            </span>
                            <div className="grid grid-cols-3 gap-2">
                              {proj.screenshots.map((screen, sIdx) => (
                                <div
                                  key={sIdx}
                                  className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg flex flex-col justify-center items-center text-center space-y-1 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
                                >
                                  <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                                      {sIdx + 1}
                                    </span>
                                  </div>
                                  <span className="text-[8px] font-mono font-semibold text-slate-500 dark:text-slate-400 truncate w-full">
                                    {screen.replace(/_/g, " ")}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card Bottom / Footer */}
                <div className="px-5 py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-150 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1 max-w-[70%]">
                    {proj.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9px] font-mono px-1.5 py-0.5 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {proj.tags.length > 3 && (
                      <span className="text-[9px] font-mono px-1 text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded">
                        +{proj.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleExpand(proj.id)}
                    className={`flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:opacity-85 transition-opacity cursor-pointer`}
                  >
                    <span>{expandedProj[proj.id] ? t("إخفاء التفاصيل", "Hide Info") : t("عرض التفاصيل", "Show Info")}</span>
                    {expandedProj[proj.id] ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
