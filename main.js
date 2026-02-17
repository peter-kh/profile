// Handles theme + language toggles and text localization
document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const langToggle = document.getElementById("langToggle");
    const i18nNodes = Array.from(document.querySelectorAll("[data-i18n]"));

    // Capture default English text from the DOM
    const enText = {};
    i18nNodes.forEach((node) => {
        enText[node.dataset.i18n] = node.textContent.trim();
    });

    // Arabic translations for all data-i18n keys
    const arText = {
        navProjects: "المشاريع",
        navSkills: "المهارات",
        navContact: "التواصل",
        navCv: "تحميل السيرة الذاتية",
        heroTag: "هندسة الطاقة الكهربائية",
        heroTitle: "طالب هندسة طاقة كهربائية | تركيز على أنظمة القدرة والطاقة المتجددة",
        heroSub: "مهندس مبتدئ بقاعدة تقنية قوية ومنهجية تعتمد على البيانات لبناء حلول طاقة قابلة للتوسع وواقعية.",
        heroBtnProjects: "عرض المشاريع",
        heroBtnCv: "تحميل السيرة الذاتية",
        aboutTitle: "نبذة عني",
        aboutText: "أنا طالب هندسة طاقة كهربائية أركّز على أنظمة القدرة والطاقة المتجددة وتحليل الطاقة العملي. يجمع تكويني الأكاديمي بين أساسيات الهندسة الكهربائية والتطبيقات المرتبطة بسلوك الأحمال وتحويل الطاقة وتقييم أداء الأنظمة. أعتمد منهجًا منظمًا في حل المشكلات: تحديد واضح للمشكلة، تحليل القيود التقنية، مقارنة البدائل الممكنة، ثم اختيار الحل القابل للتنفيذ بثبات. إلى جانب الجانب التقني، أتبنى منظورًا رياديًا واقعيًا يركّز على الجدوى والتكلفة وقابلية التوسع على المدى الطويل. أهتم بالمشاريع التي تُبنى قراراتها على بيانات وافتراضات واضحة ومخرجات قابلة للقياس. هدفي هو المساهمة كمهندس مبتدئ موثوق مع الاستمرار في بناء عمق تقني في أنظمة الطاقة الحديثة والتنفيذ التحليلي للمشاريع.",
        projectsTitle: "المشاريع",
        p1Title: "التنبؤ الذكي بالأحمال لمبنى جامعي",
        labelProblem: "تعريف المشكلة:",
        p1Problem: "تغير الطلب على الطاقة حسب الموسم والجدول سبب ضعفًا في تخطيط الأحمال.",
        labelApproach: "المنهج التقني:",
        p1Approach: "بناء خط أساس للاستهلاك وتقسيم الطلب حسب الفترات الزمنية والإشغال وسياق الطقس.",
        labelTools: "الأدوات / المنهجيات:",
        p1Tools: "نمذجة Excel، مقارنة سلاسل زمنية، تحقق إحصائي أساسي، تحليل ملف الأحمال.",
        labelBusiness: "المنظور العملي:",
        p1Business: "يمكن توسيع النموذج لمبانٍ مشابهة كأداة منخفضة التكلفة لدعم التخطيط والميزانية.",
        labelStatus: "الحالة الحالية:",
        p1Status: "نموذج أولي",
        p2Title: "دراسة جدوى نظام هجين شمسي-ديزل",
        labelProblem2: "تعريف المشكلة:",
        p2Problem: "الاعتماد العالي على الوقود رفع التكلفة التشغيلية وزاد مخاطر التوريد.",
        labelApproach2: "المنهج التقني:",
        p2Approach: "مقارنة أداء الديزل فقط مع تكوينات هجينة باستخدام افتراضات الطلب وقيود الذروة.",
        labelTools2: "الأدوات / المنهجيات:",
        p2Tools: "تقدير إنتاج الطاقة، مصفوفة كلفة-منفعة، اختبارات حساسية، منطق تحجيم الأنظمة.",
        labelBusiness2: "المنظور العملي:",
        p2Business: "الجدوى ترتبط باتجاه أسعار الوقود وفترة الاسترداد، وتكون أقوى مع طلب نهاري ثابت.",
        labelStatus2: "الحالة الحالية:",
        p2Status: "مرحلة تطوير",
        p3Title: "تطبيق ويب لمراقبة الطاقة",
        labelProblem3: "تعريف المشكلة:",
        p3Problem: "الفرق الصغيرة غالبًا لا تملك واجهة بسيطة لمتابعة الاستهلاك ومؤشرات الأداء.",
        labelApproach3: "المنهج التقني:",
        p3Approach: "تصميم تدفق لوحة تحكم مرن لإدخال البيانات وعرضها وتحليل الاتجاه الشهري.",
        labelTools3: "الأدوات / المنهجيات:",
        p3Tools: "تقنيات واجهات ويب، هيكلة مؤشرات KPI، تصميم سير عمل عملي.",
        labelBusiness3: "المنظور العملي:",
        p3Business: "نموذج اشتراك خفيف مناسب للمنظمات الصغيرة التي تحتاج مراقبة دون تعقيد مؤسسي.",
        labelStatus3: "الحالة الحالية:",
        p3Status: "التطبيق قيد التطوير حاليًا.",
        wipTitle: "قيد العمل",
        wip1: "أفكار قيد التحقق: سير عمل منخفض التكلفة لتدقيق الطاقة في المنشآت الصغيرة.",
        wip2: "بحث مستمر: مقارنة عملية لاستراتيجيات تحجيم التخزين في سيناريوهات أحمال مختلطة.",
        wip3: "تجارب تقنية: تسجيل مبسط لأنماط الأعطال في شبكات قدرة تعليمية.",
        wip4: "مسودات مبكرة: قوالب مشاريع تربط المؤشرات التقنية بمؤشرات الجدوى.",
        skillsTitle: "المهارات",
        skillsTech: "مهارات تقنية",
        skillsTech1: "تحليل أنظمة القدرة",
        skillsTech2: "حسابات الأحمال",
        skillsTech3: "أساسيات الطاقة المتجددة",
        skillsTech4: "تحليل الدارات",
        skillsTech5: "أدوات المحاكاة (مستوى أكاديمي)",
        skillsAnalytical: "مهارات تحليلية",
        skillsAnalytical1: "تقييم الجدوى",
        skillsAnalytical2: "تحليل الكلفة والمنفعة",
        skillsAnalytical3: "حل المشكلات بشكل منظم",
        skillsEntre: "مهارات ريادية",
        skillsEntre1: "هيكلة نموذج العمل",
        skillsEntre2: "تحديد فجوات السوق",
        skillsEntre3: "تخطيط المشاريع",
        certTitle: "الشهادات",
        cert1Title: "دورة الطاقة الشمسية",
        certLabelKnowledge: "المعرفة المكتسبة:",
        cert1Knowledge: "أساسيات أنظمة PV، مبادئ تقدير الإنتاج، وأدوار المكونات.",
        certLabelApplication: "التطبيق العملي:",
        cert1Application: "تطبيق المفاهيم في تمارين أولية لتحجيم الأنظمة الهجينة.",
        certLabelImpact: "أثرها على المهارات:",
        cert1Impact: "رفع القدرة التقنية في تقييم حلول الطاقة المتجددة.",
        cert2Title: "دورة التمديدات الكهربائية",
        certLabelKnowledge2: "المعرفة المكتسبة:",
        cert2Knowledge: "منطق التوصيل، مبادئ السلامة، وآلية التنفيذ الميداني.",
        certLabelApplication2: "التطبيق العملي:",
        cert2Application: "مراجعة مخططات الأنظمة الصغيرة وفق معايير تركيب عملية.",
        certLabelImpact2: "أثرها على المهارات:",
        cert2Impact: "تعزيز جودة التنفيذ وواقعية التصميم.",
        cert3Title: "شهادة ريادة الأعمال",
        certLabelKnowledge3: "المعرفة المكتسبة:",
        cert3Knowledge: "تأطير الفرص، نمذجة أعمال أساسية، والتحقق المنهجي.",
        certLabelApplication3: "التطبيق العملي:",
        cert3Application: "استخدام تفكير الجدوى أولًا في تحديد نطاق المشاريع وأولوياتها.",
        certLabelImpact3: "أثرها على المهارات:",
        cert3Impact: "تحسين الربط بين القرار التقني والنتيجة العملية.",
        lookingTitle: "ما الذي أبحث عنه",
        lookingText: "منفتح على فرص توظيف هندسية للمستوى المبتدئ في أنظمة القدرة والطاقة المتجددة والتحليل التقني ضمن أوروبا.",
        contactTitle: "التواصل",
        contactEmailLabel: "البريد الإلكتروني:",
        contactLinkedinLabel: "لينكدإن:",
        contactCvLabel: "السيرة الذاتية:",
        contactCvValue: "تحميل سيرة ذاتية PDF من صفحة واحدة"
    };

    // Read persisted theme (default to light)
    const getSavedTheme = () => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark" || theme === "light") return theme;
        return "light";
    };

    // Read persisted language (default to English)
    const getSavedLang = () => {
        const lang = localStorage.getItem("lang");
        return lang === "ar" ? "ar" : "en";
    };

    // Theme button label depends on current theme + language
    const getThemeLabel = (theme, lang) => {
        if (lang === "ar") return theme === "dark" ? "فاتح" : "داكن";
        return theme === "dark" ? "Light" : "Dark";
    };

    // Apply theme class to <html> and update button label
    const applyTheme = (theme) => {
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem("theme", theme);
        if (themeToggle) {
            const lang = getSavedLang();
            themeToggle.textContent = getThemeLabel(theme, lang);
            themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
        }
    };

    // Apply language, text direction, and translated strings
    const applyLang = (lang) => {
        const useArabic = lang === "ar";
        i18nNodes.forEach((node) => {
            const key = node.dataset.i18n;
            node.textContent = useArabic ? (arText[key] || enText[key]) : enText[key];
        });

        root.lang = useArabic ? "ar" : "en";
        root.dir = useArabic ? "rtl" : "ltr";
        localStorage.setItem("lang", useArabic ? "ar" : "en");

        if (langToggle) {
            langToggle.textContent = useArabic ? "EN" : "AR";
            langToggle.setAttribute("aria-pressed", String(useArabic));
        }

        if (themeToggle) {
            const currentTheme = root.classList.contains("dark") ? "dark" : "light";
            themeToggle.textContent = getThemeLabel(currentTheme, lang);
        }
    };

    // Initialize theme + language from storage
    applyTheme(getSavedTheme());
    applyLang(getSavedLang());

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = root.classList.contains("dark") ? "dark" : "light";
            applyTheme(currentTheme === "dark" ? "light" : "dark");
        });
    }

    // Toggle language on button click
    if (langToggle) {
        langToggle.addEventListener("click", () => {
            const currentLang = getSavedLang();
            applyLang(currentLang === "ar" ? "en" : "ar");
        });
    }
});
