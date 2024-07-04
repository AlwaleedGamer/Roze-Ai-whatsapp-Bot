import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*هذا الأمر خاص بتوليد الصور باستعمال الذكاء الاصطناعي*\n\n*مثال*\n*${usedPrefix + command} girl and yellow cat -5*`;

  // استخراج الوصف وعدد الصور من النص المدخل
  let description = text;
  let count = 1;

  const match = text.match(/-([0-9]+)$/);  // مطابقة أي رقم يأتي بعد علامة '-'
  if (match) {
    count = parseInt(match[1], 10);
    description = text.replace(/-([0-9]+)$/, '').trim();  // إزالة الجزء الرقمي من النص
  }

  const maxCount = 20;  // تعيين الحد الأقصى لعدد الصور
  count = Math.min(count, maxCount);  // التأكد من أن العدد لا يتجاوز الحد الأقصى

  // التأكد من أن طول النص لا يتجاوز الحد الأقصى
  const maxLength = 100;
  if (description.length > maxLength) {
    throw `*الوصف طويل جدًا، الرجاء استخدام وصف أقل من ${maxLength} حرف.*`;
  }

  try {
    m.reply('*الرجاء الانتظار، جاري إنشاء الصور...*');

    // استخدام Promise.all لتسريع عملية توليد الصور
    const promises = [];
    for (let i = 0; i < count; i++) {
      // إضافة معلمات عشوائية للتأكد من توليد صور مختلفة
      const timestamp = new Date().getTime();
      const randomSeed = Math.random().toString(36).substring(7);
      const imageGenerationURL = `https://image.pollinations.ai/prompt/anim?prompt=${encodeURIComponent(description)}&seed=${randomSeed}&timestamp=${timestamp}`;
      promises.push(axios.get(imageGenerationURL, { responseType: 'arraybuffer' }));
    }

    const responses = await Promise.all(promises);

    for (let i = 0; i < responses.length; i++) {
      const response = responses[i];
      if (response.status === 200 && response.headers['content-type'].includes('image')) {
        const imageBuffer = Buffer.from(response.data, 'binary');
        await conn.sendFile(m.chat, imageBuffer, `image_${i+1}.png`, `✅ تم تخيل الصورة بنجاح\n\nالوصف: ${description}`, m);
      } else {
        console.error(`فشل إنشاء الصورة رقم ${i+1}`);
        m.reply(`*فشل إنشاء الصورة رقم ${i+1}*`);
      }
    }
  } catch (error) {
    console.error(error);
    throw '*أُووبس! حدث خطأ ما أثناء إنشاء الصور. الرجاء معاودة المحاولة في وقت لاحق.*';
  }
};

handler.help = ['xd'];
handler.tags = ['drawin'];
handler.command = ['xd'];
export default handler;