import {Client, Intents} from 'discord.js';
import {channels, gamesDataFile, steamGames, updateFrequency} from '../config/config.json';
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
let newsChannel: TextChannelWrapper;
let timer: NodeJS.Timer;

client.on('ready', async () => {
  generalChannel = ChannelService.getTextChannelByName(client, channels.general.name);
  newsChannel = ChannelService.getTextChannelByName(client, channels.news.name);

  // The update frequency is in minutes
  timer = setInterval(() => updateNewsData(), updateFrequency * 60000);

  updateNewsData(false);
});

/**
 * Update all the news data
 */
function updateNewsData(sendDataToDiscord = true): void {
  const data = GameService.getGamesDataFile(gamesDataFile);

  steamGames.forEach(id => {
    GameService.getSteamGameById(id).then(async game => {
      if (
        game &&
        game.id &&
        game.news.length > 0 &&
        !!game.news[0].id &&
        data.updateLastNews(game.id, game.news[0].id.toString())
      ) {
        if (sendDataToDiscord) {
          await newsChannel.sendMessage(
            `**[${DateService.ddmmYYYY(game.news[0].date)}] - ${game?.name}** :\n${game.news[0].url}`
          );
        }

        GameService.updateGamesDataFile(gamesDataFile, data);
      }
    });
  });
}

client.login(process.env.DISCORD_TOKEN);
