// Import the discord.js module
const Discord = require('discord.js');
const fs = require('fs');

const auth = require('./auth.json');
const roles = require('./roles.json');

// Create an instance of a Discord client
const client = new Discord.Client();

const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

client.on("guildMemberAdd", (member) => {
  member.addRole(roles.cub);
  member.setNickname(member.displayName + '.Bear');
});

// Create an event listener for messages
client.on('message', message => {
  if (message.content.substring(0, 1) == '!') {
    var args = message.content.substring(1).split(' ');
    var cmd = args[0].toLowerCase();

    switch (cmd) {
      case 'call':
        switch (args[1]) {
          case 'r6':
            message.channel.send('@everyone ' + message.author + ' wants to play Rainbow Six');
            message.delete();
            break;
          case '76':
            message.channel.send('@everyone ' + message.author + ' wants to play Fallout 76');
            message.delete();
            break;
          case 'wow':
            message.channel.send(`  <@&${roles.wowNerd}> `  + message.author + ' wants to play World of Warcraft');
            message.delete();
            break;
          default:
            message.channel.send('Invalid game: ' + args[1]);
            message.delete();
        }
        break;

      case 'help':
        switch (args[1]) {
          case 'call':
            message.channel.send({ embed: {
              title: "Call Command:",
              color: 16766745,
              footer: {
                icon_url: client.user.avatarURL,
                text: "Use !help <command> learn about a command"
              },
              author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
              },
              fields: [
                {
                  name: "!call r6",
                  value: " - Calls users to Rainbow Six: Siege"
                },
                {
                  name: "!call 76",
                  value: " - Calls users to Fallout 76"
                },
                {
                  name: "!call wow",
                  value: " - Calls wow nerds to World of Warcraft"
                }
              ],
              timestamp: new Date()
              }});
            message.delete();
            break;

            case 'roulette':
              message.channel.send({ embed: {
                title: "Roulette Command:",
                color: 16766745,
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "Use !help <command> learn about a command"
                },
                author: {
                  name: client.user.username,
                  icon_url: client.user.avatarURL
                },
                fields: [
                  {
                    name: "!roulette",
                    value: " - Test your luck and pull the trigger (game)"
                  }
              ],
              timestamp: new Date()
              }});
              message.delete();
              break;

          case 'gulag':
            message.channel.send({ embed: {
              title: "Gulag Command:",
              color: 16766745,
              footer: {
                icon_url: client.user.avatarURL,
                text: "Use !help <command> learn about a command"
              },
              author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
              },
              fields: [
                {
                  name: "!gulag <@user>",
                  value: " - Removes and stores a users roles, and nickname, as well as applying 'gulag-ed' rank (Admin Only)"
                }
            ],
            timestamp: new Date()
            }});
            message.delete();
          break;

          case 'pardon':
            message.channel.send({ embed: {
              title: "Pardon Command:",
              color: 16766745,
              footer: {
                icon_url: client.user.avatarURL,
                text: "Use !help <command> learn about a command"
              },
              author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
              },
              fields: [
                {
                  name: "!pardon <@user>",
                  value: " - Restores a 'gulag-ed' users roles and nickname (Admin Only)"
                }
            ],
            timestamp: new Date()
            }});
            message.delete();
          break;

          default:
            message.channel.send({ embed: {
              title: "Bot.Bear Commands:",
              color: 16766745,
              footer: {
                icon_url: client.user.avatarURL,
                text: "Use !help <command> learn about a command"
              },
              author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
              },
              fields: [
                {
                  name: "!call <game>",
                  value: " - Mentions the server to play a game and tags you"
                },
                {
                  name: "!roulette",
                  value: " - Try your luck"
                },
                {
                  name: "!gulag <@user>",
                  value: " - Lazy ban (Admin Only)"
                },
                {
                  name: "!pardon <@user>",
                  value: " - Returns a gulaged user to their former glory (Admin Only)"
                }
              ],
              timestamp: new Date()
              }});
            message.delete();

        }
        break;

      case 'roulette':
        message.delete();
        var bullet = Math.floor((Math.random() * 24) + 1);

        message.channel.send(`${message.author} picks up the revolver and spins the cylinder.`);

        setTimeout(function() {
          if (message.member.roles.has(roles.grizzlyBear)) {
            if (bullet == 1) {
              message.channel.send('**BANG!!!**');
              message.member.setMute(true, 'You tested your luck');
              console.log(`Muted ${message.member.displayName}`);

            } else {
              message.channel.send('*click*');

              setTimeout(function() {
                message.channel.send('You live to try again.');
              }, 2000);
            }

          } else {

            if (bullet <= 12) {
              message.channel.send('**BANG!!!**');
              message.member.setMute(true, 'You tested your luck');
              console.log(`Muted ${message.member.displayName}`);

            } else {
              message.channel.send('*click*');

              setTimeout(function() {
                message.channel.send('You live to try again.');
              }, 2000);

            }
          }
        }, 2000);

        break;

      /*                // Saving for future poll development
      case 'poll':
        if (message.member.roles.has(roles.grizzlyBear)) {
          var poll = {
            question: args[1],
            timeout: 3600000, //1 hour
            answers: [],
            fillAnswers: function() {
              for (var i = 2; i < args.length; i++) {
                this.answers.push(args[i]);
              }
            }
          }

          poll.fillAnswers();

          var pollOut = `${poll.question}\n\n`;

          for (var i = 0; i < poll.answers.length; i++) {
            pollOut += `\t${poll.answers[i]}\n`;
          }

          message.channel.send(pollOut);

          message.delete();
        }

        break;
      */

      case 'gulag':

        if (message.member.roles.has(roles.grizzlyBear)) {
          gulag(memberParse(args[1], message.guild));
        } else {
          gulag(message.member, message.guild);
        }
        break;

      case 'pardon':
        if (message.member.roles.has(roles.grizzlyBear)) {
          ungulag(memberParse(args[1], message.guild));
        }
        break;

  }
}
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(auth.token);

function gulag(user, guild) {

  var simpleUser = {
    filename: user.id + '.json',
    nickname: user.displayName,
    role: user.roles.array()
  }
  simpleUser.role.shift(); //Removes @everyone

  var userString = JSON.stringify(simpleUser, null, 1);

  fs.writeFile(`${__dirname}/gulagDetainees/${user.id}.json`, userString, function(err) {
    if (err) throw err;
    console.log(`${simpleUser.nickname} gulag file created.`);
  });

  console.log(`User Nick: ${simpleUser.nickname}\nUser Roles: ${simpleUser.role}\n`);



  asyncForEach(simpleUser.role, async (role) => {
    await waitFor(50);
    user.removeRole(role.id);
  })

  user.setNickname(`GulagDetainee#${Math.floor((Math.random() * 9999) + 1)}`);
  user.addRole(roles.gulag);



}

function ungulag(user) {


  var dataRaw = fs.readFileSync(`${__dirname}/gulagDetainees/${user.id}.json`)
  var simpleUser = JSON.parse(dataRaw);



  asyncForEach(simpleUser.role, async (role) => {
    await waitFor(50);
    user.addRole(role.id);
  });

  user.setNickname(simpleUser.nickname);
  user.removeRole(roles.gulag);

}

function idParse(id) {

  return id.substring(id.indexOf('!') + 1, id.indexOf('>'));

}

function memberParse(id, guild) {

  return guild.members.get(idParse(id));

}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
