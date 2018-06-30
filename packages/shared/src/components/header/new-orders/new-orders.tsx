import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import {
    StyledComponentProps,
    WithStyles,
    withStyles
} from 'material-ui/styles';
import { Theme } from 'material-ui/styles/createMuiTheme';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

const styles = (theme: Theme) => ({
    newOrdersContainer: {
        display: 'inline-block',
        width: 'auto',
        marginRight: theme.spacing.unit * 2
    },

    orderInput: {
        background: theme.palette.grey[900],
        width: 20,
        height: 19
    },

    newOredrBtn: {
        background: theme.palette.primary.main,
        marginLeft: 6,
        borderRadius: 2,
        minHeight: 0,
        padding: '4px 8px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        }
    }
});

export interface NewOrdersProps {
    numOrdersToCreate: number;
    setNumOrdersToCreate: any;
    createNewOrders: any;
}
const decorate = withStyles(styles);

export const NewOrders = decorate(
    class extends React.Component<
        NewOrdersProps &
            WithStyles<'newOrdersContainer' | 'orderInput' | 'newOredrBtn'>
    > {
        onNumOrdersToCreateChanged = (evt: any) => {
            this.props.setNumOrdersToCreate(evt.target.value);
        };

        createNewOrders = () => {
            this.props.createNewOrders(this.props.numOrdersToCreate);
        };

        render() {
            const {
                classes,
                numOrdersToCreate,
                setNumOrdersToCreate
            } = this.props;

            return (
                <div className={classes.newOrdersContainer}>
                    <Input
                        defaultValue={numOrdersToCreate}
                        className={classes.orderInput}
                        data-testid="inputOrders"
                        onChange={this.onNumOrdersToCreateChanged}
                        inputProps={{
                            'aria-label': 'Number of order'
                        }}
                    />
                    <Button
                        onClick={this.createNewOrders}
                        className={classes.newOredrBtn}
                    >
                        New Orders
                    </Button>
                </div>
            );
        }
    }
);
