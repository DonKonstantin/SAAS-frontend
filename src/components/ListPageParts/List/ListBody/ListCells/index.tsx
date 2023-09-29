import {ListFieldProperties, ListFieldValueTypes} from "../../../../../services/listDataLoader/listLoader/types";
import React, {FC} from "react";
import SimpleCell from "./SimpleCell";
import RelationCell from "./RelationCell";
import MultipleRelation from "./MultipleRelation";
import EnumCell from "./EnumCell";

// Свойства компонента
export type ListCellsProps<T extends keyof ListFieldValueTypes = keyof ListFieldValueTypes> = ListFieldProperties<any> & {
    fieldType: T;
}

// Общий компонент вывода ячейки
const ListCells: FC<ListCellsProps> = props => {
    const {
        configuration
    } = props;

    if (configuration.isHidden) {
        return null;
    }

    const {fieldType, ...other} = props
    switch (fieldType) {
        case "Simple":
            return <SimpleCell {...other}/>
        case "Enum":
            return <EnumCell {...other}/>
        case "MultipleRelation":
            return <MultipleRelation {...other}/>
        case "Relation":
            return <RelationCell {...other}/>
    }

    return null
}

// Экспортируем компонент
export default React.memo(ListCells, (prevProps, nextProps) => {
    return JSON.stringify(prevProps.value) === JSON.stringify(nextProps.value)
        && prevProps.fieldType === nextProps.fieldType
})
