import {EntityParserInterface, ParsingResult, ProcessingResult} from "./interface";
import {
    Configurations,
    EntityParsingConfiguration,
    FieldConfigurationCollection,
    ImportParsingTypes
} from "../../../shoulderImportTaskService/baseTypes";
import {RowDataGetterInterface} from "../rowDataGetter/interface";
import {FieldValueBySettingsParserInterface} from "../fieldValueBySettingsParser/interfaces";
import {SubConfigurationParserInterface} from "../subConfigurationParser/interfaces";
import {Subject} from "rxjs";

/**
 * Сервис парсинга сущностей по переданной конфигурации
 */
export class EntityParser<Entities extends object,
    Key extends keyof Entities,
    Entity extends object,
    ParsingType extends ImportParsingTypes,
    SubEntityConfig extends { [SubKeys in keyof Entities]?: Configurations<Entities, SubKeys, object, ImportParsingTypes, any> }> implements EntityParserInterface<Entities, Key, Entity, ParsingType, SubEntityConfig> {
    private readonly rowDataGetter: RowDataGetterInterface;
    private readonly fieldValueBySettingsParser: FieldValueBySettingsParserInterface;
    private readonly subConfigurationParser: SubConfigurationParserInterface<Entities, Entity, SubEntityConfig>;
    private readonly fieldsConfigurationGetter: { (): FieldConfigurationCollection<Entity> };

    /**
     * Конструктор сервиса
     *
     * @param rowDataGetter
     * @param fieldValueBySettingsParser
     * @param subConfigurationParser
     * @param fieldsConfigurationGetter
     */
    constructor(
        rowDataGetter: RowDataGetterInterface,
        fieldValueBySettingsParser: FieldValueBySettingsParserInterface,
        subConfigurationParser: SubConfigurationParserInterface<Entities, Entity, SubEntityConfig>,
        fieldsConfigurationGetter: { (): FieldConfigurationCollection<Entity> },
    ) {
        this.rowDataGetter = rowDataGetter;
        this.fieldValueBySettingsParser = fieldValueBySettingsParser;
        this.subConfigurationParser = subConfigurationParser;
        this.fieldsConfigurationGetter = fieldsConfigurationGetter;
    }

    /**
     * Парсинг данных по переданным параметрам. Возвращает массив данных по сущностям
     * @param data
     * @param parentRow
     * @param parentValues
     * @param configuration
     */
    parseEntity(
        data: { [K in string]: string[][] },
        parentRow: string[],
        parentValues: object,
        configuration: EntityParsingConfiguration<Entities, Key, Entity, ParsingType, SubEntityConfig>,
    ): ProcessingResult<Entity> {
        const subject$ = new Subject<number>();
        const callback = async () => {
            const {
                parsingType,
                parsingConfig,
                settings,
                subConfiguration,
            } = configuration;

            // Результат обработки строки
            const result: ParsingResult<Entity> = {
                values: [],
            };

            // Получаем строки для импорта сущностей
            const rowsToImport = this.rowDataGetter.getRows(data, parentRow, parsingType, parsingConfig, parentValues);

            for (let i = 0; i < rowsToImport.length; i++) {
                const progress = Math.round(i / rowsToImport.length * 100);

                await new Promise(resolve => {
                    setTimeout(async () => {
                        const row = rowsToImport[i];

                        // Парсим базовые значения для полей сущности
                        const baseValues = await this.fieldValueBySettingsParser
                            .parse(data, row, settings, this.fieldsConfigurationGetter());

                        const subEntitiesValues = await this.subConfigurationParser.parse(
                            data,
                            row,
                            baseValues,
                            subConfiguration,
                        );

                        result.values.push({
                            ...baseValues,
                            ...subEntitiesValues.values,
                        });

                        resolve();
                    }, 50)
                });

                subject$.next(progress);
            }

            subject$.complete();

            return result;
        };

        return {
            callback,
            complete: subject$,
        }
    }
}