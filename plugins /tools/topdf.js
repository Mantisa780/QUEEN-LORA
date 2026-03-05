// 📄 Plugin: PDF MAKER
// Génère un PDF à partir d'un texte

const axios = require('axios');
const API_KEY = 'gifted';

module.exports = {
    name: 'topdf',
    aliases: ['pdf', 'createpdf'],
    category: 'tools',
    description: 'Convertit un texte en PDF',
    usage: '.topdf <texte>',
    execute: async (client, message, args) => {
        const text = args.join(' ');
        
        if (!text) return client.sendMessage(message.key.remoteJid, { text: '> *ERREUR* : Texte manquant.' });

        await client.sendMessage(message.key.remoteJid, { react: { text: '📄', key: message.key } });

        try {
            const apiUrl = `https://api.giftedtech.co.ke/api/tools/topdf?apikey=${API_KEY}&query=${encodeURIComponent(text)}`;
            
            // L'API renvoie le PDF directement, on le télécharge via axios (arraybuffer)
            const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data, 'binary');

            await client.sendMessage(message.key.remoteJid, { 
                document: buffer,
                mimetype: 'application/pdf',
                fileName: `Document_${Math.floor(Math.random() * 1000)}.pdf`,
                caption: `> *DOCUMENT PDF*\n> By Diana Tech`
            }, { quoted: message });

            await client.sendMessage(message.key.remoteJid, { react: { text: '✅', key: message.key } });

        } catch (e) {
            console.error(e);
            client.sendMessage(message.key.remoteJid, { text: '> *ERREUR* : Échec de la génération du PDF.' });
        }
    }
};