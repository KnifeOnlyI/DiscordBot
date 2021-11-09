import {Client, Intents} from 'discord.js';
import {channels, steamGames} from '../config/config.json';
import {ChannelService} from './services/channel.service';
import {TextChannelWrapper} from './wrapper/text-channel.wrapper';
import {GameService} from './services/game.service';
import {DateService} from './services/date.service';

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ]
});

let generalChannel: TextChannelWrapper;
let updatesChannel: TextChannelWrapper;

client.on('ready', () => {
  generalChannel = ChannelService.getTextChannelByName(client, channels.general.name);
  updatesChannel = ChannelService.getTextChannelByName(client, channels.updates.name);
});

client.on('messageCreate', async (message) => {
  if (message.content.toLowerCase() === 'updates' && message.channel.id === updatesChannel.getId()) {
    steamGames.forEach(id => {
      GameService.getSteamGameById(id).then((game) => {
        if (game?.news[0].date) {
          updatesChannel.sendMessage(
            `**[${DateService.ddmmYYYY(game?.news[0].date)}] - ${game?.name}** :\n${game?.news[0].contents}`
          );
        }
      });
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
