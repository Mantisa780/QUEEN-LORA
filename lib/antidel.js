const { isJidGroup } = require('@whiskeysockets/baileys');
const { loadMessage, getAnti } = require('../data');
const config = require('../config');

// Newsletter configuration
const NEWSLETTER_CONFIG = {
    jid: '120363336396621021@newsletter',
    name: '𝐀𝐍𝐓𝐈𝐃𝐄𝐋𝐄𝐓𝐄 🌟',
    serverMessageId: 143,
    imageUrl: 'https://files.catbox.moe/13dysu.jpeg',
    watermark: '> 𝐪𝐮𝐞𝐞𝐧 𝐥𝐨𝐫𝐚 𝐚𝐧𝐭𝐢𝐝𝐞𝐥𝐞𝐭𝐞☯️'
};

const getNewsletterContext = () => ({
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: NEWSLETTER_CONFIG.jid,
        newsletterName: NEWSLETTER_CONFIG.name,
        serverMessageId: NEWSLETTER_CONFIG.serverMessageId
    }
});

const DeletedText = async (conn, mek, jid, deleteInfo, isGroup, update) => {
    try {
        const messageContent = mek.message?.conversation 
            || mek.message?.extendedTextMessage?.text
            || mek.message?.imageMessage?.caption
            || mek.message?.videoMessage?.caption
            || mek.message?.documentMessage?.caption
            || '🚫 Content unavailable (may be media without caption)';

        const fullMessage = `
╭╴╴╴╴╴╴╴╴╴╴╴╴╴╴╮
│ 🗑️ 𝐀𝐍𝐓𝐈𝐃𝐄𝐋𝐄𝐓𝐄 🛡️
╰╴╴╴╴╴╴╴╴╴╴╴╴╴╴╯
${deleteInfo}
┃✉️ CONTENT :
${messageContent}
┃└─────────────┈⊷
╰──────────────────┈⊷
${NEWSLETTER_CONFIG.watermark}`;

        const mentionedJids = isGroup 
            ? [update.key.participant, mek.key.participant].filter(Boolean) 
            : [update.key.remoteJid].filter(Boolean);

        await conn.sendMessage(
            jid,
            {
                image: { url: NEWSLETTER_CONFIG.imageUrl },
                caption: fullMessage,
                contextInfo: {
                    ...getNewsletterContext(),
                    mentionedJid: mentionedJids,
                },
            },
            { quoted: mek }
        );
    } catch (error) {
        console.error('Error in DeletedText:', error);
    }
};

const DeletedMedia = async (conn, mek, jid, deleteInfo) => {
    try {
        const antideletedmek = structuredClone(mek.message);
        const messageType = Object.keys(antideletedmek)[0];

        const mediaTypes = {
            imageMessage: { type: 'image', key: 'imageMessage' },
            videoMessage: { type: 'video', key: 'videoMessage' },
            audioMessage: { type: 'audio', key: 'audioMessage' },
            documentMessage: { type: 'document', key: 'documentMessage' },
            stickerMessage: { type: 'sticker', key: 'stickerMessage' }
        };

        const currentType = mediaTypes[messageType];

        if (currentType) {
            const caption = `
╭╴╴╴╴╴╴╴╴╴╴╴╴╴╴╮
│ 🗑️ 𝐀𝐍𝐓𝐈𝐃𝐄𝐋𝐄𝐓𝐄 🛡️
╰╴╴╴╴╴╴╴╴╴╴╴╴╴╴╯
${deleteInfo}
┃└─────────────┈⊷
╰──────────────────┈⊷
${NEWSLETTER_CONFIG.watermark}`;

            if (['image', 'video'].includes(currentType.type)) {
                const mediaUrl = antideletedmek[currentType.key]?.url || NEWSLETTER_CONFIG.imageUrl;
                await conn.sendMessage(jid, { 
                    [currentType.type]: { url: mediaUrl },
                    caption: caption,
                    contextInfo: {
                        ...getNewsletterContext(),
                        mentionedJid: [mek.sender],
                    }
                }, { quoted: mek });
            } else {
                await conn.sendMessage(jid, { 
                    image: { url: NEWSLETTER_CONFIG.imageUrl },
                    caption: `*⚠️ Deleted ${currentType.type.toUpperCase()} Alert 🚨*`,
                    contextInfo: getNewsletterContext()
                });
                
                await conn.sendMessage(jid, { 
                    text: caption,
                    contextInfo: getNewsletterContext()
                }, { quoted: mek });

                if (antideletedmek[currentType.key]?.url) {
                    await conn.sendMessage(jid, {
                        [currentType.type]: { url: antideletedmek[currentType.key].url },
                        contextInfo: getNewsletterContext()
                    }, { quoted: mek });
                }
            }
        } else {
            antideletedmek[messageType].contextInfo = {
                ...getNewsletterContext(),
                stanzaId: mek.key.id,
                participant: mek.sender,
                quotedMessage: mek.message,
            };
            await conn.relayMessage(jid, antideletedmek, {});
        }
    } catch (error) {
        console.error('Error in DeletedMedia:', error);
    }
};

