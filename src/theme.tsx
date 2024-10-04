import { createTheme } from '@mui/material/styles';

const theme = createTheme( {
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        primary: {
            main: '#00416c',
        },
        secondary: {
            main: '#dc004e',
        },
    },
} );

export default theme;