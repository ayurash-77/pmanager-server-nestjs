import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddJobDto {
  @ApiProperty({ example: '2', description: 'id роли' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly roleId: number;

  @ApiProperty({ example: '16', description: 'id типа работ' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly jobId: number;
}
