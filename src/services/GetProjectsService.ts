import axios from 'axios';

import Project from '@/models/ProjectModel';
import Service from './Service';

export default class GetProjectsService extends Service {
    private apiEndpoint: string = '/projects';

    constructor() {
        super();
    }

    /**
     * Get pinned projects from API and fullfill projectsToShowIds with the projects ids
     * @returns Project[] | null
     */
    public async getPinnedProjectsFromAPI(): Promise<Project[]> {
        const URL = this.apiUrl + this.apiEndpoint + '-pinned';
        try {
            const { data, status } = await axios.get<Project[]>(
                URL,
                this.headers
            );

            if (status !== 200) {
                throw new Error('Error getting pinned projects');
            }

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
            } else {
                console.log('unexpected error: ', error);
            }
        }
        return [];
    }

    /**
     * Get projects from API and fullfill projectsToShowIds with the projects ids
     * @returns Project[] | null
     */
    public async getProjectsFromAPI(): Promise<Project[]> {
        const URL = this.apiUrl + this.apiEndpoint;
        try {
            const { data, status } = await axios.get<Project[]>(
                URL,
                this.headers
            );

            if (status !== 200) {
                throw new Error('Error getting projects');
            }

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
            } else {
                console.log('unexpected error: ', error);
            }
        }
        return [];
    }
}
