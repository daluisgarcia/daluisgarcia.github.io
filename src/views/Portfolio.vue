<template>
    <v-row justify="center" no-gutters>
        <v-dialog
            v-model="isLoadingData"
            height="100"
            :scrim="false"
            persistent
        >
            <v-card height="100">
                <v-card-text class="text-center">
                    <b>Loading projects...</b>
                    <v-progress-linear
                        indeterminate
                        color="primary"
                        class="mt-5"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Technologies buttons for filtering -->
        <v-col
            align-self="center"
            cols="auto"
            v-for="tech in technologies"
            :key="tech.id"
        >
            <v-btn
                :icon="!tech.is_selected"
                :flat="!tech.is_selected"
                :outlined="tech.is_selected"
                :append-icon="tech.is_selected ? 'mdi-close-circle' : ''"
                @click="handleFilter(tech, 'technologies')"
                class="mr-1"
            >
                <Icon :icon="tech.icon_name" />
                <v-tooltip activator="parent" location="bottom">{{
                    tech.name
                }}</v-tooltip>
            </v-btn>
        </v-col>
        <v-divider class="mx-4" vertical></v-divider>
        <!-- Project fields buttons for filtering -->
        <v-col
            align-self="center"
            cols="auto"
            v-for="field in projectFields"
            :key="field.id"
        >
            <v-btn
                :icon="!field.is_selected"
                :flat="!field.is_selected"
                :outlined="field.is_selected"
                :append-icon="field.is_selected ? 'mdi-close-circle' : ''"
                @click="handleFilter(field, 'fields')"
                class="mr-1"
            >
                <Icon :icon="field.icon_name" />
                <v-tooltip activator="parent" location="bottom">{{
                    field.name
                }}</v-tooltip>
            </v-btn>
        </v-col>
    </v-row>
    <!-- Project list -->
    <v-row>
        <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="project in projectsInPage"
            :key="project.id"
        >
            <ProjectCard :project="project" />
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
        v-if="!isLoadingData && projectsFiltered.length === 0"
        class="text-center text-h3"
    >
        <v-col cols="12">
            <b>No projects found</b>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { useAppStore } from '@/store/app';

import ProjectCard from '@/components/ProjectCard.vue';
import Technology from '@/models/TechnologyModel';
import ProjectField from '@/models/ProjectFieldModel';
import GetProjectsService from '@/services/GetProjectsService';
import GetTechnologiesService from '@/services/GetTechnologiesService';
import GetFieldsService from '@/services/GetFieldsService';

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
const projectsService = new GetProjectsService();

// Data got from the store
const allProjects = computed(() => {
    return appStore.getAllProjects;
});
const technologies = computed(() => {
    return appStore.getTechnologies;
});
const projectFields = computed(() => {
    return appStore.getProjectFields;
});

// Projects filtered from the store
const projectsFiltered = computed(() => {
    // No filters applied
    if (filters.technologies.length === 0 && filters.fields.length === 0) {
        return allProjects.value;
    }

    return allProjects.value.filter((project) => {
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

/**
 * Function to handle the click on a technology or project field button
 * @param item Technology or ProjectField to be added/remove as filter
 * @param filtersArray Array of technologies or project fields ids
 */
function handleFilter(item: Technology | ProjectField, filterType: string) {
    let filtersArray: number[] =
        filterType === 'technologies' ? filters.technologies : filters.fields;

    if (item.is_selected) {
        // Remove the item from the array
        filtersArray = filtersArray.filter((id) => item.id !== id);

        // Update the array
        if (filterType === 'technologies') {
            filters.technologies = filtersArray;
        } else {
            filters.fields = filtersArray;
        }

        item.is_selected = false;
    } else {
        filtersArray.push(item.id);
        item.is_selected = true;
    }
}

// Actions to be done when the component is mounted
onMounted(async () => {
    await appStore.getProjectsFromAPI(projectsService);

    const technologiesService = new GetTechnologiesService();
    await appStore.getTechnologiesFromAPI(technologiesService);

    const projectFieldsService = new GetFieldsService();
    await appStore.getProjectFieldsFromAPI(projectFieldsService);

    isLoadingData.value = false;
});
</script>
