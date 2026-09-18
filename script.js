(() => {
  'use strict';
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const toast = document.querySelector('.toast');
  let toastTimer;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  };
  const closeMenu = () => {
    menuToggle?.setAttribute('aria-expanded','false');
    menuToggle?.setAttribute('aria-label','Menü öffnen');
    mobileNav?.classList.remove('open');
  };
  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    mobileNav?.classList.toggle('open', open);
  });
  document.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
    }), { threshold:.1, rootMargin:'0px 0px -30px' });
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('is-visible'));

  const video = document.getElementById('experience-video');
  const play = document.querySelector('.video-play');
  const caption = document.querySelector('.video-caption');
  const syncVideo = () => {
    const active = video && !video.paused && !video.ended;
    if (play) { play.style.opacity = active ? '0' : '1'; play.style.pointerEvents = active ? 'none' : 'auto'; }
    if (caption) caption.style.opacity = active ? '0' : '1';
  };
  play?.addEventListener('click', () => video?.play().catch(() => showToast('Video konnte nicht gestartet werden.')));
  video?.addEventListener('click', () => video.paused ? video.play() : video.pause());
  ['play','pause','ended'].forEach(evt => video?.addEventListener(evt, syncVideo));

  const cards = [...document.querySelectorAll('.city-card')];
  const selected = document.getElementById('selected-city');
  const orderCity = document.getElementById('order-city');
  cards.forEach(card => card.addEventListener('click', () => {
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    const label = `${card.dataset.city || ''} · ${card.dataset.date || ''}`;
    if (selected) selected.textContent = label;
    if (orderCity) orderCity.textContent = label;
  }));

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn?.addEventListener('click', () => {
      const shouldOpen = !item.classList.contains('open');
      faqItems.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-question')?.setAttribute('aria-expanded','false');
        const sign = other.querySelector('.faq-question b'); if (sign) sign.textContent = '+';
      });
      if (shouldOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded','true');
        const sign = btn.querySelector('b'); if (sign) sign.textContent = '−';
      }
    });
  });

  const wishlist = document.querySelector('.wishlist-btn');
  wishlist?.addEventListener('click', () => {
    const active = wishlist.getAttribute('aria-pressed') !== 'true';
    wishlist.setAttribute('aria-pressed', String(active));
    wishlist.classList.toggle('active', active);
    showToast(active ? 'Zur Wunschliste hinzugefügt.' : 'Aus der Wunschliste entfernt.');
  });

  const form = document.getElementById('order-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    showToast('Demo: Bestellung ist bereit zur Übergabe an den Zahlungsprozess.');
  });

  const topBtn = document.querySelector('.back-to-top');
  const onScroll = () => {
    const y = scrollY;
    header?.classList.toggle('scrolled', y > 16);
    topBtn?.classList.toggle('visible', y > 650);
  };
  addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  topBtn?.addEventListener('click', () => scrollTo({top:0,behavior:'smooth'}));
})();
