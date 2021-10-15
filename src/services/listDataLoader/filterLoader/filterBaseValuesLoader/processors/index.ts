import {AvailableFilterField} from "../../types";
import {FilterBaseValuesLoaderProcessor} from "./interfaces";
import {UndefinedBaseValuesLoader} from "./UndefinedBaseValuesLoader";
import {SliderBaseValuesLoader} from "./SliderBaseValuesLoader";
import {schemaValueConverter} from "../../../../schemaValueConverter";
import {VariantsBaseValuesLoader} from "./VariantsBaseValuesLoader";

// Коллекция базовых загрузчиков
export type BaseLoadProcessors = { [F in AvailableFilterField]: FilterBaseValuesLoaderProcessor<F> }
export const baseLoadProcessors: { (): BaseLoadProcessors } = (): BaseLoadProcessors => {
    const valueConverter = schemaValueConverter();
    return new class implements BaseLoadProcessors {
        Checkbox: FilterBaseValuesLoaderProcessor<"Checkbox"> = new UndefinedBaseValuesLoader();
        EqualsFloat: FilterBaseValuesLoaderProcessor<"EqualsFloat"> = new UndefinedBaseValuesLoader();
        EqualsInt: FilterBaseValuesLoaderProcessor<"EqualsInt"> = new UndefinedBaseValuesLoader();
        EqualsString: FilterBaseValuesLoaderProcessor<"EqualsString"> = new UndefinedBaseValuesLoader();
        FloatSlider: FilterBaseValuesLoaderProcessor<"FloatSlider"> = new SliderBaseValuesLoader(valueConverter);
        IntegerSlider: FilterBaseValuesLoaderProcessor<"IntegerSlider"> = new SliderBaseValuesLoader(valueConverter);
        Like: FilterBaseValuesLoaderProcessor<"Like"> = new UndefinedBaseValuesLoader();
        RelationVariantsSelector: FilterBaseValuesLoaderProcessor<"RelationVariantsSelector"> = new VariantsBaseValuesLoader(valueConverter);
        Switch: FilterBaseValuesLoaderProcessor<"Switch"> = new UndefinedBaseValuesLoader();
        VariantsSelectorFloat: FilterBaseValuesLoaderProcessor<"VariantsSelectorFloat"> = new VariantsBaseValuesLoader(valueConverter);
        VariantsSelectorInt: FilterBaseValuesLoaderProcessor<"VariantsSelectorInt"> = new VariantsBaseValuesLoader(valueConverter);
        VariantsSelectorString: FilterBaseValuesLoaderProcessor<"VariantsSelectorString"> = new VariantsBaseValuesLoader(valueConverter);
        EnumSelector: FilterBaseValuesLoaderProcessor<"EnumSelector"> = new UndefinedBaseValuesLoader();
        RelationAutocompleteSelector: FilterBaseValuesLoaderProcessor<"RelationAutocompleteSelector"> = new VariantsBaseValuesLoader(valueConverter);
    }
};