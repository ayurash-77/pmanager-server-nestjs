import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJobs1642144929414 implements MigrationInterface {
  name = 'SeedJobs1642144929414';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`insert into jobs (name, details)
                             VALUES ('Editing', 'Монтаж'),
                                    ('ColorCorrection', 'Цветокоррекция'),
                                    ('2d VFX', '2d - эффекты'),
                                    ('2d Compose', '2d композ'),
                                    ('2d Tracking', '2d трекинг'),
                                    ('3d VFX', '3d - эффекты'),
                                    ('3d Tracking', '3d трекинг камеры, сцены'),
                                    ('Keying', 'Кеинг'),
                                    ('Rotoscoping', 'Ротоскоп (ручное маскирование объектов)'),
                                    ('Cleanup', 'Клинап'),
                                    ('3d Modeling', '3d моделирование'),
                                    ('Texturing', 'Текстуринг'),
                                    ('Shading', 'Шейдинг'),
                                    ('Animation', 'Анимация'),
                                    ('Rendering', 'Рендеринг'),
                                    ('Project Organization', 'Организация проекта'),
                                    ('Project Management', 'Ведение проекта'),
                                    ('Creative', 'Креатив'),
                                    ('Sound Design', 'Sound Design')
    `);
  }

  async down(): Promise<any> {}
}
