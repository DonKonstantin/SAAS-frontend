import {AllowanceOfferValidatorInterface} from "./interface";
import {AllowanceOfferValidator} from "./AllowanceOfferValidator";
import {AllowanceIdValidator} from "./AllowanceIdValidator";
import {InvoiceValidator} from "./InvoiceValidator";
import {OffersValidator} from "./OffersValidator";
import {offerConditionValidator} from "../offerConditionValidator";
import {IdNormalizer} from "./IdNormalizer";

// Фабрика валидатора
export const allowanceOfferValidator: {(): AllowanceOfferValidatorInterface} = () => {
    return new AllowanceOfferValidator(
        new AllowanceIdValidator,
        new InvoiceValidator,
        new OffersValidator(offerConditionValidator()),
        new IdNormalizer(),
    );
};