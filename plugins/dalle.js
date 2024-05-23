import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*هذا الأمر خاص بتوليد الصور باستعمال الذكاء الإصطناعي*\n\n*مثال*\n*${usedPrefix + command} girl and yellow cat*`;

  try {
    m.reply('*الرجاء الانتظار، جاري إنشاء الصور...*');

    // فحص الكلمات السيئة
    const profanityCheckURL = `https://profanity-checker.vercel.app/profane?t=${encodeURIComponent(text)}`;
    const profanityCheckResult = await axios.get(profanityCheckURL);

    if (profanityCheckResult.data.isProfane) {
      m.reply('لالالااا كلمة سيئة');
    } else {
      // توليد الصورة باستخدام الـ API الجديد
      const imageGenerationURL = `https://ts-ai-api-shuddho.onrender.com/api/animagine?prompt=${encodeURIComponent(text)}`;
      const response = await axios.get(imageGenerationURL, { responseType: 'arraybuffer' });

      if (response.status === 200) {
        const imageBuffer = Buffer.from(response.data, 'binary');
        await conn.sendFile(m.chat, imageBuffer, 'image.png', `✅ تم تخيل الصورة بنجاح\n\nالوصف: ${text}`, m);
      } else {
        throw '*فشل إنشاء الصورة*';
      }
    }
  } catch (error) {
    console.error(error);
    throw '*أُووبس! حدث خطأ ما أثناء إنشاء الصور. الرجاء معاودة المحاولة في وقت لاحق.*';
  }
};

handler.help = ['xl'];
handler.tags = ['drawing'];
handler.command = ['xl']; // تغيير اسم الأمر إلى 'xl'
export default handler;
