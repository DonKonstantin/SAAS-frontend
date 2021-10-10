import {OfferConditionFillServiceInterface} from "./interfaces";
import {UnitGroupData} from "../searchLoaders/unitGroupsLoader/UnitGroupLoaderQuery";
import {UnitData} from "../searchLoaders/unitLoader/UnitLoaderQuery";
import {OfferConditionFillService} from "./OfferConditionFillService";

/**
 * Фабрика сервиса
 * @param unitGroups
 * @param units
 */
export const offerConditionFillService: {(unitGroups: UnitGroupData[], units: UnitData[]): OfferConditionFillServiceInterface} = (
    unitGroups: UnitGroupData[],
    units: UnitData[],
) => {
    return new OfferConditionFillService(unitGroups, units)
}