/**
 * Интерфейс загрузчика данных
 */
export interface LoaderInterface<K extends object> {
    /**
     * Загрузка данных
     * @param primaryKeys
     */
    Load(primaryKeys: any[]): Promise<K>
}