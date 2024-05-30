import cheerio from 'cheerio';
import axios from 'axios'; // Assuming you're using Axios for HTTP requests

let handler = async (m, { conn, text }) => {
    try {
        if (!text) return conn.reply(m.chat, `*[❗] حط اسم الانمي الذي تبحث عنه*`, m);

        const response = await axios.get(`https://yourcountdown.to/trending/${text}`); // Replace 'YOUR_URL_HERE' with the URL where your HTML snippet is located
        const html = response.data;

        const $ = cheerio.load(html);
        const animeItems = $('.countdown-item');

        let AnimeInfo = '';

        animeItems.each((index, element) => {
            const title = $(element).find('.title').text().trim();
            const subtitle = $(element).find('.subtitle').text().trim();
            const releaseDate = $(element).find('.countdown').attr('data-date');
            const imageUrl = $(element).find('.image').attr('src'); // Assuming the class name for the image is 'image'

            AnimeInfo += `
🎀 • *الاسم:* ${title}
📅 • *التاريخ:* ${releaseDate}
📝 • *العنوان:* ${subtitle}
🖼️ • *صورة:* ${imageUrl}
`;
        });

        if (AnimeInfo) {
            conn.reply(m.chat, AnimeInfo, m, { thumbnail: Buffer.alloc(0) }); // إرسال الصورة كصورة مصغرة مع الرسالة
        } else {
            conn.reply(m.chat, '*[❗] لم يتم العثور على معلومات*', m);
        }
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '*[❗] حدث خطأ أثناء جلب المعلومات*', m);
    }
};

handler.command = /^(احدث)$/i;
export default handler;
