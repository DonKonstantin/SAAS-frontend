import React, {FC} from "react";
import {distinctUntilChanged} from "rxjs";
import {IconButton, InputAdornment, MenuItem, TextField, Tooltip, Typography} from "@mui/material";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import {EditFieldProperties} from "../../settings/pages/system/edit";
import useEntityEditField from "../EditPage/Fields/useEntityEditField";
import {LoaderQueryResponse} from "../../services/loaders/allDomainsAndProjects/LoaderQuery";

// Компонент поля выбора домена
const DomainsSelector: FC<EditFieldProperties> = props => {
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
        onResetFieldValue,
    } = fieldData

    const domainsAndProjects = additionData[fieldCode] as LoaderQueryResponse
    if (!isVisible(values) || !domainsAndProjects) {
        return null
    }

    return (
        <TextField
            label={t(title)}
            variant="standard"
            value={value || ""}
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
                        <IconComponent />
                    </InputAdornment>
                ) : undefined,
                endAdornment: (
                    <InputAdornment position="end">
                        <Tooltip title={t(`entity-edit.fields.domain-selector.restore-default`) as string}>
                            <IconButton
                                size="small"
                                sx={{mr: 3}}
                                color={!!validation ? `error` : `warning`}
                                onClick={onResetFieldValue}
                                edge="end"
                            >
                                <RestoreOutlinedIcon fontSize="small"/>
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                )
            }}
        >
            <MenuItem value="">
                <Typography variant="overline" sx={{p: 0}}>
                    {t(`entity-edit.fields.domain-selector.no-value`)}
                </Typography>
            </MenuItem>
            {domainsAndProjects.domains.map(domain => (
                <MenuItem value={parseInt(domain.id)} key={domain.id}>{domain.name}</MenuItem>
            ))}
        </TextField>
    )
}

// Экспортируем компонент
export default React.memo(DomainsSelector, (prevProps, nextProps) => {
    return prevProps.fieldCode === nextProps.fieldCode
})