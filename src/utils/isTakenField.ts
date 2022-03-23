import { UpdateTagDto } from '@app/entities/tags/dto/update-tag.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateProjectDto } from '@app/entities/projects/dto/update-project.dto';
import { UpdateShotDto } from '@app/entities/shots/dto/update-shot.dto';

// Проверка на совпадающие поля
export const IsTakenField = async (
  repo: Repository<any>,
  key: string,
  value: string | number,
  name: string,
  id?: number,
): Promise<boolean> => {
  const candidate = await repo.findOne({ [key]: value });

  if (candidate && candidate.id == id) return false;
  if (candidate) {
    throw new HttpException(`${name} ${key}: '${value}' уже существует`, HttpStatus.UNPROCESSABLE_ENTITY);
  }
  return false;
};
