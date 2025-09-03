const ONE_SIGNAL_APP_ID = "f5d3631f-b0fd-46f8-8f75-8bcc9aa710d3";

window.OneSignal = window.OneSignal || [];
OneSignal.push(function () {
  OneSignal.init({
    appId: ONE_SIGNAL_APP_ID,
    notifyButton: { enable: false },
    allowLocalhostAsSecureOrigin: true,
  });
});

const statusEl  = document.getElementById('status');
const subBtn    = document.getElementById('btn-sub');
const unsubBtn  = document.getElementById('btn-unsub');

async function renderStatus() {
  try {
    const enabled = await OneSignal.isPushNotificationsEnabled();
    statusEl.textContent = enabled ? 'Varsler er AKTIVERT ✓' : 'Varsler er ikke aktivert.';
  } catch (e) {
    statusEl.textContent = 'Push ikke støttet: ' + e.message;
  }
}

subBtn?.addEventListener('click', async () => {
  try {
    await OneSignal.registerForPushNotifications();
    await renderStatus();
  } catch (e) {
    statusEl.textContent = 'Kunne ikke aktivere varsler: ' + e.message;
  }
});

unsubBtn?.addEventListener('click', async () => {
  try {
    await OneSignal.setSubscription(false);
    await renderStatus();
  } catch (e) {
    statusEl.textContent = 'Feil ved deaktivering: ' + e.message;
  }
});

document.addEventListener('DOMContentLoaded', renderStatus);
