import {ShoulderImportOfferConditionsConverterInterface} from "./interface";
import {ShoulderImportOfferConditionsConverter} from "./ShoulderImportOfferConditionsConverter";

// Фабрика конвертера
export const shoulderImportOfferConditionsConverter: {(): ShoulderImportOfferConditionsConverterInterface} = () => {
    return new ShoulderImportOfferConditionsConverter()
};