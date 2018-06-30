import {
    StyledComponentProps,
    withStyles,
    WithStyles
} from 'material-ui/styles';
import { Theme } from 'material-ui/styles/createMuiTheme';
import Typography from 'material-ui/Typography';
import { observer } from 'mobx-react';
import * as React from 'react';

const styles = (theme: Theme) => ({
    orderProgressBarContainer: {
        width: '100%'
    },
    pctDoneBuy: {
        height: 10,
        background: theme.palette.business.buyBackground,
        display: 'inline-block'
    },
    pctDoneSell: {
        height: 10,
        background: theme.palette.business.sellBackground,
        display: 'inline-block'
    },
    pctNotDone: {
        height: 10,
        background: theme.palette.business.notDone,
        display: 'inline-block'
    },
    pctUncommited: {
        height: 10,
        background: theme.palette.business.uncommitted,
        display: 'inline-block'
    }
});

const decorate = withStyles(styles);
export interface OrderProgrssBarProps {
    order?: any;
}

export const OrderProgressBar = decorate<OrderProgrssBarProps>(
    observer(
        class extends React.Component<
            OrderProgrssBarProps &
                WithStyles<
                    | 'orderProgressBarContainer'
                    | 'pctDoneBuy'
                    | 'pctNotDone'
                    | 'pctUncommited'
                    | 'pctDoneSell'
                >
        > {
            render() {
                const { classes, order } = this.props;
                const { status } = order;
                const { pctDone, pctNotDone, pctUncommitted } = status;

                const doneWidth = {
                    width: pctDone * 100 + '%'
                };
                const notDoneWidth = {
                    width: pctNotDone * 100 + '%'
                };
                const uncommittedWidth = {
                    width: pctUncommitted * 100 + '%'
                };
                return (
                    <div className={classes.orderProgressBarContainer}>
                        <div
                            className={
                                order.side === 'BUY'
                                    ? classes.pctDoneBuy
                                    : classes.pctDoneSell
                            }
                            style={doneWidth}
                            data-testid="pctDone"
                        />
                        <div
                            className={classes.pctNotDone}
                            style={notDoneWidth}
                            data-testid="pctNotDone"
                        />
                        <div
                            className={classes.pctUncommited}
                            style={uncommittedWidth}
                            data-testid="pctUnCommited"
                        />
                    </div>
                );
            }
        }
    )
);
