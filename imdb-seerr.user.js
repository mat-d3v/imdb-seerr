// ==UserScript==
// @name         IMDb to Seerr
// @name:fr      IMDb vers Seerr
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  Add a button to request movies and TV shows directly on Seerr from IMDb, with optional quality profile and per-request tag selection
// @description:fr  Ajoute un bouton pour demander films et séries sur Seerr directement depuis IMDb, avec profil qualité et choix de tag par demande
// @description:de  Fügt einen Button hinzu, um Filme und Serien direkt von IMDb auf Seerr anzufragen, mit Qualitätsprofil und Tag-Auswahl pro Anfrage
// @description:es  Añade un botón para solicitar películas y series en Seerr directamente desde IMDb, con perfil de calidad y etiqueta por solicitud
// @description:it  Aggiunge un pulsante per richiedere film e serie su Seerr direttamente da IMDb, con profilo qualità e tag per richiesta
// @description:pt  Adiciona um botão para solicitar filmes e séries no Seerr diretamente do IMDb, com perfil de qualidade e tag por pedido
// @description:ja  IMDbからSeerrに映画やドラマを直接リクエストするボタンを追加します（品質プロファイルとリクエストごとのタグ選択付き）
// @author       mat-d3v
// @match        https://www.imdb.com/title/*
// @match        https://www.imdb.com/*/title/*
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM_registerMenuCommand
// @connect      *
// @updateURL    https://raw.githubusercontent.com/mat-d3v/imdb-seerr/main/imdb-seerr.user.js
// @downloadURL  https://raw.githubusercontent.com/mat-d3v/imdb-seerr/main/imdb-seerr.user.js
// @license      MIT
// ==/UserScript==

'use strict';

const LANG = navigator.language.startsWith('fr') ? 'fr'
  : navigator.language.startsWith('de') ? 'de'
    : navigator.language.startsWith('es') ? 'es'
      : navigator.language.startsWith('it') ? 'it'
        : navigator.language.startsWith('pt') ? 'pt'
          : navigator.language.startsWith('ja') ? 'ja'
            : 'en';

