import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*هذا الأمر خاص بإدارة البريد الإلكتروني المؤقت باستخدام t-mail.tech*\n\n*أمثلة*\n\n*إنشاء بريد إلكتروني جديد تلقائيًا:*\n*${usedPrefix + command} generate*\n\n*إنشاء بريد إلكتروني محدد:*\n*${usedPrefix + command} create=example@domain.com*\n\n*حذف بريد إلكتروني:*\n*${usedPrefix + command} delete=example@domain.com*\n\n*عرض جميع الرسائل:*\n*${usedPrefix + command} inbox=example@domain.com*\n\n*عرض جميع العناوين الإلكترونية المتاحة:*\n*${usedPrefix + command} emails*`;

  let [action, email] = text.split('=');

  action = action.trim().toLowerCase();
  email = email ? encodeURIComponent(email.trim()) : '';

  try {
    m.reply('*الرجاء الانتظار، جاري تنفيذ العملية...*');

    let apiURL;
    switch (action) {
      case 'generate':
        apiURL = `https://t-mail.vercel.app/api/generate_email`;
        break;
      case 'create':
        apiURL = `https://t-mail.vercel.app/api/create_email?email=${email}`;
        break;
      case 'delete':
        apiURL = `https://t-mail.vercel.app/api/delete_email?email=${email}`;
        break;
      case 'inbox':
        apiURL = `https://t-mail.vercel.app/api/inbox?email=${email}`;
        break;
      case 'emails':
        apiURL = `https://t-mail.vercel.app/api/emails`;
        break;
      default:
        throw '*عملية غير معروفة*';
    }

    const response = await axios.get(apiURL);

    if (response.status === 200) {
      const data = response.data;
      await conn.sendMessage(m.chat, `✅ تمت العملية بنجاح\n\nالنتيجة: ${JSON.stringify(data, null, 2)}`, 'conversation', { quoted: m });
    } else {
      throw new Error('فشلت العملية');
    }
  } catch (error) {
    console.error(error);
    let errorMessage = error.response && error.response.data ? JSON.stringify(error.response.data) : error.message;
    throw `*أُووبس! حدث خطأ ما أثناء تنفيذ العملية. الرجاء معاودة المحاولة في وقت لاحق.*\n\n${errorMessage}`;
  }
};

handler.help = ['tmail'];
handler.tags = ['utility'];
handler.command = ['tmail']; // تغيير اسم الأمر إلى 'tmail'
export default handler;