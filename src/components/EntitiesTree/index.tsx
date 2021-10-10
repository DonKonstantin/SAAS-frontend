import React from "react";
import {Schemas} from "../../settings/schema";
import ChildrenRowComponent, {Parameters} from "./ChildrenRow";
import {AdditionProps, ListFieldRow} from "../../services/listDataLoader/listLoader/types";


// Тип компонента строки дочерних сущностей
export type TTreeListComponent = React.ComponentType<AdditionProps<ListFieldRow<keyof Schemas>, any>>

// Фабрика компонента отображения дочерних сущностей
export const treeListComponent: {(params: Parameters<keyof Schemas>): TTreeListComponent} = params => {
    return class extends React.Component<AdditionProps<ListFieldRow<keyof Schemas>, any>> {
        render() {
            return (<ChildrenRowComponent {...this.props} level={0} params={params} />);
        }
    }
}