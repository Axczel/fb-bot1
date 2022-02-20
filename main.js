const fs = require("fs");
const { keep_alive } = require("./keep_alive.js");
const http = require('https'); // or 'https' for https:// URLs
const login = require("fca-unofficial");
const axios = require("axios");
const YoutubeMusicApi = require('youtube-music-api')
const ytdl = require('ytdl-core');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const ffmpegs = require('fluent-ffmpeg');
ffmpegs.setFfmpegPath(ffmpeg.path);
const musicApi = new YoutubeMusicApi()
// GLOBAL MESSAGE STORAGE
let msgs = {};
let vip = [100044362560006];
let vips = ['100044362560006']
let cd = {};
let threads = ""
let onBot = true 
/*==================================== LEECH tiktok FUNC ====================================*/

async function leechTT(link) {
    out = await axios.get("https://www.tiktokdownloader.org/check.php?v=" + link).then((response) => { return response.data.download_url }).catch((error) => { return "err" })
    return out
}
/*==================================== LEECH tiktok FUNC ====================================*/


/*==================================== WIKI search FUNC ====================================*/
async function getWiki(q) {
  out = await axios.get("https://en.wikipedia.org/api/rest_v1/page/summary/" + q).then((response) => { return response.data}).catch((error) => { return error })
  return out
}
 
 /*==================================== WIKI search FUNC ====================================*/

/*==================================== LEECH MP3 FUNC ====================================*/
async function conv(v, t, e) {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-Key': 'de0cfuirtgf67a'
    }
    results = await axios.post("https://backend.svcenter.xyz/api/convert-by-45fc4be8916916ba3b8d61dd6e0d6994", "v_id=" + v + "&ftype=mp3&fquality=128&token=" + t + "&timeExpire=" + e + "&client=yt5s.com", { headers: headers }).then((response) => { return response.data.d_url }).catch((error) => { return error.message });
    return results
}
async function fetch(query) {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    results = await axios.post("https://yt5s.com/api/ajaxSearch", "q=" + query + "&vt=mp3", { headers: headers }).then((response) => { return response.data }).catch((error) => { return error.message });
    return results
}

async function dl(x){
	let s = fetch(x)
	let r = await s.then((response) => {
		let slist = response
		console.log(slist)
		if(slist.t < 1500){
			let d_u = conv(slist.vid, slist.token, slist.timeExpires).then((response) => {
				return [response, slist.title, slist.a]
			})
			return d_u
		}else{
			console.log(slist.t)
			return "Error: MPOP"
		}
	})
	return r
}

async function leechmp3(query) {
    var songs = fetch(query);
    let resp = await songs.then((response) => {
        let slist = response;
        if (slist == "err") {
            return "err"
        }
        else if (slist.t < 1300) {
            let d_url = conv(slist.vid, slist.token, slist.timeExpires).then((response) => {
                return [response, slist.title]
            });
            return d_url
        }
        else if (slist.p == "search") {
            return 'err'
        }
        else if (slist.mess.startsWith("The video you want to download is posted on TikTok.")) {
            return 'tiktok'
        }
        else {
            return 'bawal'
        }
    });
    return resp
}

/*==================================== LEECH MP3 FUNC ====================================*/

/*==================================== RANDOM QOUTES FUNC ====================================*/

async function qt() {
    let qoute = await axios.get("https://zenquotes.io/api/random").then((response) => { return response.data[0] }).catch((err) => { return "err " });
    return qoute
}
/*==================================== RANDOM QOUTES FUNC ====================================*/

