const config = require('../config')
const { cmd, commands } = require('../DianaTech')
const { runtime } = require('../lib/functions')

cmd({
    pattern: "list",
    alias: ["listcmd", "commands","menu3"],
    desc: "Show all available commands",
    category: "menu",
    react: "👑",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {

        const totalCommands = Object.keys(commands).length

        let aliasCount = 0
        Object.values(commands).forEach(cmd => {
            if (cmd.alias) aliasCount += cmd.alias.length
        })

        const categories = [...new Set(Object.values(commands).map(c => c.category))]

        let menuText = `
╭━━━〔 👑 𝐐𝐔𝐄𝐄𝐍 𝐋𝐎𝐑𝐀 𝐌𝐄𝐍𝐔 👑 〕━━━⬣
┃
┃ 🌸 *BOT INFORMATION*
┃ ───────────────
┃ 🤖 *Bot Name* : ${config.BOT_NAME}
┃ 👑 *Owner* : ${config.OWNER_NAME}
┃ ⚡ *Prefix* : ${config.PREFIX}
┃ 🌐 *Platform* : NodeJS
┃ 📦 *Version* : 3.0.0
┃ ⏳ *Runtime* : ${runtime(process.uptime())}
┃
┃ 📊 *BOT STATISTICS*
┃ ───────────────
┃ 📜 Commands : ${totalCommands}
┃ 🔄 Aliases : ${aliasCount}
┃ 📂 Categories : ${categories.length}
╰━━━━━━━━━━━━━━━━━━⬣

`

        const categorized = {}
        categories.forEach(cat => {
            categorized[cat] = Object.values(commands).filter(c => c.category === cat)
        })

        for (const [category, cmds] of Object.entries(categorized)) {

            menuText += `
╭━━〔 📂 ${category.toUpperCase()} COMMANDS 〕━━⬣
┃ 📜 Total : ${cmds.length}
┃
`

            cmds.forEach(c => {

                menuText += `┃ ✦ ${config.PREFIX}${c.pattern}\n`
                menuText += `┃ 📝 ${c.desc || 'No description'}\n`

                if (c.alias && c.alias.length > 0) {
                    menuText += `┃ 🔹 Alias : ${c.alias.map(a => config.PREFIX + a).join(', ')}\n`
                }

                if (c.use) {
                    menuText += `┃ 💡 Usage : ${c.use}\n`
                }

                menuText += `┃\n`
            })

            menuText += `╰━━━━━━━━━━━━━━━━⬣\n`
        }

        menuText += `
╭━━━〔 🌟 QUEEN LORA SYSTEM 〕━━━⬣
┃ 💡 *Tip* : Use ${config.PREFIX}help <command>
┃ 📢 Channel : Queen Lora Official
┃ 🚀 Powered By : DianaTech
╰━━━━━━━━━━━━━━━━━━⬣

> ${config.DESCRIPTION || '👑 Queen Lora Tech Family Bot'}
`

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/zff8e0.jpg' },
                caption: menuText,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363336396621021@newsletter',
                        newsletterName: '👑 QUEEN LORA OFFICIAL CHANNEL',
                        serverMessageId: 143
                    },
                    externalAdReply: {
                        title: "👑 QUEEN LORA XMD",
                        body: "Ultra Powerful WhatsApp Bot",
                        thumbnailUrl: config.MENU_IMAGE_URL || 'https://files.catbox.moe/3lzhi9.jpg',
                        sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            },
            { quoted: mek }
        )

    } catch (e) {
        console.error('Command List Error:', e)
        reply(`❌ Error generating command list: ${e.message}`)
    }
})