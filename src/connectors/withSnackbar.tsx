import React, {ReactNode} from "react";
import {withSnackbar, WithSnackbarProps} from "notistack";
import {registerEnqueueSnackbar} from "../services/notifications";
import {NextPage} from "next";

/**
 * Сохраняет очередь уведомлений SnackbarProvider в
 *
 * @param Application
 */
export default function WithSnackbar<T>(Application: NextPage<T>): React.ComponentClass<T> {
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
            registerEnqueueSnackbar(this.props.enqueueSnackbar);
            return (<Application {...this.props}/>)
        }
    }

    // @ts-ignore
    return withSnackbar<Properties>(WithSnackbar)
}
