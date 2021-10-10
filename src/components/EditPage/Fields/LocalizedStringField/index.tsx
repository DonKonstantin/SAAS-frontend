import React from "react";
import {EditFieldProperties, EditValueType, EntityValues} from "../../../../settings/pages/system/edit";
import {Schemas} from "../../../../settings/schema";
import {TFieldsFactory} from "../interfaces";
import {
    createStyles,
    FormControl, FormHelperText, Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Theme,
    Tooltip, withStyles
} from "@material-ui/core";
import clsx from "clsx";
import RestoreOutlinedIcon from "@material-ui/icons/RestoreOutlined";
import {Collection} from "../../../../services/types";
import {LocalizedMessage} from "../../../../services/localizedMessagesService/interfaces";
import {localizedMessagesService} from "../../../../services/localizedMessagesService";
import {Language} from "../../../../reduxStore/stores/Languages";

// Настройки поля
export interface Params {
    field: string
    tooltip?: {(lang: string): string | React.ReactNode}
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    autoComplete?: string
}

// Поле ввода числового значения
export const LocalizedStringField: TFieldsFactory<Params> = (params: Params) => {

    if (!params.autoComplete) {
        params.autoComplete = "off"
    }

    // Стили компонента
    const styles = (theme: Theme) => createStyles({
        input: {
            padding: theme.spacing(2),
            paddingRight: 0,
            paddingLeft: 0,
        },
        inputWithoutPrefix: {
            paddingLeft: theme.spacing(2),
        },
        label: {
            transform: "translate(14px, 18px) scale(1)"
        }
    });

    // Свойства компонента
    interface ComponentProps extends EditFieldProperties<keyof Schemas, any> {
        classes: {
            input: string,
            label: string,
            inputWithoutPrefix: string,
        }
    }

    // Компонент вывода поля для ввода
    class Component extends React.Component<ComponentProps> {
        /**
         * Обработка изменения значения поля
         * @param message
         * @param value
         */
        handleChange(message: LocalizedMessage, value: string) {
            let messages: Collection<LocalizedMessage> = this.props.languages.reduce((result, lang) => ({
                ...result,
                [lang.id]: {
                    id: "",
                    lang_id: lang.id,
                    message: "",
                },
            }), {});
            messages = {...messages, ...this.props.additionData};
            messages[message.lang_id] = {...message, message: value};

            this.props.onAdditionDataChange(JSON.parse(JSON.stringify(messages)))
        }

        /**
         * Условия рендера компонента
         * @param nextProps
         */
        shouldComponentUpdate(nextProps: Readonly<EditFieldProperties<keyof Schemas, any>>): boolean {
            const data = JSON.stringify(this.props.additionData || {});
            const nextData = JSON.stringify(nextProps.additionData || {});

            return data !== nextData || this.props.secondaryLangId !== nextProps.secondaryLangId || this.props.mainLangId !== nextProps.mainLangId|| this.props.error !== nextProps.error
        }

        /**
         * Обработка сброса значения
         * @param message
         */
        async handleResetDefault(message: LocalizedMessage) {
            let value: EditValueType;
            if (typeof this.props.configuration.defaultValue === "function") {
                value = await this.props.configuration.defaultValue({values: this.props.values, additionData: this.props.additionData})
            } else {
                value = this.props.configuration.defaultValue
            }

            let messages: Collection<LocalizedMessage> = this.props.languages.reduce((result, lang) => ({
                ...result,
                [lang.id]: {
                    id: "",
                    lang_id: lang.id,
                    message: "",
                },
            }), {});
            messages = {...messages, ...this.props.additionData};
            messages[message.lang_id] = {...message, message: `${value}`};

            this.props.onAdditionDataChange(JSON.parse(JSON.stringify(messages)))
        }

        /**
         * Рендеринг поля компонента
         */
        renderField(lang: Language, message: LocalizedMessage) {
            let startAdornment: React.ReactNode = null;
            if (params.prefix) {
                startAdornment = (
                    <InputAdornment position="start">
                        {params.prefix}
                    </InputAdornment>
                )
            }

            return (
                <FormControl variant="outlined" fullWidth>
                    <InputLabel
                        error={!!this.props.error}
                        classes={{outlined: this.props.classes.label}}
                    >{this.props.configuration.title} ({lang.name})</InputLabel>
                    <OutlinedInput
                        type={'text'}
                        classes={{
                            input: this.props.classes.input,
                            root: clsx({[this.props.classes.inputWithoutPrefix]: !startAdornment})
                        }}
                        label={(<div>{this.props.configuration.title} ({lang.name})</div>)}
                        value={message.message}
                        error={!!this.props.error}
                        fullWidth
                        startAdornment={startAdornment}
                        autoComplete={params.autoComplete}
                        endAdornment={
                            <InputAdornment position="end">
                                {params.suffix}
                                <Tooltip arrow title={`Восстановить значение по умолчанию`}>
                                    <IconButton
                                        size={`small`}
                                        color={!!this.props.error ? `secondary` : `primary`}
                                        onClick={() => this.handleResetDefault(message)}
                                        edge="end"
                                    >
                                        <RestoreOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        }
                        onChange={e => this.handleChange(message, (e.target as HTMLInputElement).value)}
                    />
                    {!!this.props.error && (
                        <FormHelperText error>{this.props.error}</FormHelperText>
                    )}
                </FormControl>
            )
        }

        /**
         * Рендеринг компонента
         */
        render() {
            const isWithTooltip = !!params.tooltip;
            let messages: Collection<LocalizedMessage> = this.props.languages.reduce((result, lang) => ({
                ...result,
                [lang.id]: {
                    id: "",
                    lang_id: lang.id,
                    message: "",
                },
            }), {});
            messages = {...messages, ...this.props.additionData};

            const primaryLang = this.props.languages.find(lang => lang.id === this.props.mainLangId);
            const secondaryLang = this.props.languages.find(lang => lang.id === this.props.secondaryLangId);

            return (
                <Grid container spacing={2}>
                    {!!primaryLang && (
                        <Grid item xs={12}>
                            {isWithTooltip && (
                                <Tooltip title={`${params.tooltip ? params.tooltip(primaryLang.name) : ""}`}>
                                    <div>
                                        {this.renderField(primaryLang, messages[primaryLang.id])}
                                    </div>
                                </Tooltip>
                            )}
                            {!isWithTooltip && this.renderField(primaryLang, messages[primaryLang.id])}
                        </Grid>
                    )}
                    {!!secondaryLang && (
                        <Grid item xs={12}>
                            {isWithTooltip && (
                                <Tooltip title={`${params.tooltip ? params.tooltip(secondaryLang.name) : ""}`}>
                                    <div>
                                        {this.renderField(secondaryLang, messages[secondaryLang.id])}
                                    </div>
                                </Tooltip>
                            )}
                            {!isWithTooltip && this.renderField(secondaryLang, messages[secondaryLang.id])}
                        </Grid>
                    )}
                </Grid>
            )
        }
    }

    // Подключаем стили к компоненту
    return {
        component: withStyles(styles)(Component),

        // Подгружаем локализованные сообщения
        additionData: async (values: EntityValues<any>, _: any, token?: string): Promise<any> => {
            // @ts-ignore
            const fieldIds: string[] = values[params.field];
            return await localizedMessagesService(token).GetMessages(fieldIds)
        },

        // Копируем сообщения. По факту просто сбрасываем у них ID.
        onCopyValue: async (
            _: any,
            value: EditValueType,
            __: EditValueType,
            additionData: any,
        ): Promise<{value: EditValueType, additionData: any}> => {
            if (!Array.isArray(value) || value.length === 0) {
                return {value: value, additionData: additionData}
            }

            const messages: Collection<LocalizedMessage> = {};
            const currentMessages: Collection<LocalizedMessage> = additionData;
            Object.values(currentMessages).map(msg => {
                messages[msg.lang_id] = {...msg, id: ""}
            });

            return {value: [], additionData: messages}
        },

        // Сохраняем локализованные сообщения
        onBeforeSave: async (
            _: EditValueType,
            values: EntityValues<any>,
            additionData: any,
        ): Promise<EntityValues<any>> => {
            const currentMessages: Collection<LocalizedMessage> = additionData;
            const storedMessages = await localizedMessagesService().StoreMessages(currentMessages);

            values[params.field] = Object.values(storedMessages).map(msg => msg.id);
            return values
        }
    }
};