import {createTheme, ThemeOptions} from "@mui/material";

export const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#6F933D',
        },
        secondary: {
            main: '#E75555',
        },
        error: {
            main: '#F44336',
        },
        divider: '#E5E5E5',
        background: {
            default: '#FBFDFC',
        },
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottomColor: "#E5E5E5"
                }
            }
        }
    }
};

// Create a theme instance.
const theme = createTheme(themeOptions);

export default theme;
