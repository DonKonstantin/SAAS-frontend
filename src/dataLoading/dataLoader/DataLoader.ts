import {DataLoaderInterface} from "./interface";
import {LoaderInterface} from "./loaders/interface";

/**
 * Сервис для загрузки данных
 *
 * Основное предназначение: загрузить наборы данных, необходимых для отображения страницы.
 * Может по сути вызываться в getServerSideProps страниц.
 *
 * Логика работы:
 * 1) Происходит формирование приоритезированных списков всех загрузчиков на основе приоритета загрузчика (метод)
 * 2) Приоритеты сортируются от минимального к максимальному
 * 3) Группы, отсортированные по приоритету загружаются последовательно, при этом загрузчики внутри групп
 *    загружаются параллельно
 * 4) Для всех загрузчиков результаты объединяются в единый итоговый результат
 *
 * Результат работы: Данные, возвращенные загрузчиками - складываются
 */
export class DataLoader<P extends { [key: string]: any } = { [key: string]: any }> implements DataLoaderInterface<P> {
    private readonly loaders: LoaderInterface<P>[]

    /**
     * Конструктор сервиса
     * @param loaders
     */
    constructor(...loaders: LoaderInterface<P>[]) {
        this.loaders = loaders;
    }

    /**
     * Загрузка данных для страниц
     * @param baseParameters
     */
    async LoadData(baseParameters: P): Promise<P> {
        const priorityMap: { [T in number]: LoaderInterface<P>[] } = {}
        const priority: number[] = []

        this.loaders.map(loader => {
            if (!priorityMap[loader.getPriority()]) {
                priorityMap[loader.getPriority()] = []
            }

            priorityMap[loader.getPriority()].push(loader)
            if (!priority.includes(loader.getPriority())) {
                priority.push(loader.getPriority())
            }
        })

        // Сортируем приоритеты по возрастанию
        priority.sort((a, b) => a - b)

        let result = {} as P
        for (let p of priority) {
            result = (await Promise.all(priorityMap[p].map(i => i.LoadData(result, baseParameters))))
                .reduce((previousValue, currentValue) => {
                    return {...previousValue, ...currentValue}
                })
        }

        return result
    }
}