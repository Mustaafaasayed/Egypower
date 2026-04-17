/* ─── LANGUAGE ─── */
let lang = 'ar';

function applyLang() {
  const isAr = lang === 'ar';
  document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
  document.body.classList.toggle('ltr', !isAr);
  document.getElementById('langBtn').textContent = isAr ? 'EN' : 'AR';
  document.querySelectorAll('[data-ar]').forEach(el => {
    el.textContent = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-en');
  });
  document.querySelectorAll('.field-error.visible').forEach(el => {
    el.textContent = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-en');
  });
  // Slideshow arrows flip with lang
  updateSlideshowArrows();
  buildCarousel();
}

function toggleLang() {
  lang = lang === 'ar' ? 'en' : 'ar';
  applyLang();
}

function toggleMobile() {
  document.getElementById('mobileDrawer').classList.toggle('open');
}

/* ─── SERVICES SLIDESHOW ─── */
let slideIdx = 0;
let slideTimer;
const SLIDE_INTERVAL = 3200;

function initSlideshow() {
  const slides = document.querySelectorAll('#servicesSlideshow img');
  const dotsEl = document.getElementById('slideshowDots');
  dotsEl.innerHTML = '';
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'slideshow-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    d.onclick = () => { goSlide(i); restartSlideTimer(); };
    dotsEl.appendChild(d);
  });
  restartSlideTimer();
}

function goSlide(idx) {
  const slides = document.querySelectorAll('#servicesSlideshow img');
  const dots   = document.querySelectorAll('.slideshow-dot');
  slides[slideIdx].classList.remove('active');
  dots[slideIdx] && dots[slideIdx].classList.remove('active');
  slideIdx = (idx + slides.length) % slides.length;
  slides[slideIdx].classList.add('active');
  dots[slideIdx] && dots[slideIdx].classList.add('active');
}

function slideshowStep(dir) {
  goSlide(slideIdx + dir);
  restartSlideTimer();
}

function restartSlideTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => goSlide(slideIdx + 1), SLIDE_INTERVAL);
}

function updateSlideshowArrows() {
  // Arrows stay visually correct — no change needed as they're positioned absolute
}

/* ─── CLIENTS CAROUSEL ─── */
const CARDS_PER_PAGE = 4;
let carouselPage = 0;

function buildCarousel() {
  const track = document.getElementById('carouselTrack');
  const cards = Array.from(track.querySelectorAll('.client-card'));
  const total = cards.length;
  const pages = Math.ceil(total / CARDS_PER_PAGE);
  carouselPage = 0;
  track.style.transform = 'translateX(0)';

  const dotsEl = document.getElementById('carouselDots');
  dotsEl.innerHTML = '';
  for (let i = 0; i < pages; i++) {
    const d = document.createElement('button');
    d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Go to page ' + (i + 1));
    d.onclick = () => goCarousel(i);
    dotsEl.appendChild(d);
  }
  updateCarouselBtns(pages);
}

function goCarousel(page) {
  const track = document.getElementById('carouselTrack');
  const cards = Array.from(track.querySelectorAll('.client-card'));
  const total = cards.length;
  const pages = Math.ceil(total / CARDS_PER_PAGE);

  carouselPage = Math.max(0, Math.min(page, pages - 1));

  // Measure card + gap
  const card  = cards[0];
  const gap   = 20;
  const cardW = card.getBoundingClientRect().width || 200;
  const offset = carouselPage * CARDS_PER_PAGE * (cardW + gap);
  track.style.transform = `translateX(-${offset}px)`;

  document.querySelectorAll('.carousel-dot').forEach((d, i) => {
    d.classList.toggle('active', i === carouselPage);
  });
  updateCarouselBtns(pages);
}

function carouselStep(dir) {
  const track = document.getElementById('carouselTrack');
  const total = track.querySelectorAll('.client-card').length;
  const pages = Math.ceil(total / CARDS_PER_PAGE);
  goCarousel((carouselPage + dir + pages) % pages);
}

function updateCarouselBtns(pages) {
  const prev = document.getElementById('btnPrev');
  const next = document.getElementById('btnNext');
  if (!prev || !next) return;
  // Enable wrap-around — disable buttons only if single page
  if (pages <= 1) {
    prev.disabled = true;
    next.disabled = true;
  } else {
    prev.disabled = false;
    next.disabled = false;
  }
}

const BRANDS_DATA = [
  { src: 'Logos/bosch for diesel logo.png', alt: 'Bosch', fallback: 'BOSCH', label: 'Bosch', logoClass: 'logo-dense' },
  { src: 'Logos/denso diesel logo.png', alt: 'Denso', fallback: 'DENSO', label: 'Denso', logoClass: 'logo-wide' },
  { src: 'Logos/delphi technologies logo.jpg', alt: 'Delphi', fallback: 'DELPHI', label: 'Delphi', logoClass: 'logo-wide' },
  { src: 'Logos/cummins logo.png', alt: 'Cummins', fallback: 'CUMMINS', label: 'Cummins', logoClass: 'logo-wide' },
  { src: 'Logos/caterpillar diesel logo.png', alt: 'Caterpillar CAT', fallback: 'CAT', label: 'Caterpillar', logoClass: 'logo-dense' },
  { src: 'Logos/zexel diesel logo.png', alt: 'Zexel', fallback: 'ZEXEL', label: 'Zexel', logoClass: 'logo-wide' },
  { src: 'Logos/stanadyne diesel logo.png', alt: 'Stanadyne', fallback: 'STANADYNE', label: 'Stanadyne', logoClass: 'logo-tall' },
  { src: 'Logos/OMS Common Rail & Diesel Injection Spare Parts Logo.jpg', alt: 'OMS Common Rail', fallback: 'OMS', label: 'OMS', logoClass: 'logo-wide' },
  { src: 'Logos/Firad Diesel Fuel Injection Logo.jpg', alt: 'Firad Diesel', fallback: 'FIRAD', label: 'Firad', logoClass: 'logo-wide' },
  { src: 'Logos/DEQPA.png', alt: 'Deqpa', fallback: 'DEQPA', label: 'Deqpa', logoClass: 'logo-soft logo-dense' }
];

