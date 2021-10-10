import {LoadingParams, StoreLoader} from "../system";
import {ReduxStore} from "../../ReduxStore";
import {DeepPartial} from "../../../services/types";
import {AuthServiceInterface} from "../../../services/authService/interfaces";
import {authService} from "../../../services/authService";
import {Logger} from "../../../services/logger/Logger";
import {loggerFactory} from "../../../services/logger";
import {DefaultAuthorization} from "../../reducers/defaults";

/**
 * Загрузчик данных авторизации пользователя
 */
export class AuthorizationLoader implements StoreLoader<"Authorization"> {

    private readonly authService: AuthServiceInterface
    private readonly logger: Logger

    /**
     * Конструктор сервиса
     */
    constructor() {
        this.authService = authService()
        this.logger = loggerFactory().make(`AuthorizationLoader`)
    }

    /**
     * Загрузка данных пользователя
     * @param params
     */
    async Load({token}: LoadingParams): Promise<DeepPartial<ReduxStore["Authorization"]>> {
        const user = await this.authService.GetUserInfo(token)
        if (undefined === user) {
            this.logger.Error(`Failed to load user info`)

            return new DefaultAuthorization()
        }

        return {
            token: token,
            user: user,
        }
    }
}