import {Client, TextChannel} from 'discord.js';
import {TextChannelWrapper} from '../wrapper/text-channel.wrapper';

/**
 * Represent a service to manage channels
 *
 * @author Dany Pignoux (dany.pignoux@outlook.fr)
 */
export class ChannelService {
  /**
   * Get a channel identified by the specified name in the specified client
   *
   * @param client The client where to get the channel
   * @param name The channel name to search
   */
  static getTextChannelByName(client: Client, name: string): TextChannelWrapper {
    return new TextChannelWrapper(
      client.channels.cache.find((channel: any) => channel.name === name) as TextChannel | undefined
    );
  }
}
