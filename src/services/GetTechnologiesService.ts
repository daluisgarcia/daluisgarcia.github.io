import Technology from '@/models/TechnologyModel';
import axios from 'axios';
import Service from './Service';

export default class GetTechnologiesService extends Service {
    private apiEndpoint: string = '/technologies';

    constructor() {
        super();
    }

    public async getTechnologiesFromAPI(): Promise<Technology[]> {
        const URL = this.apiUrl + this.apiEndpoint;
        try {
            const { data, status } = await axios.get<Technology[]>(
                URL,
                this.headers
            );

            if (status !== 200) {
                throw new Error('Error getting technologies');
            }

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
            } else {
                console.log('unexpected error: ', error);
            }
        }
        return [];
    }
}
