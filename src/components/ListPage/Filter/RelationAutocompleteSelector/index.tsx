import {FilterFieldProperties} from "../../../../services/listDataLoader/filterLoader/types";
import {TextField, Tooltip} from "@material-ui/core";
import React from "react";
import {Autocomplete} from "@material-ui/lab";


/**
 * Компонент вариантного поля фильтрации для отношений (с автодополнением)
 */
class RelationAutocompleteSelector extends React.Component<FilterFieldProperties<"RelationAutocompleteSelector", any, any>> {
    render() {
        const currentValues = this.props.preloaded.choseVariants.filter(variant => {
            return !!this.props.value.value.find(val => variant.key === val)
        });

        return (
            <Tooltip title={`Показать элементы со значением поля "${this.props.configuration.title}", включающим выбранные значения`}>
                <Autocomplete
                    id={`relation-filter-autocomplete-${this.props.configuration.field}`}
                    options={this.props.preloaded.choseVariants}
                    getOptionLabel={(option) => option.title}
                    value={currentValues}
                    fullWidth
                    multiple
                    limitTags={1}
                    noOptionsText={`Нет найденных значений`}
                    closeText={`Закрыть`}
                    clearText={`Очистить`}
                    openText={`Открыть`}
                    renderInput={(params) => <TextField {...params} label={this.props.configuration.title} variant="outlined" />}
                    onChange={(_, value) => {
                        this.props.onChange({
                            value: value.map(val => typeof val === "string" ? val : val.key),
                            variants: this.props.value.variants,
                        })
                    }}
                />
            </Tooltip>
        );
    }
}

// Подключаем стили к компоненту
export default RelationAutocompleteSelector