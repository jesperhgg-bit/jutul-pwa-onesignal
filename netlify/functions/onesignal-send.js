const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
    const { title, body, url } = JSON.parse(event.body || '{}');

    const APP_ID = process.env.ONESIGNAL_APP_ID;
    const REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;
    if (!APP_ID || !REST_API_KEY) return { statusCode: 500, body: 'Missing OneSignal env (ONESIGNAL_APP_ID / ONESIGNAL_REST_API_KEY).' };

    const payload = {
      app_id: APP_ID,
      included_segments: ['All'],
      headings: { en: title },
      contents: { en: body },
      url: url || '/',
      chrome_web_icon: 'https://'+(process.env.URL_HOSTNAME || '')+'/assets/icons/icon-192.png'
    };

    const res = await fetch('https://api.onesignal.com/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Basic ' + REST_API_KEY
      },
      body: JSON.stringify(payload)
    });
    const txt = await res.text();
    return { statusCode: res.ok ? 200 : res.status, body: txt };
  } catch (e) {
    return { statusCode: 500, body: 'onesignal-send: ' + (e && e.message ? e.message : 'unknown error') };
  }
};