const { cmd } = require('../DianaTech');
const axios = require('axios');
const config = require('../config');

cmd({
    pattern: "gpt",
    alias: ["openai", "xxai"],
    desc: "Chat with AI (GPT-4 style)",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (sock, m, msg, { from, args, reply }) => {
    try {

        const text = args.join(" ");

        if (global.isban && global.isban.includes(m.sender)) {
            return reply("🚫 YOU ARE BANNED FROM USING THIS BOT");
        }

        if (!text) {
            return reply(`🤖 Ask me anything\n💡 Example: .gpt How are you?`);
        }

        // ✅ AUTO NAME REPLY (ENGLISH)
        const lowerText = text.toLowerCase();

        if (
            lowerText.includes("what is your name") ||
            lowerText.includes("who are you") ||
            lowerText.includes("your name")
        ) {
            return await sock.sendMessage(from, {
                image: { url: "https://files.catbox.moe/ryldky.jpg" },
                caption:
`╭━━〔 🤖 QUEEN LORA GPT 〕━━┈⊷
┃ 🤖 Name : QUEEN LORA
┃ 👨‍💻 Creator : Diana Tech
┃ 💬 Info : I am your AI assistant
╰━━━━━━━━━━━━━━━━━┈⊷`
            }, { quoted: m });
        }

        // Loading
        await sock.sendMessage(from, {
            text: "🤖 Thinking... Please wait"
        }, { quoted: m });

        // API
        async function openai(query) {
            const response = await axios.post(
                "https://chateverywhere.app/api/chat/",
                {
                    model: {
                        id: "gpt-4",
                        name: "GPT-4"
                    },
                    messages: [
                        { role: "user", content: query }
                    ],
                    temperature: 0.5
                }
            );
            return response.data;
        }

        const res = await openai(text);

        let result = typeof res === "string"
            ? res
            : res?.reply || res?.message || JSON.stringify(res);

        // FINAL SEND
        await sock.sendMessage(from, {
            image: { url: "https://files.catbox.moe/wgdjax.jpg" },
            caption:
`╭━━〔 🤖 QUEEN LORA GPT 〕━━┈⊷
┃ 💬 Question : ${text}
┃ 🤖 Answer :
${result}
╰━━━━━━━━━━━━━━━━━┈⊷
> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅɪᴀɴᴀ ᴛᴇᴄʜ*`
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        reply("❌ Error processing request");
    }
});