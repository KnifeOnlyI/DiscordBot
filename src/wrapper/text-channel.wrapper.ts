import {TextChannel} from 'discord.js';

/**
 * Represent a text channel
 *
 * @author Dany Pignoux (dany.pignoux@outlook.fr)
 */
export class TextChannelWrapper {
  /**
   * Create a new text channel wrapper
   *
   * @param _handleChannel The handle text channel
   */
  constructor(private _handleChannel: TextChannel | undefined) {
  }

  /**
   * Get the channel ID
   *
   * @return The channel ID
   */
  getId(): string | undefined {
    return this._handleChannel?.id;
  }

  /**
   * Send the specified message
   *
   * @param message The message to send
   */
  async sendMessage(message: string | undefined): Promise<void> {
    this._handleChannel?.bulkDelete

    if (this._handleChannel && message) {
      await this._handleChannel.send(message);
    }
  }
}
