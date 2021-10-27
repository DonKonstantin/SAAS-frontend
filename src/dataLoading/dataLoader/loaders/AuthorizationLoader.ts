import {LoaderInterface} from "./interface";
import {initializeContextData, setDomain, setProject} from "../../../context/AuthorizationContext";
import Cookies from "universal-cookie";

// Тип, описывающий итоговые данные, загружаемые текущим загрузчиком
export type WithAuthorizationLoadedData = Partial<{
    token: string,
}>

/**
 * Загрузчик данных авторизации
 */
export class AuthorizationLoader implements LoaderInterface<WithAuthorizationLoadedData> {
    /**
     * Загрузка данных
     *
     * В качестве первого аргумента в загрузчик передаются данные о том, какие свойства уже загружены
     * в предыдущих загрузчиках. Это позволяет использовать данные для последовательной подгрузки
     * результатов.
     *
     * В качестве результата возвращается стандартный результат для getServerSideProps
     *
     */
    async LoadData(_: any, baseParameters: any): Promise<WithAuthorizationLoadedData> {
        let token = ""
        const {domainId, projectId} = baseParameters

        const cookie = new Cookies();
        if (typeof cookie.get('token') === "string") {
            token = cookie.get('token')
        }

        if (0 !== token.length) {
            await initializeContextData(token)

            if (domainId) {
                setDomain(domainId)
            }

            if (projectId) {
                setProject(projectId)
            }
        }

        return {
            token: token,
        }
    }

    /**
     * Получение приоритета текущего загрузчика.
     *
     * Чем он больше, тем дальше в очереди загрузчик. Приоритет необходимо учитывать в том случае,
     * когда требуется результат от другого загрузчика.
     */
    getPriority(): number {
        return 0;
    }
}