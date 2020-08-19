// Response for Uptime Robot
const http = require("http");

function getType(_url) {
  var types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "text/json",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "svg+xml"
  };

  for (var key in types) {
    if (_url.endsWith(key)) {
      return types[key];
    }
  }
  return "text/plain";
}
var server = http.createServer(function(req, res) {
  var url =
    "public" + (req.url.endsWith("/") ? req.url + "index.html" : req.url);
  console.log(url);
  if (fs.existsSync(url)) {
    fs.readFile(url, (err, data) => {
      if (!err) {
        res.writeHead(200, { "Content-Type": getType(url) });
        res.end(data);
      } else {
        res.statusCode = 500;
        res.end();
      }
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});
var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("ok");
});

// Discord bot implements
const discord = require("discord.js");
const client = new discord.Client();
const Canvas = require("canvas");
const prefix = "Pe!";
const fs = require("fs");
const cron = require("node-cron");
const { inspect } = require("util");
const ms = require("ms");
const fetch = require("node-fetch");

client.on("ready", message => {
  console.log("bot is ready!");
  client.user.setActivity("Perfume | 100人突破!");
});

client.on("ready", () => {
  cron.schedule("0 * * * *", () => {
    const jphours = new Date(
      Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
    ).getHours();
    const comment = [
      "シトラー団、集まれ!",
      "みんなぁ〜元気か〜?",
      "忙しい人〜頑張れよ〜!",
      "人を沢山誘って〜お願いだ〜",
      "良ければこのサーバーのレビューをよろしくお願いします!\n[レビュー](https://disboard.org/ja/review/create/733918405106860126)"
      
    ];
    const random = Math.floor(Math.random() * comment.length);
    const channel = client.channels.cache.find(ch => ch.name == "🍾┃雑談№1-シトラス")
    channel.send({
      embed: {
        color: "RANDOM",
        title: "時報です。",
        description:
          "**" + jphours + "時になりました。**\n> " + comment[random],
        thumbnail: {
          url:
            "https://cdn.glitch.com/54a9aaa2-c952-46a9-8b02-fb5d02b4f5a0%2F3f8240fa1d16d0de6d4e7510b43b37ba.gif?v=1590394933876"
        }
      }
    });
    
  });
});

client.on("message", async message => {
if (message.content.startsWith('-auth')) {
 
    const applyText = (canvas, text) => {
      const ctx = canvas.getContext("2d");

      // Declare a base size of the font
      let fontSize = 70;

      do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${(fontSize -= 10)}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
      } while (ctx.measureText(text).width > canvas.width - 300);

      // Return the result to use in the actual canvas
      return ctx.font;
    };
var len = 8;
var str = "abcdefghijklmnopqrstuvwxyz";
var strLen = str.length;
var result = "";
  for (var i = 0; i < len; i++) {
  result += str[Math.floor(Math.random() * strLen)];
}

    const canvas = Canvas.createCanvas(1600, 800);
    const ctx = canvas.getContext("2d")
    
    const background = await Canvas.loadImage(
      "https://cdn.glitch.com/4ec68a8b-660a-46e4-b5d9-e69c4a47cd4f%2F%E7%84%A1%E9%A1%8C236_20200811105304.png?v=1597110828575"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = applyText(canvas, result);
    ctx.fillStyle = "#93818";
    ctx.fillText(
      result,
      canvas.width / 2.5,
      canvas.height / 1.8
    );

    ctx.beginPath();
    ctx.arc(1600, 800, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    const attachment = new discord.MessageAttachment(
      canvas.toBuffer(),
      "AuthPicture.png"
    );
  message.channel.send("画像の様に文字をってください。",attachment)
  message.channel.awaitMessages(m => m.author.id == message.author.id,
                            {max: 1, time: 60000}).then(collected => {
    if (collected.first().content.toLowerCase() == result) {
                                            message.reply('正解です。').then(() => message.member.roles.add("726000947175620629"))
            .then(() => message.member.roles.remove("742271596579782746"));
                                            client.channels.cache.forEach(channel => {
            if (channel.name === "🛡┃認証通知") {
              channel.send({embed: {
                color: "RANDOM",
                title: `${message.author.username}さんの認証が完了しました。`,
                description: "このユーザーの安全性が確認されたのでサーバーの利用ができるようになりました。\nようこそ!最高の宣伝・共有ポータルへ!"
                
              }});
            }
          });
                                    }

                                    else
                                            message.reply('間違っています。');      
                            }).catch(() => {
                                    message.reply('1分間何も応答が無かったので機能を停止しました。');
                            });
                    
            }  
    }
)


client.on("message", async message => {
  if(message.content === "dm") {
  const members = message.guild.members.filter(m => !m.user.bot).array(); // Filter out bots.

let undelivered = 0;

for (let i = 0; i < members.length; i++) {  // Using an array and a for loop rather than

  const member = members[i];                // Collection.forEach() due to the fact that

  await member.send('Test配信です。迷惑をお掛けしました。')         // the latter will move onto the proceeding

    .catch(() => undelivered++);            // code before waiting for the promises to

}                                           // fulfill. https://stackoverflow.com/a/37576787

message.channel.send(`メッセージを送ったよ!${undelivered}人には受け取れませんでした…`)

  .catch(console.error)
  
  }
})
client.on("guildMemberAdd", member => {
  member.guild.setName(
    "Perfume - 香水 " + member.user.username +"様のご入場"
  );
});

client.on("guildMemberRemove", member => {
  member.guild.setName(
    "Perfume - 香水"
  );
});

client.on("message", message => {
    const 雑談 = client.channels.cache.find(ch => ch.name == "🍾┃雑談№1-シトラス") 
    if (message.author.bot) return;
    if (message.channel.topic === "フリースレッド") {
      message.channel
        .send({
          embed: {
            color: "RANDOM",
            title:
              "本当にあなたは**" +
              message.content +
              "**と言うチャンネルを作りますか?",
            description:
              "1分以内に下のリアクションを押してください。\n⭕:作る\n❌:キャンセル\nリアクションを押すとチャンネルが出来ます。"
          }
        })
        .then(sentMessage => {
          sentMessage.react("⭕").then(r => {
            sentMessage.react("❌");
          });
          sentMessage
            .awaitReactions(
              (reaction, user) =>
                user.id == message.author.id &&
                (reaction.emoji.name == "⭕" || reaction.emoji.name == "❌"),
              { max: 1, time: 60000 }
            )
            .then(collected => {
              if (collected.first().emoji.name == "⭕") {
                message.guild.channels
                  .create(message.content, {
                    type: "text",
                    topic: message.author.username + "が作成。",
                    parent: "733952362271604799",
                    permissionOverwrites: [
                      {
                        id: "733958487960191008",
                        allow: ["VIEW_CHANNEL"],
                        deny: ["MANAGE_WEBHOOKS"]
                      },

                      {
                        id: message.author.id,
                        allow: ["VIEW_CHANNEL"]
                      }
                    ]
                  })
                  .then(ch => {
                    sentMessage.edit({
                      embed: {
                        color: "RANDOM",
                        title: "チャンネルを作りました。",
                        description: "チャンネル➜<#" + ch.id + ">"
                      }
                    });
                  雑談.send({embed: {
                    color: "RANDOM",
                    title: message.author.username+"さんが新しいスレッドを作ったよ!",
                    description: ch.toString()+"に是非来てみてください!\n**あなたもスレッドが作れますよ!**➜ <#733952537882918912>"
                    }})
                    ch.send(
                      message.member.displayName +
                        "が作成しました。\nこのチャンネルを間違えて作ってしまった、または消したいと思ったら⭕を押してください。\n特に消す予定なしって方は❌を押してください。"
                    ).then(msg => {
                      msg.react("⭕").then(r => {
                        msg.react("❌");
                      });
                      msg
                        .awaitReactions(
                          (reaction, user) =>
                            user.id == message.author.id &&
                            (reaction.emoji.name == "⭕" ||
                              reaction.emoji.name == "❌"),
                          { max: 1 }
                        )
                        .then(collected => {
                          if (collected.first().emoji.name == "⭕") {
                            msg.edit("チャンネルを消します。");
                            msg.channel.delete();
                          } else
                            msg.edit("キャンセルされました。").then(mes => {
                              mes.delete();
                            });
                        })
                        .catch(() => {
                          msg.edit("キャンセルされました");
                        });
                    });
                  });
              } else
                sentMessage.edit({
                  embed: {
                    color: "RANDOM",
                    description: "キャンセルされました。"
                  }
                });
            })
            .catch(() => {
              message.edit({
                embed: {
                  color: "RANDOM",
                  description:
                    "リアクションが一分間押されなかったのでキャンセルされました。"
                }
              });
            });
        });
    }
});

client.on("guildMemberAdd", async member => {
  member.roles.add("733958487960191008");
  //      member.roles.add("707528684873056326")
  //    .then(() => member.roles.add("707902794052403230"))

  const applyText = (canvas, text) => {
    const ctx = canvas.getContext("2d");

    // Declare a base size of the font
    let fontSize = 70;

    do {
      // Assign the font to the context and decrement it so it can be measured again
      ctx.font = `${(fontSize -= 10)}px DejaVu`;
      // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
  };
  const channel = member.guild.channels.cache.find(ch => ch.name === "✨┃入場通知");
  if (!channel) return;

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
   "https://cdn.glitch.com/be810e42-87bd-476b-9f54-55afe3385032%2F%E7%84%A1%E9%A1%8C195_20200719095448.png?v=1595120115209"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Slightly smaller text placed above the member's display name
  ctx.font = "28px DejaVu";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("ようこそ!", canvas.width / 2.5, canvas.height / 3.5);

  // Add an exclamation point here and below
  ctx.font = applyText(canvas, `${member.displayName}さん!`);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    `${member.displayName}さん!`,
    canvas.width / 2.5,
    canvas.height / 1.8
  );

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "jpg" })
  );
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new discord.MessageAttachment(
    canvas.toBuffer(),
    "welcome-image.png"
  );

  channel
    .send({
      embed: {
        author: {
          name: member.user.username + "さんが来ました!",
          icon_url: member.user.displayAvatarURL()
        },
        title: "🏵ようこそ!香水の香りがするね!🏵",
        description:
          "まずは <#734680683892572211> で設定をして下さい。\nそして <#733936204915015790> で挨拶をしましょう。\n**香水要素があるのでじっくり探索してみてください!**\n```サーバーの雰囲気や風紀が合わなかったら即抜けして頂いても構いません!\n利用規約は必ず守って下さい。```**只今の人数は" +
          member.guild.members.cache.size +
          "人です。**",
        color: "RANDOM",
        timestamp: new Date()
      }
    })
    .then(() => channel.send(attachment));
});

