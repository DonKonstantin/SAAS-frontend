import React, {FC} from "react";
import {EditFieldProperties} from "../../../settings/pages/system/edit";
import useEntityEditField from "./useEntityEditField";
import {distinctUntilChanged} from "rxjs";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";

// Компонент поля чекбокса
const CheckboxField: FC<EditFieldProperties> = props => {
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
                    <Checkbox
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
export default React.memo(CheckboxField, (prevProps, nextProps) => {
    return prevProps.fieldCode === nextProps.fieldCode
})