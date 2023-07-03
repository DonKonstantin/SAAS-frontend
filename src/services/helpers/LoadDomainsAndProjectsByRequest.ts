import {BaseContext, NextPageContext} from "next/dist/shared/lib/utils";
import {allDomainsAndProjectsLoader} from "../loaders/allDomainsAndProjects";
import GetToken from "./GetToken";

/**
 * LoadDomainsAndProjectsByRequest обеспечивает загрузку идентификатора домена и дочерних проектов
 * по параметрам запроса. Используется для вывода в разделах меню, уровня "Домен"
 *
 * @param request
 */
const LoadDomainsAndProjectsByRequest = async <C extends BaseContext = NextPageContext>(request: C): Promise<string[]> => {
    const token = GetToken(request)
    if (0 === token.length) {
        return []
    }

    const {query} = request
    const allProjects = await allDomainsAndProjectsLoader(token).Load()
    return [
        query.domainId as string,
        ...allProjects.projects.filter(p => `${p.parent}` === `${query.domainId}`).map(p => p.id),
    ]
}

// Экспортируем эелпер
export default LoadDomainsAndProjectsByRequest