const MESSAGES = {
  en: {
    added: '✅ Added to Seerr',
    exists: '⚠️ Already requested',
    available: '📺 Already available',
    notFound: '❌ Not found on Seerr',
    error: '❌ Error',
    unreachable: '❌ Cannot reach Seerr',
    button: 'Seerr',
    loading: 'Adding...',
    configure: 'Configure Seerr',
    promptUrl: 'Seerr URL (e.g. http://192.168.1.x:5055):',
    promptKey: 'API key (Seerr → Settings → General):',
    configSaved: '✅ Configuration saved',
    notConfigured: '⚙️ Set your Seerr URL and API key first',
    chooseProfileMenuMovie: 'Choose default quality profile (movies)',
    chooseProfileMenuTv: 'Choose default quality profile (TV shows)',
    chooseProfileTitleMovie: 'Default quality profile (movies)',
    chooseProfileTitleTv: 'Default quality profile (TV shows)',
    profileDefault: 'Seerr default (no override)',
    profileSaved: '✅ Profile saved',
    noProfiles: 'No profiles found',
    chooseTagTitle: 'Tag for this request',
    noTag: 'No tag',
    cancelled: 'Cancelled',
  },
  fr: {
    added: '✅ Ajouté à Seerr',
    exists: '⚠️ Déjà demandé',
    available: '📺 Déjà disponible',
    notFound: '❌ Introuvable sur Seerr',
    error: '❌ Erreur',
    unreachable: '❌ Seerr inaccessible',
    button: 'Seerr',
    loading: 'Ajout...',
    configure: 'Configurer Seerr',
    promptUrl: 'URL de Seerr (ex. http://192.168.1.x:5055) :',
    promptKey: 'Clé API (Seerr → Paramètres → Général) :',
    configSaved: '✅ Configuration enregistrée',
    notConfigured: '⚙️ Renseigne d\'abord l\'URL et la clé API Seerr',
    chooseProfileMenuMovie: 'Choisir le profil qualité par défaut (films)',
    chooseProfileMenuTv: 'Choisir le profil qualité par défaut (séries)',
    chooseProfileTitleMovie: 'Profil qualité par défaut (films)',
    chooseProfileTitleTv: 'Profil qualité par défaut (séries)',
    profileDefault: 'Défaut Seerr (aucune préférence)',
    profileSaved: '✅ Profil enregistré',
    noProfiles: 'Aucun profil trouvé',
    chooseTagTitle: 'Tag pour cette demande',
    noTag: 'Aucun tag',
    cancelled: 'Annulé',
  },
  de: {
    added: '✅ Zu Seerr hinzugefügt',
    exists: '⚠️ Bereits angefragt',
    available: '📺 Bereits verfügbar',
    notFound: '❌ Auf Seerr nicht gefunden',
    error: '❌ Fehler',
    unreachable: '❌ Seerr nicht erreichbar',
    button: 'Seerr',
    loading: 'Wird hinzugefügt...',
    configure: 'Seerr konfigurieren',
    promptUrl: 'Seerr-URL (z. B. http://192.168.1.x:5055):',
    promptKey: 'API-Key (Seerr → Einstellungen → Allgemein):',
    configSaved: '✅ Konfiguration gespeichert',
    notConfigured: '⚙️ Zuerst Seerr-URL und API-Key eintragen',
    chooseProfileMenuMovie: 'Standard-Qualitätsprofil wählen (Filme)',
    chooseProfileMenuTv: 'Standard-Qualitätsprofil wählen (Serien)',
    chooseProfileTitleMovie: 'Standard-Qualitätsprofil (Filme)',
    chooseProfileTitleTv: 'Standard-Qualitätsprofil (Serien)',
    profileDefault: 'Seerr-Standard (keine Vorgabe)',
    profileSaved: '✅ Profil gespeichert',
    noProfiles: 'Keine Profile gefunden',
    chooseTagTitle: 'Tag für diese Anfrage',
    noTag: 'Kein Tag',
    cancelled: 'Abgebrochen',
  },
  es: {
    added: '✅ Añadido a Seerr',
    exists: '⚠️ Ya solicitado',
    available: '📺 Ya disponible',
    notFound: '❌ No encontrado en Seerr',
    error: '❌ Error',
    unreachable: '❌ Seerr no disponible',
    button: 'Seerr',
    loading: 'Añadiendo...',
    configure: 'Configurar Seerr',
    promptUrl: 'URL de Seerr (ej. http://192.168.1.x:5055):',
    promptKey: 'Clave API (Seerr → Ajustes → General):',
    configSaved: '✅ Configuración guardada',
    notConfigured: '⚙️ Configura primero la URL y la clave API',
    chooseProfileMenuMovie: 'Elegir perfil de calidad por defecto (películas)',
    chooseProfileMenuTv: 'Elegir perfil de calidad por defecto (series)',
    chooseProfileTitleMovie: 'Perfil de calidad por defecto (películas)',
    chooseProfileTitleTv: 'Perfil de calidad por defecto (series)',
    profileDefault: 'Por defecto de Seerr (sin preferencia)',
    profileSaved: '✅ Perfil guardado',
    noProfiles: 'No se encontraron perfiles',
    chooseTagTitle: 'Etiqueta para esta solicitud',
    noTag: 'Sin etiqueta',
    cancelled: 'Cancelado',
  },
  it: {
    added: '✅ Aggiunto a Seerr',
    exists: '⚠️ Già richiesto',
    available: '📺 Già disponibile',
    notFound: '❌ Non trovato su Seerr',
    error: '❌ Errore',
    unreachable: '❌ Seerr non raggiungibile',
    button: 'Seerr',
    loading: 'Aggiunta...',
    configure: 'Configura Seerr',
    promptUrl: 'URL di Seerr (es. http://192.168.1.x:5055):',
    promptKey: 'Chiave API (Seerr → Impostazioni → Generale):',
    configSaved: '✅ Configurazione salvata',
    notConfigured: '⚙️ Imposta prima URL e chiave API',
    chooseProfileMenuMovie: 'Scegli profilo qualità predefinito (film)',
    chooseProfileMenuTv: 'Scegli profilo qualità predefinito (serie)',
    chooseProfileTitleMovie: 'Profilo qualità predefinito (film)',
    chooseProfileTitleTv: 'Profilo qualità predefinito (serie)',
    profileDefault: 'Predefinito Seerr (nessuna preferenza)',
    profileSaved: '✅ Profilo salvato',
    noProfiles: 'Nessun profilo trovato',
    chooseTagTitle: 'Tag per questa richiesta',
    noTag: 'Nessun tag',
    cancelled: 'Annullato',
  },
  pt: {
    added: '✅ Adicionado ao Seerr',
    exists: '⚠️ Já solicitado',
    available: '📺 Já disponível',
    notFound: '❌ Não encontrado no Seerr',
    error: '❌ Erro',
    unreachable: '❌ Seerr indisponível',
    button: 'Seerr',
    loading: 'A adicionar...',
    configure: 'Configurar Seerr',
    promptUrl: 'URL do Seerr (ex. http://192.168.1.x:5055):',
    promptKey: 'Chave API (Seerr → Definições → Geral):',
    configSaved: '✅ Configuração guardada',
    notConfigured: '⚙️ Define primeiro o URL e a chave da API',
    chooseProfileMenuMovie: 'Escolher perfil de qualidade padrão (filmes)',
    chooseProfileMenuTv: 'Escolher perfil de qualidade padrão (séries)',
    chooseProfileTitleMovie: 'Perfil de qualidade padrão (filmes)',
    chooseProfileTitleTv: 'Perfil de qualidade padrão (séries)',
    profileDefault: 'Padrão do Seerr (sem preferência)',
    profileSaved: '✅ Perfil guardado',
    noProfiles: 'Nenhum perfil encontrado',
    chooseTagTitle: 'Tag para este pedido',
    noTag: 'Sem tag',
    cancelled: 'Cancelado',
  },
  ja: {
    added: '✅ Seerrに追加しました',
    exists: '⚠️ すでにリクエスト済み',
    available: '📺 視聴可能です',
    notFound: '❌ Seerrで見つかりません',
    error: '❌ エラー',
    unreachable: '❌ Seerrに接続できません',
    button: 'Seerr',
    loading: '追加中...',
    configure: 'Seerrを設定',
    promptUrl: 'SeerrのURL (例: http://192.168.1.x:5055):',
    promptKey: 'APIキー (Seerr → 設定 → 一般):',
    configSaved: '✅ 設定を保存しました',
    notConfigured: '⚙️ まずSeerrのURLとAPIキーを設定してください',
    chooseProfileMenuMovie: 'デフォルトの品質プロファイルを選択（映画）',
    chooseProfileMenuTv: 'デフォルトの品質プロファイルを選択（ドラマ）',
    chooseProfileTitleMovie: 'デフォルトの品質プロファイル（映画）',
    chooseProfileTitleTv: 'デフォルトの品質プロファイル（ドラマ）',
    profileDefault: 'Seerrのデフォルト（指定なし）',
    profileSaved: '✅ プロファイルを保存しました',
    noProfiles: 'プロファイルが見つかりません',
    chooseTagTitle: 'このリクエストのタグ',
    noTag: 'タグなし',
    cancelled: 'キャンセルしました',
  },
};

