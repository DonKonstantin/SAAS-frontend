import {ValidatorFactory} from "../types";
import {EditFieldValidator, ValidationParams, ValidationResult} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";
import {TerminalLoadingUnloadingOfferData} from "../../../../custom/components/EditPage/Fields/LoadingUnloadingOfferField";
import {offerValidator} from "../offerConditionsValidator/offerValidator";
import {TerminalLoadingUnloadingOffersValidationResult} from "../../../../custom/components/TerminalLoadingUnloadingOffersConstructor/interfaces";

/**
 * Валидатор условий ценовых предложений
 */
export const TerminalLoadingUnloadingOffersValidator: ValidatorFactory<{}> = () => {
    return new class implements EditFieldValidator<keyof Schemas> {
        /**
         * Валидация условий ценовых предложений
         * @param params
         */
        async Validate(params: ValidationParams<keyof Schemas>): Promise<ValidationResult> {
            const data: TerminalLoadingUnloadingOfferData = JSON.parse(JSON.stringify(params.additionData));
            if (data.loadingUnloadingOffers.length === 0) {
                return JSON.stringify({error: "Необходимо добавить условия ПРР для погрузки на неизвестный тип транспорта, разгрузки с неизвестного типа транспорта и перегрузки с одного транспорта на другой"})
            }

            const loadingCondition = data.loadingUnloadingOffers.find(o => !o.is_loading_to_unknown_transport && !o.is_unloading_from_unknown_transport && ["loading_and_unloading", "loading"].indexOf(o.service_type) !== -1);
            if (!loadingCondition) {
                return JSON.stringify({error: "Не найдено условие погрузки или перегрузки для известных типов транспорта"})
            }

            const unloadingCondition = data.loadingUnloadingOffers.find(o => !o.is_loading_to_unknown_transport && !o.is_unloading_from_unknown_transport && ["loading_and_unloading", "unloading"].indexOf(o.service_type) !== -1);
            if (!unloadingCondition) {
                return JSON.stringify({error: "Не найдено условие разгрузки или перегрузки для известных типов транспорта"})
            }

            const unknownLoading = data.loadingUnloadingOffers.find(o => o.is_loading_to_unknown_transport && !o.is_unloading_from_unknown_transport);
            if (!unknownLoading) {
                return JSON.stringify({error: "Не найдено условие ПРР для погрузки на неизвестный тип транспорта"})
            }

            const unknownUnloading = data.loadingUnloadingOffers.find(o => !o.is_loading_to_unknown_transport && o.is_unloading_from_unknown_transport);
            if (!unknownUnloading) {
                return JSON.stringify({error: "Не найдено условие ПРР для разгрузки с неизвестного типа транспорта"})
            }

            const validator = offerValidator();
            const validationResultsPromises = data.loadingUnloadingOffers.map(async offer => {
                const offerConditions = offer.offer_conditions.length > 0 ? await validator.Validate(offer.offer_conditions): "[]";
                const loadingShoulders = !offer.is_loading_to_unknown_transport && offer.loading_shoulder_types.length === 0
                    ? `Небоходимо выбрать хотя бы один из вариантов`
                    : undefined
                ;
                const unloadingShoulders = !offer.is_unloading_from_unknown_transport && offer.unloading_shoulder_types.length === 0
                    ? `Небоходимо выбрать хотя бы один из вариантов`
                    : undefined
                ;

                if (!offerConditions && !loadingShoulders && !unloadingShoulders) {
                    return null
                }

                return {
                    offersValidation: offerConditions ? JSON.parse(offerConditions) : null,
                    allowanceValidation: [],
                    loadingShoulders: loadingShoulders,
                    unloadingShoulders: unloadingShoulders,
                } as TerminalLoadingUnloadingOffersValidationResult
            });

            const validationResults = await Promise.all(validationResultsPromises);
            const isError = validationResults.reduce((result: boolean, item: null | TerminalLoadingUnloadingOffersValidationResult): boolean => {
                return result || !!item;
            }, false);

            if (!isError) {
                return null;
            }

            return JSON.stringify(validationResults);
        }
    }
};