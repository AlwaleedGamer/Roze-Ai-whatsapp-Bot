import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*هذا الأمر خاص بعمل scraping من الموقع المحدد*\n\n*مثال*\n*${usedPrefix + command} سؤال*`;

  // ترميز النصوص للتأكد من إرسالها بشكل صحيح عبر URL
  const question = encodeURIComponent(text.trim());

  try {
    m.reply('*الرجاء الانتظار، جاري جمع البيانات...*');

    const answer = await gpt4(question); // استدعاء الدالة gpt4 والحصول على الإجابة

    if (answer) {
      m.reply(`✅ تم جمع البيانات بنجاح\n\nالإجابة: ${answer}`);
    } else {
      throw '*فشل جمع البيانات*';
    }
  } catch (error) {
    console.error(error);
    throw `*أُووبس! حدث خطأ ما أثناء جمع البيانات. الرجاء معاودة المحاولة في وقت لاحق.*\n\n${error.message}`;
  }
};

async function gpt4(question) {
  function gn(length) {
    const chh = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let rt = '';
    for (let i = 0; i < length; i++) {
      rt += chh[Math.floor(Math.random() * chh.length)];
    }
    return rt;
  }

  const vv = gn(12);

  const headers = {
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9,ar-US;q=0.8,ar;q=0.7',
    'content-type': 'application/json',
    'dnt': '1',
    'origin': 'https://kingnish-opengpt-4o.hf.space',
    'referer': 'https://kingnish-opengpt-4o.hf.space/?__theme=light',
    'sec-ch-ua': '"Chromium";v="123", "Not A Brand";v="8"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0'
  };

  const response = await axios.post(
    'https://kingnish-opengpt-4o.hf.space/run/predict',
    {
      'data': [
        {
          'text': question,
          'files': []
        }
      ],
      'event_data': null,
      'fn_index': 3,
      'trigger_id': 34,
      'session_hash': vv
    },
    {
      params: {
        '__theme': 'light'
      },
      headers
    }
  );

  const response1 = await axios.post(
    'https://kingnish-opengpt-4o.hf.space/run/predict',
    {
      'data': [],
      'event_data': null,
      'fn_index': 6,
      'trigger_id': 34,
      'session_hash': vv
    },
    {
      params: {
        '__theme': 'light'
      },
      headers
    }
  );

  const response2 = await axios.post(
    'https://kingnish-opengpt-4o.hf.space/run/predict',
    {
      'data': [
        null,
        []
      ],
      'event_data': null,
      'fn_index': 4,
      'trigger_id': 34,
      'session_hash': vv
    },
    {
      params: {
        '__theme': 'light'
      },
      headers
    }
  );

  const response3 = await axios.post(
    'https://kingnish-opengpt-4o.hf.space/queue/join',
    {
      'data': [
        null,
        null,
        'idefics2-8b-chatty',
        'Top P Sampling',
        0.5,
        4096,
        1,
        0.9,
        true
      ],
      'event_data': null,
      'fn_index': 5,
      'trigger_id': 34,
      'session_hash': vv
    },
    {
      params: {
        '__theme': 'light'
      },
      headers
    }
  );

  const eventr = await axios.get('https://kingnish-opengpt-4o.hf.space/queue/data', {
    params: {
      'session_hash': vv
    },
    headers: {
      'accept': 'text/event-stream',
      'accept-language': 'en-US,en;q=0.9,ar-US;q=0.8,ar;q=0.7',
      'cache-control': 'no-cache',
      'dnt': '1',
      'referer': 'https://kingnish-opengpt-4o.hf.space/?__theme=light',
      'sec-ch-ua': '"Chromium";v="123", "Not A Brand";v="8"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0'
    }
  });

  let arr = [];
  let str = eventr.data;
  let text = `${str}`;
  let nodata = text.replace(/data:/g, '').replace(`{"msg":"close_stream"}`, '');
  const gg = nodata.trim().split('\n');
  gg.forEach(str => {
    try {
      const oob = JSON.parse(str);
      arr.push(oob);
    } catch (e) {
      arr.push(str);
    }
  });

  let an = arr.length - 1;
  let ans = arr[an].output.data[0][0];
  let nss = "";
  let dd = 0;
  for (let tt of ans) {
    if (dd != 0) {
      nss += tt;
      nss += "\n";
    }
    ++dd;
  }
  return nss;
}

handler.help = ['scrap'];
handler.tags = ['scraping'];
handler.command = ['scrap']; // تغيير اسم الأمر إلى 'scrap'
export default handler;