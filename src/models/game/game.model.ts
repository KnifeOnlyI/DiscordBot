import {GameNewsModel} from './game-news.model';

/**
 * Represent a game
 *
 * @author Dany Pignoux (dany.pignoux@outlook.fr)
 */
export class GameModel {
  /**
   * Create a new game data
   *
   * @param id The game ID
   * @param news The news list
   */
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly news = new Array<GameNewsModel>()
  ) {
  }
}
