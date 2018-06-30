import { RouterState, RouterStore } from 'mobx-state-router';
import { OrderStore } from '../order.store';
import { MockOrderAdapter } from './mock-order.adapter';
import { MockServerAdapter } from './mock-server.adapter';

export class TestRootStore {
    orderStore = new OrderStore(this);

    // Adapters for use by all stores
    adapters = {
        orderAdapter: new MockOrderAdapter(),
        serverAdapter: new MockServerAdapter()
    };
}
