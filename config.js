const fs = require('fs');
const path = require('path');
const { getConfig } = require("./lib/configdb");

if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    // ===== BOT CORE SETTINGS =====
 SESSION_ID: process.env.SESSION_ID || "Your session Id here",
  PREFIX: getConfig("PREFIX") || ".",
    CHATBOT: getConfig("CHATBOT") || "on", 
    BOT_NAME: process.env.BOT_NAME || getConfig("BOT_NAME") || "QUEEN-LORA",
    MODE: getConfig("MODE") || process.env.MODE || "public", 
    REPO: process.env.REPO || "https://github.com/QUEEN-DIANA/QUEEN-LORA", 
    BAILEYS: process.env.BAILEYS || "@whiskeysockets/baileys", 
    OWNER_NUMBER: process.env.OWNER_NUMBER || "18492823944",
    OWNER_NAME: process.env.OWNER_NAME || getConfig("OWNER_NAME") || "ᴅɪᴀɴᴀ ᴛᴇᴄʜ",           // Owner's name
    DEV: process.env.DEV || "18492823944",                     // Developer's contact number
    DEVELOPER_NUMBER: '18492785095@s.whatsapp.net',            // Developer's WhatsApp ID

    // ===== AUTO-RESPONSE SETTINGS =====
    AUTO_REPLY: process.env.AUTO_REPLY || "false",              // Enable/disable auto-reply
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",// Reply to status updates?
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*QUEEN LORA VIEWED YOUR STATUS 🤖*",  // Status reply message
    READ_MESSAGE: process.env.READ_MESSAGE || "false",          // Mark messages as read automatically?
    REJECT_MSG: process.env.REJECT_MSG || "*📞 ᴄαℓℓ ɴσт αℓℓσωє∂ ιɴ тнιѕ ɴᴜмвєʀ уσυ ∂σɴт нανє ᴘєʀмιѕѕισɴ 📵*",
    // ===== REACTION & STICKER SETTINGS =====
    AUTO_REACT: process.env.AUTO_REACT || "false",              // Auto-react to messages?
    OWNER_REACT: process.env.OWNER_REACT || "false",              // Auto-react to messages?
    CUSTOM_REACT: process.env.CUSTOM_REACT || "false",          // Use custom emoji reactions?
    CUSTOM_REACT_EMOJIS: getConfig("CUSTOM_REACT_EMOJIS") || process.env.CUSTOM_REACT_EMOJIS || "🍨,🍿,",  // set custom reacts
    STICKER_NAME: process.env.STICKER_NAME || "ᴅɪᴀɴᴀ ᴛᴇᴄʜ",     // Sticker pack name
    AUTO_STICKER: process.env.AUTO_STICKER || "true",          // Auto-send stickers?
    // ===== MEDIA & AUTOMATION =====
    AUTO_RECORDING: process.env.AUTO_RECORDING || "false",      // Auto-record voice notes?
    AUTO_TYPING: process.env.AUTO_TYPING || "false",            // Show typing indicator?
    MENTION_REPLY: process.env.MENTION_REPLY || "false",   // reply on mentioned message 
    MENU_IMAGE_URL: getConfig("MENU_IMAGE_URL") || "https://i.ibb.co/rRdvY8zL/upload-1777203469367-a36a6cfb-jpg.jpg",  // Bot's "alive" menu mention image

    // ===== SECURITY & ANTI-FEATURES =====
    ANTI_DELETE: process.env.ANTI_DELETE || "true", // true antidelete to recover deleted messages 
    ANTI_CALL: process.env.ANTI_CALL || "true", // enble to reject calls automatically 
    ANTI_BAD_WORD: process.env.ANTI_BAD_WORD || "false",    // Block bad words?
    ANTI_LINK: process.env.ANTI_LINK || "true",    // Block links in groups
    ANTI_VV: process.env.ANTI_VV || "true",   // Block view-once messages
    DELETE_LINKS: process.env.DELETE_LINKS || "true",          // Auto-delete links?
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "same", // inbox deleted messages (or 'same' to resend)
    ANTI_BOT: process.env.ANTI_BOT || "true",
    PM_BLOCKER: process.env.PM_BLOCKER || "true",

    // ===== BOT BEHAVIOR & APPEARANCE =====
    DESCRIPTION: process.env.DESCRIPTION || "*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅɪᴀɴᴀ ᴛᴇᴄʜ*",  // Bot description
    PUBLIC_MODE: process.env.PUBLIC_MODE || "true",              // Allow public commands?
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",        // Show bot as always online?
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true", // React to status updates?
    AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true", // VIEW to status updates?
    AUTO_BIO: process.env.AUTO_BIO || "false", // ture to get auto bio 
    WELCOME: process.env.WELCOME || "true", // true to get welcome in groups 
    GOODBYE: process.env.GOODBYE || "true", // true to get goodbye in groups 
    ADMIN_ACTION: process.env.ADMIN_ACTION || "false", // true if want see admin activity 
};
        
