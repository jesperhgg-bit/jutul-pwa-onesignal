// Din OneSignal App ID
const ONE_SIGNAL_APP_ID = "f5d3631f-b0fd-46f8-8f75-8bcc9aa710d3";

// v16: bruk OneSignalDeferred + nye API-er
window.OneSignalDeferred = window.OneSignalDeferred || [];
OneSignalDeferred.push(async function (OneSignal) {
  await OneSignal.init({
    appId: ONE_SIGNAL_APP_ID,
    // notifyButton: { enable: true }, // valgfritt
  });

  const statusEl = document.getElementById('status');
  const subBtn   = document.getElementById('btn-sub');
  const unsubBtn = document.getElementById('btn-unsub');

  function renderStatus() {
    // v16: støtte, tillatelse og abonnement
    const supported = OneSignal.Notifications.isPushSupported();          // bool
    const permission = OneSignal.Notifications.permission;                // bool
    const optedIn = OneSignal.User.PushSubscription.optedIn;              // bool

    if (!supported) {
      statusEl.textContent = 'Push ikke støttet i denne nettleseren.';
      return;
    }
    if (permission && optedIn) {
      statusEl.textContent = 'Varsler er AKTIVERT ✓';
    } else if (!permission) {
      statusEl.textContent = 'Varsler er ikke aktivert (mangler tillatelse).';
    } else {
      statusEl.textContent = 'Varsler er ikke aktivert.';
    }
  }

  // Oppdater status når noe endrer seg
  OneSignal.Notifications.addEventListener('permissionChange', renderStatus);
  OneSignal.User.PushSubscription.addEventListener('change', renderStatus);

  // Knapper
  subBtn?.addEventListener('click', async () => {
    try {
      // v16: viser prompt hvis nødvendig og melder inn
      await OneSignal.User.PushSubscription.optIn();
      renderStatus();
    } catch (e) {
      statusEl.textContent = 'Kunne ikke aktivere varsler: ' + e.message;
    }
  });

  unsubBtn?.addEventListener('click', async () => {
    try {
      await OneSignal.User.PushSubscription.optOut();
      renderStatus();
    } catch (e) {
      statusEl.textContent = 'Feil ved deaktivering: ' + e.message;
    }
  });

  renderStatus();
});
