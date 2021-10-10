import {LanguagesLoaderInterface} from "./interfaces";
import {LanguagesStore} from "../../reduxStore/stores/Languages";
import {loggerFactory} from "../logger";
import {GraphQLClient} from "../graphQLClient/GraphQLClient";
import {graphQLClient} from "../graphQLClient";
import {LanguagesQuery, LanguagesResponse} from "./LanguagesQuery";

/**
 * Загрузчик данных по языкам
 */
export class LanguagesLoader implements LanguagesLoaderInterface {
    private logger = loggerFactory().make(`LanguagesLoader`)
    private client: GraphQLClient

    /**
     * Конструктор сервиса
     * @param token
     */
    constructor(token?: string) {
        this.client = graphQLClient(token)
    }

    /**
     * Загрузка данных по языкам
     */
    async Load(): Promise<LanguagesStore> {
        try {
            let result: LanguagesStore = {
                languages: [],
                primaryLangId: "",
                secondaryLangId: "",
            }

            const response = await this.client.Query<null, LanguagesResponse>(new LanguagesQuery(), {})
            result.languages = response.lang

            const defaultLang = response.lang.find(lang => lang.is_default)
            const secondaryDefaultLang = response.lang.find(lang => lang.is_secondary_default_for_admin)

            if (defaultLang) {
                result.primaryLangId = defaultLang.id
            }

            if (secondaryDefaultLang) {
                result.secondaryLangId = secondaryDefaultLang.id
            }

            this.logger.Debug(`Loaded languages`, result)

            return result
        } catch (e) {
            this.logger.Error(`Some error occurred`, e)
            return {
                languages: [],
                primaryLangId: "",
                secondaryLangId: "",
            }
        }
    }
}