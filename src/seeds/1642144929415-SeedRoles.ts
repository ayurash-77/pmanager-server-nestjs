import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRoles1642144929412 implements MigrationInterface {
  name = 'SeedRoles1642144929412';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`insert into roles (name, details)
                             VALUES ('Admin', 'Администратор'),
                                    ('Producer', 'Продюсер проектов'),
                                    ('Director', 'Режиссер'),
                                    ('Art director', 'Арт директор'),
                                    ('Manager', 'Менеджер проектов'),
                                    ('Color grader', 'Специалист по цветокоррекции'),
                                    ('Editor', 'Монтажер'),
                                    ('2d artist', 'Специалист 2d графики'),
                                    ('3d artist', 'Специалист 3d графики'),
                                    ('Animator', 'Специались по анимации'),
                                    ('3d modeler', '3d Моделер'),
                                    ('CG generalist', 'CG Generalist'),
                                    ('Sound producer', 'Звукорежиссер'),
                                    ('Guest', 'Гостьg')
    `);
  }

  async down(): Promise<any> {}
}
