import Technology from '@/models/TechnologyModel';
import ProjectField from './ProjectFieldModel';

interface MediaFile {
    file: string;
}

export default interface Project {
    id: number;
    name: string;
    description: string;
    year_of_realization: number;
    purpose: string;
    time_invested: string;
    project_link: string;
    github_link: string;
    media_files: MediaFile[];
    technologies: Technology[];
    tech_fields: ProjectField[];
}
