import { Bot } from './entities/bot.entity';
import { BotRepository } from './bot.repository';
import { CreateBotDto } from './dto/create-bot.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBotDto } from './dto/update-bot.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BotsService {
  constructor(
    @InjectRepository(BotRepository)
    private botRepository: BotRepository,
  ) {}

  /**
   * Create a new user bot
   *
   * @param {number} userId
   * @param {object} input
   * @return Bot
   */
  async create(userId: number, input: CreateBotDto): Promise<Bot> {
    const payload = {
      ...{ user_id: userId, avatar: this._generateAvatar() },
      ...input,
    };
    return this.botRepository.save(payload);
  }

  /**
   * Updates a bot of the user
   *
   * @param {number} id
   * @param {number} userId
   * @param {UpdateBotDto} input
   * @throws NotFoundException
   *
   * @return Bot
   */
  async update(
    id: number,
    userId: number,
    input: UpdateBotDto,
  ): Promise<Bot | NotFoundException> {
    const bot = await this.findOne(id, userId);
    return await this.botRepository.save(Object.assign(bot, input));
  }

  /**
   * Find all bots that belong to the user
   *
   * @param {number} id
   * @return []
   */
  async findAll(id: number): Promise<Bot[]> {
    return await this.botRepository.findAllByUser(id);
  }

  /**
   * Find a bot that belongs to the user
   *
   * @param {number} id
   * @param {number} userId
   * @return Bot
   * @throws NotFoundException
   */
  async findOne(id: number, userId: number): Promise<Bot | NotFoundException> {
    const bot = await this.botRepository.findByUser(id, userId);

    if (bot instanceof Bot) {
      return bot;
    }

    throw new NotFoundException('Bot does not exist');
  }

  /**
   * Delete a bot of the user
   *
   * @param {number} id
   * @param {number} userId
   */
  async delete(id: number, userId: number) {
    await this.findOne(id, userId);
    await this.botRepository.delete(id);
  }

  /**
   * Avatar Generator
   *
   * @private
   * @return string
   */
  _generateAvatar(): string {
    return `https://avatars.dicebear.com/api/bottts/${uuidv4()}.svg`;
  }
}
