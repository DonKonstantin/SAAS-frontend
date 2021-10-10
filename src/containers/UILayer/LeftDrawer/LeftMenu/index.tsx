import React from "react";
import UILeftMenuComponent, {UILeftMenuPanelProperties} from "../../../../components/UILayer/LeftDrawer/LeftMenu";
import {ReduxStore} from "../../../../reduxStore/ReduxStore";
import {connect} from "react-redux";

/**
 * Контейнер вывода левого меню
 */
class UILeftMenu extends React.Component<UILeftMenuPanelProperties> {
    /**
     * Мапит текущий Redux state в свойства компонента
     *
     * @param store
     * @param globalProperties
     */
    static mapStoreToProperties(
        store: ReduxStore,
        globalProperties: Partial<UILeftMenuPanelProperties>
    ): Partial<UILeftMenuPanelProperties> {
        return {
            ...globalProperties,
            userPermissions: store.Authorization.user.permissions || []
        }
    }

    /**
     * Условия рендеринга компонента
     * @param nextProps
     */
    shouldComponentUpdate(nextProps: Readonly<UILeftMenuPanelProperties>): boolean {
        const permissions = JSON.stringify(this.props.userPermissions)
        const nextPermissions = JSON.stringify(nextProps.userPermissions)

        return permissions !== nextPermissions
    }

    /**
     * Рендеринг листинга меню
     */
    render() {
        if (0 === this.props.userPermissions.length) {
            return null
        }

        return (<UILeftMenuComponent {...this.props}/>);
    }
}

export default connect(UILeftMenu.mapStoreToProperties)(UILeftMenu);