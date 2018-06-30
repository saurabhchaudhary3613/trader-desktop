import { JsOrder } from '../../domain/order';

export class MockOrderAdapter {
    createOrder = (jsOrder: JsOrder) => {
        return new Promise((resolve: any) => {
            const message = 'Order is Created';
            resolve(message);
        });
    };

    fetchOrders = () => {
        return new Promise((resolve: any) => {
            const message = 'Orders are Fetched';
            resolve(message);
        });
    };
}
