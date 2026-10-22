// Demo settings. Nothing here is a secret: the OAuth client uses PKCE or implicit grant (no client secret).
// The phone number to call is NOT stored here. Enter it on the phone in
// MyStarAuto > Security & App Settings > Presenter tools (saved on that device only).
window.DEMO_CONFIG = {
  // "mock" = everything simulated. "live" = Call Me and Submit Request create real callbacks.
  mode: "live",

  // Genesys Cloud region domain (demo org is US East)
  region: "mypurecloud.com",

  // OAuth client on the demo org (blank = paste a token in Presenter tools)
  grant: "pkce",                 // "pkce" or "implicit"
  clientId: "4badbcd5-a6c9-4ce6-910e-1cc0c58d71f0",
  redirectUri: "",               // blank = this page's URL

  // Contact Us > Call Me
  queueId: "edf6c944-ecb2-47a9-aa98-6e47e4f995b9",
  queueName: "demo_starauto_mobileprototype_Oct2026",

  // Roadside > Submit Request (blank = uses the member care queue above)
  roadsideQueueId: "",
  roadsideQueueName: "",

  // Fallback only; prefer the on-device number in Presenter tools
  callbackNumber: "",
  callbackUserName: "Alex Morgan",

  // Caller ID shown on the member's phone (blank = queue setting)
  callerId: "",
  callerIdName: "StarAuto Demo",

  // Contact Us > Chat With Us — Genesys Web Messenger
  // Messenger configuration: launcher visibility = "Hide until triggered by business logic".
  webMessenger: {
    chat: "web",                 // "mock" = scripted chat, "web" = Genesys Web Messenger
    environment: "prod",         // US East (apps.mypurecloud.com)
    deploymentId: "5dc5b4fc-7b77-4c8b-bef8-bf0015aaf6f6"
  }
};
