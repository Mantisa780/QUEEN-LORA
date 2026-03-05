// 📜 Plugin: MENU (Stylisé)
const fs = require('fs');
const path = require('path');
const os = require('os');
const config = require('../../config');
const { getSettings } = require('../../lib/database');
const { formatUptime } = require('../../lib/functions');

/* ========= RUNTIME FUNCTION ========= */
function runtime(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
}

module.exports = {
    name: 'menu',
    aliases: ['help', 'allmenu'],
    category: 'misc',
    description: 'Show styled menu',
    usage: '.menu',
    groupOnly: false,
    ownerOnly: false,
    adminOnly: false,
    newsletterShow: true,

    execute: async (client, message) => {

        try {

            const jid = message.key?.remoteJid;
            if (!jid) return;

            /* ========= FAKE VERIFIED ========= */

            const fakeVerified = {
                key: {
                    fromMe: false,
                    participant: "0@s.whatsapp.net",
                    remoteJid: "status@broadcast"
                },
                message: {
                    contactMessage: {
                        displayName: "🔵 𝐃𝐈𝐀𝐍𝐀-𝐗𝐌𝐃 ✔️",
                        vcard: `BEGIN:VCARD
VERSION:3.0
FN:𝐃𝐈𝐀𝐍𝐀 𝐗𝐌𝐃 𝐁𝐎𝐓
ORG:𝐃𝐈𝐀𝐍𝐀-𝐗𝐌𝐃 VERIFIED;
TITLE:Official WhatsApp Bot
TEL;type=CELL;type=VOICE;waid=18492823944:+18492823944
END:VCARD`
                    }
                }
            };

            /* ========= REACTION ========= */

            await client.sendMessage(jid, {
                react: { text: "💗", key: message.key }
            });

            /* ========= AUDIO (FIXED) ========= */

            await client.sendMessage(jid, {
                audio: { url: "https://files.catbox.moe/1ydyks.mp3" },
                mimetype: "audio/mpeg",
                ptt: true
            }, { quoted: fakeVerified });

            const settings = getSettings() || {};
            const prefix = settings.prefix || config.prefix || ".";
            const botName = settings.botName || config.botName || "DIANA XMD";
            const username = message.pushName || "User";

            /* ========= DATE INFO ========= */

            const now = new Date();
            const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
            const date = now.getDate();
            const month = now.toLocaleDateString("en-US", { month: "long" });
            const year = now.getFullYear();
            const time = now.toLocaleTimeString();

            /* ========= LOAD PLUGINS ========= */

            const pluginsDir = path.join(__dirname, '../../plugins');

            if (!fs.existsSync(pluginsDir)) {
                return client.sendMessage(jid, {
                    text: "❌ Plugins folder not found."
                }, { quoted: fakeVerified });
            }

            const categoryFolders = fs.readdirSync(pluginsDir)
                .filter(f => fs.lstatSync(path.join(pluginsDir, f)).isDirectory());

            let categories = {};

            for (const category of categoryFolders) {

                const catPath = path.join(pluginsDir, category);
                const files = fs.readdirSync(catPath)
                    .filter(file => file.endsWith('.js'));

                categories[category] = [];

                for (const file of files) {
                    try {
                        delete require.cache[require.resolve(path.join(catPath, file))];
                        const pluginModule = require(path.join(catPath, file));

                        const cmds = Array.isArray(pluginModule)
                            ? pluginModule
                            : [pluginModule];

                        for (const plugin of cmds) {
                            if (plugin?.name) {
                                categories[category].push(`${prefix}${plugin.name}`);
                            }
                        }

                    } catch (err) {
                        console.log("Plugin load error:", file);
                    }
                }
            }

            /* ========= BUILD MENU ========= */

            const sortedCats = Object.keys(categories).sort();
            let menuText = "";

            for (const cat of sortedCats) {

                const sortedCommands = categories[cat].sort();
                if (!sortedCommands.length) continue;

                menuText += `
『 🇵🇱 *\`${cat.toUpperCase()}\`* 』
╭━━━━━━━━━━━━━━━━━┈⊷
${sortedCommands.map(cmd => `├▢ 🎊 ${cmd}`).join('\n')}
╰━━━━━━━━━━━━━━━┈⊷
`;
            }

            /* ========= CAPTION ========= */

            const caption = `
╭━━〔 🎀${botName}🎀 〕━━┈⊷
┃💧╭────────────────
┃💧│ 👤 USER : ${username}
┃💧│ 📡 STATUS : ACTIVE
┃💧│ ⚙️ MODE : ${config.MODE || "public"}
┃💧│ ⏳ RUNTIME : ${runtime(process.uptime())}
┃💧│ 🔰 PREFIX : [ ${prefix} ]
┃💧│ 📅 DAY : ${dayName}
┃💧│ 📆 DATE : ${date} ${month} ${year}
┃💧│ 🕒 TIME : ${time}
┃💧╰────────────────
╰━━━━━━━━━━━━━━━━━┈⊷

${menuText}

> ${config.DESCRIPTION || "Bot Command List"}
`;

            const mentionId = message.key.participant
                ? message.key.participant
                : message.key.remoteJid;

            /* ========= SEND IMAGE ========= */

            await client.sendMessage(jid, {
                image: {
                    url: config.MENU_IMAGE_URL || "https://files.catbox.moe/bb64oo.jpg"
                },
                caption: caption,
                contextInfo: {
                    mentionedJid: [mentionId],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363336396621021@newsletter',
                        newsletterName: botName,
                        serverMessageId: 8
                    },
                    externalAdReply: {
                        title: "🌐 QUEEN DIANA TECH 🌐",
                        body: "𝚅𝙴𝙽𝙾𝙼 𝙼𝙸𝙽𝙸 𝙱𝙾𝚃",
                        thumbnailUrl: "https://i.ibb.co/HTJ1zmLY/399b2646926e.jpg",
                        sourceUrl: "https://whatsapp.com/channel/0029VajohKp5a2498c8Dbl2Y",
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: fakeVerified });

        } catch (e) {
            console.log("MENU ERROR:", e);
        }
    }
};
