// Сущность локации для загрузки ветки
export interface LocationBranchData {
    children: number[]
    default_name: string
    id: string
    import_id: string
    is_country: boolean
    is_user_searchable: boolean
    latitude: number
    localized_names: string[]
    longitude: number
    parent: number | null
    populated_area: boolean
    population: number
    search_tags: string[]
    symbol_code: string
}

// Интерфейс сервиса загрузки ветки для переданных локаций
export interface LocationsBranchLoaderInterface {
    /**
     * Загрузка данных веток
     * @param id
     */
    Load(id: string[]): Promise<LocationBranchData[]>
}