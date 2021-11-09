import {GameModel} from '../models/game/game.model';
import {FetchService} from './fetch.service';
import {GameNewsModel} from '../models/game/game-news.model';

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

      const newsData = await FetchService.json(`https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002?appid=${id}`);

      if (newsData && newsData.appnews) {
        newsData.appnews.newsitems.forEach((news: any) => {
          game?.news.push(new GameNewsModel(
            news.author,
            news.title,
            news.contents,
            new Date(news.date * 1000),
            news.url
          ));
        });
      }
    }

    return game;
  }
}
