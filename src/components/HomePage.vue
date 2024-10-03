<template>
    <v-responsive class="d-flex align-center h-100">
        <v-row class="align-center text-center" style="height: 85vh;">
            <v-col cols="12" md="6">
                <v-lazy
                    :min-height="200"
                    :options="{'threshold':0.95}"
                    transition="fade-transition"
                >
                    <v-avatar size="325">
                        <v-img alt="avatar" src="@/assets/logo.svg" />
                    </v-avatar>
                </v-lazy>
            </v-col>
            <v-col cols="12" md="6" lg="5" class="text-center text-md-start pe-4">
                <v-lazy
                    :min-height="200"
                    :options="{'threshold':0.7}"
                    transition="fade-transition"
                >
                    <span>
                    <p class="text-h4 text-sm-h3 text-md-h2">
                        Hello! I'm Daniel Luis 🙋🏻‍♂️
                    </p>
                    <p class="text-sm-h6 text-md-h5 mx-4 ms-md-0 me-md-4 pe-md-4">
                        A Software Engineer 👨🏻‍💻 looking for new challenging projects 📈 that
                        can help me grow professionally and personally 🚀
                    </p>
                    <p class="text-sm-h6 text-md-h5 mx-4 ms-md-0 me-md-4 pe-md-4">
                        Improving my knowledge about Data Science 🧪 and Machine Learning 🤖
                        to align my career with my personal goals 📊
                    </p>
                    </span>
                </v-lazy>
            </v-col>
            <v-col cols="0" lg="1">
                <!-- Column to set space between text and page border -->
            </v-col>
        </v-row>
        <v-row class="align-center text-center" style="height: 45vh;">
            <v-col cols="12" class="text-center">
                <v-lazy
                    :min-height="200"
                    :options="{'threshold':1}"
                    transition="fade-transition"
                >
                    <p class="text-h5 text-md-h4">
                        <i>
                            "Little steps 👣 lead to great achievements 🚀"
                        </i>
                    </p>
                </v-lazy>
            </v-col>
        </v-row>
        <v-row class="align-center text-center" style="height: 85vh;">
            <v-col cols="12" md="6" class="text-center pe-4">
                <v-lazy
                    :min-height="200"
                    :options="{'threshold':0.7}"
                    transition="fade-transition"
                >
                    <p class="text-sm-h5 text-md-h4 ms-md-4 ps-md-4">
                        Do you need a responsable and proactive Software Engineer? I'm here to help you!
                    </p>
                </v-lazy>
            </v-col>
            <v-col cols="12" md="6">
                <v-lazy
                    :min-height="200"
                    :options="{'threshold':0.9}"
                    transition="fade-transition"
                >
                    <v-btn
                        prepend-icon="mdi-gmail"
                        rounded="xl"
                        size="x-large"
                        block
                        style="width: 75%;" color="primary"
                        href="mailto:daluisgarcia@gmail.com"
                    >
                        Contact me
                    </v-btn>
                </v-lazy>
            </v-col>
        </v-row>
    </v-responsive>
</template>

<script lang="ts" setup></script>
