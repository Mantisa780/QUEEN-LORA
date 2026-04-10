const { cmd } = require('../DianaTech');
const axios = require('axios');
const config = require('../config');

cmd({
    pattern: "pair",
    desc: "Get WhatsApp pairing code",
    category: "main",
    react: "🔐",
    filename: __filename
},
async (sock, m, msg, { text, prefix }) => {

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

    if (!text) {
        return sock.sendMessage(
            m.chat,
            { text: `❓ Example:\n${prefix}pair 62XXXXXXXX` },
            { quoted: m }
        );
    }

    try {

        await sock.sendMessage(m.chat, {
            react: { text: "⌛", key: m.key }
        });

        const number = text.replace(/[^0-9]/g, '');

        if (number.length < 10) {
            return sock.sendMessage(
                m.chat,
                { text: "❌ Invalid number format.\nExample: 62XXXXXXXX" },
                { quoted: m }
            );
        }

        // Wake server
        await axios.get("https://queen-lora-session.onrender.com").catch(() => {});

        const apiUrl = `https://queen-lora-session.onrender.com/code?number=${number}`;
        const response = await axios.get(apiUrl, { timeout: 20000 });

        if (!response.data?.code) {
            throw new Error("Invalid API response");
        }

        const pairingCode = response.data.code;

        await sock.sendMessage(m.chat, {
            react: { text: "✅", key: m.key }
        });

        // 🔥 IMAGE + CODE
        await sock.sendMessage(
            m.chat,
            {
                image: { url: "https://files.catbox.moe/e57x62.jpg" },
                caption:
`👑 *DIANA-XMD VERIFICATION*

🔑 *Your Link Code:*
📱 Number: ${number}
\`\`\`
⏳ Code: ${pairingCode}
\`\`\`
----------------------------
📱 *How to Link Your Device:*

1️⃣ Open *WhatsApp*
2️⃣ Tap *Linked Devices*
3️⃣ Tap *Link a Device*
4️⃣ Choose *Link with phone number instead*
5️⃣ Enter the code above`,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363336396621021@newsletter',
                        newsletterName: config.BOT_NAME || "DIANA-XMD",
                        serverMessageId: 8
                    }
                }
            },
            { quoted: fakeVerified }
        );

        // 🔥 Code Alone (Easy Copy)
        await sock.sendMessage(
            m.chat,
            {
                text: `\`\`\`\n${pairingCode}\n\`\`\``
            },
            { quoted: m }
        );

    } catch (err) {

        console.error("PAIR ERROR:", err.message);

        await sock.sendMessage(m.chat, {
            react: { text: "❌", key: m.key }
        });

        await sock.sendMessage(
            m.chat,
            { text: "❌ Failed to generate pairing code.\nMake sure API server is online." },
            { quoted: m }
        );
    }
});

// PAIR2

cmd({
    pattern: "pair2",
    desc: "Generate WhatsApp Pairing Code",
    category: "system",
    react: "📲",
    filename: __filename
},
async (sock, m, msg, { text, prefix }) => {

const verified = {
key: {
fromMe: false,
participant: "0@s.whatsapp.net",
remoteJid: "status@broadcast"
},
message: {
contactMessage: {
displayName: "👑 QUEEN LORA VERIFIED",
vcard: `BEGIN:VCARD
VERSION:3.0
FN:QUEEN LORA BOT
ORG:QUEEN LORA XMD;
TITLE:Official Bot System
TEL;type=CELL;type=VOICE;waid=18492823944:+18492823944
END:VCARD`
}
}
};

if (!text) {
return sock.sendMessage(
m.chat,
{ text: `📲 *Usage Example:*\n${prefix}pair2 18XXXXXXXX` },
{ quoted: m }
);
}

try {

await sock.sendMessage(m.chat,{ react:{ text:"⏳", key:m.key }});

const number = text.replace(/[^0-9]/g,'');

if (number.length < 8) {
return sock.sendMessage(
m.chat,
{ text:"❌ Invalid number.\nExample: 18XXXXXXXX"},
{ quoted:m }
);
}

await axios.get("https://queen-lora-session.onrender.com").catch(()=>{});

const res = await axios.get(`https://queen-lora-session.onrender.com/code?number=${number}`);

const code = res.data.code;

await sock.sendMessage(m.chat,{ react:{ text:"✅", key:m.key }});

await sock.sendMessage(
m.chat,
{
image:{ url:"https://files.catbox.moe/cp2suv.jpeg" },
caption:
`╭━━━〔 👑 *QUEEN LORA PAIRING* 〕━━⬣
┃
┃📱 *Number:* ${number}
┃
┃🔐 *Pairing Code*
┃\`\`\`
┃ ${code}
┃\`\`\`
┃
┣━━〔 📖 HOW TO CONNECT 〕━━⬣
┃ 1️⃣ Open *WhatsApp*
┃ 2️⃣ Go to *Linked Devices*
┃ 3️⃣ Click *Link a Device*
┃ 4️⃣ Select *Link with phone number*
┃ 5️⃣ Enter the code above
┃
┣━━〔 ⚡ SYSTEM INFO 〕━━⬣
┃🤖 Bot : ${config.BOT_NAME || "QUEEN LORA"}
┃🚀 Mode : Pairing System
┃🔒 Status : Secure
╰━━━━━━━━━━━━━━━━━━⬣`,
contextInfo:{
mentionedJid:[m.sender],
forwardingScore:999,
isForwarded:true,
forwardedNewsletterMessageInfo:{
newsletterJid:'120363336396621021@newsletter',
newsletterName:'👑 QUEEN LORA OFFICIAL',
serverMessageId:143
}
}
},
{ quoted: verified }
);

// code alone
await sock.sendMessage(
m.chat,
{ text:`🔑 *COPY YOUR CODE*\n\n\`\`\`${code}\`\`\`` },
{ quoted:m }
);

} catch(e){

console.log("PAIR ERROR:",e);

await sock.sendMessage(m.chat,{ react:{ text:"❌", key:m.key }});

await sock.sendMessage(
m.chat,
{ text:"❌ Unable to generate pairing code.\nServer may be offline." },
{ quoted:m }
);

}

});