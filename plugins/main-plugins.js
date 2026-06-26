const { cmd } = require('../DianaTech');
const config = require('../config');
const axios = require('axios');
const fs = require('fs');
const path = require('path');


// ===============================
// INSTALL PLUGIN
// ===============================
cmd({
    pattern: 'install',
    alias: ['addplugin', 'installplugin'],
    react: '📥',
    desc: 'Install plugins from GitHub Gist URL',
    category: 'plugin',
    filename: __filename,
    use: '<gist_url>',
    owner: true
},
async (conn, mek, m, { reply, args }) => {
    try {

        if (!args[0]) {
            return reply(`
╭━━〔 📥 *PLUGIN INSTALLER* 〕━━⬣
┃
┃ ❌ *No Gist URL Provided!*
┃
┃ 📌 *Example:*
┃ *${config.PREFIX}install https://gist.github.com/user/gistid*
┃
╰━━━━━━━━━━━━━━━━━━⬣`);
        }

        const url = args[0];

        const match = url.match(/gist\.github\.com\/(?:.+\/)?([a-zA-Z0-9]+)/);

        if (!match || !match[1]) {
            return reply(`
╭━━〔 ❌ *INVALID URL* 〕━━⬣
┃
┃ Please provide a valid
┃ GitHub Gist URL.
┃
╰━━━━━━━━━━━━━━━━━━⬣`);
        }

        const gistId = match[1];

        const response = await axios.get(`https://api.github.com/gists/${gistId}`);
        const data = response.data;

        if (!data.files) {
            return reply(`
╭━━〔 ⚠️ *NO FILE FOUND* 〕━━⬣
┃
┃ No files were found
┃ inside this Gist.
┃
╰━━━━━━━━━━━━━━━━━━⬣`);
        }

        const jsFile = Object.values(data.files).find(file =>
            file.filename && file.filename.endsWith('.js')
        );

        if (!jsFile) {
            return reply(`
╭━━〔 ⚠️ *INVALID PLUGIN* 〕━━⬣
┃
┃ No JavaScript (.js)
┃ file found inside
┃ this Gist.
┃
╰━━━━━━━━━━━━━━━━━━⬣`);
        }

        const pluginsDir = path.join(__dirname, '..', 'plugins');

        if (!fs.existsSync(pluginsDir)) {
            fs.mkdirSync(pluginsDir, { recursive: true });
        }

        const pluginPath = path.join(pluginsDir, jsFile.filename);

        if (fs.existsSync(pluginPath)) {
            return reply(`
╭━━〔 ⚠️ *PLUGIN EXISTS* 〕━━⬣
┃
┃ 📄 *${jsFile.filename}*
┃ is already installed.
┃
┃ 📋 Check:
┃ *${config.PREFIX}pluginlist*
┃
╰━━━━━━━━━━━━━━━━━━⬣`);
        }

        await fs.promises.writeFile(pluginPath, jsFile.content, 'utf8');

        return reply(`
╭━━〔 ✅ *PLUGIN INSTALLED* 〕━━⬣
┃
┃ 📄 *Name*
┃ ➜ ${jsFile.filename}
┃
┃ 📁 *Saved To*
┃ ➜ /plugins
┃
┃ ♻️ *Restart Bot*
┃ ➜ ${config.PREFIX}restart
┃
╰━━━━━━━━━━━━━━━━━━⬣`);

    } catch (error) {

        console.error('INSTALL PLUGIN ERROR:', error);

        return reply(`
╭━━〔 ❌ *INSTALL FAILED* 〕━━⬣
┃
┃ 📌 *Reason*
┃ ${error.message}
┃
┃ 💡 Make Sure:
┃ • Gist exists
┃ • Gist is Public
┃ • URL is Correct
┃
╰━━━━━━━━━━━━━━━━━━⬣`);
    }
});


// ===============================
// PLUGIN LIST
// ===============================
cmd({
    pattern: 'pluginlist',
    alias: ['listplugins'],
    react: '📂',
    desc: 'List installed plugins',
    category: 'plugin',
    filename: __filename
},
async (conn, mek, m, { reply }) => {

    try {

        const pluginsDir = path.join(__dirname, '..', 'plugins');

        if (!fs.existsSync(pluginsDir)) {
            fs.mkdirSync(pluginsDir, { recursive: true });
        }

        const files = fs.readdirSync(pluginsDir)
            .filter(file => file.endsWith('.js'));

        if (files.length === 0) {
            return reply(`
╭━━〔 📂 *PLUGIN LIST* 〕━━⬣
┃
┃ 📭 No plugins installed.
┃
╰━━━━━━━━━━━━━━━━━━⬣`);
        }

        let msg = `
╭━━〔 📂 *INSTALLED PLUGINS* 〕━━⬣
┃
`;

        files.forEach((file, index) => {
            msg += `┃ ${index + 1}. 📄 ${file}\n`;
        });

        msg += `┃
┃ 📦 Total : ${files.length}
╰━━━━━━━━━━━━━━━━━━⬣`;

        return reply(msg);

    } catch (error) {

        console.error('PLUGIN LIST ERROR:', error);

        return reply(`
╭━━〔 ❌ *ERROR* 〕━━⬣
┃
┃ Failed to fetch
┃ plugin list.
┃
┃ 📌 ${error.message}
┃
╰━━━━━━━━━━━━━━━━━━⬣`);
    }
});


// ===============================
// DELETE PLUGIN
// ===============================
cmd({
    pattern: 'deleteplugin',
    alias: ['removeplugin', 'uninstall'],
    react: '🗑️',
    desc: 'Delete installed plugin',
    category: 'plugin',
    filename: __filename,
    use: '<plugin_name>',
    owner: true
},
async (conn, mek, m, { reply, args }) => {

    try {

        if (!args[0]) {
            return reply(`
╭━━〔 🗑️ *DELETE PLUGIN* 〕━━⬣
┃
┃ ❌ Plugin name missing!
┃
┃ 📌 Example:
┃ *${config.PREFIX}deleteplugin test.js*
┃
╰━━━━━━━━━━━━━━━━━━⬣`);
        }

        let pluginName = args[0];

        if (!pluginName.endsWith('.js')) {
            pluginName += '.js';
        }

        const pluginsDir = path.join(__dirname, '..', 'plugins');
        const pluginPath = path.join(pluginsDir, pluginName);

        if (!fs.existsSync(pluginPath)) {
            return reply(`
╭━━〔 ⚠️ *NOT FOUND* 〕━━⬣
┃
┃ 📄 ${pluginName}
┃ was not found.
┃
┃ 📋 Check:
┃ *${config.PREFIX}pluginlist*
┃
╰━━━━━━━━━━━━━━━━━━⬣`);
        }

        fs.unlinkSync(pluginPath);

        return reply(`
╭━━〔 ✅ *PLUGIN REMOVED* 〕━━⬣
┃
┃ 🗑️ Deleted:
┃ 📄 ${pluginName}
┃
┃ ♻️ Restart Bot:
┃ *${config.PREFIX}restart*
┃
╰━━━━━━━━━━━━━━━━━━⬣`);

    } catch (error) {

        console.error('DELETE PLUGIN ERROR:', error);

        return reply(`
╭━━〔 ❌ *DELETE FAILED* 〕━━⬣
┃
┃ 📌 ${error.message}
┃
╰━━━━━━━━━━━━━━━━━━⬣`);
    }
});
