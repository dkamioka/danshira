(function () {
  'use strict';

  // Os dados dos casos vivem no HTML (ver index.html), não aqui. Crawlers de IA
  // e o Googlebot leem o conteúdo sem executar JS; este arquivo só melhora a
  // interação por cima do que já está na página.

  var slider = document.getElementById('baSlider');
  var fill = document.getElementById('baFill');
  var imgBefore = document.getElementById('imgBefore');
  var imgAfter = document.getElementById('imgAfter');
  var angleTag = document.getElementById('angleTag');
  var caseTag = document.getElementById('caseTag');
  var hint = document.getElementById('baHint');
  var tabs = [].slice.call(document.querySelectorAll('.tab'));
  var cases = [].slice.call(document.querySelectorAll('.case'));

  function pad2(n) { return n < 10 ? '0' + n : '' + n; }

  // ---------- ângulos ----------

  function pickAngle(caseEl, btn) {
    var items = [].slice.call(caseEl.querySelectorAll('.angle-item'));
    var i = items.indexOf(btn);
    items.forEach(function (b) {
      var on = b === btn;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    var peca = caseEl.getAttribute('data-peca');
    var label = btn.getAttribute('data-label');
    imgBefore.src = btn.getAttribute('data-antes');
    imgAfter.src = btn.getAttribute('data-depois');
    imgBefore.alt = peca + ' antes da restauração — ' + label.toLowerCase();
    imgAfter.alt = peca + ' depois da restauração — ' + label.toLowerCase();
    angleTag.textContent = pad2(i + 1) + '/' + pad2(items.length) + ' · ' + label;
    slider.setAttribute('aria-label', 'Comparar antes e depois — ' + peca);
  }

  // ---------- abas ----------

  function pickCase(idx) {
    tabs.forEach(function (t, i) {
      var on = i === idx;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
    });
    cases.forEach(function (c, i) {
      if (i === idx) { c.removeAttribute('hidden'); } else { c.setAttribute('hidden', ''); }
    });
    var caseEl = cases[idx];
    caseTag.textContent = caseEl.getAttribute('data-reg') + ' · ' + caseEl.getAttribute('data-servico');
    pickAngle(caseEl, caseEl.querySelector('.angle-item'));
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { pickCase(i); });
    tab.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var n = (i + d + tabs.length) % tabs.length;
      pickCase(n);
      tabs[n].focus();
    });
  });

  document.querySelectorAll('.angle-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      pickAngle(btn.closest('.case'), btn);
    });
  });

  // ---------- comparador: auto-play em CSS, arraste/teclado assumem ----------

  var dragging = false;
  var tookOver = false;

  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

  function setPct(pct) {
    pct = clamp(pct, 1.5, 98.5);
    fill.style.width = pct + '%';
    slider.setAttribute('aria-valuenow', Math.round(pct));
    slider.setAttribute('aria-valuetext', Math.round(pct) + '% do depois visível');
  }

  function takeOver() {
    if (tookOver) return;
    tookOver = true;
    fill.style.animation = 'none';
    hint.textContent = 'Arraste a linha para comparar';
  }

  function pctFrom(e) {
    var r = slider.getBoundingClientRect();
    return ((e.clientX - r.left) / r.width) * 100;
  }

  slider.addEventListener('pointerdown', function (e) {
    dragging = true;
    takeOver();
    setPct(pctFrom(e));
    slider.setPointerCapture(e.pointerId);
  });

  slider.addEventListener('pointermove', function (e) {
    if (dragging) setPct(pctFrom(e));
  });

  function endDrag() { dragging = false; }
  slider.addEventListener('pointerup', endDrag);
  slider.addEventListener('pointercancel', endDrag);

  slider.addEventListener('keydown', function (e) {
    var cur = parseFloat(slider.getAttribute('aria-valuenow')) || 50;
    var step = e.shiftKey ? 10 : 2;
    var next = null;
    if (e.key === 'ArrowRight') next = cur + step;
    else if (e.key === 'ArrowLeft') next = cur - step;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = 100;
    if (next === null) return;
    e.preventDefault();
    takeOver();
    setPct(next);
  });

  // ---------- menu mobile ----------

  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', function () {
    var open = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  mainNav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
