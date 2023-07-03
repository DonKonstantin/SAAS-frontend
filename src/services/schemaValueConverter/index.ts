import {SchemaValueConverterInterface} from "./interfaces";
import {SchemaValueConverter} from "./SchemaValueConverter";
import {schemaValueConverterProcessors} from "./converters";

// Фабрика конвертера
export const schemaValueConverter: () => SchemaValueConverterInterface = (): SchemaValueConverterInterface => (
    new SchemaValueConverter(
        schemaValueConverterProcessors()
    )
)