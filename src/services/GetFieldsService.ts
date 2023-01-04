import ProjectField from '@/models/ProjectFieldModel';
import axios from 'axios';
import Service from './Service';

export default class GetFieldsService extends Service {
    private apiEndpoint: string = '/fields';

    constructor() {
        super();
    }

    public async getFieldsFromAPI(): Promise<ProjectField[]> {
        const URL = this.apiUrl + this.apiEndpoint;
        try {
            const { data, status } = await axios.get<ProjectField[]>(
                URL,
                this.headers
            );

            if (status !== 200) {
                throw new Error('Error getting project fields');
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
