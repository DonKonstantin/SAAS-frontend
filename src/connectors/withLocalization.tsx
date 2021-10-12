import React, {ReactNode} from "react";
import {WithSnackbarProps} from "notistack";
import {NextPage} from "next";
import i18n from '../i18n';
import {I18nextProvider} from "react-i18next";
import Localization from "../components/Localization";

/**
 * Сохраняет очередь уведомлений SnackbarProvider в
 *
 * @param Application
 */
export default function withLocalization<T>(Application: NextPage<T>): React.ComponentClass<T> {
    type Properties = T & WithSnackbarProps;

    class WithLocalization extends React.Component<Properties> {
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
                <I18nextProvider i18n={i18n}>
                    <Localization />
                    <Application {...this.props}/>
                </I18nextProvider>
            )
        }
    }

    return WithLocalization
}