function renderBrandsGrid() {
  const grid = document.getElementById('brandsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  BRANDS_DATA.forEach(brand => {
    const card = document.createElement('div');
    card.className = 'brand-card';

    const logoBox = document.createElement('div');
    logoBox.className = `brand-logo-box ${brand.logoClass || ''}`.trim();

    const img = document.createElement('img');
    img.src = brand.src;
    img.alt = brand.alt;
    img.setAttribute('data-brand-fallback', brand.fallback);
    img.loading = 'lazy';
    img.decoding = 'async';

    const label = document.createElement('div');
    label.className = 'brand-label';
    label.textContent = brand.label;

    logoBox.appendChild(img);
    card.appendChild(logoBox);
    card.appendChild(label);
    grid.appendChild(card);
  });
}

function initBrandLogoFallbacks() {
  document.querySelectorAll('#brands .brand-logo-box img[data-brand-fallback]').forEach(img => {
    img.addEventListener('error', () => {
      const box = img.closest('.brand-logo-box');
      if (!box) return;
      const fallback = document.createElement('span');
      fallback.className = 'brand-logo-fallback';
      fallback.textContent = img.getAttribute('data-brand-fallback') || img.alt || 'BRAND';
      box.innerHTML = '';
      box.appendChild(fallback);
    }, { once: true });
  });
}

/* ─── FORM VALIDATION ─── */
function showErr(fId, eId, show) {
  document.getElementById(fId).classList.toggle('input-error', show);
  const e = document.getElementById(eId);
  e.classList.toggle('visible', show);
  if (show) e.textContent = lang === 'ar' ? e.getAttribute('data-ar') : e.getAttribute('data-en');
}

function validateForm() {
  let ok = true;
  const name  = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const msg   = document.getElementById('f-msg').value.trim();

  if (name.length < 2)                                    { showErr('f-name','err-name',true);  ok=false; } else showErr('f-name','err-name',false);
  if (phone && !/^[+\d\s\-()]{7,20}$/.test(phone))       { showErr('f-phone','err-phone',true); ok=false; } else showErr('f-phone','err-phone',false);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showErr('f-email','err-email',true); ok=false; } else showErr('f-email','err-email',false);
  if (msg.length < 10)                                    { showErr('f-msg','err-msg',true);    ok=false; } else showErr('f-msg','err-msg',false);
  return ok;
}

['f-name','f-phone','f-email','f-msg'].forEach(id => {
  const map = {'f-name':'err-name','f-phone':'err-phone','f-email':'err-email','f-msg':'err-msg'};
  document.getElementById(id).addEventListener('input', () => showErr(id, map[id], false));
});

async function handleSubmit(e) {
  e.preventDefault();
  if (!validateForm()) return;
  const btn = document.getElementById('submitBtn');
  const msgEl = document.getElementById('formMsg');
  msgEl.className = 'form-msg';
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ' + (lang==='ar' ? 'جاري الإرسال...' : 'Sending...');
  try {
    const res = await fetch('https://formspree.io/f/mgopkbbe', {
      method:'POST', body:new FormData(e.target), headers:{'Accept':'application/json'}
    });
    if (res.ok) {
      msgEl.textContent = lang==='ar' ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' : "Message sent! We'll be in touch soon.";
      msgEl.className = 'form-msg success';
      e.target.reset();
    } else throw new Error();
  } catch {
    msgEl.textContent = lang==='ar' ? 'حدث خطأ. يرجى التواصل عبر واتساب.' : 'Something went wrong. Please try WhatsApp.';
    msgEl.className = 'form-msg error';
  }
  btn.disabled = false;
  btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i><span>' + (lang==='ar' ? 'إرسال الرسالة' : 'Send Message') + '</span>';
}

/* ─── TOUCH / SWIPE on carousel ─── */
(function() {
  let startX = 0;
  const vp = document.querySelector('.carousel-viewport');
  if (!vp) return;
  vp.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive:true});
  vp.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) carouselStep(dx < 0 ? 1 : -1);
  }, {passive:true});
})();

/* ─── INIT ─── */
window.addEventListener('DOMContentLoaded', () => {
  initSlideshow();
  buildCarousel();
  renderBrandsGrid();
  initBrandLogoFallbacks();
});
window.addEventListener('resize', () => {
  goCarousel(carouselPage);
  if (window.innerWidth > 900) document.getElementById('mobileDrawer').classList.remove('open');
});
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,0.4)' : 'none';
});
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

