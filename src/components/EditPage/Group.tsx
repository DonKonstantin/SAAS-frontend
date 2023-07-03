import React, {FC} from "react";
import {EditFormGroupProperties} from "../../settings/pages/system/edit";
import DefaultGroup from "./DefaultGroup";

// Компонент вывода группы
const Group: FC<EditFormGroupProperties> = props => {
    const {component: Component = DefaultGroup} = props.config
    return (
        <Component {...props} />
    )
}

// Экспортируем компонент
export default React.memo(Group, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.config) === JSON.stringify(nextProps)
})