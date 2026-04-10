const { cmd } = require('../DianaTech');
const axios = require('axios');

cmd({
    pattern: "ai",
    desc: "AI Assistant (GPT-4)",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (sock, m, msg, { from, args, reply }) => {
    try {

        const text = args.join(" ");

        if (!text) {
            return reply("🤖 Example: .ai What is the capital of France?");
        }

        // Typing
        await sock.sendPresenceUpdate('composing', from);

        // Loading
        await sock.sendMessage(from, {
            text: "🤖 Thinking..."
        }, { quoted: m });

        // API
        const { data } = await axios.post(
            "https://chateverywhere.app/api/chat/",
            {
                model: {
                    id: "gpt-4",
                    name: "GPT-4"
                },
                messages: [
                    { role: "user", content: text }
                ],
                temperature: 0.5
            }
        );

        // Fix response
        let result = typeof data === "string"
            ? data
            : data?.reply || data?.message || JSON.stringify(data);

        // SEND IMAGE + CAPTION
        await sock.sendMessage(from, {
            image: { url: "https://files.catbox.moe/ueelcu.jpg" },
            caption:
`╭─❍ 🤖 *AI Assistant*
│
│ *Q:* ${text}
│
│ *A:*
│ ${result}
│
╰─✅ _Need anything else?_
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅɪᴀɴᴀ ᴛᴇᴄʜ*`
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        reply("❌ AI encountered a problem");
    }
});
