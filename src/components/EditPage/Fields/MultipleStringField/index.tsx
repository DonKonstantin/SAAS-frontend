import React, {useCallback, useEffect, useRef, useState} from "react";
import {EditFieldProperties} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";
import {TFieldsFactory} from "../interfaces";
import {Button, Grid, Tooltip} from "@mui/material";
import SingleStringRowComponent from "./SingleStringRowComponent";
import AddIcon from '@mui/icons-material/Add';

// Настройки поля
export interface Params {
    tooltip?: string | React.ReactNode
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    autoComplete?: string
}

// Поле ввода числового значения
export const MultipleStringField: TFieldsFactory<Params> = (params: Params = {}) => {

    // Свойства компонента
    interface ComponentProps extends EditFieldProperties<keyof Schemas, any> {

    }

    return {
        component: React.memo(
            (props: ComponentProps) => {
                const {value, onChange} = props;
                const currentValues = value as string[];

                const [stateValue, setStateValue] = useState(currentValues.length > 0 ? currentValues : [""]);
                const isMounted = useRef(false);
                const timeout = useRef<NodeJS.Timeout | undefined>(undefined);

                // Пробрасываем изменения значений сверху
                useEffect(() => {
                    if (JSON.stringify(stateValue) === JSON.stringify(value)) {
                        return;
                    }

                    const currentValues = value as string[];
                    setStateValue(currentValues.length > 0 ? currentValues : [""]);
                }, [value]);

                // Запрещаем отправку изменений в центральный state при размонтировании
                // и устанавливаем дефолтное значение, если оно не корректно
                useEffect(() => {
                    if (currentValues.length <= 0) {
                        onChange([""]);
                    }

                    isMounted.current = true;
                    return () => {
                        isMounted.current = false;
                    }
                }, []);

                // Отправленяем изменения в центральный стор
                useEffect(() => {
                    if (JSON.stringify(stateValue) === JSON.stringify(value)) {
                        return;
                    }

                    timeout.current && clearTimeout(timeout.current);
                    timeout.current = setTimeout(() => {
                        if (!isMounted.current) {
                            return;
                        }

                        onChange(stateValue)
                    }, 500);

                }, [stateValue]);

                // Обработчик добавления нового значения
                const handleAddNewValue = useCallback((e: React.ChangeEvent<unknown>) => {
                    e.persist();

                    setStateValue(values => ([...values, ""]));
                }, []);

                return (
                    <Grid container spacing={1}>
                        {stateValue.map((val, i) => (
                            <Grid item xs={12} key={`container-${i}`}>
                                <SingleStringRowComponent
                                    key={i}
                                    index={i}
                                    {...props}
                                    {...params}
                                    value={val}
                                    isDeletable={stateValue.length > 1}
                                    onChange={setStateValue}
                                />
                            </Grid>
                        ))}
                        <Grid item>
                            <Tooltip title={"Добавить новое значение"}>
                                <Button
                                    color="primary"
                                    startIcon={<AddIcon/>}
                                    onClick={handleAddNewValue}
                                >
                                    Добавить строку
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                )
            },
            (prevProps, nextProps) => {
                return JSON.stringify(prevProps) === JSON.stringify(nextProps)
            },
        ),
    };
};