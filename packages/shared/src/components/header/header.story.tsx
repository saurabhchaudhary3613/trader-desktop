import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../test-support/story-decorator';
import { Header } from './header';
import { TestRootStore } from '../../stores/test-support/test-root.store';
import { jsOrders } from '../../domain/data';

storiesOf('Header', module)
    .addDecorator(StoryDecorator)
    .add('with title', () => {
        const rootStore = new TestRootStore();
        const { orderStore } = rootStore;

        orderStore.initialize(jsOrders);
        return <Header rootStore={rootStore}>TRADER DESKTOP</Header>;
    });
