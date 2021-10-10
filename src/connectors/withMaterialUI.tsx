import React, {ReactNode} from "react";
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from "../components/UILayer/theme";
import CssBaseline from '@material-ui/core/CssBaseline';
import {NextPage} from "next";
import "react-sweet-progress/lib/style.css";

/**
 * Подключает Material UI к странице
 *
 * @param Application
 */
export default function withMaterialUI<T>(Application: NextPage<T>): React.ComponentClass<T> {
    return class WithUIConnector extends React.Component<T>{
        /**
         * Проброс базовых свойств компонента
         *
         * @param context
         */
        static async getInitialProps(context: any): Promise<any> {
            let appProps = {};
            if (Application.getInitialProps !== undefined) {
                appProps = await Application.getInitialProps(context);
            }

            return {...appProps}
        }

        /**
         * Отключение стилей, подключенных сервером
         */
        componentDidMount() {
            // Remove the server-side injected CSS.
            const jssStyles = document.querySelector('#jss-server-side');
            if (jssStyles) {
                // @ts-ignore
                jssStyles.parentElement.removeChild(jssStyles);
            }
        }

        /**
         * Рендеринг компонента
         */
        render(): ReactNode {
            return (
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Application {...this.props}/>
                </MuiThemeProvider>
            )
        }
    }
}
