import { Project } from '@app/entities/projects/project.entity';

export interface RemoveProjectResponseInterface {
  project: Project;
  message: string;
}
