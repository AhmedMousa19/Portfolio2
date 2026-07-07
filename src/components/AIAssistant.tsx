import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, AlertCircle } from "lucide-react";
import { Lang, DatabaseState } from "../types";

interface AIAssistantProps {
  lang: Lang;
  dbState: DatabaseState;
  onLogAction: (type: "chat_message", details?: string) => void;
}

interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

export default function AIAssistant({ lang, dbState, onLogAction }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);

  // Initialize with greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "ai",
          content: t(
            `مرحباً! أنا المساعد الذكي للمهندس أحمد موسى. يسعدني إجابتك عن أي سؤال يخص خبراته في موديولات SAP HCM، أو مهاراته في تطوير الويب وأتمتة العمليات. كيف يمكنني مساعدتك اليوم؟`,
            `Hello! I am Ahmed Mousa's AI Assistant. I'm delighted to answer any questions about his expertise in SAP HCM, frontend web development, or workflow automation. How can I assist you today?`
          ),
        },
      ]);
    }
  }, [lang]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  const getClientSimulatedResponse = (message: string): string => {
    const lowercaseMsg = message.toLowerCase();
    const isArabic = /[\u0600-\u06FF]/.test(message);

    if (isArabic) {
      if (lowercaseMsg.includes("أتمتة") || lowercaseMsg.includes("اتمتة") || lowercaseMsg.includes("تلقائي") || lowercaseMsg.includes("سير العمل") || lowercaseMsg.includes("workflow") || lowercaseMsg.includes("automation")) {
        return "نعم، المهندس أحمد موسى محترف في أتمتة العمليات وسير العمل (Workflow Automation)! لقد قام بابتكار نظام متطور لأتمتة طلبات الإجازات (Leave Management Workflow Automation) باستخدام Google Apps Script و Gmail API و Excel VBA، مما يسمح بإرسال إشعارات فورية بالبريد الإلكتروني وتحديث البيانات تلقائياً وحماية السجلات من التعديل العشوائي.";
      }
      if (lowercaseMsg.includes("مشروع") || lowercaseMsg.includes("مشاريع") || lowercaseMsg.includes("project")) {
        return "أحمد قام بتطوير عدة مشاريع متميزة ورائعة، ومنها:\n\n1. **منصة Mainly Reports**: نظام متكامل لإدارة تقارير الموظفين والمديرين يدعم نظام الموافقات والتعليقات المباشرة مع لوحة إحصائيات بـ React و Firebase.\n2. **أتمتة طلبات الإجازات**: نظام مؤتمت بالكامل بـ Google Apps Script و VBA.\n3. **تطبيق نظام SAP HCM في كمارا**: حيث ساهم بتجهيز واختبار البيانات وتدريب المستخدمين.";
      }
      if (lowercaseMsg.includes("خبرة") || lowercaseMsg.includes("عمل") || lowercaseMsg.includes("ساب") || lowercaseMsg.includes("sap") || lowercaseMsg.includes("experience")) {
        return "أحمد موسى يعمل كاستشاري SAP HCM في الشركة الاقتصادية منذ يوليو 2024. يمتلك خبرة عملية ممتازة في موديولات الرواتب (Payroll)، وإدارة الوقت (Time Management)، والتطوير التنظيمي (OM)، وشؤون الموظفين (PA). بالإضافة لحصوله على تدريب استشاري محترف مكثف لتهيئة وتطبيق النظام وفق متتبعات الشركات.";
      }
      if (lowercaseMsg.includes("مهارات") || lowercaseMsg.includes("برمج") || lowercaseMsg.includes("تقني") || lowercaseMsg.includes("skills")) {
        return "يمتلك أحمد باقة مهارات مميزة تجمع بين الجانب الإداري والتقني:\n- **أنظمة SAP**: تهيئة وتطوير موديولات SAP HCM (PA, OM, TM, Payroll).\n- **تطوير الويب**: إتقان React و JavaScript و HTML5/CSS3 و Tailwind CSS لإنشاء واجهات ذكية وسلسة.\n- **الأتمتة**: أتمتة التقارير بـ Excel VBA وسير العمل بـ Google Apps Script.";
      }
      if (lowercaseMsg.includes("تواصل") || lowercaseMsg.includes("اتصال") || lowercaseMsg.includes("رقم") || lowercaseMsg.includes("ايميل") || lowercaseMsg.includes("contact") || lowercaseMsg.includes("email")) {
        return "يسعد أحمد تواصلكم معه مباشرة! يمكنك استخدام نموذج الاتصال المتواجد بالموقع، أو مراسلته عبر البريد الإلكتروني: **ahmed.mousa4499@gmail.com** أو بالاتصال الهاتفي على الرقم: **+201018564287**.";
      }
      return "أهلاً بك! أنا المساعد الذكي للمهندس أحمد موسى. يسعدني إجابتك عن أي سؤال يخص خبراته المهنية في SAP HCM، أو مهاراته في تطوير الويب الحديث (React)، أو أتمتة العمليات وسير العمل (Workflow Automation). كيف يمكنني مساعدتك اليوم؟";
    } else {
      if (lowercaseMsg.includes("workflow") || lowercaseMsg.includes("automation") || lowercaseMsg.includes("automate")) {
        return "Yes, Ahmed excels at Workflow and Process Automation! He created an automated Leave Management System using Google Apps Script, Gmail API, and Excel VBA. This system fully automates request approvals/rejections, sends real-time email notifications to managers and employees, and protects historical records from manual tampering.";
      }
      if (lowercaseMsg.includes("project") || lowercaseMsg.includes("projects")) {
        return "Ahmed has successfully built and contributed to several outstanding projects:\n\n1. **Mainly Reports Platform** (Live at https://mainly-rep.vercel.app/): A robust report management dashboard for employees and managers featuring real-time comments, request approval workflows, and responsive visual charts.\n2. **Leave Management Workflow**: Fully automated workspace tools using Google Apps Script & VBA.\n3. **Kamara SAP HCM Implementation**: Handled configuration support, QA testing, and delivered user workshops.";
      }
      if (lowercaseMsg.includes("experience") || lowercaseMsg.includes("work") || lowercaseMsg.includes("job") || lowercaseMsg.includes("sap") || lowercaseMsg.includes("hcm")) {
        return "Ahmed has been working as an SAP HCM Consultant at Economic Company since July 2024. He has strong expertise in configuring and supporting Payroll, Time Management (TM), Organizational Management (OM), and Personnel Administration (PA) modules, and is highly capable of bridging HR business requirements with optimal SAP solutions.";
      }
      if (lowercaseMsg.includes("skills") || lowercaseMsg.includes("skill") || lowercaseMsg.includes("code") || lowercaseMsg.includes("tech")) {
        return "Ahmed's core skill set is highly versatile:\n- **SAP HCM**: Custom payroll configurations, time evaluations, and master data management.\n- **Frontend Development**: React.js, JavaScript (ES6+), Tailwind CSS, and HTML5/CSS3.\n- **Automation**: Google Apps Script, Excel VBA, and Gmail API integration.";
      }
      if (lowercaseMsg.includes("contact") || lowercaseMsg.includes("email") || lowercaseMsg.includes("phone") || lowercaseMsg.includes("hire") || lowercaseMsg.includes("reach")) {
        return "You can easily contact Ahmed by filling out the Contact Form on this portfolio, or reach out directly via:\n- **Email**: ahmed.mousa4499@gmail.com\n- **Phone/WhatsApp**: +20 1018564287\n- **GitHub**: https://github.com/AhmedMousa19";
      }
      return "Hello! I am Ahmed Mousa's AI Assistant. I am happy to answer any questions about his background in SAP HCM Consulting, modern web development (React), or workflow automation. How can I help you today?";
    }
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    if (!textToSend) setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsLoading(true);
    onLogAction("chat_message", text.substring(0, 50));

    try {
      const chatHistory = messages.map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: chatHistory,
        }),
      });

      if (!res.ok) throw new Error("API call failed");
      const data = await res.json();
      
      setMessages((prev) => [...prev, { role: "ai", content: data.text }]);
    } catch (error) {
      console.error("Chat error, using local simulation fallback:", error);
      const fallbackReply = getClientSimulatedResponse(text);
      setMessages((prev) => [...prev, { role: "ai", content: fallbackReply }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    t("ما هي خبرات أحمد في SAP؟", "What is Ahmed's SAP experience?"),
    t("حدثني عن مشروع Mainly Reports", "Tell me about Mainly Reports project"),
    t("كيف يمكنني التواصل مع أحمد؟", "How can I contact Ahmed?"),
    t("هل يجيد أتمتة الإجراءات؟", "Does he do workflow automation?"),
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="ai-chat-assistant">
      {/* Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 px-4 py-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r cursor-pointer ${
            dbState.theme.primaryColor === "emerald"
              ? "from-emerald-600 to-teal-500 text-white"
              : dbState.theme.primaryColor === "blue"
              ? "from-blue-600 to-indigo-500 text-white"
              : dbState.theme.primaryColor === "indigo"
              ? "from-indigo-600 to-purple-500 text-white"
              : dbState.theme.primaryColor === "amber"
              ? "from-amber-600 to-orange-500 text-white"
              : "from-rose-600 to-pink-500 text-white"
          }`}
          aria-label="AI Assistant"
        >
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="text-sm font-semibold hidden md:inline-block">
            {t("اسأل مساعد أحمد الذكي", "Ask Ahmed's AI")}
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[400px] h-[520px] bg-white dark:bg-gray-900 rounded-2xl shadow-3xl flex flex-col border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300">
          {/* Header */}
          <div
            className={`px-4 py-4 flex items-center justify-between text-white ${
              dbState.theme.primaryColor === "emerald"
                ? "bg-emerald-700"
                : dbState.theme.primaryColor === "blue"
                ? "bg-blue-700"
                : dbState.theme.primaryColor === "indigo"
                ? "bg-indigo-700"
                : dbState.theme.primaryColor === "amber"
                ? "bg-amber-700"
                : "bg-rose-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1">
                  {t("المساعد الذكي", "Ahmed's AI Agent")}
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                </h3>
                <p className="text-xs text-white/80">{t("متصل حالياً", "Online & Ready")}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-gray-950/40">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 max-w-[85%] ${
                  m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    m.role === "user"
                      ? "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      : dbState.theme.primaryColor === "emerald"
                      ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400"
                      : dbState.theme.primaryColor === "blue"
                      ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400"
                      : "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400"
                  }`}
                >
                  {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div>
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      m.role === "user"
                        ? "bg-gray-900 text-white rounded-tr-none"
                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-700/60 rounded-tl-none"
                    }`}
                    style={{ direction: m.content.match(/[\u0600-\u06FF]/) ? "rtl" : "ltr" }}
                  >
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2.5 max-w-[85%] mr-auto">
                <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 animate-spin">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 rounded-2xl rounded-tl-none text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Questions Suggestions */}
          {messages.length === 1 && !isLoading && (
            <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800/80">
              <p className="text-[10px] text-gray-400 mb-1.5 font-semibold text-center uppercase tracking-wider">
                {t("أسئلة شائعة مقترحة", "Suggested Questions")}
              </p>
              <div className="flex flex-col gap-1">
                {quickQuestions.map((q, qIdx) => (
                  <button
                    key={qIdx}
                    onClick={() => handleSend(q)}
                    className="text-[11px] text-left text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-lg px-2.5 py-1.5 transition-all hover:border-emerald-500 cursor-pointer"
                    style={{ direction: q.match(/[\u0600-\u06FF]/) ? "rtl" : "ltr" }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input */}
          <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("اكتب سؤالك هنا...", "Type your question here...")}
                className="flex-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-800 dark:text-gray-200"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`p-2.5 rounded-xl text-white transition-all duration-200 cursor-pointer disabled:opacity-50 ${
                  dbState.theme.primaryColor === "emerald"
                    ? "bg-emerald-600 hover:bg-emerald-500"
                    : dbState.theme.primaryColor === "blue"
                    ? "bg-blue-600 hover:bg-blue-500"
                    : dbState.theme.primaryColor === "indigo"
                    ? "bg-indigo-600 hover:bg-indigo-500"
                    : dbState.theme.primaryColor === "amber"
                    ? "bg-amber-600 hover:bg-amber-500"
                    : "bg-rose-600 hover:bg-rose-500"
                }`}
              >
                <Send className="w-4 h-4 transform rotate-180" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