const MSG = MESSAGES[LANG];

// --- Compat Tampermonkey (GM_*) / Safari & iOS Userscripts (GM.*) ---

function gmRequest(opts) {
  if (typeof GM_xmlhttpRequest === 'function') return GM_xmlhttpRequest(opts);
  if (typeof GM !== 'undefined' && GM.xmlHttpRequest) return GM.xmlHttpRequest(opts);
  opts.onerror && opts.onerror(new Error('No GM request API available'));
}

async function storeGet(key, def) {
  if (typeof GM_getValue === 'function') return GM_getValue(key, def);
  if (typeof GM !== 'undefined' && GM.getValue) return await GM.getValue(key, def);
  return def;
}

async function storeSet(key, value) {
  if (typeof GM_setValue === 'function') return GM_setValue(key, value);
  if (typeof GM !== 'undefined' && GM.setValue) return await GM.setValue(key, value);
}

// --- Configuration persistante (survit aux mises à jour du script) ---

const config = { url: '', key: '' };

async function loadConfig() {
  config.url = (await storeGet('seerr_url', '')) || '';
  config.key = (await storeGet('seerr_key', '')) || '';
}

function isConfigured() {
  return config.url !== '' && config.key !== '';
}

async function promptConfig() {
  const url = prompt(MSG.promptUrl, config.url || 'http://');
  if (url === null) return false;
  const key = prompt(MSG.promptKey, config.key);
  if (key === null) return false;
  config.url = url.trim().replace(/\/+$/, '');
  config.key = key.trim();
  await storeSet('seerr_url', config.url);
  await storeSet('seerr_key', config.key);
  if (isConfigured()) showNotif(MSG.configSaved, '#16a34a');
  return isConfigured();
}

