// 🛠️ Plugin: IMAGE EDITOR (Edits d'images via IA)
const axios = require('axios');
const { uploadMedia } = require('../../lib/mediaUpload');
const { t } = require('../../lib/language');
const { extractMedia } = require('../../lib/utils');
const API_KEY = 'gifted';

module.exports = [
    {
        name: 'editimgv2',
        aliases: ['edit2'],
        category: 'tools',
        description: 'Édition IA V2 (Choix de modèle)',
        usage: '.editimgv2 <prompt> | [model]',
        execute: async (client, message, args) => {
            const media = extractMedia(message);
            if (!media || media.type !== 'imageMessage') {
                return client.sendMessage(message.key.remoteJid, { text: '> *ERREUR* : Répondez à une image.' });
            }

            const fullArgs = args.join(' ').split('|');
            const prompt = fullArgs[0]?.trim();
            const model = fullArgs[1]?.trim() || 'ezremove_4.0'; // Default model

            if (!prompt) return client.sendMessage(message.key.remoteJid, { text: '> *ERREUR* : Prompt manquant. Ex: .editimgv2 anime | ezremove_4.0' });

            await client.sendMessage(message.key.remoteJid, { react: { text: '⏳', key: message.key } });

            try {
                // Upload l'image temporairement pour avoir une URL
                const mediaMsg = { [media.type]: media.message };
                const imageUrl = await uploadMedia(mediaMsg);
                if (!imageUrl) throw new Error('Upload échoué');

                const apiUrl = `https://api.giftedtech.co.ke/api/tools/photoeditorv3?apikey=${API_KEY}&url=${encodeURIComponent(imageUrl)}&prompt=${encodeURIComponent(prompt)}&model=${encodeURIComponent(model)}`;
                const { data } = await axios.get(apiUrl);

                if (!data.success || !data.result || !data.result.output) throw new Error('API Fail');

                await client.sendMessage(message.key.remoteJid, { 
                    image: { url: data.result.output },
                    caption: `> *EDIT v2* (${data.result.model})`
                }, { quoted: message });

                await client.sendMessage(message.key.remoteJid, { react: { text: '✅', key: message.key } });

            } catch (e) {
                console.error(e);
                client.sendMessage(message.key.remoteJid, { text: '> *ERREUR* : Édition échouée.' });
            }
        }
    },
    {
        name: 'editimg',
        aliases: ['edit1'],
        category: 'tools',
        description: 'Édition IA V1',
        usage: '.editimg <prompt>',
        execute: async (client, message, args) => {
            const media = extractMedia(message);
            if (!media || media.type !== 'imageMessage') {
                return client.sendMessage(message.key.remoteJid, { text: '> *ERREUR* : Répondez à une image.' });
            }

            const prompt = args.join(' ');
            if (!prompt) return client.sendMessage(message.key.remoteJid, { text: '> *ERREUR* : Prompt manquant.' });

            await client.sendMessage(message.key.remoteJid, { react: { text: '⏳', key: message.key } });

            try {
                const mediaMsg = { [media.type]: media.message };
                const imageUrl = await uploadMedia(mediaMsg);
                if (!imageUrl) throw new Error('Upload échoué');

                const apiUrl = `https://api.giftedtech.co.ke/api/tools/photoeditorv2?apikey=${API_KEY}&url=${encodeURIComponent(imageUrl)}&prompt=${encodeURIComponent(prompt)}&model=gpt-image-1`;
                
                await client.sendMessage(message.key.remoteJid, { 
                    image: { url: apiUrl }, // API renvoie l'image direct
                    caption: `> *EDIT v1*`
                }, { quoted: message });

                await client.sendMessage(message.key.remoteJid, { react: { text: '✅', key: message.key } });

            } catch (e) {
                console.error(e);
                client.sendMessage(message.key.remoteJid, { text: '> *ERREUR* : Édition échouée.' });
            }
        }
    },
    {
        name: 'removebg',
        aliases: ['rmbg', 'nobg'],
        category: 'tools',
        description: 'Supprime l\'arrière-plan',
        usage: '.removebg (réponse image)',
        execute: async (client, message, args) => {
            const media = extractMedia(message);
            if (!media || media.type !== 'imageMessage') {
                return client.sendMessage(message.key.remoteJid, { text: '> *ERREUR* : Répondez à une image.' });
            }

            await client.sendMessage(message.key.remoteJid, { react: { text: '✂️', key: message.key } });

            try {
                const mediaMsg = { [media.type]: media.message };
                const imageUrl = await uploadMedia(mediaMsg);
                if (!imageUrl) throw new Error('Upload échoué');

                const apiUrl = `https://api.giftedtech.co.ke/api/tools/removebg?apikey=${API_KEY}&url=${encodeURIComponent(imageUrl)}`;
                const { data } = await axios.get(apiUrl);

                if (!data.success || !data.result || !data.result.image_url) throw new Error('API Fail');

                await client.sendMessage(message.key.remoteJid, { 
                    image: { url: data.result.image_url },
                    caption: `> *REMOVE BG*`
                }, { quoted: message });

            } catch (e) {
                console.error(e);
                client.sendMessage(message.key.remoteJid, { text: '> *ERREUR* : Échec RemoveBG.' });
            }
        }
    },
    {
        name: 'canvas',
        aliases: ['spotifycard'],
        category: 'tools',
        description: 'Génère une Canvas Card',
        usage: '.canvas <titre> | <texte>',
        execute: async (client, message, args) => {
            const fullArgs = args.join(' ').split('|');
            const title = fullArgs[0]?.trim();
            const text = fullArgs[1]?.trim() || 'VENOM-XMD';

            if (!title) return client.sendMessage(message.key.remoteJid, { text: '> *ERREUR* : .canvas Titre | Texte' });

            await client.sendMessage(message.key.remoteJid, { react: { text: '🎨', key: message.key } });

            try {
                const apiUrl = `https://api.giftedtech.co.ke/api/tools/canvas?apikey=${API_KEY}&title=${encodeURIComponent(title)}&type=spotify&text=${encodeURIComponent(text)}&watermark=VENOM-XMD`;
                
                await client.sendMessage(message.key.remoteJid, { 
                    image: { url: apiUrl },
                    caption: `> *CANVAS*`
                }, { quoted: message });

            } catch (e) {
                client.sendMessage(message.key.remoteJid, { text: '> *ERREUR* : Génération échouée.' });
            }
        }
    }
];