import {FilterField, FilterFieldComponents} from "../../../services/listDataLoader/filterLoader/types";
import ChooseGroupFilterField from "./ChooseGroup";
import {EqualsStringField} from "./EqualsStringField";
import {EqualsIntField} from "./EqualsIntField";
import {EqualsFloatField} from "./EqualsFloatField";
import {LikeField} from "./LikeField";
import IntegerSlider from "./IntegerSlider";
import FloatSlider from "./FloatSlider";
import DateTimeSlider from "./DateTimeSlider";
import VariantsSelector from "./VariantsSelector";
import RelationVariantsSelector from "./RelationVariantsSelector";
import {EnumSelectorField} from "./EnumSelector";
import RelationAutocompleteSelector from "./RelationAutocompleteSelector";
import RelationAutocompleteSearch from "./RelationAutocompleteSearch";

// Системные типы полей фильтрации
export const filterFieldComponents: { (): FilterFieldComponents } = () => {
    return new class implements FilterFieldComponents {
        Checkbox: FilterField = ChooseGroupFilterField;
        DateTimeSlider: FilterField = DateTimeSlider;
        EqualsFloat: FilterField = EqualsFloatField;
        EqualsInt: FilterField = EqualsIntField;
        EqualsString: FilterField = EqualsStringField;
        FloatSlider: FilterField = FloatSlider;
        IntegerSlider: FilterField = IntegerSlider;
        Like: FilterField = LikeField;
        RelationVariantsSelector: FilterField = RelationVariantsSelector;
        Switch: FilterField = ChooseGroupFilterField;
        VariantsSelectorFloat: FilterField = VariantsSelector;
        VariantsSelectorInt: FilterField = VariantsSelector;
        VariantsSelectorString: FilterField = VariantsSelector;
        EnumSelector: FilterField = EnumSelectorField;
        RelationAutocompleteSelector: FilterField = RelationAutocompleteSelector;
        RelationAutocompleteSearch: FilterField = RelationAutocompleteSearch;
    }
};