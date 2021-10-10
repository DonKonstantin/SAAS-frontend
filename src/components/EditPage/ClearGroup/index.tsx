import React from "react";
import {
    EditValueType,
    EntityValues, Sizes,
    ValidationResult
} from "../../../settings/pages/system/edit";
import {Schemas} from "../../../settings/schema";
import {Grid} from "@material-ui/core";
import {GroupProps} from "../DefaultGroup";

// Компонент вывода группы полей формы без оформления
class ClearGroup extends React.Component<GroupProps> {
    /**
     * Обработка изменения значения полей
     *
     * @param i
     * @param field
     * @param value
     */
    handleChangeValue<T extends keyof Schemas>(i: number, field: keyof Schemas[T]['fields'], value: EditValueType) {
        const values: EntityValues<T> = JSON.parse(JSON.stringify(this.props.values));
        values[field] = value;

        this.props.onChange(values);
        this.handleResetValidation(i)
    }

    /**
     * Обработка изменений дополнительных данных полей
     *
     * @param i
     * @param data
     */
    handleChangeAdditionData(i: number, data: any) {
        const additionValues: (any | null)[] = JSON.parse(JSON.stringify(this.props.additionData));
        additionValues[i] = data;

        this.props.onAdditionDataChange(additionValues);
        this.handleResetValidation(i)
    }

    /**
     * Сброс результатов валидации для поля
     * @param i
     */
    handleResetValidation(i: number) {
        if (!this.props.validationResults[i]) {
            return
        }

        const validation: ValidationResult[] = JSON.parse(JSON.stringify(this.props.validationResults));
        validation[i] = null;

        this.props.onChangeValidationResults(validation)
    }

    render() {
        let sizes: Sizes = {xs: 12};
        if (this.props.configuration.sizes) {
            if (typeof this.props.configuration.sizes === "function") {
                sizes = this.props.configuration.sizes(this.props.values)
            } else {
                sizes = this.props.configuration.sizes
            }
        }

        return (
            <Grid item {...sizes}>
                <Grid container spacing={2}>
                    {this.props.configuration.fields.map((field, i) => {
                        if (field.isVisible && !field.isVisible(this.props.values)) {
                            return null
                        }

                        let sizes: Sizes = {xs: 12};
                        if (field.size) {
                            if (typeof field.size === "function") {
                                sizes = field.size(this.props.values)
                            } else {
                                sizes = field.size
                            }
                        }

                        const Component = field.component;
                        return (
                            <Grid item key={`field-${i}`} {...sizes}>
                                <Component
                                    primaryKey={this.props.primaryKey}
                                    value={this.props.values[field.field]}
                                    values={this.props.values}
                                    error={this.props.validationResults[i]}
                                    configuration={field}
                                    additionData={this.props.additionData[i]}
                                    onChange={val => this.handleChangeValue(i, field.field, val)}
                                    onAdditionDataChange={data => this.handleChangeAdditionData(i, data)}
                                    mainLangId={this.props.mainLangId}
                                    secondaryLangId={this.props.secondaryLangId}
                                    languages={this.props.languages}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        );
    }
}

// Подключаем стили к компоненту
export default ClearGroup