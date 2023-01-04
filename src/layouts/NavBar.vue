<template>
    <v-app-bar flat>
        <div style="width: 200px" class="d-none d-sm-inline"></div>
        <v-row justify="center">
            <v-col cols="auto">
                <RouterLink
                    style="text-decoration: none; color: inherit"
                    to="/"
                >
                    <v-btn variant="text"> BRIEF </v-btn>
                </RouterLink>
            </v-col>
            <v-col cols="auto">
                <RouterLink
                    style="text-decoration: none; color: inherit"
                    to="/projects"
                >
                    <v-btn variant="text"> PROJECTS </v-btn>
                </RouterLink>
            </v-col>
        </v-row>
        <v-btn
            :prepend-icon="
                theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
            "
            @click="changeTheme"
            ><span class="d-none d-sm-inline">Toggle Theme</span>
        </v-btn>
    </v-app-bar>
</template>

<script lang="ts" setup>
defineProps({
    theme: String,
});
const emit = defineEmits(['changeTheme']);
function changeTheme() {
    emit('changeTheme');
}
</script>
