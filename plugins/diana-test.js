const { cmd } = require('../DianaTech');

//==============================//
//        TEST VOICE CMD       //
//     QUEEN LORA AI SYSTEM    //
//==============================//

cmd({
    pattern: "test",
    alias: ["voice", "vn", "randomvn"],
    use: ".test",
    desc: "Send a random voice note from server.",
    category: "fun",
    react: "🎙️",
    filename: __filename
},

async (conn, mek, m, { from, sender, reply }) => {

    try {

        //==============================//
        //       VOICE URL LIST         //
        //==============================//

        const voiceList = [
            "https://files.catbox.moe/dcxfi1.mp3",
            "https://files.catbox.moe/ebkzu5.mp3",
            "https://files.catbox.moe/iq4ouj.mp3"
        ];

        if (!voiceList || voiceList.length === 0) {
            return reply("❌ No voice configured in the bot.");
        }

        // Pick Random Voice
        const randomVoice = voiceList[Math.floor(Math.random() * voiceList.length)];

        //==============================//
        //       FAKE VERIFIED CONTACT  //
        //==============================//

        const fakeContact = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "QUEEN LORA VERIFIED ✅",
                    vcard: `
BEGIN:VCARD
VERSION:3.0
FN:DIANA TECH
ORG:QUEEN LORA AI
TEL;type=CELL;type=VOICE;waid=18492823944:+18492823944
END:VCARD`
                }
            }
        };

        //==============================//
        //        SEND VOICE NOTE       //
        //==============================//

        await conn.sendMessage(from, {
            audio: { url: randomVoice },
            mimetype: "audio/mp4",
            ptt: true,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,

                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363336396621021@newsletter",
                    newsletterName: "☘️ Official QUEEN LORA Channel ☘️",
                    serverMessageId: 143
                },

                externalAdReply: {
                    title: "👑 QUEEN LORA AI",
                    body: "Advanced Multi-Device WhatsApp Bot",
                    thumbnailUrl: "https://files.catbox.moe/eb5fob.jpeg",
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    showAdAttribution: true,
                    sourceUrl: "https://github.com/QUEEN-DIANA/QUEEN-LORA"
                }
            }

        }, { quoted: fakeContact });

    } catch (error) {

        console.log("TEST CMD ERROR:", error);
        reply(`❌ Error: ${error.message}`);

    }

});


//================================//
//         TEST2 COMMAND          //
//        QUEEN LORA SYSTEM       //
//================================//

cmd({
    pattern: "test2",
    alias: ["voice2", "vn2"],
    use: ".test2",
    desc: "Send styled message with random voice note.",
    category: "fun",
    react: "🎧",
    filename: __filename
},

async (conn, mek, m, { from, sender, pushname, reply }) => {

try {

    //==============================//
    //        VOICE LIST            //
    //==============================//

    const voices = [
        "https://files.catbox.moe/dcxfi1.mp3",
        "https://files.catbox.moe/ebkzu5.mp3",
        "https://files.catbox.moe/iq4ouj.mp3"
    ];

    if (!voices.length) return reply("❌ Voice list empty.");

    const randomVoice = voices[Math.floor(Math.random() * voices.length)];

    //==============================//
    //       MESSAGE STYLE          //
    //==============================//

    let message = `
╭━━〔 👑 *QUEEN LORA AI* 〕━━⬣
┃ 🎧 *Random Voice Sent*
┃ 👤 User : ${pushname}
┃ ⚡ Powered By Diana Tech
╰━━━━━━━━━━━━━━━━━━⬣
`;

    await conn.sendMessage(from, {
        text: message,
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363336396621021@newsletter',
                newsletterName: "QUEEN LORA OFFICIAL",
                serverMessageId: 101
            },
            externalAdReply: {
                title: "QUEEN LORA AI",
                body: "Next Generation WhatsApp Bot",
                thumbnailUrl: "https://files.catbox.moe/3lzhi9.jpg",
                mediaType: 1,
                renderLargerThumbnail: true,
                showAdAttribution: true,
                sourceUrl: "https://github.com/QUEEN-DIANA/QUEEN-LORA"
            }
        }
    }, { quoted: mek });

    //==============================//
    //        SEND VOICE            //
    //==============================//

    await conn.sendMessage(from, {
        audio: { url: randomVoice },
        mimetype: "audio/mp4",
        ptt: true
    }, { quoted: mek });

} catch (e) {

    console.log("TEST2 ERROR:", e);
    reply(`❌ Error: ${e.message}`);

}

});