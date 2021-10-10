import {Schemas} from "../../../../../settings/schema";
import React from "react";
import {ReduxStore} from "../../../../../reduxStore/ReduxStore";
import {connect} from "react-redux";
import RelationWithSearchFieldComponent, {ComponentProps} from "../../../../../components/EditPage/Fields/RelationWithSearchField/RelationWithSearchFieldComponent";

interface Props<T extends keyof Schemas, K extends keyof Schemas> extends ComponentProps<T, K> {
    editAccessRule: string
}

/**
 * Контейнер компонента вывода множественного поля поиска отношений
 */
class RelationWithSearchFieldContainer<T extends keyof Schemas, K extends keyof Schemas> extends React.Component<Props<T, K>> {
    /**
     * Мапит текущий Redux state в свойства компонента
     *
     * @param store
     * @param globalProperties
     */
    static mapStoreToProperties(
        store: ReduxStore,
        globalProperties: Partial<Props<keyof Schemas, keyof Schemas>>
    ): Partial<Props<keyof Schemas, keyof Schemas>> {
        const schema = (new Schemas())[globalProperties.targetSchema as keyof Schemas];
        const hasEditAccess = !!store.Authorization.user.permissions.find(p => p === globalProperties.editAccessRule);

        return {
            ...globalProperties,
            hasEditAccess: hasEditAccess,
            hasAddAccess: schema.isCreatable && hasEditAccess,
        }
    }

    /**
     * Условия рендера компонента
     * @param nextProps
     */
    shouldComponentUpdate(nextProps: Props<T, K>): boolean {
        return this.props.value !== nextProps.value
            || this.props.error !== nextProps.error
            || this.props.mainLangId !== nextProps.mainLangId
            || this.props.secondaryLangId !== nextProps.secondaryLangId
    }

    /**
     * Рендеринг компонента
     */
    render() {
        // @ts-ignore
        return (<RelationWithSearchFieldComponent {...this.props} />);
    }
}

// Подключаем Redux к странице
// @ts-ignore
export default connect(RelationWithSearchFieldContainer.mapStoreToProperties)(RelationWithSearchFieldContainer);