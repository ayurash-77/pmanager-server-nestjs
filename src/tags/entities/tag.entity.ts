import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tags' })
export class Tag {
  @ApiProperty({ example: 1, description: 'Уникальный ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Overview', description: 'Имя тега' })
  @Column()
  name: string;

  @AfterInsert()
  logInsert() {
    console.log(`Добавлен тег "${this.name}"`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Обновлен тег "${this.name}"`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Удален тег "${this.name}"`);
  }
}
