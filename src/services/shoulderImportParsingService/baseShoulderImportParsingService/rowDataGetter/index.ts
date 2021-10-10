import {RowDataGetterInterface} from "./interface";
import {RowDataGetter} from "./RowDataGetter";
import {RowInSheetProcessor} from "./RowInSheetProcessor";
import {PartOfParentRowProcessor} from "./PartOfParentRowProcessor";
import {FixedValueProcessor} from "./FixedValueProcessor";
import {RowInSheetWithRelationProcessor} from "./RowInSheetWithRelationProcessor";

// Коснтруктор сервиса
export const rowDataGetter: {(parentIdFieldKey: string): RowDataGetterInterface} = parentIdFieldKey => {
    return new RowDataGetter(
        new RowInSheetProcessor(),
        new PartOfParentRowProcessor(),
        new FixedValueProcessor(),
        new RowInSheetWithRelationProcessor(parentIdFieldKey),
    )
};