import React from "react";
import {EditFormGroupProperties} from "../../../settings/pages/system/edit";
import {Schemas} from "../../../settings/schema";

// Компонент вывода скрытой группы полей формы
class HiddenGroup extends React.Component<EditFormGroupProperties<keyof Schemas>> {
    render() {
        return (<div />);
    }
}

export default HiddenGroup