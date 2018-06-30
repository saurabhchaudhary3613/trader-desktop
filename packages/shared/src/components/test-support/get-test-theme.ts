import { PaletteType } from 'material-ui';
import brown from 'material-ui/colors/brown';
import orange from 'material-ui/colors/orange';
import red from 'material-ui/colors/red';
import createMuiTheme, { Theme } from 'material-ui/styles/createMuiTheme';
import { PaletteOptions } from 'material-ui/styles/createPalette';
import { TypographyOptions } from 'material-ui/styles/createTypography';
import { Overrides } from 'material-ui/styles/overrides';

// Extend Color with 650, 750 & 850 options
declare module 'material-ui' {
    interface Color {
        750?: string;
        850?: string;
    }
}

// Extend Palette with business colors
declare module 'material-ui/styles/createPalette' {
    interface Palette {
        business: {
            buyBackground: string;
            buyText: string;
            sellBackground: string;
            sellText: string;
            notDone: string;
            uncommitted: string;
            headText: string;
            tbodyText: string;
        };
    }

    interface PaletteOptions {
        business: {
            buyBackground: string;
            buyText: string;
            sellBackground: string;
            sellText: string;
            notDone: string;
            uncommitted: string;
            headText: string;
            tbodyText: string;
        };
    }
}

// Extend Typography with fontWeightBold
declare module 'material-ui/styles/createTypography' {
    interface FontStyle {
        fontWeightBold: React.CSSProperties['fontWeight'];
    }
}

const paletteType: PaletteType = 'dark';

const typography: TypographyOptions = {
    fontWeightBold: 700
};

const overrides: Overrides = {
    MuiButton: {
        root: {
            textTransform: 'none',
            fontSize: 11,
            color: '#FFFFFF',
            minWidth: 60,
            minHeight: 21,
            padding: '3px 8px'
        }
    },

    MuiInput: {
        root: {
            textAlign: 'right',
            fontSize: 11,
            padding: '0 0 0 6px'
        }
    }
};

export function getTestTheme(): Theme {
    const palette: PaletteOptions = {
        primary: {
            main: brown[700]
        },
        secondary: {
            main: orange.A400,
            contrastText: '#ffffff'
        },
        error: {
            main: red.A400
        },
        grey: {
            750: '#575757',
            850: '#383838'
        },
        business: {
            buyBackground: '#66a989',
            buyText: '#80b79d',
            sellBackground: '#fcaf17',
            sellText: '#e57a00',
            notDone: '#404040',
            uncommitted: '#000000',
            headText: '#888888',
            tbodyText: '#E6E6E6'
        },
        type: paletteType,
        background: {
            default: paletteType === 'light' ? '#ffffff' : '#262626'
        }
    };
    return createMuiTheme({ palette, typography, overrides });
}
