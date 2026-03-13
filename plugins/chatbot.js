const { cmd } = require("../DianaTech");
const config = require("../config");
const fetch = require("node-fetch");

// === AI Chatbot Event Handler ===
cmd({ on: "body" }, async (client, message, chat, { from, body, isGroup, isCmd }) => {
  try {
    if (config.AUTO_AI === "true" && !isCmd && !isGroup && !message.key.fromMe && body) {
      
      await client.sendPresenceUpdate('composing', from);

      const apiKey = ""; 
      const apiUrl = `https://apis.davidcyriltech.my.id/ai/chatbot?query=${encodeURIComponent(body)}&apikey=${apiKey}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 200 || data.success) {
        const aiReply = data.result;

        // Removed contextInfo to stop the "forwarded" and "channel" styling
        await client.sendMessage(from, {
          text: `${aiReply}\n\n> © ᴘᴏᴘᴋɪᴅ ᴍᴅ ᴀɪ 🤖`
        }, { quoted: message });
      }
    }
  } catch (error) {
    console.error("❌ Chatbot Error:", error);
  }
});

// === Chatbot Toggle Command ===
cmd({
  pattern: "chatbot",
  alias: ["autoai", "aichat"],
  desc: "Toggle Auto AI Chatbot feature",
  category: "owner",
  react: "🤖",
  filename: __filename,
  fromMe: true
},
async (client, message, m, { isOwner, from, sender, args }) => {
  try {
    if (!isOwner) {
      return client.sendMessage(from, {
        text: "🚫 *Owner-only command!*",
        mentions: [sender]
      }, { quoted: message });
    }

    const action = args[0]?.toLowerCase() || 'status';
    let statusText, reaction = "🤖", additionalInfo = "";

    switch (action) {
      case 'on':
        if (config.AUTO_AI === "true") {
          statusText = "📌 AI Chatbot is already *ENABLED*!";
          reaction = "ℹ️";
        } else {
          config.AUTO_AI = "true";
          statusText = "✅ AI Chatbot has been *ENABLED*!";
          reaction = "✅";
          additionalInfo = "I will now reply to all private messages 💬";
        }
        break;

      case 'off':
        if (config.AUTO_AI === "false") {
          statusText = "📌 AI Chatbot is already *DISABLED*!";
          reaction = "ℹ️";
        } else {
          config.AUTO_AI = "false";
          statusText = "❌ AI Chatbot has been *DISABLED*!";
          reaction = "❌";
          additionalInfo = "Auto-replies are now turned off 🔇";
        }
        break;

      default:
        statusText = `📌 Chatbot Status: ${config.AUTO_AI === "true" ? "✅ *ENABLED*" : "❌ *DISABLED*"}`;
        additionalInfo = config.AUTO_AI === "true" ? "Ready to chat 🤖" : "Standing by 💤";
        break;
    }

    // Removed the forwarding/newsletter context here as well for a clean look
    await client.sendMessage(from, {
      image: { url: "https://files.catbox.moe/3lzhi9.jpg" },
      caption: `
${statusText}
${additionalInfo}

_𝐪𝐮𝐞𝐞𝐧 𝐥𝐨𝐫𝐚 𝐜𝐡𝐚𝐭𝐛𝐨𝐭 🌟_
      `,
      contextInfo: {
        mentionedJid: [sender]
      }
    }, { quoted: message });

    await client.sendMessage(from, {
      react: { text: reaction, key: message.key }
    });

  } catch (error) {
    console.error("❌ Chatbot command error:", error);
    await client.sendMessage(from, {
      text: `⚠️ Error: ${error.message}`,
      mentions: [sender]
    }, { quoted: message });
  }
});
