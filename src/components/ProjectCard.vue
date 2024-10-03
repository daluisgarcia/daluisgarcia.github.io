<template>
    <v-card height="100%">
        <v-carousel
            progress="circle"
            show-arrows="hover"
            cover
            hide-delimiters
            height="250"
        >
            <v-carousel-item
                v-for="media in project.media_files"
                :key="media.file"
            >
                <v-img :src="media.file"/>
            </v-carousel-item>
        </v-carousel>

        <v-card-title>
            <span v-if="isPinned">
                <v-icon color="primary">mdi-pin</v-icon>
            </span>
            {{ project.name }}
        </v-card-title>

        <v-card-subtitle>
            {{ project.year_of_realization + ' - ' + project.purpose }}
        </v-card-subtitle>
        <v-card-text class="text-truncate">
            {{ project.description }}
            <v-tooltip activator="parent" location="top">{{
                project.description
            }}</v-tooltip>
        </v-card-text>

        <v-card-actions class="pt-auto">
            <v-row no-gutters>
                <v-col cols="auto" class="mr-auto" align-self="center">
                    <span v-for="tech in project.technologies" :key="tech.id">
                        <Icon class="mr-2" :icon="tech.icon_name" height="23" />
                        <v-tooltip activator="parent" location="bottom">{{
                            tech.name
                        }}</v-tooltip>
                    </span>
                </v-col>
                <v-col cols="auto" align-self="center">
                    <v-btn
                        v-if="project.github_link"
                        :href="project.github_link"
                        target="_blank"
                        icon="mdi-github"
                    ></v-btn>
                    <v-btn
                        v-if="project.project_link"
                        :href="project.project_link"
                        target="_blank"
                        icon="mdi-open-in-new"
                    >
                    </v-btn>
                    <span
                        v-if="!project.project_link && !project.github_link"
                        class="mx-1"
                    >
                        <v-icon color="primary" height="23">mdi-lock</v-icon>
                        <v-tooltip activator="parent" location="bottom">Private</v-tooltip>
                    </span>
                </v-col>
            </v-row>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import Project from '@/models/ProjectModel';
defineProps<{
    project: Project;
    isPinned: boolean;
}>();
</script>
