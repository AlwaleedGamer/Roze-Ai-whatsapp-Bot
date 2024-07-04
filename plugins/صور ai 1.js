import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*هذا الأمر خاص بتوليد الصور باستعمال الذكاء الإصطناعي*\n\n*مثال*\n*${usedPrefix + command} girl and yellow cat =1*`;

  // تقسيم النص المدخل للحصول على الوصف والموديل
  let [prompt, model] = text.split('=');

  // التحقق من إدخال الوصف والموديل بشكل صحيح
  if (!prompt || !model) throw `*الرجاء التأكد من إدخال الوصف والموديل بشكل صحيح*\n\n*مثال*\n*${usedPrefix + command} girl and yellow cat =1*`;

  // ترميز النصوص للتأكد من إرسالها بشكل صحيح عبر URL
  prompt = encodeURIComponent(prompt.trim());
  model = model.trim();

  try {
    m.reply('*الرجاء الانتظار، جاري إنشاء الصور...*');

    // توليد الصورة باستخدام الـ API الجديد
    const imageGenerationURL = `https://sandipapi.onrender.com/sdxl?prompt=${prompt}&model=${model}`;
    const response = await axios.get(imageGenerationURL, { responseType: 'arraybuffer' });

    if (response.status === 200) {
      const imageBuffer = Buffer.from(response.data, 'binary');
      await conn.sendFile(m.chat, imageBuffer, 'image.png', `✅ تم تخيل الصورة بنجاح\n\nالوصف: ${text}`, m);
    } else {
      throw '*فشل إنشاء الصورة*';
    }
  } catch (error) {
    console.error(error);
    throw `*أُووبس! حدث خطأ ما أثناء إنشاء الصور. الرجاء معاودة المحاولة في وقت لاحق.*\n\n${error.message}`;
  }
};

handler.help = ['xf'];
handler.tags = ['drawing'];
handler.command = ['xf']; // تغيير اسم الأمر إلى 'xf'
export default handler;