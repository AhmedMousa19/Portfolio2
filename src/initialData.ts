import { DatabaseState } from "./types";

export const initialDatabase: DatabaseState = {
  profile: {
    nameAr: "أحمد موسى",
    nameEn: "Ahmed Mousa",
    titleAr: "استشاري SAP HCM | مطور React",
    titleEn: "SAP HCM Consultant | React Developer",
    email: "ahmed.mousa4499@gmail.com",
    phone: "+20 1018564287",
    locationAr: "القليوبية، مصر",
    locationEn: "Qalyubia, Egypt",
    github: "https://github.com/AhmedMousa19",
    linkedin: "https://www.linkedin.com/in/ahmed-mousa-hcm",
    bioAr: "استشاري SAP HCM ومطور ويب يتمتع بخبرة عملية قوية في الرواتب، وإدارة الوقت، والهياكل التنظيمية. لديه خلفية متميزة في أتمتة عمليات الموارد البشرية، وأنظمة سير العمل، وتطوير واجهات المستخدم باستخدام أحدث التقنيات. شغوف بالربط بين بيئات الأعمال والحلول التقنية المبتكرة والتعلم المستمر لتوسيع خبراته.",
    bioEn: "Dedicated SAP HCM Consultant and Web Developer with hands-on experience in Payroll, Time Management, and Organizational Management. Strong background in HR automation, workflow systems, and front-end web development using modern technologies. Passionate about bridging business processes with technical solutions and continuously learning to expand expertise."
  },
  projects: [
    {
      id: "proj-1",
      titleAr: "مشروع تطبيق نظام SAP HCM في كمارا",
      titleEn: "Kamara SAP HCM Implementation Project",
      descAr: "المشاركة في تطبيق وتخصيص إعدادات نظام (Configuration) إدارة الموارد البشرية SAP HCM لشركة Kamara، إلى جانب إجراء الاختبارات الشاملة، وإعداد وتنظيف البيانات، وضمان جودة النظام، وتقديم التدريب وصياغة الوثائق التقنية.",
      descEn: "Contributed directly to the system configuration, customization, and implementation of the SAP HCM system for Kamara, alongside comprehensive system testing, data cleansing, quality assurance, end-user training, and technical documentation.",
      bulletsAr: [
        "تنفيذ وتخصيص إعدادات النظام (Configuration) الخاصة بوحدات إدارة الوقت وشؤون الموظفين وفق المتطلبات.",
        "إعداد وتحليل البيانات الأساسية للموظفين لضمان التوافق مع معايير SAP.",
        "إجراء اختبارات دقيقة لسيناريوهات الرواتب وحسابات الوقت والتحقق من صحة النتائج وتكاملها.",
        "تنسيق وتقديم دورات تدريبية مكثفة للمستخدمين لتبسيط اعتماد النظام الجديد وسهولة الانتقال."
      ],
      bulletsEn: [
        "Performed and customized system configuration for Time Management and Personnel Administration modules according to business rules.",
        "Cleaned and prepared employee master data to ensure perfect compatibility with SAP standards.",
        "Executed rigorous testing for payroll scenarios, time evaluations, and verified calculations accuracy and system integration.",
        "Coordinated and delivered intensive training workshops for end-users to ease platform adoption."
      ],
      tags: ["SAP HCM", "Configuration", "OM", "PA", "TM", "QA Testing", "User Training"],
      type: "sap",
      problemAr: "كانت شركة كمارا بحاجة إلى نقل عمليات الموارد البشرية والرواتب من أنظمة قديمة مبعثرة، وتأسيس قاعدة بيانات موحدة ومعالجة دقيقة وآمنة لإدارة الوقت والحضور وشؤون الموظفين.",
      problemEn: "Kamara needed to migrate their legacy HR operations and establish an enterprise-grade Personnel Administration and Time Management system with high availability, accurate payroll outputs, and robust security.",
      solutionAr: "تخصيص وإعداد وحدات SAP HCM الأساسية وتطبيق منطق عمل متكامل لحساب الحضور والغياب وربطه بـ Payroll بسلاسة لتجنب أي فروقات مالية أو تأخير.",
      solutionEn: "Configured and implemented the Core SAP HCM modules (OM, PA, TM) to map administrative guidelines, structure organizational tiers, set automated time evaluation calculations, and integrate payroll.",
      roleAr: "المساهمة في التخصيص الفني للنظام، وتجهيز وتطهير بيانات الموظفين (Data Cleansing)، وتنفيذ سيناريوهات الاختبار لتقييم الوقت والرواتب (Payroll & Time Evaluation Testing)، وتدريب مستخدمي النظام الأساسيين وتجهيز ملفات الشرح والوثائق الفنية.",
      roleEn: "Led operational configuration, cleansed and mass-loaded legacy master data, developed test cases for Payroll, coordinated user acceptance testing (UAT), and conducted technical onboarding workshops for end-users.",
      techAr: "SAP ERP Core, SAP GUI, PCRs & Schemas, LSMW (Data Migration), Advanced Excel Automation.",
      techEn: "SAP ERP Core, SAP GUI, PCRs & Schemas, LSMW (Data Migration), Advanced Excel Automation.",
      resultsAr: "ترحيل البيانات بنسبة دقة 100%، وتقليص وقت معالجة وحساب الرواتب بنسبة 35% عبر الأتمتة الكاملة، وتأهيل وتدريب أكثر من 20 مستخدماً رئيسياً لإدارة النظام بكفاءة تامة.",
      resultsEn: "Achieved a 100% database accuracy rate during data migration, decreased payroll preparation time by 35% through automation, and certified over 20+ HR personnel through end-user training.",
      screenshots: ["SAP_OM_Structure", "SAP_Time_Evaluation", "SAP_Payroll_Testing_Log"]
    },
    {
      id: "proj-2",
      titleAr: "تطبيق وتخصيص نظام Salesbuzz",
      titleEn: "Salesbuzz Implementation Project",
      descAr: "تقديم الدعم التقني والتخصيص لنظام Salesbuzz المخصص لإدارة عمليات المبيعات والتوزيع، والعمل على جمع متطلبات الأعمال، وإجراء الفحوصات الفنية وتدريب المستخدمين لضمان أفضل كفاءة تشغيلية.",
      descEn: "Supported implementation and customization of Salesbuzz for sales and distribution operations. Gathered business requirements, conducted technical testing, and trained sales teams to maximize operational efficiency.",
      bulletsAr: [
        "تخصيص لوحات التحكم وسير العمل لتتناسب مع أهداف مبيعات الشركة الاقتصادية.",
        "ترجمة الاحتياجات التشغيلية لفرق المبيعات إلى مواصفات برمجية دقيقة.",
        "متابعة الأداء الميداني وحل مشكلات مزامنة البيانات والاتصال بالخوادم."
      ],
      bulletsEn: [
        "Customized dashboard workflows to match the target sales KPIs of the economic company.",
        "Translated operational needs of field sales teams into precise system configurations.",
        "Monitored live field performance and resolved data synchronization issues."
      ],
      tags: ["Salesbuzz", "Sales Operations", "Requirements Gathering", "Testing"],
      type: "sap",
      problemAr: "واجه مندوبو المبيعات الميدانية صعوبات في معرفة الأرصدة المتوفرة لحظياً في المخازن وتتبع خطوط السير اليومية، مما تسبب في عدم دقة الفواتير وتأخر تسليم طلبات العملاء.",
      problemEn: "Field sales agents lacked real-time visibility into inventory levels, routes, and manager approvals, resulting in slower transaction processing, manual order discrepancies, and delayed invoice syncs.",
      solutionAr: "تفعيل وتكامل تطبيق Salesbuzz لإتاحة التحكم اللحظي وحجز الأرصدة التلقائي وتحديد أفضل مسارات المندوبين مع مزامنة لحظية مع الخوادم الرئيسية.",
      solutionEn: "Implemented SalesBuzz Handheld Sales Automation across the field sales force to enable automatic inventory reservation, routing optimization, and automated end-of-day reconciliation.",
      roleAr: "تولي مهمة جمع وتحليل المتطلبات من إدارة المبيعات، وضبط مؤشرات الأداء، واختبار كفاءة المزامنة والربط الفني، وحل المشكلات الفنية وتدريب أكثر من 50 مندوباً ومشرفاً ميدانياً.",
      roleEn: "Gathered functional requirements from regional directors, configured localized KPI dashboards, monitored live synchronization gateways, handled system exceptions, and ran field coaching bootcamps.",
      techAr: "SalesBuzz Handheld Engine, SQL Server Database, Admin Control Panel, Sync Web Services.",
      techEn: "SalesBuzz Handheld Engine, SQL Server Database, Admin Control Panel, Sync Web Services.",
      resultsAr: "تحسين خطوط السير اليومية لجميع المندوبين، ورفع سرعة المزامنة والاعتماد اللحظي للفواتير بنسبة 80%، وتحقيق دقة تتبع المخزون بنسبة 99.8%.",
      resultsEn: "Delivered an optimized route structure for 100+ daily field trips, cut invoicing sync times down to under 5 seconds, and elevated field transaction accuracy to 99.8%.",
      screenshots: ["Salesbuzz_Mobile_UX", "Salesbuzz_Dashboard", "Salesbuzz_Sync_Log"]
    },
    {
      id: "proj-3",
      titleAr: "منصة Mainly Reports للتقارير والاعتمادات",
      titleEn: "Mainly Reports Platform - Live Dashboard",
      descAr: "منصة ويب متكاملة لإدارة التقارير والاعتمادات مخصصة للموظفين والمديرين، تتيح دورة عمل تفاعلية للموافقة والرفض مع إمكانية إضافة تعليقات في الوقت الفعلي ولوحات إحصائية دقيقة.",
      descEn: "A comprehensive report management system and approval portal designed for employees and managers. Features interactive approval/rejection workflows with real-time feedback, comments, and analytical charts.",
      bulletsAr: [
        "بناء واجهة مستخدم متكاملة وسريعة الاستجابة باستخدام React وجدولة البيانات.",
        "تكامل قاعدة البيانات وإدارتها بالكامل عبر Firebase Firestore و Firebase Auth للأمان.",
        "تصميم لوحة إدارة وصلاحيات مرنة بناءً على دور المستخدم (موظف / مدير).",
        "توفير لوحات إحصائية متقدمة لعرض معدلات التقارير المقبولة والمعلقة."
      ],
      bulletsEn: [
        "Built a responsive and fast-loading web interface using React and modern CSS framework.",
        "Integrated secure authentication and cloud database state using Firebase Firestore & Auth.",
        "Designed flexible role-based access control (RBAC) separating employees from managers.",
        "Created comprehensive statistical dashboards summarizing approved and pending report metrics."
      ],
      liveUrl: "https://mainly-rep.vercel.app/",
      tags: ["React", "Firebase", "Firestore", "Tailwind CSS", "JavaScript"],
      type: "web",
      problemAr: "كانت عملية إرسال ومراجعة التقارير الدورية بين الموظفين والمديرين تجري في قنوات غير منظمة وتسبب بطئاً شديداً في الموافقات وصعوبة في متابعة نسب ومعدلات الإنجاز.",
      problemEn: "Standard communication and report approvals between employees and regional management were fragmented over scattered channels, causing auditing friction, untracked histories, and severe notification delays.",
      solutionAr: "تطوير منصة ويب مركزية تتيح رفع التقارير والمراجعة التفاعلية الفورية، وتدعم صلاحيات دقيقة مقسمة حسب الأدوار وتحديث لوحة الإحصائيات لحظياً ورسوم بيانية تفاعلية.",
      solutionEn: "Formulated Mainly Reports, a centralized single-page platform featuring granular role-based privileges, direct feedback threads, interactive chart engines, and automated status transition chains.",
      roleAr: "بناء وتطوير واجهات المستخدم التفاعلية بالكامل باستخدام React وTailwind CSS، وتصميم قاعدة البيانات السحابية وقواعد الأمان والصلاحيات المعقدة على منصة Firebase.",
      roleEn: "Conceived, coded, and deployed the complete full-stack web client, implemented security rule definitions on Firebase Firestore, set up reliable user sessions, and styled the UI for fluid mobile responsiveness.",
      techAr: "React.js, Tailwind CSS, Firebase Auth & Firestore, Recharts Engine, Vite Bundler.",
      techEn: "React.js, Tailwind CSS, Firebase Auth & Firestore, Recharts Engine, Vite Bundler.",
      resultsAr: "تحقيق مزامنة لحظية سريعة وموثوقة (أقل من 150 ملي ثانية) لجميع العمليات والاعتمادات، مما جعل معدل إرسال وقبول التقارير أسرع بـ 3 أضعاف وبشكل منظم بالكامل.",
      resultsEn: "Created a live platform handling reports across departments with instantaneous state synchronization and under 150ms UI updates, ensuring highly reliable daily report operations.",
      screenshots: ["mainly_reports_dashboard", "mainly_reports_details", "mainly_reports_charts"]
    },
    {
      id: "proj-4",
      titleAr: "أتمتة سير عمل طلبات الإجازات والغياب",
      titleEn: "Leave Management Workflow Automation",
      descAr: "نظام ذكي مؤتمت لتقديم ومعالجة طلبات الإجازات مصمم عبر نماذج Google وقاعدة بيانات Google Sheets مع إرسال إشعارات فورية بالبريد الإلكتروني للقرارات التلقائية.",
      descEn: "An automated leave request application built using Google Forms and Google Apps Script. Features database storage, real-time Google Sheets updates, automatic calculation of balances, and instant email alerts.",
      bulletsAr: [
        "كتابة سكربتات مخصصة عبر Google Apps Script لربط النماذج بملفات الإكسل تلقائياً.",
        "أتمتة عملية اتخاذ القرار (موافقة/رفض) وإرسال إشعارات بريد إلكتروني مخصصة عبر Gmail API.",
        "حماية السجلات التاريخية من التعديل العبثي عبر حماية خلايا البيانات برمجياً.",
        "تكامل التقارير وتحليلها باستخدام أكواد Excel VBA البرمجية المتقدمة."
      ],
      bulletsEn: [
        "Wrote robust Google Apps Script code to seamlessly link and pipe form inputs into Sheets database.",
        "Automated decision workflow notifications with responsive template emails via Gmail API.",
        "Created database write-protection mechanisms ensuring data integrity across historical records.",
        "Integrated backend reporting and automated analytical exports using custom Excel VBA."
      ],
      tags: ["Google Apps Script", "Gmail API", "Google Sheets", "VBA", "Automation"],
      type: "automation",
      problemAr: "كان تقديم ومتابعة طلبات الإجازات والغياب يجري بشكل ورقي وبطئ، مما يسبب تأخر الموافقات وأخطاء متراكمة في تتبع الأرصدة السنوية للموظفين وصعوبة التدقيق المباشر.",
      problemEn: "Vacation and excuse requests were hand-written, causing delays in approvals, inaccurate leave balance logs, and lack of real-time employee-manager notification flows.",
      solutionAr: "أتمتة الدورة المستندية للطلبات بالكامل برمجياً بدون تكاليف خوادم عبر ربط نماذج جوجل بقواعد البيانات، وبرمجة نظام الموافقات التلقائي وإرسال الإيميلات الفورية للموظف والمدير.",
      solutionEn: "Developed a serverless automation pipeline utilizing Google Forms as endpoints, translating submissions through Apps Script, validating and logging them into protected master sheets, and dispatching Gmail notification loops.",
      roleAr: "بناء وتطوير كافة الأكواد البرمجية لـ Google Apps Script، وربط وتخصيص قوالب البريد الإلكتروني الذكية، وتطوير خوارزميات الحماية، وكتابة أكواد Excel VBA للتكامل والمطابقة اليومية والتقارير المتقدمة.",
      roleEn: "Developed the automation scripts, set up rule engines, utilized the Gmail API to generate beautiful confirmation messages, designed spreadsheet database security flags, and integrated complex analytical macros via Excel VBA.",
      techAr: "Google Apps Script, Excel VBA, Gmail API Service, Google Sheets, Security Lock Triggers.",
      techEn: "Google Apps Script, Excel VBA, Gmail API Service, Google Sheets, Security Lock Triggers.",
      resultsAr: "الاستغناء الكامل عن الأوراق، وتسريع زمن اعتماد ومعالجة الطلبات بنسبة 85%، وتحديث فوري ودقيق لأرصدة الموظفين، وضمان حماية تامة للسجلات التاريخية من أي عبث.",
      resultsEn: "Eliminated paper-based tracking entirely, sped up approval cycles by over 80%, automated balance recalculations instantly, and created an audit-proof automated history.",
      screenshots: ["Leave_Workflow_Form", "Leave_Gmail_Notification", "VBA_Macro_Panel"]
    }
  ],
  experiences: [
    {
      id: "exp-1",
      roleAr: "استشاري SAP HCM",
      roleEn: "SAP HCM Consultant",
      companyAr: "الشركة الاقتصادية",
      companyEn: "Economic Company",
      periodAr: "يوليو 2024 - الحالي",
      periodEn: "Jul 2024 - Present",
      bulletsAr: [
        "دعم عمليات SAP HCM التشغيلية اليومية وتقديم المساعدة والمشورة الفنية لمستخدمي الموارد البشرية عبر مختلف الأقسام والموديولات.",
        "مراجعة وفحص جداول وهياكل كشوف الرواتب وقواعدها (Schemas & Rules) وتكوينات تقييم الوقت لتحديد المشاكل وإصلاحها برمجياً.",
        "تجهيز وتحديث البيانات الأساسية (Master Data) الخاصة بالهياكل التنظيمية (OM)، وإدارة شؤون الأفراد (PA)، وإدارة الوقت (TM).",
        "التعاون المستمر مع فرق تنفيذ الأنظمة لحل المشكلات المعقدة وضمان دقة وتكامل البيانات بنسبة 100%."
      ],
      bulletsEn: [
        "Support daily SAP HCM business operations and provide technical support to HR power users across various system modules.",
        "Test and debug payroll calculation schemas, rules (PCRs), and time evaluation configurations to identify bottlenecks and structural issues.",
        "Prepare, clean, and maintain comprehensive master data for Organizational Management (OM), Personnel Administration (PA), and Time Management (TM).",
        "Collaborate closely with implementation partners to resolve critical system bugs and guarantee 100% data integrity and consistency."
      ]
    },
    {
      id: "exp-2",
      roleAr: "استشاري نظام SalesBuzz",
      roleEn: "SalesBuzz Consultant",
      companyAr: "الشركة الاقتصادية",
      companyEn: "Economic Company",
      periodAr: "ديسمبر 2022 - يونيو 2024",
      periodEn: "Dec 2022 - Jun 2024",
      bulletsAr: [
        "تطبيق وتفعيل نظام Salesbuzz لتطوير وإدارة عمليات المبيعات، والبيع الميداني، والتحكم الفوري في المخازن والأساطيل.",
        "العمل على جمع المتطلبات الفنية من مديري المبيعات وتحليل فجوات الأداء لتعديل النظام وفق الأهداف البيعية.",
        "تقديم برامج تدريبية وتسهيل تبني فرق المبيعات والمندوبين للتطبيقات الميدانية بنجاح كبير."
      ],
      bulletsEn: [
        "Deployed and configured Salesbuzz platform to streamline enterprise-wide sales, field distribution, and inventory tracking.",
        "Collaborated with sales directors to gather technical requirements and perform gap analyses to optimize application workflows.",
        "Delivered structured technical training sessions to secure high user adoption and field workforce engagement."
      ]
    },
    {
      id: "exp-3",
      roleAr: "مطور واجهات أمامية مستقل",
      roleEn: "Frontend Developer",
      companyAr: "مشاريع حرة وجامعية",
      companyEn: "Freelance & University Projects",
      periodAr: "2017 - 2021",
      periodEn: "2017 - 2021",
      bulletsAr: [
        "تصميم وتطوير العديد من تطبيقات ومواقع الويب التفاعلية لعملاء محليين مستخدماً React و JavaScript ونظام التنسيق CSS/HTML.",
        "تعزيز مهارات حل المشكلات الفنية، وبناء واجهات مستخدم مريحة للعين، وضمان تجربة استخدام سلسة ومتوافقة مع شاشات الهواتف.",
        "التعامل الفعال مع العملاء لجمع متطلباتهم الفنية ومتابعة تسليم المشاريع في المواعيد المحددة."
      ],
      bulletsEn: [
        "Designed and developed multiple interactive client-facing web applications using React, JavaScript, CSS3, and HTML5.",
        "Focused on problem-solving, crafting intuitive UI components, and delivering mobile-responsive user experiences.",
        "Communicated with clients directly to manage project lifecycles, gather functional requirements, and ensure timely milestones completion."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degreeAr: "بكالوريوس علوم الحاسب الآلي",
      degreeEn: "Bachelor of Computer Science",
      periodAr: "2017 - 2021",
      periodEn: "2017 - 2021",
      gradeAr: "التقدير العام: جيد",
      gradeEn: "Cumulative Grade: Good"
    }
  ],
  trainings: [
    {
      id: "train-1",
      titleAr: "تدريب مستشار SAP HCM المحترف",
      titleEn: "SAP HCM Professional Consultant Training",
      providerAr: "أكاديمية ساب العربية",
      providerEn: "Arabic Sap Academy",
      periodAr: "أبريل 2026 - أغسطس 2026",
      periodEn: "Apr 2026 - Aug 2026",
      bulletsAr: [
        "تدريب عملي مكثف على موديولات SAP HCM الأساسية بما في ذلك إدارة شؤون الموظفين (PA)، والهياكل التنظيمية (OM)، وإدارة الوقت (TM)، وحسابات الأجور (Payroll).",
        "دراسة تفصيلية لكيفية تكوين النظام، وتخصيص الجداول (Schemas)، وكتابة قواعد الرواتب المخصصة (PCRs)، ومكاملة البيانات في بيئات عمل حقيقية.",
        "حل دراسات حالة عملية وتمارين تطبيقية تحاكي متطلبات إدارات الموارد البشرية في كبرى الشركات."
      ],
      bulletsEn: [
        "Intensive, hands-on training on core SAP HCM modules including Personnel Administration (PA), Organizational Management (OM), Time Management (TM), and Payroll.",
        "Deep exploration of system configuration, customization of calculation schemas, writing Personnel Calculation Rules (PCRs), and actual integration patterns.",
        "Solved real-world business cases and simulation exercises directly aligning with enterprise HR processes."
      ]
    },
    {
      id: "train-2",
      titleAr: "مبادرة رواد مصر الرقمية (DEPI) - مسار تطوير الويب بـ React",
      titleEn: "Digital Egypt Pioneers Initiative (DEPI) - React Developer Track",
      providerAr: "وزارة الاتصالات وتكنولوجيا المعلومات المصرية",
      providerEn: "Ministry of Communications and Information Technology (MCIT)",
      periodAr: "2025",
      periodEn: "2025",
      bulletsAr: [
        "دراسة معمقة لتقنيات تطوير الويب الحديثة بما فيها HTML5, CSS3, ES6+ JavaScript, React, Bootstrap, Git, Flask, و GitHub.",
        "بناء مشاريع متعددة متجاوبة بالكامل تركز على جودة الواجهات وتجربة المستخدم الاستثنائية.",
        "التعاون البرمجي في مشاريع مشتركة متبعين أفضل الممارسات البرمجية ومراجعة الأكواد."
      ],
      bulletsEn: [
        "In-depth curriculum in modern web technologies including HTML5, CSS3, ES6+ JavaScript, React, Bootstrap, Git, Flask, and GitHub.",
        "Developed several responsive and high-fidelity web projects emphasizing solid UI/UX principles and clean interfaces.",
        "Collaborated on group repositories practicing agile software development, code reviews, and version control workflows."
      ]
    }
  ],
  skills: [
    { id: "sk-1", category: "sap", nameAr: "حساب كشوف الرواتب (Payroll)", nameEn: "SAP HCM Payroll" },
    { id: "sk-2", category: "sap", nameAr: "إدارة الوقت والتقييم (TM)", nameEn: "Time Management (TM)" },
    { id: "sk-3", category: "sap", nameAr: "إدارة الهيكل التنظيمي (OM)", nameEn: "Organizational Management (OM)" },
    { id: "sk-4", category: "sap", nameAr: "شؤون وإدارة الأفراد (PA)", nameEn: "Personnel Administration (PA)" },
    { id: "sk-5", category: "sap", nameAr: "برمجة أوتوماتيكية للإكسل (Excel VBA)", nameEn: "Excel VBA Automation" },
    { id: "sk-6", category: "web", nameAr: "مكتبة واجهات الويب (React)", nameEn: "React.js Framework" },
    { id: "sk-7", category: "web", nameAr: "لغة البرمجة (JavaScript ES6+)", nameEn: "JavaScript (ES6+)" },
    { id: "sk-8", category: "web", nameAr: "أدوات التنسيق (Tailwind CSS / CSS3)", nameEn: "Tailwind CSS & CSS3" },
    { id: "sk-9", category: "web", nameAr: "بناء الهيكل (HTML5)", nameEn: "HTML5 Semantic Web" },
    { id: "sk-10", category: "web", nameAr: "نظام قواعد البيانات والتوثيق (Firebase)", nameEn: "Firebase (Firestore, Auth)" },
    { id: "sk-11", category: "web", nameAr: "سكربتات جوجل وأتمتتها (Apps Script)", nameEn: "Google Apps Script" },
    { id: "sk-12", category: "web", nameAr: "التحكم في النسخ والمشاركة (Git & GitHub)", nameEn: "Git, GitHub & Vercel" },
    { id: "sk-13", category: "soft", nameAr: "التفكير التحليلي وحل المشكلات", nameEn: "Problem Solving & Analytical Thinking" },
    { id: "sk-14", category: "soft", nameAr: "تصميم وإعادة هيكلة دورات العمل", nameEn: "Workflow Design & Process Automation" },
    { id: "sk-15", category: "soft", nameAr: "المرونة والتعلم المستمر لتبني التقنيات", nameEn: "Adaptability & Continuous Learning" },
    { id: "sk-16", category: "soft", nameAr: "العمل الجماعي والاتصال المؤسسي الفعال", nameEn: "Team Collaboration & Communication" }
  ],
  messages: [
    {
      id: "msg-1",
      senderName: "المهندس سامح الدمرداش",
      email: "sameh.demo@example.com",
      phone: "+20 122334455",
      message: "مرحباً يا بشمهندس أحمد موسى، نحن شركة رائدة في الاستشارات التقنية ونتابع بشغف خبرتك المتميزة في تطبيق وإعداد أنظمة SAP HCM وخصوصاً حسابات الرواتب وموديول تقييم الوقت. نبحث عن مستشار خبير مثلك للتعاقد معه في مشروع ضخم قادم. هل أنت متاح للعمل الاستشاري معنا؟",
      date: "2026-07-03T14:30:00.000Z",
      isRead: false,
      notes: "فرصة تعاقد استشاري واعدة جداً مع م. أحمد موسى"
    },
    {
      id: "msg-2",
      senderName: "Sarah Jenkins (Talent Acquisition)",
      email: "sarah.j@example.com",
      message: "Dear Ahmed Mousa, I checked out your impressive Mainly Reports platform and your custom SAP workflow designs. Your unique blend of enterprise-level SAP HCM expertise and modern full-stack React capabilities is outstanding! We would love to discuss a remote senior integration consultant role with us. Let me know when you are free for a brief call.",
      date: "2026-07-04T02:15:00.000Z",
      isRead: true,
      notes: "Senior SAP & React Integration position"
    },
    {
      id: "msg-3",
      senderName: "أ. عبد الرحمن السويدي",
      email: "a.suwaidi@enterprise.com.ae",
      phone: "+971 50 1234567",
      message: "الأخ الفاضل أحمد موسى، السلام عليكم ورحمة الله. لقد اطلعنا على حلول الأتمتة المبتكرة التي قمت بإنشائها باستخدام Google Apps Script وسكربتات إدارة الوقت. نود استشارتكم في أتمتة نظام الإجازات وربطه بقواعد بيانات شؤون الموظفين لدينا في دبي. هل يمكننا تنسيق اجتماع عمل عبر زووم هذا الأسبوع؟ دمتم بخير.",
      date: "2026-07-04T05:30:00.000Z",
      isRead: false,
      notes: "طلب استشارة برمجية لأتمتة الأنظمة من دبي"
    }
  ],
  analyticsEvents: [
    { timestamp: "2026-07-01T10:00:00.000Z", eventType: "view" },
    { timestamp: "2026-07-01T14:22:00.000Z", eventType: "click_project", details: "proj-3" },
    { timestamp: "2026-07-02T09:12:00.000Z", eventType: "view" },
    { timestamp: "2026-07-02T11:45:00.000Z", eventType: "download_resume" },
    { timestamp: "2026-07-03T08:30:00.000Z", eventType: "view" },
    { timestamp: "2026-07-03T14:30:00.000Z", eventType: "contact_submit", details: "msg-1" },
    { timestamp: "2026-07-04T05:00:00.000Z", eventType: "view" },
    { timestamp: "2026-07-04T05:15:00.000Z", eventType: "chat_message" }
  ],
  theme: {
    themeName: "الزمردي الوقور (Royal Emerald)",
    primaryColor: "emerald",
    isDarkMode: true,
    borderRadius: "lg"
  },
  backupHistory: [
    { id: "bak-1", timestamp: "2026-07-04T00:00:00.000Z", size: 4520 }
  ]
};