// --- Profil qualité par défaut (optionnel, persistant) ---

// Les films passent par Radarr et les séries par Sonarr : chaque service a ses
// propres profils et ses propres tags, donc rien n'est partagé entre les deux.
// D'où un identifiant de service et une clé de stockage distincts par type.
const SERVICE = { movie: 'radarr', tv: 'sonarr' };
const profileKey = (mediaType) => `seerr_profile_id_${mediaType}`;

function fetchServiceOptions(mediaType, onDone) {
  const service = SERVICE[mediaType];
  if (!service) return onDone(null);
  gmRequest({
    method: 'GET',
    url: `${config.url}/api/v1/service/${service}`,
    anonymous: true,
    headers: { 'Accept': 'application/json', 'X-Api-Key': config.key },
    onload: (res) => {
      let list = [];
      try { list = JSON.parse(res.responseText); } catch (e) { }
      const server = list.find(s => s.isDefault) || list[0];
      if (!server) return onDone(null);
      gmRequest({
        method: 'GET',
        url: `${config.url}/api/v1/service/${service}/${server.id}`,
        anonymous: true,
        headers: { 'Accept': 'application/json', 'X-Api-Key': config.key },
        onload: (res2) => {
          let detail = {};
          try { detail = JSON.parse(res2.responseText); } catch (e) { }
          onDone({
            serverId: server.id,
            profiles: detail.profiles || [],
            tags: detail.tags || [],
          });
        },
        onerror: () => onDone(null),
      });
    },
    onerror: () => onDone(null),
  });
}

