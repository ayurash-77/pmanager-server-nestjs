import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedTags1642144929412 implements MigrationInterface {
  name = 'SeedTags1642144929412';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`insert into tags (name)
                             VALUES ('Reel'),
                                    ('Sequence'),
                                    ('Shot'),
                                    ('Overview'),
                                    ('Task')
    `);
  }

  async down(): Promise<any> {}
}
