import 'jest';
import { TestRootStore } from '../stores/test-support/test-root.store';
import { OrderStore } from './order.store';
import { jsOrders } from '../domain/data';
import { VisibilityFilter } from '../domain/types';
import axios from 'axios';

const updateOrder = {
    id: 'o100',
    side: 'SELL',
    symbol: 'MSFT',
    quantity: 10000,
    committed: 6000,
    executed: 2000
};

describe('Order store', () => {
    let orderStore;
    beforeEach(() => {
        orderStore = new OrderStore(new TestRootStore());
    });
    test('have some initial orders', () => {
        orderStore.initialize(jsOrders);
        expect(orderStore.orderMap.size).toEqual(2);
    });
    test('create a new order using createOrder', () => {
        orderStore.createOrder(jsOrders[0]);
        expect(orderStore.orderMap.size).toEqual(1);
    });
    test('update an existing order using updateOrder', () => {
        orderStore.createOrder(jsOrders[0]);
        orderStore.updateOrder(updateOrder);
        expect(orderStore.orderMap.get(updateOrder.id)).toMatchObject(
            updateOrder
        );
    });
    test('delete all orders using deleteAllOrders', () => {
        orderStore.initialize(jsOrders);
        orderStore.deleteAllOrders();
        expect(orderStore.orderMap.size).toEqual(0);
    });
    test('change the filter value to open/done using setFilter', () => {
        expect(orderStore.filter).toEqual('All');
        orderStore.setFilter('Open');
        expect(orderStore.filter).toEqual('Open');
    });
    test('set number of orders using setNumOrdersToCreate', () => {
        expect(orderStore.numOrdersToCreate).toEqual(10);
        orderStore.setNumOrdersToCreate(4);
        expect(orderStore.numOrdersToCreate).toEqual(4);
    });
    test('return the number of orders in orderMap using numOrders', () => {
        orderStore.initialize(jsOrders);
        expect(orderStore.numOrders).toEqual(2);
    });
    test('loadOrders', async () => {
        expect.assertions(1);
        const data = await orderStore.loadOrders();
        expect(data).toBeUndefined();
    });
    test('createOrdersAtServer', async () => {
        expect.assertions(1);
        const data = await orderStore.createOrdersAtServer();
        expect(data).toBeUndefined();
    });
    test('resetServer', async () => {
        expect.assertions(1);
        const data = await orderStore.resetServer();
        expect(data).toBeUndefined();
    });
    test('getVisibleOrders should return all order/orders', () => {
        orderStore.initialize(jsOrders);
        const filter: VisibilityFilter = VisibilityFilter.ALL;
        orderStore.setFilter(filter);
        expect(orderStore.getVisibleOrders().length).toEqual(2);
    });
    test('getVisibleOrders should return open order/orders', () => {
        orderStore.initialize(jsOrders);
        const filter: VisibilityFilter = VisibilityFilter.OPEN;
        orderStore.setFilter(filter);
        expect(orderStore.getVisibleOrders().length).toEqual(2);
    });
    test('getVisibleOrders should return done order/orders', () => {
        orderStore.initialize(jsOrders);
        const filter: VisibilityFilter = VisibilityFilter.DONE;
        orderStore.setFilter(filter);
        expect(orderStore.getVisibleOrders().length).toEqual(0);
    });
});
