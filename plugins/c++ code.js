// import and other necessary initializations

const handler = async (m, { conn, text, isOwner, isRAdmin, isAdmin, isBotAdmin, isPrems, chatUpdate, __dirname: ___dirname, __filename }) => {
  if (typeof text !== 'string') return;

  // Check for the custom command "وليد" without prefix
  if (text.toLowerCase().includes('وليد')) {
    await conn.sendMessage(m.chat, { react: { text: '♥', key: m.key } });
    await conn.sendMessage(m.chat, { text: 'منور وليد', quoted: m });
    return; // Ensure no further processing
  }

  // Your existing command processing logic here
  let usedPrefix;
  if ((usedPrefix = (match[0] || '')[0])) {
    const noPrefix = m.text.replace(usedPrefix, '');
    let [command, ...args] = noPrefix.trim().split` `.filter((v) => v);
    args = args || [];
    const _args = noPrefix.trim().split` `.slice(1);
    const text = _args.join` `;
    command = (command || '').toLowerCase();
    const fail = plugin.fail || global.dfail; // When failed
    const isAccept = plugin.command instanceof RegExp ?
      plugin.command.test(command) :
      Array.isArray(plugin.command) ?
        plugin.command.some((cmd) => cmd instanceof RegExp ? cmd.test(command) : cmd === command) :
        typeof plugin.command === 'string' ?
          plugin.command === command :
          false;

    if (!isAccept) continue;
    // Handle the command logic here...
  }
};

export default handler;