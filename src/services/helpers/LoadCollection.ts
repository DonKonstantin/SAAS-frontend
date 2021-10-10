// Тип, описывающий промежуточный результат загрузки объекта коллекции
type Response<T extends object, K extends keyof T> = {
    key: K,
    result: T[K],
}

type LoadCollection<T extends object> = {[K in keyof T]: Promise<T[K]>}

/**
 * Массовая загрузка для коллекции промисов.
 * Загружает их и возвращает итоговый результат в виде коллекции результатов.
 *
 * @param collection
 */
export async function LoadCollection<T extends object>(collection: LoadCollection<T>): Promise<T> {
    const promises = (Object.keys(collection) as (keyof T)[]).map(async (key: keyof T) => {
        const result = await collection[key];
        return <Response<T, keyof T>>{
            key: key,
            result: result,
        }
    });

    return (await Promise.all(promises)).reduce((result: T, response: Response<T, keyof T>): T => {
        return {
            ...result,
            [response.key]: response.result,
        }
    }, {} as T)
}