const { cmd } = require('../DianaTech');
const axios = require('axios');

cmd({
    pattern: "lyrics",
    alias: ["lyric", "songlyrics"],
    desc: "Search for song lyrics",
    category: "search",
    react: "🎶",
    filename: __filename
}, async (conn, mek, m, { from, text, q }) => {
    try {

        // ❌ Missing song name
        if (!q) {
            return await conn.sendMessage(from, {
                text:
`🌸 *Lyrics* 🌸

❌ Song name required  
✿ Example: *.lyrics Faded*`
            }, { quoted: mek });
        }

        // 🔎 Searching
        await conn.sendMessage(from, {
            text: `🌼 Searching lyrics for *${q}*...`
        }, { quoted: mek });

        // API
        const apiUrl = `https://apis.davidcyriltech.my.id/lyrics3?song=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.status === 200 && data.success) {
            const { title, artist, lyrics, image } = data.result;

            let lyricsMsg =
`🌸 *𝘀𝗼𝗻𝗴 𝗹𝘆𝗿𝗶𝗰𝘀* 🌸

✿ *𝗧𝗶𝘁𝗹𝗲:* ${title}  
✿ *𝗔𝗿𝘁𝗶𝘀𝘁:* ${artist}

🌼 *𝗟𝗬𝗥𝗜𝗖𝗦* 🌼
${lyrics}

🌷 _QUEEN LORA_`;

            if (image) {
                await conn.sendMessage(from, {
                    image: { url: image },
                    caption: lyricsMsg
                }, { quoted: mek });
            } else {
                await conn.sendMessage(from, { text: lyricsMsg }, { quoted: mek });
            }

        } else {
            return await conn.sendMessage(from, {
                text:
`🌸 *Not Found* 🌸

✿ Lyrics not available  
✿ Check spelling & retry`
            }, { quoted: mek });
        }

    } catch (e) {
        console.error("Lyrics Error:", e);
        await conn.sendMessage(from, {
            text:
`🌸 *Error* 🌸

✿ Unable to fetch lyrics  
✿ Try again later`
        }, { quoted: mek });
    }
});
