import { Project } from '@app/projects/entities/project.entity';

export type ProjectType = Omit<Project, 'setHomeDir'>;
