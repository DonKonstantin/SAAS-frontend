import {AvailableFilterField} from "../../types";
import {FilterValueLoaderProcessor} from "./interfaces";
import {SimpleValueProcessor} from "./SimpleValueProcessor";
import {SliderProcessor} from "./SliderProcessor";
import {VariantsProcessor} from "./VariantsProcessor";

// Коллекция загрузчиков значений
export type ValueLoadProcessors = {[F in AvailableFilterField]: FilterValueLoaderProcessor<F>}
export const valueLoadProcessors: {(): ValueLoadProcessors} = (): ValueLoadProcessors => {
    return new class implements ValueLoadProcessors {
        Checkbox: FilterValueLoaderProcessor<"Checkbox"> = new SimpleValueProcessor<"Checkbox">();
        EqualsFloat: FilterValueLoaderProcessor<"EqualsFloat"> = new SimpleValueProcessor<"EqualsFloat">();
        EqualsInt: FilterValueLoaderProcessor<"EqualsInt"> = new SimpleValueProcessor<"EqualsInt">();
        EqualsString: FilterValueLoaderProcessor<"EqualsString"> = new SimpleValueProcessor<"EqualsString">();
        FloatSlider: FilterValueLoaderProcessor<"FloatSlider"> = new SliderProcessor<"FloatSlider">();
        IntegerSlider: FilterValueLoaderProcessor<"IntegerSlider"> = new SliderProcessor<"IntegerSlider">();
        Like: FilterValueLoaderProcessor<"Like"> = new SimpleValueProcessor<"Like">();
        RelationVariantsSelector: FilterValueLoaderProcessor<"RelationVariantsSelector"> = new VariantsProcessor<"RelationVariantsSelector">();
        Switch: FilterValueLoaderProcessor<"Switch"> = new SimpleValueProcessor<"Switch">();
        VariantsSelectorFloat: FilterValueLoaderProcessor<"VariantsSelectorFloat"> = new VariantsProcessor<"VariantsSelectorFloat">();
        VariantsSelectorInt: FilterValueLoaderProcessor<"VariantsSelectorInt"> = new VariantsProcessor<"VariantsSelectorInt">();
        DateTimeRange: FilterValueLoaderProcessor<"DateTimeRange"> = new SliderProcessor<"DateTimeRange">();
        VariantsSelectorString: FilterValueLoaderProcessor<"VariantsSelectorString"> = new VariantsProcessor<"VariantsSelectorString">();
        EnumSelector: FilterValueLoaderProcessor<"EnumSelector"> = new SimpleValueProcessor<"EnumSelector">();
        RelationAutocompleteSelector: FilterValueLoaderProcessor<"RelationAutocompleteSelector"> = new VariantsProcessor<"RelationAutocompleteSelector">();
    }
}
