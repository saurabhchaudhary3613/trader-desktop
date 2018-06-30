import { action, computed, decorate, observable } from 'mobx';
import { toJS } from 'mobx';

export enum Side {
    BUY = 'BUY',
    SELL = 'SELL'
}

export interface OrderStatus {
    committed: number;
    done: number;
    notDone: number;
    uncommitted: number;
    pctDone: number;
    pctNotDone: number;
    pctUncommitted: number;
}

/**
 * An interface describing a plain JavaScript order.
 * Such an object will be used to receive/send orders to the server.
 */
export interface JsOrder {
    id: string;
    side: string;
    symbol: string;
    quantity: number;
    committed: number;
    executed: number;
}

/**
 * An order to buy or sell a security for a specific fund.
 */
export class Order {
    constructor(
        readonly id: string,
        public side: Side,
        public symbol: string,
        public quantity: number,
        public committed: number = 0,
        public executed: number = 0
    ) {}

    /**
     * Updates the order from a plain JavaScript object
     */
    update(jsOrder: JsOrder) {
        Object.assign(this, jsOrder);
    }

    /**
     * Converts the MobX observable to a plain JavaScript object
     */
    serialize(): JsOrder {
        return toJS(this);
    }

    get isPlaced() {
        return this.committed === this.quantity ? true : false;
    }

    get isExecuted() {
        return this.executed === this.quantity ? true : false;
    }

    get status(): OrderStatus {
        const { quantity, committed, executed } = this;
        const notDone = committed - executed;
        const uncommitted = quantity - committed;
        const pctDone = executed / quantity;
        const pctNotDone = notDone / quantity;
        const pctUncommitted = uncommitted / quantity;

        return {
            committed,
            done: executed,
            notDone,
            uncommitted,
            pctDone,
            pctNotDone,
            pctUncommitted
        };
    }
}

decorate(Order, {
    id: observable,
    side: observable,
    symbol: observable,
    quantity: observable,
    committed: observable,
    executed: observable,
    isPlaced: computed,
    isExecuted: computed,
    status: computed,
    update: action
});
