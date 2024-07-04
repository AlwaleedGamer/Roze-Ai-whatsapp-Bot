const handler = async (m, { conn, participants, command, usedPrefix }) => {
  if (!global.db.data.settings[conn.user.jid].restrict) throw '*[ ⚠️ ] المالك لديه تقييد لاستخدام هذا الأمر (enable restrict / disable restrict)*';

  const kicktext = `*[❗] قم بالإشارة إلى شخص ما أو الرد على رسالة في المجموعة لإزالة المستخدم*\n\n*—◉ مثال:*\n*${usedPrefix + command} @${global.suittag}*`;
  if (!m.mentionedJid[0] && !m.quoted) return m.reply(kicktext, m.chat, { mentions: conn.parseMention(kicktext) });

  if (m.message.extendedTextMessage === undefined || m.message.extendedTextMessage === null) 
    return m.reply('*[❗] قم بالإشارة إلى شخص ما أو الرد على رسالة في المجموعة لإزالة المستخدم*');

  if (m.message.extendedTextMessage.contextInfo.participant !== null && m.message.extendedTextMessage.contextInfo.participant !== undefined && m.message.extendedTextMessage.contextInfo.participant !== '') {
    const mentioned = m.message.extendedTextMessage.contextInfo.mentionedJid[0] ? m.message.extendedTextMessage.contextInfo.mentionedJid[0] : m.message.extendedTextMessage.contextInfo.participant;
    if (conn.user.jid.includes(mentioned)) 
      return m.reply('*[❗] لا يمكنني إزالة نفسي، يرجى إزالتي يدويًا إذا رغبت في ذلك*');

    const responseb = await conn.groupParticipantsUpdate(m.chat, [mentioned], 'remove');
    const exitoso1 = `*@${mentioned.split('@')[0]} تم إزالته بنجاح من المجموعة*`;
    const error1 = `*@${mentioned.split('@')[0]} هو منشئ المجموعة، لا يمكنني إزالة منشئ المجموعة*`;
    const error2 = `*@${mentioned.split('@')[0]} تم إزالته بالفعل أو غادر المجموعة*`;

    if (responseb[0].status === '200') 
      m.reply(exitoso1, m.chat, { mentions: conn.parseMention(exitoso1) });
    else if (responseb[0].status === '406') 
      m.reply(error1, m.chat, { mentions: conn.parseMention(error1) });
    else if (responseb[0].status === '404') 
      m.reply(error2, m.chat, { mentions: conn.parseMention(error2) });
    else 
      conn.sendMessage(m.chat, { text: `*[❗] حدث خطأ غير متوقع*`, mentions: [m.sender], contextInfo: { forwardingScore: 999, isForwarded: true } }, { quoted: m });
  } else if (m.message.extendedTextMessage.contextInfo.mentionedJid != null && m.message.extendedTextMessage.contextInfo.mentionedJid != undefined) {
    return;
  }
};

handler.help = ['kick'];
handler.tags = ['group'];
handler.command = /^(kick|echar|hechar|sacar)$/i;
handler.admin = handler.group = handler.botAdmin = true;
export default handler;