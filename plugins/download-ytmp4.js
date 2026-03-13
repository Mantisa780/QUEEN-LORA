const fetch = require("node-fetch");
const ytdl = require("ytdl-core");
const config = require("../config");
const { cmd } = require("../DianaTech");

cmd({
    pattern: "ytmp4",
    alias: ["ytvideo","ytv","video"],
    desc: "Download YouTube video",
    category: "downloader",
    react: "🎬",
    filename: __filename
},
async (conn, mek, m, { from, q }) => {

const isValidYouTubeUrl = (url) => {
return /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|shorts\/|embed\/)?[A-Za-z0-9_-]{11}(\?.*)?$/.test(url);
};

if (!q || !isValidYouTubeUrl(q)) {
return m.reply("❌ Tanpri voye yon link YouTube ki valab.");
}

try {

await conn.sendMessage(from,{react:{text:"⌛",key:mek.key}});

const encodedUrl = encodeURIComponent(q);

const response = await fetch(`https://api.ootaizumi.web.id/downloader/youtube?url=${encodedUrl}&format=720`,{
headers:{Accept:"application/json"}
});

const data = await response.json();

if(!data.status || !data.result || !data.result.download){
throw new Error("Video pa jwenn.");
}

const title = data.result.title || "YouTube Video";
const thumbnailUrl = data.result.thumbnail;

const videoResponse = await fetch(data.result.download);
const arrayBuffer = await videoResponse.arrayBuffer();
const videoBuffer = Buffer.from(arrayBuffer);

await conn.sendMessage(from,{react:{text:"✅",key:mek.key}});

await conn.sendMessage(from,{
video: videoBuffer,
mimetype: "video/mp4",
fileName: `${title}.mp4`,
contextInfo:{
externalAdReply:{
title: title,
body: "QUEEN LORA TECH",
thumbnailUrl: thumbnailUrl,
sourceUrl: q,
mediaType: 2,
renderLargerThumbnail: true
}
}
},{quoted:mek});

} catch (error) {

console.log("YouTube video error:",error);

await conn.sendMessage(from,{react:{text:"❌",key:mek.key}});

try {

const info = await ytdl.getInfo(q);

const format = ytdl.chooseFormat(info.formats,{
filter:"videoandaudio",
quality:"highest"
});

const videoUrl = format.url;
const title = info.videoDetails.title;
const thumbnail = info.videoDetails.thumbnails[0].url;

await conn.sendMessage(from,{react:{text:"✅",key:mek.key}});

await conn.sendMessage(from,{
video:{url:videoUrl},
mimetype:"video/mp4",
fileName:`${title}.mp4`,
contextInfo:{
externalAdReply:{
title:title,
body:"QUEEN LORA TECH (Fallback)",
thumbnailUrl:thumbnail,
sourceUrl:q,
mediaType:2,
renderLargerThumbnail:true
}
}
},{quoted:mek});

} catch (fallbackError) {

console.log("Fallback error:",fallbackError);

m.reply("❌ Tout metòd download yo echwe.");

}

}

});