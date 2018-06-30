import AppBar from 'material-ui/AppBar';
import {
    StyledComponentProps,
    WithStyles,
    withStyles
} from 'material-ui/styles';
import { Theme } from 'material-ui/styles/createMuiTheme';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RestButton } from '../basics/reset-button';
import { NewOrders } from './new-orders/new-orders';
import { OrdersIndicator } from './orders-indicator/orders-indicator';
import { VisibilitySelector } from './visibility-selector/visibility-selector';

const styles = (theme: Theme) => ({
    toolbar: {
        background: theme.palette.grey[900],
        minHeight: 50
    },
    title: {
        color: theme.palette.secondary.contrastText,
        fontSize: 12,
        fontWeight: theme.typography.fontWeightMedium,
        flex: 1
    },
    headerComponentContainer: {
        width: '78%',
        textAlign: 'right' as 'right'
    }
});

const decorate = withStyles(styles);

export interface HeaderProps {
    rootStore?: any;
    children?: any;
}

export const Header = inject('rootStore')(
    decorate<HeaderProps>(
        observer(
            class extends React.Component<
                HeaderProps &
                    WithStyles<'toolbar' | 'title' | 'headerComponentContainer'>
            > {
                render() {
                    const { classes, children, rootStore } = this.props;
                    const { orderStore } = rootStore;
                    return (
                        <AppBar position="static">
                            <Toolbar className={classes.toolbar}>
                                <Typography
                                    variant="title"
                                    className={classes.title}
                                >
                                    {children}
                                </Typography>
                                <div
                                    className={classes.headerComponentContainer}
                                >
                                    <VisibilitySelector
                                        selectedFilter={orderStore.filter}
                                        setValue={orderStore.setFilter}
                                    />
                                    <RestButton
                                        resetOrders={orderStore.resetServer}
                                    />
                                    <NewOrders
                                        numOrdersToCreate={
                                            orderStore.numOrdersToCreate
                                        }
                                        setNumOrdersToCreate={
                                            orderStore.setNumOrdersToCreate
                                        }
                                        createNewOrders={
                                            orderStore.createOrdersAtServer
                                        }
                                    />
                                    <OrdersIndicator
                                        orderCount={orderStore.orderMap.size}
                                    />
                                </div>
                            </Toolbar>
                        </AppBar>
                    );
                }
            }
        )
    )
);
