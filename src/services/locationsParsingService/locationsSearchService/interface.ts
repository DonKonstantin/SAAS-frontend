import {LocationToImport} from "../types";

/**
 * Тип, описывающий локацию, полученную со стороны сервера
 */
export type Location = {
    id: string
    import_id: string
}

/**
 * Сервис поиска локаций по переданным символьным кодам
 */
export interface LocationsSearchServiceInterface {
    /**
     * Поиск локаций по переданным ID импорта
     * @param id
     */
    SearchByImportId(id: string[]): Promise<Location[]>

    /**
     * Поиск локаций по переданному целевому полю
     * @param targetField
     * @param values
     */
    SearchByTargetField<T extends keyof LocationToImport>(targetField: T, values: string[]): Promise<({id: string, default_name: string} & {[K in T]: string})[]>
}