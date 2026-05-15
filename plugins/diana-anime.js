const config = require('../config')
const { cmd, commands } = require('../DianaTech')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const fs = require('fs');
const axios = require('axios')
var imgmsg = "*Give me a anime name !*"
var descgs = "It gives details of given anime name."
var cants = "I cant find this anime."

//====================================================================================
cmd({
    pattern: "garl",
    alias: ["imgloli"],
    react: '😎',
    desc: "Download anime loli images.",
    category: "anime",
    use: '.loli',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let res = await axios.get('https://api.lolicon.app/setu/v2?num=1&r18=0&tag=lolicon')
let wm = `😎 Random Garl image

> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅɪᴀɴᴀ ᴛᴇᴄʜ`
await conn.sendMessage(from, { image: { url: res.data.data[0].urls.original }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})

//==========anime=====

cmd({
    pattern: "anime",
    desc: "Premium anime image gallery",
    category: "anime",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m, {
    from,
    pushname,
    reply
}) => {

try {

const images = [
    "https://telegra.ph/file/b26f27aa5daaada031b90.jpg",
    "https://telegra.ph/file/51b44e4b086667361061b.jpg",
    "https://telegra.ph/file/7d165d73f914985542537.jpg",
    "https://telegra.ph/file/3d9732d2657d2d72dc102.jpg",
    "https://telegra.ph/file/8daf7e432a646f3ebe7eb.jpg",
    "https://telegra.ph/file/7514b18ea89da924e7496.jpg",
    "https://telegra.ph/file/ce9cb5acd2cec7693d76b.jpg"
];

const captions = [

`╭━━━〔 🌸 DIANA ANIME 🌸 〕━━━⬣
┃ 👤 User : ${pushname}
┃ ⚡ System : ${config.BOT_NAME}
┃ 💎 Owner : Diana Tech
╰━━━━━━━━━━━━━━━━━━⬣`,

`╭━━━〔 💫 WAIFU COLLECTION 💫 〕━━━⬣
┃ 🎀 Beautiful Anime Girl
┃ 🚀 Fast & Smooth
┃ 💎 ${config.BOT_NAME}
╰━━━━━━━━━━━━━━━━━━⬣`,

`╭━━━〔 🧚 OTAKU WORLD 🧚 〕━━━⬣
┃ 🌺 Premium Anime Pic
┃ ✨ Ultra HD Quality
┃ 💎 Diana Tech Power
╰━━━━━━━━━━━━━━━━━━⬣`,

`╭━━━〔 ❤️ ANIME LOVE ❤️ 〕━━━⬣
┃ 🔥 Random Anime Drop
┃ ⚡ Clean Experience
┃ 💎 ${config.BOT_NAME}
╰━━━━━━━━━━━━━━━━━━⬣`,

`╭━━━〔 👑 WAIFU VIBES 👑 〕━━━⬣
┃ 🌸 Enjoy Your Image
┃ 💖 Premium Gallery
┃ 💎 Anime System
╰━━━━━━━━━━━━━━━━━━⬣`,

`╭━━━〔 🌹 FINAL EDITION 🌹 〕━━━⬣
┃ 🎀 Best Anime Style
┃ ⚡ Ultra Fast Bot
┃ 💎 Diana Tech
╰━━━━━━━━━━━━━━━━━━⬣`,

`╭━━━〔 ✨ LAST IMAGE ✨ 〕━━━⬣
┃ 🌸 Thanks For Using
┃ 👑 Powered By Diana Tech
┃ 💎 Anime Collection
╰━━━━━━━━━━━━━━━━━━⬣`

];

for (let i = 0; i < images.length; i++) {

await conn.sendMessage(from, {
    image: { url: images[i] },
    caption: captions[i],
    contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
            title: "🌸 QUEEN-LORA ANIME 🌸",
            body: "© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅɪᴀɴᴀ ᴛᴇᴄʜ",
            thumbnailUrl: images[i],
            sourceUrl: "https://github.com",
            mediaType: 1,
            renderLargerThumbnail: true
        }
    }
}, { quoted: mek });

}

} catch (e) {
console.log(e);
reply(`${e}`);
}
});