import React, {ReactNode} from "react";
import withMaterialUI from "./withMaterialUI";
import withRedux from "./withRedux";
import withUILayer from "./withUILayer";
import withAuthorization from "./withAuthorization";
import {NextPage} from "next";
import WithSnackbar from "./withSnackbar";
import withMuiPickers from "./withMuiPickers";

/**
 * Подключает основный коннекторы к странице
 *
 * @param Application
 */
export default function withCoreConnections<T>(Application: NextPage<T>): React.ComponentClass<T> {
    class Connector extends React.Component<T>{
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
            return (<Application {...this.props}/>)
        }
    }

    // @ts-ignore
    return withRedux(withMaterialUI(withAuthorization(withUILayer(withMuiPickers(WithSnackbar(Connector))))))
}