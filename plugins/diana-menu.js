const config = require('../config')
const { cmd, commands } = require('../DianaTech');
const { runtime } = require('../lib/functions')

cmd({
    pattern: "menu",
    alias: ["allmenu", "fullmenu"],
    use: '.menu',
    desc: "Show all bot commands",
    category: "menu",
    react: "💗",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
try {

/* ================= SEND VOICE FIRST ================= */

await conn.sendMessage(from, {
  audio: { url: "https://files.catbox.moe/1ou55h.mp3" },
  mimetype: "audio/mp4",
  ptt: true
}, { quoted: mek });

/* ================= TOTAL COMMANDS ================= */

let totalCommands = Object.values(commands)
    .filter(cmd => cmd && cmd.pattern)
    .length;

/* ================= CATEGORY SYSTEM ================= */

let categories = {};

Object.values(commands).forEach(cmdData => {

    if (!cmdData || !cmdData.pattern) return;

    let category = cmdData.category || "other";

    if (!categories[category]) {
        categories[category] = [];
    }

    categories[category].push(`${config.PREFIX}${cmdData.pattern}`);
});

/* ======== THEME ========== */

const theme = {
    emoji: "🇭🇹"
};

let menuText = "";

/* ========= SORT & BUILD MENU ============= */

const sortedCats = Object.keys(categories).sort();

for (const cat of sortedCats) {

    const sortedCommands = categories[cat].sort();

    menuText += `
『 ${theme.emoji} *\`${cat.toUpperCase()}\`* 』
╭━━━━━━━━━━━━━━━━━┈⊷
${sortedCommands
    .map(cmd => `├▢ ☘️ ${cmd}`)
    .join('\n')}
╰━━━━━━━━━━━━━━━┈⊷
`;
}

/* ======= MAIN HEADER ========== */

let dec = `
╭━━〔 🎀${config.BOT_NAME}🎀 〕━━┈⊷
┃💧╭────────────────
┃💧│ ᴏᴡɴᴇʀ : ${config.OWNER_NAME}
┃💧│ sᴛᴀᴛᴜs : ᴀᴄᴛɪᴠᴇ
┃💧│ ᴄᴏᴍᴍᴀɴᴅs : ${totalCommands}
┃💧│ ᴍᴏᴅᴇ : ${config.MODE}
┃💧│ ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}
┃💧│ ᴘʀᴇꜰɪx : [ ${config.PREFIX} ]
┃💧╰────────────────
╰━━━━━━━━━━━━━━━━━┈⊷

${menuText}

> ${config.DESCRIPTION}
`;

/* ============= SEND MENU IMAGE QUEEN LORA =============== */

await conn.sendMessage(from, {
    image: { 
        url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/3lzhi9.jpg'
    },
    caption: dec,
    contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,

        externalAdReply: {
            title: "🌟 𝐐𝐔𝐄𝐄𝐍 𝐋𝐎𝐑𝐀 𝐗𝐌𝐃 ✨",
            body: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅɪᴀɴᴀ ᴛᴇᴄʜ",
            thumbnailUrl: "https://files.catbox.moe/5o31sb.jpg",
            sourceUrl: "https://whatsapp.com/channel/0029VajohKp5a2498c8Dbl2Y",
            mediaType: 1,
            renderLargerThumbnail: false
        },

        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363336396621021@newsletter',
            newsletterName: config.BOT_NAME,
            serverMessageId: 8
        }

    }
}, { quoted: mek });

} catch (e) {
console.log(e);
reply(`Error: ${e}`);
}
});