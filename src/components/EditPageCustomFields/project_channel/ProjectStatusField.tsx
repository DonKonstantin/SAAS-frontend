import React, {FC} from "react";
import {EditFieldProperties} from "../../../settings/pages/system/edit";
import {distinctUntilChanged} from "rxjs";
import {FormControl, FormControlLabel, FormGroup, Radio, RadioGroup} from "@mui/material";
import useEntityEditField from "../../EditPage/Fields/useEntityEditField";

// Компонент поля чекбокса
const ProjectStatusField: FC<EditFieldProperties> = props => {
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

    const {t, value, fieldConfig: {isVisible = () => true}, values, onChangeFieldValue} = fieldData
    if (!isVisible(values)) {
        return null
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeFieldValue(() => (event.target as HTMLInputElement).value === 'true')
    };

    return (
        <FormGroup>
            <FormControl>
                <RadioGroup
                    row
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel
                        color="primary"
                        value={true}
                        control={<Radio/>}
                        label={t('pages.project_channel.edit.fields.enum.is-active.enabled')}
                    />
                    <FormControlLabel
                        color="primary"
                        value={false}
                        control={<Radio/>}
                        label={t('pages.project_channel.edit.fields.enum.is-active.disabled')}
                    />
                </RadioGroup>
            </FormControl>
        </FormGroup>
    )
}

// Экспортируем компонент
export default React.memo(ProjectStatusField, (prevProps, nextProps) => {
    return prevProps.fieldCode === nextProps.fieldCode
})