// 🌟 AntiDelete Command — Stylish Edition (Functionality Unchanged)

const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../DianaTech');
const util = require("util");
const {
    getAnti,
    setAnti,
    initializeAntiDeleteSettings
} = require('../data/antidel');

// 🔁 Ensure AntiDelete settings exist on startup
initializeAntiDeleteSettings();

cmd({
    pattern: "antidelete",
    alias: ["antidel", "ad"],
    desc: "Configure AntiDelete settings",
    category: "misc",
    filename: __filename
},
async (conn, mek, m, { from, reply, q, text, isCreator, fromMe }) => {

    // 🔐 Owner-only access
    if (!isCreator) {
        return reply("🚫 *This command is only available to the bot owner.*");
    }

    try {
        const command = q?.toLowerCase();

        switch (command) {

            // 🔴 Turn OFF AntiDelete everywhere
            case "on":
                await setAnti("gc", false);
                await setAnti("dm", false);
                return reply(
                    "❌ *AntiDelete Disabled*\n\n" +
                    "_Group Chats & Direct Messages are now OFF._"
                );

            // 🔕 Disable AntiDelete for Group Chats
            case "off gc":
                await setAnti("gc", false);
                return reply("❌ *AntiDelete for Group Chats has been disabled.*");

            // 🔕 Disable AntiDelete for DMs
            case "off dm":
                await setAnti("dm", false);
                return reply("❌ *AntiDelete for Direct Messages has been disabled.*");

            // 🔁 Toggle Group Chat AntiDelete
            case "set gc": {
                const gcStatus = await getAnti("gc");
                await setAnti("gc", !gcStatus);
                return reply(
                    `🔄 *Group Chat AntiDelete* is now *${!gcStatus ? "Enabled ✅" : "Disabled ❌"}*`
                );
            }

            // 🔁 Toggle DM AntiDelete
            case "set dm": {
                const dmStatus = await getAnti("dm");
                await setAnti("dm", !dmStatus);
                return reply(
                    `🔄 *DM AntiDelete* is now *${!dmStatus ? "Enabled ✅" : "Disabled ❌"}*`
                );
            }

            // ✅ Enable AntiDelete everywhere
            case "set all":
                await setAnti("gc", true);
                await setAnti("dm", true);
                return reply("✅ *AntiDelete has been enabled for ALL chats.*");

            // 📊 Show current status
            case "status": {
                const currentDmStatus = await getAnti("dm");
                const currentGcStatus = await getAnti("gc");

                return reply(
                    "📊 *AntiDelete Status*\n\n" +
                    `• *Direct Messages:* ${currentDmStatus ? "Enabled ✅" : "Disabled ❌"}\n` +
                    `• *Group Chats:* ${currentGcStatus ? "Enabled ✅" : "Disabled ❌"}`
                );
            }

            // 📖 Help Menu
            default:
                return reply(
                    "📖 *AntiDelete Command Guide*\n\n" +
                    "• `.antidelete on` — Disable AntiDelete for all chats\n" +
                    "• `.antidelete off gc` — Disable AntiDelete in Group Chats\n" +
                    "• `.antidelete off dm` — Disable AntiDelete in Direct Messages\n" +
                    "• `.antidelete set gc` — Toggle AntiDelete for Group Chats\n" +
                    "• `.antidelete set dm` — Toggle AntiDelete for Direct Messages\n" +
                    "• `.antidelete set all` — Enable AntiDelete everywhere\n" +
                    "• `.antidelete status` — View current AntiDelete status"
                );
        }

    } catch (error) {
        console.error("❌ AntiDelete Command Error:", error);
        return reply("⚠️ *An error occurred while processing your request.*");
    }
});
