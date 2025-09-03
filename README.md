# Jutul PWA – OneSignal (enkleste løsning)

Dette er en *forenklet* versjon som bruker **OneSignal** til web‑push. Du slipper VAPID‑nøkler, backend og lagring.
Du sender varsler fra OneSignal‑dashbordet – brukerne abonnerer fra appen.

## Slik kommer du i gang (5–10 min)

1) Lag konto på https://onesignal.com og **Create App** → velg **Web Push**.
2) Website setup:
   - Site name: *Jutul Hockey*
   - Site URL: `https://<ditt-netlify-navn>.netlify.app`
   - (iOS) Toggle på **iOS Web Push (PWA)** – følg veiviseren.
3) Når appen er laget: kopier **App ID**.
4) I denne koden: åpne `public/app.js` og bytt `YOUR-ONESIGNAL-APP-ID` med ditt App ID.
5) Deploy til Netlify (bare push til GitHub).
6) Test:
   - Desktop/Android: Åpne siden → **Aktiver varsler**.
   - iPhone: Åpne i Safari → **Legg til på Hjem‑skjerm** → åpne fra ikonet → **Aktiver varsler**.

## Sende varsler
- Gå til OneSignal Dashboard → din app → **Messages** → **New Push** → send til All Users.

## Viktige filer
- `public/OneSignalSDKWorker.js` og `public/OneSignalSDKUpdaterWorker.js` må ligge i webrot (public/).
- `public/manifest.json` + ikoner brukes for PWA/A2HS.

## Hvorfor OneSignal?
- Du slipper alt oppsettet med VAPID, service‑workerlogikk og lagring av subscriptions.
- Fungerer på iOS (PWA), Android og desktop.