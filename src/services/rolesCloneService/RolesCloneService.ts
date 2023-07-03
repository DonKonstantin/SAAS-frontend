import {RolesCloneServiceInterface} from "./interface";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {graphQLClient} from "../graphQLClient";
import {RoleCopyData, RolesLoadingQuery, RolesLoadingQueryResponse} from "./RolesLoadingQuery";
import {RoleInsertQuery} from "./RoleInsertQuery";

/**
 * Сервис клонирования ролей
 */
export class RolesCloneService implements RolesCloneServiceInterface {
    private readonly client: GraphQLClient

    /**
     * Конструктор
     */
    constructor() {
        this.client = graphQLClient()
    }

    /**
     * Клонирование переданного списка ролей
     * @param roleIds
     */
    async CloneRoles(roleIds: string[]): Promise<void> {
        if (0 === roleIds.length) {
            return
        }

        const {result: roles} = await this.client.Query<{ ids: string[] }, RolesLoadingQueryResponse>(
            new RolesLoadingQuery(roleIds),
            {}
        )

        roles.map(role => {
            role.name = `Copy ${role.name}`
        })

        await this.client.Mutation<{ roles: RoleCopyData[] }, void>(
            new RoleInsertQuery(roles),
            {}
        )
    }
}