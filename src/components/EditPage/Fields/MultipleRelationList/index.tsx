import {Schemas} from "../../../../settings/schema";
import React from "react";
import {TFieldsFactory} from "../interfaces";
import {EditFieldProperties, EntityValues} from "../../../../settings/pages/system/edit";
import {relationVariantsDataLoader} from "../../../../services/relationVariantsDataLoader";
import {Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, Tooltip} from "@material-ui/core";
import RestoreOutlinedIcon from "@material-ui/icons/RestoreOutlined";
import {ResetDefaultValueForField} from "../../../../services/helpers/ResetDefaultValueForField";

// Настройки поля
export interface Params<T extends keyof Schemas> {
    tooltip?: string | React.ReactNode              // Подсказка при наведении на поле
    schema: T,                                      // Схема GraphQL, для которой строится поле
    primaryKey: keyof Schemas[T]['fields'],         // Первичный ключ, который будет использоваться как значение поля
    captionFields: (keyof Schemas[T]['fields'])[],  // Набор полей для загрузки, будет участвовать в отображении названия варианта выбора. Может содержать первичный ключ
    captionGenerator: {(option: any): string}       // Генератор названия варианта выбора.
}

// Поле ввода числового значения
export const MultipleRelationList: TFieldsFactory<Params<keyof Schemas>> = (
    params: Params<keyof Schemas> = {
        captionFields: [],
        captionGenerator: (option) => Object.values(option).join(", "),
        //@ts-ignore
        schema: undefined,
        //@ts-ignore
        primaryKey: undefined,
    }
) => {
    // Компонент вывода поля для ввода
    class Component extends React.Component<EditFieldProperties<keyof Schemas, any>> {
        /**
         * Обработка изменения флага одного из значений
         *
         * @param state
         * @param item
         * @param items
         */
        handleChange(state: boolean, item: any, items: any[]) {
            if (state) {
                this.props.onChange([...items, item]);
                return
            }

            this.props.onChange([...items].filter(val => val !== item))
        }

        /**
         * Условия рендера компонента
         * @param nextProps
         */
        shouldComponentUpdate(nextProps: Readonly<EditFieldProperties<keyof Schemas, any>>): boolean {
            const data = JSON.stringify(this.props.value || {});
            const nextData = JSON.stringify(nextProps.value || {});

            return data !== nextData|| this.props.error !== nextProps.error
        }

        /**
         * Рендеринг поля
         */
        renderField() {
            const values = Array.isArray(this.props.value) ? this.props.value : [this.props.value];
            return (
                <FormControl variant="outlined" fullWidth>
                    <div className={`edit-page-multiple-relation-list-field`}>
                        <div className={`edit-page-multiple-relation-list-field-caption`}>{this.props.configuration.title}</div>
                        <div className={`edit-page-multiple-relation-list-field-list`}>
                            <div>
                                <Grid container spacing={1}>
                                    {this.props.additionData.map((item: any) => {
                                        const caption = params.captionGenerator(item);
                                        return (
                                            <Grid item xs={12} key={`boolean-${this.props.configuration.field}-${item.primaryKey}`}>
                                                <FormControlLabel
                                                    classes={{
                                                        label: `label`
                                                    }}
                                                    control={
                                                        <Checkbox
                                                            classes={{
                                                                colorPrimary: `checkbox`
                                                            }}
                                                            size="small"
                                                            checked={values.indexOf(item.primaryKey) !== -1}
                                                            onChange={e => this.handleChange(e.target.checked, item.primaryKey, values)}
                                                            name={`boolean-${this.props.configuration.field}-${item.primaryKey}`}
                                                            color="primary"
                                                        />
                                                    }
                                                    label={caption}
                                                />
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            </div>
                            <div>
                                <Tooltip title={`Восстановить значение по умолчанию`}>
                                    <IconButton
                                        size={`small`}
                                        color={!!this.props.error ? `secondary` : `primary`}
                                        onClick={() => ResetDefaultValueForField({
                                            configuration: this.props.configuration,
                                            values: this.props.values,
                                            additionData: this.props.additionData,
                                            onSetValue: this.props.onChange,
                                        })}
                                        edge="end"
                                    >
                                        <RestoreOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    {!!this.props.error && (
                        <FormHelperText error>{this.props.error}</FormHelperText>
                    )}
                </FormControl>
            );
        }

        /**
         * Рендеринг компонента
         */
        render() {
            const isWithTooltip = !!params.tooltip && (typeof params.tooltip !== "string" || params.tooltip.length > 0);
            return (
                <React.Fragment>
                    {isWithTooltip && (
                        <Tooltip title={params.tooltip ? params.tooltip : ``}>
                            {this.renderField()}
                        </Tooltip>
                    )}
                    {!isWithTooltip && this.renderField()}
                </React.Fragment>
            )
        }
    }

    return {
        component: Component,
        additionData: async (_: EntityValues<any>, __: any, token?: string) => await relationVariantsDataLoader(token).Load({
            schema: params.schema,
            primaryKey: params.primaryKey,
            captionFields: params.captionFields,
        })
    }
};