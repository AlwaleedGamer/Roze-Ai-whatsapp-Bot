import {watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import fs from 'fs'; 
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

global.owner = [
  ['249118854075', '❄️ Alwaleed 🧿', true],
  ['249118854075', '🔥 Alwaleed 🧿', true],
];

global.xaxa = 'kaneki'
global.suittag = ['249118854075', '249118854075'];
global.prems = ['249118854075', '249118854075'];

(function() {
    // تعيين دالة لتحديد النصوص المشفرة
    function _0x428a() {
        return [
            'bind', '36dprKij', 'trace', 'log', '56sZQCCY', 'packname', 'author',
            '★𝛺𝛩𝛜𝛪𝛑𝛔 &𝛴𝛦𝛩𝛪𝛐 𝛝𝛦𝛭★', '320ATjCVW', '🤖 𝛺𝛩𝛜𝛪𝛑𝛔 - 𝛩𝛸𝛑𝛪𝛐 𝛝𝛦𝛭 🤖', 
            'exception', 'venomXov', 'constructor', 'apply', 'prototype', 
            '28422sTEpQW', '1015167mUzCjV', 'return (function() ', 'table', 
            '33aSKDvQ', '1976368gYkUtU', 'length', '★𝛺𝛩𝛜𝛪𝛑𝛔 - 𝛩𝛸𝛑𝛪𝛐 𝛝𝛦𝛭★', 
            '6397984ImDGHu', '119550OivDxD', 'info', '★𝛺𝛩𝛜𝛪𝛑𝛔 - 𝛩𝛸𝛑𝛪𝛐 𝛝𝛦𝛭★', 
            'console', '3268884qPBkke', '574650ACwiXW', 'toString', '2Cmqyio', 
            'tit ulom2'
        ];
    }

    // تعيين دالة لفك تشفير النصوص المشفرة
    function _0x21bf(_0x4536d9, _0x178b79) {
        var _0x1c5a51 = _0x428a();
        return function(_0x48cddb, _0x117664) {
            _0x48cddb = _0x48cddb - 0;
            return _0x1c5a51[_0x48cddb];
        }(_0x4536d9, _0x178b79);
    }

    // فك تشفير النصوص المشفرة
    (function(_0x44283f, _0x13d0d2) {
        var _0x46a3b5 = _0x428a();
        while (true) {
            try {
                var _0x35673b = -parseInt(_0x21bf(5)) / 1 * (-parseInt(_0x21bf(20)) / 2) + parseInt(_0x21bf(23)) / 3 * (parseInt(_0x21bf(9)) / 4) + -parseInt(_0x21bf(18)) / 5 + -parseInt(_0x21bf(13)) / 6 * (-parseInt(_0x21bf(26)) / 7) + -parseInt(_0x21bf(12)) / 8 + -parseInt(_0x21bf(4)) / 9 * (-parseInt(_0x21bf(30)) / 10) + -parseInt(_0x21bf(8)) / 11 * (parseInt(_0x21bf(17)) / 12);
                if (_0x35673b === _0x13d0d2) break;
                else _0x46a3b5.push(_0x46a3b5.shift());
            } catch (_0x3d4a9f) {
                _0x46a3b5.push(_0x46a3b5.shift());
            }
        }
    }(_0x428a, 531012));

    var _0x48cddb = (function() {
        var _0x5ee028 = true;
        return function(_0x471b61, _0x2b4492) {
            var _0x42076a = _0x5ee028 ? function() {
                if (_0x2b4492) {
                    var _0x1eea67 = _0x2b4492.apply(_0x471b61, arguments);
                    _0x2b4492 = null;
                    return _0x1eea67;
                }
            } : function() {};
            _0x5ee028 = false;
            return _0x42076a;
        };
    })();

    var _0x1c5a51 = _0x48cddb(this, function() {
        var _0x1126db;
        try {
            var _0x14614b = Function('return (function() {return this}() );');
            _0x1126db = _0x14614b();
        } catch (_0x351ffa) {
            _0x1126db = window;
        }
        var _0x215617 = _0x1126db.console = _0x1126db.console || {};
        var _0x43cecc = ['log', 'warn', 'info', 'error', 'exception', 'trace', 'table'];
        for (var _0x5bd2dc = 0; _0x5bd2dc < _0x43cecc.length; _0x5bd2dc++) {
            var _0x26be7d = _0x48cddb.constructor.prototype.bind(_0x48cddb);
            var _0x1347e8 = _0x43cecc[_0x5bd2dc];
            var _0x1b8503 = _0x215617[_0x1347e8] || _0x26be7d;
            _0x26be7d.__proto__ = _0x48cddb.bind(_0x48cddb);
            _0x26be7d.toString = _0x1b8503.toString.bind(_0x1b8503);
            _0x215617[_0x1347e8] = _0x26be7d;
        }
    });

    _0x1c5a51();

    // تعيين المتغيرات العامة
    global.packname = '❄️ 𝛑𝛪𝛩𝛒 𝛔𝛫 🤧\n⭐️ https://wa.me/+ ⭐️\n🔥 𝛮𝛺𝛶𝛺𝛫 🤧\n⭐️ https://wa.me/+201033024135 ⭐️';
    global.author = '𝛺𝛩𝛜𝛪𝛑𝛔 - 𝛩𝛸𝛑𝛪𝛐 𝛝𝛦𝛭';
    global.venomXov = 'venomXov';
    global.wm = '★𝛺𝛩𝛜𝛪𝛑𝛔 &𝛴𝛦𝛩𝛪𝛐 𝛝𝛦𝛭★';
    global['tit ulom2'] = 'tit ulom2';
})();
global.wait = '*⌛ _جاري التحميل..._*\n\n*▰▰▰▱▱▱▱▱*';

global.imagen1 = fs.readFileSync('./Menu2.jpg');
global.imagen2 = fs.readFileSync('./src/nuevobot.jpg');
global.imagen4 = fs.readFileSync('./Menu.png');
global.imagen5 = fs.readFileSync('./src/+18.jpg');
global.imagen3 = fs.readFileSync('./Menu3.png');

global.mods = [];

//* *******Tiempo***************
global.d = new Date(new Date + 3600000);
global.locale = 'ar';
global.dia = d.toLocaleDateString(locale, {weekday: 'long'});
global.fecha = d.toLocaleDateString('ar', {day: 'numeric', month: 'numeric', year: 'numeric'});
global.mes = d.toLocaleDateString('ar', {month: 'long'});
global.año = d.toLocaleDateString('ar', {year: 'numeric'});
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});
//* ****************************
global.wm2 = `▸ ${dia} ${fecha}\n▸ 𝚃𝚑𝚎 𝙼𝚢𝚜𝚝𝚒𝚌 - 𝙱𝚘𝚝`;
global.gt = '★𝑺𝛩𝐾𝑈𝑁𝐴 - 𝑉𝐸𝑁𝛩𝑀 𝐵𝛩𝑇★';
global.mysticbot = '★𝑺𝛩𝐾𝑈𝑁𝐴 - 𝑉𝐸𝑁𝛩𝑀 𝐵𝛩𝑇★';
global.md = 'https://chat.whatsapp.com/Alwaleed';
global.mysticbot = 'https://chat.whatsapp.com/Alwaleed';
global.waitt = '*⌛ _جاري التحميل..._*\n\n*▰▰▰▱▱▱▱▱*';
global.waittt = '*⌛ _جاري التحميل..._*\n\n*▰▰▰▰▰▱▱▱*';
global.waitttt = '*⌛ _جاري التحميل..._*\n\n*▰▰▰▰▰▰▱▱*';
global.nomorown = '249118854075';
global.pdoc = ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/msword', 'application/pdf', 'text/rtf'];
global.cmenut = '❖––––––『';
global.cmenub = '┊✦ ';
global.cmenuf = '╰━═┅═━––––––๑\n';
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     ';
global.dmenut = '*❖─┅──┅〈*';
global.dmenub = '*┊»*';
global.dmenub2 = '*┊*';
global.dmenuf = '*╰┅────────┅✦*';
global.htjava = '⫹⫺';
global.htki = '*⭑•̩̩͙⊱•••• ☪*';
global.htka = '*☪ ••••̩̩͙⊰•⭑*';
global.comienzo = '• • ◕◕════';
global.fin = '════◕◕ • •';
global.botdate = `⫹⫺ Date :  ${moment.tz('America/Los_Angeles').format('DD/MM/YY')}`; // Asia/Jakarta
global.bottime = `𝗧 𝗜 𝗠 𝗘 : ${moment.tz('America/Los_Angeles').format('HH:mm:ss')}`;// America/Los_Angeles
global.fgif = {key: {participant: '0@s.whatsapp.net'}, message: {'videoMessage': {'title': wm, 'h': `Hmm`, 'seconds': '999999999', 'gifPlayback': 'true', 'caption': bottime, 'jpegThumbnail': fs.readFileSync('./Menu.png')}}};
global.multiplier = 99;
global.flaaa = [
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
  'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
  'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=',
];
//* ************************

const file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright('Update \'config.js\''));
  import(`${file}?update=${Date.now()}`);
});
