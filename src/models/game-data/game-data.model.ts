/**
 * Represent a game data model (for news versionning)
 *
 * @author Dany Pignoux (dany.pignoux@outlook.fr)
 */
export class GameDataModel {
  /**
   * Create a new game data model
   *
   * @param list The initial data
   */
  constructor(public readonly list = new Array<{ gameId: number, lastVersion: string }>()) {
  }

  /**
   * Update the last news version if needed
   *
   * @param gameId The game id
   * @param lastVersion The new last news version
   *
   * @return TRUE if the last news version has been updated, FALSE otherwise
   */
  updateLastNews(gameId: number, lastVersion: string): boolean {
    let updated = false;

    const game = this.list.find(g => g.gameId === gameId);

    if (!game) {
      this.list.push({gameId: gameId, lastVersion: lastVersion});

      updated = true;
    } else if (game.lastVersion !== lastVersion) {
      game.lastVersion = lastVersion;

      updated = true;
    }

    return updated;
  }
}
