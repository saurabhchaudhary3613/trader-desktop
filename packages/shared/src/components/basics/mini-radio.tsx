import Radio from 'material-ui/Radio';

import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {
    StyledComponentProps,
    WithStyles,
    withStyles
} from 'material-ui/styles';
import { Theme } from 'material-ui/styles/createMuiTheme';
import * as React from 'react';

const styles = (theme: Theme) => ({
    root: {
        color: 'rgba(255,255,255,0.70)',
        width: 24,
        height: 24,
        '&$checked': {
            color: 'rgba(255,255,255,0.70)'
        }
    },
    checked: {},
    size: {
        width: 24,
        height: 24
    },
    sizeIcon: {
        fontSize: 16
    },
    miniRadioContainer: {
        display: 'inline-block',
        marginRight: theme.spacing.unit * 1.5
    },
    radioText: {
        fontSize: 11,
        color: theme.palette.secondary.contrastText,
        letterSpacing: 0
    }
});

export interface MiniRadioProps {
    selectedValue: string;
    handleChange: any;
    value: string;
}

const decorate = withStyles(styles);

export const MiniRadio = decorate(
    class extends React.Component<
        MiniRadioProps &
            WithStyles<
                | 'root'
                | 'checked'
                | 'size'
                | 'sizeIcon'
                | 'radioText'
                | 'miniRadioContainer'
            >
    > {
        render() {
            const { classes, selectedValue, handleChange, value } = this.props;
            return (
                <div className={classes.miniRadioContainer}>
                    <Radio
                        checked={selectedValue === value}
                        onChange={handleChange}
                        value={value}
                        color="default"
                        name={value}
                        aria-label={value}
                        className={classes.root}
                        icon={
                            <RadioButtonUncheckedIcon
                                className={classes.sizeIcon}
                            />
                        }
                        checkedIcon={
                            <RadioButtonCheckedIcon
                                className={classes.sizeIcon}
                            />
                        }
                    />
                    <span className={classes.radioText}>{value}</span>
                </div>
            );
        }
    }
);
