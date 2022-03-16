import {LogsFilterParams} from "../../../services/systemLogsService/interface";

// Available field types in filter System Logs
export type AvailableFiledType = "MultiVariantEnumSelector" | "VariantEnumSelector" | "EqualString" | "EqualDate"

export type SystemLogsFilterFieldConfiguration<Multiple extends boolean, Code extends keyof LogsFilterParams = keyof LogsFilterParams> = {
    multiple?: Multiple,
    fieldType: AvailableFiledType,
    i18nextPath: string,
    fieldCode: Code,
    variants?: Record<any, LogsFilterParams[Code]>
}

export type SystemLogsFilterFieldProps = {
    fieldCode: keyof LogsFilterParams,
}
