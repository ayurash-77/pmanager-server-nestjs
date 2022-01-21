import { Project } from '@app/projects/project.entity';

export interface RemoveProjectResponseInterface {
  project: Project;
  message: string;
}
