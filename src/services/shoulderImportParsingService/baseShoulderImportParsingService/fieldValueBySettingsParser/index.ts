import {FieldValueBySettingsParserInterface} from "./interfaces";
import {FieldValueBySettingsParser} from "./FieldValueBySettingsParser";
import {FieldSingleValueParser} from "./FieldSingleValueParser";
import {NoneProcessor} from "./NoneProcessor";
import {UuidProcessor} from "./UuidProcessor";
import {FixedValueProcessor} from "./FixedValueProcessor";
import {CellProcessor} from "./CellProcessor";
import {ColumnProcessor} from "./ColumnProcessor";
import {ColumnProcessorWithNullableTerminal} from "./ColumnProcessorWithNullableTerminal";
import {CellProcessorWithNullableTerminal} from "./CellProcessorWithNullableTerminal";

// Конструктор сервиса
export const fieldValueBySettingsParser: {(): FieldValueBySettingsParserInterface} = () => {
    return new FieldValueBySettingsParser(
        new FieldSingleValueParser(
            new NoneProcessor(),
            new UuidProcessor(),
            new FixedValueProcessor(),
            new CellProcessor(),
            new ColumnProcessor(),
            new ColumnProcessorWithNullableTerminal(),
            new CellProcessorWithNullableTerminal(),
        ),
    );
};