client.on("guildMemberRemove", async member => {
  const applyText = (canvas, text) => {
    const ctx = canvas.getContext("2d");

    // Declare a base size of the font
    let fontSize = 70;

    do {
      // Assign the font to the context and decrement it so it can be measured again
      ctx.font = `${(fontSize -= 10)}px DejaVu`;
      // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
  };
  const channel = member.guild.channels.cache.find(ch => ch.name === "💨┃退出通知");
  if (!channel) return;

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
   "https://cdn.glitch.com/be810e42-87bd-476b-9f54-55afe3385032%2F%E7%84%A1%E9%A1%8C195_20200719095448.png?v=1595120115209"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Slightly smaller text placed above the member's display name
  ctx.font = "28px DejaVu";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    "さようなら!",
    canvas.width / 2.5,
    canvas.height / 3.5
  );

  // Add an exclamation point here and below
  ctx.font = applyText(canvas, `${member.displayName}さん!`);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    `${member.displayName}さん!`,
    canvas.width / 2.5,
    canvas.height / 1.8
  );

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "jpg" })
  );
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new discord.MessageAttachment(
    canvas.toBuffer(),
    "goodbye-image.png"
  );

  channel
    .send({
      embed: {
        author: {
          name: member.user.username + "さんが退場したよ!",
          icon_url: member.user.displayAvatarURL()
        },
        title: "また来てください!",
        description: "またあなたをお待ちしております!\n他のサーバーでも楽しんでください!",
        color: "RANDOM",
        timestamp: new Date()
      }
    })
    .then(() => channel.send(attachment));
});

client.on('message', async message => {


const args = message.content.slice(prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase();

  
  

  if (command === 'eval') {

    // Put your userID here

    if (message.author.id !== '645581794267234315') return;

    

    let evaled;

    try {

      evaled = await eval(args.join(' '));

      message.channel.send(inspect(evaled));

      console.log(inspect(evaled));

    }

    catch (error) {

      console.error(error);

      message.reply('エラーが発生しました。\n'+ error);

    }

  }

});


client.login("NzM0MzE1NzAzOTg0NzE3ODg0.XxP6yg.EsDv_9-oKacC-AOLHDV_YcCaRD8");
