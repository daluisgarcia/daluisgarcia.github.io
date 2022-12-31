<template>
    <v-app-bar flat>
        <div style="width: 200px" class="d-none d-sm-inline"></div>
        <v-row justify="center">
            <v-col cols="auto">
                <v-btn variant="text">BRIEF</v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn variant="text">PROJECT</v-btn>
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
