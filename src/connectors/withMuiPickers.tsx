import {NextPage} from "next";
import React, {ReactNode} from "react";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from '@date-io/date-fns';
import {format} from "date-fns";
import 'moment-timezone';
import {MuiPickersUtilsProvider} from "@material-ui/pickers";

// Локализатор календаря
class RuLocalizedUtils extends DateFnsUtils {
    // Заголовочная часть календаря
    getCalendarHeaderText(date: Date): string {
        return format(date, "LLLL yyyy", { locale: ruLocale });
    }
}

/**
 * Подключает Material UI к странице
 *
 * @param Application
 */
export default function withMuiPickers<T>(Application: NextPage<T>): React.ComponentClass<T> {
    return class WithMuiPickersConnector extends React.Component<T>{
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
                <MuiPickersUtilsProvider utils={RuLocalizedUtils} locale={ruLocale}>
                    <Application {...this.props}/>
                </MuiPickersUtilsProvider>
            )
        }
    }
}