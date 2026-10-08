/* ==========================================================================
   Аня & Никита — 10.10.2026
   Логика сайта: отсчёт, навигация, анимации, анкета гостя «Иду / Не иду».
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- 1. НАСТРОЙКИ (при желании поменяйте здесь) ---------- */
  var CONFIG = {
    weddingDate: '2026-10-10T15:00:00',
    storageKey: 'anya-nikita-rsvp-2026',
    // Если захотите получать ответы автоматически — впишите данные Telegram-бота.
    // Как это сделать, написано в файле README.md.
    telegram: {
      botToken: '',            // например '123456789:AAE...'
      chatId: ''               // например '-1001234567890'
    }
  };

  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- 2. ОТСЧЁТ ДО СВАДЬБЫ ---------- */
  var target = new Date(CONFIG.weddingDate).getTime();
  var cells = {
    days: $('[data-cd="days"]'),
    hours: $('[data-cd="hours"]'),
    minutes: $('[data-cd="minutes"]'),
    seconds: $('[data-cd="seconds"]')
  };
  var note = $('#countdownNote');

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function tick() {
    var diff = target - Date.now();
    if (diff <= 0) {
      cells.days.textContent = cells.hours.textContent = cells.minutes.textContent = cells.seconds.textContent = '00';
      if (note) note.textContent = 'Этот день наступил! 🎉';
      return true;
    }
    var s = Math.floor(diff / 1000);
    cells.days.textContent = Math.floor(s / 86400);
    cells.hours.textContent = pad(Math.floor(s % 86400 / 3600));
    cells.minutes.textContent = pad(Math.floor(s % 3600 / 60));
    cells.seconds.textContent = pad(s % 60);
    return false;
  }
  if (cells.days) {
    var done = tick();
    if (!done) setInterval(tick, 1000);
  }

  /* ---------- 3. ПЛАВНАЯ ПРОКРУТКА И НИЖНЕЕ МЕНЮ ---------- */
  function scrollToSel(sel) {
    var el = document.querySelector(sel);
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.pageYOffset - 54;
    window.scrollTo({ top: top < 0 ? 0 : top, behavior: 'smooth' });
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest ? e.target.closest('[data-scroll]') : null;
    if (!trigger) return;
    scrollToSel(trigger.getAttribute('data-scroll'));
  });

  var tabs = $$('.tab');
  var topbar = $('#topbar');

  function onScroll() {
    if (topbar) topbar.classList.toggle('is-stuck', window.pageYOffset > 30);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Подсветка активного раздела снизу */
  var sections = ['hero', 'program', 'place', 'rsvp']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        tabs.forEach(function (t) { t.classList.toggle('is-active', t.getAttribute('data-tab') === id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { navObs.observe(s); });
  }

  /* ---------- 4. ПОЯВЛЕНИЕ БЛОКОВ ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revObs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { revObs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 5. ТОСТ ---------- */
  var toastEl = $('#toast');
  var toastTimer = null;
  function toast(text, ms) {
    if (!toastEl) return;
    toastEl.textContent = text;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-on'); }, ms || 2600);
  }

  /* ---------- 6. КОНФЕТТИ ---------- */
  var confettiBox = $('#confetti');
  function confetti(count) {
    if (!confettiBox) return;
    var colors = ['#c9a227', '#e8c8c1', '#b9c9b6', '#f4e2b3', '#e0a9a0', '#ffffff'];
    for (var i = 0; i < (count || 60); i++) {
      var bit = document.createElement('span');
      bit.style.left = Math.random() * 100 + 'vw';
      bit.style.background = colors[Math.floor(Math.random() * colors.length)];
      bit.style.animationDuration = (1.6 + Math.random() * 1.6) + 's';
      bit.style.animationDelay = (Math.random() * 0.5) + 's';
      bit.style.width = (5 + Math.random() * 7) + 'px';
      bit.style.height = (9 + Math.random() * 8) + 'px';
      bit.style.opacity = 0.85;
      confettiBox.appendChild(bit);
      (function (node) {
        setTimeout(function () { node.remove(); }, 4200);
      })(bit);
    }
  }

  /* ---------- 7. ЛАЙТБОКС ГАЛЕРЕИ ---------- */
  var lightbox = $('#lightbox');
  var lightboxImg = $('#lightboxImg');
  function openLightbox(src, alt) {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.hidden = false;
    document.body.classList.add('is-locked');
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.classList.remove('is-locked');
  }
  $$('.gallery__item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var img = $('img', btn);
      openLightbox(btn.getAttribute('data-full'), img ? img.alt : '');
    });
  });
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.id === 'lightboxClose') closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------- 8. АНКЕТА: «ИДУ / НЕ ИДУ» ---------- */
  var form = $('#rsvpForm');
  var answerButtons = $$('.answer__btn');
  var whenYes = $$('[data-when="yes"]');
  var whenNo = $$('[data-when="no"]');
  var answer = null;
  var lastSubmit = null;
  var sending = false;

  try {
    var saved = JSON.parse(localStorage.getItem(CONFIG.storageKey) || 'null');
    if (saved && saved.answer) {
      answer = saved.answer;
      lastSubmit = saved;
    }
  } catch (err) { /* приватный режим — просто игнорируем */ }

  function applyAnswer(value, opts) {
    answer = value;
    answerButtons.forEach(function (btn) {
      var picked = btn.getAttribute('data-answer') === value;
      btn.classList.toggle('is-picked', picked);
      btn.setAttribute('aria-pressed', picked ? 'true' : 'false');
    });
    whenYes.forEach(function (el) { el.hidden = value !== 'yes'; });
    whenNo.forEach(function (el) { el.hidden = value !== 'no'; });
    if (!opts || !opts.silent) {
      clearError('name');
      toast(value === 'yes' ? 'Ура! Ждём вас 🎉' : 'Спасибо, что сообщили 💔', 2200);
    }
  }

  function prefill(data) {
    if (!data) return;
    var name = $('#name');
    if (name && data.name) name.value = data.name;
    var guests = $('#guests');
    if (guests && data.guests) { guests.value = data.guests; renderGuests(); }
    var kids = $('#kids');
    if (kids) kids.checked = !!data.kids;
    var allergies = $('#allergies');
    if (allergies && data.allergies) allergies.value = data.allergies;
    var message = $('#message');
    if (message && data.message) message.value = data.message;
    var reason = $('#reason');
    if (reason && data.reason) reason.value = data.reason;
    var song = $('#song');
    if (song) song.checked = !!data.song;
    var transfer = $('#transfer');
    if (transfer && data.transfer) transfer.value = data.transfer;
    if (data.drinks && data.drinks.length) {
      $$('#drinks input').forEach(function (input) {
        input.checked = data.drinks.indexOf(input.value) !== -1;
      });
    }
  }

  if (answer) {
    applyAnswer(answer, { silent: true });
    var box = $('#thanks');
    if (box && lastSubmit) {
      prefill(lastSubmit);
      showThanks(lastSubmit, true);
    } else {
      prefill(lastSubmit);
    }
  }

  answerButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyAnswer(btn.getAttribute('data-answer'));
      // Мягкий скролл к форме, если она ниже экрана
      var formTop = form.getBoundingClientRect().top;
      if (formTop > window.innerHeight * 0.75) {
        window.scrollBy({ top: formTop - window.innerHeight * 0.34, behavior: 'smooth' });
      }
    });
  });

  // Кнопки «Иду / Не смогу» на главном экране заранее выбирают ответ
  $$('[data-answer][data-scroll]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyAnswer(btn.getAttribute('data-answer'), { silent: true });
    });
  });

  /* ---------- 9. СЧЁТЧИК ГОСТЕЙ ---------- */
  var guestsInput = $('#guests');
  var guestsOut = $('#guestsOut');
  function pluralGost(n) {
    var n10 = n % 10, n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return 'гость';
    if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return 'гостя';
    return 'гостей';
  }
  function renderGuests() {
    var n = parseInt(guestsInput.value, 10) || 1;
    n = Math.min(6, Math.max(1, n));
    guestsInput.value = n;
    guestsOut.textContent = n + ' ' + pluralGost(n);
  }
  if (guestsInput) {
    $$('#guestsStepper .stepper__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        guestsInput.value = (parseInt(guestsInput.value, 10) || 1) + parseInt(btn.getAttribute('data-step'), 10);
        renderGuests();
      });
    });
    renderGuests();
  }

  /* ---------- 10. ОШИБКИ ПОЛЕЙ ---------- */
  function setError(field, text) {
    var wrap = field.closest('.field');
    if (wrap) wrap.classList.add('has-error');
    var err = wrap ? $('.field__err', wrap) : null;
    if (err) err.textContent = text;
  }
  function clearError(fieldOrName) {
    var field = typeof fieldOrName === 'string' ? $('#' + fieldOrName) : fieldOrName;
    if (!field) return;
    var wrap = field.closest('.field');
    if (wrap) wrap.classList.remove('has-error');
    var err = wrap ? $('.field__err', wrap) : null;
    if (err) err.textContent = '';
  }

  /* ---------- 11. ОТПРАВКА ОТВЕТА ---------- */
  function collect() {
    var drinks = $$('#drinks input:checked').map(function (i) { return i.value; });
    return {
      answer: answer,
      name: ($('#name').value || '').trim(),
      guests: answer === 'yes' ? parseInt($('#guests').value, 10) || 1 : 0,
      kids: answer === 'yes' ? $('#kids').checked : false,
      drinks: answer === 'yes' ? drinks : [],
      transfer: answer === 'yes' ? $('#transfer').value : '',
      reason: answer === 'no' ? ($('#reason').value || '').trim() : '',
      allergies: ($('#allergies').value || '').trim(),
      message: ($('#message').value || '').trim(),
      song: $('#song').checked,
      savedAt: new Date().toISOString()
    };
  }

  function send(data) {
    var tg = CONFIG.telegram;
    if (!tg.botToken || !tg.chatId) return Promise.resolve({ skipped: true });

    var lines = [
      '💌 Ответ на приглашение — Аня & Никита, 10.10.2026',
      'Решение: ' + (data.answer === 'yes' ? 'ИДУ ✅' : 'НЕ СМОГУ 💔'),
      'Имя: ' + data.name
    ];
    if (data.answer === 'yes') {
      lines.push('Гостей: ' + data.guests + (data.kids ? ' (с детьми)' : ''));
      lines.push('Напитки: ' + (data.drinks.length ? data.drinks.join(', ') : '—'));
      lines.push('Трансфер: ' + (data.transfer || '—'));
    } else if (data.reason) {
      lines.push('Сообщение: ' + data.reason);
    }
    if (data.allergies) lines.push('Питание: ' + data.allergies);
    if (data.message) lines.push('Пожелание: ' + data.message);
    if (data.song) lines.push('Готов(а) к номеру: да 🎤');

    return fetch('https://api.telegram.org/bot' + tg.botToken + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: tg.chatId, text: lines.join('\n') })
    }).catch(function () { return { failed: true }; });
  }

  function showThanks(data, quiet) {
    var box = $('#thanks');
    if (!box) return;
    $('#thanksTitle').textContent = data.answer === 'yes' ? 'Ура, ждём вас!' : 'Спасибо, что ответили';
    $('#thanksText').innerHTML = data.answer === 'yes'
      ? '<b>' + escapeHtml(data.name) + '</b>, вы записаны' + (data.guests > 1 ? ' с компанией из ' + data.guests + ' человек' : '') +
        '. Мы очень рады! Встречаемся 10 октября 2026 года, сбор гостей в 15:00.'
      : '<b>' + escapeHtml(data.name) + '</b>, нам будет вас не хватать. Спасибо, что сообщили заранее — это очень помогает в подготовке.';
    form.hidden = true;
    box.hidden = false;
    if (!quiet) {
      box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (data.answer === 'yes') confetti(quiet ? 0 : 70);
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending) return;

      var nameField = $('#name');
      if (!nameField.value.trim()) {
        setError(nameField, 'Пожалуйста, напишите ваше имя');
        nameField.focus();
        toast('Как вас подписать?');
        return;
      }
      clearError(nameField);

      if (!answer) {
        applyAnswer('yes', { silent: true });
        toast('Отметили вас как «Иду». Можно поменять 💛', 3000);
      }

      var data = collect();
      var status = $('#formStatus');
      sending = true;
      form.classList.add('is-sending');
      status.textContent = 'Отправляем…';

      send(data).then(function (res) {
        sending = false;
        form.classList.remove('is-sending');
        try { localStorage.setItem(CONFIG.storageKey, JSON.stringify(data)); } catch (err) { /* ignore */ }
        lastSubmit = data;
        if (res && res.failed) {
          status.textContent = 'Ответ сохранён у вас на телефоне, но отправить его не удалось.';
          toast('Не удалось отправить онлайн-ответ');
        } else {
          status.textContent = '';
        }
        showThanks(data);
      });
    });
  }

  var againBtn = $('#againBtn');
  if (againBtn) {
    againBtn.addEventListener('click', function () {
      $('#thanks').hidden = true;
      form.hidden = false;
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ---------- 12. ПРИВЕТСТВИЕ ПО ИМЕНИ В ССЫЛКЕ ---------- */
  // Пример: index.html?name=Мария — имя подставится само (удобно для рассылки).
  var params = new URLSearchParams(window.location.search);
  var guestFromLink = params.get('name');
  if (guestFromLink && $('#name') && !$('#name').value) {
    $('#name').value = guestFromLink;
  }
})();
