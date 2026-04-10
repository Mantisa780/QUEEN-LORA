const { cmd } = require("../DianaTech");
const yts = require("yt-search");
const axios = require("axios");

// ✅ FAKE VERIFIED
const fakeVerified = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "DIANA SONG",
      vcard: `BEGIN:VCARD
VERSION:3.0
FN:DIANA MUSIC BOT
ORG:DIANA VERIFIED;
TITLE:Premium Music System
TEL;type=CELL;waid=18492823944:+18492823944
END:VCARD`
    }
  }
};

// ✅ CHANNEL STYLE
const contextInfo = {
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: "120363336396621021@newsletter",
    newsletterName: "💧 DIANA MUSIC HUB 💧",
    serverMessageId: 200
  }
};

// normalize
function normalizeYouTubeUrl(url) {
  const match = url.match(/(?:youtu.be\/|youtube.com\/shorts\/|youtube.com\/.*[?&]v=)([a-zA-Z0-9_-]{11})/);
  return match ? `https://youtube.com/watch?v=${match[1]}` : null;
}

// get audio
async function fetchAudioData(url) {
  try {
    const api = await axios.get(`https://api-aswin-sparky.koyeb.app/api/downloader/song?search=${encodeURIComponent(url)}`);
    return api.data.status && api.data.data ? api.data.data.url : null;
  } catch {
    return null;
  }
}

// MAIN
cmd({
  pattern: "song",
  alias: ["diana-song", "song2"],
  react: "🎧",
  desc: "Beautiful YouTube Audio Player",
  category: "download",
  filename: __filename,
}, async (conn, mek, m, { from, q, reply, prefix }) => {

  try {

    if (!q) return reply(`❓ Usage: ${prefix}song <name / link>`);

    await conn.sendMessage(from, {
      react: { text: "🔍", key: mek.key }
    });

    // 🔎 search
    let ytdata;
    const url = normalizeYouTubeUrl(q);

    if (url) {
      const res = await yts({ videoId: url.split("v=")[1] });
      ytdata = res;
    } else {
      const search = await yts(q);
      if (!search.videos.length) return reply("❌ No results found!");
      ytdata = search.videos[0];
    }

    const title = ytdata.title.replace(/[^\w\s]/gi, "").slice(0, 50);

    // 🎨 BEAUTIFUL CARD
    const card = `
╭━━━〔 🎧 *NOW PLAYING* 〕━━━⬣
┃ 🎼 *${ytdata.title}*
┃ ⏱ ${ytdata.timestamp}
┃ 👁 ${ytdata.views.toLocaleString()} views
┃
┃ ⬇️ *Downloading high quality audio...*
╰━━━━━━━━━━━━━━━━━━⬣
> 💧 Powered by Diana Tech
`;

    await conn.sendMessage(
      from,
      {
        image: { url: ytdata.thumbnail || ytdata.image },
        caption: card,
        contextInfo
      },
      { quoted: fakeVerified }
    );

    // 🎧 get audio
    const audioUrl = await fetchAudioData(ytdata.url);
    if (!audioUrl) return reply("❌ Download failed!");

    // 🎵 SEND AUDIO (BEAUTIFUL STYLE)
    await conn.sendMessage(
      from,
      {
        audio: { url: audioUrl },
        mimetype: "audio/mpeg",
        fileName: `${title}.mp3`,
        contextInfo
      },
      { quoted: fakeVerified }
    );

    // ✅ FINISH MESSAGE
    await conn.sendMessage(
      from,
      {
        text: `╭─❍ 🎶 *DOWNLOAD COMPLETE*
├▢⬡ *${title}*
╰──────────────⬣

💧 Enjoy your music 🎧`,
        contextInfo
      },
      { quoted: fakeVerified }
    );

    await conn.sendMessage(from, {
      react: { text: "✅", key: mek.key }
    });

  } catch (e) {
    console.error(e);
    reply("⚠️ Error occurred!");
  }
});


// 🔹 SIMPLE VERIFIED STYLE
const fakeMsg = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "🎶 DIANA PLAYER",
      vcard: `BEGIN:VCARD
VERSION:3.0
FN:DIANA PLAYER
ORG:MUSIC SYSTEM;
TEL;type=CELL;waid=18492823944:+18492823944
END:VCARD`
    }
  }
};

// 🔹 FETCH AUDIO
async function getAudio(query) {
  try {
    const res = await axios.get(`https://api-aswin-sparky.koyeb.app/api/downloader/song?search=${encodeURIComponent(query)}`);
    return res.data?.data?.url || null;
  } catch {
    return null;
  }
}

cmd({
  pattern: "play",
  alias: ["play2", "music"],
  react: "🎵",
  desc: "Simple Fast Music Player",
  category: "download",
  filename: __filename
}, async (conn, mek, m, { from, q, reply, prefix }) => {

  try {

    if (!q) return reply(`🎧 Example: ${prefix}song2 Faded`);

    await conn.sendMessage(from, {
      react: { text: "⏳", key: mek.key }
    });

    // 🔍 SEARCH
    const search = await yts(q);
    if (!search.videos.length) return reply("❌ Song not found!");

    const data = search.videos[0];
    const title = data.title.slice(0, 40);

    // 🔹 MINIMAL CARD
    await conn.sendMessage(from, {
      image: { url: data.thumbnail },
      caption: `🎧 *${title}*\n⏱ ${data.timestamp}\n👁 ${data.views}\n\n⬇️ Downloading...`
    }, { quoted: fakeMsg });

    // 🎵 GET AUDIO
    const audio = await getAudio(data.url);
    if (!audio) return reply("❌ Failed to fetch audio!");

    // 🎶 SEND AUDIO DIRECT (NO EXTRA STYLE)
    await conn.sendMessage(from, {
      audio: { url: audio },
      mimetype: "audio/mpeg",
      fileName: `${title}.mp3`
    }, { quoted: fakeMsg });

    await conn.sendMessage(from, {
      react: { text: "🎶", key: mek.key }
    });

  } catch (err) {
    console.log(err);
    reply("⚠️ Something went wrong!");
  }
});