import {SetUserPasswordServiceInterface} from "./interfaces";
import {graphQLClient} from "../graphQLClient";
import {SetPasswordQuery} from "./SetPasswordQuery";

/**
 * Сервис установки пароля пользователя
 */
export class SetUserPasswordService implements SetUserPasswordServiceInterface {
    private readonly client = graphQLClient()

    /**
     * Установка пароля пользователя
     * @param userId
     * @param password
     */
    async SetPassword(userId: string, password: string): Promise<void> {
        await this.client.Mutation(new SetPasswordQuery(userId, password), {})
    }
}