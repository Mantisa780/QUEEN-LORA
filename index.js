// 🚀 VENOM XMD - POINT D'ENTRÉE

const { connectToWhatsApp } = require('./venom/client');
const { loadPlugins } = require('./venom/DianaTech');
const config = require('./config');

async function start() {
    try {
        console.log(`🤖 Démarrage de ${config.botName}...`);
        
        // 1. Charger les plugins
        loadPlugins();

        // 2. Se connecter
        await connectToWhatsApp();

    } catch (e) {
        console.error("Erreur critique:", e);
    }
}

start();