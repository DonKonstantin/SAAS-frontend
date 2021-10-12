import React, {FC, useEffect} from "react";
import {ThemeProvider} from "@mui/system";
import theme from "../components/UILayer/theme";
import {CssBaseline} from "@mui/material";

// Свойства слоя
type MaterialUILayoutProps = Partial<{
    children: React.ReactNode
}>

// Слой вывода обвязки для MaterialUI
const MaterialUILayout: FC<MaterialUILayoutProps> = ({children}) => {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            // @ts-ignore
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

// Экспортируем слой
export default MaterialUILayout