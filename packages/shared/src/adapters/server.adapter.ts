import axios from 'axios';

const api = process.env.REACT_APP_API;

export interface ServerAdapter {
    reset(): Promise<any>;
}

export class HttpServerAdapter {
    reset(): Promise<any> {
        return axios.post(api + '/reset');
    }
}
