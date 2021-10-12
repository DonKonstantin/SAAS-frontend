import React from "react";
import {FilterFieldProperties} from "../../../../services/listDataLoader/filterLoader/types";
import {FormControl, InputLabel, MenuItem, Select, Tooltip} from "@mui/material";
import {SchemaField, Schemas} from "../../../../settings/schema";

/**
 * Поле фильтрации строкового значения
 */
export class EnumSelectorField extends React.Component<FilterFieldProperties<"EnumSelector", any, any>> {
    schemas = new Schemas();

    /**
     * Рендеринг компонента
     */
    render() {
        // @ts-ignore
        const field: SchemaField = this.schemas[this.props.configuration.schema].fields[this.props.configuration.field];

        return (
            <Tooltip title={`Фильтрация по полному соответствию значения поля "${this.props.configuration.title}"`}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel
                        id={`label-for-filter-select-${this.props.configuration.field}`}>{this.props.configuration.title}</InputLabel>
                    <Select
                        labelId={`label-for-filter-select-${this.props.configuration.field}`}
                        id={`filter-select-${this.props.configuration.field}`}
                        value={this.props.value.value ? this.props.value.value : "--none--"}
                        color={`primary`}
                        // onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                        //     let val: SimpleComponentValue<string | null> = {value: null};
                        //     if (event.target.value) {
                        //         val.value = event.target.value as string;
                        //         if (val && val.value === "--none--") {
                        //             val.value = null
                        //         }
                        //     }
                        //
                        //     this.props.onChange(val)
                        // }}
                        label={this.props.configuration.title}
                    >
                        <MenuItem value={"--none--"}>
                            Все варианты
                        </MenuItem>
                        {!!field.enum && Object.keys(field.enum.variants).map(key => (
                            <MenuItem key={`variant-${key}`} value={key}>{field.enum?.variants[key]}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Tooltip>
        );
    }
}