import {BaseShoulderImportParsingServiceInterface, ParsingResult, ProcessingResult} from "./interfaces";
import {Configurations, ImportParsingTypes} from "../../shoulderImportTaskService/baseTypes";
import {EntityParserInterface} from "./entityParser/interface";
import {bufferTime} from "rxjs/operators";
import {Subject} from "rxjs";

/**
 * Сервис базового парсинга данных импорта
 */
export class BaseShoulderImportParsingService<
    Entities extends object,
    Key extends keyof Entities,
    Entity extends object,
    ParsingType extends ImportParsingTypes,
    SubEntityConfig extends {[SubKeys in keyof Entities]?: Configurations<Entities, SubKeys, object, ImportParsingTypes, any>}
> implements BaseShoulderImportParsingServiceInterface<Entities, Key, Entity, ParsingType, SubEntityConfig> {
    private readonly entityParser: EntityParserInterface<Entities, Key, Entity, ParsingType, SubEntityConfig>;

    /**
     * Конструктор сервиса
     * @param entityParser
     */
    constructor(entityParser: EntityParserInterface<Entities, Key, Entity, ParsingType, SubEntityConfig>) {
        this.entityParser = entityParser;
    }

    /**
     * Парсинг сырых данных для формирования базового списка плеч
     * @param data
     * @param parentRow
     * @param parentValues
     * @param configuration
     */
    parseData(
        data: { [K in string]: string[][] },
        parentRow: string[],
        parentValues: object,
        configuration: Configurations<Entities, Key, Entity, ParsingType, SubEntityConfig>,
    ): ProcessingResult<Entity> {
        const subject$ = new Subject<number>();
        const callback = async () => {
            const result: ParsingResult<Entity> = {values: []};
            const {configuration: configs} = configuration;

            const processedData: ParsingResult<Entity>[] = [];

            for (let i = 0; i < configs.length; i++) {
                const alreadyProcessedByPrevConf = i * 100;
                const conf = configs[i];

                const {callback, complete} = this.entityParser.parseEntity(data, parentRow, parentValues, conf);
                const subscription = complete.pipe(bufferTime(100)).subscribe({
                    next: value => {
                        if (0 === value.length) {
                            return
                        }

                        subject$.next(alreadyProcessedByPrevConf + value[value.length - 1])
                    }
                });

                processedData.push(await callback());

                subscription.unsubscribe();
            }

            for (let data of processedData) {
                result.values.push(...data.values)
            }

            subject$.complete();

            return result
        };

        return {
            callback,
            complete: subject$,
        }
    }
}