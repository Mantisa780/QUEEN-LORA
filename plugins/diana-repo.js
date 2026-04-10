const config = require('../config')
const { cmd, commands } = require('../DianaTech')
const os = require("os")
const { runtime, sleep } = require('../lib/functions')
const axios = require('axios')

// ✅ FAKE VERIFIED
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

cmd({
    pattern: "repo",
    alias: ["sc", "script", "repository"],
    desc: "Fetch information about a GitHub repository.",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {

    const githubRepoURL = 'https://github.com/QUEEN-DIANA/QUEEN-LORA';

    try {

        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
        const repoData = response.data;

        // ✅ SYSTEM INFO
        const uptime = runtime(process.uptime());
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2);
        const freeMem = (os.freemem() / 1024 / 1024).toFixed(2);

        const formattedInfo = `
╭━━━〔 👑 *QUEEN LORA XMD* 〕━━━⬣
┃ ✨ *OFFICIAL GITHUB REPOSITORY*
┃
┣━━━〔 📦 REPO DETAILS 〕━━━⬣
┃ 📌 *Name:* ${repoData.name}
┃ 👑 *Owner:* ${repoData.owner.login}
┃ 🌍 *Visibility:* ${repoData.private ? "Private 🔒" : "Public 🌐"}
┃ 🧾 *Description:* 
┃ ${repoData.description || 'Powerful WhatsApp Bot By QUEEN LORA'}
┃
┣━━━〔 📊 STATISTICS 〕━━━⬣
┃ ⭐ *Stars:* ${repoData.stargazers_count}
┃ 🍴 *Forks:* ${repoData.forks_count}
┃
┣━━━〔 🔗 LINKS REPO〕━━━⬣
┃ 🌐 ${repoData.html_url}
┃
┣━━━〔 🔐 LINKS PAIR 〕━━━⬣ 
┃ https://queen-lora-session.onrender.com
┃
┣━━━〔 ⚙️ SYSTEM 〕━━━⬣
┃ ⏳ *Uptime:* ${uptime}
┃ 💾 *RAM:* ${freeMem}MB / ${totalMem}MB
┃ 💻 *Platform:* ${os.platform()}
┃
╰━━〔 ⚡ POWERED BY DIANA TECH 〕━━⬣
`.trim();

        // ✅ IMAGE + NEWSLETTER
        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/3lzhi9.jpg" },
            caption: formattedInfo,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363336396621021@newsletter',
                    newsletterName: 'QUEEN LORA OFFICIAL',
                    serverMessageId: 200
                }
            }
        }, { quoted: fakeVerified });

        // ✅ AUDIO
        const audioBuffer = await axios.get(
            "https://files.catbox.moe/1ou55h.mp3",
            { responseType: "arraybuffer" }
        );

        await conn.sendMessage(from, {
            audio: audioBuffer.data,
            mimetype: 'audio/mpeg',
            ptt: true,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363336396621021@newsletter',
                    newsletterName: 'QUEEN LORA OFFICIAL',
                    serverMessageId: 200
                }
            }
        }, { quoted: fakeVerified });

    } catch (e) {
        console.log(e);
        reply("❌ Unable to fetch repository data!");
    }
});