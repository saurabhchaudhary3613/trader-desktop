import { OrderStore } from '../stores/order.store';

const api = process.env.REACT_APP_WSAPI;
const socket = new WebSocket(api!);

let orderStore: OrderStore;

socket.onmessage = (event: any) => {
    if (!orderStore) {
        return;
    }

    const { type, payload } = JSON.parse(event.data);
    switch (type) {
        case 'orderCreated':
            orderStore.createOrder(payload);
            break;

        case 'orderChanged':
            orderStore.updateOrder(payload);
            break;

        case 'allOrdersDeleted':
            orderStore.deleteAllOrders();
            break;

        default:
            break;
    }
};

export const SocketListener = {
    setOrderStore: (store: OrderStore) => {
        orderStore = store;
    }
};
