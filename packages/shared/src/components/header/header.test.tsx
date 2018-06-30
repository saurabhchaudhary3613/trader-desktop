import * as React from 'react';

import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { getTestTheme } from '../test-support/get-test-theme';
import { Header } from './header';
import { TestRootStore } from '../../stores/test-support/test-root.store';
import { Provider } from 'mobx-react';
import { Order } from '../../domain/order';
import { Side } from '../../domain/order';

test('Header renders specified title', () => {
    const rootStore = new TestRootStore();

    const wrapper = mount(
        <MuiThemeProvider theme={getTestTheme()}>
            <Provider rootStore={rootStore}>
                <Header>Trader Desktop</Header>
            </Provider>
        </MuiThemeProvider>
    );
    expect(wrapper.find('h2').text()).toEqual('Trader Desktop');
});

test('Header displays the correct number of orders', () => {
    const rootStore = new TestRootStore();
    const side: Side = Side.BUY;

    const order1 = new Order('o100', side, 'AAPL', 10000, 7000, 3000);
    const order2 = new Order('o200', side, 'MSFT', 10000, 8000, 2000);
    rootStore.orderStore.createOrder(order1);
    rootStore.orderStore.createOrder(order2);
    const wrapper = mount(
        <MuiThemeProvider theme={getTestTheme()}>
            <Provider rootStore={rootStore}>
                <Header>Trader Desktop</Header>
            </Provider>
        </MuiThemeProvider>
    );

    expect(parseInt(wrapper.find('[data-testid="orderCount"]').text())).toEqual(
        2
    );
});
