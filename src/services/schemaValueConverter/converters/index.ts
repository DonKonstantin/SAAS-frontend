import {SchemaValueConverterProcessor} from "./interfaces";
import {BooleanValueProcessor} from "./BooleanValueProcessor";
import {BooleanNotNullValueProcessor} from "./BooleanNotNullValueProcessor";
import {IntNotNullValueProcessor} from "./IntNotNullValueProcessor";
import {IntValueProcessor} from "./IntValueProcessor";
import {StringValueProcessor} from "./StringValueProcessor";
import {StringNotNullValueProcessor} from "./StringNotNullValueProcessor";
import {FloatNotNullValueProcessor} from "./FloatNotNullValueProcessor";
import {FloatValueProcessor} from "./FloatValueProcessor";
import {DateTimeValueProcessor} from "./DateTimeValueProcessor";
import {DateTimeNotNullValueProcessor} from "./DateTimeNotNullValueProcessor";
import {EnumValueNotNullProcessor} from "./EnumValueNotNullProcessor";
import {EnumValueProcessor} from "./EnumValueProcessor";
import {NullableIDProcessor} from "./NullableIDProcessor";

// Фабрика процессоров конвертации значений
export const schemaValueConverterProcessors: () => SchemaValueConverterProcessor[] = () => ([
    new BooleanValueProcessor(),
    new BooleanNotNullValueProcessor(),
    new IntNotNullValueProcessor(),
    new IntValueProcessor(),
    new StringValueProcessor(),
    new StringNotNullValueProcessor(),
    new FloatNotNullValueProcessor(),
    new FloatValueProcessor(),
    new DateTimeValueProcessor(),
    new DateTimeNotNullValueProcessor(),
    new EnumValueNotNullProcessor(),
    new EnumValueProcessor(),
    new NullableIDProcessor(),
])