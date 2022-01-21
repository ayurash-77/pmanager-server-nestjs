import { Project } from '@app/projects/project.entity';

export type ProjectType = Omit<Project, 'setHomeDir'>;
