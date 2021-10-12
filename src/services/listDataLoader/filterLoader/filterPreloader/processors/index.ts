import {FilterPreloaderProcessorInterface, FilterPreloaderProcessors} from "./interfaces";
import {RelationPreloader} from "./RelationPreloader";
import {graphQLClient} from "../../../../graphQLClient";
import {SkipPreloader} from "./SkipPreloader";
import {loggerFactory} from "../../../../logger";
import {SearchPreloader} from "./SearchPreloader";

export const filterPreloaderProcessors: { (token?: string): FilterPreloaderProcessors } = (): FilterPreloaderProcessors => {
    return new class implements FilterPreloaderProcessors {
        Checkbox: FilterPreloaderProcessorInterface<"Checkbox"> = new SkipPreloader();
        DateTimeSlider: FilterPreloaderProcessorInterface<"DateTimeSlider"> = new SkipPreloader();
        EqualsFloat: FilterPreloaderProcessorInterface<"EqualsFloat"> = new SkipPreloader();
        EqualsInt: FilterPreloaderProcessorInterface<"EqualsInt"> = new SkipPreloader();
        EqualsString: FilterPreloaderProcessorInterface<"EqualsString"> = new SkipPreloader();
        FloatSlider: FilterPreloaderProcessorInterface<"FloatSlider"> = new SkipPreloader();
        IntegerSlider: FilterPreloaderProcessorInterface<"IntegerSlider"> = new SkipPreloader();
        Like: FilterPreloaderProcessorInterface<"Like"> = new SkipPreloader();
        RelationVariantsSelector: FilterPreloaderProcessorInterface<"RelationVariantsSelector"> = new RelationPreloader(graphQLClient(), loggerFactory());
        Switch: FilterPreloaderProcessorInterface<"Switch"> = new SkipPreloader();
        VariantsSelectorFloat: FilterPreloaderProcessorInterface<"VariantsSelectorFloat"> = new SkipPreloader();
        VariantsSelectorInt: FilterPreloaderProcessorInterface<"VariantsSelectorInt"> = new SkipPreloader();
        VariantsSelectorString: FilterPreloaderProcessorInterface<"VariantsSelectorString"> = new SkipPreloader();
        EnumSelector: FilterPreloaderProcessorInterface<"EnumSelector"> = new SkipPreloader();
        RelationAutocompleteSelector: FilterPreloaderProcessorInterface<"RelationAutocompleteSelector"> = new RelationPreloader(graphQLClient(), loggerFactory());
        RelationAutocompleteSearch: FilterPreloaderProcessorInterface<"RelationAutocompleteSearch"> = new SearchPreloader(graphQLClient(), loggerFactory());
    }
};