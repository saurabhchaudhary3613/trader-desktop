import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../../../test-support/story-decorator';
import { OrderProgressBar } from './order-progress-bar';
import { TestRootStore } from '../../../../stores/test-support/test-root.store';
import { jsOrders } from '../../../../domain/data';
import { Order, Side } from '../../../../domain/order';

storiesOf('OrderProgressBar', module)
    .addDecorator(StoryDecorator)
    .add('Order Progress Bar', () => {
        const order = new Order(
            jsOrders[0].id,
            Side.BUY,
            jsOrders[0].symbol,
            jsOrders[0].quantity,
            jsOrders[0].committed,
            jsOrders[0].executed
        );
        return <OrderProgressBar order={order} />;
    });
