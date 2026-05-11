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
            return reply(
                `❌ Please provide a Gist URL\n\nExample:\n*${config.PREFIX}install https://gist.github.com/user/gistid*`
            );
        }

        const url = args[0];

        // Better Gist ID extraction
        const match = url.match(/gist\.github\.com\/(?:.+\/)?([a-zA-Z0-9]+)/);

        if (!match || !match[1]) {
            return reply('❌ Invalid GitHub Gist URL');
        }

        const gistId = match[1];

        // Fetch gist data
        const response = await axios.get(`https://api.github.com/gists/${gistId}`);
        const data = response.data;

        if (!data.files) {
            return reply('❌ No files found in this Gist');
        }

        // Find first JS file
        const jsFile = Object.values(data.files).find(file =>
            file.filename && file.filename.endsWith('.js')
        );

        if (!jsFile) {
            return reply('❌ No JavaScript (.js) file found in this Gist');
        }

        // Create plugins directory
        const pluginsDir = path.join(__dirname, '..', 'plugins');

        if (!fs.existsSync(pluginsDir)) {
            fs.mkdirSync(pluginsDir, { recursive: true });
        }

        const pluginPath = path.join(pluginsDir, jsFile.filename);

        // Check if plugin already exists
        if (fs.existsSync(pluginPath)) {
            return reply(
                `⚠️ Plugin *${jsFile.filename}* already installed!\n\nUse *${config.PREFIX}pluginlist* to view installed plugins`
            );
        }

        // Save plugin
        await fs.promises.writeFile(pluginPath, jsFile.content, 'utf8');

        return reply(
            `✅ Plugin Installed Successfully!\n\n` +
            `📄 Name: *${jsFile.filename}*\n` +
            `📁 Location: */plugins*\n\n` +
            `♻️ Use *${config.PREFIX}restart* to load the plugin`
        );

    } catch (error) {

        console.error('INSTALL PLUGIN ERROR:', error);

        return reply(
            `❌ Failed to install plugin\n\n` +
            `📌 Error: ${error.message}\n\n` +
            `Make sure:\n` +
            `1. The Gist exists\n` +
            `2. The Gist is public\n` +
            `3. The URL is correct`
        );
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

        // Create folder if missing
        if (!fs.existsSync(pluginsDir)) {
            fs.mkdirSync(pluginsDir, { recursive: true });
        }

        const files = fs.readdirSync(pluginsDir)
            .filter(file => file.endsWith('.js'));

        if (files.length === 0) {
            return reply('📭 No plugins installed');
        }

        let msg = `📋 *Installed Plugins*\n\n`;

        files.forEach((file, index) => {
            msg += `${index + 1}. ${file}\n`;
        });

        msg += `\n📦 Total Plugins: ${files.length}`;

        return reply(msg);

    } catch (error) {

        console.error('PLUGIN LIST ERROR:', error);

        return reply(`❌ Failed to fetch plugin list\n\n${error.message}`);
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
            return reply(
                `❌ Please provide plugin name\n\nExample:\n*${config.PREFIX}deleteplugin test.js*`
            );
        }

        let pluginName = args[0];

        if (!pluginName.endsWith('.js')) {
            pluginName += '.js';
        }

        const pluginsDir = path.join(__dirname, '..', 'plugins');
        const pluginPath = path.join(pluginsDir, pluginName);

        // Check existence
        if (!fs.existsSync(pluginPath)) {
            return reply(
                `❌ Plugin *${pluginName}* not found\n\n` +
                `Use *${config.PREFIX}pluginlist* to see installed plugins`
            );
        }

        // Delete plugin
        fs.unlinkSync(pluginPath);

        return reply(
            `✅ Plugin Deleted Successfully!\n\n` +
            `🗑️ Removed: *${pluginName}*\n\n` +
            `♻️ Use *${config.PREFIX}restart* to apply changes`
        );

    } catch (error) {

        console.error('DELETE PLUGIN ERROR:', error);

        return reply(
            `❌ Failed to delete plugin\n\n` +
            `📌 Error: ${error.message}`
        );
    }
});