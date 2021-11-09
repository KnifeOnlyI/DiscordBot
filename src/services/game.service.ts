import * as fs from 'fs';

import {GameModel} from '../models/game/game.model';
import {FetchService} from './fetch.service';
import {GameNewsModel} from '../models/game/game-news.model';
import {gamesDataFile} from '../../config/config.json';
import {GameDataModel} from '../models/game-data/game-data.model';

/**
 * Represent a game service
 *
 * @author Dany Pignoux (dany.pignoux@outlook.fr)
 */
export class GameService {
  /**
   * Get a game with the specified ID (in steam library)
   *
   * @param id The ID of the game to get
   *
   * @return The game data, null if not found
   */
  public static async getSteamGameById(id: number): Promise<GameModel | null> {
    let game: GameModel | null = null;

    const gameData = (await FetchService.json(`https://store.steampowered.com/api/appdetails?appids=${id}`))[id];

    if (gameData && gameData && gameData.success && gameData.data) {
      game = new GameModel(id, gameData.data.name);

      const newsData = await FetchService.json(`https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002?appid=${id}&maxLength=0`);

      if (newsData && newsData.appnews) {
        // Sort descending by date (the most recent first)
        newsData.appnews.newsitems.sort((a: any, b: any) => {
          return b.date - a.date;
        }).forEach((news: any) => {
          game?.news.push(new GameNewsModel(
            news.gid,
            news.author,
            news.title,
            news.contents,
            new Date(news.date * 1000),
            news.url.replace(new RegExp(' ', 'g'), '%20')
          ));
        });
      }
    }

    return game;
  }

  /**
   * Get the data in the specified games data file (create it if not existing yet)
   *
   * @param path The games data file path
   *
   * @return The games data file content
   */
  public static getGamesDataFile(path: string): GameDataModel {
    let data = new GameDataModel();

    try {
      const tmpData = JSON.parse(fs.readFileSync(gamesDataFile) as any);

      tmpData.games.steamGames.forEach((game: any) => data.list.push({
        gameId: game.gameId,
        lastVersion: game.lastVersion
      }));
    } catch (e) {
      fs.openSync(gamesDataFile, 'w');

      this.updateGamesDataFile(path, data);
    }

    return data;
  }

  /**
   * Update the games data file
   *
   * @param path The games data file path
   * @param data The data to write (replace all existing data in the file)
   */
  public static updateGamesDataFile(path: string, data: GameDataModel): void {
    const dataToWrite = {
      games: {
        steamGames: data.list
      }
    };

    fs.writeFileSync(path, JSON.stringify(dataToWrite));
  }
}
