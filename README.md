# IMDb to Seerr

[🇫🇷 Français](README.fr.md) | [🇬🇧 English](README.md)

Adds a **+ Seerr** button to IMDb title pages to request movies and TV shows in one click on your [Seerr](https://seerr.dev) server, the media request manager for Plex, Jellyfin and Emby (successor to Overseerr and Jellyseerr).

Sister project: [letterboxd-seerr](https://github.com/mat-d3v/letterboxd-seerr) does the same on Letterboxd.

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/mat-d3v/imdb-seerr@main/assets/imdb-seerr-presentation.mp4"><img src="assets/demo.gif" width="540" alt="Demo: on an IMDb TV series page, the cursor clicks the orange + Seerr button next to the title. A panel shows the request sent to Seerr with Season 1, 2 and 3 selected and Specials excluded; the button turns green (✓ Seerr) and a notification confirms: Added to Seerr, The Quiet Signal."></a>
</p>

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/mat-d3v/imdb-seerr@main/assets/imdb-seerr-presentation.mp4"><b>▶️ Watch the presentation video</b></a> (2:29, English, with captions)<br>
  <sub><a href="assets/video-transcript.md">Descriptive transcript</a></sub>
</p>

<p align="center">
  <a href="https://raw.githubusercontent.com/mat-d3v/imdb-seerr/main/imdb-seerr.user.js"><img src="https://img.shields.io/badge/Install-userscript-f97316?style=for-the-badge" alt="Install the script"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="License MIT"></a>
</p>

## Supported languages

🇬🇧 English, 🇫🇷 French, 🇩🇪 German, 🇪🇸 Spanish, 🇮🇹 Italian, 🇵🇹 Portuguese, 🇯🇵 Japanese

The script automatically detects your browser language.

## Features

- One-click request from any IMDb title page: **movies and TV shows**
- TV shows are requested with all their seasons (specials excluded)
- On an episode page, the request targets the parent series
- Button shows the current state as soon as the page loads: green if already requested, blue if already available in your library
- Checks for duplicates and availability before sending the request
- Optional default quality profile, picked once from your own Seerr instance and reused automatically on every request. Movies (Radarr) and TV shows (Sonarr) are set separately
- Tag picker on every request, fetched live from Seerr, never remembered, so you can pick a different tag (or none) each time
- Persistent configuration (survives script updates) with automatic updates from GitHub
- Animated feedback notifications with the title
- Works on any browser with a userscript manager, including Safari on iPhone/iPad

## How it works

IMDb uses its own IDs (`tt0137523`) while Seerr works with TMDB IDs. The script resolves one into the other through your own Seerr instance (`search?query=imdb:tt...`): no TMDB API key needed, nothing else to configure.

## Requirements

Your Seerr instance must be reachable from your browser, either on your local network or via a VPN like Tailscale.

> **Note:** `GM_xmlhttpRequest` (used by Tampermonkey) bypasses browser mixed content restrictions, so HTTP works fine. If you use `fetch`-based extensions, HTTPS will be required.

## Privacy

Your Seerr URL and API key are stored only in your userscript manager's storage, on your device. The script only talks to your own Seerr server: no third-party server, no analytics.

## Installation

1. Install a userscript manager:
   - Safari (Mac): [Tampermonkey](https://apps.apple.com/app/tampermonkey/id6738342400) *(recommended)*
   - Safari (Mac/iPhone/iPad): [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)
   - Chrome/Firefox: [Tampermonkey](https://www.tampermonkey.net)

2. Click [here](https://raw.githubusercontent.com/mat-d3v/imdb-seerr/main/imdb-seerr.user.js) to install the script

3. Open any IMDb title page and click the `+ Seerr` button: the script asks for your Seerr URL (e.g. http://192.168.1.x:5055) and your API key (Seerr, Settings, General, API Key) on first use. That's it.

   The first time, Tampermonkey asks for permission to connect to your Seerr server (a "cross-origin" request): choose **Always allow domain**, otherwise the script can't reach Seerr.

To change the configuration later: use the "Configure Seerr" entry in the Tampermonkey menu, or Shift+click the button.

If your Seerr instance has quality profiles configured, use the "Choose default quality profile" entries in the Tampermonkey menu to pick one. It's saved and applied to every request automatically. Movies and TV shows are set separately, since they go through different services (Radarr and Sonarr), each with its own profiles. Pick "Seerr default" to stop overriding it.

## Usage

Open any title page on IMDb. A `+ Seerr` button appears next to the title:

- **Orange `+ Seerr`**: click to request the movie or show without leaving the page
- **Green `✓ Seerr`**: already requested
- **Blue `✓ Seerr`**: already available in your library

If your Seerr instance has tags configured on its Radarr connection (movies) or Sonarr connection (TV shows), a small window pops up on every new request letting you pick one (or none). This choice is never remembered, so you can tag differently each time.

## iOS / iPadOS

The script works in Safari on iPhone and iPad with the [Userscripts](https://apps.apple.com/app/userscripts/id1463298887) app (free). Your Seerr instance just needs to be reachable from the device, for example through Tailscale. Configuration happens on first tap, same as on desktop.

## Troubleshooting

- **The button doesn't appear**: make sure the script is enabled in your userscript manager and reload the page. IMDb changes its layout regularly: if the button still doesn't show up on a title page, please open an issue.
- **"❌ Error" followed by the setup prompt (code 401 or 403)**: the API key is wrong or was regenerated in Seerr. Enter it again.
- **"❌ Cannot reach Seerr"**: the URL is wrong, or Seerr isn't reachable from this device (away from home, check your VPN). Open the URL in your browser to test it. If you denied Tampermonkey's permission prompt, allow the domain in the script's settings.

## Known limitations

- For a TV show already partially available, the button shows "available"; use Seerr itself to request specific missing seasons

## License

[MIT](LICENSE)
