import { exec } from 'child_process';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const commandText = text.trim();

  if (!commandText) throw `*يرجى إدخال أمر لتنفيذه على نظام Kali Linux*\n\n*مثال*\n*${usedPrefix + command} ls -la*`;

  try {
    m.reply('*جاري تنفيذ الأمر، يرجى الانتظار...*');

    const output = await runKaliCommand(commandText);

    if (output) {
      m.reply(`✅ تم تنفيذ الأمر بنجاح\n\nالناتج:\n${output}`);
    } else {
      throw '*فشل تنفيذ الأمر*';
    }
  } catch (error) {
    console.error(error);
    m.reply(`*أُووبس! حدث خطأ ما أثناء تنفيذ الأمر. الرجاء معاودة المحاولة في وقت لاحق.*\n\nError: ${error.message}`);
  }
};

async function runKaliCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return resolve(stderr);
      }
      resolve(stdout);
    });
  });
}

handler.help = ['shell'];
handler.tags = ['owner'];
handler.owner = true;
handler.command = ['shell'];
export default handler;