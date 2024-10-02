// Utilities
import ProjectField from '@/models/ProjectFieldModel';
import Project from '@/models/ProjectModel';
import Technology from '@/models/TechnologyModel';
import GetProjectsService from '@/services/GetProjectsService';
import GetTechnologiesService from '@/services/GetTechnologiesService';
import GetFieldsService from '@/services/GetFieldsService';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        pinnedProjectsList: [] as Project[],
        projectsList: [] as Project[],
        technologiesList: [] as Technology[],
        projectFieldsList: [] as ProjectField[],
    }),
    getters: {
        getPinnedProjects(): Project[] {
            return this.pinnedProjectsList;
        },
        getAllProjects(): Project[] {
            return this.projectsList;
        },
        getTechnologies(): Technology[] {
            return this.technologiesList;
        },
        getProjectFields(): ProjectField[] {
            return this.projectFieldsList;
        },
    },
    actions: {
        async getPinnedProjectsFromAPI(getProjectsService: GetProjectsService) {
            if (this.pinnedProjectsList.length > 0) return;
            this.pinnedProjectsList =
                await getProjectsService.getPinnedProjectsFromAPI();
        },
        async getProjectsFromAPI(getProjectsService: GetProjectsService) {
            if (this.projectsList.length > 0) return;
            this.projectsList = await getProjectsService.getProjectsFromAPI();
        },
        async getTechnologiesFromAPI(
            getTechnologiesService: GetTechnologiesService
        ) {
            if (this.technologiesList.length > 0) return;
            this.technologiesList =
                await getTechnologiesService.getTechnologiesFromAPI();
        },
        async getProjectFieldsFromAPI(
            getProjectFieldsService: GetFieldsService
        ) {
            if (this.projectFieldsList.length > 0) return;
            this.projectFieldsList =
                await getProjectFieldsService.getFieldsFromAPI();
        },
    },
});