const AntiDelete = async (conn, updates) => {
    try {
        for (const update of updates) {
            if (update.update.message === null) {
                const store = await loadMessage(update.key.id);

                if (store && store.message) {
                    const mek = store.message;
                    const isGroup = isJidGroup(store.jid);
                    const antiDeleteStatus = await getAnti();
                    if (!antiDeleteStatus) continue;

                    const deleteTime = new Date().toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true
                    });
                    const deleteDate = new Date().toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                    });

                    let deleteInfo, jid;
                    if (isGroup) {
                        const groupMetadata = await conn.groupMetadata(store.jid);
                        const groupName = groupMetadata.subject;
                        const sender = mek.key.participant?.split('@')[0] || 'Unknown';
                        const deleter = update.key.participant?.split('@')[0] || 'Unknown';

                        deleteInfo = `
┃📅 DATE      : ${deleteDate}
┃⏰ TIME      : ${deleteTime}
┃👤 SENDER    : @${sender}
┃👥 GROUP     : ${groupName}
┃🗑️ DELETED BY: @${deleter}
┃📌 TYPE      : ${getMessageType(mek.message)}`;
                        jid = config.ANTI_DEL_PATH === "inbox" ? conn.user.id : store.jid;
                    } else {
                        const senderNumber = mek.key.remoteJid?.split('@')[0] || 'Unknown';
                        deleteInfo = `
┃📅 DATE   : ${deleteDate}
┃⏰ TIME   : ${deleteTime}
┃📱 SENDER : @${senderNumber}
┃📌 TYPE   : ${getMessageType(mek.message)}`;
                        jid = config.ANTI_DEL_PATH === "inbox" ? conn.user.id : update.key.remoteJid;
                    }

                    deleteInfo += `\n┃⚠️ ACTION: Message Deletion Detected`;

                    if (mek.message?.conversation || mek.message?.extendedTextMessage || 
                        mek.message?.imageMessage?.caption || mek.message?.videoMessage?.caption) {
                        await DeletedText(conn, mek, jid, deleteInfo, isGroup, update);
                    } else {
                        await DeletedMedia(conn, mek, jid, deleteInfo);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error in AntiDelete:', error);
    }
};

function getMessageType(message) {
    if (!message) return 'Unknown';
    
    const type = Object.keys(message)[0];
    const typeMap = {
        conversation: 'Text',
        imageMessage: 'Image',
        videoMessage: 'Video',
        audioMessage: 'Audio',
        documentMessage: 'Document',
        stickerMessage: 'Sticker',
        extendedTextMessage: 'Text with Link',
        contactMessage: 'Contact',
        locationMessage: 'Location'
    };
    
    return typeMap[type] || type.replace('Message', '') || 'Unknown';
}

module.exports = {
    DeletedText,
    DeletedMedia,
    AntiDelete,
};
