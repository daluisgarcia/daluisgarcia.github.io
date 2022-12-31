/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    theme: {
        themes: {
            light: {
                colors: {
                    primary: '#009DFF',
                    secondary: '#FF600D',
                },
            },
            dark: {
                colors: {
                    primary: '#10D100',
                    secondary: '#B700EB',
                },
            },
        },
    },
});
