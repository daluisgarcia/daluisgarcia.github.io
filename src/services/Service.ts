export default class Service {
    protected apiUrl: string = 'http://daluisgarcia.pythonanywhere.com/api';
    protected apiUser: string = 'frontend';
    protected apiPassword: string = 'LYrr#59$2RpJk7ck';
    protected headers = {
        auth: {
            username: this.apiUser,
            password: this.apiPassword,
        },
    };
}
