import * as React from 'react';

import { mount, shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { getTestTheme } from '../test-support/get-test-theme';
import { Header } from '../header/header';
import { OrderList } from './order-list';
import { TestRootStore } from '../../stores/test-support/test-root.store';
import { Provider } from 'mobx-react';
import { Order, Side } from '../../domain/order';
import { jsOrders } from '../../domain/data';

test('orderlist table renders correctly', () => {
    const rootStore = new TestRootStore();
    const side: Side = Side.BUY;
    const order = new Order('o100', side, 'AAPL', 10000, 7000, 3000);
    rootStore.orderStore.createOrder(order);
    const wrapper = mount(
        <MuiThemeProvider theme={getTestTheme()}>
            <Provider rootStore={rootStore}>
                <OrderList />
            </Provider>
        </MuiThemeProvider>
    );
    expect(
        wrapper
            .find('[data-testid="side"]')
            .first()
            .text()
    ).toBe('BUY');
    expect(
        wrapper
            .find('[data-testid="symbol"]')
            .first()
            .text()
    ).toBe('AAPL');
    expect(
        parseInt(
            wrapper
                .find('[data-testid="quantity"]')
                .first()
                .text()
        )
    ).toBe(10000);
    expect(
        parseInt(
            wrapper
                .find('[data-testid="committed"]')
                .first()
                .text()
        )
    ).toBe(7000);
    expect(
        parseInt(
            wrapper
                .find('[data-testid="executed"]')
                .first()
                .text()
        )
    ).toBe(3000);
});
