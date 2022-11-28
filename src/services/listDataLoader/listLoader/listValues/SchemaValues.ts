import {Schemas} from "../../../../settings/schema";

export class SchemaValues<T extends keyof Schemas, isArray extends boolean> {
    value: isArray extends true ? Schemas[T][] : Schemas[T]
}