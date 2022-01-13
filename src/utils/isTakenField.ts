import { UpdateTagDto } from '@app/tags/dto/update-tag.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

// Проверка на совпадающие поля
export const IsTakenField = async (
  repo: Repository<any>,
  key: string,
  dto: UpdateTagDto,
  name: string,
  id?: number,
): Promise<boolean> => {
  const candidate = await repo.findOne({ [key]: dto[key] });

  if (candidate && candidate.id == id) return false;
  if (candidate) {
    throw new HttpException(`${name} ${key}: '${dto[key]}' уже существует`, HttpStatus.UNPROCESSABLE_ENTITY);
  }
  return false;
};
