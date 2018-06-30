import 'jest';
import {
    action,
    computed,
    decorate,
    observable,
    ObservableMap,
    toJS
} from 'mobx';
import { JsOrder, Order, Side } from '../domain/order';

describe('Order', () => {
    it('serialize', () => {
        const jsOrder = {
            id: 'o100',
            side: 'BUY',
            symbol: 'AAPL',
            quantity: 10000,
            committed: 7000,
            executed: 4000
        };
        const order = new Order(
            jsOrder.id,
            jsOrder.side as Side,
            jsOrder.symbol,
            jsOrder.quantity,
            jsOrder.committed,
            jsOrder.executed
        );
        expect(order.serialize()).toMatchObject(jsOrder);
    });
    it('staus returns the correct status of an order', () => {
        const side: Side = Side.BUY;
        const order = new Order('o100', side, 'AAPL', 10000, 7000, 4000);
        expect(order.status.committed).toBeCloseTo(7000);
        expect(order.status.done).toBeCloseTo(4000);
        expect(order.status.notDone).toBeCloseTo(3000);
        expect(order.status.uncommitted).toBeCloseTo(3000);
        expect(order.status.pctDone).toBeCloseTo(0.4);
        expect(order.status.pctNotDone).toBeCloseTo(0.3);
        expect(order.status.pctUncommitted).toBeCloseTo(0.3);
    });
    it('isPlaced return true when the order is fully placed', () => {
        const side: Side = Side.BUY;
        const order = new Order('o100', side, 'AAPL', 10000, 10000, 0);
        expect(order.isPlaced).toBeTruthy();
    });
    it('isPlaced return false when no order is placed', () => {
        const side: Side = Side.BUY;
        const order = new Order('o100', side, 'AAPL', 10000, 0, 0);
        expect(order.isPlaced).toBeFalsy();
    });
    it('isExecuted return true when the order is fully executed', () => {
        const side: Side = Side.BUY;
        const order = new Order('o100', side, 'AAPL', 10000, 0, 10000);
        expect(order.isExecuted).toBeTruthy();
    });
    it('isExecuted return false when no order is executed', () => {
        const side: Side = Side.BUY;
        const order = new Order('o100', side, 'AAPL', 10000, 7000, 0);
        expect(order.isExecuted).toBeFalsy();
    });
});
