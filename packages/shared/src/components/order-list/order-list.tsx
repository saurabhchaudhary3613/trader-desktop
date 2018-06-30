import {
    StyledComponentProps,
    WithStyles,
    withStyles
} from 'material-ui/styles';
import { Theme } from 'material-ui/styles/createMuiTheme';
import Typography from 'material-ui/Typography';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { OrderView } from './order-view/order-view';

const styles = (theme: Theme) => ({
    orderListContainer: {
        width: '100%'
    },
    table: {
        minWidth: '100%',
        borderSpacing: 'unset'
    },
    row: {
        height: 25
    },
    tableHeadBG: {
        background: theme.palette.grey[850]
    },
    theadRowHeight: {
        height: 28
    },
    tbodyStyle: {
        background: theme.palette.grey[750],
        fontSize: 11,
        color: theme.palette.business.tbodyText
    },
    symbolColor: {
        color: theme.palette.secondary.contrastText
    },
    sideColorBuy: {
        color: theme.palette.business.buyText
    },
    sideColorSell: {
        color: theme.palette.business.sellText
    },
    theadText: {
        color: theme.palette.business.headText,
        fontSize: 11,
        padding: '0 0 0 8px'
    }
});

const decorate = withStyles(styles);
export interface OrderListProps {
    rootStore?: any;
    children?: any;
}

export const OrderList = inject('rootStore')(
    decorate<OrderListProps>(
        observer(
            class extends React.Component<
                OrderListProps &
                    WithStyles<
                        | 'orderListContainer'
                        | 'table'
                        | 'row'
                        | 'tableHeadBG'
                        | 'theadRowHeight'
                        | 'tbodyStyle'
                        | 'symbolColor'
                        | 'sideColorBuy'
                        | 'sideColorSell'
                        | 'theadText'
                    >
            > {
                render() {
                    const { classes, children, rootStore } = this.props;
                    console.log('rootStore====',rootStore);
                    const { orderStore } = rootStore;
                    console.log('orderStore====',orderStore);
                    const customColumnWidth = { width: 70 };
                    const orders = orderStore.getVisibleOrders();
                    return (
                        <div className={classes.orderListContainer}>
                            <table className={classes.table}>
                                <thead className={classes.tableHeadBG}>
                                    <tr className={classes.theadRowHeight}>
                                        <td
                                            style={customColumnWidth}
                                            className={classes.theadText}
                                        >
                                            Side
                                        </td>
                                        <td
                                            style={customColumnWidth}
                                            className={classes.theadText}
                                        >
                                            Symbol
                                        </td>
                                        <td
                                            style={customColumnWidth}
                                            className={classes.theadText}
                                        >
                                            Quantity
                                        </td>
                                        <td
                                            style={customColumnWidth}
                                            className={classes.theadText}
                                        >
                                            Committed
                                        </td>
                                        <td
                                            style={customColumnWidth}
                                            className={classes.theadText}
                                        >
                                            Executed
                                        </td>
                                        <td className={classes.theadText} />
                                    </tr>
                                </thead>
                                <tbody className={classes.tbodyStyle}>
                                    {orders.map((order: any) => {
                                        return (
                                            <OrderView
                                                key={order.id}
                                                order={order}
                                            />
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    );
                }
            }
        )
    )
);
