# IMDb to Seerr — presentation video

Descriptive transcript (English). It contains everything that is said and everything important that is shown, so the video can be followed without sound or without the picture.

Duration: 2:29 · Narration: synthetic English voice · Background music and interface sounds only, no other speech. The titles shown ("The Quiet Signal", "Neon Harbor", "Paper Lanterns") are fictional examples.

## 0:01 — Introduction: the manual way

*On screen:* A browser shows an IMDb-style page for a fictional TV series, "The Quiet Signal" (2021–2024). The cursor clicks the yellow "+ Watchlist" button, which becomes "✓ Watchlist". A second tab opens on a Seerr server at 192.168.1.20:5055; the cursor types "The Quiet Signal" in the search box, results appear, and the cursor clicks "Request" on the first poster, which turns into "Requested". The window shrinks while copies pile up behind it, under the large words "Every single time." The windows fly away and the question "What if it took one click?" appears word by word, "one click?" in orange.

**Narrator:** You've just found a great show on IMDb. Now: open Seerr in a new tab, search for it, and request it. Every single time. What if it took one click?

## 0:13 — The userscript

*On screen:* A large orange "+ Seerr" button pops up. The cursor clicks it: it shows "Adding...", then turns green with a check mark, "✓ Seerr", and moves to the top of the screen. A card slides in: "IMDb → Seerr", repository imdb-seerr, version 1.1.0; the tags "Movies" and "TV shows" appear, and an orange "+ Seerr" button pops in next to the title "The Quiet Signal". Badges appear below: "Free", "Open source · MIT", "Userscript".

**Narrator:** Meet IMDb to Seerr: a free, open-source userscript that adds a Seerr button, right on IMDb, for movies and TV shows.

## 0:23 — Where Seerr fits

*On screen:* A diagram titled "Where Seerr fits": "Your browser (+ Seerr button)" connects to "Seerr (request manager)", which branches to "Radarr (movies)" and "Sonarr (TV shows)"; both lead to "Your library (Plex · Jellyfin · Emby)". Glowing dots travel along the lines as each part is named.

**Narrator:** Seerr handles media requests for your home server, and sends them to Radarr for movies, and Sonarr for TV shows.

## 0:31 — Chapter 1 · In action

*On screen:* Chapter label "01 In action". On the left, a browser shows the "The Quiet Signal" series page; on the right, five key points appear one after the other: "Next to the title, on every IMDb title page"; "One click: ✓ No redirect, ✓ No search"; "Optional tag: pick one, or none, each time"; "All seasons: specials excluded"; "Episode page: requests the whole series". The orange "+ Seerr" button appears right after the title and the view zooms in. The cursor clicks it and it reads "Adding...". A window titled "Tag for this request" lists "No tag", "kids", "binge-watch" and "4k-fans"; the cursor picks "binge-watch". A panel "Request sent to Seerr — The Quiet Signal" lights up Season 1, Season 2 and Season 3 in green while "Specials" is struck through. The button turns green ("✓ Seerr") and a green notification says "✅ Added to Seerr — The Quiet Signal". The page dims and a diagram shows an episode page ("S2.E5 · Static") pointing to "Requested: The Quiet Signal, the whole series".

**Narrator:** On any IMDb title page, the button sits right next to the title. One click, and the request goes straight to Seerr. No redirect. No search. Using tags? Pick one, or none, for each request. Series are requested with all their seasons, specials excluded. A notification confirms it, with the title. And on an episode page, it requests the whole series.

## 0:58 — Chapter 2 · Smart by default: button states

*On screen:* Chapter label "02 Smart by default". Title "Status at a glance — shown as soon as the page loads". Three large buttons, each with a written label: orange "+ Seerr", "Ready to request (one click sends it)"; green "✓ Seerr", "Already requested (no duplicates)"; blue "✓ Seerr", "In your library (ready to watch)". The cursor clicks the green button: it shakes and an amber notification says "⚠️ Already requested — The Quiet Signal".

**Narrator:** The button shows the status as soon as the page loads. Orange: ready to request. Green: already requested. Blue: already in your library. Duplicates are checked before anything is sent.

## 1:12 — From IMDb ID to TMDB ID

*On screen:* Title "From IMDb ID to TMDB ID". The IMDb ID "tt0137523" goes through a box labelled "Your Seerr" where the query "search?query=imdb:tt0137523" is typed, and comes out as the TMDB ID "550". Two badges appear: "✓ No TMDB API key" and "✓ Nothing else to set up".

