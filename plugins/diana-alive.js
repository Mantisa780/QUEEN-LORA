const { cmd, commands } = require('../DianaTech');
const os = require("os");
const config = require('../config');

cmd({
    pattern: "alive",
    alias: ["status", "live"],
    desc: "Check uptime and system status",
    category: "main",
    react: "🟢",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {

        const totalCmds = commands.length;

        // ⏱️ UPTIME
        const sec = process.uptime();
        const h = Math.floor(sec / 3600);
        const min = Math.floor((sec % 3600) / 60);
        const s = Math.floor(sec % 60);
        const uptime = `${h}h ${min}m ${s}s`;

        // 📅 DATE
        const now = new Date();
        const date = now.toLocaleDateString(); // day / month / year

        // ⏰ TIME
        const time = now.toLocaleTimeString(); // hour / minute / second

        const status = `
╭━━━〔 ⚡ *LORA XMD* ⚡ 〕━━━⬣
┃
┃ 🤖 *Bot:* QUEEN LORA
┃ 👑 *Owner:* ${config.OWNER_NAME || "Diana Tech"}
┃ 🌐 *Mode:* ${config.MODE || "public"}
┃ 🔹 *Prefix:* ${config.PREFIX || "."}
┃ 💻 *Platform:* ${os.platform()}
┃ 🧩 *Commands:* ${totalCmds}
┃
┃ ⏱️ *Uptime:* ${uptime}
┃ 📅 *Date:* ${date}
┃ ⏰ *Time:* ${time}
┃
┃ 🚀 *Speed:* Ultra Fast ⚡
┃ 🧠 *Version:* 3.0 Pro
┃
╰━━━━━━━━━━━━━━━━━━⬣

『 🟢 *STATUS: ONLINE & ACTIVE* 』

> ⚡ Powered by DianaTech Engine  
> 💎 Premium WhatsApp Bot 😈
`;

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/p6tij3.jpg" },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363336396621021@newsletter",
                    newsletterName: "☘️ Official DIANATECH Channel ☘️",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});