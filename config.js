// ⚙️ VENOM-XMD- CONFIGURATION (Via .env)
require('dotenv').config();

module.exports = {
  // --- IDENTITÉ ---
  botName: process.env.BOT_NAME || 'VENOM-XMD',
  ownerName: process.env.OWNER_NAME || 'Diana Tech',
  ownerNumber: (process.env.OWNER_NUMBER || '18492823944').split(','), // Support multi-owner via virgule
  phoneNumber: process.env.OWNER_NUMBER || '62xxx', // Pour pairing code
  prefix: process.env.PREFIX || '.',

  // --- PARAMÈTRES INTERNES ---
  sessionName: process.env.SESSION_NAME || 'session',
  defaultLang: process.env.DEFAULT_LANG || 'fr',
  autoRead: process.env.AUTO_READ === 'true',
  
  // --- NEWSLETTER & LINKS ---
  newsletterJid: process.env.NEWSLETTER_JID || '120363336396621021@newsletter',
  logoUrl: process.env.LOGO_URL || 'https://h.uguu.se/WxiBSmhL.jpg',

  // --- OPTIMISATIONS ---
  syncFullHistory: false, 
  keepAliveInterval: 30000, 

  // --- BASE DE DONNÉES (JSON) ---
  database: {
    users: './database/users.json',
    groups: './database/groups.json',
    settings: './database/settings.json'
  }
};