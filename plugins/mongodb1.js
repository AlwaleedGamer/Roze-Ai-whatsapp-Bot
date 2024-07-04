import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://Alwaleedd:H429chu1wS76lHR8@alwaleed.hgqm8wo.mongodb.net/?retryWrites=true&w=majority&appName=Alwaleed', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  type: String, // 'text' or 'image'
  content: Schema.Types.Mixed, // String for text, Buffer for image
  createdAt: { type: Date, default: Date.now },
});

const Data = mongoose.model('Data', dataSchema);

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `*الرجاء إدخال البيانات المطلوبة.*\n\n*الاستخدام الصحيح:*\n*${usedPrefix + command} إدخال النص* أو *${usedPrefix + command} إخراج* أو *${usedPrefix + command} حذف النص* أو *${usedPrefix + command} من هو النص*`;
  }

  const parts = text.split(' ');
  const action = parts[0].toLowerCase();

  if (action === 'إدخال') {
    const inputText = parts.slice(1).join(' ').trim();

    if (!inputText) {
      throw `*الرجاء إدخال النص المطلوب بشكل صحيح.*`;
    }

    try {
      let data = {};
      if (m.hasQuotedMsg && m.quotedMsg.type === 'image') {
        const img = await conn.downloadMediaMessage(m.quotedMsg);
        if (!img) {
          throw '*حدث خطأ أثناء تحميل الصورة.*';
        }
        data = new Data({ type: 'image', content: img });
      } else {
        data = new Data({ type: 'text', content: inputText });
      }

      await data.save();

      m.reply(`✅ تم حفظ البيانات بنجاح\n\n${data.type === 'text' ? 'النص' : 'الصورة'}: ${data.content}`);
    } catch (error) {
      console.error(error);
      throw `*أُووبس! حدث خطأ ما أثناء حفظ البيانات. الرجاء معاودة المحاولة في وقت لاحق.*\n\n${error.message}`;
    }

  } else if (action === 'إخراج') {
    try {
      const data = await Data.find().sort({ createdAt: -1 }).exec();
      if (data.length === 0) {
        throw '*لا توجد بيانات محفوظة.*';
      }
      let response = '';
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        response += `🔹 ${i + 1}. النوع: ${item.type}\n`;
        if (item.type === 'text') {
          response += `   المحتوى: ${item.content}\n`;
        } else if (item.type === 'image') {
          response += `   الصورة: مرفقة\n`;
        }
        response += `   الوقت: ${item.createdAt.toString()}\n\n`;
      }
      m.reply('*البيانات المحفوظة:*\n\n' + response);
    } catch (error) {
      console.error(error);
      throw `*حدث خطأ أثناء استرجاع البيانات.*\n\n${error.message}`;
    }

  } else if (action === 'حذف') {
    const inputText = parts.slice(1).join(' ').trim();

    if (!inputText) {
      throw `*الرجاء إدخال النص المطلوب لحذفه بشكل صحيح.*`;
    }

    try {
      const result = await Data.findOneAndDelete({ content: inputText });
      if (result) {
        m.reply(`✅ تم حذف البيانات بنجاح\n\n${result.type === 'text' ? 'النص' : 'الصورة'}: ${result.content}`);
      } else {
        throw `*لم يتم العثور على بيانات بهذا ${result.type === 'text' ? 'النص' : 'الصورة'}.*`;
      }
    } catch (error) {
      console.error(error);
      throw `*أُووبس! حدث خطأ ما أثناء حذف البيانات. الرجاء معاودة المحاولة في وقت لاحق.*\n\n${error.message}`;
    }

  } else if (action === 'من هو النص') {
    const inputText = parts.slice(1).join(' ').trim();

    if (!inputText) {
      throw `*الرجاء إدخال النص المطلوب للبحث عنه.*`;
    }

    try {
      const result = await Data.findOne({ content: inputText });
      if (result) {
        m.reply(`✅ النص "${inputText}" موجود في قاعدة البيانات.`);
      } else {
        throw `*النص "${inputText}" غير موجود في قاعدة البيانات.*`;
      }
    } catch (error) {
      console.error(error);
      throw `*أُووبس! حدث خطأ ما أثناء البحث عن البيانات. الرجاء معاودة المحاولة في وقت لاحق.*\n\n${error.message}`;
    }

  } else {
    throw `*الرجاء إدخال البيانات المطلوبة بشكل صحيح.*\n\n*الاستخدام الصحيح:*\n*${usedPrefix + command} إدخال النص* أو *${usedPrefix + command} إخراج* أو *${usedPrefix + command} حذف النص* أو *${usedPrefix + command} من هو النص*`;
  }
};

handler.command = ['mongo'];

handler.help = ['mongo'];
handler.tags = ['database'];

export default handler;