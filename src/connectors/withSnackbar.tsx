import React, {ReactNode} from "react";
import {WithSnackbarProps} from "notistack";
import {NextPage} from "next";
import SnackbarLayer from "../components/SnackbarLayer";

/**
 * Сохраняет очередь уведомлений SnackbarProvider в
 *
 * @param Application
 */
export default function withSnackbar<T>(Application: NextPage<T>): React.ComponentClass<T> {
    type Properties = T & WithSnackbarProps;

    class WithSnackbar extends React.Component<Properties> {
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
         * Рендеринг компонента
         */
        render(): ReactNode {
            return (
                <SnackbarLayer>
                    <Application {...this.props}/>
                </SnackbarLayer>
            )
        }
    }

    return WithSnackbar
}
