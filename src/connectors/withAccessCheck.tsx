import React from "react";
import {Typography} from "@material-ui/core";

/**
 * Подключает проверку доступа пользователя к компоненту. Проверяется переданное разрешение.
 *
 * @param Application
 */
type WithAccessCheckFunc<T extends object> = {(Application: React.ComponentType<T>): React.ComponentClass<T>}
export default function withAccessCheck<T extends object>(permission: string, userPermissions: string[]): WithAccessCheckFunc<T> {
    return (Application: React.ComponentType<T>): React.ComponentClass<T> => {
        return class WithAccessCheck extends React.Component<T>{
            /**
             * Рендеринг компонента
             */
            render() {
                if (userPermissions.indexOf(permission) === -1) {
                    return (
                        <React.Fragment>
                            <Typography variant="h4" gutterBottom>Доступ запрещен</Typography>
                            <p>У вас нет доступа к данной странице</p>
                        </React.Fragment>
                    )
                }

                return (<Application {...this.props} />);
            }
        }
    }
}