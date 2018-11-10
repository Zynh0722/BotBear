// Import the discord.js module
const Discord = require('discord.js');
const js = require('jsonfile');
const fs = require('fs');

const auth = require('./auth.json');
const roles = require('./roles.json');

// Create an instance of a Discord client
const client = new Discord.Client();



/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
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
          default:
            message.channel.send('Invalid game: ' + args[1]);
            message.delete();
        }
        break;
      case 'help':
        switch (args[1]) {
          case 'call':
            message.channel.send('```\nCommand: call <game>\n\ncall r6 - Mentions the server to play R6S\ncall 76 - Mentions the server to play Fallout 76\n```');
            message.delete();
            break;

          default:
            message.channel.send('```\nPrefix: !\nUse !help <command> to learn more about a command\n\nCommands:\n\tcall <game>\n```');
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

      case 'poll':
        if (message.member.roles.has(roles.grizzlyBear)) {
          var poll = {
            question: args[1],
            timeout: 3600000, //1 hour
            answers: [],
            fillAnswers: function () {
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



      /*
      case 'gulag':

        var user = {
          nickname: message.member.displayName,
          roles: message.member.roles.array()
        }
        user.roles.shift(); //Removes @everyone

        var userString = JSON.stringify(user);
        fs.writeFile(`${message.author}.json`, userString, 'utf8', function(err) {
          if (err) throw err;
          console.log('complete');
        });

        console.log(`User Nick: ${user.nickname}\nUser Roles: ${user.roles}\n`);
        message.delete();

        message.member.setNickname(`GulagDetainee#${Math.floor((Math.random() * 9999) + 1)}`);

        setTimeout(function() {

          message.member.setNickname(user.nickname);

        }, 10000);

        break;
        */
    }

    /*
      var Attachment = message.attachments.array();
      const channel = member.guild.channels.find(ch => ch.name === 'images');
        Attachment.forEach(function (attachment){

          console.log(message.attachments[attachment].url);

        })
    */

  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(auth.token);