login({ appState: JSON.parse(fs.readFileSync('fbstate.json', 'utf8')) }, (err, api) => {
    if (err) return console.error(err);
    api.setOptions({ listenEvents: true });
    const listenEmitter = api.listen(async (err, event) => {
        if (err) return console.error(err);
        switch (event.type) {
            case "message_reply":
 if (vips.includes(event.senderID)) {
                     api.setMessageReaction("🥰", event.messageID, (err) => {
                  }, true);
                }
               // else {
                    // api.setMessageReaction("😊", //event.messageID, (err) => {
                 //   }, true);
              //  }
                let msgid = event.messageID
                let input = event.body;
                msgs[msgid] = input;
                break
            case "message":
if (vips.includes(event.senderID)) {
                     api.setMessageReaction("😊", event.messageID, (err) => {
                  }, true);
                }
              //  else {
                    // api.setMessageReaction("🥰", //event.messageID, (err) => {
                  //  }, true);
             //    }
              if (event.attachments.length != 0) {
                    if (event.attachments[0].type == "photo") {
                        msgs[event.messageID] = ['img', event.attachments[0].url]
                    }
                    else if (event.attachments[0].type == "animated_image") {
                        msgs[event.messageID] = ['gif', event.attachments[0].url]
                    }
                     else if (event.attachments[0].type == "sticker") {
                        msgs[event.messageID] = ['sticker', event.attachments[0].url]
                    }
                    else if (event.attachments[0].type == "video") {
                        msgs[event.messageID] = ['vid', event.attachments[0].url]
                    }
                    else if (event.attachments[0].type == "audio") {
                        msgs[event.messageID] = ['vm', event.attachments[0].url]
                    }
                } else {
                    msgs[event.messageID] = event.body
                   }
                    if (event.body != null) {
                    let input = event.body;
                    let input2 = input.toLowerCase();
                    if(vips.includes(event.senderID)){
                        if(input.startsWith("Bot Off") && onBot){
                            onBot = false
                            api.sendMessage("Axczel Bot is now sleeping..😴", event.threadID, event.messageID)
                            for(let i = 0; i < vip.length; i++){
                                if(vip[i] != event.threadID){
                                    api.sendMessage("Axczel Bot has turned off!", vip[i])
                                }
                            }
                        }
                        if(input.startsWith("Bot On") && threads.includes(event.threadID)){
                            threads = threads.replace(event.threadID + " ", "")
                            api.sendMessage("Axczel Bot is now activated for this conversation.😘", event.threadID, event.messageID)
                            for(let i = 0; i < vip.length; i++){
                                if(vip[i] != event.threadID){
                                    api.sendMessage("Axczel Bot was activated from a custom thread!", vip[i])
                                }
                            }
                        }
                        if(input.startsWith("Bot Stop") && !threads.includes(event.threadID)){
                            threads += event.threadID + " "
                            api.sendMessage("Axczel Bot is now deactivated for this conversation.🙄", event.threadID, event.messageID)
                            for(let i = 0; i < vip.length; i++){
                                if(vip[i] != event.threadID){
                                    api.sendMessage("Axczel Bot was deactivated from a custom thread!", vip[i])
                                }
                            }
                        }
                        if(input.startsWith("Bot Wake up") && !onBot){
                            onBot = true
                            api.sendMessage("Axczel bot is now awake.🤪", event.threadID, event.messageID)
                            for(let i = 0; i < vip.length; i++){
                                if(vip[i] != event.threadID){
                                    api.sendMessage("Axczel Bot has turned on!", vip[i])
                                }
                            }
                        }
                        if(input.startsWith("Status")){
                        let m = "Axczel Bot is currently active, "
                            if(onBot){
                                m += "also awake.🤪"
                            }else{
                                m += "but on sleep mode.😴"
                            }
                            api.sendMessage(m, event.threadID, event.messageID)
                        }
                        else if (input.startsWith("Admin")) {
 
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("Admin commands\n\nBot Off\nBot Wake up\nBot On\nBot Stop\nStatus\n\n\nMade By Axczel", event.threadID, event.messageID);
                            
                            }
                            }
                    }
                    if(onBot && !threads.includes(event.threadID)){
                        if(!f(input2)){
                        if (input.startsWith("#ytdl")) {
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("❎Invalid Use Of Command!\n✅Usage: #ytdl_url", event.threadID);
                        } else {
                            api.sendMessage("🔄Trying to Download...", event.threadID, event.messageID);
                            try {
                                let s = leechmp3(data[1]);
                                s.then((response) => {
                                    if (response == "bawal") {
                                        api.setMessageReaction("😤", event.messageID, (err) => {
                                        }, true);
                                        api.sendMessage("Sorry Di pwede \n 20mins Max Duration Only!😤", event.threadID, event.messageID);
                                    }
                                    else if (response == "err") {
                                        api.sendMessage("❌Invalid Input", event.threadID, event.messageID);
                                        api.setMessageReaction("😤", event.messageID, (err) => {

                                        }, true);
                                    }
                                    else if (response == "tiktok") {
                                        api.sendMessage(" ❎Youtube Only, Bawal Tiktok!", event.threadID, event.messageID);
                                        api.setMessageReaction("😤", event.messageID, (err) => {

                                        }, true);
                                    }
                                    else if (response[0] != undefined) {
                                        var file = fs.createWriteStream("song.mp3");
                                        var targetUrl = response[0];
                                        var gifRequest = http.get(targetUrl, function (gifResponse) {
                                            gifResponse.pipe(file);
                                            file.on('finish', function () {
                                                console.log('finished downloading..')
                                                api.sendMessage('âœ…Download Complete! Uploading...', event.threadID)
                                                var message = {
                                                    body: "Here's what ya ordered senpai!\n\n🎶Song Title: " + response[1] + "\n\n🥰Made by: Axczel",
                                                    attachment: fs.createReadStream(__dirname + '/song.mp3')
                                                }
                                                api.sendMessage(message, event.threadID);
                                            });
                                        });
                                    }
                                });
                            } catch (err) {
                                api.sendMessage("❎Error: " + err.message, event.threadID);
                            }
                        }
                    }
                    else if (input.startsWith("#tiktokdl")) {
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("❎Invalid Use Of Command!\n✅Usage: #tiktok vid_url", event.threadID);
                        } else {
                            api.sendMessage("🔄Trying to Download...", event.threadID, event.messageID);
                            try {
                                let s = leechTT(data[1]);
                                s.then((response) => {
                                    if (response == "err") {
                                        api.sendMessage("❎Invalid Input", event.threadID, event.messageID);
                                        api.setMessageReaction("😤", event.messageID, (err) => {

                                        }, true);
                                    }
                                    else {
                                        var file = fs.createWriteStream("tiktok.mp4");
                                        var targetUrl = response;
                                        var gifRequest = http.get(targetUrl, function (gifResponse) {
                                            gifResponse.pipe(file);
                                            file.on('finish', function () {
                                                console.log('finished downloading..')
                                                api.sendMessage('⬇️…Download Complete! Uploading...', event.threadID)
                                                var message = {
                                                    body: " 🥰 Here's what ya ordered senpai!\n\n🥰 Made by: Axczel ",
                                                    attachment: fs.createReadStream(__dirname + '/tiktok.mp4')
                                                }
                                                api.sendMessage(message, event.threadID);
                                            });
                                        });
                                    }
                                });
                            } catch (err) {
                                api.sendMessage("❎Error: " + err.message, event.threadID);
                            }
                        }
                    }
                    else if (input.startsWith("#help")) {
 
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("🎉 COMMAND LISTS 🎉\n\n===========================\n\n🛠️-#help\n\n🎧-#play(song_title)\n\n🎬-#ytdl (yt_url)\n\n👯-#tiktokdl (vid url)\n\n💪- #motivation \n\n🧐-#wiki (word)\n\nThank You for Using this Bot!🥰• \n\nMade by: Axl Chan \n\n*Please be always responsible when using this bot!\n\n*Please DO NOT spam this bot, learn to wait!!\n\n*Please do not misuse the commands to maintain the Bot's health's state and active status!\n\n*Misuse of the commands will lead to serious crash and errors!\n\nThank you for your understanding, and please have a good day🥰", event.threadID, event.messageID);                           
                            }
                            }
                            
         if(input2.includes("pogi") || 
input2.includes("gwapo") || input2.includes("ganda") || input2.includes("shawty") || input2.includes("beaut") || input2.includes("kawaii") || input2.includes("gunthe") || input2.includes("cute")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("Bat moko tinatawag?", event.threadID, event.messageID);
                            }
                        })
}
if(input2.includes("morning") || input2.includes("umaga") || input2.includes("murning")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage(("Good Morning 🥰" + data[event.senderID]['name'] + ", Kumain kana ba?\n\n🤗 Auto Greet by: Axczel"), event.threadID, event.messageID);
                            }
                        })
}
                            
                            
                            if(input2.includes("night") || input2.includes("nyt") || input2.includes("nayt") || input2.includes("gabi")){
                                              
                      
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage(("Good Night 🥰🥰" + data[event.senderID]['name'] + ", SleepWell 😴\n\n Auto Greet by: Axczel"), event.threadID, event.messageID);
                            }
                        })


                            }
                            
                            if(input2.includes("afternoon") || input2.includes("hapon")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage(("Good Afternoon din sau 🥰 " + data[event.senderID]['name'] + ", Musta Araw mo?\n\nAuto Greet by: Axczel"), event.threadID, event.messageID);
                            }
                        })
}

                         if(input2.includes("axczel") || 
input2.includes("bot")){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage("Oh bakit? Ano problema mo? Disturbo nag hahanap pako ng Chix ehh", event.threadID, event.messageID);
                            }
                        })
}   
                            
                            if(input2.includes("panget") || input2.includes("ngetpa") || input2.includes("ngitpa") || input2.includes("pangit") || input2.includes("ugly") || input2.includes("kowai")) {
                           	   	let data = input;
                                           if (!vips.includes(event.senderID)){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage(("Mas panget po ang may pangalan na " + data[event.senderID]['name'] + "!🤭"), event.threadID, event.messageID);
                            }
                        })
                        }
                       }
                     
                       if(input2.toLowerCase().includes("ligo")){ 
 
                        let data = input;
                      //  if (data.length < 2) {
                      api.getUserInfo(event.senderID, (err, data) => {
                      if(err) return console.log(err)
                      else{
                            api.sendMessage((" wow 😲 naliligo ka pala " + data[event.senderID]['name'] + " ngayon ko lang nalaman🤣"), event.threadID, event.messageID);
                        }
    })
                          //  }
                            }
                            if(input2.toLowerCase().includes("everyone")){ 
 
                        let data = input;
                      //  if (data.length < 2) {
                      api.getUserInfo(event.senderID, (err, data) => {
                      if(err) return console.log(err)
                      else{
                            api.sendMessage((" Huyyyyy mga tamad gisiiinnngggg tinatawag na kayo ng boss niyo 😂 "), event.threadID, event.messageID);
                        }
    })
                          //  }
                            }
                                                                    
                           if(input2.includes("gagu") || input2.includes("gago") || input2.includes("puta") || input2.includes("pota") || input2.includes("tangin") || input2.includes("inam")) {
                           	   	let data = input;
                                           if (!vips.includes(event.senderID)){
                        api.getUserInfo(event.senderID, (err, data) => {
                            if(err){
                                console.log(err)
                            }else{
                                api.sendMessage(("Lord look oh nagmumura si " + data[event.senderID]['name'] + " ikaw napo bahala sakanya paki kuha nalang po mamaya 🙂"), event.threadID, event.messageID);
                            }
                        })
                        }
                       }
                      else if (input.startsWith("#notes")) {
 
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("🧐Notes:\n\n*If your request is still on processing, plaese wait until it is finished before requesting a new one!\n\n*Please do not spam, be responsible when using this command to avoid getting blocked!\n\n*One request at a time only, let the Bot do its job!\n\nChat me if you incounter a problem here:\nhttps://m.me/axczel.xhan\n\nThank you for your understanding, have a good day🥰\n\n\n Made by: Axczel", event.threadID, event.messageID);
                            
                            }
                            }
                             else if (input.startsWith("#myfbid")) {
 
                        let data = input.split(" ");
                        if (data.length < 2) {
                      api.sendMessage(("Your Facebook Id: " + event.senderID + "\n\n By: Axczel"), event.threadID, event.messageID);
                            
                            }
                            }
                            
     
                        if(input2.includes("haha") || input2.includes("lol")){
                                api.setMessageReaction("😆", event.messageID, (err) => {}, true)}
                     
                           if(input2.includes("thank")|| input2.includes("tnx")|| input2.includes("welcome")|| input2.includes("ty")|| input2.includes("salamat")|| input2.includes("po")){
                                api.setMessageReaction("🥰", event.messageID, (err) => {}, true)}
    
                        if (input.startsWith("#wiki")) {
 
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("❎invalid Use Of Command!\n✅Usage: #wiki word", event.threadID);
                        } else {
                            try {
                                data.shift()
                                var txtWiki = "";
                                let res = await getWiki(data.join(" "));
                                if(res === undefined){
                                    throw new Error(`API RETURNED THIS: ${res}`)
                                }
                                if(res.title === undefined) {
                                  throw new Error(`API RETURNED THIS: ${res}`)
                                }
                                txtWiki += `🔎You search the word ${res.title} \n\nTimeStamp: ${res.timestamp}\n\nDescription: ${res.description}\n\nInfo: ${res.extract}\n\nSource: https://en.wikipedia.org`
 
                                api.sendMessage(`${txtWiki}`, event.threadID, event.messageID);
                            }
                            catch (err) {
                                api.sendMessage(`❌${err.message}`, event.threadID, event.messageID);
                            }
                        }
                    }
                   

                    else if (input.startsWith("#play")) {
                        let data = input.split(" ");
                        if (data.length < 2) {
                            api.sendMessage("❎Invalid Use Of Command!\n✅Usage: #play music_title", event.threadID);
                        } else {
                            if (!(vips.includes(event.senderID))) {
                                if (!(event.senderID in cd)) {
                                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);
                                }
                                else if (Math.floor(Date.now() / 1000) < cd[event.senderID]) {
                                    api.sendMessage("Opps you're going to fast! Wait for " + Math.floor((cd[event.senderID] - Math.floor(Date.now() / 1000)) / 60) + " mins and " + (cd[event.senderID] - Math.floor(Date.now() / 1000)) % 60 + " seconds", event.threadID, event.messageID);
                                    return
                                }
                                else {
                                    cd[event.senderID] = Math.floor(Date.now() / 1000) + (60 * 3);
                                }
                            }
                            api.sendMessage("🔎Searching...", event.threadID, event.messageID);
                            try {
                                data.shift();
                                await musicApi.initalize();
                                const musics = await musicApi.search(data.join(" ").replace(/[^\w\s]/gi, ''));
                                if (musics.content.length == 0) {
                                    throw new Error(`${data.join(" ").replace(/[^\w\s]/gi, '')} returned no result!`)
                                } else {
                                    if (musics.content[0].videoId === undefined) {
                                        throw new Error(`${data.join(" ").replace(/[^\w\s]/gi, '')} is not found on youtube music`)
                                    }
                                }
                                const url = `https://www.youtube.com/watch?v=${musics.content[0].videoId}`;
                                console.log(`connecting to yt`);
                                const strm = ytdl(url, {
                                    quality: "lowest"
                                });
                                const info = await ytdl.getInfo(url);
                                console.log(`converting`);
                                api.sendMessage('🔄Converting...', event.threadID,event.messageID)
                                ffmpegs(strm)
                                    .audioBitrate(96)
                                    .save(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3`)
                                    .on("end", () => {
                                        console.log(`Playing ${data.join(" ").replace(/[^\w\s]/gi, '')}`);
                                        api.sendMessage({
                                            body: "🥰Here's what ya ordered senpai!\n\nSong Title: " + info.videoDetails.title + "\n\n🥰 Made by: Axczel",
                                            attachment: fs.createReadStream(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3`)
                                                .on("end", async () => {
                                                    if (fs.existsSync(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3`)) {
                                                        fs.unlink(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3`, function (err) {
                                                            if (err) console.log(err);
                                                            console.log(`${__dirname}/${data.join(" ").replace(/[^\w\s]/gi, '')}.mp3 is deleted!`);
                                                        });
                                                    }
                                                })
                                        }, event.threadID, event.messageID);
                                    });

                            } catch (err) {
                                api.sendMessage(`❌${err.message}`, event.threadID, event.messageID);
                            }
                        }

                    }
                    else if (input.startsWith("#motivation")) {
                        let rqt = qt();
                        rqt.then((response) => {
                            api.sendMessage(response.q + "\n- " + response.a, event.threadID, event.messageID);
                        })
                    }
                }   
}       
                   break;
            }case "message_unsend":
                if (!vips.includes(event.senderID)) {
                    let d = msgs[event.messageID];
                    if (typeof (d) == "object") {
                        api.getUserInfo(event.senderID, (err, data) => {
                            if (err) return console.error(err);
                            else {
                                if (d[0] == "img") {
                                    var file = fs.createWriteStream("photo.jpg");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            console.log('finished downloading photo..')
                                            var message = {
                                                body: data[event.senderID]['name'] + " unsent this photo😳: \n",
                                                attachment: fs.createReadStream(__dirname + '/photo.jpg')
                                            }
                                            api.sendMessage(message, event.threadID);
                                        });
                                    });
                                }
                                                           // GIF unsent test
else if (d[0] == "gif") {
                                    var file = fs.createWriteStream("animated_image.gif");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            console.log('finished downloading gif..')
                                            var message = {
                                                body: data[event.senderID]['name'] + " unsent this GIF😳: \n",
                                                attachment: fs.createReadStream(__dirname + '/animated_image.gif')
                                            }
                                            api.sendMessage(message, event.threadID);
                                        });
                                    });
                                }
