import {GraphQlSchemaValueConverterInterface} from "./interfaces";
import {GraphQlSchemaValueConverter} from "./GraphQlSchemaValueConverter";
import {schemaValueConverter} from "../schemaValueConverter";

// Фабрика конвертера
export const graphQlSchemaValueConverter: () => GraphQlSchemaValueConverterInterface = () => (
    new GraphQlSchemaValueConverter(
        schemaValueConverter()
    )
)