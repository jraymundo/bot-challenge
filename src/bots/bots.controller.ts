import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { BotsService } from './bots.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { Bot } from './entities/bot.entity';

@Controller('v1/bots')
export class BotsController {
  constructor(private readonly botsService: BotsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Request() req, @Body() inputs: CreateBotDto) {
    return await this.botsService.create(req.loggedInId, inputs);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateBotDto: UpdateBotDto,
  ) {
    return this.botsService.update(id, req.loggedInId, updateBotDto);
  }

  @Get()
  findAll(@Request() req): Promise<Bot[]> {
    return this.botsService.findAll(req.loggedInId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    return this.botsService.findOne(id, req.loggedInId);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: number) {
    return this.botsService.delete(id, req.loggedInId);
  }
}
