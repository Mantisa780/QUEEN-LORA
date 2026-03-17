const config = require('../config');
const { cmd } = require('../DianaTech');
const os = require('os');

cmd({
    pattern: "ping",
    alias: ["speed","pong"],
    use: '.ping',
    desc: "Check bot speed and status",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {

        const start = new Date().getTime();

        const reactions = ['⚡','🚀','🔥','💎','✨','🌟','🎯','🛸'];
        const randomReact = reactions[Math.floor(Math.random() * reactions.length)];

        await conn.sendMessage(from,{ react:{ text: randomReact, key: mek.key } });

        const loading = await conn.sendMessage(from,{
            text:"```⚡ Testing QUEEN LORA speed...```"
        },{quoted: mek});

        const end = new Date().getTime();
        const speed = end - start;

        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        const message = `
╭━━━〔 👑 𝐐𝐔𝐄𝐄𝐍 𝐋𝐎𝐑𝐀 𝐒𝐘𝐒𝐓𝐄𝐌 👑 〕━━━⬣
┃
┃ ⚡ 𝐒𝐏𝐄𝐄𝐃 𝐓𝐄𝐒𝐓
┃ ───────────────
┃ 👤 User : @${sender.split("@")[0]}
┃ 🚀 Response : ${speed} ms
┃ 🟢 Status : ONLINE
┃
┃ ⚙️ 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎
┃ ───────────────
┃ 🧠 Engine : Node ${process.version}
┃ 💻 Platform : ${os.platform()}
┃ 🔋 Uptime : ${hours}h ${minutes}m ${seconds}s
┃
┃ 🌟 Bot : QUEEN LORA XMD
┃ 👑 Owner : DianaTech
┃
╰━━━━━━━━━━━━━━━━━━⬣`;

        await conn.sendMessage(from,{
            text: message,
            contextInfo:{
                mentionedJid:[sender],
                forwardingScore:999,
                isForwarded:true,
                forwardedNewsletterMessageInfo:{
                    newsletterJid:'120363336396621021@newsletter',
                    newsletterName:'👑 QUEEN LORA OFFICIAL CHANNEL',
                    serverMessageId:143
                },
                externalAdReply:{
                    title:"👑 QUEEN LORA XMD",
                    body:"Ultra Powerful WhatsApp Bot",
                    thumbnailUrl:"https://files.catbox.moe/2enu97.jpg",
                    sourceUrl:"https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
                    mediaType:1,
                    renderLargerThumbnail:true
                }
            }
        },{quoted: mek});

    } catch(e) {
        console.log(e);
        reply("❌ Error: " + e.message);
    }
});