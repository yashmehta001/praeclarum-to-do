import { IsBoolean, IsString, MaxLength } from 'class-validator';

export class ReqCreateTask {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsBoolean()
  status: boolean;
}
