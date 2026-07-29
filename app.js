(function () {
  'use strict';

  var CASES = [
    {
      reg: 'CASO 041',
      tabLabel: '041',
      peca: 'RAWLINGS 11.75" INFIELD',
      servico: 'RESTAURAÇÃO COMPLETA',
      etapa: 'TROCA DE COURO + RELAÇAMENTO',
      resumo: 'Couro ressecado e forma perdida depois de anos de uso. Troquei o couro do dedo e do dorso, relacei a luva inteira e recuperei a curva do bolso.',
      nota: '8 ANOS DE USO ANTES DE CHEGAR AQUI',
      angles: [
        { slug: 'raw-5', label: 'DORSO' },
        { slug: 'raw-4', label: 'PALMA' },
        { slug: 'raw-2', label: 'DEDOS' },
        { slug: 'raw-3', label: 'WEB' },
        { slug: 'raw-1', label: 'LATERAL' },
        { slug: 'raw-6', label: 'TOPO' }
      ]
    },
    {
      reg: 'CASO 038',
      tabLabel: '038',
      peca: 'ZETT DYNA 1ª BASE',
      servico: 'REFORMA E RECOLORAÇÃO',
      etapa: 'LIMPEZA + HIDRATAÇÃO + TINGIMENTO',
      resumo: 'Couro bom, cor gasta pelo sol. Limpei, hidratei fundo e retingi mantendo o relevo original da luva.',
      nota: 'COURO ORIGINAL PRESERVADO, SÓ A COR FOI RECUPERADA',
      angles: [
        { slug: 'zett-1', label: 'FRENTE' },
        { slug: 'zett-2', label: 'DORSO' },
        { slug: 'zett-3', label: 'LATERAL' },
        { slug: 'zett-4', label: 'BOLSO' }
      ]
    },
    {
      reg: 'CASO 044',
      tabLabel: '044',
      peca: 'MIZUNO PRO COURO VERMELHO',
      servico: 'CORREÇÃO DE ESTRUTURA',
      etapa: 'REFORÇO DE FORMA + RELAÇAMENTO',
      resumo: 'O bolso tinha cedido e não fechava mais. Reforcei a estrutura interna e refiz o laçamento até a forma voltar a segurar a bola.',
      nota: 'LINHA VERMELHA = FORMA CEDIDA · LINHA VERDE = FORMA RECUPERADA',
      angles: [
        { slug: 'miz-1', label: 'TOPO' },
        { slug: 'miz-2', label: 'BOLSO' }
      ]
    },
    {
      reg: 'CASO 047',
      tabLabel: '047',
      peca: 'LUVA DE REBATIDA COURO PRETO',
      servico: 'RECONSTRUÇÃO TOTAL',
      etapa: 'COURO NOVO + FORRO + LAÇAMENTO',
      resumo: 'Praticamente irrecuperável no couro original. Reconstruí com couro novo, forro e laçamento do zero, mantendo o formato da luva.',
      nota: 'RECONSTRUÇÃO DO ZERO, NA MESMA FORMA',
      angles: [
        { slug: 'bat-1', label: 'PALMA' }
      ]
    }
  ];

  var state = { caseIndex: 0, angleIndex: 0 };

  var tabsEl = document.getElementById('tabs');
  var angleGridEl = document.getElementById('angleGrid');
  var imgBefore = document.getElementById('imgBefore');
  var imgAfter = document.getElementById('imgAfter');
  var caseTag = document.getElementById('caseTag');
  var casePeca = document.getElementById('casePeca');
  var caseResumo = document.getElementById('caseResumo');
  var caseServico = document.getElementById('caseServico');
  var caseEtapa = document.getElementById('caseEtapa');
  var caseAngleCount = document.getElementById('caseAngleCount');
  var caseNota = document.getElementById('caseNota');
  var angleTag = document.getElementById('angleTag');
  var baHint = document.getElementById('baHint');
  var baSlider = document.getElementById('baSlider');
  var baFill = document.getElementById('baFill');

  function pad2(n) { return n < 10 ? '0' + n : '' + n; }

  function render() {
    var c = CASES[state.caseIndex];
    var angle = c.angles[state.angleIndex];

    imgBefore.src = 'assets/ba/' + angle.slug + '-antes.png';
    imgAfter.src = 'assets/ba/' + angle.slug + '-depois.png';

    caseTag.textContent = c.reg + ' · ' + c.servico;
    casePeca.textContent = c.peca;
    caseResumo.textContent = c.resumo;
    caseServico.textContent = c.servico;
    caseEtapa.textContent = c.etapa;
    caseAngleCount.textContent = c.angles.length + (c.angles.length === 1 ? ' ÂNGULO' : ' ÂNGULOS');
    caseNota.textContent = c.nota;
    angleTag.textContent = pad2(state.angleIndex + 1) + '/' + pad2(c.angles.length) + ' · ' + angle.label;

    renderTabs();
    renderAngles();
  }

  function renderTabs() {
    tabsEl.innerHTML = '';
    CASES.forEach(function (c, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tab' + (i === state.caseIndex ? ' active' : '');
      btn.textContent = c.tabLabel;
      btn.addEventListener('click', function () {
        if (state.caseIndex === i) return;
        state.caseIndex = i;
        state.angleIndex = 0;
        render();
      });
      tabsEl.appendChild(btn);
    });
  }

  function renderAngles() {
    var c = CASES[state.caseIndex];
    angleGridEl.innerHTML = '';
    c.angles.forEach(function (ang, i) {
      var item = document.createElement('button');
      item.type = 'button';
      item.className = 'angle-item' + (i === state.angleIndex ? ' active' : '');
      var img = document.createElement('img');
      img.src = 'assets/ba/' + ang.slug + '-depois.png';
      img.alt = ang.label;
      var label = document.createElement('span');
      label.textContent = ang.label;
      item.appendChild(img);
      item.appendChild(label);
      item.addEventListener('click', function () {
        if (state.angleIndex === i) return;
        state.angleIndex = i;
        render();
      });
      angleGridEl.appendChild(item);
    });
  }

  render();

  // ---------- comparador: auto-play em CSS, arraste assume o controle ----------

  var dragging = false;
  var hasInteracted = false;

  function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

  function pctFromEvent(e) {
    var rect = baSlider.getBoundingClientRect();
    var pct = ((e.clientX - rect.left) / rect.width) * 100;
    return clamp(pct, 1.5, 98.5);
  }

  function takeControl() {
    if (hasInteracted) return;
    hasInteracted = true;
    baFill.style.animation = 'none';
    baHint.textContent = 'ARRASTE A LINHA PARA COMPARAR';
  }

  baSlider.addEventListener('pointerdown', function (e) {
    dragging = true;
    takeControl();
    baFill.style.width = pctFromEvent(e) + '%';
    baSlider.setPointerCapture(e.pointerId);
  });

  baSlider.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    baFill.style.width = pctFromEvent(e) + '%';
  });

  function endDrag(e) {
    dragging = false;
  }

  baSlider.addEventListener('pointerup', endDrag);
  baSlider.addEventListener('pointercancel', endDrag);

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
