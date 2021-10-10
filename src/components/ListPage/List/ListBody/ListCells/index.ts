import {ListFieldTypes} from "../../../../../services/listDataLoader/listLoader/types";
import {SimpleCell} from "./Simple";
import {MultipleRelationCell} from "./MultipleRelation";
import {RelationCell} from "./Relation";
import {EnumCell} from "./EnumCell";

// Компоненты для отображения ячеек
export const listCells: {(): ListFieldTypes} = (): ListFieldTypes => ({
    Simple: SimpleCell,
    Relation: RelationCell,
    MultipleRelation: MultipleRelationCell,
    Enum: EnumCell,
    Hidden: () => null
});