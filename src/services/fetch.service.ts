const fetch = require('node-fetch');

/**
 * Represent a service to fetch web data
 *
 * @author Dany Pignoux (dany.pignoux@outlook.fr)
 */
export class FetchService {
  /**
   * Get a JSON content from the specified URL
   *
   * @param url The URL
   *
   * @return The JSON content
   */
  static async json(url: string): Promise<any> {
    return await fetch(url)
      .then((r: any) => r.json())
      .catch(() => {
        return null;
      });
  }
}
