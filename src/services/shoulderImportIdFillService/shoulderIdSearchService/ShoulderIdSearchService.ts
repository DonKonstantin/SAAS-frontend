import {ShoulderIdSearchServiceInterface} from "./interface";
import {Shoulder} from "../../shoulderImportTaskService/shoulderTypes";
import {Values} from "../../shoulderImportParsingService/baseShoulderImportParsingService/fieldValueBySettingsParser/interfaces";
import {GraphQLClient} from "../../graphQLClient/GraphQLClient";
import {Logger, LoggerFactory} from "../../logger/Logger";
import {ShoulderIdSearchServiceQuery, ShoulderIdSearchServiceQueryResponse, Vars} from "./ShoulderIdSearchServiceQuery";

/**
 * Сервис поиска плеча по переданным параметрам
 */
export class ShoulderIdSearchService implements ShoulderIdSearchServiceInterface {
    private readonly client: GraphQLClient;
    private readonly logger: Logger;

    /**
     * Конструктор сервиса
     * @param client
     * @param logger
     */
    constructor(client: GraphQLClient, logger: LoggerFactory) {
        this.client = client;
        this.logger = logger.make(`ShoulderIdSearchService`);
    }

    /**
     * Поиск первого доступного плеча для переданных параметров
     * @param shoulder
     */
    async searchShoulder(shoulder: Values<Shoulder>): Promise<string | null> {
        try {
            if (!!shoulder.id.value) {
                return shoulder.id.value
            }

            const response = await this.client.Query<Vars, ShoulderIdSearchServiceQueryResponse>(
                new ShoulderIdSearchServiceQuery({
                    shoulder_type: shoulder.shoulder_type.value,
                    carrier_id: shoulder.carrier_id.value,
                    contractor_id: shoulder.contractor_id.value,
                }),
                {},
            );

            const validationData = this.getDataForValidation(shoulder);
            const validShoulders = response.result.filter(shoulder => {
                return validationData === this.getDataForValidationByClearShoulder(shoulder)
            });

            if (0 === validShoulders.length) {
                return null;
            }

            return validShoulders[0].id
        } catch (e) {
            this.logger.Error(`Some error occurred`, e);
            return null
        }
    }

    /**
     * Получение данных для валидации плеча
     * @param shoulder
     */
    private getDataForValidation(shoulder: Values<Shoulder>): string {
        return this.getDataForValidationByClearShoulder({
            from_location_ids: shoulder.from_location_ids.value,
            from_terminal_ids: shoulder.from_terminal_ids.value,
            to_location_ids: shoulder.to_location_ids.value,
            to_terminal_ids: shoulder.to_terminal_ids.value,
        })
    }

    /**
     * Получение данных для сравнения по чистым параметрам плеча
     * @param shoulder
     */
    private getDataForValidationByClearShoulder(shoulder:  {
        from_location_ids: string[]
        from_terminal_ids: string[]
        to_location_ids: string[]
        to_terminal_ids: string[]
    }): string {
        return JSON.stringify([
            shoulder.from_location_ids,
            shoulder.from_terminal_ids,
            shoulder.to_location_ids,
            shoulder.to_terminal_ids,
        ])
    }
}