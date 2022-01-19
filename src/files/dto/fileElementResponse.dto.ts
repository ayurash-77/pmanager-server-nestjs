import { ApiProperty } from '@nestjs/swagger';

export class FileElementResponseDto {
  @ApiProperty({ example: '2022.01.19/Brief_Теле2_CG.pdf', description: 'Url доступа к файлу' })
  url: string;
  @ApiProperty({ example: 'Brief_Теле2_CG.pdf', description: 'Имя файла' })
  name: string;
  @ApiProperty({ example: 'brief', description: 'Категория файла' })
  category: string;
}
