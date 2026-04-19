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
/** Must match CSS: 1 card (≤600px), 2 cards (≤900px), 4 cards (desktop). */
function getClientsCardsPerPage() {
  const w = window.innerWidth;
  if (w <= 600) return 1;
  if (w <= 900) return 2;
  return 4;
}

let carouselPage = 0;

function buildCarousel() {
  const track = document.getElementById('carouselTrack');
  if (!track) return;
  const cards = Array.from(track.querySelectorAll('.client-card'));
  const total = cards.length;
  const cpp = getClientsCardsPerPage();
  const pages = Math.ceil(total / cpp) || 1;
  carouselPage = Math.max(0, Math.min(carouselPage, pages - 1));

  const dotsEl = document.getElementById('carouselDots');
  dotsEl.innerHTML = '';
  for (let i = 0; i < pages; i++) {
    const d = document.createElement('button');
    d.className = 'carousel-dot' + (i === carouselPage ? ' active' : '');
    d.setAttribute('aria-label', 'Go to page ' + (i + 1));
    d.onclick = () => goCarousel(i);
    dotsEl.appendChild(d);
  }
  updateCarouselBtns(pages);
  goCarousel(carouselPage);
}

function goCarousel(page) {
  const track = document.getElementById('carouselTrack');
  const cards = Array.from(track.querySelectorAll('.client-card'));
  const total = cards.length;
  const cpp = getClientsCardsPerPage();
  const pages = Math.ceil(total / cpp) || 1;

  carouselPage = Math.max(0, Math.min(page, pages - 1));

  const card = cards[0];
  const gap = 20;
  const cardW = card ? card.getBoundingClientRect().width || 200 : 200;
  const offset = carouselPage * cpp * (cardW + gap);
  track.style.transform = `translateX(-${offset}px)`;

  document.querySelectorAll('.carousel-dot').forEach((d, i) => {
    d.classList.toggle('active', i === carouselPage);
  });
  updateCarouselBtns(pages);
}

function carouselStep(dir) {
  const track = document.getElementById('carouselTrack');
  const total = track.querySelectorAll('.client-card').length;
  const cpp = getClientsCardsPerPage();
  const pages = Math.ceil(total / cpp) || 1;
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
  buildCarousel();
  if (window.innerWidth > 900) document.getElementById('mobileDrawer').classList.remove('open');
});
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').style.boxShadow = window.scrollY > 20 ? '0 4px 24px rgba(0,0,0,0.4)' : 'none';
});
