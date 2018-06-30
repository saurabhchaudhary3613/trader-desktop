import axios from 'axios';
import { JsOrder } from '../domain/order';

const api = process.env.REACT_APP_API;

export interface OrderAdapter {
    createOrder(jsOrder: JsOrder): Promise<any>;
    fetchOrders(): Promise<JsOrder[]>;
}

export class HttpOrderAdapter implements OrderAdapter {
    createOrder(jsOrder: JsOrder): Promise<any> {
        return axios.post(api + '/orders', jsOrder);
    }

    fetchOrders(): Promise<JsOrder[]> {
        return axios.get(api + '/orders').then(response => {
            return response.data;
        });
    }
}
