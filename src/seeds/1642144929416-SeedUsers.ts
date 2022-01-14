import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1642144929416 implements MigrationInterface {
  name = 'SeedUsers1642144929416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`insert into users (username, email, password, name, surname, phone)
                             VALUES ('ayurash', 'ayurash@mail.com',
                                     '$2b$05$.n0dlbc/2hTqvms3w0BrhOGHBhbODToKeUolVwWFXSY7UVy/jEW2q',
                                     'Алексей', 'Юраш', '9998887766'),
                                    ('vaverin', 'vaverin@mail.com',
                                     '$2b$05$.n0dlbc/2hTqvms3w0BrhOGHBhbODToKeUolVwWFXSY7UVy/jEW2q',
                                     'Валерий', 'Аверин', '9998887766'),
                                    ('ntarasov', 'ntarasov@mail.com',
                                     '$2b$05$.n0dlbc/2hTqvms3w0BrhOGHBhbODToKeUolVwWFXSY7UVy/jEW2q',
                                     'Николай', 'Тарасов', '9998887766')
    `);
  }

  async down(): Promise<any> {}
}
