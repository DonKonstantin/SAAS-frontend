import {
    _LocationsBranchServiceProcessorInterface,
    BranchItem,
    LocationsBranchServiceInterface,
} from "./interfaces";
import {LocationsAndTerminalSearchServiceInterface, SearchResult} from "../locationsAndTerminalSearchService/types";
import {Logger, LoggerFactory} from "../../logger/Logger";

/**
 * Сервис поиска веток локаций по поисковому запросу
 */
export class LocationsBranchService implements LocationsBranchServiceInterface {
    private readonly locationsAndTerminalSearchService: LocationsAndTerminalSearchServiceInterface;
    private readonly processors: _LocationsBranchServiceProcessorInterface[];
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param locationsAndTerminalSearchService
     * @param processors
     * @param logger
     */
    constructor(
        locationsAndTerminalSearchService: LocationsAndTerminalSearchServiceInterface,
        logger: LoggerFactory,
        ...processors: _LocationsBranchServiceProcessorInterface[]
    ) {
        this.locationsAndTerminalSearchService = locationsAndTerminalSearchService;
        this.processors = processors;
        this.logger = logger.make(`LocationsBranchService`)
    }

    /**
     * Получение значения по переданному ID и типу сущности
     * @param id
     * @param type
     */
    async GetItemByValue(id: string, type: "location" | "terminal"): Promise<BranchItem> {
        const groupedBranches: { [T in "location" | "terminal"]: SearchResult[] } = {
            location: [],
            terminal: [],
        };

        groupedBranches[type].push({id: id, type: type});

        const item = (await this.getItemsByGroups(groupedBranches))
            .find(i => i.id === id && i.type === type)
        ;

        if (!item) {
            throw new Error(`failed to get value by passed parameters`)
        }

        return item
    }

    /**
     * Поиск веток по поисковой строке
     */
    async SearchBranches(searchString: string): Promise<BranchItem[]> {
        // ищем список вхождений по переданной строке поиска
        const baseItems = await this.locationsAndTerminalSearchService.SearchLocationsAndTerminals(searchString);
        this.logger.Debug(`SearchBranches() -> Loaded base items`, baseItems);

        const groupedBranches: { [T in "location" | "terminal"]: SearchResult[] } = {
            location: [],
            terminal: [],
        };

        baseItems.map(i => groupedBranches[i.type].push(i));

        const branches = await this.getItemsByGroups(groupedBranches);
        const result: BranchItem[] = [];

        baseItems.map(baseItem => {
            const item = branches.find(b => b.id === baseItem.id && b.type === baseItem.type);
            if (!item) {
                return
            }

            result.push(item)
        });

        return result;
    }

    /**
     * Получение веток для переданных групп значений поиска
     * @param groupedBranches
     */
    private async getItemsByGroups(groupedBranches: { [T in "location" | "terminal"]: SearchResult[] }): Promise<BranchItem[]> {
        const baseBranchItems = await Promise.all((Object.keys(groupedBranches) as ("location" | "terminal")[]).map(
            key => this.getBranchByProcessor(key, groupedBranches[key])
        ));

        this.logger.Debug(`SearchBranches() -> Loaded base branches`, baseBranchItems);

        // Объединяем все ветки в один большой массив
        const items: BranchItem[] = [];
        baseBranchItems.map(branchItems => {
            branchItems.map(i => {
                // исключаем дублирование
                const existsItem = items.find(ii => ii.id === i.id && ii.type === i.type);
                if (existsItem === undefined) {
                    items.push(i)
                }
            })
        });

        // Теперь пробуем собрать все элементы без родителя в итоговый результат
        // Элементы с родителями обрабатываем, добавляем их в родителей.
        // Так как объекты в JS передаются по ссылке, то по сути в итоговом результате
        // получим корректные ветки с заполненными дочерними элементами, причем, они будут
        // выстраиваться по релевантности, относительно главных родительских элементов
        const branches: BranchItem[] = [];

        items.map(item => {
            let parentId: string | null = item.parentId;

            while (parentId){
                // решаем проблему с идентичными ID для терминалов и локаций
                const parentItem = items.find(j => j.id === parentId && j.type === 'location') as BranchItem;
                item.subItems.push(parentItem);
                parentId = parentItem?.parentId;
            }

            branches.push(item)
        });

        return branches;
    }

    /**
     * Получение ветки для базового элемента при помощи процессоров
     * @param type
     * @param items
     */
    private async getBranchByProcessor(type: "location" | "terminal", items: SearchResult[]): Promise<BranchItem[]> {
        if (0 === items.length) {
            return []
        }

        const processor = this.processors.find(p => p.isAvailable(type));
        if (processor === undefined) {
            this.logger.Error(`getBranchByProcessor() -> None processor is found for type`, type);
            return []
        }

        return await processor.GetBranch(items)
    }
}
