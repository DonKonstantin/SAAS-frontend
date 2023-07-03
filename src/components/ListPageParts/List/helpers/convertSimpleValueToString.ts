import {SchemaField, Schemas} from "../../../../settings/schema";
import {ListFieldConfiguration} from "../../../../services/listDataLoader/listLoader/types";
import {SimpleValues} from "../../../../services/listDataLoader/listLoader/listValues/SimpleValues";

export default function convertSimpleValueToString<T extends keyof Schemas, K extends keyof Schemas[T]['fields']>(
    schema: T,
    config: ListFieldConfiguration<T, K>,
    value: SimpleValues
): string {
    const schemas = new Schemas();
    // @ts-ignore
    const field: SchemaField = schemas[schema].fields[config.field];

    switch (field.type) {
        case "Boolean":
            if (value.value === false) {
                return "Нет"
            }
            return value.value ? "Да" : "-";
        case "Boolean!":
            return value.value ? "Да" : "Нет";
        case "DateTime!":
        case "DateTime":
            if (value.value) {
                let date: Date = value.value;
                if (typeof value.value === "string") {
                    date = new Date(value.value)
                }

                const year = date.getFullYear();
                const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
                const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
                const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
                const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
                const second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

                return `${day}-${month}-${year} ${hour}:${minute}:${second}`
            }

            return ``;
        default:
            if (value) {
                return `${value.value}`
            }

            return ``
    }
}