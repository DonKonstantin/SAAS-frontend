import {QueryGeneratorInterface} from "./interface";
import {QueryGenerator} from "./QueryGenerator";
import {fieldParsers} from "../../listDataLoader/listLoader/queryGenerator/fieldParsers";
import {schemaValueConverter} from "../../schemaValueConverter";
import {loggerFactory} from "../../logger";

// Фабрика сервиса
export const queryGenerator: {(): QueryGeneratorInterface} = () => {
    return new QueryGenerator(
        fieldParsers(),
        schemaValueConverter(),
        loggerFactory(),
    );
};