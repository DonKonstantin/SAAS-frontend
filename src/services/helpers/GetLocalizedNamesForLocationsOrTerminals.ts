import {LocationTerminalOption} from "../../custom/hoc/LocationTerminalSearch/LocationTerminalSearch";
import {LocalizedMessage} from "../localizedMessagesService/interfaces";
import {getLocalization} from "./getLocalization";

/**
 * Получение локализованных названий
 * @param value
 * @param messages
 * @param primaryLang
 * @param secondaryLang
 */
export const GetLocalizedNamesForLocationsOrTerminals = (
    value: LocationTerminalOption,
    messages: LocalizedMessage[],
    primaryLang: string,
    secondaryLang: string,
) => {
    const localizations = value.subItems.map(item => ({
        primaryLang: getLocalization(item.visibleName, messages.filter(m => item.localizedNames.includes(m.id)), primaryLang),
        secondaryLang: getLocalization(item.visibleName, messages.filter(m => item.localizedNames.includes(m.id)), secondaryLang),
    }));

    const primaryNames = [
        getLocalization(value.visibleName, messages.filter(m => value.localizedNames.includes(m.id)), primaryLang),
        ...localizations.map(l => l.primaryLang),
    ];

    const secondaryNames = [
        getLocalization(value.visibleName, messages.filter(m => value.localizedNames.includes(m.id)), secondaryLang),
        ...localizations.map(l => l.secondaryLang),
    ];

    const [parent] = value.subItems;
    const symbolCode = value.type === "terminal" ? parent.symbolCode : value.symbolCode;

    return {primaryNames, secondaryNames, symbolCode}
};
