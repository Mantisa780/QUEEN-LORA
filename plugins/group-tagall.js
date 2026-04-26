const config = require('../config')
const { cmd, commands } = require('../DianaTech')
const { runtime } = require('../lib/functions')

cmd({
    pattern: "tagall",
    react: "🔊",
    alias: ["gc_tagall"],
    desc: "Tag all group members",
    category: "group",
    use: '.tagall [message]',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, isAdmins, isCreator, command, body }) => {
    try {

        if (!isGroup) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("❌ *GROUP ONLY COMMAND*");
        }

        if (!isAdmins && !isCreator) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("❌ *ADMIN ONLY COMMAND*");
        }

        let groupMetadata = await conn.groupMetadata(from);
        let groupName = groupMetadata.subject;
        let totalMembers = participants.length;

        const botName = "ǫᴜᴇᴇɴ ᴅɪᴀɴᴀ ᴀɪ";

        // 🔥 Style Packs
        const emojis = ['🔥','⚡','🚀','💎','👑','🌟','💥','🎯','🛡️','📢','🌀','✨'];
        const lines = ['━','─','═','▭','▰','⬣'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        const line = lines[Math.floor(Math.random() * lines.length)];

        // 📝 Message
        let message = body.slice(body.indexOf(command) + command.length).trim();
        if (!message) message = "🚨 Attention Everyone";

        // 💎 Ultra Header
        let teks = `
╔${line.repeat(5)}〔 👑 ${botName} 👑 〕${line.repeat(5)}╗
║ 🏷️  *GROUP:* ${groupName}
║ 👥  *MEMBERS:* ${totalMembers}
║ 💬  *MESSAGE:* ${message}
╚${line.repeat(15)}╝

┏━━━〔 🔊 𝗧𝗔𝗚 𝗔𝗟𝗟 𝗠𝗘𝗠𝗕𝗘𝗥𝗦 〕━━━┓
`;

        // 👥 Mentions (HI style + premium look)
        for (let mem of participants) {
            if (!mem.id) continue;
            teks += `┃ ${randomEmoji}  *HI* @${mem.id.split('@')[0]}\n`;
        }

        teks += `┗${line.repeat(20)}┛
✨ 𝗣𝗢𝗪𝗘𝗥𝗘𝗗 𝗕𝗬 ${botName.toUpperCase()} ⚡`;

        // 🖼️ Send with image
        await conn.sendMessage(from, {
            image: { url: "https://i.ibb.co/rRdvY8zL/upload-1777203469367-a36a6cfb-jpg.jpg" },
            caption: teks,
            mentions: participants.map(a => a.id)
        }, { quoted: mek });

    } catch (e) {
        console.error("TagAll Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});