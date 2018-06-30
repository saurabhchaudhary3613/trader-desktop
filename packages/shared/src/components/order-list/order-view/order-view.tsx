import {
    StyledComponentProps,
    WithStyles,
    withStyles
} from 'material-ui/styles';

import { Theme } from 'material-ui/styles/createMuiTheme';
import { observer } from 'mobx-react';
import * as React from 'react';
import { OrderProgressBar } from './OrderProgressBar/order-progress-bar';

const styles = (theme: Theme) => ({
    row: {
        height: 25
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
    tbodyRowStyle: {
        padding: '5px 0 3px 10px',
        borderBottom: '1px solid #383838'
    }
});

export interface OrderViewProps {
    order: any;
}
const decorate = withStyles(styles);

export const OrderView = decorate(
    observer(
        class extends React.Component<
            OrderViewProps &
                WithStyles<
                    | 'row'
                    | 'symbolColor'
                    | 'sideColorBuy'
                    | 'sideColorSell'
                    | 'tbodyRowStyle'
                >
        > {
            render() {
                const { classes, order } = this.props;
                const customColumnWidth = { width: 70 };
                return (
                    <tr className={classes.row}>
                        <td
                            style={customColumnWidth}
                            className={
                                (order.side === 'BUY'
                                    ? classes.sideColorBuy
                                    : classes.sideColorSell) +
                                ' ' +
                                classes.tbodyRowStyle
                            }
                            data-testid="side"
                        >
                            {order.side}
                        </td>
                        <td
                            style={customColumnWidth}
                            className={
                                classes.symbolColor +
                                ' ' +
                                classes.tbodyRowStyle
                            }
                            data-testid="symbol"
                        >
                            {order.symbol}
                        </td>
                        <td
                            style={customColumnWidth}
                            className={classes.tbodyRowStyle}
                            data-testid="quantity"
                        >
                            {order.quantity}
                        </td>
                        <td
                            style={customColumnWidth}
                            className={classes.tbodyRowStyle}
                            data-testid="committed"
                        >
                            {order.committed}
                        </td>
                        <td
                            style={customColumnWidth}
                            className={classes.tbodyRowStyle}
                            data-testid="executed"
                        >
                            {order.executed}
                        </td>
                        <td className={classes.tbodyRowStyle}>
                            <OrderProgressBar order={order} />
                        </td>
                    </tr>
                );
            }
        }
    )
);
