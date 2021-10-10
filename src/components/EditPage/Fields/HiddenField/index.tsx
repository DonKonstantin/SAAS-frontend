import React from "react";
import {TFieldsFactory} from "../interfaces";
import {EditFieldProperties} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";

// Поле ввода числового значения
export const HiddenField: TFieldsFactory<{}> = () => {
    // Компонент вывода поля для ввода
    class Component extends React.Component<EditFieldProperties<keyof Schemas, any>> {
        /**
         * Рендеринг компонента
         */
        render() {
            return null
        }
    }

    return {component: Component}
}