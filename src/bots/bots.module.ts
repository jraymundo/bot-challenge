import { BotsService } from './bots.service';
import { BotsController } from './bots.controller';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotRepository } from './bot.repository';
import { AuthMiddleware } from '../auth/auth.middleware';
import { UserRepository } from '../users/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BotRepository, UserRepository])],
  controllers: [BotsController],
  providers: [BotsService],
})
export class BotsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(BotsController);
  }
}
