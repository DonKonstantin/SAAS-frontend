import React from "react";
import {Icon as MaterialIcon, IconProps} from "@material-ui/core";
import {Icon} from "react-icons-kit";

// Параметры фабрики
export interface IconParams {
    icon: any
}

/**
 * Фабрика MaterialUI иконки с кастомными шрифтами
 * @param params
 */
export const MaterialCustomIcon: {(params: IconParams): React.ComponentType<IconProps>} = params => {
    class MaterialIconComp extends React.Component<IconProps> {
        render() {
            return (
                <MaterialIcon {...this.props} style={{...this.props.style, position: "relative"}}>
                    <Icon size={"100%"} className={`icon-custom-component`} icon={params.icon}/>
                </MaterialIcon>
            );
        }
    }

    return MaterialIconComp
}