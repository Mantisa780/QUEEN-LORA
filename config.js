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
    OWNER_NAME: process.env.OWNER_NAME || getConfig("OWNER_NAME") || "ᴅɪᴀɴᴀ ᴛᴇᴄʜ",
    DEV: process.env.DEV || "18492823944",
    DEVELOPER_NUMBER: '18099065877@s.whatsapp.net',

    // ===== NEWSLETTER SETTINGS =====
    NEWSLETTER: process.env.NEWSLETTER || "120363336396621021@newsletter",
    NEWSLETTER_NAME: process.env.NEWSLETTER_NAME || "QUEEN DIANA TECH",

    // ===== AUTO-RESPONSE SETTINGS =====
    AUTO_REPLY: process.env.AUTO_REPLY || "false",
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
    AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*QUEEN LORA VIEWED YOUR STATUS 🤖*",
    READ_MESSAGE: process.env.READ_MESSAGE || "false",
    REJECT_MSG: process.env.REJECT_MSG || "*📞 ᴄαℓℓ ɴσт αℓℓσωє∂ ιɴ тнιѕ ɴᴜмвєʀ уσυ ∂σɴт нανє ᴘєʀмιѕѕισɴ 📵*",

    // ===== REACTION & STICKER SETTINGS =====
    AUTO_REACT: process.env.AUTO_REACT || "false",
    OWNER_REACT: process.env.OWNER_REACT || "true",
    CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
    CUSTOM_REACT_EMOJIS: getConfig("CUSTOM_REACT_EMOJIS") || process.env.CUSTOM_REACT_EMOJIS || "🍨,🍿,",
    STICKER_NAME: process.env.STICKER_NAME || "ᴅɪᴀɴᴀ ᴛᴇᴄʜ",
    AUTO_STICKER: process.env.AUTO_STICKER || "true",

    // ===== MEDIA & AUTOMATION =====
    AUTO_RECORDING: process.env.AUTO_RECORDING || "true",
    AUTO_TYPING: process.env.AUTO_TYPING || "false",
    MENTION_REPLY: process.env.MENTION_REPLY || "false",
    MENU_IMAGE_URL: getConfig("MENU_IMAGE_URL") || "https://res.cloudinary.com/dqxlb29uz/image/upload/v1778448970/bwm_uploads/media-1778448970813.jpg",

    // ===== SECURITY & ANTI-FEATURES =====
    ANTI_DELETE: process.env.ANTI_DELETE || "true",
    ANTI_CALL: process.env.ANTI_CALL || "true",
    ANTI_BAD_WORD: process.env.ANTI_BAD_WORD || "false",
    ANTI_LINK: process.env.ANTI_LINK || "true",
    ANTI_VV: process.env.ANTI_VV || "true",
    DELETE_LINKS: process.env.DELETE_LINKS || "true",
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "same",
    ANTI_BOT: process.env.ANTI_BOT || "true",
    PM_BLOCKER: process.env.PM_BLOCKER || "true",

    // ===== BOT BEHAVIOR & APPEARANCE =====
    DESCRIPTION: process.env.DESCRIPTION || "*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅɪᴀɴᴀ ᴛᴇᴄʜ*",
    PUBLIC_MODE: process.env.PUBLIC_MODE || "true",
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
    AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
    AUTO_BIO: process.env.AUTO_BIO || "false",
    WELCOME: process.env.WELCOME || "true",
    GOODBYE: process.env.GOODBYE || "true",
    ADMIN_ACTION: process.env.ADMIN_ACTION || "true",
};
