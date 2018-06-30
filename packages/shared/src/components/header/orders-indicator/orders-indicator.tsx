import {
    StyledComponentProps,
    WithStyles,
    withStyles
} from 'material-ui/styles';
import { Theme } from 'material-ui/styles/createMuiTheme';
import * as React from 'react';

const styles = (theme: Theme) => ({
    ordersIndicatorContainer: {
        display: 'inline-block',
        background: theme.palette.secondary.dark,
        borderRadius: 16,
        padding: '4px 8px',
        fontSize: 11
    },
    indicatorText: {}
});
export interface OrdersIndicatorProps {
    orderCount: number;
}
const decorate = withStyles(styles);

export const OrdersIndicator = decorate(
    class extends React.Component<
        OrdersIndicatorProps &
            WithStyles<'ordersIndicatorContainer' | 'indicatorText'>
    > {
        render() {
            const { classes, orderCount } = this.props;
            return (
                <div className={classes.ordersIndicatorContainer}>
                    <span
                        data-testid="orderCount"
                        className={classes.indicatorText}
                    >
                        {orderCount}
                    </span>
                </div>
            );
        }
    }
);
