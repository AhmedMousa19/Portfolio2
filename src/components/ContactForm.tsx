import React, { useState } from "react";
import { Send, CheckCircle, Mail, Phone, MapPin, Sparkles, Copy, AlertCircle, RefreshCw } from "lucide-react";
import { Lang, Message, DatabaseState } from "../types";

interface ContactFormProps {
  lang: Lang;
  dbState: DatabaseState;
  onUpdateState: (newState: DatabaseState) => void;
  onSpawnNotification: (text: string, type: "success" | "info" | "error") => void;
  onLogAction: (type: "contact_submit", details?: string) => void;
}

export default function ContactForm({ lang, dbState, onUpdateState, onSpawnNotification, onLogAction }: ContactFormProps) {
  const [formData, setFormData] = useState({
    senderName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = (ar: string, en: string) => (lang === "ar" ? ar : en);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onSpawnNotification(t(`تم نسخ ${label} إلى الحافظة!`, `${label} copied to clipboard!`), "success");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.senderName.trim() || !formData.email.trim() || !formData.message.trim()) {
      onSpawnNotification(t("يرجى ملء كافة الحقول الإلزامية.", "Please fill out all required fields."), "error");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create new message object
      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        senderName: formData.senderName,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
        date: new Date().toISOString(),
        isRead: false,
      };

      // Push into database
      const updated = { ...dbState };
      updated.messages.unshift(newMsg);
      onUpdateState(updated);

      // Log analytics
      onLogAction("contact_submit", formData.senderName);

      // Trigger instant float notification
      onSpawnNotification(
        t(`وصلتك رسالة جديدة من ${formData.senderName}!`, `New client inquiry from ${formData.senderName} received!`),
        "success"
      );

      // Clear Form
      setFormData({ senderName: "", email: "", phone: "", message: "" });
    } catch (err) {
      onSpawnNotification(t("عذراً، فشل في إرسال الرسالة.", "Failed to submit inquiry. please retry."), "error");
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8" id="contact-hub">
      {/* Visual Contact Info Card */}
      <div className="lg:col-span-2 space-y-6">
        <div className={`p-6 bg-gradient-to-br ${
          dbState.theme.primaryColor === 'emerald' ? 'from-emerald-950 to-teal-900' :
          dbState.theme.primaryColor === 'blue' ? 'from-blue-950 to-indigo-900' :
          dbState.theme.primaryColor === 'indigo' ? 'from-indigo-950 to-purple-900' :
          dbState.theme.primaryColor === 'amber' ? 'from-amber-950 to-orange-900' :
          'from-rose-950 to-pink-900'
        } text-white space-y-6 shadow-xl ${getBorderRadiusClass()}`}>
          <div>
            <h3 className="text-lg font-extrabold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              {t("دعنا نبني مستقبلك الرقمي معاً", "Let's build together")}
            </h3>
            <p className="text-xs text-white/80 mt-1.5 leading-relaxed">
              {t("سواء كنت تبحث عن استشارات لتعديل كشوف الرواتب، أو أتمتة الإجازات، أو تطوير تطبيقات ويب سريعة جداً بـ React، أنا هنا للمساعدة.", "Whether you're looking for professional SAP HCM schema configurations, workflow automations, or super-fast React dashboards, feel free to drop a line.")}
            </p>
          </div>

          <div className="space-y-4">
            {/* Email card */}
            <div className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg text-emerald-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-white/50">{t("البريد الإلكتروني المباشر", "Direct Email Address")}</p>
                  <p className="text-xs font-mono font-bold">{dbState.profile.email}</p>
                </div>
              </div>
              <button
                onClick={() => handleCopyText(dbState.profile.email, t("البريد الإلكتروني", "Email"))}
                className="p-1 hover:bg-white/10 rounded text-white/70 hover:text-white transition-colors cursor-pointer"
                title={t("نسخ البريد الإلكتروني", "Copy Email")}
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Phone Card */}
            <div className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg text-blue-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-white/50">{t("رقم الجوال والواتساب", "Mobile / WhatsApp")}</p>
                  <p className="text-xs font-mono font-bold">{dbState.profile.phone}</p>
                </div>
              </div>
              <button
                onClick={() => handleCopyText(dbState.profile.phone, t("رقم الهاتف", "Phone number"))}
                className="p-1 hover:bg-white/10 rounded text-white/70 hover:text-white transition-colors cursor-pointer"
                title={t("نسخ رقم الهاتف", "Copy Phone Number")}
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Location Card */}
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <div className="p-2 bg-white/10 rounded-lg text-amber-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-white/50">{t("مكان السكن والعمل الحاضر", "Current Work Location")}</p>
                <p className="text-xs font-bold">{t(dbState.profile.locationAr, dbState.profile.locationEn)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actual Form Sheet */}
      <div className={`lg:col-span-3 p-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 shadow-md ${getBorderRadiusClass()}`}>
        <h3 className="text-sm font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          {t("أرسل رسالة فورية إلى أحمد", "Send an Instant Inquire Message")}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">
                {t("الاسم بالكامل (مطلوب)", "Your Name (Required)")}
              </label>
              <input
                type="text"
                required
                value={formData.senderName}
                onChange={(e) => setFormData((prev) => ({ ...prev, senderName: e.target.value }))}
                placeholder={t("مثال: أحمد موسى", "e.g. Ahmed Mousa")}
                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-750 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">
                {t("البريد الإلكتروني (مطلوب)", "Email Address (Required)")}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="ahmed@example.com"
                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-750 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-800 dark:text-gray-200 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">
              {t("رقم الهاتف (اختياري)", "Mobile Phone Number (Optional)")}
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="+20 123 456 789"
              className="w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-750 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-800 dark:text-gray-200 font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">
              {t("نص الرسالة والاستفسار (مطلوب)", "Your Inquiry Message (Required)")}
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              placeholder={t("اكتب تفاصيل مشروعك أو سؤالك بوضوح هنا...", "Tell me about your pipeline projects or questions here...")}
              className="w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-750 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-800 dark:text-gray-200 leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 text-white text-xs font-extrabold tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
              dbState.theme.primaryColor === "emerald"
                ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/10"
                : dbState.theme.primaryColor === "blue"
                ? "bg-blue-600 hover:bg-blue-500 shadow-blue-600/10"
                : dbState.theme.primaryColor === "indigo"
                ? "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/10"
                : dbState.theme.primaryColor === "amber"
                ? "bg-amber-600 hover:bg-amber-500 shadow-amber-600/10"
                : "bg-rose-600 hover:bg-rose-500 shadow-rose-600/10"
            } ${getBorderRadiusClass()}`}
          >
            {isSubmitting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4 transform rotate-180" />
                <span>{t("إرسال الرسالة فورياً", "Submit Message Now")}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
