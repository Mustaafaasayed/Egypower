// Language Data
const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services",
    nav_partners: "Partners",
    nav_clients: "Clients",
    nav_contact: "Contact",
    hero_badge: "Since 2000 | Leaders in Diesel Technology",
    hero_title: "Egypower – Comprehensive Diesel Services in Egypt",
    hero_subtitle:
      "Exclusive Agent for Boten Diesel & Deqpa | Maintenance – Imported Parts – Pump & Injection Calibration",
    btn_explore: "Explore Services",
    btn_contact: "Contact Us",
    about_label: "Who We Are",
    about_title: "Trusted Diesel Experts Since 2000",
    about_desc:
      "Egypower has established itself as a leader in the Egyptian market, providing top-tier maintenance and calibration services for diesel equipment. We are proud to work with the largest construction contractors in the region, ensuring their machinery operates at peak performance.",
    about_point1: "Exclusive agents for global brands",
    about_point2: "Advanced calibration workshops",
    about_point3: "Serving major national projects",
    years_exp: "Years Experience",
    services_title: "Our Services",
    srv_maint_title: "Diesel Maintenance",
    srv_maint_desc:
      "Full diagnostics and repair for heavy diesel engines using state-of-the-art tools.",
    srv_parts_title: "Imported Spare Parts",
    srv_parts_desc:
      "High-quality, genuine imported spare parts ensuring longevity for your equipment.",
    srv_pump_title: "Pump Calibration",
    srv_pump_desc:
      "Precision calibration devices for diesel pumps to maximize fuel efficiency.",
    srv_inject_title: "Injection Units",
    srv_inject_desc:
      "Expert adjustment and testing of modern diesel injection units and systems.",
    partners_title: "Our Exclusive Partners",
    clients_title: "Our Valued Clients",
    clients_sub: "Proudly serving the industry giants",
    contact_title: "Contact Us",
    contact_desc: "Get in touch for service inquiries or spare parts quotations.",
    addr_title: "Address",
    phone_title: "Phone",
    email_title: "Email",
    form_name: "Name",
    form_phone: "Phone Number",
    form_email: "Email",
    form_msg: "Message",
    btn_submit: "Send Message",
    copyright: "© Egypower 2025 – All Rights Reserved.",
  },
  ar: {
    nav_home: "الرئيسية",
    nav_about: "من نحن",
    nav_services: "خدماتنا",
    nav_partners: "وكلاؤنا",
    nav_clients: "عملاؤنا",
    nav_contact: "تواصل معنا",
    hero_badge: "تأسست عام 2000 | رواد تكنولوجيا الديزل",
    hero_title: "Egypower – خدمات الديزل المتكاملة في مصر",
    hero_subtitle:
      "الوكيل الحصري لـ Boten Diesel و Deqpa | صيانة – قطع غيار مستوردة – ضبط طلمبات ووحدات الحقن",
    btn_explore: "اكتشف خدماتنا",
    btn_contact: "اتصل بنا",
    about_label: "من نحن",
    about_title: "خبراء الديزل الموثوقين منذ عام 2000",
    about_desc:
      "رسخت Egypower مكانتها كشركة رائدة في السوق المصري، حيث تقدم خدمات صيانة ومعايرة من الدرجة الأولى لمعدات الديزل. نحن فخورون بالعمل مع أكبر شركات المقاولات في المنطقة، مما يضمن عمل آلياتهم بأقصى كفاءة.",
    about_point1: "وكلاء حصريون لماركات عالمية",
    about_point2: "ورش معايرة متطورة",
    about_point3: "خدمة المشاريع القومية الكبرى",
    years_exp: "سنة خبرة",
    services_title: "خدماتنا",
    srv_maint_title: "صيانة الديزل",
    srv_maint_desc:
      "تشخيص وإصلاح كامل لمحركات الديزل الثقيلة باستخدام أحدث الأدوات.",
    srv_parts_title: "قطع غيار مستوردة",
    srv_parts_desc: "قطع غيار أصلية عالية الجودة تضمن العمر الطويل لمعداتك.",
    srv_pump_title: "ضبط الطلمبات",
    srv_pump_desc:
      "أجهزة معايرة دقيقة لطلمبات الديزل لتحقيق أقصى كفاءة في استهلاك الوقود.",
    srv_inject_title: "وحدات الحقن",
    srv_inject_desc: "ضبط واختبار خبير لوحدات وأنظمة حقن الديزل الحديثة.",
    partners_title: "وكلاؤنا الحصريون",
    clients_title: "عملاؤنا المميزون",
    clients_sub: "فخورون بخدمة عمالقة الصناعة",
    contact_title: "تواصل معنا",
    contact_desc: "تواصل معنا للاستفسار عن الخدمات أو عروض أسعار قطع الغيار.",
    addr_title: "العنوان",
    phone_title: "الهاتف",
    email_title: "البريد الإلكتروني",
    form_name: "الاسم",
    form_phone: "رقم الهاتف",
    form_email: "البريد الإلكتروني",
    form_msg: "الرسالة",
    btn_submit: "إرسال الرسالة",
    copyright: "© Egypower 2025 – جميع الحقوق محفوظة.",
  },
};

let currentLang = "en";

function toggleLanguage() {
  currentLang = currentLang === "en" ? "ar" : "en";
  updateContent();
}

function updateContent() {
  const elements = document.querySelectorAll("[data-i18n]");

  // Set Text
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });

  // Handle Direction and Font
  const body = document.body;
  const btnText = document.getElementById("langText");

  if (currentLang === "ar") {
    document.documentElement.setAttribute("dir", "rtl");
    body.classList.add("rtl-mode");
    btnText.textContent = "English";
  } else {
    document.documentElement.setAttribute("dir", "ltr");
    body.classList.remove("rtl-mode");
    btnText.textContent = "العربية";
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("hidden");
}

// Initialize default (already set in HTML, but ensures consistency)
// updateContent();

