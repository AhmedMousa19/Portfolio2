import React, { useState, useEffect } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Play, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle, 
  Database, 
  Mail, 
  FileText, 
  Settings, 
  TrendingUp, 
  Smartphone, 
  Layers, 
  Clock, 
  Activity, 
  User, 
  ShieldAlert
} from "lucide-react";
import { Lang, DatabaseState } from "../types";

interface BusinessDemoSimulatorProps {
  lang: Lang;
  dbState: DatabaseState;
}

type SimulationStep = {
  id: number;
  labelAr: string;
  labelEn: string;
  descAr: string;
  descEn: string;
  status: "idle" | "running" | "success" | "error";
  icon: React.ReactNode;
};

export default function BusinessDemoSimulator({ lang, dbState }: BusinessDemoSimulatorProps) {
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(-1);
  const [simLog, setSimLog] = useState<string[]>([]);
  
  // Leave Request inputs
  const [employeeName, setEmployeeName] = useState("Ahmed Mousa");
  const [leaveType, setLeaveType] = useState<"Annual" | "Sick" | "Emergency">("Annual");
  const [leaveDays, setLeaveDays] = useState(5);
  const [managerAction, setManagerAction] = useState<"approve" | "reject">("approve");
  const [leaveBalance, setLeaveBalance] = useState(21);

  const t = <T,>(ar: T, en: T): T => (lang === "ar" ? ar : en);

  // Common UI styling classes
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
      case "emerald": return "bg-emerald-600 hover:bg-emerald-500 text-white focus:ring-emerald-500";
      case "blue": return "bg-blue-600 hover:bg-blue-500 text-white focus:ring-blue-500";
      case "indigo": return "bg-indigo-600 hover:bg-indigo-500 text-white focus:ring-indigo-500";
      case "amber": return "bg-amber-600 hover:bg-amber-500 text-white focus:ring-amber-500";
      default: return "bg-rose-600 hover:bg-rose-500 text-white focus:ring-rose-500";
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

  // Define Steps for Leave Management
  const leaveSteps: SimulationStep[] = [
    {
      id: 1,
      labelAr: "إرسال نموذج طلب الإجازة",
      labelEn: "Form Submission",
      descAr: `أرسل الموظف (${employeeName}) طلباً لإجازة ${t(leaveType === "Annual" ? "سنوية" : leaveType === "Sick" ? "مرضية" : "طارئة", leaveType)} مدتها ${leaveDays} أيام.`,
      descEn: `Employee (${employeeName}) submitted a ${leaveType} leave request for ${leaveDays} days.`,
      status: "idle",
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: 2,
      labelAr: "تحقق Google Apps Script من الرصيد",
      labelEn: "Apps Script Validation",
      descAr: `يقوم السكريبت تلقائياً بالتحقق من رصيد الإجازات المتبقي (${leaveBalance} أيام).`,
      descEn: `Apps Script automatically evaluates the user's remaining balance (${leaveBalance} days).`,
      status: "idle",
      icon: <Settings className="w-4 h-4 text-amber-500" />
    },
    {
      id: 3,
      labelAr: "تحديث قاعدة بيانات Google Sheets",
      labelEn: "Google Sheets Registration",
      descAr: "تسجيل الطلب كـ 'معلق' في ورقة العمل وحساب تاريخ الاستئناف التلقائي.",
      descEn: "Inserting the new entry as 'Pending' into the spreadsheet and mapping resumption dates.",
      status: "idle",
      icon: <Database className="w-4 h-4 text-emerald-500" />
    },
    {
      id: 4,
      labelAr: "إرسال بريد إلكتروني للمدير للموافقة",
      labelEn: "Gmail Manager Dispatch",
      descAr: `إرسال بريد تفاعلي عبر Gmail API للمدير لاتخاذ القرار: ${managerAction === "approve" ? "موافقة" : "رفض"}.`,
      descEn: `Sending an interactive email notification via Gmail API to the Manager. Selected: ${managerAction.toUpperCase()}.`,
      status: "idle",
      icon: <Mail className="w-4 h-4 text-blue-500" />
    },
    {
      id: 5,
      labelAr: "معالجة القرار وحماية السجلات",
      labelEn: "Final Lock & Record Lock",
      descAr: `حفظ القرار النهائي، وتعديل رصيد الموظف ليصبح ${managerAction === "approve" ? leaveBalance - leaveDays : leaveBalance} يوماً، وحماية الصف في ورقة العمل لمنع التعديل اليدوي العشوائي.`,
      descEn: `Final status archived. Balance adjusted to ${managerAction === "approve" ? leaveBalance - leaveDays : leaveBalance} days. Spreadsheet row range locked automatically.`,
      status: "idle",
      icon: <CheckCircle className="w-4 h-4 text-teal-500" />
    }
  ];

  // Select steps (always leaveSteps now)
  const activeSteps = leaveSteps;

  // Run simulation timeline using timed intervals
  const handleStartSimulation = () => {
    if (simulationRunning) return;
    
    // Safety check for leave days
    if (leaveDays > leaveBalance) {
      setSimLog([
        t(
          `❌ خطأ فني: رصيد الإجازات المتبقي (${leaveBalance} أيام) أقل من عدد الأيام المطلوبة (${leaveDays} أيام)!`,
          `❌ System Exception: Requested days (${leaveDays}) exceed remaining leave balance (${leaveBalance} days)!`
        )
      ]);
      return;
    }

    setSimulationRunning(true);
    setCurrentStepIdx(0);
    setSimLog([
      t("🚀 بدء محاكاة بيئة الأعمال التشغيلية...", "🚀 Initializing real-world business system simulation sandbox..."),
      t("📂 تحميل مكونات سير العمل والمقاييس المتكاملة...", "📂 Loading pipeline dependencies and variables configuration...")
    ]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < activeSteps.length) {
        setCurrentStepIdx(step);
        // Add log entry
        const currentStepObj = activeSteps[step];
        const logMsg = t(
          `⚡ الخطوة ${step + 1}: تم تشغيل "${currentStepObj.labelAr}" بنجاح.`,
          `⚡ Step ${step + 1}: Executed "${currentStepObj.labelEn}" successfully.`
        );
        setSimLog(prev => [...prev, logMsg]);
      } else {
        clearInterval(interval);
        setSimulationRunning(false);
        const finalMsg = t(
          `🎯 اكتملت المحاكاة بنجاح 100%! تم معالجة وتوثيق جميع الخطوات في قاعدة بيانات السجل.`,
          `🎯 Simulation complete with 100% success! All business processes safely committed and logged.`
        );
        setSimLog(prev => [...prev, finalMsg]);
      }
    }, 1800);
  };

  const handleResetSimulation = () => {
    setSimulationRunning(false);
    setCurrentStepIdx(-1);
    setSimLog([]);
  };

  return (
    <div 
      id="business-demo-simulator" 
      className={`p-6 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 shadow-sm ${getBorderRadiusClass()} space-y-6 text-left rtl:text-right`}
    >
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[8px] font-mono font-extrabold text-emerald-700 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-md tracking-wider uppercase">
              {t("عرض تفاعلي حي", "Live Interactive Demo")}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Activity className={`w-4 h-4 ${getAccentTextClass()}`} />
            {t("محاكي سيناريوهات الأعمال الحقيقية", "Interactive Real-World Business Simulator")}
          </h2>
          <p className="text-[11px] text-slate-400">
            {t("تفاعل مع الأنظمة البرمجية وسير العمل التي قمت ببنائها وتخصيصها باستخدام سيناريوهات ملموسة", "Interact with core enterprise architectures and automated workflows built with real cases")}
          </p>
        </div>
      </div>

      {/* Main Grid Layout (Controls on Left/Top, Flow Output on Right/Bottom) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Parameters Control */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 bg-slate-50/50 dark:bg-slate-950/25 border border-slate-150/80 dark:border-slate-850 rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {t("إعداد متغيرات طلب الإجازة", "Configure Leave Request")}
            </h3>

            {/* LEAVE AUTOMATION CONTROLS */}
            <div className="space-y-3.5 text-xs">
              {/* Employee Name Input */}
              <div className="space-y-1">
                <label className="text-slate-600 dark:text-slate-400 font-bold">
                  {t("اسم الموظف المعني", "Employee Name")}
                </label>
                <input
                  type="text"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  disabled={simulationRunning}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1"
                />
              </div>

              {/* Leave Type Select */}
              <div className="space-y-1">
                <label className="text-slate-600 dark:text-slate-400 font-bold">
                  {t("نوع الإجازة المطلوبة", "Leave Type")}
                </label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as any)}
                  disabled={simulationRunning}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1"
                >
                  <option value="Annual">{t("إجازة سنوية اعتيادية (Annual)", "Annual Paid Leave")}</option>
                  <option value="Sick">{t("إجازة مرضية معتمدة (Sick)", "Sick Leave")}</option>
                  <option value="Emergency">{t("إجازة طارئة (Emergency)", "Emergency Leave")}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Leave Days Input */}
                <div className="space-y-1">
                  <label className="text-slate-600 dark:text-slate-400 font-bold">
                    {t("مدة الإجازة (يوم)", "Leave Duration")}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={leaveDays}
                    onChange={(e) => setLeaveDays(Number(e.target.value))}
                    disabled={simulationRunning}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1"
                  />
                </div>

                {/* Leave Balance Input */}
                <div className="space-y-1">
                  <label className="text-slate-600 dark:text-slate-400 font-bold">
                    {t("رصيد الإجازات الحالي", "Current Balance")}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={45}
                    value={leaveBalance}
                    onChange={(e) => setLeaveBalance(Number(e.target.value))}
                    disabled={simulationRunning}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1"
                  />
                </div>
              </div>

              {/* Simulated Manager Action */}
              <div className="space-y-1.5">
                <label className="text-slate-600 dark:text-slate-400 font-bold block mb-1">
                  {t("قرار المدير المحاكي", "Simulated Manager Action")}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={simulationRunning}
                    onClick={() => setManagerAction("approve")}
                    className={`py-2 rounded-lg font-extrabold text-[11px] border transition-all cursor-pointer ${
                      managerAction === "approve"
                        ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                        : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-600 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    {t("الموافقة على الإجازة", "APPROVE REQUEST")}
                  </button>
                  <button
                    type="button"
                    disabled={simulationRunning}
                    onClick={() => setManagerAction("reject")}
                    className={`py-2 rounded-lg font-extrabold text-[11px] border transition-all cursor-pointer ${
                      managerAction === "reject"
                        ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border-rose-500/30"
                        : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-600 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    {t("رفض الطلب", "REJECT REQUEST")}
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated Actions Trigger and Reset */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleStartSimulation}
                disabled={simulationRunning}
                className={`flex-1 py-2.5 px-4 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  simulationRunning 
                    ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border-none cursor-not-allowed"
                    : getAccentBgClass()
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>{simulationRunning ? t("المحاكاة نشطة...", "Simulation Active...") : t("تشغيل المحاكاة البرمجية", "Start Workflow Run")}</span>
              </button>

              <button
                type="button"
                onClick={handleResetSimulation}
                disabled={simulationRunning}
                className="p-2.5 bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded-xl transition-all cursor-pointer"
                title={t("إعادة ضبط", "Reset Params")}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Steps Visualizer & Execution Log (Terminal Style) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Stepper Progression Visual */}
          <div className="p-4 bg-white dark:bg-slate-950/40 border border-slate-150 dark:border-slate-850 rounded-xl space-y-4 flex-1 flex flex-col justify-between">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {t("مراحل سير عمل الإجازات", "Leaves Workflow")}
            </h3>

            <div className="space-y-4 my-auto py-2">
              {activeSteps.map((step, idx) => {
                const isCompleted = idx < currentStepIdx || (currentStepIdx === activeSteps.length - 1 && !simulationRunning);
                const isActive = idx === currentStepIdx && simulationRunning;
                const isPending = idx > currentStepIdx;

                return (
                  <div key={step.id} className="flex gap-3 items-start relative group">
                    {/* Visual Line connector for steps */}
                    {idx < activeSteps.length - 1 && (
                      <div 
                        className={`absolute left-[13px] rtl:left-auto rtl:right-[13px] top-6 w-[2px] h-10 transition-colors duration-500 ${
                          isCompleted ? "bg-emerald-500" : "bg-slate-150 dark:bg-slate-800/80"
                        }`}
                      />
                    )}

                    {/* Step Icon Indicator */}
                    <div 
                      className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${
                        isCompleted
                          ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                          : isActive
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-md animate-pulse"
                          : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400"
                      }`}
                    >
                      {isCompleted ? <CheckCircle className="w-3.5 h-3.5" /> : step.icon}
                    </div>

                    {/* Step Content */}
                    <div className="space-y-0.5 text-xs text-left rtl:text-right">
                      <h4 
                        className={`font-bold transition-colors ${
                          isCompleted 
                            ? "text-emerald-600 dark:text-emerald-400" 
                            : isActive 
                            ? "text-indigo-600 dark:text-indigo-400" 
                            : "text-slate-400 dark:text-slate-600"
                        }`}
                      >
                        {t(step.labelAr, step.labelEn)}
                      </h4>
                      <p 
                        className={`text-[10px] leading-relaxed transition-colors ${
                          isActive || isCompleted 
                            ? "text-slate-600 dark:text-slate-450" 
                            : "text-slate-350 dark:text-slate-700"
                        }`}
                      >
                        {t(step.descAr, step.descEn)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Terminal Console Logs */}
          <div className="bg-slate-950 border border-slate-900 rounded-xl p-3 font-mono text-[10px] text-slate-300 h-32 overflow-y-auto flex flex-col justify-between">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-900 text-slate-500 shrink-0">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>SYSTEM OUTPUT LOG</span>
            </div>

            <div className="space-y-1 overflow-y-auto flex-1 py-1 text-emerald-400/95">
              {simLog.length === 0 ? (
                <span className="text-slate-600 block italic">
                  {t("قنوات السجل خاملة. اضغط تشغيل لمراقبة معالجة الأكواد والأنظمة...", "Sandbox log channels idle. Click start workflow to intercept live execution output...")}
                </span>
              ) : (
                simLog.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    <span className="text-slate-500 mr-1 select-none">$&gt;</span>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
