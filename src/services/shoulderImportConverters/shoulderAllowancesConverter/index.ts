import {ShoulderAllowanceConverterInterface} from "./interface";
import {ShoulderAllowanceConverter} from "./ShoulderAllowanceConverter";
import {shoulderImportOfferConditionsConverter} from "../shoulderImportOfferConditionsConverter";

// Фабрика сервиса
export const shoulderAllowanceConverter: {(): ShoulderAllowanceConverterInterface} = () => {
    return new ShoulderAllowanceConverter(shoulderImportOfferConditionsConverter())
};