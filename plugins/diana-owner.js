const { cmd } = require('../DianaTech');
const config = require('../config');

cmd({
    pattern: "owner",
    react: "👑",
    desc: "Get owner number",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from }) => {

try {

const ownerNumber = config.OWNER_NUMBER;
const ownerName = config.OWNER_NAME;

// VCARD CONTACT
const vcard =
`BEGIN:VCARD
VERSION:3.0
FN:${ownerName}
TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+','')}:${ownerNumber}
END:VCARD`;

await conn.sendMessage(from,{
contacts:{
displayName: ownerName,
contacts:[{ vcard }]
}
},{ quoted: mek });


// IMAGE MESSAGE
await conn.sendMessage(from,{
image:{ url:"https://files.catbox.moe/eb5fob.jpeg" },
caption:`╭━━〔 *${config.BOT_NAME || "DIANA TECH"}* 〕━━┈⊷
┃❍╭─────────────·๏
┃❍┃• *Here is the owner details*
┃❍┃• *Name* : ${ownerName}
┃❍┃• *Number* : ${ownerNumber}
┃❍┃• *Version* : 1.0.0
┃❍└───────────┈⊷
╰──────────────┈⊷
> © ${config.BOT_NAME || "DIANA TECH"}`,
contextInfo:{
mentionedJid:[ownerNumber.replace('+','') + "@s.whatsapp.net"],
forwardingScore:999,
isForwarded:true,
forwardedNewsletterMessageInfo:{
newsletterJid:'120363336396621021@newsletter',
newsletterName: config.BOT_NAME,
serverMessageId:101
}
}
},{ quoted: mek });


// VOICE NOTE
await conn.sendMessage(from,{
audio:{ url:"https://files.catbox.moe/jw8t7l.mp3" },
mimetype:"audio/mp4",
ptt:true
},{ quoted: mek });

}
catch(e){
console.log(e)
m.reply("An error occurred: " + e.message)
}

});