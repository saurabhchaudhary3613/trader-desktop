import * as React from 'react';
import { mount, shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { getTestTheme } from '../../../test-support/get-test-theme';
import { OrderProgressBar } from './order-progress-bar';
import { TestRootStore } from '../../../../stores/test-support/test-root.store';
import { Provider } from 'mobx-react';
import { Order } from '../../../../domain/order';
import { Side } from '../../../../domain/order';
import { jsOrders } from '../../../../domain/data';

test('test pctDone, pctNotDone and pctUncommitted of an Order', () => {
    const rootStore = new TestRootStore();
    const side: Side = Side.BUY;
    const order = new Order('o100', side, 'AAPL', 10000, 7000, 4000);
    const wrapper = mount(
        <MuiThemeProvider theme={getTestTheme()}>
            <Provider>
                <OrderProgressBar order={order} />
            </Provider>
        </MuiThemeProvider>
    );
    expect(order.status.pctDone).toEqual(0.4);
    expect(order.status.pctNotDone).toEqual(0.3);
    expect(order.status.pctUncommitted).toEqual(0.3);
});

test('test pctDone, pctNotDone and pctUncommitted of an Order', () => {
    const rootStore = new TestRootStore();
    const side: Side = Side.BUY;
    const order = new Order('o200', side, 'MSFT', 10000, 8000, 2000);
    const wrapper = mount(
        <MuiThemeProvider theme={getTestTheme()}>
            <Provider>
                <OrderProgressBar order={order} />
            </Provider>
        </MuiThemeProvider>
    );
    expect(order.status.pctDone).toEqual(0.2);
    expect(order.status.pctNotDone).toEqual(0.6);
    expect(order.status.pctUncommitted).toEqual(0.2);
});
test('test container width of pctDone, pctNotDone and pctUncommitted', () => {
    const rootStore = new TestRootStore();
    const side: Side = Side.BUY;
    const order = new Order('o100', side, 'AAPL', 10000, 7000, 4000);
    const wrapper = mount(
        <MuiThemeProvider theme={getTestTheme()}>
            <Provider>
                <OrderProgressBar order={order} />
            </Provider>
        </MuiThemeProvider>
    );
    expect(wrapper.find('[data-testid="pctDone"]').prop('style').width).toEqual(
        '40%'
    );
    expect(
        wrapper.find('[data-testid="pctNotDone"]').prop('style').width
    ).toEqual('30%');
    expect(
        wrapper.find('[data-testid="pctUnCommited"]').prop('style').width
    ).toEqual('30%');
});
test('test correct class is applied for BUY order container', () => {
    const rootStore = new TestRootStore();
    const side: Side = Side.BUY;
    const order = new Order('o100', side, 'AAPL', 10000, 7000, 4000);
    const wrapper = mount(
        <MuiThemeProvider theme={getTestTheme()}>
            <Provider>
                <OrderProgressBar order={order} />
            </Provider>
        </MuiThemeProvider>
    );
    let buyClass = wrapper
        .find('[data-testid="pctDone"]')
        .prop('className')
        .indexOf('pctDoneBuy');
    expect(buyClass).toBeGreaterThan(-1);
});
test('test correct class is applied for SELL order container', () => {
    const rootStore = new TestRootStore();
    const side: Side = Side.SELL;
    const order = new Order('o100', side, 'AAPL', 10000, 7000, 4000);
    const wrapper = mount(
        <MuiThemeProvider theme={getTestTheme()}>
            <Provider>
                <OrderProgressBar order={order} />
            </Provider>
        </MuiThemeProvider>
    );
    let sellClass = wrapper
        .find('[data-testid="pctDone"]')
        .prop('className')
        .indexOf('pctDoneSell');
    expect(sellClass).toBeGreaterThan(-1);
});