else if (d[0] == "sticker") {
                                    var file = fs.createWriteStream("sticker.png");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            console.log('finished downloading gif..')
                                            var message = {
                                                body: data[event.senderID]['name'] + " unsent this Sticker😳: \n",
                                                attachment: fs.createReadStream(__dirname + '/sticker.png')
                                            }
                                            api.sendMessage(message, event.threadID);
                                        });
                                    });
                                }
                                else if (d[0] == "vid") {
                                    var file = fs.createWriteStream("video.mp4");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            console.log('finished downloading photo..')
                                            var message = {
                                                body: data[event.senderID]['name'] + " unsent this video😳: \n",
                                                attachment: fs.createReadStream(__dirname + '/video.mp4')
                                            }
                                            api.sendMessage(message, event.threadID);
                                        });
                                    });
                                }
                                
     
                                
                                else if (d[0] == "vm") {
                                    var file = fs.createWriteStream("vm.mp3");
                                    var gifRequest = http.get(d[1], function (gifResponse) {
                                        gifResponse.pipe(file);
                                        file.on('finish', function () {
                                            console.log('finished downloading photo..')
                                            var message = {
                                                body: data[event.senderID]['name'] + " unsent this audio😳: \n",
                                                attachment: fs.createReadStream(__dirname + '/vm.mp3')
                                            }
                                            api.sendMessage(message, event.threadID);
                                        });
                                    });
                                }
                            }
                        });
                    }
                    else {
                        api.getUserInfo(event.senderID, (err, data) => {
                            if (err) return console.error(err);
                            else {
                                api.sendMessage(data[event.senderID]['name'] + " unsent this message😳: \n\n" + msgs[event.messageID] + "\n\nAnti Unsent By Axczel😳🤭", event.threadID);
                            }
                        });
                    }
                    }
                    break;
                }
    });
});
function f(p) {
	let g = [
		"tanga",
		"bobo",
		"ulol",
		"olol",
		"ulul",
		"olul",
		"taena",
		"tangina",
		"kwak",
		"gago",
		"gagu",
		"gaga",
		"pekora",
		"ungol",
		"lofi",
		"amogus",
		"hell",
		"devil",
		"demon",
		"iyot"
	
		
	]
	for(let i = 0; i < g.length; i++){
	   if(p.includes(g[i])){
			return true
			break
		}
    }
	return false
}
 
