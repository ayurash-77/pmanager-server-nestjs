import { Project } from '@app/projects/entities/project.entity';

export interface RemoveProjectResponseInterface {
  project: Project;
  message: string;
}
