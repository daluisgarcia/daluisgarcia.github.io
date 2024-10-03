<template>
    <v-container class="pt-0">
    <v-row v-if="isLoadingData" justify="center">
        <v-col
            align-self="center"
            cols="auto"
            v-for="index in 10"
            :key="index"
        >
            <v-skeleton-loader :elevation="5" type="button"></v-skeleton-loader>
        </v-col>
    </v-row>
    <v-row v-else justify="center" no-gutters>
        <!-- Technologies buttons for filtering -->
        <v-chip-group
            v-model="filters.technologies"
            multiple
        >
            <v-chip
                v-for="tech in technologies"
                :key="tech.id"
                filter
                :value="tech.id"
            >
                <Icon :icon="tech.icon_name" />
                <v-tooltip activator="parent" location="bottom">{{
                    tech.name
                }}</v-tooltip>
            </v-chip>

        </v-chip-group>
        <v-divider class="mx-4" vertical></v-divider>
        <!-- Project fields buttons for filtering -->
        <v-chip-group
            v-model="filters.fields"
            multiple
        >
            <v-chip
                v-for="field in projectFields"
                :key="field.id"
                filter
                :value="field.id"
            >
                <Icon :icon="field.icon_name" />
                <v-tooltip activator="parent" location="bottom">{{
                    field.name
                }}</v-tooltip>
            </v-chip>

        </v-chip-group>
    </v-row>
    <!-- Project list -->
    <v-row v-if="!isLoadingData && pinnedProjectsFiltered.length > 0">
        <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="project in pinnedProjectsFiltered"
            :key="project.id"
        >
            <ProjectCard :project="project" :is-pinned=true />
        </v-col>
    </v-row>
    <v-divider class="my-4"></v-divider>
    <v-row v-if="isLoadingData">
        <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="index in PROJECTS_PER_PAGE * 2"
            :key="index"
        >
            <v-skeleton-loader :elevation="10" type="image, table-heading, list-item-two-line, table-tfoot"></v-skeleton-loader>
        </v-col>
    </v-row>
    <v-row v-else>
        <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="project in projectsInPage"
            :key="project.id"
        >
            <ProjectCard :project="project" :is-pinned=false />
        </v-col>
    </v-row>
    <!-- Pagination -->
    <v-row
        justify="center"
        v-if="!isLoadingData && projectsFiltered.length > 0"
    >
        <v-pagination
            v-model="currentPage"
            :length="numberOfPages"
        ></v-pagination>
    </v-row>
    <!-- No projects message -->
    <v-row
        v-if="!isLoadingData && projectsFiltered.length === 0 && pinnedProjectsFiltered.length === 0"
        class="text-center text-h3"
    >
        <v-col cols="12">
            <b>No projects found</b>
        </v-col>
    </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { useAppStore } from '@/store/app';

import ProjectCard from '@/components/ProjectCard.vue';
import GetProjectsService from '@/services/GetProjectsService';
import GetTechnologiesService from '@/services/GetTechnologiesService';
import GetFieldsService from '@/services/GetFieldsService';
import Project from '@/models/ProjectModel';

// Pagination
const PROJECTS_PER_PAGE = 6;
const currentPage = ref(1);
const isLoadingData = ref(true);

// Components attributes
const filters = reactive<{
    technologies: number[];
    fields: number[];
}>({
    technologies: [],
    fields: [],
});
const appStore = useAppStore();

// Data got from the store
const pinnedProjects = computed(() => {
    return appStore.getPinnedProjects;
});
const allProjects = computed(() => {
    return appStore.getAllProjects;
});
const technologies = computed(() => {
    return appStore.getTechnologies;
});
const projectFields = computed(() => {
    return appStore.getProjectFields;
});

const filterProjects = (projectsList: any) => {
    if (filters.technologies.length === 0 && filters.fields.length === 0) {
        // No filters applied
        return projectsList.value;
    }

    return projectsList.value.filter((project: Project) => {
        let hasTech = filters.technologies.length === 0 ? true : false;
        let hasField = filters.fields.length === 0 ? true : false;

        project.technologies.forEach((tech) => {
            if (filters.technologies.includes(tech.id)) {
                hasTech = true;
            }
        });

        project.tech_fields.forEach((field) => {
            if (filters.fields.includes(field.id)) {
                hasField = true;
            }
        });

        return hasTech && hasField;
    });
}

// Projects filtered from the store
const pinnedProjectsFiltered = computed(() => {
    return filterProjects(pinnedProjects);
});
const projectsFiltered = computed(() => {
    return filterProjects(allProjects);
});

const numberOfPages = computed(() => {
    return Math.ceil(projectsFiltered.value.length / PROJECTS_PER_PAGE);
});

// Projects to be shown in the page
const projectsInPage = computed(() => {
    const start = (currentPage.value - 1) * PROJECTS_PER_PAGE;
    const end = start + PROJECTS_PER_PAGE;
    return projectsFiltered.value.slice(start, end);
});

// Actions to be done when the component is mounted
onMounted(async () => {
    const projectsService = new GetProjectsService();
    await appStore.getPinnedProjectsFromAPI(projectsService);
    await appStore.getProjectsFromAPI(projectsService);

    const technologiesService = new GetTechnologiesService();
    await appStore.getTechnologiesFromAPI(technologiesService);

    const projectFieldsService = new GetFieldsService();
    await appStore.getProjectFieldsFromAPI(projectFieldsService);

    isLoadingData.value = false;
});
</script>
