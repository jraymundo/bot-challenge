import { EntityRepository, Repository } from 'typeorm';
import { Bot } from './entities/bot.entity';

@EntityRepository(Bot)
export class BotRepository extends Repository<Bot> {
  /**
   * Get all bots by user id
   *
   * @param {number} userId
   */
  findAllByUser(userId: number): Promise<Bot[]> {
    return this.find({
      select: ['id', 'name', 'purpose', 'avatar'],
      where: { user_id: userId },
    });
  }

  /**
   * Get a bot by user id
   *
   * @param {number} botId
   * @param {number} userId
   */
  findByUser(botId: number, userId: number): Promise<Bot> {
    return this.findOne({
      select: ['id', 'name', 'purpose', 'avatar'],
      where: { user_id: userId, id: botId },
    });
  }
}
