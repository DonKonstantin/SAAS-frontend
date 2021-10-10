import {QueryGeneratorInterface} from "./interfaces";
import {TreeQueryGenerator} from "./TreeQueryGenerator";
import {loggerFactory} from "../../logger";
import {fieldParsers} from "../../listDataLoader/listLoader/queryGenerator/fieldParsers";
import {graphQlSchemaValueConverter} from "../../graphQlSchemaValueConverter";

export const queryGenerator: {(token?: string): QueryGeneratorInterface} = (token?: string): QueryGeneratorInterface => (
    new TreeQueryGenerator(
        graphQlSchemaValueConverter(),
        loggerFactory(),
        fieldParsers(token),
    )
)