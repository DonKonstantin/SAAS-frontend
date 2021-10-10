import React from 'react';
import {menuSettings} from "../../../../settings/menu";
import MenuGroupComponent from "./MenuGroup";

/**
 * Свойства компонента левой панели
 */
export interface UILeftMenuPanelProperties {
    isMenuVisible: boolean
    onChangeMenuState: () => void
    userPermissions: string[]
}

/**
 * Компонент левой панели
 */
class UILeftMenuComponent extends React.Component<UILeftMenuPanelProperties> {
    /**
     * Раскрытие меню при клике на пункт в свернутом состоянии
     */
    private changeMenuStateIfNotVisible() {
        if (this.props.isMenuVisible) {
            return
        }

        this.props.onChangeMenuState()
    }

    /**
     * Рендеринг листинга меню
     */
    render() {
        const menu = menuSettings()
        return (
            <React.Fragment>
                {menu.map((group, i) => (
                    <React.Fragment key={`menu-group-${i}`}>
                        <MenuGroupComponent
                            key={`menu-group-component-${i}`}
                            isMenuVisible={this.props.isMenuVisible}
                            group={group}
                            onClick={() => this.changeMenuStateIfNotVisible()}
                            userPermissions={this.props.userPermissions}
                        />
                    </React.Fragment>
                ))}
            </React.Fragment>
        );
    }
}

// Подключаем стили к компоненту и экспортируем его
export default UILeftMenuComponent