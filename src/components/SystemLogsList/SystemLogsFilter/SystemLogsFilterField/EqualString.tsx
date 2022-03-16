import {ChangeEvent, FC, useCallback} from "react";
import {SystemLogsFilterFieldProps} from "../types";
import {TextField} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useSystemLogsFilterEntity} from "../../SystemLogsEntityContext";
import {SystemLogsFilterConfiguration} from "../../systemLogsFilterConfiguration";

const EqualStringField: FC<SystemLogsFilterFieldProps> = props => {
    const {t} = useTranslation();
    const {
        fieldCode
    } = props;
    const filterState = useSystemLogsFilterEntity();
    const fieldConfig = SystemLogsFilterConfiguration[fieldCode];

    if (!fieldConfig) {
        return <></>;
    }

    const {
        i18nextPath,
    } = fieldConfig;

    const {setFilterField} = filterState;

    const fieldValue = filterState[fieldCode];

    const handleChangeFilterValue = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            const value = event.target.value;

            // @ts-ignore
            setFilterField(fieldCode, value);
        },
        [],
    );

    return (
        <TextField
            value={fieldValue}
            label={t(`${i18nextPath}.title`) as string}
            fullWidth
            variant="standard"
            autoComplete={"off"}
            placeholder={t(`${i18nextPath}.placeholder`) as string}
            onChange={handleChangeFilterValue}
        />
    )
}

export default EqualStringField
