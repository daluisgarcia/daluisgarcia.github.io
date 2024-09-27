<template>
    <Particles
        id="tsparticles"
        :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded"
        :options="particlesOptions"
    />

    <v-app :theme="theme">
        <NavBar :theme="theme" @change-theme="changeTheme" />

        <v-main>
            <v-container fluid class="h-100">
                <router-view />
            </v-container>
        </v-main>

        <Footer />
    </v-app>
</template>

<script lang="ts" setup>
import { Ref, ref, computed } from 'vue';
import { RouterView } from 'vue-router';
import { loadFull } from 'tsparticles';

import NavBar from '@/layouts/NavBar.vue';
import Footer from './layouts/Footer.vue';

const theme: Ref<string> = ref(
    window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches // Get user's theme preference
        ? 'dark'
        : 'light'
);

const particlesOptions = computed(() => {
    return {
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: false,
                    mode: 'push',
                },
                onHover: {
                    enable: true,
                    mode: 'repulse',
                },
                resize: true,
            },
            modes: {
                bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 0.8,
                    size: 40,
                },
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 50,
                    duration: 0.3,
                },
            },
        },
        particles: {
            color: {
                // value: theme.value == 'light' ? '#009DFF' : '#B700EB',
                value: '#009DFF',
            },
            links: {
                // color: theme.value == 'light' ? '#10D100' : '#FF600D',
                color: '#10D100',
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            collisions: {
                enable: true,
            },
            move: {
                direction: 'none',
                enable: true,
                outMode: 'bounce',
                random: false,
                speed: 3,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 100,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: 'circle',
            },
            size: {
                random: true,
                value: 5,
            },
        },
        detectRetina: true,
    };
});

function changeTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
}

const particlesInit = async (engine: any) => {
    await loadFull(engine);
};

const particlesLoaded = async (container: any) => {
    console.log('Particles container loaded', container);
};
</script>
