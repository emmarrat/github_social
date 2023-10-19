import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
    palette: {
        primary: {
            main: '#132D46',
            light: '#30699f',
        },
        secondary: {
            main: '#07793d',
            dark: '#02341b',
        },
        info: {
            main: '#fff',
            dark: '#afaeae',
        },
        warning: {
            main: '#2a2a2a',
            light: '#343434',
            dark: '#444444',
        },
    },
    components: {
        MuiGrid: {
            defaultProps: {
                borderRadius: '50px',
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'filled',
                fullWidth: true,
            },
        },

    },
});

export default theme;