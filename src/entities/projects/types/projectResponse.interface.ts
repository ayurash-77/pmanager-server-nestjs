import { ProjectType } from '@app/entities/projects/types/project.type';

export interface ProjectResponseInterface extends Omit<ProjectType, 'owner'> {
  owner: {
    id: number;
    username: string;
    email: string;
    name: string;
    surname: string;
    phone: string;
    image: string;
  };
}
