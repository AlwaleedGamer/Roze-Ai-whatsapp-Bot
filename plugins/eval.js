const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

// إعداد عميل واتساب
const client = new Client();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

// معرف المستخدم المسموح له باستخدام الأمر
const allowedID = '249967264949';

// إعداد الأمر 'eval'
client.on('message', async (message) => {
  if (message.body.startsWith('!eval ')) {
    if (message.from !== allowedID) {
      message.reply('❌ لا تملك الصلاحيات لاستخدام هذا الأمر.');
      return;
    }

    const args = message.body.slice(6).trim();

    if (!args) {
      message.reply('❌ اكتب شيئا.');
      return;
    }

    try {
      function output(msg) {
        if (typeof msg === 'number' || typeof msg === 'boolean' || typeof msg === 'function') {
          msg = msg.toString();
        } else if (msg instanceof Map) {
          let text = `Map(${msg.size}) `;
          text += JSON.stringify(mapToObj(msg), null, 2);
          msg = text;
        } else if (typeof msg === 'object') {
          msg = JSON.stringify(msg, null, 2);
        } else if (typeof msg === 'undefined') {
          msg = 'undefined';
        }

        message.reply(msg);
      }

      function mapToObj(map) {
        const obj = {};
        map.forEach((v, k) => {
          obj[k] = v;
        });
        return obj;
      }

      const cmd = `
      (async () => {
        try {
          ${args}
        } catch (err) {
          console.log("eval command", err);
          message.reply(err.message);
        }
      })()`;

      eval(cmd);
    } catch (err) {
      console.log(err);
      message.reply(err.message);
    }
  }
});

client.initialize();
