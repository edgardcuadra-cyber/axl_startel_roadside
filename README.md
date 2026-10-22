# StarAuto + Genesys Cloud — demo app

Concept mock of the StarAuto member app with Genesys Cloud built in, for a technology demonstration. Static site, installable as a PWA, hosted on GitHub Pages.

All member data is fictional. Not a StarAuto production app.

## What's live and what's mocked

| Feature | Default | Live option |
|---|---|---|
| Sign-in, home, rewards | Mocked | — |
| **Roadside → Submit Request** | Simulated call | Customer-first callback to the roadside queue (`roadsideQueueId`, falls back to `queueId`) |
| **MyStarAuto → Contact Us → Call Me** | Simulated call | Customer-first callback to the member care queue (`queueId`) |
| **MyStarAuto → Contact Us → Chat With Us** | Mocked chat | Genesys Web Messenger, launcher hidden until the card is tapped |

Each callback sends `data` with `customerName`, `memberNumber`, `membershipLevel`, `vehicle`, `requestedFrom` and `targetQueue` (the queue name, for the inbound flow's Transfer to ACD). Roadside adds `rsaRequestId`, `rsaStatus`, `locationType`, `breakdownAddress`, `gpsLat`, `gpsLng`, `vehicleType`, `vehicleYear`, `vehicleMake`, `vehicleModel`, `vehicleColor`, `vehicleDriveLine`.

If a live call fails, the app falls back to the mock.

## Files

- `index.html` — the whole app (phone UI, going-live plan)
- Map on the breakdown-location screen: Leaflet from unpkg, tiles from OpenStreetMap (needs a connection)
- `config.js` — demo org values. **Edit this file only.**
- `manifest.webmanifest`, `sw.js`, `icons/` — PWA install and offline cache

## Setup

1. Fill in `config.js`:
   - `mode: "live"`, `region`, `queueId`/`queueName`, `roadsideQueueId`/`roadsideQueueName`, optional `clientId`, `callerId`
   - `webMessenger.chat: "web"`, `webMessenger.deploymentId`
   - The phone number to call is **not** in the repo. On the phone: MyStarAuto → Security & App Settings → enter the number → Save (stored on that device only).
2. Genesys Cloud demo org:
   - OAuth client (Code Authorization + PKCE, or Implicit). Redirect URI = the exact Pages URL.
   - Role with `Conversation > Callback > Create` for the presenter user.
   - Queue **StarAuto Demo – Member Care** with demo agents, plus a callback script that reads the participant attributes.
   - Messenger configuration: launcher visibility = **Hide until triggered by business logic**.
   - Messenger deployment: allowed domains include the Pages domain.
   - Inbound message flow that reads the custom attributes and routes to the demo queue or AI agent.
3. GitHub: Settings → Pages → deploy from branch `main`, folder `/ (root)`.
4. When you push changes, bump `CACHE` in `sw.js` so installed phones refresh.

## Install on a phone

- **iPhone (Safari):** open the Pages URL → Share → Add to Home Screen
- **Android (Chrome):** open the Pages URL → menu → Install app

On the phone the app runs full screen. On a laptop the page shows the phone frame, the event inspector and the going-live plan. Add `?app=1` to force phone mode or `?desk=1` to force laptop mode.

## Presenter tools

**MyStarAuto → Security & App Settings** opens Presenter tools: mode, Genesys sign-in status, queues, Web Messenger status, the phone number to call (saved on the device), Connect Genesys or paste a token, and reset.

## Notes

- No secrets in this repo. PKCE and Implicit need only the client ID.
- Unless the GitHub org is on Enterprise Cloud with private Pages, the Pages URL is reachable by anyone who has it, even from a private repo.
