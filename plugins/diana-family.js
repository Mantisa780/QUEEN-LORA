const { cmd } = require('../DianaTech');
const config = require('../config');

cmd({
    pattern: "family",
    alias: ["thanks", "dev"],
    desc: "Show developer supporters",
    category: "main",
    react: "💧",
    filename: __filename
},
async (conn, m, msg, { from, reply }) => {

try {

// ✅ Fake Verified Contact
const fakeVerified = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "🇵🇱QUEEN DIANA TECH💧",
      vcard: `BEGIN:VCARD
VERSION:3.0
FN:QUEEN LORA BOT
ORG:DIANA TECH VERIFIED;
TITLE:Official WhatsApp Bot
TEL;type=CELL;waid=18492823944:+18492823944
END:VCARD`
    }
  }
};

// ✅ Channel Info
const contextInfo = {
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: "120363336396621021@newsletter", // 🔁 mete pa ou si ou vle
    newsletterName: "💧 DIANA TECH OFFICIAL CHANNEL 💧",
    serverMessageId: 143
  }
};

// ✅ Image + Text
const image = "https://files.catbox.moe/glketz.jpg";

const text = `
╭──〔 💧 *HELLO, DIANA TECH* 〕──⬣

> Here are those who help and support the developer 💚

╭───────────────◆
│ 『 *THANKS TO* 』
│ ⇢ ChatGPT ( My God 😂 )
│ ⇢ Diana ( Developer 😎 )
│ ⇢ Kinaa ( My Friend 🤗 )
│ ⇢ Arslan ( My Friend 💕 )
│ ⇢ Weed ( My Friend 🥰 )
╰───────────────◆

✦ And others who supported DianaTech from the beginning 🙌

╭───────────────◆
│ 🇮🇳 *DianaTech Official Developer* ⚡
╰───────────────◆
`;

// ✅ Send Image with fake verified + channel
await conn.sendMessage(from, {
  image: { url: image },
  caption: text,
  contextInfo: contextInfo
}, { quoted: fakeVerified });

// ✅ Send Audio (auto play style)
await conn.sendMessage(from, {
  audio: { url: "https://bandaheali-cdn.koyeb.app/media/bot_1774100524021.mp3" },
  mimetype: "audio/mpeg",
  ptt: true,
  contextInfo: contextInfo
}, { quoted: fakeVerified });

} catch (e) {
console.log(e);
reply(`❌ Error: ${e}`);
}

});