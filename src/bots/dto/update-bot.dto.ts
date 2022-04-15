import { IsNotEmpty, Length } from 'class-validator';

export class UpdateBotDto {
  @IsNotEmpty({ message: 'Bot should have a name' })
  name: string;

  @IsNotEmpty({ message: 'Bot should have a purpose' })
  @Length(5, 200)
  purpose: string;
}
