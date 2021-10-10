import {Schemas} from "../../../settings/schema";
import {ListPageConfiguration} from "../../../settings/pages/system/list";
import React from "react";
import {listSubscriptionService} from "../../../services/listSubscriptionService";
import {ListFieldRow} from "../../../services/listDataLoader/listLoader/types";
import {Unsubscribable} from "rxjs/internal/types";

// Свойства компонента
interface SubscriptionProps<T extends keyof Schemas> {
    schema: T
    configuration: ListPageConfiguration<T>
    onEntityChange: {(eventType: "updated" | "deleted", changedRow: ListFieldRow<T>): void}
}

/**
 * Компонент подписки на изменение
 */
class SubscriptionComponent<T extends keyof Schemas> extends React.Component<SubscriptionProps<T>> {
    private subscription: Unsubscribable | undefined;

    /**
     * Подписка на события изменения
     */
    componentDidMount(): void {
        const schema = (new Schemas())[this.props.schema];
        if (!schema.subscriptionKey) {
            return
        }

        this.subscription = listSubscriptionService().SubscribeToChanges(
            this.props.schema,
            this.props.onEntityChange,
        );
    }

    /**
     * Отписка от событий
     */
    componentWillUnmount(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

    /**
     * Заглушка для рендеринга
     */
    render() {
        return null
    }
}

export default SubscriptionComponent