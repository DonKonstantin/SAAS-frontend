import {QueryGeneratorInterface} from "./interfaces";
import {QueryGenerator} from "./QueryGenerator";
import {filterGenerator} from "./filterGenerator";
import {loggerFactory} from "../../../logger";
import {fieldParsers} from "./fieldParsers";
import {schemaValueConverter} from "../../../schemaValueConverter";

export const queryGenerator: {(token?: string): QueryGeneratorInterface} = (token?: string): QueryGeneratorInterface => (
    new QueryGenerator(
        filterGenerator(),
        schemaValueConverter(),
        loggerFactory(),
        fieldParsers(token),
    )
)