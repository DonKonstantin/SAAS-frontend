import {ChooseVariant, FilterFieldProperties} from "../../../services/listDataLoader/filterLoader/types";
import React, {useCallback, useEffect, useState} from "react";
import {relationSearchService} from "../../../services/relationSearchService";
import {v4} from "uuid";
import {TextField, Tooltip} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";

// Компонент поля поиска для фильтра сущностей
const RelationAutocompleteSearch = (props: FilterFieldProperties<"RelationAutocompleteSearch", any, any>) => {
    const {
        configuration,
        onChange,
        preloaded,
        value,
    } = props;

    // Если у нас
    const variantsToDisplay = value.variants.length
        ? value.variants as ChooseVariant[]
        : preloaded.choseVariants
    ;

    let lastSearchId = {id: ""};
    const [searchString, setSearchString] = useState<string>("");
    const [options, setOptions] = useState<ChooseVariant[]>(variantsToDisplay);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Поиск сущностей по поисковой строке
    useEffect(() => {
        if (searchString.length === 0) {
            return
        }

        const id = v4();
        setIsLoading(true);
        lastSearchId.id = id;

        relationSearchService()
            .searchRelationsBySearchString(searchString, configuration)
            .then(result => {
                if (lastSearchId.id !== id) {
                    return
                }

                setIsLoading(false);
                setOptions([...variantsToDisplay, ...result]);
            })
        ;
    }, [searchString]);

    // Callback изменения поисковой строки
    const inputChangeCallback = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();

        setSearchString(e.target.value)
    }, []);

    return (
        <Tooltip
            title={`Показать элементы со значением поля "${props.configuration.title}", включающим выбранные значения`}>
            <Autocomplete
                id={`relation-filter-autocomplete-${props.configuration.field}`}
                options={options}
                getOptionLabel={(option) => option.title}
                getOptionSelected={(option, value) => option.key === value.key}
                value={value.variants as ChooseVariant[]}
                fullWidth
                multiple
                loading={isLoading}
                limitTags={1}
                noOptionsText={`Нет найденных значений`}
                closeText={`Закрыть`}
                clearText={`Очистить`}
                openText={`Открыть`}
                renderInput={(params) => <TextField {...params} label={configuration.title} variant="outlined"/>}
                onChange={(_, value) => {
                    onChange({
                        value: value.map(val => val.key),
                        variants: [...value],
                    })
                }}
                onInputChange={inputChangeCallback}
            />
        </Tooltip>
    );
};

// Экспортируем компонент
export default React.memo(RelationAutocompleteSearch, (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps)
});