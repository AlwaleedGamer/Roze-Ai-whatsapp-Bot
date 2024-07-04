import axios from 'axios';

// Define the URL of the Gemini website
const GEMINI_URL = 'https://gemini.google.com/';

// Define the cookies required
const cookies = {
  '__Secure-3PSID': 'g.a000lQhZcettEgO9tIEhluNl3t0BtblVyvi3F5LIST8ucE9BDHxL9w_KwE8YTxAd-070IOWbcwACgYKAZsSARISFQHGX2MimuJp2IyCC1Y61u5A9PzDBBoVAUF8yKrtclvjCrOl-D4M9Q82S2j00076',
  '__Secure-3PSIDCC': 'AKEyXzX9SQheITPc7_gvHC8EPzQSQuYOTnPwZipUG6_-Fxnbiak7S2o_7p8HiSLepfla46lpHaM',
  '_ga': 'GA1.1.975864205.1711104753',
  '_ga_WC57KJ50ZZ': 'GS1.1.1719710889.2.1.1719711023.0.0.0',
  'AEC': 'AQTF6HwxyfnvgqqEKHJ_FKrMAshFRhWXoVg-uYZeEugKHAfiWgk5KXmP-Fs',
  'APISID': 'u_eGCxB5kiD5hWiu/Ak42noHG6TdYow8Pq',
  'HSID': 'AiZ5D-c8wMAJtNMnv',
  'NID': '515=xJR0NqlINpp2mrMOPahBpuFitBInemiojZRfldAmBbLZYsgbqxscmSkQhHVKz0A4JeRMa48mOHDLRq6sip0VYYQO5B41PHrpRNE1e64ObFndlAeLe1l8icnEWL5QoexDabUUZkiNktnf3kPeAsgQMxTrOYXbYiP0BlyTFjy3UPk4vKRyL5q72AfO_H_Z_ho3n7t956aC0jw5a-haqOHkoTQXs6l7yqzUE1J6bkR8w5LfGXqGQYwe9_eqxUSuQfenaE_cwdBFXVFY2JNjM-bWS81ZrIFuVjUxBkRt4kWbjy7NLqEjBm82TzzAr9LNXXv13qNTqU00H39i-S7HO0Y_aiEayV_L6GvFbx_5mg',
  'SAPISID': 'Y6JveDaMBXPsFa92/AClEH8266NmQyR2HM',
  'SEARCH_SAMESITE': 'CgQI_ZoB',
  'SID': 'g.a000lQhZcettEgO9tIEhluNl3t0BtblVyvi3F5LIST8ucE9BDHxLu9lwcy93-DgAjyEADgJzrAACgYKAZwSARISFQHGX2MiSP7goaao_dExZM6vaZjMkxoVAUF8yKrcc4ML8uvur-gMajIwlUAx0076',
  'SIDCC': 'AKEyXzU0K_QPtNRgQnaAdmEHkAkBE7IrLngTUwal_I1sZ-03mhYslPZTJNZnukFyNnp_QCl5ZEM',
  'SSID': 'ArAU5MgQDofNaK-iN'
};

async function getGeminiContent() {
  try {
    const response = await axios.get(GEMINI_URL, {
      headers: {
        'Cookie': Object.keys(cookies).map(key => `${key}=${cookies[key]}`).join('; ')
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

let handler = async (m, { conn }) => {
  try {
    m.reply('*جاري الوصول إلى المحتوى من موقع Gemini...*');

    // Get content from Gemini
    const content = await getGeminiContent();

    // Check if content is HTML
    if (content.includes('<!doctype html>')) {
      throw new Error('Failed to retrieve text content from Gemini.');
    }

    // Send back the response text
    await conn.sendMessage(m.chat, content.substring(0, 1000), 'text/plain'); // Sending only the first 1000 characters for example
  } catch (error) {
    console.error(error);
    throw `*حدث خطأ أثناء تنفيذ الأمر. الرجاء المحاولة مرة أخرى لاحقًا.*\n\n${error.message}`;
  }
};

handler.help = ['gemini'];
handler.tags = ['web', 'cookies'];
handler.command = ['gemini']; // تغيير اسم الأمر إلى 'gemini'
export default handler;