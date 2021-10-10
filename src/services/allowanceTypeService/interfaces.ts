import {AllowanceGroupData} from "../searchLoaders/allowanceGroupsLoader/AllowanceGroupLoaderQuery";

// Надбавка
export interface Allowance {
    id: string
    default_name: string
    allowance_group: AllowanceGroupData
    code: string
}

// Результат поискового запроса
export interface AllowanceSearchResult {
    id: string
    items: Allowance[]
}

/**
 * Сервис для работы с типами надбавок
 */
export interface AllowanceTypeServiceInterface {
    /**
     * Получение надбавок по переданным ID
     * @param ids
     */
    GetAllowances(ids: any[]): Promise<Allowance[]>

    /**
     * Поиск надбавок по названию
     * @param id
     * @param name
     */
    SearchAllowancesByName(id: string, name: string): Promise<AllowanceSearchResult>
}