**Narrator:** IMDb uses its own IDs. The script converts them to TMDB IDs through your own Seerr: no TMDB API key, and nothing else to set up.

## 1:24 — Chapter 3 · Built in: quality profiles and updates

*On screen:* Chapter label "03 Built in". A window "Default profile · movies" lists "Seerr default (no override)", "HD-1080p", "Ultra-HD" and "HD-720p"; the cursor picks "HD-1080p" and a notification says "✅ Profile saved". On the right, under "Every request uses it", two movies (Paper Lanterns, Neon Harbor) get an "HD-1080p" stamp. A second card appears, "TV shows · Sonarr: HD-720p", and the series The Quiet Signal gets an "HD-720p" stamp. Next, a version chip changes from "imdb-seerr v1.0.0" to "v1.1.0" above a "Your settings" card (Seerr URL, hidden API key, movies profile HD-1080p, TV shows profile HD-720p) that stays unchanged; badges: "✓ Settings kept" and "Auto-updates from GitHub".

**Narrator:** Pick a default quality profile once, and every request uses it. Movies and TV shows each get their own. Settings survive updates, and the script updates itself from GitHub.

## 1:37 — Seven languages

*On screen:* Title "Speaks your language — detected automatically from your browser". Seven green notifications, each labelled with its language: English "Added to Seerr", Français "Ajouté à Seerr", Deutsch "Zu Seerr hinzugefügt", Español "Añadido a Seerr", Italiano "Aggiunto a Seerr", Português "Adicionado ao Seerr", 日本語 (Japanese) "Seerrに追加しました". A chip "Browser language: fr-FR" appears and the French one is highlighted.

**Narrator:** Seven languages, detected from your browser.

## 1:41 — Works where you browse

*On screen:* Title "Works where you browse". A laptop, a tablet and a phone each show the series page with the orange "+ Seerr" button. Labels: "Chrome · Firefox · Safari, with Tampermonkey" under the laptop, with a "Userscript manager" badge on its toolbar; "iPhone & iPad, Safari + the Userscripts app" under the tablet and phone.

**Narrator:** Any browser with a userscript manager, even Safari on iPhone and iPad.

## 1:48 — Chapter 4 · Get started: requirement

*On screen:* Chapter label "04 Get started". Title "Reachable from your browser". A house outline contains "Your browser (at home)" linked by a green line, labelled "Home network", to "Seerr, 192.168.1.20:5055". Outside the house, "Your phone (away from home)" reaches the server through a dashed line with a padlock, labelled "VPN, e.g. Tailscale".

**Narrator:** Your Seerr just needs to be reachable from your browser: at home, or through a VPN like Tailscale.

## 1:55 — Setup in three steps

*On screen:* Title "Setup takes a minute" with a stopwatch icon. Three numbered cards: 1, "Install a userscript manager": Tampermonkey (Chrome · Firefox · Safari) and Userscripts (Safari on Mac, iPhone, iPad). 2, "Install the script": imdb-seerr.user.js, install link in the README, and an "Install" button that becomes "✓ Installed". 3, "Click + Seerr and enter your details": a dialog where "Seerr URL" receives http://192.168.1.20:5055 and "API key (Seerr → Settings → General)" receives a hidden key. Green check marks appear on the three cards. Below: "⇧ Shift + click + Seerr → Change settings".

**Narrator:** Setup takes a minute. Install a userscript manager, like Tampermonkey, or Userscripts. Install the script. Then click the button, and enter your Seerr URL and API key. That's it. Shift-click the button any time to change your settings.

## 2:12 — Outro

*On screen:* A card "IMDb → Seerr" (movies and TV shows) with the link github.com/mat-d3v/imdb-seerr, which gets underlined. Badges: "Free", "Open source", "MIT License". A second card appears: "Sister project: Letterboxd → Seerr, github.com/mat-d3v/letterboxd-seerr". Finally the orange "+ Seerr" button is clicked once more and turns green, above the line "Made by mat-d3v · Free & open source". Fade to black.

**Narrator:** IMDb to Seerr. Free, open source, and MIT licensed. Find it on GitHub. And if you use Letterboxd too, try its sister project: Letterboxd to Seerr.

---

Project: https://github.com/mat-d3v/imdb-seerr · Sister project: https://github.com/mat-d3v/letterboxd-seerr
