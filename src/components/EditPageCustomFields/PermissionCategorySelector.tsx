import React, {FC} from "react";
import {distinctUntilChanged} from "rxjs";
import {InputAdornment, MenuItem, TextField} from "@mui/material";
import {EditFieldProperties} from "../../settings/pages/system/edit";
import useEntityEditField from "../EditPage/Fields/useEntityEditField";
import {LoaderQueryResponse} from "../../services/loaders/allPermissionCategories/LoaderQuery";

// Компонент поля выбора категории разрешения
const PermissionCategorySelector: FC<EditFieldProperties> = props => {
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

    const {
        t,
        value,
        fieldConfig: {title, isVisible = () => true, startIcon: IconComponent, validation: validators = []},
        values,
        validation,
        additionData,
        onChangeFieldValue,
    } = fieldData

    const categories = additionData[fieldCode] as LoaderQueryResponse
    if (!isVisible(values) || !categories) {
        return null
    }

    return (
        <TextField
            label={t(title)}
            variant="standard"
            value={`${value}`}
            error={!!validation}
            helperText={validation ? t(validation) : undefined}
            fullWidth
            select
            required={validators.length > 0}
            onChange={event => {
                event.preventDefault()
                event.stopPropagation()

                onChangeFieldValue(() => event.target.value)
            }}
            InputProps={{
                startAdornment: IconComponent ? (
                    <InputAdornment position="start">
                        <IconComponent/>
                    </InputAdornment>
                ) : undefined,
            }}
        >
            {categories.categories.map(category => (
                <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
            ))}
        </TextField>
    )
}

// Экспортируем компонент
export default React.memo(PermissionCategorySelector, (prevProps, nextProps) => {
    return prevProps.fieldCode === nextProps.fieldCode
})