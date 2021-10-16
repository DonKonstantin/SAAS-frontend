import React, {FC} from "react";
import {EditFieldProperties} from "../../../settings/pages/system/edit";
import useEntityEditField from "./useEntityEditField";
import {distinctUntilChanged} from "rxjs";
import {FormControlLabel, FormGroup, Switch} from "@mui/material";

// Компонент поля чекбокса
const SwitchField: FC<EditFieldProperties> = props => {
    const {fieldCode} = props
    const fieldData = useEntityEditField(fieldCode, distinctUntilChanged(
        (previous, current) => {
            return previous?.entityData?.values[fieldCode] === current?.entityData?.values[fieldCode]
                && previous?.validation[fieldCode] === current?.validation[fieldCode]
        }
    ))

    if (!fieldData) {
        return null
    }

    const {t, value, fieldConfig: {title, isVisible = () => true}, values, onChangeFieldValue} = fieldData
    if (!isVisible(values)) {
        return null
    }

    return (
        <FormGroup>
            <FormControlLabel
                color="primary"
                control={
                    <Switch
                        checked={!!value}
                        onChange={() => onChangeFieldValue(s => !s)}
                    />
                }
                label={t(title)}
            />
        </FormGroup>
    )
}

// Экспортируем компонент
export default React.memo(SwitchField, (prevProps, nextProps) => {
    return prevProps.fieldCode === nextProps.fieldCode
})