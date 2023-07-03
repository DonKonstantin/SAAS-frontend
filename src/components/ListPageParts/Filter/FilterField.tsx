import React, {FC} from "react";
import {FilterFieldProperties} from "../../../services/listDataLoader/filterLoader/types";
import {distinctUntilChanged} from "rxjs";
import useFieldConfiguration from "./useFieldConfiguration";
import EqualsIntField from "./EqualsIntField";
import EqualsFloatField from "./EqualsFloatField";
import EqualsStringField from "./EqualsStringField";
import LikeField from "./LikeField";
import IntegerSlider from "./IntegerSlider";
import FloatSlider from "./FloatSlider";
import VariantsSelector from "./VariantsSelector";
import RelationVariantsSelector from "./RelationVariantsSelector";
import RelationAutocompleteSelector from "./RelationAutocompleteSelector";
import ChooseGroup from "./ChooseGroup";
import EnumSelector from "./EnumSelector";
import DateTimeRangeField from "../../ListPageCustom/DateTimeRangeField";

// Компонент поля фильтра. Отображает конечное поле по переданному коду
const FilterField: FC<FilterFieldProperties> = props => {
    const {fieldCode} = props
    const fieldConfiguration = useFieldConfiguration(
        fieldCode,
        distinctUntilChanged((previous, current) => previous.data?.schema === current.data?.schema)
    )

    if (!fieldConfiguration) {
        return null
    }

    const {fieldConfig: {filterType, customComponent: Component}} = fieldConfiguration
    if (!!Component) {
        return <Component fieldCode={fieldCode}/>
    }

    switch (filterType) {
        case "EqualsInt":
            return <EqualsIntField {...props} />
        case "EqualsFloat":
            return <EqualsFloatField {...props} />
        case "EqualsString":
            return <EqualsStringField {...props} />
        case "Like":
            return <LikeField {...props} />
        case "IntegerSlider":
            return <IntegerSlider {...props} />
        case "FloatSlider":
            return <FloatSlider {...props} />
        case "VariantsSelectorInt":
            return <VariantsSelector {...props} />
        case "VariantsSelectorFloat":
            return <VariantsSelector {...props} />
        case "VariantsSelectorString":
            return <VariantsSelector {...props} />
        case "RelationVariantsSelector":
            return <RelationVariantsSelector {...props} />
        case "RelationAutocompleteSelector":
            return <RelationAutocompleteSelector {...props} />
        case "Checkbox":
            return <ChooseGroup {...props} />
        case "Switch":
            return <ChooseGroup {...props} />
        case "EnumSelector":
            return <EnumSelector {...props} />
        case "DateTimeRange":
            return <DateTimeRangeField {...props} />
    }

    return null
}

// Экспортируем компонент поля фильтра
export default React.memo(FilterField, (prevProps, nextProps) => {
    return prevProps.fieldCode === nextProps.fieldCode
})
