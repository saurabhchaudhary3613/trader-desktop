import Button from 'material-ui/Button';
import {
    StyledComponentProps,
    WithStyles,
    withStyles
} from 'material-ui/styles';
import { Theme } from 'material-ui/styles/createMuiTheme';
import * as React from 'react';

const styles = (theme: Theme) => ({
    btnRest: {
        minWidth: 0,
        minHeight: 0,
        padding: '4px 8px',
        marginRight: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
        '&:hover': {
            background: theme.palette.grey[800]
        }
    }
});

export interface ResetOrdersProps {
    resetOrders: any;
}

const decorate = withStyles(styles);

export const RestButton = decorate(
    class extends React.Component<ResetOrdersProps & WithStyles<'btnRest'>> {
        resetOrders = () => {
            this.props.resetOrders();
        };
        render() {
            const { classes } = this.props;

            return (
                <Button onClick={this.resetOrders} className={classes.btnRest}>
                    Reset
                </Button>
            );
        }
    }
);
