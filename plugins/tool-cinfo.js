const { cmd } = require('../DianaTech');
const axios = require('axios');

// ✅ VERIFIED CONTACT
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
ORG:QUEEN LORA INFO
TEL;type=CELL;type=VOICE;waid=18492823944:+18492823944
END:VCARD`
        }
    }
};

cmd({
    pattern: "countryinfo",
    alias: ["cinfo", "country","cinfo2"],
    desc: "Get information about a country",
    category: "info",
    react: "🌍",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a country name.\nExample: `.countryinfo Pakistan`");

        const apiUrl = `https://api.siputzx.my.id/api/tools/countryInfo?name=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.data) {
            await react("❌");
            return reply(`No information found for *${q}*. Please check the country name.`);
        }

        const info = data.data;
        let neighborsText = info.neighbors.length > 0
            ? info.neighbors.map(n => `🌍 *${n.name}*`).join(", ")
            : "No neighboring countries found.";

        const text = `🌍 *Country Information: ${info.name}* 🌍\n\n` +
                     `🏛 *Capital:* ${info.capital}\n` +
                     `📍 *Continent:* ${info.continent.name} ${info.continent.emoji}\n` +
                     `📞 *Phone Code:* ${info.phoneCode}\n` +
                     `📏 *Area:* ${info.area.squareKilometers} km² (${info.area.squareMiles} mi²)\n` +
                     `🚗 *Driving Side:* ${info.drivingSide}\n` +
                     `💱 *Currency:* ${info.currency}\n` +
                     `🔤 *Languages:* ${info.languages.native.join(", ")}\n` +
                     `🌟 *Famous For:* ${info.famousFor}\n` +
                     `🌍 *ISO Codes:* ${info.isoCode.alpha2.toUpperCase()}, ${info.isoCode.alpha3.toUpperCase()}\n` +
                     `🌎 *Internet TLD:* ${info.internetTLD}\n\n` +
                     `🔗 *Neighbors:* ${neighborsText}`;

        await conn.sendMessage(from, {
            image: { url: info.flag },
            caption: text,
            contextInfo: { 
                mentionedJid: [m.sender],

                // ✅ NEWSLETTER HEADER
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363336396621021@newsletter",
                    newsletterName: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅɪᴀɴᴀ ᴛᴇᴄʜ",
                    serverMessageId: Math.floor(Math.random() * 1000)
                }
            }
        }, { quoted: fakeContact }); // ✅ VERIFIED LOOK

        await react("✅");

    } catch (e) {
        console.error("Error in countryinfo command:", e);
        await react("❌");
        reply("An error occurred while fetching country information.");
    }
});

// Srepo
cmd({
  pattern: "srepo",
  desc: "Fetch information about a GitHub repository.",
  category: "other",
  react: "🍃",
  filename: __filename
}, async (conn, m, store, { from, args, reply }) => {
  try {
    const repoName = args.join(" ");
    if (!repoName) {
      return reply("❌ Please provide a GitHub repository in the format 📌 `owner/repo`.");
    }

    const apiUrl = `https://api.github.com/repos/${repoName}`;
    const { data } = await axios.get(apiUrl);

    let responseMsg = `📁 *GitHub Repository Info* 📁\n\n`;
    responseMsg += `📌 *Name*: ${data.name}\n`;
    responseMsg += `🔗 *URL*: ${data.html_url}\n`;
    responseMsg += `📝 *Description*: ${data.description || "No description"}\n`;
    responseMsg += `⭐ *Stars*: ${data.stargazers_count}\n`;
    responseMsg += `🍴 *Forks*: ${data.forks_count}\n`;
    responseMsg += `👤 *Owner*: ${data.owner.login}\n`;
    responseMsg += `📅 *Created At*: ${new Date(data.created_at).toLocaleDateString()}\n`;
    responseMsg += `\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅɪᴀɴᴀ ᴛᴇᴄʜ*`;

    await conn.sendMessage(from, { text: responseMsg }, { quoted: m });
  } catch (error) {
    console.error("GitHub API Error:", error);
    reply(`❌ Error fetching repository data: ${error.response?.data?.message || error.message}`);
  }
});

// Npm

cmd({
  pattern: "npm",
  desc: "Search for a package on npm.",
  react: '📦',
  category: "convert",
  filename: __filename,
  use: ".npm <package-name>"
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    // Check if a package name is provided
    if (!args.length) {
      return reply("Please provide the name of the npm package you want to search for. Example: .npm express");
    }

    const packageName = args.join(" ");
    const apiUrl = `https://registry.npmjs.org/${encodeURIComponent(packageName)}`;

    // Fetch package details from npm registry
    const response = await axios.get(apiUrl);
    if (response.status !== 200) {
      throw new Error("Package not found or an error occurred.");
    }

    const packageData = response.data;
    const latestVersion = packageData["dist-tags"].latest;
    const description = packageData.description || "No description available.";
    const npmUrl = `https://www.npmjs.com/package/${packageName}`;
    const license = packageData.license || "Unknown";
    const repository = packageData.repository ? packageData.repository.url : "Not available";

    // Create the response message
    const message = `
*QUEEN LORA NPM SEARCH*

*🔰 NPM PACKAGE:* ${packageName}
*📄 DESCRIPTION:* ${description}
*⏸️ LAST VERSION:* ${latestVersion}
*🪪 LICENSE:* ${license}
*🪩 REPOSITORY:* ${repository}
*🔗 NPM URL:* ${npmUrl}
`;

    // Send the message
    await conn.sendMessage(from, { text: message }, { quoted: mek });

  } catch (error) {
    console.error("Error:", error);

    // Send detailed error logs to WhatsApp
    const errorMessage = `
*❌ NPM Command Error Logs*

*Error Message:* ${error.message}
*Stack Trace:* ${error.stack || "Not available"}
*Timestamp:* ${new Date().toISOString()}
`;

    await conn.sendMessage(from, { text: errorMessage }, { quoted: mek });
    reply("An error occurred while fetching the npm package details.");
  }
});
