import { action, computed, decorate, observable, ObservableMap } from 'mobx';
import { JsOrder, Order } from '../domain/order';
import { Side } from '../domain/order';
import { VisibilityFilter } from '../domain/types';
import { generateOrder } from './generate-order';

export class OrderStore {
    rootStore: any;
    orderMap = new ObservableMap();
    filter: VisibilityFilter = VisibilityFilter.ALL;
    numOrdersToCreate: number = 10;

    constructor(rootStore: any) {
        this.rootStore = rootStore;
    }

    initialize = (jsOrders: JsOrder[]) => {
        jsOrders.forEach(jsOrder => {
            this.createOrder(jsOrder);
        });
    };

    // Action to create one order in the store
    createOrder = (jsOrder: JsOrder) => {
        const side: Side = jsOrder.side as Side;
        const newOrder = new Order(
            jsOrder.id,
            side,
            jsOrder.symbol,
            jsOrder.quantity,
            jsOrder.committed,
            jsOrder.executed
        );
        this.orderMap.set(newOrder.id, newOrder);
    };

    // Action to update one order in the store
    updateOrder = (jsOrder: JsOrder) => {
        this.orderMap.get(jsOrder.id).update(jsOrder);
    };

    // This action will be invoked when the server has been reset
    deleteAllOrders = () => {
        this.orderMap.clear();
    };

    // Action to change the filter when a radio button is clicked
    setFilter = (filter: string) => {
        this.filter = filter as VisibilityFilter;
    };

    // This action is used to change the number of orders to create when the user is typing in the input box
    setNumOrdersToCreate = (numOrdersToCreate: number) => {
        this.numOrdersToCreate = numOrdersToCreate;
    };

    // Computed property return the number of orders in orderMap
    get numOrders(): number {
        return this.orderMap.size;
    }

    loadOrders = () => {
        const { orderAdapter } = this.rootStore.adapters;
        orderAdapter.fetchOrders().then(
            (orders: JsOrder[]) => {
                this.initialize(orders);
            },
            () => {}
        );
    };

    createOrdersAtServer = (numOrdersToCreate: number) => {
        const { orderAdapter } = this.rootStore.adapters;
        // Create specified number of random JsOrders
        // Send the generated orders to the server using the orderAdapter
        const orderPromise = [];

        for (let i = 0; i < numOrdersToCreate; i++) {
            const order = generateOrder();
            orderPromise.push(orderAdapter.createOrder(order));
        }

        Promise.all(orderPromise).then(values => {}, reason => {});
    };

    resetServer = () => {
        const { serverAdapter } = this.rootStore.adapters;
        return serverAdapter.reset().then(() => {}, () => {});
    };

    getVisibleOrders = () => {
        const orders = Array.from(this.orderMap.values());
        switch (this.filter) {
            case VisibilityFilter.OPEN:
                return orders.filter(
                    order =>
                        Math.round(order.executed) !==
                        Math.round(order.quantity)
                );
            case VisibilityFilter.DONE:
                return orders.filter(
                    order =>
                        Math.round(order.executed) ===
                        Math.round(order.quantity)
                );
            default:
                return orders;
        }
    };
}
decorate(OrderStore, {
    orderMap: observable,
    filter: observable,
    numOrdersToCreate: observable,
    numOrders: computed,
    initialize: action,
    createOrder: action,
    updateOrder: action,
    deleteAllOrders: action,
    setFilter: action,
    setNumOrdersToCreate: action
});
