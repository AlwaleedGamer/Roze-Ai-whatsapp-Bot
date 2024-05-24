module.exports.config = {
  name: "eval",
  version: "1.0.5",
  hasPermssion: 2,
  credits: "ABD AL RHMN - DRIDI-RAYEN",
  description: "Execute JavaScript code",
  usePrefix: true,
  commandCategory: "〘 المطور 〙",
  usages: "[code]",
  cooldowns: 5
};

module.exports.run = async function({ api, message, args, event }) {
  const allowedID = "249967264949"; // ID المستخدم المسموح له

  try {
    // التحقق من ID المستخدم
    if (event.senderID !== allowedID) {
      api.sendMessage("❌ لا تملك الصلاحيات لاستخدام هذا الأمر.", event.threadID, event.messageID);
      return;
    }

    function output(msg) {
      if (typeof msg === "number" || typeof msg === "boolean" || typeof msg === "function")
        msg = msg.toString();
      else if (msg instanceof Map) {
        let text = `Map(${msg.size}) `;
        text += JSON.stringify(mapToObj(msg), null, 2);
        msg = text;
      } else if (typeof msg === "object")
        msg = JSON.stringify(msg, null, 2);
      else if (typeof msg === "undefined")
        msg = "undefined";

      api.sendMessage(msg, event.threadID, event.messageID);
    }

    function mapToObj(map) {
      const obj = {};
      map.forEach(function(v, k) {
        obj[k] = v;
      });
      return obj;
    }

    if (args.length === 0) {
      message.reply("❌ اكتب شيئا.");
      return;
    }

    const cmd = `
    (async () => {
      try {
        ${args.join(" ")}
      } catch (err) {
        console.log("eval command", err);
        api.sendMessage(err.message, event.threadID, event.messageID);
      }
    })()`;

    eval(cmd);
  } catch (err) {
    api.sendMessage(err.message, event.threadID, event.messageID);
    console.log(err);
  }
};
