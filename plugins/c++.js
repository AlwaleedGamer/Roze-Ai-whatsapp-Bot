import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*يرجى إدخال كود C++ للتنفيذ*\n\n*مثال*\n*${usedPrefix + command} #include <iostream>\nint main() { std::cout << "Hello, world!"; return 0; }*`;

  const code = text.trim();

  try {
    m.reply('*جاري تنفيذ الكود، يرجى الانتظار...*');

    const output = await runCppCode(code);

    if (output) {
      m.reply(`✅ تم تنفيذ الكود بنجاح\n\nالناتج:\n${output}`);
    } else {
      throw '*فشل تنفيذ الكود*';
    }
  } catch (error) {
    console.error(error);
    m.reply(`*أُووبس! حدث خطأ ما أثناء تنفيذ الكود. الرجاء معاودة المحاولة في وقت لاحق.*\n\nError: ${error.message}`);
  }
};

async function runCppCode(code) {
  try {
    const response = await axios.post('https://wandbox.org/api/compile.json', {
      compiler: 'gcc-head',
      code: code,
      options: 'warning,gnu++1z',
      stdin: ''
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Logging the full response from API
    console.log('Full API Response:', response.data);

    const data = response.data;

    if (data.program_message) {
      return data.program_message || 'No output';
    } else {
      return `Error: ${data.compiler_error || 'Unknown error'}`;
    }
  } catch (error) {
    console.error('Error during API call:', error);
    throw error;
  }
}

handler.help = ['c++'];
handler.tags = ['owner'];
handler.owner = true;
handler.command = ['c++'];
export default handler;