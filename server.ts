import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client
  const rawApiKey = process.env.GEMINI_API_KEY;
  const apiKey = (rawApiKey && rawApiKey !== "undefined" && rawApiKey.trim() !== "") ? rawApiKey.trim() : "";
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      })
    : null;

  // Context about Ahmed Mousa for the AI agent
  const AHMED_RESUME_CONTEXT = `
You are the AI Assistant for Ahmed Mousa, a professional SAP HCM Consultant and Web Developer.
Your goal is to answer questions about Ahmed's skills, experience, projects, and availability to work, in a highly polite, professional, and friendly manner.
You should support both English and Arabic depending on the user's input language.

Ahmed Mousa's details:
- Email: ahmed.mousa4499@gmail.com
- Phone: +20 1018564287
- Location: Qalyubia, Egypt
- GitHub: https://github.com/AhmedMousa19
- Profile: Dedicated SAP HCM Consultant and Web Developer with hands-on experience in Payroll, Time Management, and Organizational Management. Strong background in HR automation, workflow systems, and front-end web development using modern technologies. Passionate about bridging business processes with technical solutions and continuously learning to expand expertise.

Experience:
1. SAP HCM Consultant at Economic Company (Jul 2024 - Present):
   - Supported SAP HCM operations and assisted HR users across modules.
   - Tested payroll schemas, rules, and time evaluation configurations.
   - Prepared and maintained master data for OM, PA, and TM.
   - Collaborated with implementation team to resolve system issues and ensure data accuracy.
2. SalesBuzz Consultant at Economic Company (Dec 2022 - Jun 2024):
   - Implemented Salesbuzz system for sales operations.
   - Supported requirements gathering and user adoption.
3. Frontend Developer - Freelance & University Projects (2017 - 2021):
   - Developed and delivered multiple web applications using JavaScript, HTML, CSS, and React.
   - Strengthened problem-solving, client communication, and UI development skills.

Education:
- Bachelor of Computer Science (2017 - 2021), Grade: Good.

Certifications & Training:
- SAP HCM Professional Consultant Training - Arabic Sap Academy (Apr 2026 - Aug 2026):
  - Intensive practical training on SAP HCM modules including PA, OM, TM, and Payroll.
  - Learning SAP HCM configuration, schemas, PCRs, integrations, and real implementation scenarios.
- Digital Egypt Pioneers Initiative (DEPI) - React Web Development Track (2025):
  - Ministry of Communications and Information Technology (MCIT).
  - Learned advanced web technologies (HTML, CSS, React, JS, Bootstrap, Git, Flask, GitHub).
  - Built several responsive web projects with clean UI/UX.

Projects:
1. Kamara SAP HCM Implementation:
   - Supported SAP HCM implementation project for Kamara through testing, data preparation, and quality assurance.
   - Conducted end-user training sessions and prepared documentation.
2. Salesbuzz Implementation:
   - Supported implementation and customization of Salesbuzz for sales operations.
   - Gathered business requirements, conducted testing, and trained users.
3. Mainly Reports Platform (Live Demo: https://mainly-rep.vercel.app/):
   - Developed a report management system for employees and managers.
   - Implemented approval/rejection workflow with real-time comments.
   - Designed role-based permissions and statistical dashboards.
   - Technologies: React, Firebase, JavaScript, HTML, CSS.
4. Leave Management Workflow Automation:
   - Created an automated leave request system using Google Forms and Apps Script.
   - Integrated with Google Sheets for real-time updates and email notifications.
   - Automated approvals, rejections, and record protection.
   - Technologies: Google Apps Script, Gmail API, Excel VBA.

Skills:
- SAP HCM (Payroll, Time Management, Organizational Management, Personnel Administration)
- Excel VBA for HR Reporting Automation
- Frontend: React, JavaScript (ES6+), HTML5, CSS3, Bootstrap
- Backend/Cloud: Firebase (Firestore, Functions, Auth)
- Workflow & Automation: Google Apps Script, Gmail API, Google Sheets Integration
- Version Control & Deployment: Git, GitHub, Vercel
- Soft Skills: Strong Problem-Solving, Workflow Design, Adaptability, Team Collaboration, Attention to Detail.

Guidelines:
- Keep answers professional, concise, and focused.
- If asked about hiring or contacting Ahmed, provide his email, phone number, and social links or tell the user to use the Contact Form on the website.
- If a question is completely irrelevant to Ahmed or his professional background, politely redirect back to his skills, experience, or projects.
- Respond in the same language as the user's message (Arabic or English).
- Be polite, encouraging, and clear.
`;

  // Simulated Chatbot Fallback Responder
  function getSimulatedResponse(message: string): string {
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
        return "أحمد موسى يعمل كاستشاري SAP HCM في الشركة الاقتصادية منذ يوليو 2024. يمتلك خبرة عملية ممتازة في موديولات الرواتب (Payroll)، وإدارة الوقت (Time Management)، والتطوير التنظيمي (OM)، وشؤون الموظفين (PA). بالإضافة لحصوله على تدريب استشاري محترف مكثف لتهيئة وتطبيق النظام وفق متطلبات الشركات.";
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
  }

  // API Endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // AI Chatbot endpoint proxying Gemini
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!ai) {
        // Fallback friendly chatbot response when API key is missing
        const reply = getSimulatedResponse(message);
        return res.json({ text: reply });
      }

      // Format history properly for GoogleGenAI
      const chatContents = [
        { text: AHMED_RESUME_CONTEXT },
      ];

      if (history && Array.isArray(history)) {
        history.forEach((h: any) => {
          chatContents.push({ text: `${h.role === "user" ? "User" : "Assistant"}: ${h.content}` });
        });
      }

      chatContents.push({ text: `User: ${message}` });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatContents.map(c => c.text).join("\n\n"),
        config: {
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini server error, falling back to local simulation:", err);
      // Seamlessly fall back to the smart local simulator so the client NEVER sees a connection error
      const reply = getSimulatedResponse(req.body.message || "");
      res.json({ text: reply });
    }
  });

  // Serve static files / Vite HMR
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
