import {FilterFieldComponents} from "../../../../filterLoader/types";
import {FilterGeneratorProcessor} from "./interfaces";
import {NumericSliderProcessor} from "./NumericSliderProcessor";
import {CheckboxSwitchProcessor} from "./CheckboxSwitchProcessor";
import {EqualsProcessor} from "./EqualsProcessor";
import {LikeProcessor} from "./LikeProcessor";
import {VariantsProcessor} from "./VariantsProcessor";
import {StringSliderProcessor} from "./StringSliderProcessor";

// Фабрика процессоров
export type FilterGeneratorProcessors = { [P in keyof FilterFieldComponents]: FilterGeneratorProcessor<P> }
export const filterGeneratorProcessors: { (): FilterGeneratorProcessors } = () => {
    return new class implements FilterGeneratorProcessors {
        Checkbox: FilterGeneratorProcessor<"Checkbox"> = new CheckboxSwitchProcessor;
        EqualsFloat: FilterGeneratorProcessor<"EqualsFloat"> = new EqualsProcessor;
        EqualsInt: FilterGeneratorProcessor<"EqualsInt"> = new EqualsProcessor;
        EqualsString: FilterGeneratorProcessor<"EqualsString"> = new EqualsProcessor;
        FloatSlider: FilterGeneratorProcessor<"FloatSlider"> = new NumericSliderProcessor;
        IntegerSlider: FilterGeneratorProcessor<"IntegerSlider"> = new NumericSliderProcessor;
        Like: FilterGeneratorProcessor<"Like"> = new LikeProcessor;
        RelationVariantsSelector: FilterGeneratorProcessor<"RelationVariantsSelector"> = new VariantsProcessor;
        Switch: FilterGeneratorProcessor<"Switch"> = new CheckboxSwitchProcessor;
        VariantsSelectorFloat: FilterGeneratorProcessor<"VariantsSelectorFloat"> = new VariantsProcessor;
        VariantsSelectorInt: FilterGeneratorProcessor<"VariantsSelectorInt"> = new VariantsProcessor;
        VariantsSelectorString: FilterGeneratorProcessor<"VariantsSelectorString"> = new VariantsProcessor;
        EnumSelector: FilterGeneratorProcessor<"EnumSelector"> = new EqualsProcessor;
        RelationAutocompleteSelector: FilterGeneratorProcessor<"RelationAutocompleteSelector"> = new VariantsProcessor;
        DateTimeRange: FilterGeneratorProcessor<"DateTimeRange"> = new StringSliderProcessor;
    }
};
