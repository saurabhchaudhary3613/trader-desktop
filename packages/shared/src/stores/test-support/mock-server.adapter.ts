import { JsOrder } from '../../domain/order';

export class MockServerAdapter {
    reset = (jsOrder: JsOrder) => {
        return new Promise((resolve: any) => {
            const message = 'Orders are reset';
            resolve(message);
        });
    };
}
