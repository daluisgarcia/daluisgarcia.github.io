<template>
    <v-footer app>
        <v-row class="d-flex align-center justify-center" no-gutters>
            <v-col cols="auto" v-for="link in socialMedia" :key="link.name">
                <v-btn
                    :href="link.url"
                    :icon="link.icon"
                    class="mx-4"
                    variant="text"
                    target="_blank"
                ></v-btn>
            </v-col>
            <v-col cols="auto" class="px-4">
                {{ new Date().getFullYear() }} — <strong>Daniel Luis</strong>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const socialMedia = ref([
    {
        name: 'Github',
        icon: 'mdi-github',
        url: 'https://github.com/daluisgarcia',
    },
    {
        name: 'LinkedIn',
        icon: 'mdi-linkedin',
        url: 'https://www.linkedin.com/in/daluisgarcia/',
    },
]);
</script>