// Petite fenêtre de choix (remplace prompt() pour une liste d'options cliquables)
function showChoiceModal(title, items, noneLabel) {
  return new Promise((resolve) => {
    const existing = document.getElementById('is-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'is-modal';
    overlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,0.6);
      z-index: 100000; display: flex; align-items: center; justify-content: center;
      font-family: -apple-system, sans-serif;
    `;

    const panel = document.createElement('div');
    panel.style.cssText = `
      background: #1a1a1a; color: #fff; border-radius: 10px; padding: 18px;
      min-width: 240px; max-width: 320px; max-height: 70vh; overflow-y: auto;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    `;

    const h = document.createElement('div');
    h.textContent = title;
    h.style.cssText = 'font-size: 14px; font-weight: 700; margin-bottom: 12px;';
    panel.appendChild(h);

    const makeBtn = (label, value) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.style.cssText = `
        display: block; width: 100%; text-align: left; background: #2e2e2e;
        color: #fff; border: none; border-radius: 6px; padding: 8px 10px;
        margin-bottom: 6px; font-size: 13px; cursor: pointer;
      `;
      b.onmouseenter = () => { b.style.background = '#3d3d3d'; };
      b.onmouseleave = () => { b.style.background = '#2e2e2e'; };
      b.onclick = () => { overlay.remove(); resolve(value); };
      return b;
    };

    if (noneLabel) panel.appendChild(makeBtn(noneLabel, null));
    items.forEach((it) => panel.appendChild(makeBtn(it.name || it.label, it.id)));

    overlay.onclick = (e) => {
      if (e.target === overlay) { overlay.remove(); resolve(undefined); }
    };
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
  });
}

async function promptProfile(mediaType) {
  if (!isConfigured()) {
    showNotif(MSG.notConfigured, '#d97706');
    return;
  }
  const opts = await new Promise((resolve) => fetchServiceOptions(mediaType, resolve));
  if (!opts || opts.profiles.length === 0) {
    showNotif(MSG.error, '#dc2626', MSG.noProfiles);
    return;
  }
  const title = mediaType === 'tv' ? MSG.chooseProfileTitleTv : MSG.chooseProfileTitleMovie;
  const chosen = await showChoiceModal(title, opts.profiles, MSG.profileDefault);
  if (chosen === undefined) return; // fermé sans choisir : on ne change rien
  await storeSet(profileKey(mediaType), chosen === null ? '' : String(chosen));
  showNotif(MSG.profileSaved, '#16a34a');
}

if (typeof GM_registerMenuCommand === 'function') {
  GM_registerMenuCommand(MSG.configure, () => promptConfig());
  GM_registerMenuCommand(MSG.chooseProfileMenuMovie, () => promptProfile('movie'));
  GM_registerMenuCommand(MSG.chooseProfileMenuTv, () => promptProfile('tv'));
}

// --- Page IMDb : identifiant et type de média ---

function getPageInfo() {
  const m = location.pathname.match(/\/title\/(tt\d+)/);
  if (!m) return null;
  let imdbId = m[1];
  let type = 'movie';
  try {
    const ld = document.querySelector('script[type="application/ld+json"]');
    if (ld) {
      const data = JSON.parse(ld.textContent);
      const t = data['@type'];
      if (t === 'TVSeries') {
        type = 'tv';
      } else if (t === 'TVEpisode') {
        // Page d'épisode : on remonte à la série
        type = 'tv';
        const parentUrl = data.partOfSeries && data.partOfSeries.url;
        const pm = parentUrl && parentUrl.match(/tt\d+/);
        if (pm) imdbId = pm[0];
      }
    }
  } catch (e) { }
  return { imdbId, type };
}

function getTitle() {
  const el = document.querySelector('h1[data-testid="hero__pageTitle"]');
  return el ? el.textContent.trim() : '';
}

// --- Notifications ---

function showNotif(msg, color, subtitle) {
  const existing = document.getElementById('is-notif');
  if (existing) existing.remove();
  const n = document.createElement('div');
  n.id = 'is-notif';
  n.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    max-width: 320px;
    background: ${color};
    color: white;
    padding: 12px 18px;
    border-radius: 10px;
    z-index: 99999;
    font-family: -apple-system, sans-serif;
    box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.2s ease, transform 0.2s ease;
  `;
  const main = document.createElement('div');
  main.textContent = msg;
  main.style.cssText = 'font-size: 13px; font-weight: 600; line-height: 1.3;';
  n.appendChild(main);
  if (subtitle) {
    const sub = document.createElement('div');
    sub.textContent = subtitle;
    sub.style.cssText = 'font-size: 12px; font-weight: 400; opacity: 0.85; margin-top: 2px; line-height: 1.3;';
    n.appendChild(sub);
  }
  document.body.appendChild(n);
  requestAnimationFrame(() => {
    n.style.opacity = '1';
    n.style.transform = 'translateY(0)';
  });
  setTimeout(() => {
    n.style.opacity = '0';
    n.style.transform = 'translateY(8px)';
    setTimeout(() => n.remove(), 300);
  }, 3500);
}

// --- États visuels du bouton ---

function setBtnState(btn, state) {
  btn.style.opacity = '1';
  btn.style.cursor = 'pointer';
  if (state === 'requested') {
    btn.textContent = '✓ ' + MSG.button;
    btn.style.background = '#16a34a';
    btn.style.color = '#fff';
    btn.dataset.state = 'requested';
  } else if (state === 'available') {
    btn.textContent = '✓ ' + MSG.button;
    btn.style.background = '#3b82f6';
    btn.style.color = '#fff';
    btn.dataset.state = 'available';
  } else {
    btn.textContent = '+ ' + MSG.button;
    btn.style.background = '#f59e0b';
    btn.style.color = '#000';
    btn.dataset.state = 'idle';
  }
}

function shakeBtn(btn) {
  btn.style.transition = 'transform 0.1s ease';
  const shake = [0, -4, 4, -4, 4, -2, 2, 0];
  shake.forEach((x, i) => {
    setTimeout(() => { btn.style.transform = `translateX(${x}px)`; }, i * 60);
  });
  setTimeout(() => { btn.style.transform = ''; }, shake.length * 60);
}

// mediaInfo.status Seerr : 4 = partiellement dispo, 5 = disponible
function mediaState(data) {
  const status = data.mediaInfo?.status || 0;
  if (status >= 4) return 'available';
  const requests = data.mediaInfo?.requests || [];
  if (requests.some(r => !r.is4k && r.status !== 3)) return 'requested';
  return 'idle';
}

// --- Appels Seerr ---

function seerrGet(path, onDone, onFail) {
  gmRequest({
    method: 'GET',
    url: `${config.url}/api/v1${path}`,
    anonymous: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Api-Key': config.key
    },
    onload: (res) => {
      let data = {};
      try { data = JSON.parse(res.responseText); } catch (e) { }
      onDone(res.status, data);
    },
    onerror: onFail
  });
}

// Résolution ID IMDb -> ID TMDB via la recherche Seerr (format "imdb:tt...")
const resolveCache = {};

function resolveTmdb(info, onDone, onFail) {
  const cached = resolveCache[info.imdbId];
  if (cached) return onDone(cached);
  seerrGet(`/search?query=${encodeURIComponent('imdb:' + info.imdbId)}&page=1`, (status, data) => {
    if (status !== 200) return onDone(null, status, data);
    const results = data.results || [];
    const hit = results.find(r => r.mediaType === info.type)
      || results.find(r => r.mediaType === 'movie' || r.mediaType === 'tv');
    if (!hit) return onDone(null, status, data);
    const resolved = { type: hit.mediaType, id: hit.id };
    resolveCache[info.imdbId] = resolved;
    onDone(resolved);
  }, onFail);
}

// Affiche l'état (demandé / disponible) dès le chargement de la page
function checkInitialState(info, btn) {
  resolveTmdb(info, (resolved) => {
    if (!resolved) return;
    seerrGet(`/${resolved.type}/${resolved.id}`, (status, data) => {
      if (status === 200) setBtnState(btn, mediaState(data));
    }, () => { });
  }, () => { });
}

function requestMedia(info, btn) {
  // Le bouton vit désormais dans le <h1> : on relit le titre mis en cache
  // à l'insertion plutôt que h1.textContent, qui inclurait le bouton lui-même.
  const title = btn.dataset.title || '';
  btn.textContent = MSG.loading;
  btn.style.opacity = '0.7';
  btn.style.cursor = 'wait';

  resolveTmdb(info, (resolved, failStatus, failData) => {
    if (!resolved) {
      setBtnState(btn, 'idle');
      if (failStatus === 401 || failStatus === 403) {
        showNotif(MSG.error, '#dc2626', failData?.message || `Code ${failStatus}`);
        promptConfig();
      } else {
        showNotif(MSG.notFound, '#dc2626');
      }
      return;
    }

    seerrGet(`/${resolved.type}/${resolved.id}`, async (status, data) => {
      if (status === 401 || status === 403) {
        setBtnState(btn, 'idle');
        showNotif(MSG.error, '#dc2626', data.message || `Code ${status}`);
        promptConfig();
        return;
      }

      const state = mediaState(data);

      if (state === 'available') {
        setBtnState(btn, 'available');
        shakeBtn(btn);
        showNotif(MSG.available, '#3b82f6', title);
        return;
      }

      if (state === 'requested') {
        setBtnState(btn, 'requested');
        shakeBtn(btn);
        showNotif(MSG.exists, '#d97706', title);
        return;
      }

      // Tag demandé à chaque fois (jamais mémorisé), contrairement à
      // l'URL/clé/profil qui sont persistants. Les options viennent du service
      // correspondant au type : Radarr pour un film, Sonarr pour une série.
      const opts = await new Promise((resolve) => fetchServiceOptions(resolved.type, resolve));
      let tagId = null;
      if (opts && opts.tags.length > 0) {
        const chosen = await showChoiceModal(MSG.chooseTagTitle, opts.tags, MSG.noTag);
        if (chosen === undefined) {
          setBtnState(btn, 'idle');
          showNotif(MSG.cancelled, '#6b7280', title);
          return;
        }
        tagId = chosen;
      }

      // profileId : relu à chaque demande (persistant, modifiable via le menu),
      // propre au type de média. Seerr accepte profileId directement dans le
      // corps de /api/v1/request.
      const savedProfileId = await storeGet(profileKey(resolved.type), '');

      const body = { mediaType: resolved.type, mediaId: resolved.id };
      if (resolved.type === 'tv') {
        // Toutes les saisons (hors épisodes spéciaux, saison 0)
        const seasons = (data.seasons || [])
          .map(s => s.seasonNumber)
          .filter(n => n > 0);
        body.seasons = seasons.length ? seasons : [1];
      }
      if (tagId) body.tags = [tagId];
      if (savedProfileId) body.profileId = parseInt(savedProfileId);

      gmRequest({
        method: 'POST',
        url: `${config.url}/api/v1/request`,
        anonymous: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Api-Key': config.key
        },
        data: JSON.stringify(body),
        onload: (res2) => {
          let data2 = {};
          try { data2 = JSON.parse(res2.responseText); } catch (e) { }
          if (res2.status === 201) {
            setBtnState(btn, 'requested');
            showNotif(MSG.added, '#16a34a', title);
          } else {
            setBtnState(btn, 'idle');
            showNotif(MSG.error, '#dc2626', data2.message || `Code ${res2.status}`);
          }
        },
        onerror: () => {
          setBtnState(btn, 'idle');
          showNotif(MSG.unreachable, '#dc2626');
        }
      });
    }, () => {
      setBtnState(btn, 'idle');
      showNotif(MSG.unreachable, '#dc2626');
    });
  }, () => {
    setBtnState(btn, 'idle');
    showNotif(MSG.unreachable, '#dc2626');
  });
}

