import {_LocationsBranchServiceProcessorInterface, BranchItem} from "./interfaces";
import {SearchResult} from "../locationsAndTerminalSearchService/types";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {graphQLClient} from "../../graphQLClient";
import {BranchForLocationQuery, BranchForLocationQueryResult} from "./BranchForLocationQuery";

/**
 * Процессор подбора ветки локаций по дочерней найденной локации
 */
export class LoadByLocationBranchProcessor implements _LocationsBranchServiceProcessorInterface {
    private readonly client: GraphQLClient;

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    /**
     * Поиск ветки локаций процессором
     * @param items
     */
    async GetBranch(items: SearchResult[]): Promise<BranchItem[]> {
        try {
            const resp = await this.client.Query<{ id: string[] }, BranchForLocationQueryResult>(
                new BranchForLocationQuery(items.map(i => i.id)),
                {}
            );
            return resp.getLocationsWithParents.map(value => {
                return {
                    id: value.location.id,
                    type: "location",
                    visibleName: value.location.default_name,
                    parentId: value.location.parent !== null ? `${value.location.parent}` : null,
                    subItems: [],
                    symbolCode: value.location.symbol_code,
                    localizedNames: value.location.localized_names
                } as BranchItem
            });
        } catch {
            return []
        }
    }

    /**
     * Проверка доступности процессора
     * @param type
     */
    isAvailable(type: "location" | "terminal"): boolean {
        return type === "location";
    }
}
