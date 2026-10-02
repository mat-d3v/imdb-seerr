# IMDb vers Seerr

[🇫🇷 Français](README.fr.md) | [🇬🇧 English](README.md)

Projet frère de [letterboxd-seerr](https://github.com/mat-d3v/letterboxd-seerr), pour IMDb.

<p align="center">
  <img src="assets/demo.gif" width="540" alt="Démo : sur la page IMDb d'une série, le curseur clique sur le bouton orange + Seerr à côté du titre. Un panneau montre la demande envoyée à Seerr avec les saisons 1, 2 et 3, épisodes spéciaux exclus ; le bouton passe au vert (✓ Seerr) et une notification confirme : Added to Seerr, The Quiet Signal.">
</p>

🎬 **[Vidéo de présentation](assets/imdb-seerr-presentation.mp4)** (2:29, en anglais, sous-titrée) · [Transcription descriptive](assets/video-transcript.md) (en anglais)

## Langues supportées

🇬🇧 Anglais, 🇫🇷 Français, 🇩🇪 Allemand, 🇪🇸 Espagnol, 🇮🇹 Italien, 🇵🇹 Portugais, 🇯🇵 Japonais

Le script détecte automatiquement la langue de votre navigateur.

## Fonctionnalités

- Demande en un clic depuis n'importe quelle page IMDb : **films et séries**
- Les séries sont demandées avec toutes leurs saisons (épisodes spéciaux exclus)
- Sur une page d'épisode, la demande cible la série parente
- Le bouton affiche l'état dès le chargement de la page : vert si déjà demandé, bleu si déjà disponible dans votre bibliothèque
- Vérification des doublons et de la disponibilité avant l'envoi de la demande
- Profil qualité par défaut optionnel, choisi une fois depuis votre propre Seerr et réappliqué automatiquement à chaque demande. Les films (Radarr) et les séries (Sonarr) se règlent séparément
- Choix du tag à chaque demande, récupéré en direct depuis Seerr et jamais mémorisé, pour pouvoir taguer différemment à chaque fois
- Configuration persistante (survit aux mises à jour du script) avec mises à jour automatiques depuis GitHub
- Notifications animées avec le titre
- Fonctionne sur tous les navigateurs avec un gestionnaire de scripts, y compris Safari sur iPhone/iPad

## Comment ça marche

IMDb utilise ses propres identifiants (`tt0137523`) alors que Seerr travaille avec les IDs TMDB. Le script fait la conversion via votre propre instance Seerr (`search?query=imdb:tt...`) : aucune clé API TMDB nécessaire, rien de plus à configurer.

## Prérequis

Votre instance Seerr doit être accessible depuis votre navigateur, que ce soit sur votre réseau local ou via un VPN comme Tailscale.

> **Note :** `GM_xmlhttpRequest` (utilisé par Tampermonkey) contourne les restrictions mixed content du navigateur, donc HTTP fonctionne parfaitement. Si vous utilisez une extension basée sur `fetch`, HTTPS sera nécessaire.

## Installation

1. Installez un gestionnaire de userscripts :
   - Safari (Mac) : [Tampermonkey](https://apps.apple.com/fr/app/tampermonkey/id6738342400) *(recommandé)*
   - Safari (Mac/iPhone/iPad) : [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)
   - Chrome/Firefox : [Tampermonkey](https://www.tampermonkey.net)

2. Cliquez [ici](https://raw.githubusercontent.com/mat-d3v/imdb-seerr/main/imdb-seerr.user.js) pour installer le script

3. Ouvrez n'importe quelle page IMDb et cliquez sur le bouton `+ Seerr` : le script vous demande l'URL de votre Seerr (ex : http://192.168.1.x:5055) et votre clé API (Seerr, Paramètres, Général, Clé API) à la première utilisation. C'est tout.

Pour modifier la configuration plus tard : entrée « Configurer Seerr » dans le menu Tampermonkey, ou Maj+clic sur le bouton.

Si votre Seerr a des profils qualité configurés, utilisez les entrées « Choisir le profil qualité par défaut » du menu Tampermonkey pour en sélectionner un. Il est enregistré et appliqué automatiquement à chaque demande. Films et séries se règlent séparément, car ils passent par des services différents (Radarr et Sonarr), chacun avec ses propres profils. Choisissez « Défaut Seerr » pour ne plus rien imposer.

## Utilisation

Ouvrez n'importe quelle page titre sur IMDb. Un bouton `Seerr` apparaît à côté du titre :

- **`+ Seerr` orange** : cliquez pour demander le film ou la série sans quitter la page
- **`✓ Seerr` vert** : déjà demandé
- **`✓ Seerr` bleu** : déjà disponible dans votre bibliothèque

Si votre Seerr a des tags configurés sur sa connexion Radarr (films) ou Sonarr (séries), une petite fenêtre s'ouvre à chaque nouvelle demande pour en choisir un (ou aucun). Ce choix n'est jamais mémorisé, vous pouvez donc taguer différemment à chaque fois.

## iOS / iPadOS

Le script fonctionne dans Safari sur iPhone et iPad avec l'app [Userscripts](https://apps.apple.com/app/userscripts/id1463298887) (gratuite). Il suffit que votre instance Seerr soit joignable depuis l'appareil, par exemple via Tailscale. La configuration se fait au premier appui, comme sur ordinateur.

## Limitations connues

- Pour une série déjà partiellement disponible, le bouton affiche « disponible » ; passez par Seerr pour demander des saisons manquantes précises
- IMDb change régulièrement la structure de ses pages ; si le bouton n'apparaît plus, ouvrez une issue

## Licence

MIT
