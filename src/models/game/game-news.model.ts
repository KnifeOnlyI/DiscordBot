/**
 * Represent a news for a game
 *
 * @author Dany Pignoux (dany.pignoux@outlook.fr)
 */
export class GameNewsModel {
  /**
   * Create a new game news item
   *
   * @param id The ID
   * @param author The author
   * @param title Tht title
   * @param contents The contents
   * @param date The release date
   * @param url The URL
   */
  constructor(
    public readonly id?: number,
    public readonly author?: string,
    public readonly title?: string,
    public readonly contents?: string,
    public readonly date?: Date,
    public readonly url?: string
  ) {
  }
}
