const { cmd } = require('../DianaTech');

cmd({
    pattern: "restart",
    alias: ["reboot", "reload"],
    desc: "Restart the entire bot.",
    category: "owner",
    react: "♻️",
    filename: __filename
},
async (conn, mek, m, { reply, isOwner }) => {
    try {
        if (!isOwner) return reply("❌ Owner only!");

        await reply("♻️ *Restarting DianaTech...*\nPlease wait a few seconds.");

        setTimeout(() => {
            process.exit(0);
        }, 2000);

    } catch (err) {
        console.error(err);
        reply("❌ Failed to restart the bot.");
    }
});