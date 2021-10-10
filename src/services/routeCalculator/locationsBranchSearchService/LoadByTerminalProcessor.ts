import {_LocationsBranchServiceProcessorInterface, BranchItem} from "./interfaces";
import {SearchResult} from "../locationsAndTerminalSearchService/types";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {graphQLClient} from "../../graphQLClient";
import {LoadByLocationBranchProcessor} from "./LoadByLocationBranchProcessor";
import {TerminalByIdQuery, TerminalByIdQueryResult} from "./TerminalByIdQuery";

/**
 * Процессор получения ветки для терминала
 */
export class LoadByTerminalProcessor implements _LocationsBranchServiceProcessorInterface {
    private readonly client: GraphQLClient;
    private readonly loadByLocationProcessor: _LocationsBranchServiceProcessorInterface;

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.client = graphQLClient(token);
        this.loadByLocationProcessor = new LoadByLocationBranchProcessor(token);
    }

    /**
     * Поиск ветки локаций процессором
     * @param items
     */
    async GetBranch(items: SearchResult[]): Promise<BranchItem[]> {
        try {
            const resp = await this.client.Query<{ id: string[] }, TerminalByIdQueryResult>(
                new TerminalByIdQuery(items.map(i => i.id)),
                {}
            );

            if (0 === resp.transport_terminal_list.length) {
                return []
            }

            const parentBranch = await this.loadByLocationProcessor.GetBranch(resp.transport_terminal_list.map(term => ({
                id: term.location_id,
                type: "location",
            } as SearchResult)));

            const terminals = resp.transport_terminal_list.map(term => ({
                id: term.id,
                type: "terminal",
                visibleName: term.default_name,
                parentId: term.location_id,
                subItems: [],
                symbolCode: term.symbol_code,
                localizedNames: term.localized_names
            } as BranchItem));

            return [...parentBranch, ...terminals]
        } catch {
            return []
        }
    }

    /**
     * Проверка доступности процессора
     * @param type
     */
    isAvailable(type: "location" | "terminal"): boolean {
        return type === "terminal";
    }
}