// --- Insertion du bouton (IMDb navigue parfois sans recharger la page) ---

function ensureButton() {
  const info = getPageInfo();
  if (!info) return;
  const h1 = document.querySelector('h1[data-testid="hero__pageTitle"]');
  if (!h1) return;

  const existing = document.getElementById('is-btn');
  if (existing) {
    if (existing.dataset.imdb === info.imdbId) return;
    existing.remove();
  }

  // Le titre doit être lu avant d'insérer le bouton : celui-ci vit à
  // l'intérieur du <h1>, donc h1.textContent l'inclurait ensuite.
  const title = getTitle();

  const btn = document.createElement('a');
  btn.id = 'is-btn';
  btn.dataset.imdb = info.imdbId;
  btn.dataset.title = title;
  btn.style.cssText = `
    display: inline-flex;
    align-items: center;
    margin-left: 12px;
    padding: 3px 9px;
    border-radius: 3px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    letter-spacing: 0.5px;
    font-family: -apple-system, sans-serif;
    vertical-align: middle;
    line-height: 1.4;
    transition: background 0.2s ease, opacity 0.2s ease;
  `;
  setBtnState(btn, 'idle');

  btn.onmouseenter = () => { if (btn.style.cursor !== 'wait') btn.style.opacity = '0.85'; };
  btn.onmouseleave = () => { btn.style.opacity = '1'; };
  btn.onclick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (btn.style.cursor === 'wait') return;
    // Maj+clic : reconfigurer (utile sur desktop ; sur iOS la config
    // se déclenche seule tant qu'elle est vide ou invalide)
    if (e.shiftKey) { promptConfig(); return; }
    if (!isConfigured()) {
      showNotif(MSG.notConfigured, '#d97706');
      const ok = await promptConfig();
      if (!ok) return;
    }
    requestMedia(info, btn);
  };

  h1.appendChild(btn);

  if (isConfigured()) checkInitialState(info, btn);
}

async function init() {
  await loadConfig();
  ensureButton();
  // Observer permanent : IMDb recompose son DOM et navigue en SPA
  const obs = new MutationObserver(() => ensureButton());
  obs.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
