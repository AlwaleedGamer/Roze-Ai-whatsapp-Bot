import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*هذا الأمر خاص بالبحث الأسماء *\n\n*مثال*\n*${usedPrefix + command} وليد*`;

  // الحصول على معلمات البحث
  let searchParams = encodeURIComponent(text.trim());

  try {
    m.reply('*جاري البحث...*');

    // بناء رابط البحث باستخدام الـ API الجديد
    const searchURL = `https://alifadel2-1.vercel.app/${text}`;
    const response = await fetch(searchURL);

    if (response.ok) {
      const responseData = await response.json();
      // تأكد من وجود بيانات مسترجعة قبل عرضها
      if (responseData) {
        // عرض الرد عبر الرسالة
        m.reply(`نتائج البحث: ${JSON.stringify(responseData)}`);
        // إظهار الرد عبر وحدة التحكم
        console.log('نتائج البحث:', responseData);
      } else {
        throw new Error('*لم يتم العثور على نتائج للبحث*');
      }
    } else {
      // عرض رسالة الخطأ مع تفاصيل الاستجابة
      const errorMessage = `*فشل عملية البحث (${response.status} ${response.statusText})*`;
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error(error);
    // رمي رسالة الخطأ العامة مع تفاصيل الخطأ
    throw `*أُووبس! حدث خطأ ما أثناء عملية البحث. الرجاء معاودة المحاولة في وقت لاحق.*\n\n${error.message}`;
  }
};

handler.help = ['بحث'];
handler.tags = ['search'];
handler.command = ['بحث']; // تغيير اسم الأمر إلى 'xf'
export default handler;