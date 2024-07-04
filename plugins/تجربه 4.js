import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*هذا الأمر خاص بجلب الصور من Google*\n\n*مثال*\n*${usedPrefix + command} cat 10*`;

  // تقسيم النص المدخل للحصول على الوصف وعدد الصور
  let [query, count] = text.split(' ');

  // التحقق من إدخال الوصف وعدد الصور بشكل صحيح
  if (!query || !count) throw `*الرجاء التأكد من إدخال الوصف وعدد الصور بشكل صحيح*\n\n*مثال*\n*${usedPrefix + command} cat 10*`;

  // ترميز النصوص للتأكد من إرسالها بشكل صحيح عبر URL
  query = encodeURIComponent(query.trim());
  count = count.trim();

  try {
    m.reply('*الرجاء الانتظار، جاري جلب الصور...*');

    // جلب الصور باستخدام الـ API الجديد
    const imageFetchURL = `https://alifadel2-1.vercel.app/google?query=${query}&count=${count}`;
    const response = await axios.get(imageFetchURL, { responseType: 'json' });

    if (response.status === 200 && response.data && response.data.message && response.data.message.imageUrls) {
      const images = response.data.message.imageUrls;
      if (images.length === 0) throw '*لم يتم العثور على صور*';

      for (let image of images) {
        await conn.sendFile(m.chat, image, 'image.jpg', `✅ تم جلب الصورة بنجاح\n\nالوصف: ${query}`, m);
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

handler.help = ['xp'];
handler.tags = ['image'];
handler.command = ['xp'];
export default handler;