<template>
    <v-app :theme="theme">
        <NavBar :theme="theme" @change-theme="changeTheme" />

        <v-main>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-main>

        <Footer />
    </v-app>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { RouterView } from 'vue-router';

import NavBar from '@/layouts/NavBar.vue';
import Footer from './layouts/Footer.vue';

const theme: Ref<string> = ref(
    window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches // Get user's theme preference
        ? 'dark'
        : 'light'
);
function changeTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
}
</script>
