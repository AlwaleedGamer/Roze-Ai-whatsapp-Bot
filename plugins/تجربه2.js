import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*هذا الأمر خاص بجلب الصور من Google وتحويلها إلى ملصقات*\n\n*مثال*\n*${usedPrefix + command} cat 10*`;

  // تقسيم النص المدخل للحصول على الوصف وعدد الصور
  let [query, count] = text.split(' ');

  // التحقق من إدخال الوصف وعدد الصور بشكل صحيح
  if (!query || !count) throw `*الرجاء التأكد من إدخال الوصف وعدد الصور بشكل صحيح*\n\n*مثال*\n*${usedPrefix + command} cat 10*`;

  // ترميز النصوص للتأكد من إرسالها بشكل صحيح عبر URL
  query = encodeURIComponent(query.trim());
  count = count.trim();

  try {
    m.reply('*الرجاء الانتظار، جاري جلب الصور وتحويلها إلى ملصقات...*');

    // جلب الصور باستخدام الـ API الجديد
    const imageFetchURL = `https://alifadel2-1.vercel.app/google?query=${query}&count=${count}`;
    const response = await axios.get(imageFetchURL, { responseType: 'json' });

    if (response.status === 200 && response.data && response.data.message && response.data.message.imageUrls) {
      const images = response.data.message.imageUrls;
      if (images.length === 0) throw '*لم يتم العثور على صور*';

      for (let image of images) {
        // تحميل الصورة
        const imageResponse = await axios.get(image, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(imageResponse.data, 'binary');
        
        // إرسال الصورة كملصق
        await conn.sendMessage(m.chat, { sticker: imageBuffer }, { quoted: m });
      }
    } else {
      console.error('Response data:', response.data);
      throw '*فشل جلب الصور*';
    }
  } catch (error) {
    console.error('Error details:', error);
    throw `*أُووبس! حدث خطأ ما أثناء جلب الصور. الرجاء معاودة المحاولة في وقت لاحق.*\n\n${error.message}`;
  }
};

handler.help = ['xk'];
handler.tags = ['sticker'];
handler.command = ['xk'];
export default handler;