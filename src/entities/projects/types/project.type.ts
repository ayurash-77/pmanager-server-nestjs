import { Project } from '@app/entities/projects/project.entity';

export type ProjectType = Omit<Project, 'setHomeDir'>;
