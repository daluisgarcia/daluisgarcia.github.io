<template>
    <v-responsive class="d-flex align-center text-center">
        <v-avatar size="200">
            <v-img alt="avatar" src="@/assets/logo.svg" />
        </v-avatar>

        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

        <h1 class="text-h2 font-weight-bold">
            <Icon class="mx-1" icon="twemoji:construction" />
            My portfolio in construction
            <Icon class="mx-1" icon="twemoji:building-construction" />
        </h1>

        <div class="py-12" />

        <v-row class="d-flex align-center justify-center">
            <v-col cols="auto">
                <v-btn
                    color="white"
                    href="https://github.com/daluisgarcia"
                    min-width="164"
                    rel="noopener noreferrer"
                    target="_blank"
                    variant="flat"
                >
                    <Icon class="mx-1" icon="logos:github-icon" />
                    Github
                </v-btn>
            </v-col>

            <v-col cols="auto">
                <v-btn
                    color="primary"
                    min-width="228"
                    rel="noopener noreferrer"
                    size="x-large"
                    target="_blank"
                >
                    <v-icon icon="mdi-speedometer" size="large" start />
                    Are you ready?
                </v-btn>
            </v-col>

            <v-col cols="auto">
                <v-btn
                    href="https://www.linkedin.com/in/daluisgarcia/"
                    min-width="164"
                    rel="noopener noreferrer"
                    target="_blank"
                    variant="flat"
                >
                    <Icon class="mx-1" icon="logos:linkedin-icon" />
                    LinkedIn
                </v-btn>
            </v-col>
        </v-row>
    </v-responsive>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
</script>
