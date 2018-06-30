import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../test-support/story-decorator';
import { OrderList } from './order-list';
import { TestRootStore } from '../../stores/test-support/test-root.store';
import { jsOrders } from '../../domain/data';

storiesOf('OrderList', module)
    .addDecorator(StoryDecorator)
    .add('order list', () => {
        const rootStore = new TestRootStore();
        const { orderStore } = rootStore;
        orderStore.initialize(jsOrders);
        return <OrderList rootStore={rootStore} />;
    });
